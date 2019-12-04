import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * --- Day 3: Crossed Wires ---
 */
public class Day3 {
    static int MAX_DIMENSION = 1000;

    public static void main(String[] args) {
        List<List<String>> input = new ArrayList<>();
        try {
            input = Files.lines(Paths.get("2019/day-3/input.txt"))
                    .map(line -> Arrays.asList(line.replaceAll("\\s+", "").split(","))).collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        int minManhattanDistance = Integer.MAX_VALUE;
        List<Intersection> intersections = getIntersections(getMap(input.get(0)), input.get(1));
        for (Intersection intersection : intersections) {
            int distance = getManhattanDistance(intersection);
            if (distance > 0 && distance < minManhattanDistance) {
                minManhattanDistance = distance;
            }
        }
        System.out.println(minManhattanDistance);
    }

    public static class Path {
        char direction;
        int magnitude;

        public Path(char direction, int magnitude) {
            this.direction = direction;
            this.magnitude = magnitude;
        }
    }

    public static Path getPath(String path) {
        String[] parts = path.split("(?<=\\D)(?=\\d)");
        return new Path(parts[0].charAt(0), Integer.parseInt(parts[1]));
    }

    public static int[][] getMap(List<String> wire) {
        int[][] map = new int[MAX_DIMENSION][MAX_DIMENSION];
        int positionX = MAX_DIMENSION / 2;
        int positionY = MAX_DIMENSION / 2;
        for (String pathString : wire) {
            Path path = getPath(pathString);
            switch (path.direction) {
            case 'U':
                for (int i = positionY; i > positionY - path.magnitude; i--) {
                    map[i][positionX] = 1;
                }
                positionY -= path.magnitude;
                break;
            case 'D':
                for (int i = positionY; i < positionY + path.magnitude; i++) {
                    map[i][positionX] = 1;
                }
                positionY += path.magnitude;
                break;
            case 'L':
                for (int i = positionX; i > positionX - path.magnitude; i--) {
                    map[positionY][i] = 1;
                }
                positionX -= path.magnitude;
                break;
            case 'R':
                for (int i = positionX; i < positionX + path.magnitude; i++) {
                    map[positionY][i] = 1;
                }
                positionX += path.magnitude;
                break;
            }
        }
        return map;
    }

    public static class Intersection {
        int positionX;
        int positionY;

        public Intersection(int positionX, int positionY) {
            this.positionX = positionX;
            this.positionY = positionY;
        }
    }

    public static List<Intersection> getIntersections(int[][] wire1, List<String> wire2) {
        List<Intersection> intersections = new ArrayList<>();
        int positionX = MAX_DIMENSION / 2;
        int positionY = MAX_DIMENSION / 2;
        for (String pathString : wire2) {
            Path path = getPath(pathString);
            switch (path.direction) {
            case 'U':
                for (int i = positionY; i > positionY - path.magnitude; i--) {
                    if (wire1[i][positionX] == 1) {
                        intersections.add(new Intersection(positionX, i));
                    }
                }
                positionY -= path.magnitude;
                break;
            case 'D':
                for (int i = positionY; i < positionY + path.magnitude; i++) {
                    if (wire1[i][positionX] == 1) {
                        intersections.add(new Intersection(positionX, i));
                    }
                }
                positionY += path.magnitude;
                break;
            case 'L':
                for (int i = positionX; i > positionX - path.magnitude; i--) {
                    if (wire1[positionY][i] == 1) {
                        intersections.add(new Intersection(i, positionY));
                    }
                }
                positionX -= path.magnitude;
                break;
            case 'R':
                for (int i = positionX; i < positionX + path.magnitude; i++) {
                    if (wire1[positionY][i] == 1) {
                        intersections.add(new Intersection(i, positionY));
                    }
                }
                positionX += path.magnitude;
                break;
            }
        }
        return intersections;
    }

    public static int getManhattanDistance(Intersection intersection) {
        return Math.abs(MAX_DIMENSION / 2 - intersection.positionX)
                + Math.abs(MAX_DIMENSION / 2 - intersection.positionY);
    }
}

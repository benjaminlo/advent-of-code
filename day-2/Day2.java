import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * --- Day 2: 1202 Program Alarm ---
 */
public class Day2 {
    public static void main(String[] args) {
        List<Integer> input = new ArrayList<>();
        try {
            String inputString = new String(Files.readAllBytes(Paths.get("day-2/input.txt"))).replaceAll("\\s+", "");
            input = Stream.of(inputString.split(",")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(part1(input));
        System.out.println(part2(input));
    }

    public static int runProgram(List<Integer> input) {
        int cursor = 0;
        while (input.get(cursor) != 99) {
            int cursorValue = input.get(cursor);
            int inputPosition1 = input.get(cursor + 1);
            int inputPosition2 = input.get(cursor + 2);
            int outputPosition = input.get(cursor + 3);
            if (cursorValue == 1) {
                input.set(outputPosition, input.get(inputPosition1) + input.get(inputPosition2));
            } else if (cursorValue == 2) {
                input.set(outputPosition, input.get(inputPosition1) * input.get(inputPosition2));
            }
            cursor += 4;
        }
        return input.get(0);
    }

    public static int part1(List<Integer> intcode) {
        List<Integer> input = new ArrayList<>(intcode);
        input.set(1, 12);
        input.set(2, 2);
        return runProgram(input);
    }

    public static int part2(List<Integer> intcode) {
        for (int noun = 0; noun <= 99; noun++) {
            for (int verb = 0; verb <= 99; verb++) {
                List<Integer> input = new ArrayList<>(intcode);
                input.set(1, noun);
                input.set(2, verb);
                if (runProgram(input) == 19690720) {
                    return 100 * noun + verb;
                }
            }
        }
        return -1;
    }
}

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * --- Day 1: The Tyranny of the Rocket Equation ---
 */
public class Day1 {
    public static void main(String[] args) {
        List<Integer> input = new ArrayList<>();
        try {
            input = Files.lines(Paths.get("day-1/input.txt")).mapToInt(line -> Integer.parseInt(line)).boxed()
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }

        int output = 0;
        for (int mass : input) {
            output += calculateRequiredFuel(mass);
        }
        System.out.println(output);

        int output2 = 0;
        for (int mass : input) {
            output2 += calculateRequiredFuel2(mass);
        }
        System.out.println(output2);
    }

    public static int calculateRequiredFuel(int mass) {
        return Math.floorDiv(mass, 3) - 2;
    }

    public static int calculateRequiredFuel2(int mass) {
        if (mass <= 0) {
            return 0;
        }
        int fuel = calculateRequiredFuel(mass);
        return fuel + Math.max(0, calculateRequiredFuel2(fuel));
    }
}

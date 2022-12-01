export function day01(input: string, part?: number) {
    const elfCalories = input
        .split(/\r?\n/)
        .reduce((acc, line) => {
            if (!line) {
                acc.push(0);
                return acc;
            }
            const calories = Number(line);
            const current = acc.pop() ?? 0;
            acc.push(current + calories);
            return acc;
        }, [] as number[])
        .sort()
        .reverse();
    switch (part) {
        case 1: {
            console.log(`First exercise: ${elfCalories[0]}`);
            break;
        }
        case 2: {
            console.log(`Second exercise: ${elfCalories.slice(0, 3).reduce((acc, current) => acc + current, 0)}`);
            break;
        }
        default:{
            console.log(`First exercise: ${elfCalories[0]}`);
            console.log(`Second exercise: ${elfCalories.slice(0, 3).reduce((acc, current) => acc + current, 0)}`);
        }

    }
}
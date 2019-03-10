// Greatest Common Divisor
function calculateGCD(numbers) {
    let by = 2 // Lower prime number
    let result = 1 // Lower result number

    const gcd = `MDC (${numbers.join(', ')})`

    do {
        let count = 0 // Number of divided numbers
        for (let i = 0; i < numbers.length; i++) {
            // Checks whether by is divisor of numbers[i]
            if (numbers[i] % by === 0) {
                numbers[i] /= by
                count++
            }
        }

        if (count === 0) {
            by++
        } else if (count === numbers.length) {
            result *= by
        }
    } while (numbers.filter(number => number > 1).length >= 1)

    return {
        gcd,
        result
    }
}
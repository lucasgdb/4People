function isPrimeNumber(number) {
    let sum = 1
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            sum++
        }

        if (sum > 1) {
            return false
        }
    }

    return true
}
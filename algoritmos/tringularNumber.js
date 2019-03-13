function isTringularNumber(number) {
    if (number == 1) {
        return true
    }

    let sum = 0;
    for (let i = 0, j = 1; i < number; i++, sum += j++) {
        if (sum == number) {
            return true
        }
    }

    return false
}
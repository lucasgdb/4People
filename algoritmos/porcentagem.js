function firstOperation(number1, number2) {
    // E.g: X = 50% of 100
    return number1 / 100 * number2
}

function secondOperation(number1, number2) {
    // E.g: 50 = X% of 100
    return number1 / number2 * 100
}

function thirdOperation(number1, number2) {
    // E.g: X = (100 - 50) / 50 * 100
    return (number2 - number1) / number1 * 100
}

function fourthOperation(number1, number2) {
    // E.g: X = (50 - 100) / 100 * 100
    return -((number2 - number1) / number1 * 100)
}

function fifthOperation(number1, number2) {
    // E.g: X = 50 / 100
    return number1 / number2 * 100
}

function sixthOperation(number1, number2) {
    // E.g: X = 50 + 50 * (100/100)
    return number1 + number1 * (number2 / 100)
}

function seventhOperation(number1, number2) {
    // E.g: X = 50 - 50 * (100/100)
    return number1 - number1 * (number2 / 100)
}

function eighthOperation(number1, number2) {
    // E.g: X = 100 / (1 + 50/100)
    return number2 / (1 + number1 / 100)
}

function ninethOperation(number1, number2) {
    // E.g: X = 100 / (1 - 50/100)
    return number2 / (1 - number1 / 100)
}
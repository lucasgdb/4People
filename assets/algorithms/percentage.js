 // E.g: X = 50% of 100
 const firstOperation = (number1, number2) => number1 / 100 * number2

 // E.g: 50 = X% of 100
 const secondOperation = (number1, number2) => number1 / number2 * 100

 // E.g: X = (100 - 50) / 50 * 100
 const thirdOperation = (number1, number2) => (number2 - number1) / number1 * 100

 // E.g: X = (50 - 100) / 100 * 100
 const fourthOperation = (number1, number2) => -((number2 - number1) / number1 * 100)

 // E.g: X = 50 / 100
 const fifthOperation = (number1, number2) => number1 / number2 * 100

 // E.g: X = 50 + 50 * (100/100)
 const sixthOperation = (number1, number2) => number1 + number1 * (number2 / 100)

 // E.g: X = 50 - 50 * (100/100)
 const seventhOperation = (number1, number2) => number1 - number1 * (number2 / 100)

 // E.g: X = 100 / (1 + 50/100)
 const eighthOperation = (number1, number2) => number2 / (1 + number1 / 100)

 // E.g: X = 100 / (1 - 50/100)
 const ninthOperation = (number1, number2) => number2 / (1 - number1 / 100)

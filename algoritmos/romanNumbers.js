function translateRomanNumber(text) {
    let result = 0;
    let rightNumber = 0;
    for (let i = text.length - 1; i >= 0; i--) {
        const value = Math.floor(Math.pow(10, "IXCM".indexOf(text.charAt(i)))) + 5 * Math.floor(Math.pow(10, "VLD".indexOf(text.charAt(i))));
        result += value * Math.sign(value + 0.5 - rightNumber);
        rightNumber = value;
    }
    return result;
}
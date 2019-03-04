function calculateCircleArea(number, type = 0) {
    return type === 0 ?
        Math.PI.toFixed(48) * Math.pow(parseFloat(number), 2) :
        Math.PI.toFixed(48) * Math.pow(parseFloat(number), 2) / 4
}
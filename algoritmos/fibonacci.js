function calculateFibonacci(amount) {
    if (amount === 1) {
        return '0'
    } else if (amount === 2) {
        return '0, 1'
    } else {
        let a = 0
        let b = 1
        let c
        let sequence = [a, b]

        for (let i = 2; i < amount; i++) {
            sequence.push(c = a + b)
            const aux = b
            b = c
            a = aux
        }

        return sequence.join(', ')
    }
}
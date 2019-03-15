function calculateFibonacci(amount) {
    if (amount === 0n) {
        return ''
    } else if (amount === 1n) {
        return '0'
    } else if (amount === 2n) {
        return '0, 1'
    } else {
        let a = 0n
        let b = 1n
        let c
        let sequence = [a, b]

        for (let i = 2n; i < amount; i++) {
            sequence.push(c = a + b)
            const aux = b
            b = c
            a = aux
        }

        return sequence.join(', ')
    }
}
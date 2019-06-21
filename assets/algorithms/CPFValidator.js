function validateCPF(CPF = Array) {
    if (CPF.filter(number => number === CPF[0]).length >= 11) {
        return {
            "isCPF": false,
            "from": null,
            "CPF": fixCPF(CPF)
        }
    }

    let firstSum = 0
    let secondSum = 0
    let firstDigit
    let secondDigit
    let isCPF = false
    let from
    const digitNumbers = CPF.slice(CPF.length - 2)
    const originNumber = CPF[8]
    const firstTimes = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    const secondTimes = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

    for (let i = 0; i < firstTimes.length; i++) {
        firstSum += CPF[i] * firstTimes[i]
    }

    const rest = firstSum % 11
    firstDigit = rest < 2 ? 0 : 11 - rest

    for (let i = 0; i < secondTimes.length; i++) {
        secondSum += CPF[i] * secondTimes[i]
    }

    const rest2 = secondSum % 11
    secondDigit = rest2 < 2 ? 0 : 11 - rest2

    if (firstDigit === digitNumbers[0] && secondDigit === digitNumbers[1]) {
        isCPF = true
    }

    if (isCPF) {
        if (originNumber === 1) {
            from = 'Distrito Federal, Goiás, Mato Grosso do Sul ou Tocantins.'
        } else if (originNumber === 2) {
            from = 'Pará, Amazonas, Acre, Amapá, Rondônia ou Roraima.'
        } else if (originNumber === 3) {
            from = 'Ceará, Maranhão ou Piauí.'
        } else if (originNumber === 4) {
            from = 'Pernambuco, Rio Grande do Norte, Paraíba ou Alagoas.'
        } else if (originNumber === 5) {
            from = 'Bahia ou Sergipe.'
        } else if (originNumber === 6) {
            from = 'Minas Gerais.'
        } else if (originNumber === 7) {
            from = 'Rio de Janeiro ou Espírito Santo.'
        } else if (originNumber === 8) {
            from = 'São Paulo.'
        } else if (originNumber === 9) {
            from = 'Paraná ou Santa Catarina.'
        } else {
            from = 'Rio Grande do Sul.'
        }
    }

    return {
        isCPF,
        from,
        "CPF": fixCPF(CPF)
    }
}

function fixCPF(CPF) {
    CPF.splice(3, 0, '.')
    CPF.splice(7, 0, '.')
    CPF.splice(11, 0, '-')

    return CPF.join('')
}

function calculateBhaskara(a, b, c) {
    if (a === 0) {
        throw new Error('"A" não pode ser zero.')
    }

    const delta = b ** 2 - 4 * a * c
    const x1 = (-b + delta ** 0.5) / (2 * a)
    const x2 = (-b - delta ** 0.5) / (2 * a)
    let msg

    if (delta < 0) {
        msg = "Para delta menor que zero, não existem raízes reais."
    } else if (delta === 0) {
        msg = "Para delta igual a zero, existe raízes reais iguais."
    } else {
        msg = "Para delta maior que zero, existem duas raízes reais distintas."
    }

    return {
        delta,
        msg,
        x1,
        x2
    }
}
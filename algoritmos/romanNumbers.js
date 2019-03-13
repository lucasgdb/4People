function traduzirNumeralRomano(texto) {
    let result = 0;
    let numeralDaDireita = 0;
    for (let i = texto.length - 1; i >= 0; i--) {
        const valor = Math.floor(Math.pow(10, "IXCM".indexOf(texto.charAt(i)))) + 5 * Math.floor(Math.pow(10, "VLD".indexOf(texto.charAt(i))));
        result += valor * Math.sign(valor + 0.5 - numeralDaDireita);
        //console.log(result, valor)
        numeralDaDireita = valor;
    }
    return result;
}

console.log(traduzirNumeralRomano('MMMDMIIIII'))
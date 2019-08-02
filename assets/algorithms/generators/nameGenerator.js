menNames = [
    'Jairo',
    'Lucas',
    'Victor',
    'Renan',
    'William',
    'Kaio',
    'Caio',
    'Renan',
    'João',
    'Erick',
    'Alan',
    'Gabriel',
    'Daniel',
    'Pedro',
    'Vinicius',
    'Paulo',
    'Otávio',
    'Luís',
    'Carlos',
    'Flavio',
    'Jair',
    'Olavo',
    'António',
    'Mateus',
    'Matheus',
    'Rafael',
    'Miguel',
    'Felipe',
    'Tales',
    'Ricardo',
    'Junior',
    'Julio',
    'Nicolas',
    'Henrico',
    'Henrique',
    'José',
    'Noslen',
    'Rodrigo',
    'Thiago',
    'Silvio',
    'Heitor',
    'Cleber',
    'Marco',
    'Marcos',
    'Bruno',
    'Pierre',
    'Fabricio',
    'Augusto',
    'Nelci',
    'Dionísio',
    'Décio',
    'Lucio',
    'Marcelo',
    'Mauro',


]
womenNames = [
    'Rafaela',
    'Claudia',
    'Maria',
    'Ester',
    'Estela',
    'Patricia',
    'Carla',
    'Eliana',
    'Marilene',
    'Clotilde',
    'Sebastiana',
    'Marisa',
    'Joseane',
    'Tânia',
    'Pâmela',
    'Ingrid',
    'Adriana',
    'Ana',
    'Carolina',
    'Valdinéia',
    'Sirlene',
    'Yasmin',
    'Paola',
    'Viviane',
    'Inês',
    'Suzany',
    'Julia',
    'Aparecida',
    'Valentina',
    'Thais',
    'Talita',
    'Taliane',
    'Teresa',
    'Tereza',
    'Paula',
    'Erika',
    'Manuela',
    'Renata',
    'Nathalia',
    'Lillian',
    'Giuliane',
    'Denise'
]

subNames = [
    'da Silva',
    'de Sousa',
    'Ribeiro',
    'Tunisse',
    'de Souza',
    'Rodrigues',
    'Pereira',
    'Garcia',
    'Alberto',
    'Araujo',
    'Bittencourt',
    'Yamanaka',
    'Bolsonaro',
    'Guedes',
    'Castro',
]

thirdNames = [
    'Palma',
    'Pinto',
    'da Silva',
    'de Sousa'
]
const generateNames = (option, optionSex) => {
    namesMen = menNames[parseInt(Math.random() * menNames.length)]
    namesWomen = womenNames[parseInt(Math.random() * womenNames.length)]
    nameSub = subNames[parseInt(Math.random() * subNames.length)]
    namesThird = thirdNames[parseInt(Math.random() * thirdNames.length)]
        //mens
    if (optionSex === '1' && option === '1') return `${namesMen} ${nameSub}`
    else if (optionSex === '1' && option === '2') return `${namesMen}`
    else if (optionSex === '1' && option === '3') return `${namesMen} ${nameSub} ${namesThird}`
        //womens
    else if (optionSex === '2' && option === '1') return `${namesWomen} ${nameSub}`
    else if (optionSex === '2' && option === '2') return `${namesWomen}`
    else if (optionSex === '2' && option === '3') return `${namesWomen} ${namesThird}`

}
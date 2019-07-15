const nicks = [
    'off',
    'Desu',
    'Sasha',
    'Das',
    'Mann',
    'Storm',
    'Elvis',
    'Sugar',
    'Saint',
    'Shadow',
    'Yoda',
    'Crush',
    'Hokage',
    'Smash',
    'Jefferson',
    'Helssing',
]
const sufixNicks = [
    'OfChaos',
    'Senpai',
    'OfFire',
    'vski',
    'litz',
    'Ajax',
    'JS',
    'kun',
    'Sama',
    'Seiya'
]
const prefixNicks = [
    'General',
    'Smash',
    'Stein',
    'boy',
    'Van',
    'gai',
    'Cruiser',
    '4',
]

const generateNicks = (name, option) => {
    //var randomName = faker.name.findName()
    if (option == '2') return name += nicks[parseInt(Math.random() * nicks.length)]
    else if (option == '1') return name += nicks[parseInt(Math.random() * nicks.length)]
    else if (option == '3') return prefixNicks[parseInt(Math.random() * prefixNicks.length)] = nicks[parseInt(Math.random()) * nicks.length] = sufixNicks[parseInt(Math.random() * sufixNicks.length)]
    else if (option == '4') return prefixNicks[parseInt(Math.random() * prefixNicks.length)] = name
    else if (option == '5') return name = sufixNicks[parseInt(Math.random() * prefixNicks.length)]
}
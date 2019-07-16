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
    'ryu',
    'Wander',
    'Agro'
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
    'Seiya',
    'BR'
]
const prefixNicks = [
    'General',
    'Smash',
    'Stein',
    'boy',
    'Van',
    'gai',
    'Cruiser',
    'OfSplosh',
    '4'
]

const generateNicks = (name, option) => {
    //var randomName = faker.name.findName()
    nicksName = nicks[parseInt(Math.random() * nicks.length)];
    prefixName = prefixNicks[parseInt(Math.random() * prefixNicks.length)];
    sufixName = sufixNicks[parseInt(Math.random() * sufixNicks.length)];
    //console.log(name, option, nicksName)
    if (option == '1') return `${name}${nicksName}`
    else if (option == '2') return `${prefixName}${nicksName}`
    else if (option == '3') return `${nicksName}${sufixName}`
    else if (option == '4') return `${prefixName}${name}`
    else if (option == '5') return `${name}${sufixName}`
}
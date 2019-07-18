const nicks = [
    'off',
    'Desu',
    'Sasha',
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
    'Agro',
    'Ceaseless',
    'Adele',
    'fr4nk',
    'sm4r',
    'Gunner',
    'Yappy',
    'Secretaria',
    'Meow',
    'The',
    'Lavish',
    'TheLuxuriant',
    'Dovahkin',
    'Fus',
    'Silver'

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
    'BR',
    'm3rc1ful',
    'Xyu',
    'TheInquisitive',
    'Perpetual',
    'OfTrapdoor',
    'row'
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
    '4',
    'kui',
    'Chico',
    'OfMutter',
    'Merci',
    'sm4r',
    'Portal',
    'Das',
    'Thunder',
    'Gunner',
    'Buster',
    'meow',
    'Booris',
    'Jazzy',
    'Zero',
    'Rei',
    'Statues',
    'Corizon',
    'Quizzical',
    'da1'
]

const generateNicks = (name, option) => {

    nicks
    //var randomName = faker.name.findName()
    nicksName = nicks[parseInt(Math.random() * nicks.length)];
    prefixName = prefixNicks[parseInt(Math.random() * prefixNicks.length)];
    sufixName = sufixNicks[parseInt(Math.random() * sufixNicks.length)];
    if (option == '1') return `${name}${nicksName}`
    else if (option == '2') return `${prefixName}${nicksName}${sufixName}`
    else if (option == '3') return `${nicksName}${sufixName}`
    else if (option == '4') return `${prefixName}${name}`
    else if (option == '5') return `${name}${sufixName}`
}

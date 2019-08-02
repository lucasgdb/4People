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
    'row',
    'sun',
    'titan',
    'san',
    'punish',
    'Dragon-eyes',
    'Sword',
    'HitKill',
    'grim',
    'potter',
    'Gryffindor',
    'Slytherin',
    'Ravenclaw',
    'Hufflepuff',
    'BurguerZone',
    'suzano',
    'headOf',
    'Dev',
    'Morte',
    'Wuld',
    'fire',
    'Rampage',
    '9090',
    '666',
    'The13',
    'twin',
    'kyle',
    'KY',
    '`concaten`',
    'yu',
    'Senju',
    'rey',
    'puff',
    'nord',
    'elf',
    'highElf',
    'blackElf',
    'human',
    'assasin',
    'Elder',
    'monkey',
    'kurisu',
    'scientist',
    'earth'
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
    nicksName = nicks[parseInt(Math.random() * nicks.length)]
    prefixName = prefixNicks[parseInt(Math.random() * prefixNicks.length)]
    sufixName = sufixNicks[parseInt(Math.random() * sufixNicks.length)]
    name = name.replace(new RegExp('  ', 'g'), '')
    if (parseInt(Math.random() * 4) === 2)
        name = name.replace(new RegExp(' ', 'g'), '-')
    else if (parseInt(Math.random() * 4) === 3)
        name = name.replace(new RegExp(' ', 'g'), '_')
    else
        name = name.replace(new RegExp(' ', 'g'), '')
    if (option == '1') {
        const letters = 'aeios'
        const modifiedLetters = '43106'
        for (let i = 0; i < letters.length; i++) {
            if (parseInt(Math.random() * 4) === 1) {
                name = name.replace(new RegExp(letters[i], 'g'), modifiedLetters[i])
            }
        }
        return `${name}${sufixName}`
    } else if (option == '2') return `${prefixName}${nicksName}${sufixName}`
    else if (option == '3') return `${nicksName}${sufixName}`
    else if (option == '4') return `${prefixName}${name}`
    else if (option == '5') return `${name}${sufixName}`
}
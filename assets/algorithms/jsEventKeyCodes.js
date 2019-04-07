const keyLocations = {
    0: 'General keys',
    1: 'Left-side modifier keys',
    2: 'Right-side modifier keys',
    3: 'Numpad'
}

function getKeyCode(keyLocation) {
    return keyLocations[keyLocation]
}
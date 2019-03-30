function celsiusToFahrenheit(celsius) {
    return 1.8 * celsius + 32
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) / 1.8
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 0.555555556 + 273.15
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32
}

// Helper method
function calculateTemperature(from, to, temperature) {
    if (from === '0' && to === '1') {
        return celsiusToFahrenheit(temperature)
    } else if (from === '0' && to === '2') {
        return celsiusToKelvin(temperature)
    } else if (from === '1' && to === '0') {
        return fahrenheitToCelsius(temperature)
    } else if (from === '1' && to === '2') {
        return fahrenheitToKelvin(temperature)
    } else if (from === '2' && to === '0') {
        return kelvinToCelsius(temperature)
    } else if (from === '2' && to === '1') {
        return kelvinToFahrenheit(temperature)
    } else {
        return temperature
    }
}
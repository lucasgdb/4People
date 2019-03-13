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
const celsiusToFahrenheit = celsius => 1.8 * celsius + 32
const celsiusToKelvin = celsius => celsius + 273.15
const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) / 1.8
const fahrenheitToKelvin = fahrenheit => (fahrenheit - 32) * 0.555555556 + 273.15
const kelvinToCelsius = kelvin => kelvin - 273.15
const kelvinToFahrenheit = kelvin => (kelvin - 273.15) * 1.8 + 32

// Helper method
const calculateTemperature = (from, to, temperature) => {
	if (from === '0' && to === '1') return celsiusToFahrenheit(temperature)
	else if (from === '0' && to === '2') return celsiusToKelvin(temperature)
	else if (from === '1' && to === '0') return fahrenheitToCelsius(temperature)
	else if (from === '1' && to === '2') return fahrenheitToKelvin(temperature)
	else if (from === '2' && to === '0') return kelvinToCelsius(temperature)
	else if (from === '2' && to === '1') return kelvinToFahrenheit(temperature)

	return temperature
}

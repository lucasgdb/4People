const lblIp = document.querySelector('#ip')
// const lblCity = document.querySelector('#city')
const lblRegion = document.querySelector('#region')
const lblRegionCode = document.querySelector('#regionCode')
const lblCountry = document.querySelector('#country')
const lblSymbol = document.querySelector('#symbol')
const lblLanguage = document.querySelector('#language')
const lblCountryCode = document.querySelector('#countryCode')
const lblContinent = document.querySelector('#continent')
const lblContinentCode = document.querySelector('#continentCode')
const lblLatitude = document.querySelector('#latitude')
const lblLongitude = document.querySelector('#longitude')
const lblOrganization = document.querySelector('#organization')
const lblCallingCode = document.querySelector('#callingCode')
const lblFlag = document.querySelector('#flag')

document.addEventListener('DOMContentLoaded', () => {
	fetch('https://api.ipify.org?format=json')
		.then(result => result.json())
		.then(data => {
			lblIp.textContent = data.ip
			// lblCity.textContent = data.city
			// lblRegion.textContent = data.region
			// lblRegionCode.textContent = data.region_code
			// lblCountry.textContent = data.country_name
			// lblCountryCode.textContent = data.country_code
			// lblSymbol.textContent = data.currency.symbol
			// lblLanguage.textContent = data.languages[0].native
			// lblContinent.textContent = data.continent_name
			// lblContinentCode.textContent = data.continent_code
			// lblLatitude.textContent = data.latitude
			// lblLongitude.textContent = data.longitude
			// lblCallingCode.textContent = data.calling_code
			// lblFlag.innerHTML = `<img style="position:relative;top:4px" src="${data.flag}" alt="${data.country_code}">`
		}).catch(err => {
			M.toast({
				html: 'Houve um erro. Verifique sua conexão.',
				classes: 'red accent-4'
			})
		})
})

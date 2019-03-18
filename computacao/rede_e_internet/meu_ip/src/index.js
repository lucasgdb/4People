const ip = document.querySelector('#ip')
const city = document.querySelector('#city')
const region = document.querySelector('#region')
const regionCode = document.querySelector('#regionCode')
const country = document.querySelector('#country')
const countryCode = document.querySelector('#countryCode')
const continent = document.querySelector('#continent')
const continentCode = document.querySelector('#continentCode')
const latitude = document.querySelector('#latitude')
const longitude = document.querySelector('#longitude')
const organization = document.querySelector('#organization')
const callingCode = document.querySelector('#callingCode')
const flag = document.querySelector('#flag')

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.ipdata.co/?api-key=2cdd235eefa704006ffc48a6212ebae13f9f4afd8c9f1846d7a2ae12')
        .then(result => result.text())
        .then(json => JSON.parse(json))
        .then(data => {
            ip.textContent = data.ip
            city.textContent = data.city
            region.textContent = data.region
            regionCode.textContent = data.region_code
            country.textContent = data.country_name
            countryCode.textContent = data.country_code
            continent.textContent = data.continent_name
            continentCode.textContent = data.continent_code
            latitude.textContent = data.latitude
            longitude.textContent = data.longitude
            organization.textContent = data.organisation
            callingCode.textContent = data.calling_code
            flag.innerHTML = `<img style="position:relative;top:4px" src="${data.flag}" alt="${data.country_code}">`
        }).catch(err => {
            M.toast({
                html: 'Houve um erro! Verifique sua conexão.',
                classes: 'red accent-4'
            })
        })
})
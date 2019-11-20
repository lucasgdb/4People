const dates = document.querySelectorAll('.date-format')
const lblNumbers = document.querySelectorAll('.number')
const formatter = Intl.NumberFormat('pt-BR')
const current = new Date()
const dateFormatter = new Intl.RelativeTimeFormat('pt-BR', {
	style: 'narrow'
});

for (let i = 0; i < lblNumbers.length; i += 1) {
	const number = lblNumbers[i].textContent
	lblNumbers[i].textContent = formatter.format(number)
}

for (let i = 0; i < dates.length; i++) {
	let format

	const server = new Date(dates[i].innerHTML)

	const difference = Math.abs(current.getTime() - server.getTime())

	const times = {
		second: Math.trunc(difference / 1000),
		minute: Math.trunc(difference / 60000),
		hour: Math.trunc(difference / 3600000),
		day: Math.trunc(difference / 86400000),
		month: Math.trunc(difference / 2629800000),
		year: Math.trunc(difference / 31557600000)
	}

	if (times.year > 0) format = 'year'
	else if (times.month > 0) format = 'month'
	else if (times.day > 0) format = 'day'
	else if (times.hour > 0) format = 'hour'
	else if (times.minute > 0) format = 'minute'
	else format = 'second'

	dates[i].innerHTML = dateFormatter.format(-times[format], format)
}

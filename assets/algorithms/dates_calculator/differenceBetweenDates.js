const compareDateBetween = (beginDate, endDate) => {
	const begin = new Date(beginDate)
	const end = new Date(endDate)

	const timeBetween = Math.abs(end.getTime() - begin.getTime())
	const formatter = Intl.NumberFormat('pt-BR')

	return {
		"milliSeconds": formatter.format(timeBetween),
		"seconds": formatter.format(Math.trunc(timeBetween / 1000)), // difference time by 1 second in ms
		"minutes": formatter.format(Math.trunc(timeBetween / 60000)), // difference time by 1 minute in ms
		"hours": formatter.format(Math.trunc(timeBetween / 3600000)), // difference time by 1 hour in ms
		"days": formatter.format(Math.trunc(timeBetween / 86400000)), // difference time by 1 day in ms
		"months": formatter.format(Math.trunc(timeBetween / 2629800000)), // difference time by 1 month in ms
		"years": formatter.format(Math.trunc(timeBetween / 31557600000)), // difference time by 1 year in ms
	}
}

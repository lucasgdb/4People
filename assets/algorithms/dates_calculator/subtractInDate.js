const subtractDays = (date, days) => {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() - days)
	return newDate
}

const subtractWeeks = (date, weeks) => {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() - weeks * 7)
	return newDate
}

const subtractMonths = (date, months) => {
	const newDate = new Date(date)
	newDate.setMonth(newDate.getMonth() - months)
	return newDate
}

const subtractYears = (date, years) => {
	const newDate = new Date(date)
	newDate.setFullYear(newDate.getFullYear() - years)
	return newDate
}

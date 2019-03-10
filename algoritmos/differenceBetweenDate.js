function compareDateBetween(beginDate, endDate) {
    const begin = new Date(beginDate)
    const end = new Date(endDate)

    const timeBetween = Math.abs(end.getTime() - begin.getTime())
    const formatter = Intl.NumberFormat('pt-BR')

    let timeInMS = timeBetween
    const years = Math.floor(timeInMS / 31557600000)
    timeInMS -= years * 31557600000
    const months = Math.floor(timeInMS / 2629800000)
    timeInMS -= months * 2629800000
    const days = Math.floor(timeInMS / 86400000)
    timeInMS -= days * 86400000
    const hours = Math.floor(timeInMS / 3600000)
    timeInMS -= hours * 3600000
    const minutes = Math.floor(timeInMS / 60000)
    timeInMS -= minutes * 60000

    return {
        "milliSeconds": formatter.format(timeBetween),
        "seconds": formatter.format(Math.trunc(timeBetween / 1000)), // difference time by 1 second in ms
        "minutes": formatter.format(Math.trunc(timeBetween / 60000)), // difference time by 1 minute in ms
        "hours": formatter.format(Math.trunc(timeBetween / 3600000)), // difference time by 1 hour in ms
        "days": formatter.format(Math.trunc(timeBetween / 86400000)), // difference time by 1 day in ms
        "months": formatter.format(Math.trunc(timeBetween / 2592000000)), // difference time by 1 month in ms
        "years": formatter.format(Math.trunc(timeBetween / 31557600000)), // difference time by 1 year in ms
        "totalTime": `${formatter.format(years)} ano${years === 1 ? '' : 's'}, ${formatter.format(months)} m${months === 1 ? 'ês' : 'eses'}, ${formatter.format(days)} dia${days === 1 ? '' : 's'}, ${formatter.format(hours)} hora${hours === 1 ? '' : 's'} e ${formatter.format(minutes)} minuto${minutes === 1 ? '' : 's'}`
    }
}
function compareDateBetween(beginDate, endDate) {
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
        "weeks": formatter.format(Math.trunc(timeBetween / 604800000)), // difference time by 1 week in ms
        "months": formatter.format(Math.trunc(timeBetween / 2592000000)), // difference time by 1 month in ms
        "years": formatter.format(Math.trunc(timeBetween / 31536000000)) // difference time by 1 year in ms
    }
}

// console.log(compareDateBetween("07/30/1999", "03/06/2019"))
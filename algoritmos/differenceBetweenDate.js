function compareDateBetween(beginDate, endDate) {
    const begin = new Date(beginDate)
    const end = new Date(endDate)

    const timeBetween = Math.abs(end.getTime() - begin.getTime())

    return {
        "seconds": Math.trunc(timeBetween / 1000), // difference time by 1 second in ms
        "minutes": Math.trunc(timeBetween / 60000), // difference time by 1 minute in ms
        "hours": Math.trunc(timeBetween / 3600000), // difference time by 1 hour in ms
        "days": Math.trunc(timeBetween / 86400000), // difference time by 1 day in ms
        "weeks": Math.trunc(timeBetween / 604800000), // difference time by 1 week in ms
        "months": Math.trunc(timeBetween / 2592000000), // difference time by 1 month in ms
        "years": Math.trunc(timeBetween / 31536000000) // difference time by 1 year in ms
    }
}

console.log(compareDateBetween("07/30/1999", "03/06/2019"))
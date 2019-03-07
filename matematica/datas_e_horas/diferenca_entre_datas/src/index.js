M.Datepicker.init(document.querySelectorAll('.datepicker'), {
    yearRange: 25,
    i18n: {
        "cancel": '',
        "clear": 'Limpar',
        "done": 'Selecionar',
        "months": [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
        "monthsShort": [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
        ],
        "weekdays": [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado'
        ],
        "weekdaysShort": [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
        ]
    }
})
M.Timepicker.init(document.querySelectorAll('.timepicker'), {
    i18n: {
        'cancel': 'Cancelar',
        'clear': 'Limpar',
        'done': 'Selecionar'
    }
})

const lblSec = document.querySelector('#secs')
const lblMin = document.querySelector('#mins')
const lblHours = document.querySelector('#hours')
const lblDays = document.querySelector('#days')
const lblWeeks = document.querySelector('#weeks')
const lblMonths = document.querySelector('#months')
const lblYears = document.querySelector('#years')
const beginDate = M.Datepicker.getInstance(document.querySelector('#beginDate'))
const endDate = M.Datepicker.getInstance(document.querySelector('#endDate'))
const beginTime = M.Timepicker.getInstance(document.querySelector('#beginTime'))
const endTime = M.Timepicker.getInstance(document.querySelector('#endTime'))

function calculate() {
    if (beginDate.date !== undefined && endDate.date !== undefined) {
        const cTime = new Date()
        const beginTimeHour = beginTime.time === undefined || beginTime.el.value === '' ?
            `${cTime.getHours()}:${cTime.getMinutes()}:${cTime.getSeconds()}` :
            `${calculateAMorPM(beginTime.time, beginTime.amOrPm)}:${cTime.getSeconds()}`
        const endTimeHour = endTime.time === undefined || endTime.el.value === '' ?
            `${cTime.getHours()}:${cTime.getMinutes()}:${cTime.getSeconds()}` :
            `${calculateAMorPM(endTime.time, endTime.amOrPm)}:${cTime.getSeconds()}`
        const difference = compareDateBetween(
            beginDate.date.toUTCString().replace('03:00:00', beginTimeHour),
            endDate.date.toUTCString().replace('03:00:00', endTimeHour)
        )

        lblSec.textContent = difference.seconds
        lblMin.textContent = difference.minutes
        lblHours.textContent = difference.hours
        lblDays.textContent = difference.days
        lblWeeks.textContent = difference.weeks
        lblMonths.textContent = difference.months
        lblYears.textContent = difference.years
    } else {
        M.toast({
            html: 'Selecione as datas primeiro.',
            classes: 'red accent-4'
        })
    }
}

function calculateAMorPM(time, type) {
    let hour = time.split(':')[0]

    if (type === 'AM') {
        hour = hour === '12' ? '00' : hour
    } else {
        hour = hour === '00' || hour === '12' ? hour : parseInt(hour) + 12
    }

    return `${hour}:${time.split(':')[1]}`
}

document.addEventListener('DOMContentLoaded', function () {
    beginDate.cancelBtn.disabled = true
    endDate.cancelBtn.disabled = true
})
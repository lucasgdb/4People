const logs = document.querySelector('#logs')
let currentPage = 0
let currentTotal = 10

const selectLogs = async type => {
	let logsHTML = ''

	if (currentTotal < 10 && type === 0) currentPage--
	else if (type === 0 && currentPage > 1) currentPage--
	else if (currentTotal === 10 && type === 1) currentPage++
	else return

	const data = await (await fetch(`src/select_logs.php?page=${currentPage}`)).json()

	currentTotal = Object.keys(data).length

	for (const i in data) {
		logsHTML += (
			`<tr>
				<td>${data[i][0]}</td>
				<td>${data[i][1]}</td>
				<td>${data[i][2]}</td>
				<td>${data[i][3]}</td>
			</tr>`
		)
	}

	logs.innerHTML = logsHTML
}

selectLogs(1)

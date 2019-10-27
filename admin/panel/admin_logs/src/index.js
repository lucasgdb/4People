M.FormSelect.init(document.querySelectorAll('select'))

const logs = document.querySelector('#logs')

const selectLogs = async () => {
	let logsHTML = ''

	const data = await (await fetch('src/select_logs.php')).json()

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

selectLogs()

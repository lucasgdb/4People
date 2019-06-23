M.FormSelect.init(document.querySelectorAll('select'))
const txtName = document.querySelector('#name')
const txtResult = document.querySelectorAll('#result')
const txtSelect = document.querySelector('select')
const txtInput = document.querySelector('.areaText')

const generate = () => {
	if (txtSelect.value != '2' && txtSelect.value != '3') {
		txtInput.className = 'col s12 areaText'
		let nicks
		nicks = generateNicks(txtName.value, txtSelect.value)
		for (var i = 0; i <= txtResult.length; i++) {
			txtResult[i].innerHTML = `${nicks}`
		}
	} else {
		txtInput.className = 'col s12 areaText hide'
		let nicks
		nicks = generateNicks(txtName.value, txtSelect.value)
		for (var i = 0; i <= txtResult.length; i++) {
			txtResult[i].innerHTML = `${nicks}`
		}
	}
}

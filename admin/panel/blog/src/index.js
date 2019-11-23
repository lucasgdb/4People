M.FormSelect.init(document.querySelectorAll('select'))

Quill.register("modules/htmlEditButton", htmlEditButton)

const quill = new Quill('#snow-container', {
	modules: {
		formula: true,
		syntax: true,
		toolbar: '#toolbar-container',
		htmlEditButton: {}
	},
	placeholder: 'Escrever conteúdo...',
	theme: 'snow'
})

quill.root.setAttribute('spellcheck', false)

let lblQuillContent
const btnInsertPost = document.querySelector('#btnInsertPost')
const postContent = document.querySelector('#postContent')

btnInsertPost.addEventListener('click', () => {
	if (lblQuillContent.innerText.replace(/\n/g, '') === '') postContent.innerHTML = ''
	else postContent.innerHTML = lblQuillContent.innerHTML
})

window.addEventListener('DOMContentLoaded', () => {
	lblQuillContent = document.querySelector('.ql-editor')
})

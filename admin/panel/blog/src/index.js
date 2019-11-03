M.FormSelect.init(document.querySelectorAll('select'))

Quill.register(Quill.import('attributors/style/direction'), true)
Quill.register(Quill.import('attributors/style/align'), true)
Quill.register(Quill.import('attributors/style/size'), true)

const quill = new Quill('#snow-container', {
	modules: {
		formula: true,
		syntax: true,
		toolbar: '#toolbar-container'
	},
	placeholder: 'Escrever conteúdo...',
	theme: 'snow'
})

quill.root.setAttribute('spellcheck', false)

let lblQuillContent
const btnInsertPost = document.querySelector('#btnInsertPost')
const postContent = document.querySelector('#postContent')

btnInsertPost.addEventListener('click', () => {
	if (lblQuillContent.innerText.replace(/\n/g, '') === '') postContent.value = ''
	else postContent.value = lblQuillContent.innerHTML
})

window.addEventListener('DOMContentLoaded', () => {
	lblQuillContent = document.querySelector('.ql-editor')
})

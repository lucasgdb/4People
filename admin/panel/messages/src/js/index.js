Quill.register(Quill.import('attributors/style/direction'), true)
Quill.register(Quill.import('attributors/style/align'), true)
Quill.register(Quill.import('attributors/style/size'), true)

M.Modal.init(document.querySelectorAll('.modal'))
const messages = document.querySelector('#messages')
const btnMarkAsRead = document.querySelector('#markAsRead')
const btnMarkAsUnread = document.querySelector('#markAsUnread')
const linkRemoveMessage = document.querySelector('#linkRemoveMessage')
const lblMessageSubject = document.querySelector('#messageSubject')
const lblMessageSubjectTitle = document.querySelector('#messageSubjectTitle')
const lblMessageSubjectReply = document.querySelector('#messageSubjectReply')
const lblMessageReplied = document.querySelector('#messageReplied')
const lblMessageContent = document.querySelector('#messageContent')
const lblMessageReply = document.querySelector('#messageReply')
const lblMessageName = document.querySelector('#messageName')
const lblMessageEmail = document.querySelector('#messageEmail')
const lblMessageID = document.querySelector('#messageID')
const lblMessageNameReply = document.querySelector('#messageNameReply')
const lblMessageEmailReply = document.querySelector('#messageEmailReply')
const btnSendMessage = document.querySelector('#sendMessage')
const modalReplyEmail = M.Modal.getInstance(document.querySelector('#replyEmail'))
const formReply = document.querySelector('#formReply')
let lblQuillContent

new Quill('#snow-container', {
	modules: {
		formula: true,
		syntax: true,
		toolbar: '#toolbar-container'
	},
	placeholder: 'Escrever mensagem...',
	theme: 'snow'
})

const changeLink = (id, name, email) => {
	lblMessageName.innerHTML = name
	lblMessageEmail.innerHTML = email
	linkRemoveMessage.onclick = () => deleteMessage(id, name)
}

const changeMessage = (id, name, email, subject, content, isRead) => {
	if (isRead) {
		btnMarkAsRead.classList.add('hide')
		btnMarkAsUnread.classList.remove('hide')
		btnMarkAsUnread.onclick = () => unreadMessage(id, name)
	} else {
		btnMarkAsUnread.classList.add('hide')
		btnMarkAsRead.classList.remove('hide')
		btnMarkAsRead.onclick = () => readMessage(id, name)
	}

	lblMessageSubject.innerHTML = `Título: ${subject} - ${name} &lt;${email}&gt;`
	lblMessageSubjectTitle.innerHTML = `Título: ${subject} - ${name} &lt;${email}&gt;`
	lblMessageID.value = id
	lblMessageNameReply.value = name
	lblMessageEmailReply.value = email
	lblMessageSubjectReply.value = subject
	lblMessageReplied.value = content
	lblMessageContent.innerHTML = content
}

const selectMessages = async () => {
	let messagesHTML = ''

	const data = await (await fetch('src/select_messages.php')).json()

	for (const i in data) {
		messagesHTML += (
			`<tr>
				<td>${data[i][1]}</td>
				<td>${data[i][2]}</td>
				<td>${data[i][3]}</td>
				<td>
					<button class="btn waves-effect waves-light ${data[i][5] === '1' ? 'grey darken-1' : 'green darken-3'} modal-trigger z-depth-0" onclick="changeMessage('${data[i][0]}', '${data[i][1]}', '${data[i][2]}', '${data[i][3]}', '${data[i][4]}', ${data[i][5] === '1'})" style="cursor:pointer" title="Ler Mensagem" data-target="readMessage"><i class="material-icons">remove_red_eye</i></button>
					<button class="btn waves-effect waves-light red-color modal-trigger z-depth-0" style="cursor:pointer" title="Remover Mensagem" onclick="changeLink(${data[i][0]}, '${data[i][1]}', '${data[i][2]}')" style="cursor:pointer" title="Remover Mensagem" data-target="removeMessage"><i class="material-icons">delete</i></button>
				</td>
			</tr>`
		)
	}

	messages.innerHTML = messagesHTML
}

const deleteMessage = async (id, name) => {
	const data = await (await fetch(`src/delete_message.php?message_id=${id}`)).json()

	if (data.status === '1') {
		M.toast({
			html: `A mensagem de ${name} foi removida.`,
			classes: 'green'
		})

		selectMessages()
	} else {
		M.toast({
			html: `Não foi possível remover a mensagem de ${name}.`,
			classes: 'red accent-4'
		})
	}
}

const readMessage = async (id, name) => {
	const data = await (await fetch(`src/read_message.php?message_id=${id}`)).json()

	if (data.status === '1') {
		M.toast({
			html: `A mensagem de ${name} foi marcada como lida.`,
			classes: 'green'
		})

		selectMessages()
	} else {
		M.toast({
			html: `Não foi possível marcar a mensagem de ${name} como lida.`,
			classes: 'red accent-4'
		})
	}
}

const unreadMessage = async (id, name) => {
	const data = await (await fetch(`src/unread_message.php?message_id=${id}`)).json()

	if (data.status === '1') {
		M.toast({
			html: `A mensagem de ${name} foi desmarcada como lida.`,
			classes: 'green'
		})

		selectMessages()
	} else {
		M.toast({
			html: `Não foi possível desmarcar a mensagem de ${name} como lida.`,
			classes: 'red accent-4'
		})
	}
}

formReply.onsubmit = async e => {
	e.preventDefault()
	btnSendMessage.disabled = true

	const data = await (await fetch('src/send_email.php', {
		method: 'POST',
		body: new FormData(formReply)
	})).json()

	if (data.status === '1') {
		M.toast({
			html: `A mensagem foi respondida.`,
			classes: 'green'
		})

		selectMessages()
	} else {
		M.toast({
			html: `Não foi possível responder a mensagem.`,
			classes: 'red accent-4'
		})
	}

	btnSendMessage.disabled = false
	modalReplyEmail.close()
}

btnSendMessage.addEventListener('click', () => {
	if (lblQuillContent.innerText.replace(/\n/g, '') === '') lblMessageReply.value = ''
	else lblMessageReply.value = lblQuillContent.innerHTML
})

window.addEventListener('DOMContentLoaded', () => {
	lblQuillContent = document.querySelector('.ql-editor')

	selectMessages()
})

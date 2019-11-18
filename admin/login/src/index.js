const txtPassword = document.querySelector('input[name=admin_password]')
const txtPasswordIcon = document.querySelector('#visibility')
const formLogin = document.querySelector('[name=formLogin]')
const formInsert = document.querySelector('[name=formInsert]')
const lblBannedStatus = document.querySelector('#bannedStatus')
const adminNickname = document.querySelector('#admin_nickname')
const adminPassword = document.querySelector('#admin_password')
const chkRemember = document.querySelector('#remember')
const nickName = localStorage.getItem('nickname')

if (nickName) chkRemember.checked = true

if (formLogin) {
	if (nickName !== undefined) adminNickname.value = nickName

	formLogin.onsubmit = async e => {
		e.preventDefault()

		const btnSubmit = formLogin.querySelector('button')
		btnSubmit.disabled = true

		const body = new FormData(formLogin)

		const result = await (await fetch('src/login.php', {
			method: 'POST',
			body
		})).json()

		if (result.status === '1') {
			if (chkRemember.checked) localStorage.setItem('nickname', body.get('admin_nickname'))
			else localStorage.removeItem('nickname')

			location = '../panel/'
		}
		else {
			M.toast({
				html: result.reason === 'wrong' ? 'Login e/ou senha inexistente.' : 'Você está banido temporariamente.',
				classes: 'red accent-4'
			})

			txtPassword.value = ''
			txtPassword.classList.remove('valid')
			checkBannedStatus()
		}

		btnSubmit.disabled = false
	}
}

if (formInsert) {
	formInsert.onsubmit = async e => {
		e.preventDefault()
		const btnSubmit = formInsert.querySelector('button')
		btnSubmit.disabled = true

		const data = await (await fetch('src/insert_admin.php', {
			method: 'POST',
			body: new FormData(formInsert)
		})).json()

		if (data.status === '1') location.reload()
		else {
			M.toast({
				html: `Erro ao se registrar.`,
				classes: 'red accent-4'
			})
		}

		btnSubmit.disabled = false
	}
}

const checkBannedStatus = async () => {
	const data = await (await fetch('src/check_banned_status.php')).json()

	if (lblBannedStatus) {
		if (data.banned_status === '1') {
			if (parseInt(data.banned_amount) > 3) {
				lblBannedStatus.className = 'btn-flat mt-2 red-text btn-flat-hover'
				lblBannedStatus.innerHTML = `Você foi bloqueado de logar por: ${data.banned_time}`
			} else {
				lblBannedStatus.className = 'btn-flat mt-2 btn-flat-hover'
				lblBannedStatus.innerHTML = `Número de tentativas falhas: ${data.banned_amount}/3`
			}
		} else lblBannedStatus.className = 'hide'
	}
}

const switchVisibility = () => {
	if (txtPassword.type === 'password') {
		txtPassword.type = 'text'
		txtPasswordIcon.innerText = 'visibility_off'
	} else {
		txtPassword.type = 'password'
		txtPasswordIcon.innerText = 'remove_red_eye'
	}
}

window.addEventListener('load', () => {
	checkBannedStatus()

	if (adminNickname.value === '') adminNickname.focus()
	else adminPassword.focus()
})

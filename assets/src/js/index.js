M.Slider.init(document.querySelectorAll('.slider'), {
	interval: 5000,
	height: innerWidth <= 600 ? 450 : 320
})

// M.Modal.init(document.querySelectorAll('.modal'), {
// 	dismissible: false
// })

const agreementModal = M.Modal.getInstance(document.querySelector('#agreements'))
agreementModal.open()

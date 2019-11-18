// Body Mass Index
const calculateBMI = (height, weight, sex) => {
	let bmi = weight / height ** 2
	if (!Number.isFinite(bmi)) bmi = 0

	const description = bmi < 17 ?
		'Muito abaixo do peso' : bmi < 18.5 ?
		'Abaixo do peso' : bmi < 24.5 ?
		'Peso normal' : bmi < 30 ?
		'Acima do peso' : bmi < 35 ?
		'Obesidade 1' : bmi < 40 ?
		'Obesidade 2 (Severa)' : 'Obesidade 3 (Mórbida)'

	const idealWeight = sex === 'M' ?
		72.7 * height - 58 :
		62.1 * height - 44.7

	return {
		bmi,
		description,
		idealWeight
	}
}

import React, { useState, useEffect } from 'react';
let aux1 = null
let stop = 0

const Home = () => {
	let [color, setColor] = useState('')
	let [active, setActive] = useState(false)
	let [purple, setPurple] = useState(false)

	let aux = ['green', 'yellow', 'red']

	function int() {
		let count = 1
			let int = setInterval(() => {
			setColor(aux[count])
			count++
			if (count > aux.length -1) count = 0
		}, 1000);
		aux1 = int
		
	}
	// Para que alterne colores.
	useEffect(() => {
		if (active == true && color == '') {
			setColor('green')
			int()		}
		else if (active == false) {
			clearInterval(aux1)
			setColor('')
		}
	})

	// Para añadir/quitar el color morado
	let mor = <div className={`light purple ${color == 'purple' ? 'glow-purple' : ''}`} onClick={() => setColor('purple')}></div>
	useEffect(() => {
		if (purple){
			aux.push('purple')
		}
		else if (aux[3] == 'purple') {
			aux.pop()
		}
		// Adaptar el intervalo
		if (purple && active && stop == 0){
			clearInterval(aux1)
			int()
			stop++
		}
		else if (!purple && stop > 0) {
			stop = 0
			clearInterval(aux1)
			int()
		}
	})

	return (
		<div className="contenedor">
			<div className='traffic-light'>
				<button type="button" className="btn btn-secondary" onClick={purple == false ? () => setPurple(true) : () => setPurple(false)}>
					{/* Texto del botón morado */}
					{purple == false ? 'Add Purple' : 'Rem Purple'}</button>
				<div className={`light red ${color == 'red' ? 'glow-red' : ''}`}   onClick={() => setColor('red')}></div>
				<div className={`light yellow ${color == 'yellow' ? 'glow-yellow' : ''}`} onClick={() => setColor('yellow')}></div>
				<div className={`light green ${color == 'green' ? 'glow-green' : ''}`} onClick={() => setColor('green')}></div>
				{purple == true ? mor : null}
				<button type="button" className="btn btn-secondary" onClick={active == false ? () => setActive(true) : () => setActive(false)}>{color == '' ? 'Active' : 'Deactive'}</button>
			</div>
		</div>
	);
};

export default Home;

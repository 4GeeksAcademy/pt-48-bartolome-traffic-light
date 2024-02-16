import React, { useState, useEffect } from 'react';
let intervaloID = null
let stop = 0

const HomeNuevo = () => {
	let [colorSemaforo, setColorSemaforo] = useState('')
	let [active, setActive] = useState(false)
	let [addPurple, setAddPurple] = useState(false)

	let listaColores = ['green', 'yellow', 'red']

	function handleInterval() {		
		let count = 1
		let intervalo = setInterval(() => {
			setColorSemaforo(listaColores[count])
			count++
			if (count > listaColores.length -1) count = 0
		}, 1000);
		intervaloID = intervalo
	}

	useEffect(() => {
		if (active == true && colorSemaforo == '') {
			setColorSemaforo('green')
			handleInterval()
		}

		if (active == false) {
			clearInterval(intervaloID)
			setColorSemaforo('')
		}

		if (addPurple){
			listaColores.push('purple')
		}

		else if (listaColores[3] == 'purple') {
			listaColores.pop()
		}

		if (addPurple && active && stop == 0){
			clearInterval(intervaloID)
			handleInterval()
			stop++
		}

		else if (!addPurple && stop > 0) {
			stop = 0
			clearInterval(intervaloID)
			handleInterval()
		}
	})

	function HTMLColor(color){
		return (<div className={`light ${color} ${colorSemaforo == color ? 'glow-'+color : ''}`} onClick={() => setColorSemaforo(color)}></div>)
	}

	return (
		<div className="contenedor">
			<div className='traffic-light'>
				<button type="button" className="btn btn-secondary" onClick={addPurple == false ? () => setAddPurple(true) : () => setAddPurple(false)}>
					{addPurple == false ? 'Add Purple' : 'Rem Purple'}
				</button>
				{HTMLColor("red")}
				{HTMLColor("yellow")}
				{HTMLColor("green")}
				{addPurple == true ? HTMLColor("purple") : null}
				<button type="button" className="btn btn-secondary" onClick={active == false ? () => setActive(true) : () => setActive(false)}>
					{colorSemaforo == '' ? 'Active' : 'Deactive'}
				</button>
			</div>
		</div>
	);
};

export default HomeNuevo;
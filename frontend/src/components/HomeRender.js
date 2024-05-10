import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState } from 'react';

import { useEffect } from 'react';

function GLTFModel({ url, position, scale }) {
	const gltf = useLoader(GLTFLoader, url);
	const group = useRef();

	// Usa el hook useFrame para actualizar la rotación en cada frame
	useFrame(() => {
		group.current.rotation.y += 0.01; // Ajusta la velocidad de rotación según sea necesario
	});

	return (
		<group ref={group} position={position} scale={scale}>
			<mesh onPointerOver={() => null}>
				<primitive object={gltf.scene} dispose={null} />
			</mesh>
		</group>
	);
}


const HomeRender = () => {
	const modelScale = [2, 2, 2];
	const [frame, setFrame] = useState(1);
	const [temple, setTemple] = useState(1);

	const [templeTips, setTempleTips] = useState(1);
	const [lenses, setLenses] = useState(1);

	const [frameColor, setFrameColor] = useState('black');
	const [templeColor, setTempleColor] = useState('black');

	const [lensesColor, setLensesColor] = useState('black');
	const [templeTipsColor, setTempleTipsColor] = useState('black');


	const templesTipsCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
	const templesCircleColors = ['Black', 'Silver'];
	const frameCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
	const lensesCircleColors = ['Vision', 'Sunglasses'];

	useEffect(() => {
		// const list = [
		// 	'frame1',
		// 	'frame2',
		// 	'frame3',
		// 	'frame4',
		// 	'frame5',
		// 	'templeModel1',
		// 	'templeModel2',
		// 	'templeTipsModel1'
		// ];
		// const visibles = [true, false, false, true, true];

		// const setVisible = (button, entities, visible) => {
		// 	if (visible) {
		// 		button.classList.add("selected");
		// 	} else {
		// 		button.classList.remove("selected");
		// 	}
		// 	entities.forEach((entity) => {
		// 		entity.setAttribute("visible", visible);
		// 	});
		// };

		// list.forEach((item, index) => {
		// 	const button = document.querySelector("#" + item);
		// 	const entities = document.querySelectorAll("." + item + "-entity");
		// 	setVisible(button, entities, visibles[index]);
		// 	button.addEventListener('click', () => {
		// 		visibles[index] = !visibles[index];
		// 		setVisible(button, entities, visibles[index]);
		// 	});
		// });
	}, []);



	const handleSubmit = () => {
		alert(`Frame color: ${frameColor}, Temple color: ${templeColor}`);
	};

	useEffect(() => {
		switch (frameColor) {
			case "black":
				setFrame(1);
				break;
			case "red":
				setFrame(2);
				break;
			case "pink":
				setFrame(3);
				break;
			case "orange":
				setFrame(4);
				break;
			case "blue":
				setFrame(5);
				break;
			default:
				setFrame(1);
		}
	}, [frameColor]);

	useEffect(() => {
		switch (templeColor) {
			case "black":
				setTemple(1);
				break;
			case "red":
				setTemple(2);
				break;
			case "pink":
				setTemple(3);
				break;
			case "orange":
				setTemple(4);
				break;
			case "blue":
				setTemple(5);
				break;
			default:
				setTemple(1);
		}
	}, [templeColor]);

	useEffect(() => {
		switch (templeTipsColor) {
			case "black":
				setTempleTips(1);
				break;
			case "silver":
				setTempleTips(2);
				break;
			default:
				setTempleTips(1);
		}
	}, [templeTipsColor]);

	useEffect(() => {
		switch (lensesColor) {
			case "black":
				setLenses(1);
				break;
			case "silver":
				setLenses(2);
				break;
			default:
				setLenses(2);
		}
	}, [templeTipsColor]);


	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true, // Habilitar el desplazamiento al arrastrar
		draggable: true // Permitir arrastrar con el ratón
	};

	const OptionsSelector = ({ title, selectedOption, setSelectedOption, options }) => (
		<div className='flex flex-col items-center'>
			<p className='text-2xl mb-8 font-semibold '>{title}</p>
			<div className='w-full mt-6'>
				<div className='flex justify-around items-center'>
					{options.map((option) => (
						<div
							key={option}
							className={`flex flex-col items-center cursor-pointer ${selectedOption === option ? 'bg-gray-300' : ''}`}
							onClick={() => setSelectedOption(option)}
						>
							<div className={`w-12 h-12 rounded-full mb-2 ${selectedOption === option ? 'scale-125' : 'scale-110'}`}>
								{/* Estilo CSS para el círculo */}
								<div className="w-full h-full rounded-full bg-red-500"></div>
							</div>
							<div className={`text-center ${selectedOption === option ? 'font-semibold' : 'font-normal'}`}>{option}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const RangeSlider = () => {
		const [value, setValue] = useState(50);

		const handleChange = (e) => {
			setValue(e.target.value);
		};
		const rangeValues = ['Texto 1', 'Texto 2', 'Texto 3', 'Texto 4', 'Texto 5'];
		return (
			<div className='flex flex-col'>
				<div className="flex flex-col items-center space-y-4">
					<label className="text-gray-600">Valor:</label>
					<input
						type="range"
						id="range"
						min="1"
						max="5"
						step="1"
						value={value}
						onChange={handleChange}
						list="tickmarks"
						className="w-full h-1 bg-primary rounded-lg outline-none cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100"
					/>
					<div className="flex justify-between bg-primary text-secundary w-full items-center">
						<span >
							Azul
						</span>
						<span >
							Verde
						</span>
						<span >
							Rojo
						</span>
						<span >
							Naranja
						</span>
						<span >
							Rosa
						</span>
					</div>
				</div>

			</div>
		);
	};



	return (
		<div className="justify-center flex flex-col p-4 mt-20 rounded-lg  text-terciary border-2  bg-gray-200">
			<div className='mb-8 text-center flex flex-row justify-between items-center text-2xl'>
				<p className='w-40 '><span className="text-secundary">NEW</span> feature</p>
				<p>Create your own glasses</p>
				<button className="w-40 h-10 mt-2 bg-white text-black font-bold mb-2 rounded-md cursor-pointer text-sm hover:bg-white hover:text-secundary ">
					Try it!
				</button>

			</div>
			<div className='flex flex-row justify-around'>
				<div className="w-1/2 h-80 border-2 border-primary p-4 mr-2 rounded-lg  ">
					<Canvas camera={{ position: [0, 0, 12.25], fov: 15 }}>
						<ambientLight intensity={1.25} />
						<ambientLight intensity={0.1} />
						<directionalLight intensity={0.4} />
						<Suspense fallback={null}>
							<GLTFModel
								url={`https://localhost:443/assets/custom/frames/custom-frame-${frame}.gltf`}
								position={[0, 0, 0]}
								scale={modelScale}
							/>

							<GLTFModel
								url={`https://localhost:443/assets/custom/temples/custom-temple-${temple}.gltf`}
								position={[0, 0, 0]}
								scale={modelScale}
							/>

							<GLTFModel
								url={`https://localhost:443/assets/custom/temples-tips/custom-temple-tips-2.gltf`}
								position={[0, 0, 0]} // Ajusta la posición para cada objeto
								scale={modelScale}
							/>

							<GLTFModel
								url={`https://localhost:443/assets/custom/lenses/custom-lenses-${lenses}.gltf`}
								position={[0, 0, 0]}
								scale={modelScale}
							/>
						</Suspense>
					</Canvas>
				</div>
				<div className="w-1/2 h-80 p-4 ml-2 rounded-lg">
					<RangeSlider />
					{/* <Slider {...settings} className="h-60">
						<div className="w-4/5 p-4">
							<OptionsSelector title={'Frame'} selectedOption={frameColor} setSelectedOption={setFrameColor} options={frameCircleColors} />
						</div>

						<div className="w-4/5 p-4">
							<OptionsSelector title={'Temple'} selectedOption={templeColor} setSelectedOption={setTempleColor} options={templesCircleColors} />
						</div>

						<div className="w-4/5 p-4">
							<OptionsSelector title={'Temple Tips'} selectedOption={templeTipsColor} setSelectedOption={setTempleTipsColor} options={templesTipsCircleColors} />
						</div>

						<div className="w-4/5 p-4">
							<OptionsSelector title={'Lenses'} selectedOption={lensesColor} setSelectedOption={setLensesColor} options={lensesCircleColors} />
						</div>
					</Slider> */}
				</div>
			</div>
		</div>
	);
}

export default HomeRender;




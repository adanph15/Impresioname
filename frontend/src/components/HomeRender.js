import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState } from 'react';

import { useEffect } from 'react';
import RenderSelection from './RenderSelection';
import RenderOptions from './RenderOptions';

function GLTFModel({ url, position, scale }) {
	const gltf = useLoader(GLTFLoader, url);
	const group = useRef();

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
	const modelScale = [2.5, 2.5, 2.5];
	const [frame, setFrame] = useState(1);
	const [temple, setTemple] = useState(1);

	const [templeTips, setTempleTips] = useState(1);
	const [lenses, setLenses] = useState(1);

	const [selectedPart, setSelectedPart] = useState(null);
	
	return (
		<div className="justify-center flex flex-col p-4 mt-24 rounded-lg  text-terciary border-2  bg-gray-200 info-home">
			<div className='mb-8 text-center flex flex-row justify-between items-center text-2xl'>
				<p className='w-40 '><span className="text-secundary">NEW</span> feature</p>
				<p>Create your own glasses</p>
				<button className="w-40 h-10 mt-2 bg-white text-black font-bold mb-2 rounded-md cursor-pointer text-sm hover:bg-white hover:text-secundary ">
					Try it!
				</button>

			</div>
			<div className='flex flex-col justify-around customs'>
				<div className="h-[32rem]  border-2 border-primary p-4 mr-2 rounded-lg flex flex-row">
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
								url={`https://localhost:443/assets/custom/temples-tips/custom-temple-tips-${templeTips}.gltf`}
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

					<div className='flex flex-col w-1/3 '>
						<div className="h-1/4  mt-[-8px] mb-1">
							<RenderSelection part="frame" folder="frames" partID={frame} setSelectedPart={setSelectedPart} className="z-50" />
						</div>

						<div className="h-1/4  mb-1">
							<RenderSelection part="lenses" folder="lenses" partID={lenses} setSelectedPart={setSelectedPart} className="z-50" />
						</div>

						<div className="h-1/4  mb-1">
							<RenderSelection part="temple" folder="temples" partID={temple} setSelectedPart={setSelectedPart} className="z-50" />
						</div>

						<div className="h-1/4  mb-1">
							<RenderSelection part="temple-tips" folder="temples-tips" partID={templeTips} setSelectedPart={setSelectedPart} className="z-50" />
						</div>
					</div>
				</div>

				<div className="p-4  ml-10 rounded-lg flex flex-col">
					<RenderOptions part={selectedPart} setFrame={setFrame} setLenses={setLenses} setTemple={setTemple} setTempleTips={setTempleTips}  />
				</div>
			</div>
		</div>
	);
}

export default HomeRender;




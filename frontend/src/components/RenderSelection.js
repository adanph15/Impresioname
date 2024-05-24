import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const RenderSelection = ({ part, folder, partID, setSelectedPart }) => {
    const handleClick = () => {
        setSelectedPart(part);
    };

    function GLTFModelFramesSelection({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        let time = 0;

        useFrame(() => {
            time += 0.01;
            const offsetY = Math.sin(time * Math.PI) * 0.09;

            group.current.position.y = offsetY - 0.7;
        });

        return (
            <group ref={group} position={[-0.75, 0, 0]} scale={[12, 12, 12]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    const FrameSelections = () => {
        return (
            <button className='h-full w-full  border border-primary rounded-lg' onClick={handleClick}>
                <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }} >
                    <ambientLight intensity={1.25} />
                    <ambientLight intensity={0.1} />
                    <directionalLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <GLTFModelFramesSelection
                            url={`https://localhost/assets/custom/${folder}/custom-${part}-${partID}.gltf`}
                        />
                    </Suspense>
                </Canvas>
            </button>
        );
    }


    function GLTFModelLensesSelection({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        let time = 0;

        useFrame(() => {
            time += 0.01;
            const offsetY = Math.sin(time * Math.PI) * 0.09;

            group.current.position.y = offsetY - 0.7;
        });

        return (
            <group ref={group} position={[-0.75, 0, 0]} scale={[12, 12, 12]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    function GLTFModelRotateTipsSelection({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        let time = 0;

        useFrame(() => {
            time += 0.01;
            const offsetY = Math.sin(time * Math.PI) * 0.04;

            group.current.position.y = offsetY ;
        });
        return (
            <group ref={group} position={[4, 0, 0]} scale={[8, 8, 8]} rotation={[0, 90, 0]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    function GLTFModelRotateTempleSelection({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        let time = 0;

        useFrame(() => {
            time += 0.01;
            const offsetY = Math.sin(time * Math.PI) * 0.04;

            group.current.position.y = offsetY ;
        });

        return (
            <group ref={group} position={[0.8, 0, 0]} scale={[7, 7, 7]} rotation={[0, 10, 0]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }


    const LensesSelections = () => {
        return (
            <button className='h-full w-full  border border-primary rounded-lg ' onClick={handleClick}>
                <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                    <ambientLight intensity={1.25} />
                    <ambientLight intensity={0.1} />
                    <directionalLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <GLTFModelLensesSelection
                            url={`https://localhost/assets/custom/${folder}/custom-${part}-${partID}.gltf`}
                        />
                    </Suspense>
                </Canvas>
            </button>
        );
    }

    const TemplesSelections = () => {
        return (
            <button className='h-full w-full  border border-primary rounded-lg ' onClick={handleClick}>
                <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                    <ambientLight intensity={1.25} />
                    <ambientLight intensity={0.1} />
                    <directionalLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <GLTFModelRotateTempleSelection
                            url={`https://localhost/assets/custom/${folder}/custom-${part}-${partID}.gltf`}
                        />
                    </Suspense>
                </Canvas>
            </button>
        );
    }

    const TemplesTipsSelections = () => {
        return (
            <button className='h-full w-full  border border-primary rounded-lg ' onClick={handleClick}>
                <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                    <ambientLight intensity={1.25} />
                    <ambientLight intensity={0.1} />
                    <directionalLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <GLTFModelRotateTipsSelection
                            url={`https://localhost/assets/custom/${folder}/custom-${part}-${partID}.gltf`}
                        />
                    </Suspense>
                </Canvas>
            </button>
        );
    }

    switch (part) {
        case "frame":
            return (
                <>
                    <FrameSelections />
                </>
            );
        case "lenses":
            return (
                <>
                    <LensesSelections />
                </>
            );
        case "temple":
            return (
                <>
                    <TemplesSelections />
                </>
            );
        case "temple-tips":
            return (
                <>
                    <TemplesTipsSelections />
                </>
            );
        default:
            return (
                <>
                    <FrameSelections />
                </>
            );
    }

}




export default RenderSelection;

import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const RenderOptions = ({ part, setFrame, setLenses, setTemple, setTempleTips }) => {

    const handleClick = (id) => {
        switch (part) {
            case "frame":
                setFrame(id);
                break;
            case "lenses":
                setLenses(id);
                break;
            case "temple":
                setTemple(id);
                break;
            case "temple-tips":
                setTempleTips(id);
                break;
            default:
                break;
        }
    };

    function GLTFModelFramesOption({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        let time = 0;

        useFrame(() => {
            time += 0.01;
            const offsetY = Math.sin(time * Math.PI) * 0.09;

            if (group.current) {
                group.current.position.y = offsetY - 0.5;
            }
        });

        return (
            <group ref={group} position={[2, 0, 0]} scale={[10, 10, 10]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }


    const FrameOptions = () => {
        const frames = [1, 2, 3, 4, 5];

        return (
            <div className='w-full flex flex-row justify-around gap-4 mt-4'>
                {frames.map(frame => (
                    <div className='w-1/5' key={frame}>
                        <button className='w-[175px] border border-primary rounded-lg  ' onClick={() => handleClick(frame)}>
                            <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                                <ambientLight intensity={1.25} />
                                <ambientLight intensity={0.1} />
                                <directionalLight intensity={0.4} />
                                <Suspense fallback={null}>
                                    <GLTFModelFramesOption url={`https://localhost/assets/custom-option/frames/custom-frame-${frame}.gltf`} />
                                </Suspense>
                            </Canvas>
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function GLTFModelLensesOption({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        useFrame(() => {
            group.current.position.y += Math.sin(Date.now() * 0.001) * 0.004;
        });

        return (
            <group ref={group} position={[2, -0.5, 0]} scale={[10, 10, 10]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    function GLTFModelRotateTipsOption({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        useFrame(() => {
            group.current.position.y += Math.sin(Date.now() * 0.001) * 0.004;
        });

        return (
            <group ref={group} position={[3, 0, 0]} scale={[6, 6, 6]} rotation={[0, 90, 0]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    function GLTFModelRotateTempleOption({ url }) {
        const gltf = useLoader(GLTFLoader, url);
        const group = useRef();

        useFrame(() => {
            group.current.position.y += Math.sin(Date.now() * 0.001) * 0.004;
        });

        return (
            <group ref={group} position={[0.8, 0, 0]} scale={[6, 6, 6]} rotation={[0, 10, 0]}>
                <mesh onPointerOver={() => null}>
                    <primitive object={gltf.scene} dispose={null} />
                </mesh>
            </group>
        );
    }

    const LensesOptions = () => {
        const lenses = [1, 2]
        return (
            <div className='w-full  flex flex-row justify-around gap-4 mt-4' >
                <div className='w-1/5'></div>
                {lenses.map(lense => (
                    <div className='w-1/5' key={lense}>
                        <button className='w-[175px] border border-primary rounded-lg ' onClick={() => handleClick(lense)}>
                            <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                                <ambientLight intensity={1.25} />
                                <ambientLight intensity={0.1} />
                                <directionalLight intensity={0.4} />
                                <Suspense fallback={null}>
                                    <GLTFModelLensesOption
                                        url={`https://localhost/assets/custom-option/lenses/custom-lenses-${lense}.gltf`}
                                    />
                                </Suspense>
                            </Canvas>
                        </button>
                    </div>
                ))}
                <div className='w-1/5'></div>
            </div>
        );
    }
    
    const TemplesOptions = () => {
        const temples = [1, 2];
        return (
            <div className='w-full  flex flex-row justify-around gap-4 mt-4' >
                <div className='w-1/5'></div>
                {temples.map(temple => (
                    <div className='w-1/5' key={temple}>
                        <button className='w-[175px]  border border-primary rounded-lg' onClick={() => handleClick(temple)}>
                            <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                                <ambientLight intensity={1.25} />
                                <ambientLight intensity={0.1} />
                                <directionalLight intensity={0.4} />
                                <Suspense fallback={null}>
                                    <GLTFModelRotateTempleOption
                                        url={`https://localhost/assets/custom-option/temples/custom-temple-${temple}.gltf`}
                                    />
                                </Suspense>
                            </Canvas>
                        </button>
                    </div>
                ))}
                <div className='w-1/5'></div>
            </div>
        );
    }
    
    const TemplesTipsOptions = () => {
        const templestips = [1,2,3,4,5];
        return (
            <div className='w-full  flex flex-row justify-around gap-4 mt-4' >
                {templestips.map(templetip => (
                    <div className='w-1/5' key={templetip}>
                        <button className='w-[175px] border border-primary rounded-lg' onClick={() => handleClick(templetip)}>
                            <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
                                <ambientLight intensity={1.25} />
                                <ambientLight intensity={0.1} />
                                <directionalLight intensity={0.4} />
                                <Suspense fallback={null}>
                                    <GLTFModelRotateTipsOption
                                        url={`https://localhost/assets/custom-option/temples-tips/custom-temple-tips-${templetip}.gltf`}
                                    />
                                </Suspense>
                            </Canvas>
                        </button>
                    </div>
                ))}
            </div>
        );
    }
    


    switch (part) {
        case "frame":
            return (
                <>
                    <FrameOptions />
                </>
            );
        case "lenses":
            return (
                <>
                    <LensesOptions />
                </>
            );
        case "temple":
            return (
                <>
                    <TemplesOptions />
                </>
            );
        case "temple-tips":
            return (
                <>
                    <TemplesTipsOptions />
                </>
            );
        default:
            return (
                <>
                    <FrameOptions />
                </>
            );
    }
}

export default RenderOptions;
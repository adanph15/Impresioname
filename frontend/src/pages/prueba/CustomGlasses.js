import React, { useState, Suspense, useRef } from 'react';
import RenderOptions from '../../components/RenderOptions';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Header from '../../components/header/Header';

const RenderSelection = ({ part, folder, partID, setSelectedPart }) => {
  const handleClick = () => {
    setSelectedPart(part);
  };

  function GLTFModelFramesSelection({ url, scale }) {
    const gltf = useLoader(GLTFLoader, url);
    const group = useRef();

    return (
      <group ref={group} position={[-0.75, 0, 0]} scale={scale}>
        <mesh onPointerOver={() => null}>
          <primitive object={gltf.scene} dispose={null} />
        </mesh>
      </group>
    );
  }

  function GLTFModelLensesSelection({ url, scale }) {
    const gltf = useLoader(GLTFLoader, url);
    const group = useRef();

    return (
      <group ref={group} position={[-0.75, 0, 0]} scale={scale}>
        <mesh onPointerOver={() => null}>
          <primitive object={gltf.scene} dispose={null} />
        </mesh>
      </group>
    );
  }

  function GLTFModelRotateTipsSelection({ url, scale }) {
    const gltf = useLoader(GLTFLoader, url);
    const group = useRef();

    return (
      <group ref={group} position={[4, 0, 0]} scale={scale} rotation={[0, 90, 0]}>
        <mesh onPointerOver={() => null}>
          <primitive object={gltf.scene} dispose={null} />
        </mesh>
      </group>
    );
  }

  function GLTFModelRotateTempleSelection({ url, scale }) {
    const gltf = useLoader(GLTFLoader, url);
    const group = useRef();

    return (
      <group ref={group} position={[0.8, 0, 0]} scale={scale} rotation={[0, 10, 0]}>
        <mesh onPointerOver={() => null}>
          <primitive object={gltf.scene} dispose={null} />
        </mesh>
      </group>
    );
  }

  const FrameSelections = () => {
    return (
      <button className='h-32 w-96  border border-primary rounded-lg' onClick={handleClick}>
        <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }} >
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <GLTFModelFramesSelection
              url={`${process.env.REACT_APP_SERVER_URL}assets/custom/${folder}/custom-frame-${partID}.gltf`}
              scale={[12, 12, 12]} // Tamaño predeterminado, puede ser ajustado
            />
          </Suspense>
        </Canvas>
      </button>
    );
  }

  const LensesSelections = () => {
    return (
      <button className='h-32 w-96  border border-primary rounded-lg ' onClick={handleClick}>
        <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <GLTFModelLensesSelection
              url={`${process.env.REACT_APP_SERVER_URL}assets/custom/${folder}/custom-lenses-${partID}.gltf`}
              scale={[12, 12, 12]} // Tamaño predeterminado, puede ser ajustado
            />
          </Suspense>
        </Canvas>
      </button>
    );
  }

  const TemplesSelections = () => {
    return (
      <button className='h-32 w-96  border border-primary rounded-lg ' onClick={handleClick}>
        <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <GLTFModelRotateTempleSelection
              url={`${process.env.REACT_APP_SERVER_URL}assets/custom/${folder}/custom-temple-${partID}.gltf`}
              scale={[7, 7, 7]} // Tamaño predeterminado, puede ser ajustado
            />
          </Suspense>
        </Canvas>
      </button>
    );
  }

  const TemplesTipsSelections = () => {
    return (
      <button className='h-32 w-96  border border-primary rounded-lg ' onClick={handleClick}>
        <Canvas camera={{ position: [0, 0, 12.25], fov: 20 }}>
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <GLTFModelRotateTipsSelection
              url={`${process.env.REACT_APP_SERVER_URL}assets/custom/${folder}/custom-temple-tips-${partID}.gltf`}
              scale={[8, 8, 8]} // Tamaño predeterminado, puede ser ajustado
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


const CustomGlasses = () => {
  const [frame, setFrame] = useState(1);
  const [temple, setTemple] = useState(1);
  const [templeTips, setTempleTips] = useState(1);
  const [lenses, setLenses] = useState(1);
  const [selectedPart, setSelectedPart] = useState(null);

  // Datos para la configuración de cada parte del modelo
  const anchorIndex = 168;
  const position = { x: 0, y: 0, z: 0 };
  const rotation = { x: 0, y: 0, z: 0 };
  const scale = { x: 1, y: 1, z: 1 };

  const frameModelId = `frames-${frame}`;
  const templeModelId = `temples-${temple}`;
  const templeTipsModelId = `temples-tips-${templeTips}`;
  const lensesModelId = `lenses-${lenses}`;

  return (
    <>
    <Header/>
      <div className="w-[100vw] h-[100vh] flex flex-col justifify-around">
        <div className='h-3/4 flex flex-row justify-around'>
          <div className="w-2/3 h-[80vh] " dangerouslySetInnerHTML={{
            __html: `

            <div class="example-container">
            <a-scene mindar-face embedded color-space="sRGB" renderer="colorManagement: true; physicallyCorrectLights: true;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
              <a-assets>
                <a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
                <a-asset-item id="frameModel" src="${process.env.REACT_APP_SERVER_URL}assets/${frameModelId}/scene.gltf"></a-asset-item>
                <a-asset-item id="templeModel" src="${process.env.REACT_APP_SERVER_URL}assets/${templeModelId}/scene.gltf"></a-asset-item>
                <a-asset-item id="templeTipsModel" src="${process.env.REACT_APP_SERVER_URL}assets/${templeTipsModelId}/scene.gltf"></a-asset-item>
                <a-asset-item id="lensesModel" src="${process.env.REACT_APP_SERVER_URL}assets/${lensesModelId}/scene.gltf"></a-asset-item>
              </a-assets>
              <a-camera active="false" position="0 0 0"></a-camera>
              <a-entity mindar-face-target="anchorIndex: ${anchorIndex}">
                <a-gltf-model position="${position.x} ${position.y} ${position.z}" rotation="${rotation.x} ${rotation.y} ${rotation.z}" scale="${scale.x} ${scale.y} ${scale.z}" src="#frameModel"
                  class="glasses-entity" visible="true">
                </a-gltf-model>
                <a-gltf-model position="${position.x} ${position.y} ${position.z}" rotation="${rotation.x} ${rotation.y} ${rotation.z}" scale="${scale.x} ${scale.y} ${scale.z}" src="#templeModel"
                  class="glasses-entity" visible="true">
                </a-gltf-model>
                <a-gltf-model position="${position.x} ${position.y} ${position.z}" rotation="${rotation.x} ${rotation.y} ${rotation.z}" scale="${scale.x} ${scale.y} ${scale.z}" src="#templeTipsModel"
                  class="glasses-entity" visible="true">
                </a-gltf-model>
                <a-gltf-model position="${position.x} ${position.y} ${position.z}" rotation="${rotation.x} ${rotation.y} ${rotation.z}" scale="${scale.x} ${scale.y} ${scale.z}" src="#lensesModel"
                  class="glasses-entity" visible="true">
                </a-gltf-model>
              </a-entity>
            </a-scene>
          </div>
        `
          }} />

          <div className='w-1/3 bg-gray-100'>
            <div className='flex flex-col max-w-96 mt-20 ml-16 '>
              <div className="h-1/5 mt-[-8px] mb-10">
                <RenderSelection part="frame" folder="frames" partID={frame} setSelectedPart={setSelectedPart} className="z-50" />
              </div>

              <div className="h-1/5 mb-10">
                <RenderSelection part="lenses" folder="lenses" partID={lenses} setSelectedPart={setSelectedPart} className="z-50" />
              </div>

              <div className="h-1/5 mb-10">
                <RenderSelection part="temple" folder="temples" partID={temple} setSelectedPart={setSelectedPart} className="z-50" />
              </div>

              <div className="h-1/5 mb-10">
                <RenderSelection part="temple-tips" folder="temples-tips" partID={templeTips} setSelectedPart={setSelectedPart} className="z-50" />
              </div>
            </div>

          </div>
        </div>
        <div className='h-1/4'>

          <div className="p-4 rounded-lg flex flex-col bg-gray-100 pb-10 flex justify-center">
            <RenderOptions part={selectedPart} setFrame={setFrame} setLenses={setLenses} setTemple={setTemple} setTempleTips={setTempleTips} />
          </div>

        </div>




      </div>
    </>
  );
}

export default CustomGlasses;



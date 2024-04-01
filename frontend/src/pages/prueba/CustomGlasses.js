import './prueba.css';
import { useState } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-face-aframe.prod.js';
import Previewer from '../../components/previewer/Previewer';
import Header from "../../components/header/Header";



const CustomGlasses = () => {
  const [frame, setFrame] = useState('');
  const [temples, setTemples] = useState('');
  const [frameColor, setFrameColor] = useState('black');
  const [templeColor, setTempleColor] = useState('black');
  const colors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];

  const ColorPicker = ({ title, setColor }) => (
    <div style={{ padding: '10px' }} className='controls-item'>
      <h2>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3em' }}>
        {colors.map((color) => (
          <div key={color} style={{ textAlign: 'center', color: `${color.toLowerCase()}` }}>
            <div
              className={`color-circle ${color.toLowerCase()}`}
              onClick={() => setColor(color)}
            />
            <div>{color}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = () => {
    alert(`Frame color: ${frameColor}, Temple color: ${templeColor}`);
  };

  // const App = () => {
  //   const data = 'lorem <b>ipsum</b>';

  //   return (
  //     <div
  //       dangerouslySetInnerHTML={{__html: data}}
  //     />
  //   );
  // }
  // <Previewer />
  return (
    <>
      <Header />
      <div className='custom'>
        <div className={`preview ${frameColor} ${templeColor}`} style={{ position: 'relative', overflow: 'hidden' }}>

          <div dangerouslySetInnerHTML={{
            __html: `
            <div>
                <a-scene mindar-face embedded color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights"
                    vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                    <a-assets>
                        <a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
                        <a-asset-item id="glassesModel" src="https://localhost:443/assets/glasses-3/scene.gltf"></a-asset-item>
                    </a-assets>
                    <a-camera active="false" position="0 0 0"></a-camera>
                    <a-entity mindar-face-target="anchorIndex: 188">
                        <a-gltf-model rotation="0 0 0" position="-0.2 -0.09 0.22" scale="0.003 0.003 0.003" src="#glassesModel" visible="true"></a-gltf-model>
                    </a-entity>
                </a-scene>
            </div>
        ` }} />
        </div>
        <div className='controls'>
          <ColorPicker title="Frame" setColor={setFrameColor} />
          <ColorPicker title="Temples" setColor={setTempleColor} />
          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default CustomGlasses;
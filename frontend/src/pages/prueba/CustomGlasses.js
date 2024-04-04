import { useEffect, useState } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-face-aframe.prod.js';
import './circleColors.css'
import Header from "../../components/header/Header";
import OptionCarrousel from '../../components/optionCarrousel/OptionCarrousel';

const CustomGlasses = () => {
  const [frame, setFrame] = useState(0);
  const [temple, setTemple] = useState(0);

  const [templeTips, setTempleTips] = useState(0);
  const [lenses, setLenses] = useState(0);

  const [frameColor, setFrameColor] = useState('black');
  const [templeColor, setTempleColor] = useState('black');

  const [lensesColor, setLensesColor] = useState('black');
  const [templeTipsColor, setTempleTipsColor] = useState('black');

  const frameCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
  const templeTipsCircleColors = ['Black', 'Red', 'Pink', 'Orange', 'Blue'];
  const templeCircleColors = ['Black', 'Silver'];
  const lensesCircleColors = ['Vision glasses', 'Sunglasses']

  const ColorPicker = ({ title, setColor, colors }) => (
    <div style={{ padding: '10px' }} className='controls-item'>
      <h2>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3em' }}>
        {colors.map((color) => (
          <div key={color} style={{ textAlign: 'center', color: `${color.toLowerCase()}` }}>
            <div
              className={`color-circle ${color.toLowerCase()}`}
              onClick={() => setColor(color.toLowerCase())}
            />
            <div className={`color-circle-text ${color.toLowerCase()}`}>{color}</div>
          </div>
        ))}
      </div>
    </div>
  );

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
        setTempleTipsColor(1);
        break;
      case "silver":
        setTempleTipsColor(2);
        break;
      default:
        setTempleTipsColor(1);
    }
  }, [templeTipsColor]);

  return (
    <>
      <Header />

      <div dangerouslySetInnerHTML={{
        __html: `
            <div>
              <a-scene mindar-face embedded color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                  <a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
                  <a-asset-item id="frameModel" src="https://localhost:443/assets/custom/frames/custom-frame-${frame}.gltf"></a-asset-item>
                  <a-asset-item id="templeModel" src="https://localhost:443/assets/custom/temples/custom-temple-${temple}.gltf"></a-asset-item>
                  <a-asset-item id="templeTipsModel" src="https://localhost:443/assets/custom/temples-tips/custom-temple-tips-${templeTips}.gltf"></a-asset-item>
                  <a-asset-item id="lensesModel" src="https://localhost:443/assets/custom/lenses/custom-lenses-${lenses}.gltf"></a-asset-item>
                </a-assets>
                <a-camera active="false" position="0 0 0"></a-camera>
                <a-entity mindar-face-target="anchorIndex: 188">
                  <a-gltf-model rotation="0 0 0" position="0 0 0" scale="1 1 1" src="#frameModel" visible="true"></a-gltf-model>
                </a-entity>
                <a-entity mindar-face-target="anchorIndex: 188">
                    <a-gltf-model rotation="0 0 0" position="0 0 0" scale="1 1 1" src="#templeModel" visible="true"></a-gltf-model>
                </a-entity>
                <a-entity mindar-face-target="anchorIndex: 188">
                  <a-gltf-model rotation="0 0 0" position="0 0 0" scale="1 1 1" src="#templeTipsModel" visible="true"></a-gltf-model>
                </a-entity>
                <a-entity mindar-face-target="anchorIndex: 188">
                  <a-gltf-model rotation="0 0 0" position="0 0 0" scale="1 1 1" src="#lensesModel" visible="true"></a-gltf-model>
                </a-entity>
              </a-scene>
            </div>
        ` }} />

      <OptionCarrousel setLensesColor={setLensesColor} setFrameColor={setFrameColor} setTempleColor={setTempleColor} setTempleTipsColor={setTempleTipsColor} />


    </>
  );
}

export default CustomGlasses;




      {/* <div className='controls'>
          <ColorPicker title="Frame" setColor={setFrameColor} colors={frameCircleColors} />
          <ColorPicker title="Temples" setColor={setTempleColor} colors={templeCircleColors} />
          <ColorPicker title="Temples Tips" setColor={setTempleTipsColor} colors={templeTipsCircleColors} />
          <ColorPicker title="Lenses" setColor={setLensesColor} colors={lensesCircleColors} />
          <button className='custom-button' onClick={handleSubmit}>Submit</button>
        </div> */}




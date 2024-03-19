import React, { useEffect } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-face-aframe.prod.js';
import './prueba.css';
import { Helmet } from 'react-helmet';


const Prueba = () => {
    function goToShop() {
        window.location.href = "/shop-men";
    }

    return (
        <div className="example-container">
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <a-scene mindar-face embedded color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights"
                vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-assets>
                    <a-asset-item id="headModel"
                        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
                    <a-asset-item id="glassesModel3" src="./assets/glasses-3/scene.gltf"></a-asset-item>
                </a-assets>
                <a-camera active="false" position="0 0 0"></a-camera>
                <a-entity mindar-face-target="anchorIndex: 168">
                    <a-gltf-model mindar-face-occluder position="0 -0.3 0.15" rotation="0 0 0" scale="0.065 0.065 0.065"
                        src="#headModel">
                    </a-gltf-model>
                </a-entity>
                <a-entity mindar-face-target="anchorIndex: 188">
                    <a-gltf-model rotation="0 0 0" position="-0.2 -0.09 0.22" scale="0.003 0.003 0.003" src="#glassesModel3"
                        className="glasses3-entity" visible="true">
                    </a-gltf-model>
                </a-entity>
                <button onClick={goToShop} className="exit-button">Exit</button>
            </a-scene>
        </div>
    );
};

export default Prueba;

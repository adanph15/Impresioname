import React, { useEffect, useState } from 'react';
import "./prueba.css"
import { useParams } from 'react-router-dom';
import 'aframe';
import 'mind-ar/dist/mindar-face-aframe.prod.js';

const Prueba = () => {

    const { id } = useParams();

    const [modelId, setModelId] = useState(1);
    const [anchorIndex, setAnchorIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });

    useEffect(() => {
        const idNumber = parseInt(id);
        switch (idNumber > 0) {
            case (idNumber >= 1 && idNumber <= 7):
                setModelId(3);
                setAnchorIndex(188);
                setPosition({ x: -0.2, y: -0.09, z: 0.22 });
                setRotation({ x: 0, y: 0, z: 0 });
                setScale({ x: 0.003, y: 0.003, z: 0.003 });
                break;
            case (idNumber >= 8 && idNumber <= 14):
                setModelId(5);
                setAnchorIndex(188);
                setPosition({ x: 0.05, y: -0.09, z: -0.09 });
                setRotation({ x: 0, y: 0, z: 0 });
                setScale({ x: 0.1, y: 0.1, z: 0.1 });
                break;
            case (idNumber >= 15 && idNumber <= 19):
                setModelId(1);
                setAnchorIndex(188);
                setPosition({ x: 0.05, y: -0.59, z: -0.5 });
                setRotation({ x: 0, y: 0, z: 0 });
                setScale({ x: 0.002, y: 0.002, z: 0.002 });
                break;
            case (idNumber >= 20 && idNumber <= 23):
                setModelId(4);
                setAnchorIndex(188);
                setPosition({ x: 0.05, y: 0.1, z: 0.015 });
                setRotation({ x: 0, y: 0, z: 0 });
                setScale({ x: 0.365, y: 0.365, z: 0.365 });
                break;
            case (idNumber >= 24 && idNumber <= 28):
                setModelId(6);
                setAnchorIndex(188);
                setPosition({ x: 0.055, y: -0.09, z: 0.1 });
                setRotation({ x: 0, y: 0, z: 0 });
                setScale({ x: 4.2, y: 4.2, z: 4.2 });
                break;
            case (idNumber >= 29 && idNumber <= 42):
                setModelId(2);
                setAnchorIndex(188);
                setPosition({ x: 0.07, y: -0.3, z: 0.1 });
                setRotation({ x: 0, y: -90, z: 0 });
                setScale({ x: 0.08, y: 0.08, z: 0.08 });
                break;
        }

    }, [id]);

    return (
        <div dangerouslySetInnerHTML={{
            __html: `
            <div class="example-container">
                <a-scene mindar-face embedded color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights"
                    vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                    <a-assets>
                        <a-asset-item id="headModel"
                            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
                        <a-asset-item id="glassesModel" src="https://localhost:443/assets/glasses-${modelId}/scene.gltf"></a-asset-item>
                    </a-assets>
                    <a-camera active="false" position="0 0 0"></a-camera>
                    <a-entity mindar-face-target="anchorIndex: ${anchorIndex}">
                        <a-gltf-model position="${position.x} ${position.y} ${position.z}" rotation="${rotation.x} ${rotation.y} ${rotation.z}" scale="${scale.x} ${scale.y} ${scale.z}" src="#glassesModel"
                        class="glasses-entity" visible="true">
                        </a-gltf-model>
                    </a-entity>
                    <button id="exitButton" class="exit-button">Exit</button>
                </a-scene>
            </div>
        ` }} />
    );
}

export default Prueba;


//
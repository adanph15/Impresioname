// import React, { useState } from 'react';
// import 'aframe';
// import 'mind-ar/dist/mindar-face-aframe.prod.js';
// // ... (previous imports)
// import 'aframe-occludee-component/dist/aframe-occludee-component.min.js';

// const MODEL_URLS = {
//   hat1: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/hat/scene.gltf',
//   hat2: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/hat2/scene.gltf',
//   glasses1: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/glasses/scene.gltf',
//   glasses2: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/glasses2/scene.gltf',
//   earring: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/earring/scene.gltf'
// };

// const SceneModel = ({ model, visible }) => {
//   const modelRef = useRef();

//   useEffect(() => {
//     if (modelRef.current && visible) {
//       modelRef.current.setAttribute('visible', true);
//     } else if (modelRef.current) {
//       modelRef.current.setAttribute('visible', false);
//     }
//   }, [visible]);

//   return <a-gltf-model src={model} ref={modelRef} />;
// };

// const ThreeService = () => {
//   // ... (previous state and effects)
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [models, setModels] = useState({});

//   useEffect(() => {
//     const fetchModel = async (url) => {
//       const response = await fetch(url);
//       const data = await response.text();
//       const parser = new DOMParser();
//       const parsedDoc = parser.parseFromString(data, 'text/xml');
//       return parsedDoc.querySelector('a-asset');
//     };

//     Promise.all(Object.values(MODEL_URLS).map(fetchModel)).then((models) => {
//       setModels(
//         Object.fromEntries(
//           models.map((model, index) => [Object.keys(THUMBNAIL_URLS)[index], model])
//         )
//       );
//     });
//   }, []);

//   const handleSelectItem = (item) => {
//     setSelectedItem((prevSelectedItem) => (prevSelectedItem === item ? null : item));
//   };

//   return (
//     <div className="example-container">
//       {/* ... (previous components) */}
//       {Object.entries(models).map(([key, value]) => (
//         <SceneEntity
//           key={key}
//           item={{
//             ...value.querySelector('a-gltf-model').attributes,
//             visible: selectedItem === key ? 'true' : 'false'
//           }}
//         />
//       ))}
//       {selectedItem && (
//         <SceneModel model={models[selectedItem].querySelector('a-gltf-model').attributes.src.value} visible={selectedItem !== null} />
//       )}
//     </div>
//   );
// };

// export default ThreeService;

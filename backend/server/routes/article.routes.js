module.exports = app => {
  const article = require("../controllers/article.controller");
  const temple = require("../controllers/temple.controller");
  const templeTips = require("../controllers/templeTips.controller");
  const frame = require("../controllers/frame.controller");
  const lenses = require("../controllers/lenses.controller");
  const { uploadImage } = require('../multer/upload');
  const { templeGltf, templeTipsGltf, frameGltf, lensesGltf } = require('../multer/multergltf');

  // Article
  app.get("/api/article/:id", article.findOne);

  app.get("/api/article", article.findAll);

  app.get("/api/article/category/:category?", article.findCategory);

  app.post("/api/article", uploadImage, article.create); // Utiliza uploadImage para imágenes

  app.put("/api/article/:id", uploadImage, article.update); // Utiliza uploadImage para imágenes

  app.delete("/api/article/:id", article.delete);

  // Temple
  app.get("/api/temple/:id", temple.findOne);

  app.get("/api/temple", temple.findAll);

  app.get("/api/temple/category/:category?", temple.findCategory);

  app.post("/api/temple", templeGltf, temple.create); // Utiliza uploadGltf para archivos .gltf

  app.put("/api/temple/:id", templeGltf, temple.update); // Utiliza uploadGltf para archivos .gltf

  app.delete("/api/temple/:id", temple.delete);

  // TempleTips
  app.get("/api/templeTips/:id", templeTips.findOne);

  app.get("/api/templeTips", templeTips.findAll);

  app.get("/api/templeTips/category/:category?", templeTips.findCategory);

  app.post("/api/templeTips", templeTipsGltf, templeTips.create); // Utiliza uploadGltf para archivos .gltf

  app.put("/api/templeTips/:id", templeTipsGltf, templeTips.update); // Utiliza uploadGltf para archivos .gltf

  app.delete("/api/templeTips/:id", templeTips.delete);

  // Frame
  app.get("/api/frame/:id", frame.findOne);

  app.get("/api/frame", frame.findAll);

  app.get("/api/frame/category/:category?", frame.findCategory);

  app.post("/api/frame", frameGltf, frame.create); // Utiliza uploadGltf para archivos .gltf

  app.put("/api/frame/:id", frameGltf, frame.update); // Utiliza uploadGltf para archivos .gltf

  app.delete("/api/frame/:id", frame.delete);

  // Lenses
  app.get("/api/lenses/:id", lenses.findOne);

  app.get("/api/lenses", lenses.findAll);

  app.get("/api/lenses/category/:category?", lenses.findCategory);

  app.post("/api/lenses", lensesGltf, lenses.create); // Utiliza uploadGltf para archivos .gltf

  app.put("/api/lenses/:id", lensesGltf, lenses.update); // Utiliza uploadGltf para archivos .gltf

  app.delete("/api/lenses/:id", lenses.delete);
}

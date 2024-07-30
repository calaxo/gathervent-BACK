const multer = require('multer');
const path = require('path');

// Configuration de stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // Dossier où les fichiers seront enregistrés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname); // Nom de fichier unique
  }
});


// Initialisation de multer
const upload = multer({
  storage: storage,
limits: { fileSize: 500000 * 1024 * 1024 }
  


});

module.exports = upload;


const path = require('path');
const fs = require('fs');

const serveStaticRecursive = (rootDir) => {

  return function (req, res, next) {
    const filePath = path.join(rootDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      console.log("fichier envoye:  "+filePath+" \n");
    } else {
      next();
    }
  };
}


module.exports = serveStaticRecursive;
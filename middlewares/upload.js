import multer from "multer";
import path from "node:path";

const destination = path.resolve("temp");

/* const storage = multer.diskStorage({
    destination,
    filename = (req, file, callback) => {
      const uniquePrefix
  }
  },
});
 */

////
import multer from "multer";
import express from "../app.js";
import HttpError from "../helpers/HttpError.js";

// При переході по такому URL браузер відобразить зображення. Shell http://locahost:<порт>/avatars/<ім'я файлу з розширенням>

/* const multer  = require('multer')
const upload = multer({ dest: "uploads/" });
const upload = multer({ dest: './public/data/uploads/' })
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
}); */

const multer = async (req, res, next) => {
  const {} = req;

  /*  if () {
    return next(HttpError(401, "Authorization header missing"));
  }

  if () {
    return next(HttpError(401, "Invalid authorization format"));
  }

  try {
   
    if () {
      return next(HttpError(401, "Not authorized"));
    }

    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }; */
};

const upload = multer({
  storage: storage,
});

upload.single("picture");

export default multer;

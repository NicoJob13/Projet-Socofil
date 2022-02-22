const res = require("express/lib/response");
const multer = require("multer");

const filename = (req, file, cb) => {
  const name = file.originalname
    .split(" ")
    .join("_")
    .substring(0, file.originalname.lastIndexOf("."));
  const ext = file.originalname.substring(
    file.originalname.lastIndexOf(".") + 1
  );
  cb(null, name + "_" + Date.now() + "." + ext);
};

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: filename,
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/postimages");
  },
  filename: filename,
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    req.fileFormat_error = "Only .png, .jpg and .jpeg format allowed !";
    cb(null, false);
  }
};

exports.uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: fileFilter,
}).single("picture");

exports.uploadImage = multer({
  storage: imageStorage,
  fileFilter: fileFilter,
}).single("picture");

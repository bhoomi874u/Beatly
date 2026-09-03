const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {

    console.log("MULTER FILE:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype
    });

    if (file.fieldname === "image") {
      return {
        folder: "beatly/images",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
      };
    }

    if (file.fieldname === "audio") {
      return {
        folder: "beatly/audio",
        resource_type: "video",
        allowed_formats: ["mp3", "wav", "m4a"]
      };
    }

    throw new Error("Invalid file field");
  }
});

const upload = multer({
  storage: storage
});

module.exports = upload;
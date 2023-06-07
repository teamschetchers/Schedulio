const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dhjxzkwe3",
  api_key: "382154126572631",
  api_secret: "qaFFBuI4fBtc6lsAijP987gkzb8",
  secure: true,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
    width: 500,
    quality: "auto",
    fetch_format: "auto",
    crop: "scale",
    format: "jpg",
    resource_type: "image",
  },
});

const uploadImage = async (image) => {
  if (image) {
    const result = await cloudinary.uploader.upload(image, {
      public_id: image,
      folder: "DEV",
      width: 500,
      quality: "auto",
      fetch_format: "auto",
      crop: "scale",
      format: "jpg",
    });
  }
};

const deleteImage = (image) =>
  cloudinary.uploader.destroy(image, {
    invalidate: true,
    resource_type: "image",
  });

module.exports = { cloudinary, storage, uploadImage, deleteImage };

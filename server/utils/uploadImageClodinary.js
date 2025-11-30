// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLODINARY_CLOUD_NAME,
//   api_key: process.env.CLODINARY_API_KEY,
//   api_secret: process.env.CLODINARY_API_SECRET_KEY,
// });

// const uploadImageClodinary = async (image) => {
//   const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

//   const uploadImage = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
//         return resolve(uploadResult);
//       })
//       .end(buffer);
//   });

//   return uploadImage;
// };

// export default uploadImageClodinary;
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLODINARY_CLOUD_NAME,
//   api_key: process.env.CLODINARY_API_KEY,
//   api_secret: process.env.CLODINARY_API_SECRET_KEY,
// });

// const uploadImageClodinary = async (image) => {
//   const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

//   const uploadImage = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
//         return resolve(uploadResult);
//       })
//       .end(buffer);
//   });

//   return uploadImage;
// };

// export default uploadImageClodinary;
import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLODINARY_CLOUD_NAME,
//   api_key: process.env.CLODINARY_API_KEY,
//   api_secret: process.env.CLODINARY_API_SECRET_KEY,
// });
cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

const uploadImageClodinary = (image) => {
  return new Promise((resolve, reject) => {
    if (!image || !image.buffer) {
      return reject(new Error("Image buffer missing"));
    }

    cloudinary.uploader
      .upload_stream({ folder: "binkeyit" }, (error, result) => {
        if (error) {
          console.log("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      })
      .end(image.buffer);
  });
};

export default uploadImageClodinary;

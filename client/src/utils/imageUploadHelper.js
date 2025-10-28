// import uploadImage from "./UploadImage";

// export async function uploadAndSetImage(e, setData, field = "image") {
//   const file = e.target.files[0];
//   if (!file) return;

//   try {
//     const response = await uploadImage(file);
//     const { data: ImageResponse } = response;

//     setData((prev) => ({
//       ...prev,
//       [field]: ImageResponse.data.url,
//     }));
//   } catch (error) {
//     throw error;
//   }
// }
// const uploadImage = require("./UploadImage");

// async function uploadAndSetImage(e, setData, field = "image") {
//   const file = e.target.files[0];
//   if (!file) return;

//   try {
//     const response = await uploadImage(file);
//     const { data: ImageResponse } = response;

//     setData((prev) => ({
//       ...prev,
//       [field]: ImageResponse.data.url,
//     }));
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = { uploadAndSetImage };
// import uploadImage from "./UploadImage";

// export async function uploadAndSetImage(e, setData, field = "image") {
//   const file = e.target.files[0];
//   if (!file) return;

//   try {
//     const response = await uploadImage(file);
//     const { data: ImageResponse } = response;

//     setData((prev) => ({
//       ...prev,
//       [field]: ImageResponse.data.url,
//     }));
//   } catch (error) {
//     throw error;
//   }
// }
import uploadImage from "./UploadImage";

export async function uploadAndSetImage(e, setData, field = "image") {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const response = await uploadImage(file);

    // Support both response shapes
    const imageUrl = response.data?.data?.url || response.data?.url || "";

    if (!imageUrl) {
      throw new Error("Image URL not found in the upload response");
    }

    setData((prev) => ({
      ...prev,
      [field]: imageUrl,
    }));
  } catch (error) {
    throw error;
  }
}

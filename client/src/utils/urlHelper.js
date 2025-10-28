// import { valideURLConvert } from "./valideURLConvert";

// export function getRedirectURL(id, name, subCategoryData) {
//   const subcategory = subCategoryData.find((sub) => {
//     return sub.category.some((c) => c._id == id);
//   });

//   const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
//     subcategory?.name
//   )}-${subcategory?._id}`;

//   return url;
// }
// const { valideURLConvert } = require("./valideURLConvert");

// function getRedirectURL(id, name, subCategoryData) {
//   const subcategory = subCategoryData.find((sub) => {
//     return sub.category.some((c) => c._id == id);
//   });

//   const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
//     subcategory?.name
//   )}-${subcategory?._id}`;
//   return url;
// }

// module.exports = { getRedirectURL };
import { valideURLConvert } from "./valideURLConvert";

export function getRedirectURL(id, name, subCategoryData) {
  const subcategory = subCategoryData.find((sub) => {
    return sub.category.some((c) => c._id == id);
  });

  const url = `/${valideURLConvert(name || "")}-${id}/${valideURLConvert(
    subcategory?.name || "undefined"
  )}-${subcategory?._id || "undefined"}`;
  return url;
}

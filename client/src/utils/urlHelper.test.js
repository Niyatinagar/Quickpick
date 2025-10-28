// const { getRedirectURL } = require("./urlHelper");

// const valideURLConvert = (str) => str.toLowerCase().replace(/\s+/g, "-");

// jest.mock("../utils/valideURLConvert", () => ({
//   valideURLConvert: (str) => str.toLowerCase().replace(/\s+/g, "-"),
// }));

// describe("getRedirectURL", () => {
//   it("should generate correct URL", () => {
//     const id = "123";
//     const name = "Fruits";
//     const subCategoryData = [
//       {
//         name: "Citrus",
//         _id: "sub1",
//         category: [{ _id: "123" }],
//       },
//     ];

//     const result = getRedirectURL(id, name, subCategoryData);
//     expect(result).toBe("/fruits-123/citrus-sub1");
//   });

//   it("should handle missing subcategory gracefully", () => {
//     const id = "999";
//     const name = "Vegetables";
//     const subCategoryData = [];

//     const result = getRedirectURL(id, name, subCategoryData);
//     expect(result).toBe("/vegetables-999/undefined-undefined");
//   });
// });
jest.mock("../utils/valideURLConvert", () => ({
  valideURLConvert: (str) =>
    str ? str.toLowerCase().replace(/\s+/g, "-") : "undefined",
}));

const { getRedirectURL } = require("./urlHelper");

describe("getRedirectURL", () => {
  it("should generate correct URL", () => {
    const id = "123";
    const name = "Fruits";
    const subCategoryData = [
      {
        name: "Citrus",
        _id: "sub1",
        category: [{ _id: "123" }],
      },
    ];

    const result = getRedirectURL(id, name, subCategoryData);
    expect(result).toBe("/fruits-123/citrus-sub1");
  });

  it("should handle missing subcategory gracefully", () => {
    const id = "999";
    const name = "Vegetables";
    const subCategoryData = [];

    const result = getRedirectURL(id, name, subCategoryData);
    expect(result).toBe("/vegetables-999/undefined-undefined");
  });
});

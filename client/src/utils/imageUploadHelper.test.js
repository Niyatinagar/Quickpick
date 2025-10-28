// const { uploadAndSetImage } = require("./imageUploadHelper");
// const uploadImage = require("./UploadImage");

// jest.mock("./UploadImage");

// describe("uploadAndSetImage", () => {
//   it("should update state with uploaded image URL", async () => {
//     const mockSetData = jest.fn();
//     const mockFile = new Blob(["image"], { type: "image/png" });
//     const mockEvent = { target: { files: [mockFile] } };

//     uploadImage.mockResolvedValue({
//       data: { data: { url: "https://example.com/image.png" } },
//     });

//     await uploadAndSetImage(mockEvent, mockSetData);

//     expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
//     const stateUpdater = mockSetData.mock.calls[0][0];
//     const updatedState = stateUpdater({});
//     expect(updatedState.image).toBe("https://example.com/image.png");
//   });

//   it("should not call setData if no file is selected", async () => {
//     const mockSetData = jest.fn();
//     const mockEvent = { target: { files: [] } };

//     await uploadAndSetImage(mockEvent, mockSetData);

//     expect(mockSetData).not.toHaveBeenCalled();
//   });
// });
const { uploadAndSetImage } = require("./imageUploadHelper");
jest.mock("./UploadImage", () => jest.fn());
const uploadImage = require("./UploadImage");

describe("uploadAndSetImage", () => {
  it("should update state with uploaded image URL", async () => {
    const mockSetData = jest.fn();
    const mockFile = new Blob(["image"], { type: "image/png" });
    const mockEvent = { target: { files: [mockFile] } };

    uploadImage.mockResolvedValue({
      data: { data: { url: "https://example.com/image.png" } },
    });

    await uploadAndSetImage(mockEvent, mockSetData);

    expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    const stateUpdater = mockSetData.mock.calls[0][0];
    const updatedState = stateUpdater({});
    expect(updatedState.image).toBe("https://example.com/image.png");
  });

  it("should not call setData if no file is selected", async () => {
    const mockSetData = jest.fn();
    const mockEvent = { target: { files: [] } };

    await uploadAndSetImage(mockEvent, mockSetData);

    expect(mockSetData).not.toHaveBeenCalled();
  });
});

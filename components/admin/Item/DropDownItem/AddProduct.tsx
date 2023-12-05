"use client";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { Drawer, Form, Modal, Select, Space, Upload, notification } from "antd";
import Input from "../Input";
import { useStateProvider } from "@context/StateProvider";
import { useData } from "@context/DataProviders";
import {
  convertToCodeFormat,
  uploadImage,
} from "@components/items/server-items/Handle";
import { addDocument } from "@config/Services/Firebase/FireStoreDB";

import TextEditor from "@components/admin/Item/CKEditor/TextEditor";
import { TypeProductItems, TypeProductItems2 } from "@assets/item";

const AddProduct = ({}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [Title, setTitle] = useState<any>("");
  const [titleUrl, setTitleUrl] = useState<string>("");
  const [Content, setContent] = useState<string>("");
  const [describe, setDescribe] = useState("");
  const [isType, setIsType] = useState<any>("");
  const [isParent, setIsParent] = useState("");
  const [isChildren, setIsChildren] = useState<any>("");
  const [typeUrl, setTypeUrl] = useState<string>("");
  const [parentUrl, setParentUrl] = useState<string>("");
  const [ListSubImage, setListSubImage] = useState<any>([]);
  const [isParent2, setIsParent2] = useState<any>("");
  const [parent2Url, setParent2Url] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setDropDown, setIsRefetch } = useStateProvider();
  const { productTypes } = useData();
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const { Option } = Select;
  const [tableData, setTableData] = useState([
    ["Size", "1mx2m", "1m2x2m", "1m4x2m", "1m6x2m", "1m8x2m"],
    ["5cm", "", "", "", "", ""],
    ["10cm", "", "", "", "", ""],
    ["15cm", "", "", "", "", ""],
    ["20cm", "", "", "", "", ""],
  ]);
  const handleInputChange = (rowIndex: any, colIndex: any, event: any) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = event.target.value;
    setTableData(newData);
  };

  const convertedData = tableData
    .map((row) => {
      const obj: any = {};
      tableData[0].forEach((header, index) => {
        if (header === "Size") {
          obj[header] = row[0];
        } else {
          obj[header] = row[index];
        }
      });
      return obj;
    })

    .filter(Boolean); // Loại bỏ các giá trị undefined (ở hàng đầu tiên) ra khỏi mảng kết quả

  const initial1 =
    "<p>Chất liệu: </p> <br/> <p>Màu sắc: </p> <br/> <p>Size: </p> <br/> <p>Chiều dài: </p> <br/> <p>Chiều rộng: </p> <br/> <p>Chiều cao: </p> <br/> <p>Trọng lượng: </p> <br/> <p>Thương hiệu: </p> <br/> <p>Xuất xứ: </p> <br/> <p>Chất liệu";
  const initDescribe = "<p> mô tả sản phẩm </p>";

  //convert to url,ex: "Hộp quà - giỏ quà" => "hop-qua-gio-qua"
  useEffect(() => {
    const handleChange = () => {
      const formattedType = convertToCodeFormat(isType);
      const formattedParent = convertToCodeFormat(isParent);
      const formattedTitle = convertToCodeFormat(Title);
      const formattedParent2 = convertToCodeFormat(isParent2);
      if (formattedType) {
        setTypeUrl(formattedType);
      }
      if (formattedParent) {
        setParentUrl(formattedParent);
      }

      if (formattedTitle) {
        setTitleUrl(formattedTitle);
      }
      if (formattedParent2) {
        setParent2Url(formattedParent2);
      }
    };
    handleChange();
  }, [isType, isParent, isChildren, Title, isParent2]);
  const handleDiscard = () => {
    setTitle("");
    setTitleUrl("");

    setContent("");
    setDescribe("");
    setIsType("");
    setIsParent("");
    setIsChildren("");
    setTypeUrl("");
    setParentUrl("");
    setListSubImage([]);
    setImageUrl("");
  };

  const HandleSubmit = () => {
    if (!Title) {
      notification["error"]({
        message: "Lỗi !!!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data: any = {
        title: Title,
        content: Content,
        describe: describe,
        price: convertedData,
        image: imageUrl,
        type: isType,
        typeUrl: typeUrl,
        parent: isParent,
        parentUrl: parentUrl,
        parent2: isParent2,
        parent2Url: parent2Url,
        state: "Còn hàng",
        url: titleUrl,
        discount: 0,
        newPrice: "",

        access: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        subimage: ListSubImage,
      };
      console.log(data);
      for (let key in data) {
        if (
          data[key] === undefined ||
          data[key] === "" ||
          data[key] === null ||
          data[key] === undefined
        ) {
          delete data[key];
        }
      }
      addDocument("products", data).then(() => {
        notification["success"]({
          message: "Tải lên thành công!",
          description: `Sản phẩm của bạn đã được tải lên !`,
        });

        setIsRefetch("CRUD products");
        // handleDiscard();
      });
    }
  };

  const HandleUploadImage = (e: any, locate: string, type: string) => {
    if (type === "mainImage") {
      uploadImage(e, locate).then((data: any) => {
        setImageUrl(data);
      });
    } else if (type === "subImage") {
      uploadImage(e, locate).then((data: any) => {
        setListSubImage((prevUrls: any) => [...prevUrls, data]);
      });
    }
  };

  const customRequest = async (options: any) => {
    options.onSuccess({});

    try {
      const url = await uploadImage(options.file, "avatar");
      const newUrl = {
        uid: options.file.uid,
        url: url,
      };
      setListSubImage((prev: any) => [...prev, newUrl]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleRemove = (file: any) => {
    const newImageUrl = ListSubImage.filter(
      (item: any) => item.uid !== file.uid
    );
    setImageUrl(newImageUrl);
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300 flex items-center justify-center`}
    >
      <div className="w-auto h-auto bg-white relative p-10  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Tải lên sản phẩm của bạn
        </p>
        <div className="flex flex-col">
          <div className="justify-center w-full grid grid-cols-3 items-start gap-5">
            <div className="">
              <div className="">
                <p className="text-md text-gray-400 mt-1">
                  Chọn ảnh cho sản phẩm của bạn
                </p>
              </div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col  items-center">
                      <label>
                        <p className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Chọn từ thiết bị
                        </p>
                        <input
                          type="file"
                          onChange={(e) =>
                            HandleUploadImage(e, "products", "mainImage")
                          }
                          className="w-0 h-0"
                          id="fileInput"
                        />
                      </label>
                    </div>
                  </div>
                </label>

                <div className="overflow-y-auto border rounded-xl w-full  h-[200px] mt-5">
                  <div className="p-1">
                    <img src={imageUrl} alt="product" />
                  </div>
                </div>
              </div>
            </div>
            <div className="  flex flex-col gap-3">
              <Input text="Tên sản phẩm" Value={Title} setValue={setTitle} />
              {/* <Input text="Giá sản phẩm" Value={Price} setValue={setPrice} /> */}

              <div className="">
                <label>Thông tin sản phẩm</label>
                <div
                  className="bg-gray-400  text-white  hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  Thêm thông tin sản phẩm
                </div>
              </div>
              <div className="">
                <label>Mô tả sản phẩm</label>
                <div
                  className="bg-gray-400  text-white  hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                  onClick={() => setOpenDescription(true)}
                >
                  Thêm mô tả sản phẩm
                </div>
              </div>
              <div className="">
                <label>Bảng giá sản phẩm</label>
                <div
                  className="bg-gray-400   text-white  hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Bảng giá sản phẩm
                </div>
              </div>
              <Form.Item label="Ảnh phụ">
                <Upload
                  customRequest={customRequest}
                  listType="picture-card"
                  onRemove={handleRemove}
                >
                  <div className="flex flex-col items-center">
                    <AiOutlinePlus className="text-[24px]" />
                    <div className="mt-2">Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <div className="  flex flex-col gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-md font-medium ">Mục 1:</label>
                  <select
                    className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    onChange={(e) => setIsParent(e.target.value)}
                  >
                    <option> -- Chọn mục 1 --</option>

                    {TypeProductItems.map((item, idx) => (
                      <option
                        key={idx}
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value={item.label}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-[190px]">
                  <label className="text-md font-medium ">Loại bài viết</label>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn loại bài viết"
                    onChange={setIsType}
                    optionLabelProp="label"
                  >
                    {productTypes
                      ?.filter((item: any) => item.parent === isParent)
                      .map((item: any, idx: any) => (
                        <Option key={idx} value={item.type} label={item.type}>
                          <Space>{item.type}</Space>
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium ">Mục 2:</label>
                <select
                  className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                  onChange={(e) => setIsParent2(e.target.value)}
                >
                  <option> -- Chọn mục 2 --</option>

                  {TypeProductItems2.map((item, idx) => (
                    <option
                      key={idx}
                      className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                      value={item.label}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-10 w-full justify-center">
            <button
              onClick={() => handleDiscard()}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Xóa
            </button>
            <button
              onClick={() => HandleSubmit()}
              type="button"
              className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Tải lên
            </button>
          </div>
        </div>

        <AiFillCloseCircle
          className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setDropDown("");
          }}
        />
      </div>
      <>
        <Drawer
          title="Thêm thông tin sản phẩm"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          width={800}
        >
          <TextEditor onChange={setContent} initialValue={initial1} />
        </Drawer>
      </>
      <>
        <Drawer
          title="Thêm mô tả sản phẩm"
          placement="right"
          onClose={() => setOpenDescription(false)}
          open={openDescription}
          width={800}
        >
          <TextEditor onChange={setDescribe} initialValue={initDescribe} />
        </Drawer>
      </>
      <>
        <Modal
          title="Cập nhật bảng giá sản phẩm"
          open={isModalOpen}
          width={800}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {row.map((cell, colIndex) => (
                      <td
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="border px-4 py-2"
                      >
                        {colIndex !== 0 ? (
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) =>
                              handleInputChange(rowIndex, colIndex, e)
                            }
                            className="w-full"
                          />
                        ) : (
                          <span>{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="overflow-x-auto">
            <table className="min-w-full">
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {row.map((cell, colIndex) => (
                      <td
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="border px-4 py-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </Modal>
      </>
    </div>
  );
};

export default AddProduct;

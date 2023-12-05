"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";

import { Drawer, Radio, Select, Space, notification } from "antd";

import Input from "../Input";

import { useStateProvider } from "@context/StateProvider";
import { useData } from "@context/DataProviders";
import {
  convertToCodeFormat,
  uploadImage,
} from "@components/items/server-items/Handle";
import { updateDocument } from "@config/Services/Firebase/FireStoreDB";
import { TypeProductItems } from "@assets/item";
import TextEditor from "@components/admin/Item/CKEditor/TextEditor";

const AddProduct = ({}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [Title, setTitle] = useState<any>();
  const [titleUrl, setTitleUrl] = useState<any>();
  const [Discount, setDiscount] = useState<any>();
  const [Content, setContent] = useState<string | undefined>();
  const [describe, setDescribe] = useState("");
  const [isType, setIsType] = useState<any>();
  const [isParent, setIsParent] = useState("Hộp quà-giỏ quà");
  const [isChildren, setIsChildren] = useState<any>();
  const [typeUrl, setTypeUrl] = useState<string | undefined>();
  const [parentUrl, setParentUrl] = useState<string | undefined>();
  const [childrenUrl, setChildrenUrl] = useState<string | undefined>();
  const [ListSubImage, setListSubImage] = useState<any>([]);
  const [value, setValue] = useState();
  const { setDropDown, setIsRefetch } = useStateProvider();
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [ProductData, setProductData] = useState<any>();
  const { Option } = Select;
  const { productTypes, Products, UpdateId } = useData();
  const [newPrice, setNewPrice] = useState<any>();
  const initial1 =
    "<p>Chất liệu: </p> <br/> <p>Màu sắc: </p> <br/> <p>Size: </p> <br/> <p>Chiều dài: </p> <br/> <p>Chiều rộng: </p> <br/> <p>Chiều cao: </p> <br/> <p>Trọng lượng: </p> <br/> <p>Thương hiệu: </p> <br/> <p>Xuất xứ: </p> <br/> <p>Chất liệu";
  const initDescribe = "<p> mô tả sản phẩm </p>";

  useEffect(() => {
    const sort = Products.filter((item: any) => item.id === UpdateId);
    if (sort.length > 0) {
      setProductData(sort[0]);
    }
  }, [UpdateId, Products]);

  useEffect(() => {
    const handleChange = () => {
      const formattedType = convertToCodeFormat(isType);
      const formattedParent = convertToCodeFormat(isParent);
      const formattedChildren = convertToCodeFormat(isChildren);
      const formattedTitle = convertToCodeFormat(Title);

      if (formattedType) {
        setTypeUrl(formattedType);
      }
      if (formattedParent) {
        setParentUrl(formattedParent);
      }
      if (formattedChildren) {
        setChildrenUrl(formattedChildren);
      }
      if (formattedTitle) {
        setTitleUrl(formattedTitle);
      }
    };
    handleChange();
  }, [isType, isParent, isChildren, Title]);

  const handleDiscard = () => {
    setTitle("");

    setContent("");
    setDescribe("");
    setIsType("");
    setIsParent("");
    setIsChildren("");
    setTypeUrl("");
    setParentUrl("");
    setChildrenUrl("");
    setListSubImage([]);
    setImageUrl("");
  };
  const headers = ["Size", "1mx2m", "1m2x2m", "1m4x2m", "1m6x2m", "1m8x2m"];

  const formattedTable = ProductData?.price.map((rowData: any, index: any) => {
    if (index === 0) {
      return headers;
    } else {
      return headers.map((header) => rowData[header] || "");
    }
  });

  useEffect(() => {
    //discount formattedTable with Discount value then set newPrice
    const applyDiscount = (priceArray: any, discountPercentage: any) => {
      // Bỏ qua phần tử đầu tiên vì đó là headers
      for (let i = 1; i < priceArray?.length; i++) {
        for (let j = 1; j < priceArray[i]?.length; j++) {
          if (priceArray[i][j] !== "") {
            const originalPrice = parseFloat(
              priceArray[i][j]?.replace(/\s+/g, "").replace(",", ".")
            );
            const discountedPrice =
              originalPrice * (1 - discountPercentage / 100);
            // Làm tròn giảm giá đến 2 chữ số thập
            // thêm dấu phẩy ngăn cách hàng nghìn
            priceArray[i][j] = discountedPrice
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // priceArray[i][j] = discountedPrice;
          }
        }
      }
      return priceArray;
    };
    const discountedPrices = applyDiscount(formattedTable, Discount);
    setNewPrice(discountedPrices);
  }, [Discount]);

  const convertedData = newPrice?.map((row: any) => {
    const obj: any = {};
    newPrice[0]?.forEach((header: any, index: any) => {
      if (header === "Size") {
        obj[header] = row[0];
      } else {
        obj[header] = row[index];
      }
    });
    return obj;
  });

  const HandleSubmit = () => {
    const data: any = {
      title: Title,
      content: Content,
      describe: describe,
      image: imageUrl,
      type: isType,
      typeUrl: typeUrl,
      parent: isParent,
      parentUrl: parentUrl,
      state: "Còn hàng",
      url: titleUrl,
      discount: Discount,
      newPrice: convertedData,

      access: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
      subimage: ListSubImage,
    };

    for (let key in data) {
      if (
        data[key] === undefined ||
        data[key] === "" ||
        data[key] === null ||
        data[key].length === 0
      ) {
        delete data[key];
      }
    }

    updateDocument("products", UpdateId, data).then(() => {
      notification["success"]({
        message: "Thành công!",
        description: `
      Thông tin đã được CẬP NHẬT !`,
      });
      setIsRefetch("CRUD products");
      handleDiscard();
    });
  };

  const HandleUploadImage = (e: any, locate: string, type: string) => {
    if (type === "image") {
      uploadImage(e, locate).then((data: any) => {
        setImageUrl(data);
      });
    } else if (type === "color") {
      uploadImage(e, locate).then((data: any) => {
        setListSubImage((prevUrls: any) => [...prevUrls, data]);
      });
    }
  };

  const popValue = (indexToRemove: number, type: string) => {
    if (type === "color") {
      setListSubImage((prevUrls: any) =>
        prevUrls.filter((_: any, index: any) => index !== indexToRemove)
      );
    }
  };

  return (
    <div className="font-LexendDeca">
      <p className="text-2xl font-bold text-center text-[30px] mb-5">
        Thông tin sản phẩm: {ProductData?.title}
      </p>

      <div className="justify-center w-full flex flex-col items-center gap-20">
        <div className="w-full">
          <div className="">
            <p className="text-md text-gray-400 mt-1">
              Chọn ảnh cho sản phẩm của bạn
            </p>
          </div>

          <div className="flex justify-between w-full gap-10">
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
                          HandleUploadImage(e, "products", "image")
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
                  <img src={ProductData?.image} alt="product" />
                </div>
              </div>
            </div>

            <div>
              <div>
                Bảng giá:
                <div className="mt-2">
                  <div className="overflow-x-auto ">
                    <table className="min-w-full">
                      <tbody>
                        {formattedTable?.map((row: any, rowIndex: any) => (
                          <tr key={`row-${rowIndex}`}>
                            {row.map((cell: any, colIndex: any) => (
                              <td
                                key={`cell-${rowIndex}-${colIndex}`}
                                className="border px-4 py-2 w-max truncate"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  PlaceHolder={Discount ? Discount : ProductData?.discount}
                  text="Giảm giá (%)"
                  Value={Discount}
                  setValue={setDiscount}
                  Input={true}
                />
              </div>
              <div>
                Bảng giá giảm:
                <div className="mt-2">
                  <div className="overflow-x-auto ">
                    <table className="min-w-full">
                      <tbody>
                        {newPrice?.map((row: any, rowIndex: any) => (
                          <tr key={`row-${rowIndex}`}>
                            {row.map((cell: any, colIndex: any) => (
                              <td
                                key={`cell-${rowIndex}-${colIndex}`}
                                className="border px-4 py-2 w-max truncate"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className=" w-[700px] flex flex-col  items-center">
            <div className="grid grid-cols-2 gap-5 w-full">
              {" "}
              <div className="  flex flex-col gap-3">
                <Input
                  PlaceHolder={ProductData?.title}
                  text="Tên sản phẩm"
                  Value={Title}
                  setValue={setTitle}
                />

                <div className="">
                  <label>Thông tin sản phẩm</label>
                  <div
                    className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    Chỉnh sửa thông tin sản phẩm
                  </div>
                </div>
                <div className="">
                  <label>Mô tả sản phẩm</label>
                  <div
                    className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                    onClick={() => setOpenDescription(true)}
                  >
                    Chỉnh sửa mô tả sản phẩm
                  </div>
                </div>
              </div>
              <div className="  flex flex-col gap-3">
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-md font-medium ">
                      Mục bài viết:
                    </label>
                    <select
                      className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                      onChange={(e) => setIsParent(e.target.value)}
                    >
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
                  {/* <div className="flex flex-col gap-2 w-[190px]">
                    <label className="text-md font-medium ">
                      Loại bài viết
                    </label>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Chọn loại bài viết"
                      onChange={setIsType}
                      optionLabelProp="label"
                    >
                      {productTypes
                        ?.filter((item: any) => item.parent === isParent)
                        .map((item: any, idx: any) => (
                          <Option value={item.type} label={item.type}>
                            <Space>{item.type}</Space>
                          </Option>
                        ))}
                    </Select>
                  </div> */}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-md font-medium ">Loại bài viết</label>

                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn loại bài viết"
                    onChange={setIsChildren}
                    optionLabelProp="label"
                  >
                    {productTypes
                      ?.filter((item: any) => item.type === isType)
                      .map((item: any, idx: any) => (
                        <>
                          {item.children.map((items: any, idx: number) => (
                            <Option
                              value={items.children}
                              label={items.children}
                            >
                              <Space>{items.children}</Space>
                            </Option>
                          ))}
                        </>
                      ))}
                  </Select>
                </div>
                <div className="mt-2">
                  <label className="text-md font-medium ">Loại bài viết</label>

                  <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  >
                    {["Còn hàng", "Hết hàng", "Đang cập nhật"].map((status) => (
                      <Radio value={status}>{status}</Radio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-10 ">
              <button
                onClick={() => handleDiscard()}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Nhập lại
              </button>
              <button
                onClick={() => HandleSubmit()}
                type="button"
                className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>

      <>
        <Drawer
          title="Chỉnh sửa thông tin sản phẩm"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          width={800}
        >
          <TextEditor
            onChange={setContent}
            initialValue={
              ProductData?.content ? ProductData?.content : initial1
            }
          />
        </Drawer>
      </>
      <>
        <Drawer
          title="Chỉnh sửa mô tả sản phẩm"
          placement="right"
          onClose={() => setOpenDescription(false)}
          open={openDescription}
          width={800}
        >
          <TextEditor
            onChange={setDescribe}
            initialValue={
              ProductData?.describe ? ProductData?.describe : initDescribe
            }
          />
        </Drawer>
      </>
    </div>
  );
};

export default AddProduct;

import { SiZalo } from "react-icons/si";
import {
  BsFacebook,
  BsMessenger,
  BsYoutube,
  BsBatteryCharging,
  BsFillSendExclamationFill,
  BsFillSendCheckFill,
  BsFillSendXFill,
} from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  AiFillInstagram,
  AiOutlineProfile,
  AiOutlineSlack,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaFirstOrderAlt, FaTiktok } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiNetworkChart, BiSlideshow } from "react-icons/bi";
import {
  TbCarouselHorizontal,
  TbCubeSend,
  TbListDetails,
  TbSlideshow,
} from "react-icons/tb";
import {
  MdAirlineSeatReclineNormal,
  MdManageAccounts,
  MdOutlineLocalCarWash,
  MdOutlinePostAdd,
} from "react-icons/md";
import { CgListTree, CgSize } from "react-icons/cg";
import { IoMdColorWand } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";

import { CiViewList } from "react-icons/ci";
import { IconType } from "react-icons/lib";
import { IoFlashOutline } from "react-icons/io5";

interface IconMappingType {
  [key: string]: IconType;
}

export const IconMapping: IconMappingType = {
  IoFlashOutline: IoFlashOutline,
  MdManageAccounts: MdManageAccounts,
  SiZalo: SiZalo,
  BsFacebook: BsFacebook,
  HiOutlineUserGroup: HiOutlineUserGroup,
  BsMessenger: BsMessenger,
  AiFillInstagram: AiFillInstagram,
  FaTiktok: FaTiktok,
  AiOutlineTwitter: AiOutlineTwitter,
  BsYoutube: BsYoutube,
  BiSlideshow: BiSlideshow,
  TbListDetails: TbListDetails,
  TbSlideshow: TbSlideshow,
  BiNetworkChart: BiNetworkChart,
  MdOutlinePostAdd: MdOutlinePostAdd,
  AiOutlineUnorderedList: AiOutlineUnorderedList,
  CgListTree: CgListTree,
  FaFirstOrderAlt: FaFirstOrderAlt,
  AiOutlineSlack: AiOutlineSlack,
  BsBatteryCharging: BsBatteryCharging,
  IoMdColorWand: IoMdColorWand,
  MdAirlineSeatReclineNormal: MdAirlineSeatReclineNormal,
  CgSize: CgSize,
  MdOutlineLocalCarWash: MdOutlineLocalCarWash,
  TbCarouselHorizontal: TbCarouselHorizontal,
  GiExitDoor: GiExitDoor,
  AiOutlineProfile: AiOutlineProfile,
  BsFillSendExclamationFill: BsFillSendExclamationFill,
  BsFillSendCheckFill: BsFillSendCheckFill,
  TbCubeSend: TbCubeSend,
  BsFillSendXFill: BsFillSendXFill,
  CiViewList: CiViewList,
};

import paymentAnimation from "./animation/payment.json";
import policyAnimation from "./animation/policy.json";
import rulesAnimation from "./animation/rules.json";
import securityAnimation from "./animation/security.json";

export const ProductSidebarAdmin = [
  {
    name: "Giới thiệu",
    icon: "AiOutlineSlack",
  },
  {
    name: "Sản phẩm",
    icon: "FaFirstOrderAlt",
  },
  {
    name: "Sale",
    icon: "IoFlashOutline",
  },
  {
    name: "Đơn hàng",
    icon: "AiOutlineUnorderedList",
  },
  {
    name: "Chi nhánh",
    icon: "CgListTree",
  },
];

export const WebsiteSidebarAdmin = [
  {
    name: "Thông tin website",
    icon: "TbListDetails",
  },
  {
    name: "Slide trình chiếu",
    icon: "TbSlideshow",
  },
  {
    name: "Kênh truyền thông",
    icon: "BiNetworkChart",
  },
  {
    name: "Bài viết",
    icon: "MdOutlinePostAdd",
  },
  {
    name: "Video",
    icon: "BiSlideshow",
  },
  {
    name: "Tài khoản",
    icon: "MdManageAccounts",
  },
];

export const SocialMediaDashboard = [
  {
    title: "Trang zalo",
    icon: "SiZalo",
    image:
      "https://atpsoftware.vn/wp-content/uploads//2020/03/20211208103735_id_zalo-1.jpg",
    style: "hover:text-blue-400 hover:bg-white",
  },
  {
    title: "Facebook cá nhân",
    icon: "BsFacebook",
    image:
      "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBsb2dvfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    style: "hover:bg-white hover:text-blue-600",
  },
  {
    title: "Trang Fanpage",
    icon: "HiOutlineUserGroup",
    image:
      "https://img.freepik.com/premium-photo/3d-pile-facebook-logo-background-facebook-famous-social-media-platform_73903-705.jpg?w=2000",
    style: "hover:bg-white hover:text-black p-1",
  },
  {
    title: "Trang Messenger",
    icon: "BsMessenger",
    image:
      "https://img.freepik.com/premium-photo/3d-facebook-messenger-logo-application-blue-background-social-media-communication_73903-695.jpg",
    style: "hover:bg-white hover:text-blue-600 p-1",
  },
  {
    title: "Trang Instagram",
    icon: "AiFillInstagram",
    image: "https://images2.alphacoders.com/123/1230947.png",
    style: "hover:bg-pink-500 hover:text-white",
  },

  {
    title: "Trang Tiktok",
    icon: "FaTiktok",
    image: "https://images.alphacoders.com/112/1123670.png",
    style: "hover:bg-black hover:text-white p-1",
  },

  {
    title: "Trang Twitter",
    icon: "AiOutlineTwitter",
    image:
      "https://vietnix.vn/wp-content/uploads/2022/07/mang-xa-hoi-twitter.webp",
    style: "hover:bg-white hover:text-blue-600 p-1",
  },
  {
    title: "Trang YouTube",
    icon: "BsYoutube",
    image:
      "https://img.nhandan.com.vn/Files/Images/2021/04/13/3A708284_F5B8_407D_ADC0_339DBEE-1618275907021.jpeg",
    style: "hover:bg-red-600 hover:text-white p-1",
  },
];

export const OrderDashboardItems = [
  {
    name: "Mới",
    icon: "BsFillSendExclamationFill",
  },
  {
    name: "Đã phản hồi",
    icon: "BsFillSendCheckFill",
  },
  {
    name: "Đã thanh toán",
    icon: "TbCubeSend",
  },
  {
    name: "Hủy đơn",
    icon: "BsFillSendXFill",
  },
  {
    name: "Chi tiết đơn hàng",
    icon: "CiViewList",
  },
];

/*<---------------------------------------------------------- Custom System ----------------------------------------------------------> */

export const SocialMediaCustom = [
  {
    id: 0,
    title: "Trang zalo",
    icon: "SiZalo",
    image:
      "https://atpsoftware.vn/wp-content/uploads//2020/03/20211208103735_id_zalo-1.jpg",
    style: "hover:text-blue-600 hover:bg-white ",
  },
  {
    id: 1,
    title: "Facebook cá nhân",
    icon: "BsFacebook",
    image:
      "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBsb2dvfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    style: "hover:bg-white hover:text-blue-600",
  },

  {
    id: 5,
    title: "Trang Tiktok",
    icon: "FaTiktok",
    image: "https://images.alphacoders.com/112/1123670.png",
    style: "hover:bg-black hover:text-white p-1",
  },

  {
    id: 7,
    title: "Trang YouTube",
    icon: "BsYoutube",
    image:
      "https://img.nhandan.com.vn/Files/Images/2021/04/13/3A708284_F5B8_407D_ADC0_339DBEE-1618275907021.jpeg",
    style: "hover:bg-red-600 hover:text-white p-1",
  },
];

export const HeaderItems = [
  {
    label: "Trang chủ",
    value: "",
  },
  {
    label: "Sản phẩm",
    value: "san-pham",
  },
  {
    label: "Giới thiệu",
    value: "gioi-thieu",
  },
  {
    label: "Tin tức",
    value: "tin-tuc",
  },
  {
    label: "Liên hệ",
    value: "lien-he",
  },
];

export const ToolsTipsSocialMediaItems = [
  {
    title: "zalo.me/...",
  },
  {
    title: "www.facebook.com/...",
  },
  {
    title: "www.facebook.com/plugins/page.php?href=....",
  },
  {
    title: "",
  },
  {
    title: "www.instagram.com/...",
  },
  {
    title: "www.tiktok.com/...",
  },
  {
    title: "www.twitter.com/...",
  },
  {
    title: "www.youtube.com/...",
  },
];

/*<-------------------------------------------------------------------------------------------------------------------- CUSTOM --------------------------------------------------------------------------------------------------------------------> */

export const TypeProductItems = [
  {
    label: "Nệm",
    value: "nem",
  },
  {
    label: "Drap",
    value: "drap",
  },
  {
    label: "Gối",
    value: "goi",
  },
  {
    label: "Phụ kiện",
    value: "phu-kien",
  },
];

export const TypeProductItems2 = [
  {
    label: "Sản phẩm khuyến mãi",
    value: "san-pham-khuyen-mai",
  },
  {
    label: "Sản phẩm bán chạy",
    value: "san-pham-ban-chay",
  },
  {
    label: "Sản phẩm mới",
    value: "san-pham-moi",
  },
  {
    label: "Sản phẩm nổi bật",
    value: "san-pham-noi-bat",
  },
];

export const TypePostItems = [
  {
    label: "Tin tức",
    value: "tin-tuc",
  },

  {
    label: "Giao nhận hàng",
    value: "giao-nhan-hang",
    animation: paymentAnimation,
  },
  {
    label: "Chính sách đổi trả",
    value: "chinh-sach-doi-tra",
    animation: rulesAnimation,
  },
  {
    label: "Chính sách đặt hàng",
    value: "chinh-sach-dat-hang",
    animation: policyAnimation,
  },
  {
    label: "Chính sách bảo mật",
    value: "chinh-sach-bao-mat",
    animation: securityAnimation,
  },
  {
    label: "Thông tin nệm Việt Á",
    value: "thong-tin-nem-viet-a",
  },
  {
    label: "Chia sẽ kiến thức",
    value: "chia-se-kien-thuc",
  },
  {
    label: "Tại sao chọn nệm Việt Á",
    value: "tai-sao-chon-nem-viet-a",
  },
];

export const PolicyItems = [
  {
    label: "Giao nhận hàng",
    value: "giao-nhan-hang",
  },
  {
    label: "Chính sách đổi trả",
    value: "chinh-sach-doi-tra",
  },
  {
    label: "Chính sách đặt hàng",
    value: "chinh-sach-dat-hang",
  },
  {
    label: "Chính sách bảo mật",
    value: "chinh-sach-bao-mat",
  },
];

export const TopFooterItems = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/taphoa-605ab.appspot.com/o/fresher.14f2aadd.png?alt=media&token=be56aab4-f2c5-42a8-a6d8-4b32c7109211",
    label: "Hoàn trả không gặp rắc rối",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/taphoa-605ab.appspot.com/o/security.d7d83cc5.png?alt=media&token=8add07d2-33df-4a2c-b07a-1c983fc4b204",
    label: "Giao dịch an toàn",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/taphoa-605ab.appspot.com/o/free-ship.658704f1.png?alt=media&token=6642d93d-9c27-4113-affc-e6a02d8811b1",
    label: "Vận chuyển cực kỳ nhanh chóng",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/taphoa-605ab.appspot.com/o/support-24-24.1848cf83.png?alt=media&token=8fe9426e-066c-4be6-b0b2-21026be68d27",
    label: "Đảm bảo chất lượng",
  },
];

export {};

// component
import SvgColor from "../../../components/svg-color";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { FaCog, FaMoneyBill, FaUserClock } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import HistoryIcon from "@mui/icons-material/History";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import {
  BsCalendar4Week,
  BsFillBookmarkFill,
  // BsCalendar4Week,
  BsFillFileEarmarkRichtextFill,
} from "react-icons/bs";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/super/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "admin",
    path: "/super/user",
    icon: icon("ic_user"),
  },
  {
    title: "assign",
    path: "/super/castAssign",
    icon: <AssignmentIndIcon />,
  },
  {
    title: "attendance",
    path: "/super/attendance",
    icon: <FaUserClock size={24} />,
  },
  {
    title: "leaverequest",
    path: "/super/leaverequest",
    icon: <FcLeave size={24} />,
  },
  {
    title: "castbooking",
    path: "/super/booking",
    icon: <AiOutlineSchedule size={24} />,
  },
  {
    title: "Shift",
    path: "/super/shift",
    icon: <BsCalendar4Week size={24} />,
  },
  {
    title: "Payment",
    path: "/super/payment",
    icon: <FaMoneyBill size={24} />,
  },
  {
    title: "Setting",
    path: "/super/setting",
    icon: <FaCog size={24} />,
  },
  {
    title: "misc",
    path: "/super/misc",
    icon: <MiscellaneousServicesIcon />,
  },
  {
    title: "activitylog",
    path: "/super/log",
    icon: <HistoryIcon />,
  },
];

const subNavConfig = [
  {
    title: "dashboard",
    path: "/admin/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "castassign",
    path: "/admin/user",
    icon: <MdOutlineAssignmentInd size={24} />,
  },
  {
    title: "castbooking",
    path: "/admin/booking",
    icon: <BsFillBookmarkFill size={24} />,
  },
  {
    title: "attendance",
    path: "/admin/attendance",
    icon: <FaUserClock size={24} />,
  },
  {
    title: "leaverequest",
    path: "/admin/leaverequest",
    icon: <FcLeave size={24} />,
  },
  {
    title: "Shift",
    path: "/admin/shift",
    icon: <BsCalendar4Week size={24} />,
  },
];

const castNavConfig = [
  {
    title: "dashboard",
    path: "/cast/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "attendance",
    path: "/cast/attendance",
    icon: <FaUserClock size={24} />,
  },
  {
    title: "leaverequest",
    path: "/cast/leaverequest",
    icon: <FcLeave size={24} />,
  },
  {
    title: "schedule",
    path: "/cast/schedule",
    icon: <AiOutlineSchedule size={24} />,
  },
  {
    title: "booking",
    path: "/cast/booking",
    icon: <BsFillBookmarkFill size={24} />,
  },
  {
    title: "Blog",
    path: "/cast/blog",
    icon: <BsFillFileEarmarkRichtextFill size={24} />,
  },
];

export { navConfig, subNavConfig, castNavConfig };

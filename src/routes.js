import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import MiscPage from "./pages/MiscPage";
import Page404 from "./pages/Page404";
import UserDetailPage from "./pages/detail/UserDetailPage";
import AssignedCastToAdminPage from "./pages/AssignedCastToAdminPage";
import { getUser } from "./utils/cookieHelper";
import AssignedUser from "./pages/subAdmin/AssignedUser";
import ChangePassword from "./pages/ChangePassword";
import Attendance from "./pages/attendance/Attendance";
import AssignedBooking from "./pages/AssignedBooking/AssignedBooking";
import AdminAssignedBooking from "./pages/adminassignedbookin/AdminAssignedBooking";
import SchedulePage from "./pages/schedule/SchedulePage";
import ProfilePage from "./pages/profile/ProfilePage";
import LeaveRequest from "./pages/leaverequest/LeaveRequest";
import UserAttendance from "./pages/userAttendance/UserAttendance";
import AdminLeaveRequest from "./pages/adminLeaveRequest/AdminLeaveRequest";
import AttendanceDetail from "./pages/attendance/detail/AttendanceDetail";
import ActivityLog from "./pages/activityLog/ActivityLog";
import ManagerAttendance from "./pages/managerAttendance/ManagerAttendance";
import AssignedBookingDetail from "./pages/AssignedBooking/detail/AssignedBookingDetail";
import SubAdminLeaveRequest from "./pages/subAdminLeaveRequest/SubAdminLeaveRequest";
import Shift from "./pages/shift/Shift";
import Blog from "./pages/blog/Blog";
import UserDashboard from "./pages/UserDashboard";
import CastBooking from "./pages/castBooking/CastBooking";
import Notification from "./pages/notification/Notification";
import AdminProfile from "./pages/profile/AdminProfile";
import MapDisplayPage from "./sections/@dashboard/misc/component/MapDisplayPage";
import CreateHotel from "./pages/hotel/CreateHotel";
import UpdateHotel from "./pages/hotel/UpdateHotel";
import AdminShift from "./pages/adminShift/AdminShift";
import CastBookingDetail from "./pages/castbookingdetail/CastBookingDetail";
import AdminSetting from "./pages/setting/AdminSetting";
import Payment from "./pages/payment/Payment";

// ----------------------------------------------------------------------
const authRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/changePassword", element: <ChangePassword /> },
];

export default function Router() {
  const { user } = getUser();

  const adminRoutes = useRoutes([
    ...authRoutes,
    {
      path: "/super",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/super/dashboard" />, index: true },
        { path: "dashboard", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "user/:id", element: <UserDetailPage /> },
        { path: "attendance/:id", element: <AttendanceDetail /> },
        { path: "misc", element: <MiscPage /> },
        { path: "castAssign", element: <AssignedCastToAdminPage /> },
        { path: "attendance", element: <Attendance /> },
        { path: "leaverequest", element: <AdminLeaveRequest /> },
        { path: "logs", element: <BlogPage /> },
        { path: "booking", element: <AdminAssignedBooking /> },
        { path: "profile", element: <AdminProfile /> },
        { path: "map/:lat/:lng", element: <MapDisplayPage /> },
        {
          path: "booking/:id",
          element: <AssignedBookingDetail />,
        },
        { path: "log", element: <ActivityLog /> },
        { path: "notification", element: <Notification /> },
        { path: "shift", element: <AdminShift /> },
        { path: "createhotel", element: <CreateHotel /> },
        { path: "edithotel/:id", element: <UpdateHotel /> },
        { path: "setting", element: <AdminSetting /> },
        { path: "payment", element: <Payment /> },
      ],
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  const routes = useRoutes([
    ...authRoutes,
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: "dashboard", element: <DashboardAppPage /> },
        { path: "user", element: <AssignedUser /> },
        { path: "user/:id", element: <UserDetailPage /> },
        { path: "attendance", element: <ManagerAttendance /> },
        { path: "attendance/:id", element: <AttendanceDetail /> },
        { path: "booking", element: <AssignedBooking /> },
        { path: "notification", element: <Notification /> },
        { path: "profile", element: <AdminProfile /> },
        { path: "leaverequest", element: <SubAdminLeaveRequest /> },
        { path: "shift", element: <Shift /> },
        { path: "booking/:id", element: <AssignedBookingDetail /> },
      ],
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  const castRoutes = useRoutes([
    ...authRoutes,
    {
      path: "/cast",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/cast/dashboard" />, index: true },
        { path: "dashboard", element: <UserDashboard /> },
        { path: "schedule", element: <SchedulePage /> },
        { path: "leaverequest", element: <LeaveRequest /> },
        { path: "attendance", element: <UserAttendance /> },
        { path: "notification", element: <Notification /> },
        { path: "booking", element: <CastBooking /> },
        { path: "blog", element: <Blog /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "booking/:id", element: <CastBookingDetail /> },
      ],
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  if (user?.role === "Sub Admin") {
    return routes;
  }

  if (user?.role === "Cast") {
    return castRoutes;
  }

  return adminRoutes;
}

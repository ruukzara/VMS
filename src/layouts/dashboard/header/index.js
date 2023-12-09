import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";
//
// import Searchbar from './Searchbar';
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";
// import { useAttendanceClockIn } from "../../../hooks/attendance/component/clockin/useAttendanceClockIn";
// import NavigationIcon from "@mui/icons-material/Navigation";
// import { useAttendanceClockOut } from "../../../hooks/attendance/component/clockout/useAttendanceClockOut";
import { getUser } from "../../../utils/cookieHelper";
import {
  useGetNotification,
  useGetOldNotification,
  useMarkAllAsRead,
} from "../../../hooks/notification/useNotification";
import { useEffect } from "react";
import { io } from "socket.io-client";
// import { useCheckAttendance } from "../../../hooks/attendance/useAttendance";
// import moment from "moment";
// import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { token } = getUser();
  // const { t } = useTranslation();
  // let date = moment().utc().local().format("YYYY-MM-DD");
  // const { data: checkAttendance } = useCheckAttendance(date);

  const {
    data: notifications,
    isLoading,
    isError,
    refetch,
  } = useGetNotification();

  const {
    data: oldNotifications,
    isLoading: oldNotificationsLoading,
    isError: oldNotificationsError,
  } = useGetOldNotification();

  const { mutate } = useMarkAllAsRead({});
  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL, {
      extraHeaders: {
        Authorization: "Bearer " + token,
      },
    });

    socket.on("notification", (data) => {
      if (data) {
        refetch(); // Trigger a refetch of the query data
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [refetch, token]);
  // const { handleClockIn } = useAttendanceClockIn();
  // const { handleClockOut } = useAttendanceClockOut(checkAttendance);

  // const { alreadyclockedin, user_id } = localStorage.getItem(
  //   `alreadyClockIn_${user?.id}`
  // )
  //   ? JSON.parse(localStorage.getItem(`alreadyClockIn_${user?.id}`))
  //   : {};

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* {user?.role !== "Admin" && (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {checkAttendance?.alreadyclockedin &&
            checkAttendance?.clockoutdate === null ? (
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={handleClockOut}>
                <NavigationIcon sx={{ mr: 1 }} />
                {t("clockOut")}
              </Fab>
            ) : (
              !checkAttendance?.alreadyclockedin && (
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  onClick={handleClockIn}>
                  <NavigationIcon sx={{ mr: 1 }} />
                  {t("clockIn")}
                </Fab>
              )
            )}
          </Box>
        )} */}
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}>
          <LanguagePopover />
          <NotificationsPopover
            mutate={mutate}
            notifications={notifications}
            isLoading={isLoading}
            isError={isError}
            oldNotifications={oldNotifications}
            oldNotificationsLoading={oldNotificationsLoading}
            oldNotificationsError={oldNotificationsError}
          />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useState } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
  Skeleton,
  Button,
  Tooltip,
  ListSubheader,
} from "@mui/material";
// utils
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import moment from "moment";
import { getUser } from "../../../utils/cookieHelper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function NotificationsPopover({
  isError,
  notifications,
  mutate,
  isLoading,
  oldNotificationsError,
  oldNotifications,
  oldNotificationsLoading,
}) {
  const [open, setOpen] = useState(null);
  const { user } = getUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navagationTo = () => {
    if (user?.role === "Admin") {
      navigate("/super/notification");
    } else if (user?.role === "Cast") {
      navigate("/cast/notification");
    } else {
      navigate("/admin/notification");
    }
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
    mutate();
  };

  const handleMarkAllAsRead = () => {
    mutate();
  };

  return isLoading && oldNotificationsLoading ? (
    <Skeleton />
  ) : isError && oldNotificationsError ? (
    <>{t("somethingOccured")}</>
  ) : (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={notifications?.length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 360,
          },
        }}>
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{t("Notifications")}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {t("youHave")} {notifications?.length} {t("unreadMessages")}
            </Typography>
          </Box>
          {notifications?.length > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}>
                {t("New")}
              </ListSubheader>
            }>
            {!isLoading && notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.secondary", paddingLeft: "14px" }}>
                  &nbsp; {t("noNewNotification")}
                </Typography>
              </>
            )}
          </List>
          <Divider sx={{ borderStyle: "dashed" }} />

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}>
                {t("beforeThat")}
              </ListSubheader>
            }>
            {!oldNotificationsLoading && oldNotifications?.length > 0 ? (
              oldNotifications
                ?.slice(0, 3)
                ?.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
            ) : (
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.secondary", paddingLeft: "14px" }}>
                &nbsp; {t("noOldNotification")}
              </Typography>
            )}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Box sx={{ p: 1 }}>
          <Button onClick={navagationTo} fullWidth disableRipple>
            {t("viewAll")}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { title } = renderContent(notification);
  const { user } = getUser();
  const navigate = useNavigate();
  let role =
    user?.role === "Cast" ? "cast" : user?.role === "Admin" ? "super" : "admin";
  return (
    <ListItemButton
      component="a"
      onClick={() => {
        const url = notification?.url
          ? `/${role.toLowerCase()}/${notification?.url}`
          : `/${role.toLowerCase()}`;

        navigate(url);
      }}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}>
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {moment.utc(notification?.created_at).local().fromNow()}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}>
        &nbsp; {noCase(notification?.description)}
      </Typography>
    </Typography>
  );

  return {
    title,
  };
}

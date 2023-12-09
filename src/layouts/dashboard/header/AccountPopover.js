import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import { getUser, removeUser } from "../../../utils/cookieHelper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useGetProfileAvatar } from "../../../hooks/image/useImage";

export default function AccountPopover() {
  // const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const from = localStorage.getItem("from");
  const [open, setOpen] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const { user } = getUser();
  const { data } = useGetProfileAvatar();
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(null);
  };

  const handleNavigate = (e, role) => {
    e.preventDefault();
    navigate(`/${role}/profile`);
    setOpen(null);
  };

  const logOut = (e) => {
    setOpen(null);
    e.preventDefault();
    removeUser();
    toast.success(t("logoutSuccess"));
    navigate("/");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}>
        <Avatar
          src={data ? data?.url : "/assets/icons/female.jpg"}
          alt="Avatar"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.first_name} {user?.last_name}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        {user?.role === "Cast" ? (
          <MenuItem onClick={(e) => handleNavigate(e, "cast")} sx={{ m: 1 }}>
            {t("yourProfile")}
          </MenuItem>
        ) : user?.role === "Admin" ? (
          <MenuItem onClick={(e) => handleNavigate(e, `super`)} sx={{ m: 1 }}>
            {t("yourProfile")}
          </MenuItem>
        ) : (
          <MenuItem onClick={(e) => handleNavigate(e, "admin")} sx={{ m: 1 }}>
            {t("yourProfile")}
          </MenuItem>
        )}
        {from !== "app" && (
          <MenuItem onClick={(e) => logOut(e)} sx={{ m: 1 }}>
            {t("lgout")}
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

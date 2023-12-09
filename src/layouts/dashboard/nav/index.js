import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import { navConfig, subNavConfig, castNavConfig } from "./config";
import { useTranslation } from "react-i18next";
import { getUser } from "../../../utils/cookieHelper";
import { useGetProfileAvatar } from "../../../hooks/image/useImage";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const {
    user: { role },
  } = getUser();

  const isDesktop = useResponsive("up", "lg");
  const { t } = useTranslation();
  const { data } = useGetProfileAvatar();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}>
      <Box sx={{ px: 10, pl: "60px", py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar
              src={data ? data?.url : "/assets/icons/female.jpg"}
              alt="Avatar"
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {t("VMS_Admin_Panel")}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection
        data={
          role === "Admin"
            ? navConfig
            : role === "Cast"
            ? castNavConfig
            : subNavConfig
        }
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}>
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}>
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

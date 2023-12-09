import { Delete, Edit, PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Backdrop,
  Box,
  ButtonGroup,
  Card,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import EditProfile from "../../sections/@dashboard/user/components/EditProfile";
import { useUpdateProfileForm } from "../../hooks/admin/userData/useUpdateProfileForm";
import { useAdminUploadImage } from "../../hooks/image/component/useAdminUploadImage";
import { getUser } from "../../utils/cookieHelper";
import { useGetProfileAvatar } from "../../hooks/image/useImage";
import { useGetProfileUser } from "../../hooks/admin/useAdmin";
import BadgeIcon from "@mui/icons-material/Badge";
import Error from "../../components/error/Error";

const AdminProfile = () => {
  const { t } = useTranslation();
  const { user } = getUser();
  const { data: userProfile, isLoading, isError } = useGetProfileUser();
  const { data } = useGetProfileAvatar();
  const {
    formik: profileFormik,
    isProfileVisible,
    profileOpen,
    handleProfileOpen,
    handleProfileClose,
    handleKeyDown,
  } = useUpdateProfileForm(userProfile);
  const { profileAvatar, profileLoading, profileRemoveLoading, handleRemove } =
    useAdminUploadImage(user?.id);

  const handlerAvatar = (e) => {
    e.preventDefault();
    profileAvatar(e.target.files[0]);
  };
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isLoading) {
    return (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (isError) {
    return <Error />;
  }
  return (
    <>
      <Helmet>
        <title> {t("Profile")} </title>
      </Helmet>
      <Container>
        <Grid container>
          <Grid item xs={6} md={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              mb={3}>
              <Typography variant="h4" gutterBottom>
                {t("Profile")}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={4} pb={3}>
          <Grid item md={12}>
            <Card>
              <Grid container spacing={4}>
                <Grid item md={4} xs={12}>
                  <Box>
                    <Stack direction="column">
                      <Box
                        sx={{
                          height: isMobileDevice ? "250px" : "300px",
                          borderRadius: "25px",
                          position: "relative",
                          overflow: "hidden",
                          transition: "transform 0.3s ease",
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        ml={2}
                        mt={2}
                        mr={2}
                        mb={2}>
                        <img
                          src={
                            data ? `${data?.url}` : "/assets/icons/female.jpg"
                          }
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "scale-down",
                          }}
                        />
                      </Box>
                      {data?.url && (
                        <LoadingButton
                          variant="contained"
                          loading={profileRemoveLoading}
                          onClick={(e) =>
                            window.confirm(t("confirmation")) &&
                            handleRemove(data?.url)
                          }
                          sx={{ m: 1, ml: 2 }}
                          aria-label="remove picture"
                          component="label">
                          <Delete />
                          {t("RemoveImage")}
                        </LoadingButton>
                      )}
                      <ButtonGroup
                        sx={{ alignItem: "center" }}
                        variant="text"
                        fullWidth
                        aria-label="text button group">
                        <Tooltip title={t("UploadImage")}>
                          <LoadingButton
                            color="primary"
                            loading={profileLoading}
                            onChange={(e) => handlerAvatar(e)}
                            className="button"
                            aria-label="upload picture"
                            component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                          </LoadingButton>
                        </Tooltip>

                        <Tooltip title={t("EditProfile")}>
                          <LoadingButton
                            color="primary"
                            onClick={handleProfileOpen}
                            className="button"
                            aria-label="profile open"
                            component="label">
                            <Edit />
                          </LoadingButton>
                        </Tooltip>
                      </ButtonGroup>
                    </Stack>
                  </Box>
                </Grid>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                  mt={5}
                  pt={5}
                  mb={2}>
                  <Grid item md={12} xs={6} mt={5}>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Typography variant="h5" ml={2}>
                          {userProfile?.fullname || "-"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box display="flex" alignItems="center" ml={2} mt={1}>
                          <MailIcon />
                          <Typography variant="caption" ml={1}>
                            {userProfile?.email || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box display="flex" alignItems="center" ml={2} mt={1}>
                          <PhoneIcon />
                          <Typography variant="caption" ml={1}>
                            {userProfile?.phone || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box display="flex" alignItems="center" ml={2} mt={1}>
                          <BadgeIcon />
                          <Typography variant="caption" ml={1}>
                            {user?.role || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {isProfileVisible && (
        <EditProfile
          open={profileOpen}
          handleClose={handleProfileClose}
          formik={profileFormik}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

export default AdminProfile;

import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Iconify from "../../components/iconify/Iconify";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useUserTableDetail } from "../../hooks/admin/userTable/detail/useUserTableDetail";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import { useAdminUploadImage } from "../../hooks/image/component/useAdminUploadImage";
import { LoadingButton } from "@mui/lab";
import InterestForm from "../../sections/@dashboard/interest/InterestForm";
import UserMetaDataForm from "../../sections/@dashboard/user/components/UserMetaDataForm";
import EditProfile from "../../sections/@dashboard/user/components/EditProfile";
import { useUpdateUserDataForm } from "../../hooks/admin/userData/useUpdateUserDataForm";
import { useInterestForm } from "../../hooks/interest/component/form/useInterestForm";
import { Edit, PhotoCamera } from "@mui/icons-material";
import { useUpdateCastProfileAdmin } from "../../hooks/admin/userData/useUpdateCastProfileAdmin";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveDialog from "../../sections/userdetail/RemoveDialog";
import Error from "../../components/error/Error";
import NoImage from "../../components/noimage/NoImage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
}));

const UserDetailPage = () => {
  const { t } = useTranslation();
  const [openImageDelete, setOpenImageDelete] = useState(false);
  const [imageId, setImageId] = useState();
  const handleOpenImage = (item) => {
    setOpenImageDelete(true);
    setImageId(item);
  };

  const handleCloseImage = () => {
    setOpenImageDelete(false);
  };

  const { id } = useParams();
  const {
    upload,
    isLoading: imageLoading,
    avatarLoading,
    uploadAvatar,
    removeImage,
  } = useAdminUploadImage(id);
  const navigate = useNavigate();
  const {
    userDetail,
    openMeta,
    colorData,
    locationData,
    breastCupData,
    handleClickOpenMeta,
    handleClosMeta,
    formikMeta,
    isMetaVisible,
    checkUserMetaData,
    userLoading,
    userError,
  } = useUserTableDetail(id);

  const {
    formik: updateEditFormik,
    editOpen,
    handleOpenEditMeta,
    handleCloseEditMeta,
    isVisibleEditMeta,
  } = useUpdateUserDataForm(userDetail);

  const {
    formik: profileFormik,
    isProfileVisible,
    profileOpen,
    handleProfileOpen,
    handleProfileClose,
  } = useUpdateCastProfileAdmin(userDetail);

  const {
    open,
    handleOpen,
    handleClose,
    formik,
    interestData,
    isLoading,
    isError,
    isVisible,
    handleKeyDown,
  } = useInterestForm(userDetail);
  const handler = (e) => {
    e.preventDefault();
    upload(e.target.files);
  };

  const handlerAvatar = (e) => {
    e.preventDefault();
    uploadAvatar(e.target.files[0]);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (userError) {
    return <Error />;
  }
  if (userLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <div>
      <Helmet>
        <title> {t("UserDetail")} </title>
      </Helmet>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={imageLoading}>
        {t("imageloading")}
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Grid container>
          <Grid item xs={6} md={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start">
              <Button
                onClick={() => navigate(-1)}
                startIcon={<Iconify icon="material-symbols:arrow-back" />}
              />
              <Typography variant="h4">{t("UserDetail")}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
              mb={3}>
              {checkUserMetaData?.count > 0 ? (
                <>
                  <LoadingButton
                    variant="contained"
                    loading={imageLoading}
                    component="label">
                    {t("Upload")}
                    <input
                      hidden
                      accept="image/jpeg, image/png, image/gif, video/mp4"
                      onChange={(e) => handler(e)}
                      multiple
                      type="file"
                    />
                  </LoadingButton>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={openMenu ? "long-menu" : undefined}
                    aria-expanded={openMenu ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMenu}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      style: {
                        width: "20ch",
                      },
                    }}>
                    <MenuItem
                      onClick={() => handleOpenEditMeta()}
                      disableRipple>
                      {t("UpdateMetaData")}
                    </MenuItem>
                    <MenuItem onClick={handleOpen} disableRipple>
                      {t("UpdateInterest")}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleClickOpenMeta()}>
                  {t("AddMetaData")}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Card>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
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
                            userDetail?.avatar?.length > 0
                              ? `${userDetail?.avatar[0]}`
                              : "/assets/icons/female.jpg"
                          }
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "scale-down",
                          }}
                        />
                      </Box>
                      <ButtonGroup
                        sx={{ alignItem: "center" }}
                        variant="text"
                        fullWidth
                        aria-label="text button group">
                        {checkUserMetaData?.count > 0 && (
                          <Tooltip title="Upload Image">
                            <LoadingButton
                              color="primary"
                              loading={avatarLoading}
                              onChange={(e) => handlerAvatar(e)}
                              className="button"
                              aria-label="upload picture"
                              component="label">
                              <input hidden accept="image/*" type="file" />
                              <PhotoCamera />
                            </LoadingButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit Profile">
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
                    <Grid container spacing={4}>
                      <Grid item>
                        <Typography variant="h5" ml={2}>
                          {userDetail?.fullname || "-"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box display="flex" alignItems="center" ml={2} mt={1}>
                          <MailIcon />
                          <Typography variant="caption" ml={1}>
                            {userDetail?.email || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box display="flex" alignItems="center" ml={2} mt={1}>
                          <PhoneIcon />
                          <Typography variant="caption" ml={1}>
                            {userDetail?.phone || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item container alignItems="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          ml={2}
                          mt={1}
                          mb={2}>
                          <LanguageIcon />
                          <Typography variant="caption" ml={1}>
                            {userDetail?.city || "-"} /{" "}
                            {userDetail?.country || "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item md={9} xs={12} pr={2} pl={2}>
                  <Grid container spacing={2} mt={5}>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Ageyear")}</Typography>
                        </Grid>
                        <Grid item xs={12} pt={0}>
                          <Item>{userDetail?.age || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Heightcm")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>{userDetail?.height || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Weightkg")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>{userDetail?.weight || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Breast")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>
                            {userDetail?.breast_size || "-"}{" "}
                            {userDetail?.breast_cup || "-"}
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("color")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>{userDetail?.color || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Waistcm")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>{userDetail?.waist || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Hipcm")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>{userDetail?.hip || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">{t("Interest")}</Typography>
                        </Grid>
                        <Item>
                          {userDetail?.interests?.map((d, index) => (
                            <Chip sx={{ m: 0.5 }} label={d} key={index + 1} />
                          ))}
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            {t("Description")}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Item>
                            <Typography
                              style={{ wordWrap: "break-word" }}
                              variant="body1"
                              gutterBottom>
                              {userDetail?.description || "-"}
                            </Typography>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} mb={5}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            {t("MessageFromStore")}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Item>{userDetail?.message_from_store || "-"}</Item>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h2">{t("Images")}</Typography>
            {userDetail?.images ? (
              <Card variant="outlined">
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "scroll",
                  }}>
                  <ImageList cols={3}>
                    {userDetail?.images?.map((item) => (
                      <ImageListItem key={item}>
                        <img
                          src={`${item}`}
                          srcSet={`${item}`}
                          alt={item}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          actionIcon={
                            <IconButton
                              onClick={() => handleOpenImage(item)}
                              sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              </Card>
            ) : (
              <>
                <Card variant="outlined">
                  <NoImage />
                </Card>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      {isVisible && (
        <InterestForm
          open={open}
          formik={formik}
          handleClose={handleDialogClose}
          interestData={interestData}
          isLoading={isLoading}
          isError={isError}
        />
      )}
      {isMetaVisible && (
        <UserMetaDataForm
          role="Admin"
          open={openMeta}
          type="Add"
          handleClose={handleClosMeta}
          formik={formikMeta}
          cupData={breastCupData}
          locationData={locationData}
          colorData={colorData}
          handleKeyDown={handleKeyDown}
        />
      )}
      {isVisibleEditMeta && (
        <UserMetaDataForm
          open={editOpen}
          role="Admin"
          type="Update"
          handleClose={handleCloseEditMeta}
          formik={updateEditFormik}
          cupData={breastCupData}
          locationData={locationData}
          colorData={colorData}
          handleKeyDown={handleKeyDown}
        />
      )}
      {isProfileVisible && (
        <EditProfile
          open={profileOpen}
          handleClose={handleProfileClose}
          formik={profileFormik}
          handleKeyDown={handleKeyDown}
        />
      )}
      <RemoveDialog
        open={openImageDelete}
        handleClose={handleCloseImage}
        removeImage={removeImage}
        id={imageId}
      />
    </div>
  );
};

export default UserDetailPage;

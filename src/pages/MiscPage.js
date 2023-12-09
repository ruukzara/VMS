import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMiscTable } from "../hooks/misc/component/useMiscTable";
import MiscForm from "../sections/@dashboard/misc/component/MiscForm";
import { useMiscForm } from "../hooks/misc/component/useMiscForm";
import { useTranslation } from "react-i18next";
import EditPackageForm from "../sections/@dashboard/misc/component/EditPackageForm";
import CustomMaterialTable from "../components/table/CustomMaterialTable";
import { useNavigate } from "react-router-dom";
const MapDisplay = React.lazy(() =>
  import("../sections/@dashboard/misc/component/MapDisplay")
);

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const MiscPage = () => {
  const [type, setType] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [title, setTitle] = useState();

  const {
    value,
    handleChange,
    breastColumn,
    colorColumn,
    locationColumn,
    colorData,
    locationData,
    breastCupData,
    handleDeleteBreastCup,
    handleDeleteLocation,
    handleDeleteColor,
    hotelData,
    hotelLoading,
    hotelColumn,
    handleDeleteHotel,
    packageColumn,
    packageData,
    packageLoading,
    handleDeletePackage,
    handleOpenEditPackage,
    handleCloseEditPackage,
    openEditPackage,
    formDataPackage,
    packageVisible,
    isLoading,
    stateData,
    interestColumn,
    interestData,
    handleDeleteInterest,
  } = useMiscTable();

  const {
    handleClickOpen,
    open,
    handleClose,
    formik,
    markerPosition,
    setMarkerPosition,
    handleKeyDown,
  } = useMiscForm(type);

  const handler = (value) => {
    handleClickOpen();
    setTitle(value);
    setType(value);
  };

  const handleUpdateHotel = (hoteldata) => {
    navigate(`/super/edithotel/${hoteldata?.id}`);
    localStorage.setItem("hotelData", JSON.stringify(hoteldata));
    localStorage.setItem("hoteltab", 4);
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

  return (
    <>
      <Helmet>
        <title>{t("misccellenous")}</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("misccellenous")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example">
                <AntTab label={t("Interest")} />
                <AntTab label={t("breast_cup")} />
                <AntTab label={t("color")} />
                <AntTab label={t("Location")} />
                <AntTab label={t("Hotel")} />
                <AntTab label={t("Package")} />
              </AntTabs>
              <Box sx={{ p: 1 }} />
            </Box>
            <TabPanel value={value} index={0}>
              <CustomMaterialTable
                showTitle={"false"}
                data={interestData}
                column={interestColumn}
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handler("Interest");
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeleteInterest(rowData?.id);
                    },
                  },
                ]}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomMaterialTable
                showTitle={"false"}
                data={breastCupData}
                column={breastColumn}
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handler("breastCup");
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeleteBreastCup(rowData?.id);
                    },
                  },
                ]}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CustomMaterialTable
                data={colorData}
                column={colorColumn}
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handler("color");
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeleteColor(rowData?.id);
                    },
                  },
                ]}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CustomMaterialTable
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                data={locationData}
                column={locationColumn}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handler("location");
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeleteLocation(rowData?.id);
                    },
                  },
                ]}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <CustomMaterialTable
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                isLoading={hotelLoading}
                data={hotelData}
                column={hotelColumn}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      navigate("/super/createhotel");
                      localStorage.setItem("hoteltab", 4);
                    },
                  },
                  {
                    icon: () => <EditIcon />,
                    tooltip: t("Edit"),
                    onClick: (event, rowData) => {
                      handleUpdateHotel(rowData);
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeleteHotel(rowData?.id);
                    },
                  },
                ]}
                detailPanel={(rowData) => {
                  return (
                    <>
                      <MapDisplay rowData={rowData} />
                    </>
                  );
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
              />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <CustomMaterialTable
                options={{
                  showTitle: false,
                  actionsColumnIndex: -1,
                }}
                isLoading={packageLoading}
                data={packageData}
                column={packageColumn}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handler("Package");
                    },
                  },
                  {
                    icon: () => <EditIcon />,
                    tooltip: t("Edit"),
                    onClick: (event, rowData) => {
                      handleOpenEditPackage(rowData);
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      window.confirm(t("confirmationDelete")) &&
                        handleDeletePackage(rowData?.id);
                    },
                  },
                ]}
              />
            </TabPanel>
          </Scrollbar>
        </Card>
      </Container>
      <MiscForm
        open={open}
        handleClose={handleClose}
        formik={formik}
        type={type}
        title={title}
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
        data={stateData}
        handleKeyDown={handleKeyDown}
      />
      {packageVisible && (
        <EditPackageForm
          open={openEditPackage}
          handleClose={handleCloseEditPackage}
          formData={formDataPackage}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

export default MiscPage;

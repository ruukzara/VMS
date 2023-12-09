import { Helmet } from "react-helmet-async";
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import Form from "../sections/@dashboard/user/components/Form";
import { useRegister } from "../hooks/admin/component/useRegister";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useUserTable } from "../hooks/admin/userTable/useUserTable";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useUserData } from "../hooks/admin/userData/useUserData";
// import { useState } from "react";
// import UserMetaDataForm from "../sections/@dashboard/user/components/UserMetaDataForm";
// import { useMiscTable } from "../hooks/misc/component/useMiscTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomMaterialTable from "../components/table/CustomMaterialTable";
import Error from "../components/error/Error";

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
export default function UserPage() {
  const { t } = useTranslation();
  // const [id, setId] = useState();
  const navigate = useNavigate();
  const { formik, userData } = useRegister();
  // const { formik: formikMeta } = useUserData(id);
  const {
    adminTableData: adminData,
    castTableData: castData,
    userTableData: userDataTable,
    subAdminTableData: subAdminData,
    open,
    value,
    handleChange,
    handleClickOpen,
    handleClose,
    column,
    // handleClickOpenMeta,
    // handleClosMeta,
    // openMeta,
    // mutate,
    driverTableData: driverData,
    isLoading,
    isError,
  } = useUserTable();

  // const { colorData, locationData, breastCupData } = useMiscTable();

  // const handler = (value) => {
  //   setId(value);
  //   handleClickOpenMeta();
  // };

  const navigateToDetail = (id) => {
    navigate(`/super/user/${id}`);
  };

const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
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
        <title> {t("user_data")} </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("user_data")}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleClickOpen()}
            startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("create")}
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example">
                <AntTab label={t("admin")} />
                <AntTab label={t("subAdmin")} />
                <AntTab label={t("cast")} />
                <AntTab label={t("driver")} />
                <AntTab label={t("user")} />
              </AntTabs>
              <Box sx={{ p: 3 }} />
            </Box>
            <TabPanel value={value} index={0}>
              <CustomMaterialTable
                data={adminData}
                column={column}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CustomMaterialTable
                  data={castData}
                  isLoading={isLoading}
                  column={column}
                  onRowClick={(event, rowData) => navigateToDetail(rowData?.id)}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <CustomMaterialTable
                data={userDataTable}
                column={column}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomMaterialTable
                data={subAdminData}
                column={column}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CustomMaterialTable
                data={driverData}
                column={column}
                isLoading={isLoading}
              />
            </TabPanel>
          </Scrollbar>
        </Card>
      </Container>
      <Form
        open={open}
        handleClose={handleDialogClose}
        formik={formik}
        data={userData}
      />
      {/* <UserMetaDataForm
        open={openMeta}
        handleClose={handleClosMeta}
        formik={formikMeta}
        cupData={breastCupData}
        locationData={locationData}
        colorData={colorData}
      /> */}
    </>
  );
}

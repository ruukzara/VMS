import React from "react";
import { useAdminSettingTable } from "../../hooks/adminsetting/table/useAdminSettingTable";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Error from "../../components/error/Error";
import { Helmet } from "react-helmet-async";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import { useAdminSettingForm } from "../../hooks/adminsetting/form/useAdminSettingForm";
import AddIcon from "@mui/icons-material/Add";
import DriverShiftModal from "../../sections/adminsetting/Shift/DriverShiftModal";

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

const AdminSetting = () => {
  const { data, isLoading, isError, column, handleChange, value } =
    useAdminSettingTable();
  const { visible, open, formik, handleClose, handleOpen } =
    useAdminSettingForm();
  const { t } = useTranslation();
  
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
        <title>{t("Setting")}</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("Setting")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example">
                <AntTab label={t("Shift")} />
              </AntTabs>
              <Box sx={{ p: 1 }} />
            </Box>
            <TabPanel value={value} index={0}>
              <CustomMaterialTable
                data={data}
                column={column}
                isLoading={isLoading}
                actions={[
                  {
                    icon: () => {
                      return <AddIcon />;
                    },
                    isFreeAction: true,
                    onClick: (event, rowData) => {
                      handleOpen();
                    },
                  },
                  //   {
                  //     icon: () => <DeleteIcon />,
                  //     tooltip: t("Delete"),
                  //     onClick: (event, rowData) => {
                  //       window.confirm(t("confirmationDelete")) &&
                  //         handleDeleteBreastCup(rowData?.id);
                  //     },
                  //   },
                ]}
              />
            </TabPanel>
          </Scrollbar>
        </Card>
      </Container>
      {visible && (
        <DriverShiftModal
          formik={formik}
          handleClose={handleClose}
          open={open}
        />
      )}
    </>
  );
};

export default AdminSetting;

import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLeaveRequestTable } from "../../hooks/attendance/component/leaverequest/table/useLeaveRequestTable";
import Iconify from "../../components/iconify/Iconify";
import { useLeaveRequestForm } from "../../hooks/attendance/component/leaverequest/form/useLeaveRequestForm";
import LeaveRequestModalForm from "../../sections/leaveRequest/LeaveRequestModalForm";
import LeaveRequestTable from "../../sections/leaveRequest/table/LeaveRequestTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

const LeaveRequest = () => {
  const {
    open,
    handleClickOpen,
    handleClose,
    leaveData,
    leaveLoading,
    value,
    handleChange,
  } = useLeaveRequestTable();
  const { formik } = useLeaveRequestForm();
  const { t } = useTranslation();

  if (leaveLoading) {
    return (
      <>
        <Backdrop
          open={leaveLoading}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Helmet>
        <title> {t("leaverequest")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("leaverequest")}
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => handleClickOpen(e)}
            startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("create")}
          </Button>
        </Stack>

        <Card sx={{ padding: '20px' }}>
          <>
            {
              leaveData && leaveData.length > 0 ? <Box sx={{ bgcolor: "#fff" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example">
                  {leaveData?.map((d) => (
                    <Tab
                      label={
                        d?.value === "Pending"
                          ? t("Pending")
                          : d?.value === "Approved"
                            ? t("Approved")
                            : t("Rejected")
                      }
                      key={d?.id}
                    />
                  ))}
                </Tabs>
                {leaveData?.map((d, index) => (
                  <TabPanel value={value} index={index} key={d?.id}>
                    <LeaveRequestTable id={d?.id} type={d?.value} />
                  </TabPanel>
                ))}
                <Box sx={{ p: 3 }} />
              </Box> : (
                <p>No leave requests till now</p>
              )
            }
          </>
        </Card>
      </Container>
      <LeaveRequestModalForm
        open={open}
        handleClose={handleDialogClose}
        formik={formik}
      />
    </>
  );
};

export default LeaveRequest;

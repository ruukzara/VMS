import React from "react";
import { useSubAdminLeaveRequestTable } from "../../hooks/attendance/component/subAdminLeaveRequest/table/useSubAdminLeaveRequestTable";
import { useSubAdminLeaveRequestForm } from "../../hooks/attendance/component/subAdminLeaveRequest/form/useSubAdminLeaveRequestForm";
import { Helmet } from "react-helmet-async";
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
import Scrollbar from "../../components/scrollbar/Scrollbar";
import AdminLeaveRequestModalForm from "../../sections/leaveRequest/AdminLeaveRequestModalForm";
import { useTranslation } from "react-i18next";
import SubAdminLeaveRequestTable from "../../sections/leaveRequest/table/SubAdminLeaveRequestTable";

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

const SubAdminLeaveRequest = () => {
  const { leaveData, value, handleChange, leaveLoading } =
    useSubAdminLeaveRequestTable();
  const { statusData, formik, open, handleOpen, handleClose } =
    useSubAdminLeaveRequestForm();

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
    <div>
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
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
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
                  <SubAdminLeaveRequestTable
                    id={d?.id}
                    handleOpen={handleOpen}
                    type={d?.value}
                  />
                </TabPanel>
              ))}
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
      <AdminLeaveRequestModalForm
        open={open}
        data={statusData}
        handleClose={handleDialogClose}
        formik={formik}
      />
    </div>
  );
};

export default SubAdminLeaveRequest;

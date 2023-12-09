import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { useUserTable } from "../hooks/admin/userTable/useUserTable";
import { useAssignCastToAdminForm } from "../hooks/assignCastToAdmin/component/form/useAssignCastToAdminForm";
import { useAssignCastToAdminTable } from "../hooks/assignCastToAdmin/component/table/useAssignCastToAdminTable";
import AssignForm from "../sections/@dashboard/assignCastToAdmin/AssignForm";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateManagerForm } from "../hooks/assignCastToAdmin/component/form/useUpdateManagerForm";
import UpdateForm from "../sections/@dashboard/assignCastToAdmin/UpdateForm";
import CustomMaterialTable from "../components/table/CustomMaterialTable";
import Error from "../components/error/Error";
import { useGetUnassignedCast } from "../hooks/dashboard/api/useDashboard";
import { getUser } from "../utils/cookieHelper";

const AssignedCastToAdminPage = () => {
  const { t } = useTranslation();
  const { user } = getUser();
  const { column, data, isLoading, isError, castData } =
    useAssignCastToAdminTable();
  const { subAdminData } = useUserTable();
  const { data: castCount } = useGetUnassignedCast(
    user?.role === "Admin" ? true : false
  );

  const { formik, open, handleClose, handleClickOpen, visible } =
    useAssignCastToAdminForm();

  const {
    formik: updateFormik,
    openUpdate,
    handleCloseUpdate,
    handleClickOpenUpdate,
  } = useUpdateManagerForm();

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

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };


  return (
    <>
      <Helmet>
        <title> {t("assign")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4">
            {t("assign")}
            <Typography variant="h6">
              ({t("unassignedcast")} - {castCount && castCount?.unassignedcast})
            </Typography>
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleClickOpen()}
            disabled={castData && castData?.length === 0}
            startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("assignmanager")}
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <CustomMaterialTable
                data={data}
                column={column}
                actions={[
                  {
                    icon: () => {
                      return <EditIcon />;
                    },
                    onClick: (event, rowData) => {
                      handleClickOpenUpdate(rowData?.id);
                    },
                  },
                ]}
              />
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
      {visible && (
        <AssignForm
          formik={formik}
          adminData={subAdminData}
          castData={castData}
          handleClose={handleDialogClose}
          open={open}
        />
      )}
      <UpdateForm
        formik={updateFormik}
        adminData={subAdminData}
        handleClose={handleCloseUpdate}
        open={openUpdate}
      />
    </>
  );
};

export default AssignedCastToAdminPage;

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
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { useScheduleCreateForm } from "../../hooks/schedule/component/form/create/useScheduleCreateForm";
import { useScheduleTable } from "../../hooks/schedule/component/table/useScheduleTable";
import ScheduleForm from "../../sections/@dashboard/schedule/ScheduleForm";
import Iconify from "../../components/iconify/Iconify";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import ScheduleShiftTable from "../../sections/@dashboard/schedule/ScheduleShiftTable";
import EditIcon from "@mui/icons-material/Edit";
import { useScheduleUpdateForm } from "../../hooks/schedule/component/form/update/useScheduleUpdateForm";
import Error from "../../components/error/Error";
import { RemoveRedEye } from "@mui/icons-material";

const SchedulePage = () => {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isError,
    column,
    shiftColumn,
    handleShiftTableOpen,
    openTable,
    handleShiftTableClose,
    shiftData,
    isTableVisible,
  } = useScheduleTable();
  const { formik, open, handleDialogClose, handleOpen, isFormVisible } =
    useScheduleCreateForm();

  const {
    formik: editFormik,
    openEdit,
    handleOpenEdit,
    handleCloseEdit,
    isEditFormVisible,
  } = useScheduleUpdateForm();

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    );
  }

  const canEdit = (rowData) => {
    const { status } = rowData;
    return status !== 'accepted' && status !== 'rejected';
  };
  
  return (
    <>
      <Helmet>
        <title>{t("schedule")}</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("schedule1")}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            startIcon={<Iconify icon="eva:plus-fill" />}>
            {t("create")}
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <CustomMaterialTable
                isLoading={isLoading}
                data={data}
                column={column}
                actions={[
                  // {
                  //   icon: () => (
                  //     <>
                  //       <RemoveRedEye />
                  //       <span style={{ fontSize: "1rem" }}>{t("ShowShift")}</span>
                  //     </>
                  //   ),
                  //   onClick: (event, rowData) => {
                  //     handleShiftTableOpen(rowData?.shifts);
                  //   },
                  // },
                  // {
                  //   icon: () => (
                  //     <>
                  //       <EditIcon />
                  //     </>
                  //   ),
                  //   onClick: (event, rowData) => {
                  //     event.preventDefault();
                  //     handleOpenEdit(rowData);
                  //   },
                  // },

                  {
                    icon: () => (
                      <>
                        <RemoveRedEye />
                        <span style={{ fontSize: "1rem" }}>{t("ShowShift")}</span>
                      </>
                    ),
                    onClick: (event, rowData) => {
                      handleShiftTableOpen(rowData?.shifts);
                    },
                  },
                  {
                    icon: () => (
                      <>
                        <EditIcon />
                      </>
                    ),
                    onClick: (event, rowData) => {
                      event.preventDefault();
                      if (canEdit(rowData) && !rowData?.shifts) {
                        handleOpenEdit(rowData);
                      }
                    },
                  },
                ]}
              />
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
      {isFormVisible && (
        <ScheduleForm
          type={false}
          formik={formik}
          open={open}
          handleClose={handleDialogClose}
        />
      )}
      {isEditFormVisible && (
        <ScheduleForm
          type={true}
          formik={editFormik}
          open={openEdit}
          handleClose={handleCloseEdit}
        />
      )}
      {isTableVisible && (
        <ScheduleShiftTable
          open={openTable}
          handleClose={handleShiftTableClose}
          shiftColumn={shiftColumn}
          isLoading={isLoading}
          shifts={shiftData}
        />
      )}
    </>
  );
};

export default SchedulePage;

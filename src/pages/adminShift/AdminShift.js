import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Error from "../../components/error/Error";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import { useShiftAdminTable } from "../../hooks/shift/component/table/useShiftAdminTable";
import ShiftAdminForm from "../../sections/shift/form/ShiftAdminForm";
import { useSubAdminLeaveRequestForm } from "../../hooks/attendance/component/subAdminLeaveRequest/form/useSubAdminLeaveRequestForm";

const AdminShift = () => {
  const {
    data,
    column,
    isLoading,
    setDate,
    setId,
    date,
    id,
    castData,
    handleSearch,
    open,
    handleClose,
    handleClickOpen,
    isError,
    setOpen,
  } = useShiftAdminTable();

  const { t } = useTranslation();
  const {formik} = useSubAdminLeaveRequestForm();

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
        <title> {t("Shift")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}>
          <Typography variant="h4" gutterBottom>
            {t("Shift")}
          </Typography>
          <Button variant="outlined" onClick={handleClickOpen}>
            {t("create_shift")}
          </Button>
        </Stack>

        <Card variant="contained" sx={{ padding: "2em", marginBottom: "2em" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            mb={1}>
            <MobileDatePicker
              label={t("Date")}
              format="YYYY-MM-DD"
              inputFormat="YYYY-MM-DD"
              value={date}
              disablePast
              onChange={(newValue) => setDate(newValue)}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <Select
                id="demo-simple-select-standard"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                label="User">
                <MenuItem value={"all"}>
                  <em>All</em>
                </MenuItem>
                {castData?.filter((d) => d?.id !== undefined && d?.fullname !== undefined)
                  .sort((a, b) => (a.fullname || '').localeCompare(b.fullname || ''))
                  .map((d) => (
                    <MenuItem value={d?.id} key={d?.id}>
                      <em>{d?.fullname}</em>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSearch}>
              {t("Search")}
            </Button>
          </Stack>
        </Card>
        <Scrollbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: "#fff" }}>
                    <CustomMaterialTable
                      isLoading={isLoading}
                      data={data}
                      column={column}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ p: 3 }} />
        </Scrollbar>
      </Container>
      <ShiftAdminForm
        open={open}
        handleClose={handleDialogClose}
        castData={castData}
        setOpen={setOpen}
      />
    </>
  );
};

export default AdminShift;

import React from "react";
import { useShiftForm } from "../../../hooks/shift/component/form/useShiftForm";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  Stack,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Skeleton,
} from "@mui/material";
import { MobileDatePicker, TimePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import LanguagePopover from "../../../layouts/dashboard/header/LanguagePopover";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShiftAdminForm = ({ open, handleClose, castData, setOpen }) => {
  const {
    data,
    id,
    setId,
    date,
    setDate,
    formik,
    handleSearch,
    search,
    starttime,
    endtime,
    selectedtime,
    setSelectedtime,
    setSearch,
    isLoading,
    handleRejectShift,
  } = useShiftForm();

  const handleReject = () => {
    setOpen(false);
    handleRejectShift();
  };

  const handleSubmit = () => {
    setOpen(false);
    formik.submitForm();
  };
  const { t } = useTranslation();

  const handleFormClose = () => {
    handleClose();
    setId("");
    setDate();
    setSearch(false);
    formik.resetForm();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleFormClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Grid container>
              <Grid item md={1}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleFormClose}
                  aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                md={11}
                sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LanguagePopover />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Scrollbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h4" mt={5} gutterBottom align="center">
                {t("create_shift")}
              </Typography>
              <Card>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-around"
                  mb={5}
                  mt={5}>
                  <MobileDatePicker
                    label={t("Date")}
                    format="YYYY-MM-DD"
                    inputFormat="YYYY-MM-DD"
                    disablePast
                    sx={{ m: 1, minWidth: 250 }}
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                    <Select
                      id="demo-simple-select-standard"
                      value={id}
                      onChange={(e) => {
                        e.preventDefault();
                        setId(e.target.value);
                      }}
                      label="User">
                      {/* {castData?.map((d) => (
                        <MenuItem value={d?.id} key={d?.id}>
                          <em>{d?.fullname}</em>
                        </MenuItem>
                      ))} */}
                      {castData
                        ?.filter((d) => d?.id !== undefined && d?.fullname !== undefined) 
                        .sort((a, b) => (a.fullname || '').localeCompare(b.fullname || ''))
                        .map((d) => (
                          <MenuItem value={d.id} key={d.id}>
                            <em>{d.fullname}</em>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={id !== "" && date !== "undefined" ? false : true}>
                    {t("Search")}
                  </Button>
                </Stack>
              </Card>
            </Grid>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={400}
                style={{ marginTop: 20 }}
              />
            ) : date && id && data && search ? (
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={4} p={5}>
                  <Grid item md={12}>
                    <TimePicker
                      name="shiftstarttime"
                      label={t("startAt")}
                      ampm={false}
                      sx={{ m: 1, minWidth: 800 }}
                      minTime={starttime}
                      maxTime={endtime}
                      value={formik.values.shiftstarttime}
                      onChange={(newValue) => {
                        formik.setFieldValue("shiftstarttime", newValue, true);
                        setSelectedtime(newValue);
                      }}
                      required
                      error={
                        formik.touched.shiftstarttime &&
                        Boolean(formik.errors.shiftstarttime)
                      }
                      helperText={
                        formik.touched.shiftstarttime &&
                        formik.errors.shiftstarttime
                      }
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TimePicker
                      name="shiftendtime"
                      label={t("endAt")}
                      ampm={false}
                      sx={{ m: 1, minWidth: 800 }}
                      minTime={selectedtime}
                      maxTime={endtime}
                      value={formik.values.shiftendtime}
                      onChange={(newValue) =>
                        formik.setFieldValue("shiftendtime", newValue, true)
                      }
                      required
                      error={
                        formik.touched.shiftendtime &&
                        Boolean(formik.errors.shiftendtime)
                      }
                      helperText={
                        formik.touched.shiftendtime &&
                        formik.errors.shiftendtime
                      }
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="success"
                        style={{ color: "#Fff" }}
                        onClick={() =>
                          window.confirm(t("shiftRejectionCause")) &&
                          handleReject()
                        }>
                        {t("Reject")}
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        disabled={!formik.isValid}
                        style={{ color: "#Fff" }}
                        onClick={() => handleSubmit()}>
                        {t("submit")}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleFormClose()}>
                        {t("cancel")}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            ) : !search ? (
              <></>
            ) : id && search ? (
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" mb={5} ml={5}>
                  {t("noCastSchedule")}
                </Typography>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          <Box sx={{ p: 3 }} />
        </Scrollbar>
      </Dialog>
    </div>
  );
};

export default ShiftAdminForm;

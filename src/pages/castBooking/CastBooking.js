import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { useCastBookingTable } from "../../hooks/castbooking/table/useCastBookingTable";
import { useTranslation } from "react-i18next";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import UpdateBookingModal from "../../sections/@dashboard/app/component/UpdateBookingModal";
import { useUpdateBooking } from "../../hooks/dashboard/component/useUpdateBooking";
import Error from "../../components/error/Error";
import { useNavigate } from "react-router-dom";

const CastBooking = () => {
  const { formik, open, handleOpen, handleClose } = useUpdateBooking();
  const { data, isLoading, isError, column } = useCastBookingTable(handleOpen);
  const navigate = useNavigate();

  const { t } = useTranslation();
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

  return (
    <>
      <Helmet>
        <title> {t("booking")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("booking")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <CustomMaterialTable
                isLoading={isLoading}
                data={data}
                column={column}

                onRowClick={(event, rowData) =>
                  navigate(`/cast/booking/${rowData?.id}`)
                }
              />
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
      <UpdateBookingModal
        open={open}
        handleClose={handleClose}
        formik={formik}
      />
    </>
  );
};

export default CastBooking;

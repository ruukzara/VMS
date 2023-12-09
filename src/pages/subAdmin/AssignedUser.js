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
import { useSubAdminAssignedTable } from "../../hooks/subadmin/assignedCast/table/useSubAdminAssignedTable";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import { useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";

const AssignedUser = () => {
  const { data, column, t, isLoading, isError } = useSubAdminAssignedTable();
  const navigate = useNavigate();
  const navigateToDetail = (id) => {
    navigate(`/admin/user/${id}`);
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
    <div>
      <>
        <Helmet>
          <title> {t("castassign")} </title>
        </Helmet>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}>
            <Typography variant="h4" gutterBottom>
              {t("castassign")}
            </Typography>
          </Stack>

          <Card>
            <Scrollbar>
              <Box sx={{ bgcolor: "#fff" }}>
                <CustomMaterialTable
                  data={data}
                  column={column}
                  onRowClick={(event, rowData) =>
                    navigateToDetail(rowData?.cast_id)
                  }
                />
                <Box sx={{ p: 3 }} />
              </Box>
            </Scrollbar>
          </Card>
        </Container>
      </>
    </div>
  );
};

export default AssignedUser;

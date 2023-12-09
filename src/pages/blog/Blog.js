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
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { useTranslation } from "react-i18next";
import { useBlogTable } from "../../hooks/blog/component/table/useBlogTable";
import Iconify from "../../components/iconify/Iconify";
import { useCreateForm } from "../../hooks/blog/component/form/useCreateForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteBlog } from "../../hooks/blog/api/useBlog";
import { useUpdateBlogForm } from "../../hooks/blog/component/form/useUpdateBlogForm";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import CreateBlogForm from "../../sections/@dashboard/userblog/CreateBlogForm";
import Error from "../../components/error/Error";

const Blog = () => {
  const { t } = useTranslation();
  const { mutate } = useDeleteBlog({});
  const {
    data,
    isLoading,
    isError,
    column,
    formData,
    open,
    openEdit,
    handleClose,
    handleOpen,
    handleCloseEdit,
    handleOpenEdit,
    isFormVisible,
    isEditFormVisible,
  } = useBlogTable();
  const { formik, handleKeyDown } = useCreateForm();
  const { formik: editFormik } = useUpdateBlogForm(formData);

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
        <title> {t("Blog")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("Blog")}
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
                  {
                    icon: () => <EditIcon />,
                    tooltip: t("Edit"),
                    onClick: (event, rowData) => {
                      event.preventDefault();
                      handleOpenEdit(rowData);
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: t("Delete"),
                    onClick: (event, rowData) => {
                      if (window.confirm(t("deleteBlog"))) {
                        mutate(rowData?.id);
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
        <CreateBlogForm
          formik={formik}
          open={open}
          handleClose={handleDialogClose}
          handleKeyDown={handleKeyDown}
        />
      )}
      {isEditFormVisible && (
        <CreateBlogForm
          formik={editFormik}
          open={openEdit}
          handleClose={handleCloseEdit}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

export default Blog;

import React from "react";
import { useTranslation } from "react-i18next";
import { usePaymentTable } from "../../hooks/payment/component/table/usePaymentTable";
import Error from "../../components/error/Error";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { saveAs } from "file-saver";
import moment from "moment";
import ExcelJS from "exceljs";

const CustomPagination = (props) => {
  const {
    totalCount,
    total,
    page,
    pageSize,
    onChangePage,
    onChangeRowsPerPage,
    startDate,
    endDate,
  } = props;
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <div>
        <span style={{ paddingLeft: "10px", fontWeight: 800 }}>
          {`${t("totalEarning")} ${moment(startDate).format(
            "YYYY-MM-DD"
          )}
          ${t("to")}
          ${moment(endDate).format("YYYY-MM-DD")}`}
          :
        </span>
        <span> ¥{total}</span>
      </div>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        rowsPerPage={pageSize}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  );
};

const Payment = () => {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isError,
    column,
    setStartDate,
    setEndDate,
    handleSearch,
    startDate,
    endDate,
  } = usePaymentTable();

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const total =
    data &&
    data?.reduce((accumulator, response) => {
      return accumulator + response.price;
    }, 0);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <div>
      <Helmet>
        <title> {t("Payment")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("Payment")}
          </Typography>
        </Stack>
        <Card variant="contained" sx={{ padding: "2em", marginBottom: "2em" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            mb={1}>
            <MobileDatePicker
              label={t("startDate")}
              format="YYYY-MM-DD"
              maxDate={endDate}
              inputFormat="YYYY-MM-DD"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <MobileDatePicker
              label={t("endDate")}
              format="YYYY-MM-DD"
              inputFormat="YYYY-MM-DD"
              value={endDate}
              minDate={startDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
            <Button variant="contained" onClick={handleSearch}>
              {t("Search")}
            </Button>
          </Stack>
        </Card>
        <Scrollbar>
          <Box sx={{ bgcolor: "#fff" }}>
            <CustomMaterialTable
              isLoading={isLoading}
              data={data}
              column={column}
              components={{
                Pagination: (props) => (
                  <CustomPagination
                    totalCount={data.length}
                    total={total}
                    page={page}
                    pageSize={pageSize}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    startDate={startDate}
                    endDate={endDate}
                    {...props}
                  />
                ),
              }}
              options={{
                exportButton: true, // Show export button
                exportAllData: true, // Export all data, not just the current page
                exportMenu: [
                  // {      //Commented since Japanese Characters was not working properly
                  //   label: t("exportCSV"),
                  //   exportFunc: (columns, data) => {
                  //     const csvData = [];
                  //     debugger
                  //     const filteredColumns = columns.filter((column) => column.field !== "id");

                  //     const columnTitles = filteredColumns.map(
                  //       (column) => column.title
                  //     );

                  //     columnTitles.unshift(t("serialNumber"));

                  //     // Push column titles as the first row
                  //     csvData.push(columnTitles);

                  //     // Push data rows
                  //     data.forEach((row, index) => {
                  //       const rowData = [(index + 1).toString(), ...filteredColumns.map((column) => {
                  //         const cellData = row[column.field]; // Adjust this based on your data structure
                  //         return cellData !== undefined ? cellData.toString() : "";
                  //       })];
                        
                  //       csvData.push(rowData);
                  //     });

                  //     const csvContent = csvData
                  //       .map((row) => row.join(","))
                  //       .join("\n");

                  //     const blob = new Blob([csvContent], {
                  //       type: "text/csv;charset=utf-8",
                  //     });
                  //     saveAs(
                  //       blob,
                  //       `${t("paymentDetail")}_${moment(startDate).format(
                  //         "YYYY-MM-DD"
                  //       )}_${t("to")}_${moment(endDate).format("YYYY-MM-DD")}.csv`
                  //     );
                  //   },
                  // },
                  {
                    label: t("exportExcel"),
                    exportFunc: (columns, data) => {
                      const workbook = new ExcelJS.Workbook();
                      const worksheet = workbook.addWorksheet("Sheet1");
                      
                      const filteredColumns = columns.filter((column) => column.field !== "id");

                      // Add column headers
                      worksheet.columns = [
                        { header: t("serialNumber"), key: "sn", width: 5 }, // Left-align the S.N. column
                        ...filteredColumns.map((column) => ({
                          header: column.title,
                          key: column.field,
                          width: 15, // Adjust the width as needed
                        })),
                      ];

                      // Add data rows
                      data.forEach((row, index) => {
                        const rowData = { sn: (index + 1).toString() }; // Add the sequential number here
                        filteredColumns.forEach((column) => {
                          const cellData = row[column.field]; // Adjust this based on your data structure
                          rowData[column.field] =
                            cellData !== undefined ? cellData.toString() : "";
                        });
                        
                        worksheet.addRow(rowData);
                      });

                      // Save the workbook to a Blob
                      workbook.xlsx.writeBuffer().then((buffer) => {
                        const blob = new Blob([buffer], {
                          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        });
                        saveAs(
                          blob,
                          `${t("paymentDetail")}_${moment(startDate).format(
                            "YYYY-MM-DD"
                          )}_${t("to")}_${moment(endDate).format("YYYY-MM-DD")}.xlsx`
                        );
                      });
                    },
                  },
                ],
              }}
            />
            <Box sx={{ p: 3 }} />
          </Box>
        </Scrollbar>
      </Container>
    </div>
  );
};

export default Payment;

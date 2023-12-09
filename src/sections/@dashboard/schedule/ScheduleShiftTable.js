import MaterialTable from "@material-table/core";
import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ScheduleShiftTable = ({
  open,
  handleClose,
  isLoading,
  shifts,
  shiftColumn,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogContent>
          {shifts !== null ? (
            <MaterialTable
              isLoading={isLoading}
              style={{ height: "200px" }}
              title={t("Shift")}
              data={shifts}
              columns={shiftColumn}
              options={{ paging: false, search: false }}
            />
          ) : (
            <MaterialTable
              isLoading={isLoading}
              title={t("Shift")}
              style={{ height: "200px" }}
              columns={shiftColumn}
              options={{ paging: false, search: false }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleShiftTable;

import React from "react";
import { useLeaveRequestTable } from "../../../hooks/attendance/component/leaverequest/table/useLeaveRequestTable";
import CustomMaterialTable from "../../../components/table/CustomMaterialTable";
import { Cancel } from "@mui/icons-material";
import { useCancelLeave } from "../../../hooks/attendance/useAttendance";
import { useTranslation } from "react-i18next";
import Error from "../../../components/error/Error";

const LeaveRequestTable = ({ id, type }) => {
  const { data, column, isLoading, isError } = useLeaveRequestTable(id, type);
  const { t } = useTranslation();
  const { mutate } = useCancelLeave({});

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      {type === "Pending" ? (
        <CustomMaterialTable
          isLoading={isLoading}
          data={data}
          column={column}
          actions={[
            {
              icon: () => {
                return <Cancel />;
              },
              tooltip: t("cancelLeave"),
              onClick: (event, rowData) => {
                mutate(rowData?.id);
              },
            },
          ]}
        />
      ) : (
        <CustomMaterialTable
          isLoading={isLoading}
          data={data}
          column={column}
        />
      )}
    </div>
  );
};

export default LeaveRequestTable;

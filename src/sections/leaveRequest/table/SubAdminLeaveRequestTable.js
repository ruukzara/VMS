import React from "react";
import { useSubAdminLeaveRequestTable } from "../../../hooks/attendance/component/subAdminLeaveRequest/table/useSubAdminLeaveRequestTable";
import EditIcon from "@mui/icons-material/Edit";
import CustomMaterialTable from "../../../components/table/CustomMaterialTable";
import Error from "../../../components/error/Error";

const SubAdminLeaveRequestTable = ({ id, handleOpen, type }) => {
  const { data, column, isLoading, isError } = useSubAdminLeaveRequestTable(
    id,
    type
  );

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
                return <EditIcon>Change Status</EditIcon>;
              },
              tooltip: "Change Status",
              onClick: (event, rowData) => {
                handleOpen(rowData?.id);
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

export default SubAdminLeaveRequestTable;

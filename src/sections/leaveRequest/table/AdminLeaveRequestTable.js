import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAdminLeaveRequestTable } from "../../../hooks/attendance/component/adminLeaveRequest/table/useAdminLeaveRequestTable";
import CustomMaterialTable from "../../../components/table/CustomMaterialTable";
import { useTranslation } from "react-i18next";
import Error from "../../../components/error/Error";

const AdminLeaveRequestTable = ({ id, handleOpen, type }) => {
  const { t } = useTranslation();
  const { data, column, isLoading, isError } = useAdminLeaveRequestTable(
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
                return <EditIcon>{t("chgStatus")}</EditIcon>;
              },
              tooltip: t("chgStatus"),
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

export default AdminLeaveRequestTable;

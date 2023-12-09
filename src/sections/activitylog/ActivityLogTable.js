import React from "react";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import Error from "../../components/error/Error";

const ActivityLogTable = ({ data, column, isLoading, isError }) => {
  return isError ? (
    <Error />
  ) : (
    <div>
      <CustomMaterialTable
        isLoading={isLoading}
        title=""
        options={{
          showTitle: false,
          pageSize: 10,
        }}
        data={data}
        column={column}
      />
    </div>
  );
};

export default ActivityLogTable;

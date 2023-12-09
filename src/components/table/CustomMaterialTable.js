// import MaterialTable from "@material-table/core";
// import React from "react";
// import { useTranslation } from "react-i18next";

// const CustomMaterialTable = ({
//   isLoading,
//   data,
//   column,
//   actions,
//   onRowClick,
//   options,
//   detailPanel,
//   components,
// }) => {
//   const { t } = useTranslation();
//   return (
//     <>
//       <MaterialTable
//         isLoading={isLoading}
//         title=""
//         options={{
//           showTitle: false,
//           actionsColumnIndex: -1,
//           actionsCellStyle: {
//             display: "flex",
//             justifyContent: "center",
//             padding: "24px",
//             width: "100%",
//             marginBottom: "-1px",
//           },
//           pageSize: 20,
//           maxColumnSort: 0,
//           maxBodyHeight: "500px",
//           sorting: false,
//           pageSizeOptions: [10, 20, 50, 100],
//           overflowY: "scroll",
//           // emptyRowsWhenPaging: false,
//           ...options,
//         }}
//         localization={{
//           toolbar: { searchPlaceholder: t("Search") },
//           header: { actions: t("Action") },
//           body: { emptyDataSourceMessage: t("noData") },
//         }}
//         data={data}
//         columns={column}
//         actions={actions}
//         onRowClick={onRowClick}
//         detailPanel={detailPanel}
//         components={components}
//       />
//     </>
//   );
// };

// export default CustomMaterialTable;


import MaterialTable from "@material-table/core";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomMaterialTable = ({
  isLoading,
  data,
  column,
  actions,
  onRowClick,
  options,
  detailPanel,
  components,
  onRequestSort, 
  order, 
  orderBy, 
}) => {
  const { t } = useTranslation();

  const getSortedData = () => {
    if (orderBy) {
      const comparator = (a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return order === 'asc' ? -1 : 1;
        if (bValue == null) return order === 'asc' ? 1 : -1;

        if (order === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      };

      return data.slice().sort(comparator);
    }

    return data;
  };

  const sortedData = getSortedData();

  return (
    <>
      <MaterialTable
        isLoading={isLoading}
        title=""
        options={{
          showTitle: false,
          actionsColumnIndex: -1,
          ...options,
        }}
        localization={{
          toolbar: { searchPlaceholder: t("Search") },
          header: { actions: t("Action") },
          body: { emptyDataSourceMessage: t("noData") },
        }}
        data={sortedData}
        columns={column}
        actions={actions}
        onRowClick={onRowClick}
        detailPanel={detailPanel}
        components={components}
        onSortChange={(orderBy, order) => onRequestSort(orderBy)} 
        orderBy={orderBy} 
        order={order} 
      />
    </>
  );
};

export default CustomMaterialTable;

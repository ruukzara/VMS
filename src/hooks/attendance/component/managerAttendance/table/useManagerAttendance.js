import moment from "moment";
import { useState, useEffect } from "react";
import { useGetAllAttendanceAssignedToManager } from "../../../useAttendance";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useGetAssignedCast } from "../../../../assignCastToAdmin/useAssignCastToAdmin";
import { useTranslation } from "react-i18next";

export const useManagerAttendance = () => {
  const [date, setDate] = useState(moment());
  const { t } = useTranslation();
  const [userid, setUserId] = useState("all");
  const { data, isLoading, isError, refetch } =
    useGetAllAttendanceAssignedToManager(
      moment(date).format("YYYY-MM-DD"),
      userid === "all" ? "" : userid
    );

  const { data: castData } = useGetAssignedCast();
  useEffect(() => {
    refetch();
  }, [date, userid, refetch]);

  const column = [
    {
      field: "id",
      title: "SN",
      dataIndex: "id",
      width: 10,
      searchable: false,
      filtering: false,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "fullname",
      title: t("User"),
      emptyValue: "-",
      filterComponent: (props) => {
        return (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <Select
              id="demo-simple-select-standard"
              value={userid}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              label="User">
              <MenuItem value={"all"}>
                <em>{t("All")}</em>
              </MenuItem>
              {/* {castData?.map((d) => (
                <MenuItem value={d?.id} key={d?.id}>
                  <em>{d?.cast}</em>
                </MenuItem>
              ))} */}
              {castData
                ?.sort((a, b) => a.cast.localeCompare(b.cast))
                .map((d) => (
                  <MenuItem value={d?.id} key={d?.id}>
                    <em>{d?.cast}</em>
                  </MenuItem>
                ))}

            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "clockindate",
      title: t("Date"),
      filtering: false,
      emptyValue: "-",
      render: (rowData) => moment(rowData?.clockindate).format("YYYY-MM-DD"),
    },
  ];
  return {
    column,
    data,
    isLoading,
    isError,
    setDate,
    date,
  };
};

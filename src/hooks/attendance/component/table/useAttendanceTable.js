import moment from "moment/moment";
import { useGetAllAttendance } from "../../useAttendance";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getUser } from "../../../../utils/cookieHelper";
import { useGetAllAdmin } from "../../../admin/useAdmin";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";

export const useAttendanceTable = () => {
  const [date, setDate] = useState(moment());
  const [userid, setUserId] = useState("all");
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetAllAttendance(
    moment(date).format("YYYY-MM-DD"),
    userid === "all" ? "" : userid
  );
  const { data: userData } = useGetAllAdmin();
  const { user } = getUser();
  const filterUserData = userData?.filter(
    (d) =>
      (d?.id !== user?.id && d?.type === "Cast") ||
      d?.type === "Sub Admin" ||
      d?.type === "Driver"
  );

  useEffect(() => {
    refetch();
  }, [date, userid, refetch]);

  const column = [
    {
      field: "id",
      title: "S.N",
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
              <MenuItem value="all" selected>
                <em>{t("All")}</em>
              </MenuItem>
              {/* {filterUserData?.map((d) => (
                <MenuItem value={d?.id} key={d?.id}>
                  <em>
                    {d?.first_name} {d?.last_name}
                  </em>
                </MenuItem>
              ))} */}
              {filterUserData
                ?.sort((a, b) => {
                  const nameA = `${a?.first_name} ${a?.last_name}`.toLowerCase();
                  const nameB = `${b?.first_name} ${b?.last_name}`.toLowerCase();
                  return nameA.localeCompare(nameB);
                })
                .map((d) => (
                  <MenuItem value={d?.id} key={d?.id}>
                    <em>
                      {d?.first_name} {d?.last_name}
                    </em>
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
      emptyValue: "-",
      render: (rowData) => moment(rowData?.clockindate).format("YYYY-MM-DD"),
      filterComponent: (props) => {
        return (
          <DatePicker
            label="Date"
            format="YYYY-MM-DD"
            inputFormat="YYYY-MM-DD"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        );
      },
    },
  ];
  return {
    column,
    data,
    isLoading,
    isError,
  };
};

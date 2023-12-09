import moment from "moment/moment";
import {
  useGetAllUserAttendance,
  useGetAllUserLeaveRequest,
} from "../../useAttendance";
import { useTranslation } from "react-i18next";

export const useUserAttendance = () => {
  const { data, isLoading, isError } = useGetAllUserAttendance();
  const { t } = useTranslation();
  let type = "calender";
  const {
    data: leaveData,
    isLoading: leaveLoading,
    isError: leaveError,
  } = useGetAllUserLeaveRequest(undefined, type);

  const attendanceEvents = [];
  const leaveEvents = [];

  function attendanceData(data) {
    let eventInnerData = {
      id: data?.id,
      color: "#00ff00",
      from: moment.utc(data?.clockindate).local().format(),
      to: data?.clockoutdate
        ? moment.utc(data?.clockoutdate).local().format()
        : moment.utc(data?.clockindate).local().format(),
      title: t("Present"),
    };
    attendanceEvents.push(eventInnerData);
  }

  function leavePushData(data) {
    let eventInnerData = {
      id: data?.id,
      color: "#ff0000",
      from: moment.utc(data?.startdate).local(),
      to: moment.utc(data?.enddate).local(),
      title: t("onLeave"),
    };
    leaveEvents.push(eventInnerData);
  }

  data?.map((d) => attendanceData(d));
  leaveData?.map((d) => leavePushData(d));

  let events = [...attendanceEvents, ...leaveEvents];
  
  return {
    isLoading,
    isError,
    leaveLoading,
    leaveError,
    events,
  };
};

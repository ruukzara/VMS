import React from "react";
import Calendar from "react-awesome-calendar";
import { useUserAttendance } from "../../hooks/attendance/component/userAttendance/useUserAttendance";
import "./index.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const UserAttendance = () => {
  const { events } = useUserAttendance();
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: "30px" }}>
      <Helmet>
        <title> {t("attendance")} </title>
      </Helmet>
      
      <Calendar events={events} />
    </div>
  );
};

export default UserAttendance;

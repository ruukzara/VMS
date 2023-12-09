import * as Yup from "yup";
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
const leaveRequestSchema = (t) =>
  Yup.object().shape({
    reason: Yup.string().required(t("provideReason")),
    startdate: Yup.date()
      .required(t("selectStartDate"))
      .min(currentDate, t("dateFuture")),
    enddate: Yup.date()
      .required(t("selectEndDate"))
      .min(Yup.ref("startdate"), t("endDateAfterStartDate")),
  });

export { leaveRequestSchema };

import moment from "moment";
import * as Yup from "yup";
const today = new Date();
const oneMonthFromNow = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate() + 1
);

const dateToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

const scheduleSchema = (t) =>
  Yup.object().shape({
    date: Yup.date()
      .required(t("Required"))
      .min(dateToday, t("dateFuture"))
      .max(oneMonthFromNow, t("addSchedule")),
    start_at: Yup.date()
      .required(t("Required"))
      .test("must-be-less", t("lessEndTime"), function (value) {
        const endAt = moment(this.parent.end_at);
        const startAt = moment(value);
        return !startAt.isSameOrAfter(endAt, "minute");
      }),
    end_at: Yup.date()
      .required(t("Required"))
      .test("is-different-time", t("differentTime"), function (value) {
        const startAt = moment(this.parent.start_at);
        const endAt = moment(value);
        return !startAt.isSame(endAt, "minute");
      })
      .when("start_at", (start_at, schema) => {
        return schema.test({
          name: "end_at",
          exclusive: true,
          message: t("differenceTime"),
          test: function (end_at) {
            const start = moment(start_at);
            const end = moment(end_at) || moment(); // If end time is not provided, consider the current time
            const diffInMinutes = end.diff(start, "minutes"); // Calculate time difference in minutes
            return diffInMinutes >= 60; // Validate if the total time is more than 60 minutes
          },
        });
      }),
  });

export { scheduleSchema };

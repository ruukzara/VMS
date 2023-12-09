import moment from "moment";
import * as Yup from "yup";

const adminShiftSchema = (t) =>
  Yup.object().shape({
    shiftstarttime: Yup.string()
      .required("Required")
      .test("must-be-less", t("lessEndTime"), function (value) {
        const endAt = moment(this.parent.shiftendtime);
        const startAt = moment(value);
        return !startAt.isSameOrAfter(endAt, "minute");
      }),
    shiftendtime: Yup.string()
      .required("Required")
      .test("is-different-time", t("differentTime"), function (value) {
        const startAt = moment(this.parent.shiftstarttime);
        const endAt = moment(value);
        return !startAt.isSame(endAt, "minute");
      })
      .when("shiftstarttime", (shiftstarttime, schema) => {
        return schema.test({
          name: "end_at",
          exclusive: true,
          message: t("differenceTime"),
          test: function (end_at) {
            const start = moment(shiftstarttime);
            const end = moment(end_at) || moment(); 
            const diffInMinutes = end.diff(start, "minutes"); 
            return diffInMinutes >= 60; // Validate if the total time is more than 60 minutes
          },
        });
      }),
  });

export { adminShiftSchema };




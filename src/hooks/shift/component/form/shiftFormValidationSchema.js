// import * as Yup from "yup";

// const shiftSchema = Yup.object().shape({
//   shiftstarttime: Yup.string().required("Required"),
//   shiftendtime: Yup.string().required("Required"),
// });

// export { shiftSchema };

import * as Yup from 'yup';

const shiftSchema = Yup.object().shape({
  shiftstarttime: Yup.string()
    .required('Required')
    .test('is-valid-start-time', 'Invalid start time', (value) => {
      return true; 
    }),
  shiftendtime: Yup.string()
    .required('Required')
    .test('is-valid-end-time', 'Invalid end time', function (value) {
      const { shiftstarttime } = this.parent;
      return shiftstarttime < value;
    }),
});

export { shiftSchema };

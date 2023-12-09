// import { useGeolocated } from "react-geolocated";
// import { getDateTime } from "../../../../utils/timestampChange";
import { useClockOutAttendance } from "../../useAttendance";
import moment from "moment";

export const useAttendanceClockOut = (checkAttendance) => {
  const { mutate } = useClockOutAttendance({});

  // const { coords, isGeolocationAvailable, isGeolocationEnabled, timestamp } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: 5000,
  //   });

  // const { time } = getDateTime(timestamp);

  const handleClockOut = () => {
    // const { latitude, longitude } = coords;

    const data = {
      clockoutlatitude: 36.54686697549364,
      clockoutlongitude: 138.8312979431854,
      clockouttime: moment().utc().local().format("hh:mm A"),
      clockoutdate: moment().utc().local().format(),
      id: checkAttendance?.id,
    };
    mutate(data);
  };
  return { handleClockOut };
};

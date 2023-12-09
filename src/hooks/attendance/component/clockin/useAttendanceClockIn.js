// import { useGeolocated } from "react-geolocated";
// import { getDateTime } from "../../../../utils/timestampChange";
import { useClockInAttendance } from "../../useAttendance";
import moment from "moment";

export const useAttendanceClockIn = () => {
  const { mutate } = useClockInAttendance({});
  // const { coords, isGeolocationAvailable, isGeolocationEnabled, timestamp } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: 5000,
  //   });

  // const { time } = getDateTime(timestamp);

  const handleClockIn = () => {
    // const { latitude, longitude } = coords;

    const data = {
      clockinlatitude: 36.54686697549364,
      clockinlongitude: 138.8312979431854,
      clockintime: moment().utc().local().format("hh:mm A"),
      clockindate: moment().utc().local().format(),
    };
    mutate(data);
  };
  return { handleClockIn };
};

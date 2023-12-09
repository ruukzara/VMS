export function getDateTime(timeStamp) {
  let dateFormat = new Date(timeStamp);

  let date = dateFormat.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let time = dateFormat.toLocaleString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
}

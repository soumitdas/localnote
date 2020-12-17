const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateToMonDDYYYYHHMMAP = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const y = date.getFullYear();
  const m = date.getMonth();
  let h = date.getHours();
  let min = date.getMinutes();

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  min = min < 10 ? "0" + min : min;

  return (
    monthShortNames[m] +
    separator +
    d +
    "," +
    separator +
    y +
    separator +
    h +
    ":" +
    min +
    " " +
    ampm
  );
};

import dayjs from "dayjs";

export default (
  date: Date,
  segment?: "date" | "month" | "year" | "fullDate" | "time"
) => {
  switch (segment) {
    case "date":
      return dayjs(new Date(date)).format("D");
    case "month":
      return dayjs(new Date(date)).format("MMMM");
    case "year":
      return dayjs(new Date(date)).format("YYYY");
    case "fullDate":
      return dayjs(new Date(date)).format("DD MMM YYYY");
    case "time":
      return dayjs(new Date(date)).format("HH:mm");
    default:
      return dayjs(new Date(date)).format("DD MMM YYYY - HH:mm");
  }
};

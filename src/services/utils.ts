import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export const formatDate = (date: string) => {
  return dayjs(date)
    .format("ddd DD")
    .replace(/^\w/, (c) => c.toUpperCase());
};

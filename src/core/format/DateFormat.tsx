import { MetaItem } from "@/core/types";
import moment from "moment";

const DATE_FORMAT = "YYYY-MM-DD"
const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss"

const DateFormat = (item: MetaItem, text:any) => {
  let dateType = item.extInfo ? item.extInfo.dateType : 1
  return text ? moment(text).format(dateType === 1 ? DATETIME_FORMAT : DATE_FORMAT) : "-";
}

export default DateFormat
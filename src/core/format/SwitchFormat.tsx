import { Switch } from "antd";
import { MetaItem } from "@/core/types";

const SwitchFormat = (item: MetaItem, text:any) => {
  return <Switch defaultChecked={text} disabled/>
}
export default SwitchFormat
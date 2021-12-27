import { Menu } from "antd"
// tab右击菜单
const TabMenu = (props: any) => {
  const { pane, onEdit, refreshTab } = props;
  const isDisabled = () => pane.key === 'dashboard'
  return (
    <Menu>
      <Menu.Item
        key="1"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          refreshTab()
        }}
      >刷新</Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          onEdit(pane.key, "remove")
        }}
        disabled={isDisabled()}
      >关闭</Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          onEdit(pane.key, "other")
        }}
      >关闭其他</Menu.Item>
      <Menu.Item
        key="4"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          onEdit(pane.key, "all")
        }}
      >全部关闭</Menu.Item>
    </Menu>
  )
}
export default TabMenu;
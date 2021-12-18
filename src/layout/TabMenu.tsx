import { Menu } from "antd"
// 刷新当前 tab
const refreshTab = (): void => {

}

// tab右击菜单
const TabMenu = (props: any) => {
  const {pane,onEdit} = props;
  console.log(pane)
  const isDisabled = () => pane.key === 'dashboard'
  return (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => refreshTab()}
      >
        刷新
      </Menu.Item>
      <Menu.Item
        key="2"
      onClick={(e) => onEdit(pane.key, "remove")}
      disabled={isDisabled()}
      >
        关闭
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          // removeAll()
        }}
      >
        关闭其他
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          // removeAll(true)
        }}
      // disabled={isDisabled()}
      >
        全部关闭
      </Menu.Item>
    </Menu>
  )
}
export default TabMenu;
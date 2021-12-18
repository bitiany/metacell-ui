import { Mapper, Autowire } from '@/redux'
import { PaneType } from './types';
const initPane = [{
  title: '首页',
  key: 'dashboard',
  content: 'Dashboard',
  closabled: false,
  path: '/'
}]
class AppInfo {
  @Autowire
  state() {
    return {
      collapsed: false,
      theme: '',
      selectedKeys: ["dashboard"],
      panes: initPane
    };
  }

  @Mapper()
  menuToggle(state: any) {
    return { ...state, collapsed: !state.collapsed };
  }
  @Mapper()
  changeTheme(state: any, data?: any) {
    return { ...state, theme: data }
  }
  @Mapper()
  addTabPane(state: any, pane: PaneType[], type?: string) {
    if (type === "add") {
      return { ...state, panes: [...state.panes || [], ...pane], selectedKeys: [pane[0].key] }
    } else if (type === "clear") {
      return {...state, panes: [...initPane]}
    } else {
      return { ...state, panes: [...pane] }
    }
  }
  @Mapper()
  setSelectedKeys(state: any, selectedKeys: string[]) {
    return { ...state, selectedKeys: [...selectedKeys] }
  }
}
export default AppInfo;
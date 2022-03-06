import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { Provider } from "./redux";
import MainLayout from "@/layout";
import LoginPage from '@/page/login'
import ErrorPage from "./page/errorPage";
import theme from "@/theme.less";

import AppInfo from '@/store/AppInfo'
import UserInfo from '@/store/UserInfo'
import MenuStore from '@/store/Menu'
import System from '@/store/System'

new AppInfo()
new UserInfo()
new MenuStore()
new System()

ConfigProvider.config({
  prefixCls: theme.antPrefix,
});
 
const App: FC = (props: any) => {
  return (
    <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
      <div className="App">
        <Provider>
          <Router basename={"/"}>
            <Routes>
              <Route
                path="*"
                key="main"
                element={<MainLayout {...props} />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/404" element={<ErrorPage />} />
            </Routes>
          </Router>
        </Provider>
      </div>
    </ConfigProvider>
  );
};

export default App;

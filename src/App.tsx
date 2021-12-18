import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { Provider, Register } from "./redux";
import MainLayout from "@/layout";
import LoginPage from '@/page/login'
import config from "./config/config";

import theme from "@/theme.less";
import "./App.less";

import AppInfo from '@/store/AppInfo'
import UserInfo from '@/store/UserInfo'

Register(AppInfo)
Register(UserInfo)

ConfigProvider.config({
  prefixCls: theme.antPrefix,
});
const App: FC = (props: any) => {
  return (
    <ConfigProvider locale={zhCN} prefixCls={theme.antPrefix}>
      <div className="App">
        <Provider>
          <Router basename={config.basename}>
            <Routes>
              <Route
                path="*"
                key="main"
                element={<MainLayout {...props} />}
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Router>
        </Provider>
      </div>
    </ConfigProvider>
  );
};

export default App;

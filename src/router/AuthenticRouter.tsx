import { FC } from "react";
import { Route } from "react-router-dom";
import MainLayout from "@/layout";
export const AuthenticRouter:FC = (props: any) => {
  return (
    <Route
      path="*"
      key="main"
      element={<MainLayout {...props} />}
    />
  )
}
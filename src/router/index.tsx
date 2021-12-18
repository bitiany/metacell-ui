import React from "react";
import { Route, Routes } from "react-router-dom";
import Components from "@/page";
import { StaticMenu } from '@/store/menu'


class AppRouter extends React.Component<any> {
  constructor(props:any) {
    super(props);
    this.state = {
      menus: props.menus || []
    };
    
  }  
  renderRouter = (item:any) => {
    const Component = item.component && Components[item.component];
    if(item.children?.length ===0){
      delete item.children
    }
    if(!Component){
      return null;
    }
    return item.children ? (
      item.children.map((it:any) => this.renderRouter(it))
    ) : (
      <Route
        key={item.apiKey}
        path={item.path || item.apiKey}
        element={<Component item={item} onChange={this.props.onChange}/>}
      />
    );
  }

  render() {
    const menus = [...StaticMenu.Menus, ...this.state["menus"]];
    return (
      <div>
        <Routes>
          {menus!.map((item) =>  this.renderRouter(item))}
        </Routes>
      </div>
    );
  }
}

export default AppRouter;

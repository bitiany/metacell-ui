import React from "react";


export interface ComponentType {
  name?: string;
  path?: string;
  state: any;
}

const getComponent = (props: ComponentType) => {
  const { name } = props
  return name ? React.lazy( () => import("@/components/" + name)) : null
}
export default getComponent;
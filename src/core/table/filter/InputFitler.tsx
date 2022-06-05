import React from "react";
import { Input } from "antd";
import { MetaFilter } from "@/core/types";
const { Search } = Input;

class InputFilter extends React.Component<MetaFilter, any> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  handleSearch(keyword:any) {
    if(keyword && keyword.length > 0){
      this.props.setSelectedKeys([keyword]);
      this.props.confirm();
    }else{
      console.log("clear")
      this.props.setSelectedKeys([])
      this.props.clearFilters();
      this.props.confirm();
    }
  }
  render() {
    const placeholder = "请输入" + this.props.label;
    return (
      <div style={{ padding: 8 }}>
        <Search
          type="text"
          placeholder={placeholder}
          allowClear
          style={{ width: 200 }}
          enterButton
          onSearch={(k) => this.handleSearch(k)}
        ></Search>
      </div>
    );
  }
}

export default InputFilter;

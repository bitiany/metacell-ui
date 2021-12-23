import React from "react";
import { Checkbox, Button } from "antd";
import { MetaFilter } from "@/core/types";

const CheckboxGroup = Checkbox.Group;

class DropdownFilter extends React.Component<MetaFilter, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      checkedList: []
    };
  }

  resetChange() {
    this.setState({checkedList: []})
    this.props.setSelectedKeys([])
    this.props.clearFilters()
  }
  onChange = (list:any) => {
    this.setState({checkedList: list})
  }
  handleSearch(){
    this.props.setSelectedKeys([...this.state.checkedList]);
    this.props.confirm()
  }
  render() {
    return (
      <div style={{ padding: 8 }} className="meta-table-filter">
        <CheckboxGroup
          options={this.props.options}
          value={this.state.checkedList}
          onChange={this.onChange}
          className="CheckboxGroup"
        ></CheckboxGroup>
        <div>
          <Button onClick={()=> this.resetChange()}>重置</Button>
          <Button type="primary" onClick={() => this.handleSearch()}>确定</Button>
        </div>
      </div>
    );
  }
}

export default DropdownFilter;

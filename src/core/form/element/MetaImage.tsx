import React from "react";
import moment from "moment";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import QiniuUpload from "../qiniu";
import { getBase64 } from "@/components/lib/form/utils";
// import { getPolicy } from "@/api/file";
export default class MetaImage extends React.Component<any> {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    policy: {},
  };

  componentDidMount() {
    // let that = this;
    // getPolicy().then((res: any) => {
    //   if(res.code && res.code === 200){
    //     that.setState({policy: res.data})
    //   }else{
    //     console.error(res.message)
    //   }
    // });
  }

  onChange = (value: any) => {
    let data = {};
    data[this.props.apiKey || ""] = moment(value).toDate().getTime();
    this.props.setFieldValue(data, false);
  };
  customRequest = (info:any) => {
    // const upload = QiniuUpload(this.state.policy);
    // upload(info.file)
    //   .then((res: any) => {
    //     if (res && res.code && res.code === 200) {
    //       const data = res.data || {};
    //       this.setState({
    //         fileList: [
    //           ...this.state.fileList,
    //           { uid: data.id, name: data.name, status: "done", url: data.url },
    //         ],
    //       });
    //       console.log(data);
    //     }
    //   })
    //   .catch(() => {
    //     console.error("上传失败");
    //   });
  };
  handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handleChange = ({ fileList }:any) => console.log(fileList);
  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.customRequest}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

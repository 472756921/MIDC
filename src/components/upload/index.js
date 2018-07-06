import React from 'react';
import { Upload, Icon, Modal } from 'antd';


class PicturesWall extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount() {
    if(this.props.imgListD!=undefined && this.props.imgListD.length !== 0){
      let imgd = this.props.imgListD.map((it, i) => {
        return {uid: i, name: it, status:'done', url:it}
      })
      this.setState({...this.state, fileList:imgd});
    }
  };
  handleCancel = () => this.setState({ previewVisible: false })
  handleChange = ({ file, fileList }) => this.setState({ fileList });
  getList = () => {
    let data = this.state.fileList.map((it) => {
      return {url:it.response!=undefined?it.response.data:it.url};
    });
    return data;
  };
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://192.168.1.3:8080/apiM/upload/uploadImg"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;

import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import {api, serviceIP} from '../../utils/config';

class PicturesWall extends React.Component {
  constructor(props){
    super(props);
    if(props.listdata){
    }
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount() {
    if(this.props.imgListD!=undefined && this.props.imgListD.length !== 0){
      let imgd = this.props.imgListD.map((it, i) => {
        return {uid: it.uid, name: it.uid, status:'done', url: serviceIP + it.url}
      })
      this.setState({...this.state, fileList:imgd});
    }
  };
  handleCancel = () => this.setState({ previewVisible: false })
  handleChange = ({ file, fileList }) => this.setState({ fileList });
  getList = () => {
    let data = this.state.fileList.map((it) => {
      return {url:it.response!=undefined?it.response.data.url:'/img' + it.url.split('/img')[1], id: it.response!=undefined?it.response.data.uid:it.uid};
    });
    return data;
  };
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  remove = (file) => {
    // console.log(file);
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
          action={api.uploadImg}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.remove}
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

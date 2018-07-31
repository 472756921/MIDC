import { Upload, Button, Icon } from 'antd';
import React from 'react';
import {api} from '../../utils/config';

let imgList = [];
let change = false;
let prop = {
  action: api.uploadFile,
  onChange({ file, fileList }) {
    imgList = fileList;
    change = true;
  },
  defaultFileList: [
    // {
    //   uid: 1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/xxx.png',
    // }
  ],
};

class fu extends React.Component {
  constructor(props){
    super(props);
    prop.defaultFileList = props.defValue;
  }
  render() {
    return(
      <Upload {...prop}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    )
  }
}

export default fu;
export function getList() {
  return {imgList:imgList, change: change}
};

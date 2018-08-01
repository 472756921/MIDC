import { Modal } from 'antd';
const confirm = Modal.confirm;

const showConfirm = (title, message, onOKCallBack) => {
  confirm({
    title: title,
    content: message,
    onOk() {onOKCallBack()},
    onCancel() {},
  });
}

export default showConfirm;

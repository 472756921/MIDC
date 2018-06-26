import { Modal, Button } from 'antd';
import Loader from "../Loader";
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

import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
import PropTypes from 'prop-types';
import styles from './index.css';
import Confirm from '../../components/Confirm';
const Option = Select.Option;

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '权限',
    dataIndex: 'qx',
    key: 'qx',
  }, {
    title: '创建时间',
    dataIndex: 'createdDate',
    key: 'createdDate',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={()=>edit(text)}>修改权限</span>
        <Divider type="vertical" />
        <span className={styles.href} onClick={()=>reset(text)}>重置</span>
        <Divider type="vertical" />
        <span className={styles.del} onClick={()=>del(text)}>删除</span>
      </span>
    ),
  }
];
let dis = '';
const edit = (data) => {
  dis({type: 'user/settempData', payload: {tempData: data}});
  dis({type: 'user/changeVisibleA', payload: {visible: true}});
}
const resetUser = ()=>{
  dis({type:'user/resetUsers'});
}
const reset = (e) => {
  dis({type:'user/settempData', payload: {tempData: e.id}});
  Confirm('重置账号','重置后该账号权限和密码将恢复至初始状态', resetUser);
}
const delItem = ()=>{
  dis({type:'user/del'});
}
const del = (e) => {
  dis({type:'user/settempData', payload: {tempData: e.id}});
  Confirm('确认删除','删除后该账号将无法恢复', delItem);
}

const fj = ({loading, user, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type: 'user/changeVisibleA', payload: {visible: false}})
  }
  const handleCancel = (e) => {
    dispatch({type: 'user/changeVisibleA', payload: {visible: false}})
  }
  return (
    <div>
      <Button type="primary">新建用户</Button>
      <br/>
      <br/>
      <Table dataSource={user.tableList} columns={columns}/>
      <Modal title="详情" visible={user.visibleA} onOk={handleOk} onCancel={handleCancel}>
        <div>账号名：{user.tempData.name}</div>
        <br/>
        <div>权限：
          <Select style={{'width': '150px'}} value={user.tempData.qx}>
            <Option value={1} >超级管理员</Option>
            <Option value={2} >管理员</Option>
            <Option value={3} >用户</Option>
          </Select>
        </div>
      </Modal>
    </div>
  )
}

fj.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({loading, user}) => ({loading, user}))(fj)

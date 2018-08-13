import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
import PropTypes from 'prop-types';
import styles from './index.css';
import Confirm from '../../components/Confirm';
const Option = Select.Option;

const columns = [
  {
    title: '用户名',
    dataIndex: 'account',
    key: 'account',
  }, {
    title: '权限',
    dataIndex: 'roleId',
    key: 'roleId',
    render: (text, record) => (
      <span>{text===0?'超级管理员':text===1?'管理员':'用户'}</span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={()=>edit(text)}>修改权限</span>
        <Divider type="vertical" />
        <span className={styles.del} onClick={()=>del(text)}>删除</span>
      </span>
    ),
  }
];
let dis = '';
const edit = (data) => {
  data.password = '';
  data.type = 'edit';
  dis({type: 'user/settempData', payload: data});
  dis({type: 'user/changeVisibleA', payload: {visible: true}});
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
  const changes = (data, type) => {
    let value = '', tempData = JSON.parse(JSON.stringify(user.tempData));
    if(type === 'roleId'){
      value = data;
    } else {
      value = data.target.value;
    }
    tempData[type] = value;
    dispatch({type: 'user/change', payload: tempData});
  }
  const newUser = () => {
    const data = {
      password: '',
      account: '',
      roleId: 2,
      type: 'new',
    }
    dis({type: 'user/settempData', payload: data});
    dis({type: 'user/changeVisibleA', payload: {visible: true}});
  }
  const handleOk = (e) => {
    dispatch({type: 'user/save'});
  }
  const handleCancel = (e) => {
    dispatch({type: 'user/changeVisibleA', payload: {visible: false}});
  }
  return (
    <div>
      <Button type="primary" onClick={newUser}>新建用户</Button>
      <br/>
      <br/>
      <Table dataSource={user.tableList} columns={columns} loading={loading.models.user}/>

      <Modal title="详情" visible={user.visibleA} onOk={handleOk} onCancel={handleCancel}>
        <div>账号名：<Input value={user.tempData.account} disabled={user.tempData.type==='edit'} onChange={(value) => changes(value,'account')}/></div>
        <div>密码：<Input value={user.tempData.password} type='password' onChange={(value) => changes(value,'password')}/> </div>
        <br/>
        <div>权限：
          <Select style={{'width': '150px'}} value={user.tempData.roleId} onChange={(d) => changes(d,'roleId')}>
            <Option value={0} >超级管理员</Option>
            <Option value={1} >管理员</Option>
            <Option value={2} >用户</Option>
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

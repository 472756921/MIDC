import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import styles from '../index.css';
import { Table, Input, Select, Divider, Modal, Button } from 'antd';
const Option = Select.Option;

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    width: 120,
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={()=>chang(text)}>修改</span>
        <Divider type="vertical" />
        <span className={styles.href} onClick={()=>del(text.id)}>删除</span>
      </span>
    ),
  }
];
let _dis = '';

const chang = (itemData) => {
  _dis({type: 'systemMannger_cd/modelShow', payload:{modelShow: true, itemData}});
  setTimeout(()=>{
    const listData = document.getElementsByClassName('cd');
    listData[0].value = itemData.name;
    listData[1].value = itemData.come;
    listData[2].value = itemData.fzs;
    listData[3].value = itemData.cas;
    listData[4].value = itemData.id;
  }, 500);
}
const del = (id) => {
  Confirm('确认删除','删除后将无法恢复', ()=>{_dis({type: 'systemMannger_cd/del', itemData:{id: id, sysType: 'cd'}})});
}
const cd = ({systemMannger_cd, dispatch}) => {
  _dis = dispatch;
  const handleChange = (value)=>{
    dispatch({type:'systemMannger_cd/search', vname: value});
  }
  const handleOk = (value)=>{
    const listData = document.getElementsByClassName('cd');
    const data = {
      name: listData[0].value,
      come: listData[1].value,
      fzs: listData[2].value,
      cas: listData[3].value,
      id: listData[4].value,
      type: 'cd'
    }
    dispatch({type:'systemMannger_cd/saveTableData', payload: data});
  }
  const handleCancel = (value)=>{
    dispatch({type: 'systemMannger_cd/modelShow', payload:{modelShow: false, itemData:''}});
  }
  const add = () => {
    _dis({type: 'systemMannger_cd/modelShow', payload:{modelShow: true, itemData:{}}});
  }

  const changeType = (e)=>{
    dispatch({type:'systemMannger_cd/getData', payload: {type: e.target['title']}})
  }
  return (
    <div className={styles.navBtns}>
      <Button type='primary' onClick={add}>添加</Button>
      <br/>
      <br/>

      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='cd' onClick={changeType}>朝代管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='fj' onClick={changeType}>方剂类型管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='gytj' onClick={changeType}>给药途径管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='jxgl' onClick={changeType}>剂型管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='kfl' onClick={changeType}>科分类管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='sfl' onClick={changeType}>属分类管理</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='zyzz' onClick={changeType}>中药作用</Button>
      <Button type={systemMannger_cd.nowType==='cd'?'primary':''} title='zyyf' onClick={changeType}>中药用法</Button>

      <Table dataSource={systemMannger_cd.tableItem} columns={columns} />

      <Modal title="成分管理" visible={systemMannger_cd.modelShow} onOk={handleOk} onCancel={handleCancel}>
        <div><div className={styles.contentBu}>名称：</div><Input title='name' className='cd'/></div>
        <div><Input title='id' className='cd' type='hidden'/></div>
      </Modal>
    </div>
  )
}

cd.propTypes = {
  loading: PropTypes.object,
  systemMannger_cd: PropTypes.object,
}

export default connect(({systemMannger_cd}) => ({systemMannger_cd}))(cd);

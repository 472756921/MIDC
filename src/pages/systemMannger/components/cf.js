import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import styles from '../index.css';
import { Table, Input, Select, Divider, Modal, Button } from 'antd';
const Option = Select.Option;

const columns = [
{
  title: '化合物名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '来源',
  dataIndex: 'come',
  key: 'come',
}, {
  title: '分子式',
  dataIndex: 'fzs',
  key: 'fzs',
}, {
  title: 'CAS号',
  dataIndex: 'cas',
  key: 'cas',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={chang}>修改</span>
        <Divider type="vertical" />
        <span className={styles.href}>删除</span>
      </span>
    ),
  }
];
let _dis = '';

const chang = () => {
  _dis({type: 'systemMannger/modelShow', payload:{modelShow: true}});
}

const cf = ({systemMannger, dispatch}) => {
  _dis = dispatch;
  const handleChange = (value)=>{
    dispatch({type:'systemMannger/search', vname: value});
  }
  const handleOk = (value)=>{
    const listData = document.getElementsByClassName('cf');
    const data = {
      name: listData[0].value,
      come: listData[0].value,
      fzs: listData[0].value,
      cas: listData[0].value,
      type: 'cf'
    }
    dispatch({type:'systemMannger/saveTableData', payload: data});
  }
  const handleCancel = (value)=>{
    dispatch({type: 'systemMannger/modelShow', payload:{modelShow: false}});
  }

  return (
    <div className={styles.navBtns}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="输入内容搜索"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          systemMannger.lsitData.map((it, i) => {
            return (<Option key={i} value={it.name}>{it.name}</Option>)
          })
        }
      </Select>
      <br/>
      <br/>
      <Table dataSource={systemMannger.tableItem} columns={columns} />

      <Modal title="成分管理" visible={systemMannger.modelShow} onOk={handleOk} onCancel={handleCancel}>
        <div><div className={styles.contentBu}>化合物名称：</div><Input title='name' className='cf'/></div>
        <div><div className={styles.contentBu}>来源：</div><Input title='come' className='cf'/></div>
        <div><div className={styles.contentBu}>分子式：</div><Input title='fzs' className='cf'/></div>
        <div><div className={styles.contentBu}>CAS号：</div><Input title='cas' className='cf'/></div>
      </Modal>
    </div>
  )
}


cf.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(cf);

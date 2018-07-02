import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import styles from '../index.css';
import { Table, Input, Select } from 'antd';
const Option = Select.Option;

const columns = [
{
  title: '病人名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '联系方式',
  dataIndex: 'phone',
  key: 'phone',
}, {
    title: '末次就诊日期',
    dataIndex: 'lastDate',
    key: 'lastDate',
}, {
    title: '首次就诊日期',
    dataIndex: 'fistDate',
    key: 'fistDate',
  }
];

const cf = ({systemMannger, dispatch}) => {

  const handleChange = (value)=>{
    dispatch({type:'systemMannger/search', vname: value});
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
    </div>
  )
}


cf.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(cf);

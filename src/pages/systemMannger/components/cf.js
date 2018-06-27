import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Table, Input, Select } from 'antd';
const Option = Select.Option;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  come: 32,
  fzs: '西湖区湖底公园1号',
  CAS: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  come: 42,
  CAS: '西湖区湖底公园1号',
  fzs: '西湖区湖底公园1号'
}];

const columns = [{
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
  dataIndex: 'CAS',
  key: 'CAS',
}];

const cf = ({systemMannger, dispatch}) => {

  const handleChange = ()=>{}

  return (
    <div>
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
      <Table dataSource={systemMannger.lsitData} columns={columns} />
    </div>
  )
}


cf.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(cf);

import React from 'react';
import { connect } from 'dva'
import { Table, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '首诊时间',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '就诊次数',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <Divider type="vertical" />
      <Link to={`informationCollection/${text.id}`}>详情</Link>
      <Divider type="vertical" />
      <a href="javascript;" style={{color:'red'}}>删除</a>
    </span>
  ),
}];


const IC = ({loading, informationCollection, dispatch}) => {
  const chage = (p, f, s) => {
    dispatch({type: 'informationCollection/query', payload:{ page: p.current, pageSize: 30 }});
  }
  return(
    <div>
      <Table columns={columns} dataSource={informationCollection.listData.data} loading={loading.models.informationCollection} pagination={{'total': informationCollection.listData.total, 'pageSize': 30}} onChange={chage}/>
    </div>
  )
}

IC.propTypes = {
  informationCollection: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, informationCollection }) => ({ loading, informationCollection }))(IC)

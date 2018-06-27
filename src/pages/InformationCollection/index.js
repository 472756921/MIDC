import React from 'react';
import { connect } from 'dva'
import { Table, Input, Row, Col, Button, Modal, select, message  } from 'antd';
import { Link } from 'react-router-dom';
import {Trim, isNumber} from '../../utils';
import PropTypes from 'prop-types';

const option = select.option;
const Search = Input.Search;
const selectStyle = {
  width: '100%',
  padding: '4px',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  border: '1px solid #ccc',
};
const columns = [
  {
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
      <Link to={`informationCollection/${text.id}`}>详情</Link>
    </span>
  ),
}];


const IC = ({loading, informationCollection, dispatch}) => {
  const chage = (p, f, s) => {
    dispatch({type: 'informationCollection/query', payload:{ page: p.current, pageSize: 30, searchV:'getState' }});
  }
  const search = (v) => {
    if(v === '') {
      dispatch({type: 'informationCollection/query'});
    } else {
      dispatch({type: 'informationCollection/query', payload:{page: 1, pageSize: 30, searchV: v}});
    }
  }
  const handleOk = ()=>{
    const infoH = document.getElementsByClassName('info_data')
    let data = {};
    for(let i=0; i<infoH.length; i++) {
      data[infoH[i].getAttribute('data-name')] = Trim(infoH[i].value);
    }
    if(data.name === '' || data.phone === '' || data.age === '' || data.address === ''){
      message.warning('必填项不能为空');
      return false
    }
    if(!isNumber(data.age)&&!isNumber(data.phone)) {
      message.warning('年龄和电话只能输入数字');
      return false
    }
    if(Number(data.age) > 120) {
      message.warning('最大年龄为120岁');
      return false
    }
    if(data.phone.length > 13 || data.phone.length < 6) {
      message.warning('请输入正确的电话号码');
      return false
    }
    dispatch({type: 'informationCollection/addPatient', payload:data });

  }
  const modalControl = (value)=>{
    dispatch({type: 'informationCollection/showModal', payload:{visible: value} });
  }

  return(
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Search placeholder="请输入患者姓名" onSearch={value =>search(value)} enterButton/>
        </Col>
        <Col span={6}>
          <Button type="primary" icon="file-add" onClick={()=>{modalControl(true)}}>录入新患者</Button>
        </Col>
      </Row>
      <br/>
      <Table columns={columns} dataSource={informationCollection.listData.content} loading={loading.models.informationCollection} pagination={{'total': informationCollection.listData.totalPages, 'pageSize': 30}} onChange={chage}/>

      <Modal width={800} title="患者信息" visible={informationCollection.visible} onOk={()=>{handleOk()}} onCancel={()=>{modalControl(false)}}>
        <Row gutter={16}>
          <Col span={6}>
            <Input placeholder="患者姓名(必填)" className='info_data' data-name={'name'}/>
          </Col>
          <Col span={6}>
            <select style={selectStyle} className='info_data' defaultValue="1" data-name={'sex'}>
              <option value="1">男</option>
              <option value="0">女</option>
              <option value="2">不详</option>
            </select>
          </Col>
          <Col span={6}>
            <Input placeholder="年龄(必填)" className='info_data' data-name={'age'}/>
          </Col>
          <Col span={6}>
            <Input placeholder="电话(必填)" className='info_data' data-name={'phone'}/>
          </Col>
          <br/>
          <br/>
          <Col span={6}>
            <Input placeholder="地址(必填)" className='info_data' data-name={'address'}/>
          </Col>
          <Col span={6}><Input placeholder="出生地" className='info_data' data-name={'birthplace'}/></Col>
          <Col span={6}><Input placeholder="邮编" className='info_data' data-name={'zipCode'}/></Col>
          <Col span={6}>
            <select style={selectStyle} className='info_data' defaultValue="2" data-name={'marriage'}>
              <option value="1">已婚</option>
              <option value="0">未婚</option>
              <option value="2">其他婚姻状况</option>
            </select>
          </Col>
          <br/>
          <br/>
          <Col span={6}><Input placeholder="国籍" className='info_data' data-name={'citizenship'}/></Col>
          <Col span={6}><Input placeholder="职业" className='info_data' data-name={'profession'}/></Col>
          <Col span={6}><Input placeholder="民族" className='info_data' data-name={'ethnic'}/></Col>
          <Col span={6}><Input placeholder="体重" className='info_data' data-name={'weight'}/></Col>
          <br/>
          <br/>
        </Row>
      </Modal>
    </div>
  )
}

IC.propTypes = {
  informationCollection: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ loading, informationCollection }) => ({ loading, informationCollection }))(IC)

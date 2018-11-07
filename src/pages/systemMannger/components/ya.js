import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import Loader from '../../../components/Loader';
import PropTypes from 'prop-types';
import styles from '../index.css';
import { Table, Input, Tabs, Divider, Modal, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ADD from './add/add';
const dateFormat = 'YYYY-MM-DD';
const TabPane = Tabs.TabPane;

let _dis = '', dates = '';
const columns = [
  {
    title: '病人名',
    key: 'asdf',
    render: (text, record) => (
      <span>
        <Link to={`informationCollection/${text.id}`}>{text.name}</Link>
    </span>
    ),
  },
  {
    title: '就诊日期',
    dataIndex: 'date',
    width: 170,
    key: 'date',
  },
  {
    title: '就诊次数',
    dataIndex: 'visitTimes',
    key: 'visitTimes',
  },
  {
    title: '中医疾病',
    dataIndex: 'diagnosisAndtreatment.zdyzl.zyjb',
    key: 'diagnosisAndtreatment.zdyzl.zyjb',
  },
  ,{
    title: '操作',
    key: 'action',
    width: 160,
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={()=>chang(text)}>详情/修改</span>
        <Divider type="vertical" />
        <span className={styles.href} onClick={()=>del(text.id)}>删除</span>
      </span>
    ),
  }
];
const selectStyle = {
  width: '100%',
  padding: '4px',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  border: '1px solid #ccc',
};

const chang = (itemData) => {
  _dis({type: 'systemMannger/modelShow', payload:{modelShow: true, itemData}});
  setTimeout(()=>{
    const listData = document.getElementsByClassName('ya');
    dates = itemData.fistDate;
    for(let i=0; i<listData.length; i++) {
      listData[i].value = itemData[listData[i].getAttribute('title')]
    }
  }, 500);
}
const del = (id) => {
  Confirm('确认删除','删除后将无法恢复', ()=>{_dis({type: 'systemMannger/del', itemData:{id: id, sysType: 'ya'}})});
}

const ya = ({systemMannger, dispatch, loading}) => {
  _dis = dispatch;
  const handleOk = (value)=>{
    const listData = document.getElementsByClassName('ya');
    const data = {
      name: listData[0].value,
      sex: listData[1].value,
      age: listData[2].value,
      weight: listData[3].value,
      marriage: listData[4].value,
      profession: listData[5].value,
      citizenship: listData[6].value,
      ethnic: listData[7].value,
      birthplace: listData[8].value,
      phone: listData[9].value,
      address: listData[10].value,
      zipCode: listData[11].value,
      fistDate: dates,
      type: 'ya'
    }
    dispatch({type:'systemMannger/tempData2', payload: data});
    setTimeout(()=>{
      dispatch({type:'systemMannger/saveDataYA'});
    }, 1000)
  }
  const handleCancel = (value)=>{
    dispatch({type: 'systemMannger/modelShow', payload:{modelShow: false, itemData:systemMannger.itemData}});
  }
  const dateOnChange = (date, dateString) => {
    dates = dateString;
  }
  const changeDate = (date, dateString) => {
    dispatch({type:'systemMannger/changeDate', payload: {date: dateString}});
  }
  const search = (value)=>{
    let d = document.getElementById('serName').value;
    dispatch({type:'systemMannger/serchaYA', payload: {sv: d}});
  }
  return (
    <div className={styles.navBtns}>
      <Input id='serName' placeholder='输入患者姓名搜索' style={{width: "200px"}}/>
      <DatePicker onChange={changeDate} placeholder='输入就诊时间' style={{width: "200px", marginLeft: '5px'}}/>
      <Button type='primary' onClick={search}>查询</Button>
      <br/>
      <br/>
      <Table rowKey={record => record.id} dataSource={systemMannger.tableItem} columns={columns} />
      <Modal title="病人管理" visible={systemMannger.modelShow} onOk={handleOk} onCancel={handleCancel} width='800px'>
        <div><div className={styles.contentBu}>姓名：</div><Input title='name' className='ya'/></div>
        <div>
          <div className={styles.contentBu}>性别：</div>
          <select className='ya' defaultValue="女" title='sex' style={selectStyle}>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="不详">不详</option>
          </select>
        </div>
        <div><div className={styles.contentBu}>年龄：</div><Input title='age' className='ya'/></div>
        <div><div className={styles.contentBu}>体重：</div><Input title='weight' className='ya'/></div>
        <div>
          <div className={styles.contentBu}>婚姻状况：</div>
          <select style={selectStyle} title='marriage' className='ya' defaultValue="2" >
            <option value="1">已婚</option>
            <option value="0">未婚</option>
            <option value="3">其他婚姻状况</option>
          </select>
        </div>
        <div><div className={styles.contentBu}>职业：</div><Input title='profession' className='ya'/></div>
        <div><div className={styles.contentBu}>国籍：</div><Input title='citizenship' className='ya'/></div>
        <div><div className={styles.contentBu}>民族：</div><Input title='ethnic' className='ya'/></div>
        <div><div className={styles.contentBu}>出生地：</div><Input title='birthplace' className='ya'/></div>
        <div><div className={styles.contentBu}>联系电话：</div><Input title='phone' className='ya'/></div>
        <div><div className={styles.contentBu}>家庭地址：</div><Input title='address' className='ya'/></div>
        <div><div className={styles.contentBu}>邮政编码：</div><Input title='zipCode' className='ya'/></div>
        <div>
          {/*<div className={styles.contentBu}>就诊时间：{systemMannger.itemData.fistDate}</div>*/}
          {/*<DatePicker onChange={dateOnChange} style={selectStyle} defaultValue={moment(systemMannger.itemData.fistDate, dateFormat)}/>*/}
        </div>
        <div><Input title='id' className='ya' type='hidden'/></div>
        <br/>
        {
          systemMannger.modelShow?<ADD/>:''
        }
      </Modal>
    </div>
  )
}

ya.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger, loading}) => ({systemMannger, loading}))(ya);

import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import styles from '../index.css';
import { Table, Input, Select, Divider, Modal, Button, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

const columns = [
{
  title: '病人名',
  key: 'asdf',
  render: (text, record) => (
    <span>
        <Link to={`informationCollection/${text.id}`}>{text.name}</Link>
    </span>
  ),
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
  },{
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

const selectStyle = {
  width: '100%',
  padding: '4px',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  border: '1px solid #ccc',
};
let _dis = '', dates = '';
const chang = (itemData) => {
  _dis({type: 'systemMannger/modelShow', payload:{modelShow: true, itemData}});
  setTimeout(()=>{
    const listData = document.getElementsByClassName('br');
    dates = itemData.fistDate;
    for(let i=0; i<listData.length; i++) {
      listData[i].value = itemData[listData[i].getAttribute('title')]
    }
  }, 500);
}
const del = (id) => {
  Confirm('确认删除','删除后将无法恢复', ()=>{_dis({type: 'systemMannger/del', itemData:{id: id, sysType: 'br'}})});
}

const br = ({systemMannger, dispatch}) => {
  _dis = dispatch;
  const handleChange = (value)=>{
    dispatch({type:'systemMannger/search', vname: value});
  }
  const handleOk = (value)=>{
    const listData = document.getElementsByClassName('br');
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
      type: 'br'
    }
    dispatch({type:'systemMannger/saveTableData', payload: data});
  }
  const handleCancel = (value)=>{
    dispatch({type: 'systemMannger/modelShow', payload:{modelShow: false, itemData:''}});
  }
  const dateOnChange = (date, dateString) => {
    dates = dateString;
  }
  const search = () => {
    let d = document.getElementById('serName').value;
    dispatch({type:'systemMannger/serchaBR', payload: {sv: d}});
  }

  return (
    <div className={styles.navBtns}>
      <Input id='serName' placeholder='输入患者姓名搜索' style={{width: "200px"}}/>
      <Button type='primary' onClick={search}>查询</Button>
      <br/>
      <br/>
      <Table dataSource={systemMannger.tableItem} columns={columns} />

      <Modal title="病人管理" visible={systemMannger.modelShow} onOk={handleOk} onCancel={handleCancel}>
        <div><div className={styles.contentBu}>姓名：</div><Input title='name' className='br'/></div>
        <div>
          <div className={styles.contentBu}>性别：</div>
          <select className='br' defaultValue="女" title='sex' style={selectStyle}>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="不详">不详</option>
          </select>
        </div>
        <div><div className={styles.contentBu}>年龄：</div><Input title='age' className='br'/></div>
        <div><div className={styles.contentBu}>体重：</div><Input title='weight' className='br'/></div>
        <div>
          <div className={styles.contentBu}>婚姻状况：</div>
          <select style={selectStyle} title='marriage' className='br' defaultValue="2" >
            <option value="已婚">已婚</option>
            <option value="未婚">未婚</option>
            <option value="其他婚姻状况">其他婚姻状况</option>
          </select>
        </div>
        <div><div className={styles.contentBu}>职业：</div><Input title='profession' className='br'/></div>
        <div><div className={styles.contentBu}>国籍：</div><Input title='citizenship' className='br'/></div>
        <div><div className={styles.contentBu}>民族：</div><Input title='ethnic' className='br'/></div>
        <div><div className={styles.contentBu}>出生地：</div><Input title='birthplace' className='br'/></div>
        <div><div className={styles.contentBu}>联系电话：</div><Input title='phone' className='br'/></div>
        <div><div className={styles.contentBu}>家庭地址：</div><Input title='address' className='br'/></div>
        <div><div className={styles.contentBu}>邮政编码：</div><Input title='zipCode' className='br'/></div>
        <div>
          <div className={styles.contentBu}>就诊时间：</div>
          <DatePicker onChange={dateOnChange} style={selectStyle} defaultValue={moment(systemMannger.itemData.fistDate, dateFormat)}/>
        </div>
        <div><Input title='id' className='br' type='hidden'/></div>
      </Modal>
    </div>
  )
}

br.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(br);

import { connect } from 'dva';
import { Button, Row, Col, Table, Divider, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.css';
import Confirm from "../../components/Confirm";
import FileUp from '../../components/FileUpload/index';
import {downloadFile} from '../../utils/index';

const index =  ({loading, dataMannger, dispatch}) => {
  const columns = [
    {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '关键字',
    dataIndex: 'keyName',
    key: 'keyName',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={()=>showMore(text)}>修改</span>
        <Divider type="vertical" />
        <span className={styles.href} onClick={()=>down(text)}>下载</span>
        <Divider type="vertical" />
        <span className={styles.del} onClick={()=>del(text)}>删除</span>
      </span>
    ),
  }];
  let delID = ''; //待删除ID

  const delItem = ()=>{
    dispatch({type:'dataMannger/del', payload:{id: delID}});
  }
  const del = (text)=>{
    delID = text.id;
    Confirm('确认删除','删除后将无法恢复 '+text.name, delItem);
  }
  const showMore = (data) => {
    let d = JSON.stringify(data);
    dispatch({type:'dataMannger/settempData', payload:JSON.parse(d)});
    dispatch({type:'dataMannger/visible', payload:{visible: true}});
  }
  const changeTemp = (data, type) => {
    dispatch({type:'dataMannger/changeTemp', payload:{type: type, data: data.target.value}});
  }
  const handleOk = () => {
    dispatch({type:'dataMannger/save'});
  }
  const handleCancel = () => {
    dispatch({type:'dataMannger/visible', payload:{visible: false}});
  }
  const add = () => {
    dispatch({type:'dataMannger/settempData', payload:{name:'', keyName: '', attach: []}});
    dispatch({type:'dataMannger/visible', payload:{visible: true}});
  }
  const changePage = (p, f, s) => {
    dispatch({type: 'dataMannger/getData', payload:{ page: p.current, pageSize: 30 }});
  }

  const down = (data) => {
    dispatch({type:'dataMannger/settempData', payload:data});
    dispatch({type:'dataMannger/visibleDown', payload:{visibleDown: true}});
  }
  const handleOk2 = () => {
    dispatch({type:'dataMannger/visibleDown', payload:{visibleDown: false}});
  }
  const handleCancel2 = () => {
    dispatch({type:'dataMannger/visibleDown', payload:{visibleDown: false}});
  }
  const search = () => {
    const sn = document.getElementById('sn').value;
    const sk = document.getElementById('sk').value;
    dispatch({type:'dataMannger/search', payload:{title: sn, key: sk}});
  }
  return (
    <div>
      <div>
        <Row gutter={6}>
          <Col span={4}><Input placeholder="输入标题" id='sn'/></Col>
          <Col span={4}><Input placeholder="输入关键字" id='sk'/></Col>
          <Col span={4}><Button type="primary" onClick={search}>查询</Button></Col>
          <Col span={2} offset={10}><Button onClick={add}>新建附件</Button></Col>
        </Row>
      </div>
      <br/>
      <br/>
      <Table dataSource={dataMannger.listData.content} columns={columns} pagination={{'total': dataMannger.listData.totalElements, 'pageSize': 30}} onChange={changePage}  loading={loading.models.dataMannger} />

      <Modal title="详情" visible={dataMannger.visible} onOk={handleOk} onCancel={handleCancel}>
        标题：<Input placeholder="输入标题" style={{width: '300px'}} value={dataMannger.tempData.name} onChange={(value)=>changeTemp(value, 'name')}/>
        <br/>
        <br/>
        关键字：<Input placeholder="输入关键字" style={{width: '285px'}}  value={dataMannger.tempData.keyName} onChange={(value)=>changeTemp(value, 'keyName')}/>
        <br/>
        <br/>
        附件：{dataMannger.visible?<FileUp defValue={dataMannger.tempData.attach}/>:''}
      </Modal>

      <Modal title="下载" visible={dataMannger.visibleDown} onOk={handleOk2} onCancel={handleCancel2}>
        {
          (dataMannger.tempData.attach && dataMannger.tempData.attach.length !== 0)?dataMannger.tempData.attach.map((it, i) => {
          return (
            <div key={i} title='点击下载' style={{cursor:'pointer', color: '#1890ff'}} onClick={()=>downloadFile(it.name, it.url)}>{it.name}</div>
          )
        }):'暂无附件'
      }
      </Modal>
    </div>
  )
}

index.propTypes = {
  loading: PropTypes.object,
  dataMannger: PropTypes.object,
}

export default connect(({ loading, dataMannger }) => ({ loading, dataMannger }))(index)

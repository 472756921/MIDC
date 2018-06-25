import React from 'react';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Divider, Select  } from 'antd';
import styles from '../index.css'


const { TextArea } = Input;
const Option = Select.Option;

const wdm = ({systemMannger, dispatch})=>{

  const changeValue = (data) => {
    if(systemMannger.itemData !== '' && typeof data === "object") {
      systemMannger.itemData[data.target['title']] = data.target.value;
    } else if(typeof data === "number") {
      systemMannger.itemData.fClass = data;
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData})
  }

  const classes = systemMannger.lsitData;

  const save = ()=>{

  }
  const del = ()=>{

  }
  const add = (e)=>{
    console.log(e.target['title']);
  }

  return (
    <div>
      <Button onClick={add} title='classes'>添加疾病类型</Button>
      <Button onClick={add} title='jb'>添加疾病</Button>
      <Button onClick={del} title='jb'>删除当前疾病</Button>
      <Divider />
      <Row gutter={16} >
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>名称：<span className={styles.redPoint}>*</span></div>
          <Input value={systemMannger.itemData.name} title='name' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>类别：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue} disabled={systemMannger.itemData.fClass===0?true:false}>
            <Option key={99991} value={0}  disabled={systemMannger.itemData.fClass!==0?true:false}>西医疾病类型</Option>
            {
              classes.map((it, i) => {
                return (<Option key={i} value={it.id}>{it.name}</Option>)
              })
            }
          </Select>
        </Col>
      </Row>
      <Row gutter={16} hidden={systemMannger.itemData.isMenu===1?true:false}>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>疾病概况：</div>
          <TextArea rows={3} value={systemMannger.itemData.gk}title='gk' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>疾病病因：</div>
          <TextArea rows={3} value={systemMannger.itemData.by} title='by' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>发病机制：</div>
          <TextArea rows={3} value={systemMannger.itemData.fbjz} title='fbjz' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>体征：</div>
          <TextArea rows={3} value={systemMannger.itemData.tz} title='tz' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>理化检查：</div>
          <TextArea rows={3} value={systemMannger.itemData.lhjc} title='lhjc' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>鉴别：</div>
          <TextArea rows={3} value={systemMannger.itemData.jb} title='jb' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>鉴别诊断：</div>
          <TextArea rows={3} value={systemMannger.itemData.jbzd} title='jbzd' onChange={changeValue} />
        </Col>
        <Col span={12} style={{marginBottom: '10px'}}>
          <div>预后：</div>
          <TextArea rows={3} value={systemMannger.itemData.yh} title='yh' onChange={changeValue} />
        </Col>
      </Row>
      <Button type='primary' onClick={save}>保存</Button>
    </div>
  )
}
wdm.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(wdm);

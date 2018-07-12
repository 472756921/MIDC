import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Divider, Select, message } from 'antd';
import styles from '../index.css';


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

  const classes = systemMannger.lsitData.filter(_=>_.isMenu===1);

  const save = ()=>{
    if(systemMannger.itemData.name === '' || systemMannger.itemData.fClass === '' || systemMannger.itemData.fClass == undefined) {
      message.error('请填写名称和类型');
    } else {
      // type
      const {type} = systemMannger.lsitData.filter(_=>_.id === systemMannger.itemData.fClass);
      if(type){
        systemMannger.itemData.type = Number(type[0]+1);
      } else {
        systemMannger.itemData.type = 0;
      }
      dispatch({type:'systemMannger/saveData'});
    }
  }
  const delItem = ()=>{
    dispatch({type:'systemMannger/del', itemData: systemMannger.itemData});
  }
  const del = ()=>{
    if(systemMannger.itemData === ''){
      message.error('请选择要删除的对象');
    } else {
      Confirm('确认删除','删除后将无法恢复，若删除的是疾病类型，该类型下的疾病也将被删除', delItem);
    }
  }
  const add = (e)=>{
    const t = e.target['title'];
    if(t === 'classes') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'默认疾病类型', sysType: 'wdm', isMenu: 1 }});
    } else if(t === 'jb') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'新的疾病',sysType: 'wdm', isMenu: 0 }});
    }
  }

  const handleChange = (value)=>{
    const data = systemMannger.lsitData.filter(_=>_.id === value);
    if(data.length > 0){
      dispatch({type:'systemMannger/changeItemData', itemData: data[0]});
    }
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
          systemMannger.lsitData.filter(_=>_.isMenu !== 1).map((it, i) => {
            return (<Option key={i} value={it.id}>{it.name}</Option>)
          })
        }
      </Select>
      <Button onClick={add} title='classes'>添加疾病类型</Button>
      <Button onClick={add} title='jb'>添加疾病</Button>
      <Button onClick={del} title='jb'>删除当前疾病/类型</Button>
      <Divider />
      <Row gutter={16} >
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>名称：<span className={styles.redPoint}>*</span></div>
          <Input value={systemMannger.itemData.name} title='name' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>类别：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue}>
            <Option key={99991} value={0}  disabled={systemMannger.itemData.isMenu!==1?true:false}>西医疾病类型</Option>
            {
              classes.map((it, i) => {
                return (<Option key={i} value={it.id}>{it.name}</Option>)
              })
            }
          </Select>
        </Col>
      </Row>
      <Row gutter={16} hidden={systemMannger.itemData.isMenu===1?true:false}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>疾病概况：</div>
          <TextArea rows={3} value={systemMannger.itemData.gk}title='gk' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>疾病病因：</div>
          <TextArea rows={3} value={systemMannger.itemData.by} title='by' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>发病机制：</div>
          <TextArea rows={3} value={systemMannger.itemData.fbjz} title='fbjz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>体征：</div>
          <TextArea rows={3} value={systemMannger.itemData.tz} title='tz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>理化检查：</div>
          <TextArea rows={3} value={systemMannger.itemData.lhjc} title='lhjc' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>鉴别：</div>
          <TextArea rows={3} value={systemMannger.itemData.jb} title='jb' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>鉴别诊断：</div>
          <TextArea rows={3} value={systemMannger.itemData.jbzd} title='jbzd' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
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

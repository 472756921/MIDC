import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, message, Input, Button, Divider, Select  } from 'antd';
import styles from '../index.css';

const Search = Input.Search;
const { TextArea } = Input;
const Option = Select.Option;

const cdm = ({systemMannger, dispatch})=>{
  const changeValue = (data) => {
    if(systemMannger.itemData !== '' && typeof data === "object") {
      systemMannger.itemData[data.target['title']] = data.target.value;
    } else if(typeof data === "number") {
      systemMannger.itemData.fClass = data;
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData});
  }

  const classes = systemMannger.lsitData.filter(_=>_.type < 2);

  const save = ()=>{
    if(systemMannger.itemData.name === '' || systemMannger.itemData.fClass === '') {
      message.error('请填写名称和类型');
    } else {
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
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'默认疾病类型', fClass:0, sysType: 'cdm', isMenu: 1, type: 1 }});
    } else if(t === 'jb') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'新的疾病',sysType: 'cdm', isMenu: 0, type: 2 }});
    }
  }

  const handleChange = (value)=>{
    const data = systemMannger.lsitData.filter(_=>_.id === value);
    if(data.length > 0){
      dispatch({type:'systemMannger/changeItemData', itemData: data[0]});
    }
  }

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
          systemMannger.lsitData.filter(_=>_.isMenu !== 1).map((it, i) => {
            return (<Option key={i} value={it.id}>{it.name}</Option>)
          })
        }
      </Select>
      <Button onClick={add} title='classes'>添加疾病类型</Button>
      <Button onClick={add} title='jb'>添加疾病</Button>
      <Button onClick={del}>删除当前疾病/类型</Button>
      <Divider />
      <Row gutter={16}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>名称：<span className={styles.redPoint}>*</span></div>
          <Input value={systemMannger.itemData.name} title='name' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>类别：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue} disabled={systemMannger.itemData.fClass===0?true:false}>
            <Option key={99991} value={0}  disabled={systemMannger.itemData.fClass!==0?true:false}>中医疾病类型</Option>
            {
              classes.map((it, i) => {
                return (<Option key={i} value={it.id}>{it.name}</Option>)
              })
            }
          </Select>
        </Col>
      </Row>
      <Row gutter={16} hidden={systemMannger.itemData.fClass===0?true:false}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>疾病概况：</div>
          <TextArea rows={3} value={systemMannger.itemData.gk}title='gk' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>疾病病因：</div>
          <TextArea rows={3} value={systemMannger.itemData.by} title='by' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>临床表现：</div>
          <TextArea rows={3} value={systemMannger.itemData.bx} title='bx' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>鉴别诊断：</div>
          <TextArea rows={3} value={systemMannger.itemData.jbzd} title='jbzd' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>诊断要点：</div>
          <TextArea rows={3} value={systemMannger.itemData.zdyd} title='zdyd' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>治疗原则：</div>
          <TextArea rows={3} value={systemMannger.itemData.zlyz} title='zlyz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>辨证要点：</div>
          <TextArea rows={3} value={systemMannger.itemData.bzyd} title='bzyd' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>分型论治：</div>
          <TextArea rows={3} value={systemMannger.itemData.fxlz} title='fxlz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>历代医家论述：</div>
          <TextArea rows={3} value={systemMannger.itemData.ldyjls} title='ldyjls' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>转归预后：</div>
          <TextArea rows={3} value={systemMannger.itemData.zgyh} title='zgyh' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>关联证候：</div>
          <TextArea rows={3} value={systemMannger.itemData.glzh} title='glzh' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>关联症状：</div>
          <TextArea rows={3} value={systemMannger.itemData.glzz} title='glzz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>相关西医疾病：</div>
          <TextArea rows={3} value={systemMannger.itemData.xgyxjb} title='xgyxjb' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>其它：</div>
          <TextArea rows={3} value={systemMannger.itemData.qt} title='qt' onChange={changeValue} />
        </Col>
      </Row>
      <Button type='primary' onClick={save}>保存</Button>
    </div>
  )
}
cdm.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(cdm);

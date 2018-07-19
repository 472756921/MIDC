import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Divider, Select, message } from 'antd';
import styles from '../index.css';
import {isType} from "../../../utils";

const { TextArea } = Input;
const Option = Select.Option;

// wdm   未完成
const zy = ({systemMannger, dispatch})=>{

  const changeValue = (data) => {
    if(systemMannger.itemData !== '' && typeof data === "object") {
      systemMannger.itemData[data.target['title']] = data.target.value;
    } else if(typeof data === "number") {
      systemMannger.itemData.fClass = data;
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData})
  }
  const changeValue2 = (data, type) => {
    try {
      if(isType(data) == '[object Array]') {
        systemMannger.itemData[type] = [];
        systemMannger.itemData[type] = systemMannger.itemData[type].concat(data);
      } else {
        systemMannger.itemData[type] = data;
      }
    } catch (e) {
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData});
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
      Confirm('确认删除','删除后将无法恢复，若删除的是中药类型，该类型下的类目也将被删除', delItem);
    }
  }
  const add = (e)=>{
    const t = e.target['title'];
    if(t === 'classes') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'默认中药类型', sysType: 'zy', isMenu: 1 }});
    } else if(t === 'jb') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'新的中药',sysType: 'zy', isMenu: 0 }});
    }
  }
  const handleChange = (value)=>{
    const data = systemMannger.lsitData.filter(_=>_.id === value);
    if(data.length > 0){
      dispatch({type:'systemMannger/changeItemData', itemData: data[0]});
    }
  }
  const selectData = (type) => {
    dispatch({type:'systemMannger/selectData', payload: {type: type}});
  }
  const selectDataByCd = (type) => {
    dispatch({type:'systemMannger/selectDataByCd', payload: {type: type}});
  }

  return (
    <div className={styles.navBtns} id='area'>
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
      <Button onClick={add} title='classes'>添加中药类型</Button>
      <Button onClick={add} title='jb'>添加中药</Button>
      <Button onClick={del} title='jb'>删除当前中药/类型</Button>
      <Divider />
      <Row gutter={16} >
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>名称：<span className={styles.redPoint}>*</span></div>
          <Input value={systemMannger.itemData.name} title='name' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>类别：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue}>
            <Option key={99991} value={0}  disabled={systemMannger.itemData.isMenu!==1?true:false}>默认中药类型</Option>
            {
              classes.map((it, i) => {
                return (<Option key={i} value={it.id}>{it.name}</Option>)
              })
            }
          </Select>
        </Col>
      </Row>
      <Row gutter={16} hidden={systemMannger.itemData.isMenu===1?true:false}>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>首字母大写：</div>
          <Input value={systemMannger.itemData.szmdx} title='szmdx' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>英文名称：</div>
          <Input value={systemMannger.itemData.ywmc} title='ywmc' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>拉丁名称：</div>
          <Input value={systemMannger.itemData.ldmc} title='ldmc' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>性状：</div>
          <Input value={systemMannger.itemData.xz} title='xz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>基源：</div>
          <Input value={systemMannger.itemData.jy} title='jy' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>别名：</div>
          <Input value={systemMannger.itemData.bm} title='bm' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>用法用量：</div>
          <Input value={systemMannger.itemData.yfyl} title='yfyl' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>科：</div>
          <Select mode="multiple"  value={systemMannger.itemData.ke} style={{ width: '100%' }}  title='ke' onFocus={()=>selectDataByCd('kfl')} onChange={(data)=>changeValue2(data, 'ke')} getPopupContainer={() => document.getElementById('area')}>
            {
              systemMannger.selectData.map((it, i) => {
                if(it.isMenu){
                } else {
                  return (<Option key={i} value={it.name}>{it.name}</Option>)
                }
              })
            }
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>属：</div>
          <Select mode="multiple"  value={systemMannger.itemData.su} style={{ width: '100%' }}  title='su' onFocus={()=>selectDataByCd('sfl')} onChange={(data)=>changeValue2(data, 'su')} getPopupContainer={() => document.getElementById('area')}>
            {
              systemMannger.selectData.map((it, i) => {
                if(it.isMenu){
                } else {
                  return (<Option key={i} value={it.name}>{it.name}</Option>)
                }
              })
            }
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>四气：</div>
          <Select mode="multiple"  value={systemMannger.itemData.sq} style={{ width: '100%' }}  title='sq' onChange={(data)=>changeValue2(data, 'sq')} getPopupContainer={() => document.getElementById('area')}>
            <Option value='寒'>寒</Option>
            <Option value='热'>热</Option>
            <Option value='温'>温</Option>
            <Option value='凉'>凉</Option>
            <Option value='平'>平</Option>
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>五味：</div>
          <Select mode="multiple"  value={systemMannger.itemData.ww} style={{ width: '100%' }}  title='ww' onChange={(data)=>changeValue2(data, 'ww')} getPopupContainer={() => document.getElementById('area')}>
            <Option value='辛'>辛</Option>
            <Option value='酸'>酸</Option>
            <Option value='甘'>苦</Option>
            <Option value='咸'>咸</Option>
            <Option value='涩'>涩</Option>
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>归茎：</div>
          <Select mode="multiple"  value={systemMannger.itemData.gj} style={{ width: '100%' }}  title='gj' onChange={(data)=>changeValue2(data, 'gj')} getPopupContainer={() => document.getElementById('area')}>
            <Option value='心'>心</Option>
            <Option value='肝'>肝</Option>
            <Option value='脾'>脾</Option>
            <Option value='肺'>肺</Option>
            <Option value='肾'>肾</Option>
            <Option value='心包'>心包</Option>
            <Option value='大肠'>大肠</Option>
            <Option value='小肠'>小肠</Option>
            <Option value='膀胱'>膀胱</Option>
            <Option value='胃'>胃</Option>
            <Option value='胆'>胆</Option>
            <Option value='三焦'>三焦</Option>
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>药用部位：</div>
          <Input value={systemMannger.itemData.yybw} title='yybw' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>主治疾病：</div>
          <Select mode="multiple" value={systemMannger.itemData.zzjb} style={{ width: '100%' }}  title='zzjb' onFocus={()=>selectData('cdm')} onChange={(data)=>changeValue2(data, 'zzjb')} getPopupContainer={() => document.getElementById('area')}>
            {
              systemMannger.selectData.map((it, i) => {
                if(it.isMenu){
                } else {
                  return (<Option key={i} value={it.name}>{it.name}</Option>)
                }
              })
            }
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>功能主治：</div>
          <Select mode="multiple" value={systemMannger.itemData.glzz} style={{ width: '100%' }}  title='glzz' onFocus={()=>selectData('fjzz')} onChange={(data)=>changeValue2(data, 'glzz')} getPopupContainer={() => document.getElementById('area')}>
            {
              systemMannger.selectData.map((it, i) => {
                if(it.isMenu){
                } else {
                  return (<Option key={i} value={it.name}>{it.name}</Option>)
                }
              })
            }
          </Select>
        </Col>
        {/*<Col xl={12} xxl={8} style={{marginBottom: '14px'}}>*/}
          {/*<div>药理作用：</div>*/}
          {/*<Input value={systemMannger.itemData.ylzz} title='ylzz' onChange={changeValue} />*/}
        {/*</Col>*/}
        {/*<Col xl={12} xxl={8} style={{marginBottom: '14px'}}>*/}
          {/*<div>化学成分：</div>*/}
          {/*<Input value={systemMannger.itemData.hxcf} title='hxcf' onChange={changeValue} />*/}
        {/*</Col>*/}
        {/*<Col xl={12} xxl={8} style={{marginBottom: '14px'}}>*/}
          {/*<div>功能分类：</div>*/}
          {/*<Input value={systemMannger.itemData.glfl} title='glfl' onChange={changeValue} />*/}
        {/*</Col>*/}
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>图片：</div>
          <Input value={systemMannger.itemData.tp} title='tp' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '14px'}}>
          <div>备注：</div>
          <TextArea rows={3} value={systemMannger.itemData.bz} title='bz' onChange={changeValue} />
        </Col>
      </Row>
      <Button type='primary' onClick={save}>保存</Button>
    </div>
  )
}
zy.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(zy);

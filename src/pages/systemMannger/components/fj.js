import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, message, Input, Button, Divider, Select, Icon } from 'antd';
import styles from '../index.css';
import {isType} from "../../../utils";

const selectStyle = {
  width: '100%',
  padding: '4px',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  border: '1px solid #ccc',
};
const { TextArea } = Input;
const Option = Select.Option;
// cdm
const fj = ({systemMannger, dispatch})=>{
  const changeValue = (data) => {
    if(systemMannger.itemData !== '' && typeof data === "object") {
      systemMannger.itemData[data.target['title']] = data.target.value;
    } else if(typeof data === "number") {
      try {
        systemMannger.itemData.fClass = data;
      } catch (e) {
        message.warning('当前无选中对象');
      }
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData});
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
  const save = ()=>{
    if(systemMannger.itemData.name === '' || systemMannger.itemData.fClass === '' || systemMannger.itemData.fClass == undefined) {
      message.error('请填写名称和类型');
    } else {
      let mn = document.getElementsByClassName('midName');
      let ml = document.getElementsByClassName('midNum');
      let mz = document.getElementsByClassName('midOption');
      let mf = document.getElementsByClassName('midType');

      let t = systemMannger.itemData;
      if(t === ''){
        return false
      }
      t.cf = [];
      for(let i=0; i<mn.length; i++) {
        t.cf.push({name: mn[i].children[0].children[0].children[0].innerText, yl: ml[i].value, zy: mz[i].children[0].children[0].children[0].innerText, yf: mf[i].children[0].children[0].children[0].innerText});
      }
      dispatch({type:'systemMannger/saveData'});
    }
  }
  const delItem = ()=>{
    dispatch({type:'systemMannger/del', itemData: systemMannger.itemData});
  }
  const del = ()=>{
    if(systemMannger.itemData.id === 1) {
      message.error('不能删除该菜单');
      return false
    }
    if(systemMannger.itemData === '' || systemMannger.itemData.id === undefined){
      message.error('请选择要删除的对象');
    } else {
      Confirm('确认删除','删除后将无法恢复，若删除的是方剂类型，该类型下的类目也将被删除', delItem);
    }
  }
  const add = (e)=>{
    const t = e.target['title'];
    if(t === 'classes') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'默认方剂类型', fClass:0, sysType: 'fj', isMenu: 1, type: 1 }});
    } else if(t === 'jb') {
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'新的方剂', fClass:1, sysType: 'fj', isMenu: 0, type: 2, cf:[], gytj:'', cd: '' }});
    }
  }
  const handleChange = (value)=>{
    const data = systemMannger.lsitData.filter(_=>_.id === value);
    if(data.length > 0){
      dispatch({type:'systemMannger/changeItemData', itemData: data[0]});
    }
  }
  const delItemMid = (name) => {
    let t =  Object.assign({}, systemMannger.itemData);
    let cf = t.cf.slice(0);
    cf.some((it, i) => {
      if(it.name === name) {
        cf.splice(i, 1);
      }
    })
    t.cf = cf;
    dispatch({type:'systemMannger/changeItemData', itemData: t});
  };
  const addMid = () =>{
    const data = {
      name: '',
      yl: '',
      zy: '',
      yf: '',
    }
    let t = systemMannger.itemData;
    if(t === ''){
      return false
    }
    t.cf.push(data);
    dispatch({type:'systemMannger/changeItemData', itemData: t});
  };
  const changeCf = (index, v, type) => {
    if(type === 'name') {
      systemMannger.itemData.cf[index].name = v;
    }
    if(type === 'yl') {
      systemMannger.itemData.cf[index].yl = v.target.value;
    }
    if(type === 'yf') {
      systemMannger.itemData.cf[index].yf = v;
    }
    if(type === 'zy') {
      systemMannger.itemData.cf[index].zy = v;
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData});
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
      <Button onClick={add} title='jb'>添加方剂</Button>
      <Button onClick={del}>删除当前方剂</Button>
      <Divider />
      <Row gutter={16}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>名称：<span className={styles.redPoint}>*</span></div>
          <Input disabled={systemMannger.itemData.isMenu===1?true:false} value={systemMannger.itemData.name} title='name' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>类别：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue} disabled={systemMannger.itemData.isMenu===1?true:false}>
            <Option key={99991} value={1}>默认方剂类型</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16} hidden={systemMannger.itemData.fClass===0?true:false}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>给药途径：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.gytj} style={{ width: '100%' }}  title='gytj' onFocus={()=>selectDataByCd('gytj')} onChange={(data)=>changeValue2(data, 'gytj')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>朝代：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.cd} style={{ width: '100%' }}  title='cd' onFocus={()=>selectDataByCd('cdd')} onChange={(data)=>changeValue2(data, 'cd')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>剂型：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.jx} style={{ width: '100%' }}  title='jx' onFocus={()=>selectDataByCd('jxgl')} onChange={(data)=>changeValue2(data, 'jx')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>处方医师：</div>
          <Input rows={3} value={systemMannger.itemData.cfys}title='cfys' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>处方来源：</div>
          <Input rows={3} value={systemMannger.itemData.cfly}title='cfly' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>煎服方法：</div>
          <Input rows={3} value={systemMannger.itemData.jfff}title='jfff' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>中医疾病：</div>
          <Select mode="multiple"  value={systemMannger.itemData.zyjb} style={{ width: '100%' }}  title='zyjb' onFocus={()=>selectData('cdm')} onChange={(data)=>changeValue2(data, 'zyjb')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>西医疾病：</div>
          <Select mode="multiple"  value={systemMannger.itemData.xyjb} style={{ width: '100%' }}  title='xyjb' onFocus={()=>selectData('wdm')} onChange={(data)=>changeValue2(data, 'xyjb')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>适宜证候：</div>
          <Select mode="multiple"  value={systemMannger.itemData.syzh} style={{ width: '100%' }}  title='syzh' onFocus={()=>selectData('zh')} onChange={(data)=>changeValue2(data, 'syzh')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>方剂功效：</div>
          <Select mode="multiple"  value={systemMannger.itemData.fjgx} style={{ width: '100%' }}  title='fjgx' onFocus={()=>selectData('gxlx')} onChange={(data)=>changeValue2(data, 'fjgx')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>方剂主治：</div>
          <Select mode="multiple"  value={systemMannger.itemData.fjzz} style={{ width: '100%' }}  title='fjzz' onFocus={()=>selectData('fjzz')} onChange={(data)=>changeValue2(data, 'fjzz')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>中医症状：</div>
          <Select mode="multiple"  value={systemMannger.itemData.zyzz} style={{ width: '100%' }}  title='zyzz' onFocus={()=>selectData('zz')} onChange={(data)=>changeValue2(data, 'zyzz')} getPopupContainer={() => document.getElementById('area')}>
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
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>备注：</div>
          <TextArea rows={3} value={systemMannger.itemData.bz} title='bz' onChange={changeValue} />
        </Col>
        <Divider orientation="left">处方明细</Divider>
        <Col span={24} style={{margin: '6px 0'}}>
          <Col span={6} style={{marginTop: '10px'}}>中药名</Col>
          <Col span={6} style={{marginTop: '10px'}}>用量</Col>
          <Col span={6} style={{marginTop: '10px'}}>作用</Col>
          <Col span={6} style={{marginTop: '10px'}}>用法</Col>
        {
          systemMannger.itemData.cf!==undefined?systemMannger.itemData.cf.map((it, i) => {
            return (
              <Col span={24} style={{margin: '6px 0'}} key={i}>
                <Col span={6}>
                  <Select style={{ width: 150 }} showSearch className='midName' value={it.name}  onFocus={()=>selectData('zy')} onSelect={(value)=>changeCf(i,value, 'name')} >
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
                <Col span={6}>
                  <Input placeholder="用量" style={{width: 60}} value={it.yl} className='midNum'
                         onChange ={(value)=>changeCf(i, value, 'yl')}/> g
                </Col>
                <Col span={6}>
                  <Select style={{ width: 100 }} className='midOption' value={it.zy} onFocus={()=>selectDataByCd('zyzz')}  onSelect={(value)=>changeCf(i,value, 'zy')} >
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
                <Col span={4}>
                  <Select style={{ width: 100 }} value={it.yf} className='midType' onFocus={()=>selectDataByCd('zyyf')} onSelect={(value)=>changeCf(i,value, 'yf')}>
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
                <Col span={2}>
                  <Icon type="minus-circle" style={{color: 'red', cursor: 'pointer'}} onClick={()=>delItemMid(it.name)}/>
                </Col>
              </Col>
            )
          }):''
        }
        </Col>
        <Col xl={12} xxl={8}>
          <Button type="primary" icon="plus-circle" style={{width: '100%', margin: '10px'}} onClick={addMid}>加添药材</Button>
        </Col>
      </Row>
      <Button type='primary' onClick={save}  hidden={systemMannger.itemData.isMenu===1?true:false}>保存</Button>
    </div>
  )
}
fj.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(fj);

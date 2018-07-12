import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, message, Input, Button, Divider, Select, Icon } from 'antd';
import styles from '../index.css';
import info from "../../InformationCollection/$id/compontent/diagnosisAndtreatment";

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
  const classes = systemMannger.lsitData.filter(_=>_.type < 2);
  const changeValue = (data) => {
    if(systemMannger.itemData !== '' && typeof data === "object") {
      systemMannger.itemData[data.target['title']] = data.target.value;
    } else if(typeof data === "number") {
      systemMannger.itemData.fClass = data;
    }
    dispatch({type:'systemMannger/changeItemData', itemData:systemMannger.itemData});
  }
  const changeValue2 = (e) => {
    systemMannger.itemData[e.target.attributes.title.value] = e.target.value;
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
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue}>
            <Option key={99991} value={1}>默认方剂类型</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16} hidden={systemMannger.itemData.fClass===0?true:false}>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>给药途径：<span className={styles.redPoint}>*</span></div>
          <select value={systemMannger.itemData.gytj} style={selectStyle}  title='gytj' onChange={changeValue2}>
            <option key={1} value='外用'>外用</option>
            <option key={2} value='内服'>内服</option>
          </select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>朝代：<span className={styles.redPoint}>*</span></div>
          <select value={systemMannger.itemData.cd} style={selectStyle} title='cd' onChange={changeValue2}>
            <option key={1} value='清'>清</option>
            <option key={2} value='明'>明</option>
            <option key={3} value='元'>元</option>
            <option key={4} value='宋'>宋</option>
            <option key={8} value='五代十国'>五代十国</option>
            <option key={5} value='唐'>唐</option>
            <option key={6} value='隋'>隋</option>
            <option key={7} value='南北'>南北</option>
            <option key={9} value='晋'>晋</option>
            <option key={10} value='三国'>三国</option>
            <option key={11} value='汉'>汉</option>
            <option key={12} value='秦'>秦</option>
            <option key={16} value='春秋战国'>春秋战国</option>
            <option key={13} value='周'>周</option>
            <option key={14} value='商'>商</option>
            <option key={15} value='夏'>夏</option>
          </select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>剂型：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.jx} style={{ width: '100%' }}  title='jx' onChange={changeValue}>
            <Option key={1} value='丸剂'>丸剂</Option>
            <Option key={2} value='药膏'>药膏</Option>
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
          <TextArea rows={3} value={systemMannger.itemData.zyjb} title='zyjb' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>西医疾病：</div>
          <TextArea rows={3} value={systemMannger.itemData.xyjb}title='xyjb' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>适宜证候：</div>
          <TextArea rows={3} value={systemMannger.itemData.syzh} title='syzh' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>方剂功效：</div>
          <TextArea rows={3} value={systemMannger.itemData.fjgx} title='fjgx' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>方剂主治：</div>
          <TextArea rows={3} value={systemMannger.itemData.fjzz} title='fjzz' onChange={changeValue} />
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>中医症状：</div>
          <TextArea rows={3} value={systemMannger.itemData.zyzz} title='zyzz' onChange={changeValue} />
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
                  <Select style={{ width: 150 }} showSearch className='midName' value={it.name} onSelect={(value)=>changeCf(i,value, 'name')} >
                    <Option value="丹参">丹参</Option>
                    <Option value="西红花">西红花</Option>
                    <Option value="玉米须">玉米须</Option>
                    <Option value="木棉花">木棉花</Option>
                    <Option value="合欢花">合欢花</Option>
                    <Option value="木槿花">木槿花</Option>
                    <Option value="盘龙参">盘龙参</Option>
                    <Option value="颠茄草">颠茄草</Option>
                    <Option value="醉鱼草">醉鱼草</Option>
                    <Option value="蒲公英">蒲公英</Option>
                    <Option value="蔊菜">蔊菜</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Input placeholder="用量" style={{width: 60}} value={it.yl} className='midNum'
                         onChange ={(value)=>changeCf(i, value, 'yl')}/> g
                </Col>
                <Col span={6}>
                  <Select style={{ width: 100 }} className='midOption' value={it.zy}  onSelect={(value)=>changeCf(i,value, 'zy')} >
                    <Option value="君">君</Option>
                    <Option value="臣">臣</Option>
                    <Option value="佐">佐</Option>
                    <Option value="使">使</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select style={{ width: 100 }} value={it.yf} className='midType' onSelect={(value)=>changeCf(i,value, 'yf')}>
                    <Option value="先煎">先煎</Option>
                    <Option value="后下">后下</Option>
                    <Option value="包煎">包煎</Option>
                    <Option value="捣碎">捣碎</Option>
                    <Option value="烊化">烊化</Option>
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

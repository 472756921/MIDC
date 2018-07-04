import React from 'react';
import { connect } from 'dva';
import Confirm from '../../../components/Confirm';
import PropTypes from 'prop-types';
import { Row, Col, message, Input, Button, Divider, Select, Icon } from 'antd';
import styles from '../index.css';
import info from "../../InformationCollection/$id/compontent/diagnosisAndtreatment";

const { TextArea } = Input;
const Option = Select.Option;
// cdm
const fj = ({systemMannger, dispatch})=>{
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
      dispatch({type:'systemMannger/changeItemData', itemData:{name:'新的方剂',sysType: 'fj', isMenu: 0, type: 2 }});
    }
  }

  const handleChange = (value)=>{
    const data = systemMannger.lsitData.filter(_=>_.id === value);
    if(data.length > 0){
      dispatch({type:'systemMannger/changeItemData', itemData: data[0]});
    }
  }

  const delItemMid = (name) => {
    systemMannger.itemData.cf.map((it, index) => {
      if(it.name === name ) {
        systemMannger.itemData.cf.splice(index, 1);
      }
      return ''
    })
    dispatch({type:'systemMannger/changeItemData', itemData: systemMannger.itemData});
  };

  const addMid = () =>{
    const data = {
      name: '',
      yl: '',
      zy: '',
      yf: '',
    }
    let t = systemMannger.itemData;
    t.cf.push(data);
    console.log(t.cf);
    dispatch({type:'systemMannger/changeItemData', itemData: t});
  };

  const changeCf = (data, e) => {
    console.log(data, e);
    // let t = systemMannger.itemData;
    // dispatch({type:'systemMannger/changeItemData', itemData: t});
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
          <Select value={systemMannger.itemData.fClass} style={{ width: '100%' }}  title='fClass' onChange={changeValue} disabled={systemMannger.itemData.fClass===0?true:false}>
            <Option key={99991} value={0}  disabled={systemMannger.itemData.fClass!==0?true:false}>中医方剂类型</Option>
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
          <div>给药途径：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.gytj} style={{ width: '100%' }}  title='gytj' onChange={changeValue}>
            <Option key={1} value='外用'>外用</Option>
            <Option key={2} value='内服'>内服</Option>
          </Select>
        </Col>
        <Col xl={12} xxl={8} style={{marginBottom: '10px'}}>
          <div>朝代：<span className={styles.redPoint}>*</span></div>
          <Select value={systemMannger.itemData.cd} style={{ width: '100%' }}  title='fClass' onChange={changeValue}>
            <Option key={1} value='清'>清</Option>
            <Option key={2} value='明'>明</Option>
            <Option key={3} value='元'>元</Option>
            <Option key={4} value='宋'>宋</Option>
            <Option key={8} value='五代十国'>五代十国</Option>
            <Option key={5} value='唐'>唐</Option>
            <Option key={6} value='隋'>隋</Option>
            <Option key={7} value='南北'>南北</Option>
            <Option key={9} value='晋'>晋</Option>
            <Option key={10} value='三国'>三国</Option>
            <Option key={11} value='汉'>汉</Option>
            <Option key={12} value='秦'>秦</Option>
            <Option key={16} value='春秋战国'>春秋战国</Option>
            <Option key={13} value='周'>周</Option>
            <Option key={14} value='商'>商</Option>
            <Option key={15} value='夏'>夏</Option>
          </Select>
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
                  <Select style={{ width: 150 }} showSearch className='midName' value={it.name} onChange={changeCf} >
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
                <Col span={6}><Input placeholder="用量" style={{width: 50}} value={it.yl} className='midNum' onChange={changeCf} /> g</Col>
                <Col span={6}>
                  <Select defaultValue="君" style={{ width: 100 }} className='midOption' value={it.zy} onChange={changeCf} >
                    <Option value="君">君</Option>
                    <Option value="臣">臣</Option>
                    <Option value="佐">佐</Option>
                    <Option value="使">使</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select defaultValue="先煎" style={{ width: 100 }} value={it.yf} className='midType' onChange={changeCf} >
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

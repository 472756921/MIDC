import { connect } from 'dva'
import { Button, Row, Col, Tree, Divider } from 'antd'
import CDM from './components/cdm';
import WDM from './components/wdm';
import ZH from './components/zh';
import SZ from './components/sz';
import YP from './components/yp';
import ZY from './components/zy';
import ZZZF from './components/zzzf';
import MZ from './components/mz';
import GXLX from './components/gxlx';
import FJZZ from './components/fjzz';
import ZZ from './components/zz';
import styles from './index.css'
import PropTypes from 'prop-types'

const TreeNode = Tree.TreeNode;

const index = ({loading, systemMannger, dispatch}) => {

  let showInner = '', tree = '';

  const onSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys);
    if(selectedKeys.length === 0) {
      return
    }
    let Sdata = systemMannger.lsitData.filter(it=>Number(it.id) === Number(selectedKeys[0]))
    dispatch({type:'systemMannger/changeItemData', itemData:Sdata[0], cltype: info.selectedNodes[0].props.cltype, isMenu: info.selectedNodes[0].props.isMenu})
  }

  function createTree(data, fClass){
    let td = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].fClass === fClass){
        td.push(<TreeNode title={data[i].name} key={data[i].id} cltype={data[i].type} isMenu={data[i].isMenu}>
          {createTree(data, data[i].id)}
        </TreeNode>);
      }
    }
    return td;
  }
  if(systemMannger !== '') {
    tree = createTree(systemMannger.lsitData, 0);
  }

  const changeType = (e)=>{
    dispatch({type:'systemMannger/getData', payload: {type: e.target['title']}})
  }

  switch (systemMannger.nowType){
    case 'cdm':
      showInner = <CDM/>
      break;
    case 'wdm':
      showInner = <WDM/>
      break;
    case 'zh':
      showInner = <ZH/>
      break;
    case 'sz':
      showInner = <SZ/>
      break;
    case 'yp':
      showInner = <YP/>
      break;
    case 'zy':
      showInner = <ZY/>
      break;
    case 'zzzf':
      showInner = <ZZZF/>
      break;
    case 'mz':
      showInner = <MZ/>
      break;
    case 'gxlx':
      showInner = <GXLX/>
      break;
    case 'fjzz':
      showInner = <FJZZ/>
      break;
    case 'zz':
      showInner = <ZZ/>
      break;
    default:
      showInner = <CDM/>
      break;
  }

  return(
    <div>
      <div className={styles.navBtns}>
        <Button type={systemMannger.nowType==='cdm'?'primary':''} title='cdm' onClick={changeType}>中医疾病管理</Button>
        <Button type={systemMannger.nowType==='wdm'?'primary':''} title='wdm' onClick={changeType}>西医疾病管理</Button>
        <Button type={systemMannger.nowType==='zh'?'primary':''} title='zh' onClick={changeType}>证候管理</Button>
        <Button type={systemMannger.nowType==='sz'?'primary':''} title='sz' onClick={changeType}>舌诊管理</Button>
        <Button type={systemMannger.nowType==='yp'?'primary':''} title='yp' onClick={changeType}>饮片管理</Button>
        <Button type={systemMannger.nowType==='zy'?'primary':''} title='zy' onClick={changeType}>中药管理</Button>
        <Button type={systemMannger.nowType==='zzzf'?'primary':''} title='zzzf' onClick={changeType}>治则治法管理</Button>
        <Button type={systemMannger.nowType==='mz'?'primary':''} title='mz' onClick={changeType}>脉诊管理</Button>
        <Button type={systemMannger.nowType==='gxlx'?'primary':''} title='gxlx' onClick={changeType}>功效类型管理</Button>
        <Button>方剂管理</Button>
        <Button type={systemMannger.nowType==='fjzz'?'primary':''} title='fjzz' onClick={changeType}>方剂主治管理</Button>
        <Button type={systemMannger.nowType==='zz'?'primary':''} title='zz' onClick={changeType}>症状管理</Button>
        <Button type="dashed">成分管理</Button>
        <Button type="dashed">医案管理</Button>
        <Button type="dashed">病人管理</Button>
        <Button type="dashed">词典管理</Button>
      </div>
      <Divider />
      <Row gutter={16}>
        <Col className="gutter-row" xl={5} xxl={3}>
          <Tree onSelect={onSelect}>{tree}</Tree>
        </Col>
        <Col xl={19} xxl={21}>
          {showInner}
        </Col>
      </Row>
      <div>
      </div>
    </div>
  )
}

index.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({ loading, systemMannger }) => ({ loading, systemMannger }))(index)

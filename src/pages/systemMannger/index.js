import { connect } from 'dva'
import { Button, Row, Col, Tree, Divider } from 'antd'
import CDM from './components/cdm';
import styles from './index.css'
import PropTypes from 'prop-types'

const TreeNode = Tree.TreeNode;

const index = ({loading, systemMannger, dispatch}) => {

  let showInner = '', tree = '';

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys);
    dispatch({type:'systemMannger/changeItemData', itemData:2222})
  }


  function createTree(data, fClass){
    let td = [];
    for(let i=0; i<data.length; i++) {
      if(data[i].fClass == fClass){
        td.push(<TreeNode title={data[i].name} key={data[i].id}>
          {createTree(data, data[i].id)}
        </TreeNode>);
      }
    }
    return td;
  }
  if(systemMannger != '') {
    tree = createTree(systemMannger.lsitData, 0);
  }

  switch (systemMannger.nowType){
    case 'cdm':
      showInner = <CDM/>
      break;
  }

  return(
    <div>
      <div className={styles.navBtns}>
        <Button type="primary">中医疾病管理</Button>
        <Button>西医疾病管理</Button>
        <Button>证候管理</Button>
        <Button>舌诊管理</Button>
        <Button>饮片管理</Button>
        <Button>中药管理</Button>
        <Button>治则治法管理</Button>
        <Button>脉诊管理</Button>
        <Button>功效类型管理</Button>
        <Button>方剂管理</Button>
        <Button>方剂主治管理</Button>
        <Button>症状管理</Button>
        <Button type="dashed">成分管理</Button>
        <Button type="dashed">医案管理</Button>
        <Button type="dashed">病人管理</Button>
        <Button type="dashed">词典管理</Button>
      </div>
      <Divider />
      <div>
        <Button>添加</Button>
      </div>
      <Row gutter={16}>
        <Col className="gutter-row" span={5}>
          <Tree onSelect={onSelect}>{tree}</Tree>
        </Col>
        <Col span={19}>
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

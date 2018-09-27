import { connect } from 'dva';
import { Button, Row, Col, Tree, Divider, Tabs } from 'antd';
import PropTypes from 'prop-types';
import Mic from './components/mic';
import Fj from './components/fj';
import Ya from './components/ya';

const TabPane = Tabs.TabPane;

const index =  ({loading, knowledge, dispatch}) => {
  const changePage = () => {
    dispatch({type:'knowledge/tableListClear'})
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={changePage}>
        <TabPane tab="中药查询" key="1"><Mic/></TabPane>
        <TabPane tab="方剂查询" key="2"><Fj/></TabPane>
        <TabPane tab="医案查询" key="3"><Ya/></TabPane>
      </Tabs>
    </div>
  )
}

index.propTypes = {
  loading: PropTypes.object,
  dataMannger: PropTypes.object,
}

export default connect(({ loading, knowledge }) => ({ loading, knowledge }))(index)

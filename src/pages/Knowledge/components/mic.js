import { connect } from 'dva';
import { Table, Button, Row, Col, Input, Divider, Select, Modal } from 'antd';
import PropTypes from 'prop-types';
import styles from '../index.css';
const Option = Select.Option;

const dataSource = [
  {
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];
const columns = [
  {
    title: '药材名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '功能主治',
    dataIndex: 'gnzz',
    key: 'gnzz',
  }, {
    title: '性味归经',
    dataIndex: 'xwgj',
    key: 'xwgj',
  }, {
    title: '用法用量',
    dataIndex: 'yfyl',
    key: 'yfyl',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.details} onClick={()=>details(text)}>详情</span>
      </span>
    ),
  }
];
let dis = '';
const details = (data) => {
  dis({type:'knowledge/changeVisibleA', payload: {visible: true}})
}

const mic = ({loading, knowledge, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type:'knowledge/changeVisibleA', payload: {visible: false}})
  }

  const handleCancel = (e) => {
    dispatch({type:'knowledge/changeVisibleA', payload: {visible: false}})
  }

  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>中药名称：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>性味归经：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>基源：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>功能主治：<Input style={{width:'200px'}}/></Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>药材类别：
          <Select
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>性状：<Input style={{width:'200px'}}/></Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary'>查询</Button>
      <br/>
      <Divider/>
      <Table dataSource={dataSource} columns={columns} />

      <Modal title="详情" visible={knowledge.visibleA} onOk={handleOk} onCancel={handleCancel}>
        <div>中文名：</div>
        <div>药材类别：</div>
        <div>英文名称：</div>
        <div>拉丁名称：</div>
        <div>别名：</div>
        <div>基源：</div>
        <div>功能主治：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>性味归经：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>性状：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>来源：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>药用部位：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>用法用量：</div>
        <div className={styles.detail}>XXXXX</div>
      </Modal>
    </div>
  )
}

mic.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ loading, knowledge }) => ({ loading, knowledge }))(mic)

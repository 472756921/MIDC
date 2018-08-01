import { connect } from 'dva';
import { Table, Button, Row, Col, Input, Divider, Select, Modal } from 'antd';
import PropTypes from 'prop-types';
import styles from '../index.css';
const Option = Select.Option;

const columns = [
  {
    title: '药材名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '功能主治',
    dataIndex: 'glzz',
    key: 'glzz',
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
  dis({type:'knowledge/changeVisibleA', payload: {visible: true}});
  dis({type:'knowledge/setTempData', payload: {data: data}});
}

const mic = ({loading, knowledge, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type:'knowledge/changeVisibleA', payload: {visible: false}});
  }

  const handleCancel = (e) => {
    dispatch({type:'knowledge/changeVisibleA', payload: {visible: false}});
  }
  const reset = (e) => {
    dispatch({type:'knowledge/reset', payload: {searchV: {}, tableList: []}});
  }
  const changeSeV = (data) => {
    let searchV = knowledge.searchV;
    searchV[data.target.title] = data.target.value;
    dispatch({type:'knowledge/setSearchV', payload: {searchV: searchV}});
  }
  const changeSeVInSel = (data) => {
    let searchV = knowledge.searchV;
    searchV.gxlx = data;
    dispatch({type:'knowledge/setSearchV', payload: {searchV: searchV}});
  }
  const selectData = (data) => {
    dispatch({type:'knowledge/selectData', payload: {type: data}});
  }
  const searchData = () => {
    dispatch({type:'knowledge/searchData', payload: {type:'zy'}});
  }

  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中药名称：
          <Input style={{width:'200px'}} title='name' value={knowledge.searchV.name} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          性味归经：
          <Input style={{width:'200px'}} value={knowledge.searchV.xwgj} onChange={changeSeV} title='xwgj'/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          基源：
          <Input style={{width:'200px'}} value={knowledge.searchV.jy} onChange={changeSeV} title='jy'/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          功能主治：
          <Input style={{width:'200px'}} value={knowledge.searchV.glzz} onChange={changeSeV} title='glzz'/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>药材类别：
          <Select
            value={knowledge.searchV.gxlx}
            showSearch
            style={{ width: 200 }}
            onFocus={()=>selectData('gxlx')}
            onChange={changeSeVInSel}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              knowledge.selectData.map((it, i) => {
                if(!it.isMenu)
                return <Option key={i} value={it.name}>{it.name}</Option>
              })

            }
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          性状：
          <Input style={{width:'200px'}} value={knowledge.searchV.xz} onChange={changeSeV} title='xz'/>
        </Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}} onClick={reset}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary' onClick={searchData}>查询</Button>
      <br/>
      <Divider/>
      <Table dataSource={knowledge.tableList} columns={columns}/>

      <Modal title="详情" visible={knowledge.visibleA} onOk={handleOk} onCancel={handleCancel}>
        <div>中文名：&emsp;{knowledge.temp.name}</div>
        <div>药材类别：{knowledge.temp.gxlx}</div>
        <div>英文名称：{knowledge.temp.ename}</div>
        <div>拉丁名称：{knowledge.temp.lname}</div>
        <div>别名：&emsp;&emsp;{knowledge.temp.bname}</div>
        <div>基源：&emsp;&emsp;{knowledge.temp.jy}</div>
        <div>功能主治：</div>
        <div className={styles.detail}>{knowledge.temp.glzz}</div>
        <div>性味归经：</div>
        <div className={styles.detail}>{knowledge.temp.xwgj}</div>
        <div>性状：</div>
        <div className={styles.detail}>{knowledge.temp.xz}</div>
        <div>来源：</div>
        <div className={styles.detail}>{knowledge.temp.ly}</div>
        <div>药用部位：</div>
        <div className={styles.detail}>{knowledge.temp.yybw}</div>
        <div>用法用量：</div>
        <div className={styles.detail}>{knowledge.temp.yfyl}</div>
      </Modal>
    </div>
  )
}

mic.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ loading, knowledge }) => ({ loading, knowledge }))(mic)

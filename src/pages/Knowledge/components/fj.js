import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
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
    title: '方剂名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '主治疾病',
    dataIndex: 'zzjb',
    key: 'zzjb',
  }, {
    title: '适宜症候',
    dataIndex: 'syzh',
    key: 'syzh',
  }, {
    title: '方剂组成',
    dataIndex: 'fjzc',
    key: 'fjzc',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.details} onClick={() => details(text)}>详情</span>
      </span>
    ),
  }
];
let dis = '';
const details = (data) => {
  dis({type: 'knowledge/changeVisibleB', payload: {visible: true}})
}

const fj = ({loading, knowledge, dispatch}) => {
  dis = dispatch;
  const handleOk = (e) => {
    dispatch({type: 'knowledge/changeVisibleB', payload: {visible: false}})
  }

  const handleCancel = (e) => {
    dispatch({type: 'knowledge/changeVisibleB', payload: {visible: false}})
  }

  const reset = (e) => {
    dispatch({type: 'knowledge/reset', payload: {searchV: {}, tableList: []}});
  }
  const changeSeV = (data) => {
    let searchV = knowledge.searchV;
    searchV[data.target.title] = data.target.value;
    dispatch({type: 'knowledge/setSearchV', payload: {searchV: searchV}});
  }
  const changeSeVInSel = (data, type) => {
    let searchV = knowledge.searchV;
    searchV[type] = data;
    dispatch({type: 'knowledge/setSearchV', payload: {searchV: searchV}});
  }
  const selectData = (data) => {
    dispatch({type: 'knowledge/selectData', payload: {type: data}});
  }
  const selectDataByCd = (data) => {
    dispatch({type: 'knowledge/selectDataByCd', payload: {sysType: data}});
  }
  const searchData = () => {
    dispatch({type: 'knowledge/searchData', payload: {type: 'fj'}});
  }

  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          方剂名称：<Input style={{width: '200px'}} title='name' value={knowledge.searchV.name} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方来源：<Input style={{width: '200px'}} title='ly' value={knowledge.searchV.ly} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方医师：<Input style={{width: '200px'}} title='cfys' value={knowledge.searchV.cfys} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          指定中药：<Input style={{width: '200px'}} title='zdzy' value={knowledge.searchV.zdzy} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医疾病：<Input style={{width: '200px'}} title='zyjb' value={knowledge.searchV.zyjb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          西医疾病：<Input style={{width: '200px'}} title='xyjb' value={knowledge.searchV.xjyb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医证候：<Input style={{width: '200px'}} title='zyzh' value={knowledge.searchV.zyzh} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          方剂主治：<Input style={{width: '200px'}} title='fjzz' value={knowledge.searchV.fjzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医症状：<Input style={{width: '200px'}} title='zyzz' value={knowledge.searchV.zyzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂类别：
          <Select
            showSearch
            value={knowledge.searchV.fjlb}
            onFocus={()=>selectDataByCd('fj')}
            onChange={(data) => {changeSeVInSel(data, 'fjlb')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              knowledge.selectData.map((it, i) => {
                return <Option key={i} value={it.name}>{it.name}</Option>
              })
            }
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>给药途径：
          <Select
            showSearch
            value={knowledge.searchV.gytj}
            onFocus={()=>selectDataByCd('gytj')}
            onChange={(data) => {changeSeVInSel(data, 'gytj')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              knowledge.selectData.map((it, i) => {
                return <Option key={i} value={it.name}>{it.name}</Option>
              })
            }
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>来源医案：
          <Select
            showSearch
            value={knowledge.searchV.lyya}
            onChange={(data) => {changeSeVInSel(data, 'lyya')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">是</Option>
            <Option value="0">否</Option>
          </Select>
        </Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}} onClick={reset}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary' onClick={searchData}>查询</Button>
      <br/>
      <Divider/>
      <Table dataSource={knowledge.tableList} columns={columns}/>

      <Modal title="详情" visible={knowledge.visibleB} onOk={handleOk} onCancel={handleCancel}>
        <div>处方名称：</div>
        <div>处方类型：</div>
        <div>剂型：</div>
        <div>给药途径：</div>
        <div>朝代：</div>
        <div>处方医师：</div>
        <div>处方来源：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>煎服方法：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂主治：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂功效：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>适宜证候：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>方剂组成：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>中医疾病：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>西医疾病：</div>
        <div className={styles.detail}>XXXXX</div>
        <div>备注：</div>
        <div className={styles.detail}>XXXXX</div>
      </Modal>
    </div>
  )
}

fj.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({loading, knowledge}) => ({loading, knowledge}))(fj)

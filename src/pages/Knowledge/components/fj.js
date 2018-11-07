import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
import PropTypes from 'prop-types';
import styles from '../index.css';

const Option = Select.Option;

const columns = [
  {
    title: '方剂名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '主治疾病',
    dataIndex: 'fjzz',
    key: 'fjzz',
  }, {
    title: '适宜症候',
    dataIndex: 'syzh',
    key: 'syzh',
  }, {
    title: '中医疾病',
    dataIndex: 'zyjb',
    key: 'zyjb',
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
let mod = '';
const details = (data) => {
  mod = data;
  dis({type: 'knowledge/getCF', payload: {mid:data.mid, status: data.status}});
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
    dispatch({type: 'knowledge/reset', payload: {searchV3: { lyya: "", cfName: "", cfly: "", cfys: "", fjgx: "", fjzz: "", gytj: "", name: "", zyzh: "", zyzz: "", xyjb: "", zyjb: ""}, tableList: []}});
  }
  const changeSeV = (data) => {
    let searchV = knowledge.searchV3;
    searchV[data.target.title] = data.target.value;
    console.log(searchV);
    dispatch({type: 'knowledge/setSearchV', payload: {searchV3: searchV}});
  }
  const changeSeVInSel = (data, type) => {
    let searchV = knowledge.searchV3;
    searchV[type] = data;
    dispatch({type: 'knowledge/setSearchV', payload: {searchV3: searchV}});
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
          方剂名称：<Input style={{width: '200px'}} title='name' value={knowledge.searchV3.name} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方来源：<Input style={{width: '200px'}} title='ly' value={knowledge.searchV3.ly} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方医师：<Input style={{width: '200px'}} title='cfys' value={knowledge.searchV3.cfys} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          指定中药：<Input style={{width: '200px'}} title='zdzy' value={knowledge.searchV3.zdzy} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医疾病：<Input style={{width: '200px'}} title='zyjb' value={knowledge.searchV3.zyjb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          西医疾病：<Input style={{width: '200px'}} title='xyjb' value={knowledge.searchV3.xyjb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医证候：<Input style={{width: '200px'}} title='zyzh' value={knowledge.searchV3.zyzh} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          方剂主治：<Input style={{width: '200px'}} title='fjzz' value={knowledge.searchV3.fjzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医症状：<Input style={{width: '200px'}} title='zyzz' value={knowledge.searchV3.zyzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂类别：
          <Select
            showSearch
            value={knowledge.searchV3.fjlb}
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
            value={knowledge.searchV3.gytj}
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
            value={knowledge.searchV3.lyya}
            onChange={(data) => {changeSeVInSel(data, 'lyya')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">是</Option>
            <Option value="0">否</Option>
            <Option value="">全部</Option>
          </Select>
        </Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}} onClick={reset}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary' onClick={searchData}>查询</Button>
      <br/>
      <Divider/>
      <Table rowKey={record => record.id} dataSource={knowledge.tableList} columns={columns} rowKey="id"/>

      {knowledge.visibleB?
        <Modal title="详情" visible={knowledge.visibleB} onOk={handleOk} onCancel={handleCancel}>
          <div>处方名称：{mod.name} </div>
          <div>处方类型：{mod.fjlx}</div>
          <div>剂型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mod.jx}</div>
          <div>给药途径：{mod.gytj}</div>
          <div>朝代：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mod.cd}</div>
          <div>处方医师：{mod.cfys}</div>
          <div>处方来源：{mod.fjly}</div>
          <div>煎服方法：</div>
          <div className={styles.detail}>{mod.jfff}</div>
          <div>方剂主治：</div>
          <div className={styles.detail}>{mod.fjzz}</div>
          <div>方剂功效：</div>
          <div className={styles.detail}>{mod.fjgx}</div>
          <div>适宜证候：</div>
          <div className={styles.detail}>{mod.syzh}</div>
          <div>方剂组成：</div>
          <div className={styles.detail}>
            {knowledge.cfData.map((it, i) =>(<div>{it.name} - {it.liang}g - {it.zhuyong} - {it.yongfa}</div>))}
          </div>
          <div>中医疾病：</div>
          <div className={styles.detail}>{mod.zyjb}</div>
          <div>西医疾病：</div>
          <div className={styles.detail}>{mod.xyjb}</div>
          <div>备注：</div>
          <div className={styles.detail}>{mod.bz}</div>
        </Modal>
        :''}
    </div>
  )
}

fj.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({loading, knowledge}) => ({loading, knowledge}))(fj)

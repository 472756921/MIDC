import {connect} from 'dva';
import {Table, Button, Row, Col, Input, Divider, Select, Modal} from 'antd';
import Chart_H from '../../components/Chart/Histogram';
import Chart_P from '../../components/Chart/Pie';
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
  }
];
let dis = '';

const fj = ({loading, report, dispatch}) => {

  dis = dispatch;
  const handleOk = (e) => {
    dis({type: 'report/changeVisibleA', payload: {visible: false}})
  }

  const handleCancel = (e) => {
    dis({type: 'report/changeVisibleA', payload: {visible: false}})
  }

  const reset = (e) => {
    dispatch({type: 'report/reset', payload: {searchV: {}, tableList: []}});
  }
  const changeSeV = (data) => {
    let searchV = report.searchV;
    searchV[data.target.title] = data.target.value;
    dispatch({type: 'report/setSearchV', payload: {searchV: searchV}});
  }
  const changeSeVInSel = (data, type) => {
    let searchV = report.searchV;
    searchV[type] = data;
    dispatch({type: 'report/setSearchV', payload: {searchV: searchV}});
  }
  const selectData = (data) => {
    dispatch({type: 'report/selectData', payload: {type: data}});
  }
  const selectDataByCd = (data) => {
    dispatch({type: 'report/selectDataByCd', payload: {sysType: data}});
  }
  const searchData = () => {
    dispatch({type: 'report/searchData', payload: {type: 'fj'}});
  }
  const showChat = (charType, type) => {
    dis({type: 'report/changeVisibleA', payload: {visible: true}})
    dis({type: 'report/setCharType', payload: {charType: charType, dataType: type}})
  }

  return (
    <div>
      <Row>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          方剂名称：<Input style={{width: '200px'}} title='name' value={report.searchV.name} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方来源：<Input style={{width: '200px'}} title='ly' value={report.searchV.ly} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          处方医师：<Input style={{width: '200px'}} title='cfys' value={report.searchV.cfys} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          指定中药：<Input style={{width: '200px'}} title='zdzy' value={report.searchV.zdzy} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医疾病：<Input style={{width: '200px'}} title='zyjb' value={report.searchV.zyjb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          西医疾病：<Input style={{width: '200px'}} title='xyjb' value={report.searchV.xjyb} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医证候：<Input style={{width: '200px'}} title='zyzh' value={report.searchV.zyzh} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          方剂主治：<Input style={{width: '200px'}} title='fjzz' value={report.searchV.fjzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>
          中医症状：<Input style={{width: '200px'}} title='zyzz' value={report.searchV.zyzz} onChange={changeSeV}/>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>方剂类别：
          <Select
            showSearch
            value={report.searchV.fjlb}
            onFocus={()=>selectDataByCd('fj')}
            onChange={(data) => {changeSeVInSel(data, 'fjlb')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              report.selectData.map((it, i) => {
                return <Option key={i} value={it.name}>{it.name}</Option>
              })
            }
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>给药途径：
          <Select
            showSearch
            value={report.searchV.gytj}
            onFocus={()=>selectDataByCd('gytj')}
            onChange={(data) => {changeSeVInSel(data, 'gytj')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              report.selectData.map((it, i) => {
                return <Option key={i} value={it.name}>{it.name}</Option>
              })
            }
          </Select>
        </Col>
        <Col xl={8} xxl={4} style={{marginBottom: '5px'}}>来源医案：
          <Select
            showSearch
            value={report.searchV.lyya}
            onChange={(data) => {changeSeVInSel(data, 'lyya')}}
            style={{width: 200}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">是</Option>
            <Option value="0">否</Option>
            <Option value="2">任意</Option>
          </Select>
        </Col>
      </Row>
      <Button style={{marginLeft: '2px', float: 'right', marginRight: '120px'}} onClick={reset}>重置</Button>
      <Button style={{marginLeft: '2px', float: 'right'}} type='primary' onClick={searchData}>查询</Button>
      <br/>
      <Divider/>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('h','zh')} disabled={report.tableList.length===0?true:false}>证候统计</Button>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('h','pc')} disabled={report.tableList.length===0?true:false}>药物频次</Button>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('h','gj')} disabled={report.tableList.length===0?true:false}>归经统计</Button>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('p','gl')} disabled={report.tableList.length===0?true:false}>归类统计</Button>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('p','sq')} disabled={report.tableList.length===0?true:false}>四气统计</Button>
      <Button style={{marginLeft: '6px'}} onClick={()=>showChat('p','ww')} disabled={report.tableList.length===0?true:false}>五味统计</Button>
      <br/>
      <br/>
      <Table dataSource={report.tableList} columns={columns}/>

      <Modal width={1000} title="详情" visible={report.visibleA} onOk={handleOk} onCancel={handleCancel}>
        {
          report.visibleA?
          report.charType === 'h'?<Chart_H/>:<Chart_P/>:''
        }
      </Modal>
    </div>
  )
}

fj.propTypes = {
  Idetail: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({loading, report}) => ({loading, report}))(fj)

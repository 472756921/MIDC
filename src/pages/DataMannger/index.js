import { connect } from 'dva';
import { Button, Row, Col, Table, Divider, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.css';
import Confirm from "../../components/Confirm";

const index =  ({loading, dataMannger, dispatch}) => {
  const dataSource = [{
    key: '1',
    id: 1,
    name: '胡彦斌',
    keys: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    id: 2,
    name: '胡彦祖',
    keys: 42,
    address: '西湖区湖底公园1号'
  }
  ];
  const columns = [{
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '关键字',
    dataIndex: 'keys',
    key: 'keys',
  }, {
    title: '附件',
    dataIndex: 'files',
    key: 'files',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className={styles.href} onClick={showMore}>修改</span>
        <Divider type="vertical" />
        <span className={styles.href}>下载</span>
        <Divider type="vertical" />
        <span className={styles.del} onClick={()=>del(text)}>删除</span>
      </span>
    ),
  }];
  let delID = ''; //待删除ID

  const delItem = (id)=>{
    dispatch({type:'dataMannger/del', payload:{delID: delID}});
  }
  const del = (text)=>{
    delID = text.id;
    Confirm('确认删除','删除后将无法恢复 '+text.name, delItem);
  }
  const showMore = () => {
    dispatch({type:'dataMannger/visible', payload:{visible: true}});
  }
  const handleOk = () => {
    dispatch({type:'dataMannger/visible', payload:{visible: false}});
  }
  const handleCancel = () => {
    dispatch({type:'dataMannger/visible', payload:{visible: false}});
  }


  return (
    <div>
      <div>
        <Row gutter={6}>
          <Col span={4}><Input placeholder="输入标题" /></Col>
          <Col span={4}><Input placeholder="输入关键字" /></Col>
          <Col span={4}><Button type="primary">查询</Button></Col>
        </Row>
      </div>
      <br/>
      <br/>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="详情" visible={dataMannger.visible} onOk={handleOk} onCancel={handleCancel}>
        标题：<Input placeholder="输入标题" style={{width: '300px'}}/>
        <br/>
        <br/>
        关键字：<Input placeholder="输入关键字" style={{width: '285px'}}/>
      </Modal>
    </div>
  )
}

index.propTypes = {
  loading: PropTypes.object,
  dataMannger: PropTypes.object,
}

export default connect(({ loading, dataMannger }) => ({ loading, dataMannger }))(index)

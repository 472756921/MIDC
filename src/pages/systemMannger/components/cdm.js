import React from 'react';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd';
import styles from '../index.css'


const { TextArea } = Input;
let dis = '', _this = '';
class cdm extends React.Component{
  constructor(props){
    dis = props.dispatch;
    super(props);
    this.state={
      data: ''
    }
    console.log(props.systemMannger.itemData);
    _this = this;
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>疾病名称：<span className={styles.redPoint}>*</span></div>
            <Input placeholder="default size" defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>疾病类型：<span className={styles.redPoint}>*</span></div>
            <Input placeholder="default size" defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>疾病概况：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>疾病病因：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>临床表现：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>鉴别诊断：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>诊断要点：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>治疗原则：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>辨证要点：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>分型论治：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>历代医家论述：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>转归预后：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>关联证候：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>关联症状：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>相关西医疾病：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
          <Col span={12} style={{marginBottom: '10px'}}>
            <div>其它：</div>
            <TextArea rows={3} defaultValue={this.props.systemMannger.itemData}/>
          </Col>
        </Row>
      </div>
    )
  }
}
cdm.propTypes = {
  loading: PropTypes.object,
  systemMannger: PropTypes.object,
}

export default connect(({systemMannger}) => ({systemMannger}))(cdm);

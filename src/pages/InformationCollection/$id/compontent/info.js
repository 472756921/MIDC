import { Row, Col } from 'antd';

const info = ({info}) => {
  return(
    <Row gutter={16}>
      <Col span={4}>
        <div>姓名：{info.name}</div>
      </Col>
      <Col span={4}>
        <div>性别：{info.sex}</div>
      </Col>
      <Col span={4}>
        <div>年龄：{info.age}</div>
      </Col>
      <Col span={4}>
        <div>体重：{info.weight} KG</div>
      </Col>
      <Col span={4}>
        <div>婚况：{info.marriage}婚</div>
      </Col>
      <Col span={4}>
        <div>就诊次数：{info.visitTimes}次</div>
      </Col>
      <Col span={4}>
        <div>职业：{info.profession}</div>
      </Col>
      <Col span={4}>
        <div>国籍：{info.citizenship}</div>
      </Col>
      <Col span={4}>
        <div>民族：{info.ethnic}</div>
      </Col>
      <Col span={4}>
        <div>出生地：{info.birthplace}</div>
      </Col>
      <Col span={4}>
        <div>电话：{info.phone}</div>
      </Col>
      <Col span={4}>
        <div>住址：{info.address}</div>
      </Col>
      <Col span={4}>
        <div>邮编：{info.zipCode}</div>
      </Col>
    </Row>
  )
}


export default info;

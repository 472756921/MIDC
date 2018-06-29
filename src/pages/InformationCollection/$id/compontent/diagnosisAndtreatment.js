import { Row, Col, Divider } from 'antd';
import styles from './styles.css';

const info = ({info}) => {

  const m = {
    zdyzl:{
      name: '诊断与治法',
      zyjb: {name: '中医疾病'},
      xyjb: {name: '西医疾病'},
      zyzh: {name: '中医证候'},
      zzzf: {name: '治则治法'},
    },
    cf:{
      name: '处方',
      zycf: {
        name: '中药处方',
        zfm: {name: '处方名称'},
        type: {name: '处方类型'},
        number: {name: '处方剂数'},
        doctor: {name: '处方医师'},
        medicine: {name: '处方详情'},
      },
      orther: {
        name: '其他治疗',
        medicineC: {name: '中成药'},
        medicineW: {name: '西成药'},
        orther: {name: '其他'},
      },
    },
  };
  const d = Object.keys(info);
  const item = d.map((it, i)=>{
    if(it !== 'cf'){
      let fvalue = info[it];
      let t = (
        <Col span={24}>
          <Divider orientation="left" style={{fontSize:'18px', marginTop:'20px', color:'#1890ff'}}>{m[it].name}</Divider>
        </Col>
      )
      let c = Object.keys(info[it]).map((iit, ii) => {
        let Ntemp = m[it];
        return (
          <Col span={24} key={i*10 + ii}>
            <Divider dashed orientation="left" style={{fontSize:'16px', color:'#265fa9'}}>{Ntemp[iit].name}</Divider>
            <div className={styles.text}>{fvalue[iit]}</div>
          </Col>
        )
      })
      return (
        <Row gutter={16} key={i}>
          {t}
          {c}
        </Row>
      )
    } else {
      return ''
    }
  });

  return(
    <div>
      {item}
      <Row gutter={16}>
        <Col span={24}>
          <Divider orientation="left" style={{fontSize:'18px', marginTop:'20px', color:'#1890ff'}}>处方</Divider>
        </Col>
        <Col span={24}>
          <Divider dashed orientation="left" style={{fontSize:'16px', color:'#265fa9'}}>中药处方</Divider>
        </Col>
        <Col span={6} className={styles.text}>处方名称：{info.cf.zycf.zfm}</Col>
        <Col span={6} className={styles.text}>处方类型：{info.cf.zycf.type}</Col>
        <Col span={6} className={styles.text}>处方剂数：{info.cf.zycf.number}</Col>
        <Col span={6} className={styles.text}>处方医师：{info.cf.zycf.doctor}</Col>
        <Col span={24} className={styles.text}><div style={{padding: '10px 0'}}>详情</div></Col>
        <Col span={24} className={styles.text} style={{color: '#265fa9'}}>
          <Col span={6}>中药名</Col>
          <Col span={6}>用量</Col>
          <Col span={6}>作用</Col>
          <Col span={6}>用法</Col>
        </Col>
        {
          info.cf.zycf.medicine.map((it, i) => {
            return (
              <Col className={styles.text} span={24} key={i}>
                <Col span={6}>{it.name}</Col>
                <Col span={6}>{it.liang} g</Col>
                <Col span={6}>{it.zhuyong}</Col>
                <Col span={6}>{it.yongfa}</Col>
              </Col>
            )
          })
        }
        <Col span={24}>
          <Divider dashed orientation="left" style={{fontSize:'16px', color:'#265fa9'}}>其他</Divider>
        </Col>
        <Col span={24} className={styles.text}>
          <div>中成药：{info.cf.orther.medicineC}</div>
          <div>西成药：{info.cf.orther.medicineW}</div>
          <div>其他：{info.cf.orther.orther}</div>
        </Col>
      </Row>
    </div>
  )
}


export default info;

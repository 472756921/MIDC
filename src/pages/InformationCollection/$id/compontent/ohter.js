import { Row, Col, Divider } from 'antd';
import styles from './styles.css';

const info = ({info}) => {

  const m = {
    zhiliaoxiaoguo: {
      name: '治疗效果',
      zylxpj: {name: '中医疗效评价'},
      xylxpj: {name: '西医疗效评价'},
    },
    huifangjilu: {
      name: '回访记录',
      date: {name: '回访时间'},
      huifangren: {name: '回访人'},
      huifangneirong: {name: '回访内容'},
      qita: {name: '其他'},
    },
    anyu: {
      name: '按语',
      lsdy: {name: '老师答疑'},
      grxd: {name: '个人心得'},
      zjdp: {name: '专家点评'},
      qita: {name: '其他'},
    },
  };
  const d = Object.keys(info);
  const item = d.map((it, i)=>{
    if(it === 'id') {
      return ''
    }
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
  });

  return(
    <div>
      {item}
    </div>
  )
}


export default info;

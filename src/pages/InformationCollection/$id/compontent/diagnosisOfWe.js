import { Row, Col, Divider } from 'antd';
import styles from './styles.css';

const winfo = ({info}) => {
  const m = {
    tigejiancha: '体格检查',
    xcg: '血常规',
    xdt: '心电图',
    ncg: '尿常规',
    CT: 'CT',
    dbcg: '大便常规',
    MRI: 'MRI',
    xsh: '血生化',
    cs:'超声',
    X: 'X光片',
    orther: '其他',
  }
  const d = Object.keys(info);
  let item = d.map((it, i)=>{
    return (
      <Col span={24} key={i}>
        <Divider orientation="left" style={{fontSize:'18px', marginTop:'20px', color:'#1890ff'}}>{m[it]}</Divider>
        {
          typeof info[it] === 'object'
            ?
            <div>
              {
                info[it].img.map( (srcs, ii) => {
                  return (
                    <img src={srcs} key={i*10 + ii} style={{marginLeft:'2em'}}/>
                  )
                })
              }
              <div className={styles.text}>{info[it].text}</div>
            </div>
            :
            <div className={styles.text}>{info[it].text || info[it]}</div>
        }
      </Col>
    )
  })
  return (
    <Row gutter={16}>
      {item}
    </Row>
  )
}

export default winfo;

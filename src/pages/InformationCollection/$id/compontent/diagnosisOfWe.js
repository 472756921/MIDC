import { Row, Col, Divider } from 'antd';
import styles from './styles.css';
import {serviceIP} from "../../../../utils/config";

const winfo = ({info, imgShow}) => {
  const m = {
    tigejiancha: '体格检查',
    xcg: '血常规',
    xdt: '心电图',
    ncg: '尿常规',
    ct: 'CT',
    dbcg: '大便常规',
    mri: 'MRI',
    xsh: '血生化',
    cs:'超声',
    x: 'X光片',
    orther: '其他',
  }
  const d = Object.keys(info);
  let item = d.map((it, i)=>{
    if(it === 'id') {
      return ''
    }
    return (
      <Col span={24} key={i}>
        <Divider orientation="left" style={{fontSize:'18px', marginTop:'20px', color:'#1890ff'}}>{m[it]}</Divider>
        {
          typeof info[it] === 'object' && info[it] !== null
            ?
            <div>
              {
                info[it].img.map( (srcs, ii) => {
                  return (
                    <img src={serviceIP + srcs.url} width='200em' key={i*10 + ii} style={{marginLeft:'2em'}} onClick={()=>{imgShow(serviceIP + srcs.url)}} alt='检查图片' title='点击查看大图'/>
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

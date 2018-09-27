import { Row, Col, Divider } from 'antd';
import {serviceIP} from '../../../../utils/config';
import styles from './styles.css';

const info = ({info, imgShow}) => {
  const m = {
    ask: {
      name: '问诊',
      zusu: {name: '主诉'},
      xianbingshi: {name: '现病史'},
      jiwangshi: {name: '既往史'},
      guomingshi: {name: '过敏史'},
      hunyushi: {name: '婚育史'},
      gerenshi: {name: '个人史'},
      jiazhushi: {name: '家族史'},
    },
    look: {
      name: '望诊',
      sehz: {name: '舌诊'},
      shensexingtai: {name: '神色形态'},
      xiongfu: {name: '胸腹'},
      yaobeishizhizhuajia: {name: '腰背四肢爪甲'},
      pifimaofa: {name: '皮肤毛发'},
      toumainwuguanjinxiang: {name: '头面五官颈项'},
      qinahoueryinjipaixiewu: {name: '前后二阴及排泄物'},
      shezhenimg: {name: '舌诊图片'},
    },
    wq: {
      name: '闻切诊',
      maizhen: {name: '闻诊'},
      wenzhen: {name: '脉诊'},
      qita: {name: '其他'},
    },
    zhaiyao: {
      name: '四诊摘要',
      zhenzhuang: {name: '症状'},
      shezheng: {name: '舌诊'},
      maizhenSel: {name: '脉诊'},
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
          {
            typeof fvalue[iit] === 'object' && fvalue[iit] !== null
            ?
            <div>
              {
                fvalue[iit].img.map( (srcs, iii) => {
                return (
                  <img src={serviceIP + srcs.url} width='200em' key={i*10 + ii*10 + iii} style={{marginLeft:'2em'}} onClick={()=>{imgShow(serviceIP + srcs.url)}} alt='检查图片' title='点击查看大图'/>
                )
                })
              }
              <div className={styles.text}>{fvalue[iit].text}</div>
            </div>
            :
            <div className={styles.text}>{fvalue[iit]}</div>
          }
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

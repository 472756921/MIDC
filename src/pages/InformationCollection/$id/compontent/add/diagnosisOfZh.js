import { Row, Col, Divider } from 'antd';
import styles from './styles.css';

const info = ({info}) => {
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
      maizhen: {name: '脉诊'},
    },
  };

  let i = Object.keys(m).map( (it, i) => {
    let temp = m[it];
    return (
      <Row gutter={16} key={i} key={i}>
        <Col span={24}>
          <Divider orientation="left" style={{fontSize:'14px', marginTop:'20px', color:'#1890ff'}}>{m[it].name}</Divider>
        </Col>
        {
          Object.keys(temp).map((itt, j) => {
            if(j>0)
            return (
              <Col span={12} key={i*10+j}>
                {temp[itt].name}
              </Col>
            )
          })
        }
      </Row>
      )
  })

  return(
    <div>
      {i}
    </div>
  )
}


export default info;

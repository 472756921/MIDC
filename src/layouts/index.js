import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/src/locale/zh-cn';
import withRouter from 'umi/withRouter'
import App from './app'

export default withRouter((props) => {
  return (
    <LocaleProvider locale={zh_CN}>
      <App>
        { props.children }
      </App>
    </LocaleProvider>
  )
})

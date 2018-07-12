import { connect } from 'dva';
import { Button, Row, Col, Tree, Divider } from 'antd';
import PropTypes from 'prop-types';

const index =  ({loading, systemMannger, dispatch}) => {

  return (
    <div>123</div>
  )
}

index.propTypes = {
  loading: PropTypes.object,
  dataMannger: PropTypes.object,
}

export default connect(({ loading, systemMannger }) => ({ loading, systemMannger }))(index)

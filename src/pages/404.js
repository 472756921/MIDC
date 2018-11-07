import React from 'react';
import {Button} from 'antD';

class index extends React.Component{
  render() {
    return(
      <div style={{width:'100%',overflow:'hidden',height: '100vh'}}>
        <Button type="primary" style={{position:'absolute', width:'100px', top:0, left:0, right:0, bottom: 0, margin:'auto'}}>
          <a href='/'>返回首页</a>
        </Button>
        <img src={require('../assets/404.jpg')} width='100%' alt="404"/>
      </div>
    )
  }
}

export default index;

import { Chart, Tooltip, Axis, Bar } from 'viser-react';
import * as React from 'react';

const scale = [{
  dataKey: 'sales',
  tickInterval: 20,
}];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }


  render() {
    return (
      <Chart forceFit height={400} data={this.state.data} scale={scale}>
        <Tooltip />
        <Axis />
        <Bar position="name*count" />
      </Chart>
    );
  }
}


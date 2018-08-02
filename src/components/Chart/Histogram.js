import { Chart, Tooltip, Axis, Bar } from 'viser-react';
import * as React from 'react';

const data = [
  { year: '湿热', sales: 38 },
  { year: '脾肾两虚', sales: 52 },
  { year: '脾胃虚弱证', sales: 61 },
  { year: '热毒', sales: 145 },
  { year: '血燥', sales: 48 },
  { year: '湿阻', sales: 38 },
  { year: '脾虚痰湿证', sales: 38 },
  { year: '气阴两虚证', sales: 38 },
];

const scale = [{
  dataKey: 'sales',
  tickInterval: 20,
}];

export default class App extends React.Component {
  render() {
    return (
      <Chart forceFit height={400} data={data} scale={scale}>
        <Tooltip />
        <Axis />
        <Bar position="year*sales" />
      </Chart>
    );
  }
}


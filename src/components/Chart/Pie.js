import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react';
import * as React from 'react';
const DataSet = require('@antv/data-set');

const sourceData = [
  { name: '事例一', count: 40 },
  { name: '事例二', count: 21 },
  { name: '事例三', count: 17 },
  { name: '事例四', count: 13 },
  { name: '事例五', count: 9 }
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }

  render() {
    const dv = new DataSet.View().source(this.state.data);
    dv.transform({
      type: 'percent',
      field: 'count',
      dimension: 'name',
      as: 'percent'
    });
    const data = dv.rows;
    return (
      <Chart forceFit height={400} data={data} scale={scale}>
        <Tooltip showTitle={false} />
        <Coord type="theta" />
        <Axis />
        <Legend dataKey="name" />
        <Pie
          position="percent"
          color="name"
          offset={130}
          style={{ stroke: '#fff', lineWidth: 1 }}
          label={['percent', {
            formatter: (val, item) => {
              return item.point.name + ': ' + val;
            }
          }]}
        />
      </Chart>
    );
  }
}


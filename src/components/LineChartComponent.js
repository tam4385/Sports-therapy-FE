import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent = ({ data, intervals }) => { 
  return (
    <Container>
      <Typography align='center' variant='h4'>Number of Users</Typography>
      <LineChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey='date'
          ticks={intervals}
          tickFormatter={(ms) => new Date(ms)}
          name={'date'} 
        />
        <YAxis name='Number of Users' label='Users' />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="NumberOfUsers" stroke="red" activeDot={{ r: 8 }} />
      </LineChart>
    </Container>
  )
}

export default LineChartComponent;
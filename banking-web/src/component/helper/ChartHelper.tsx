import { BarChart } from '@mui/x-charts/BarChart';

interface ChartData {
  xAxis : { id: string, data: string[] }[]
  series: { data: number[] }[]
}

export default function BarChartComponent(props : ChartData) {
    return <BarChart
      xAxis={props.xAxis}
      series={props.series}
      height={300}
      colors={['#6e11b0']}
      borderRadius={8}
    />
}
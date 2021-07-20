import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ISummary } from "../../interfaces/SummaryInterface";

interface PropsTinyBarChart {
  summaries?: ISummary[];
  getTotalValue: (summary: ISummary) => number;
}

const TinyBarChart = ({ summaries, getTotalValue }: PropsTinyBarChart) => {
  const generateData = () => {
    if (summaries) {
      const data2 = summaries.map((summary) => ({
        marca: summary.name,
        value: getTotalValue(summary),
        totalVehicles: summary.vehicles.length,
      }));
      return data2;
    }
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          // width={500}
          height={300}
          data={generateData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="marca" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
          <Bar dataKey="totalVehicles" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyBarChart;

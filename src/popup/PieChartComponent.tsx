import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PoliticsDTO } from '../content';

const PieChartComponent = ({ progressive, conservative, unclassified }: PoliticsDTO) => {
  const data = [
    { name: '진보', value: progressive },
    { name: '보수', value: conservative },
    { name: '미분류', value: unclassified },
  ];


  const COLORS = ['#1077BA', '#E50127', '#9f9ea0'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-8">
            <ResponsiveContainer width={500} height={400} className="text-center">
              <PieChart width={500} height={400}>
                <Legend layout="vertical" verticalAlign="top" />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default PieChartComponent;

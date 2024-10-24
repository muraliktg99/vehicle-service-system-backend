import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, BarChart, Bar, Rectangle, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function RevenueChart() {
    const [data, setData] = useState([]);
    const [type, setType] = useState('daily');

    useEffect(() => {
        axios.get('http://localhost:8000/api/revenue-report/')
            .then(response => setData(response.data[type]));
    }, [type]);

    return (
        <div>
            <select onChange={e => setType(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="total"/>
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="total"
                    fill="#FF5F5E"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
            </BarChart>


            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default RevenueChart;

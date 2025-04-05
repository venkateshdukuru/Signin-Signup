


import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend,
  LineChart, Line, AreaChart, Area, ResponsiveContainer
} from "recharts";
import axios from "axios";
import "./dashboard.css";
import Grid from '@mui/material/Grid';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"];

const Dashboard = () => {
  const [anxietyData, setAnxietyData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/user-anxiety-stats")
      .then(response => {
        const data = response.data.anxiety_distribution;
        const formattedData = Object.keys(data).map(level => ({
          name: `Level ${level}`,
          value: data[level]
        }));
        setAnxietyData(formattedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="">
      <h2>Anxiety Level Statistics</h2>
      <Grid container spacing={2}>
        <Grid size={6}>
          <div className="chart">
            <h3>Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anxietyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid size={6}>
          <div className="chart">
            <h3>Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={anxietyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {anxietyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={6}>
          <div className="chart">
            <h3>Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={anxietyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid size={6}>
          <div className="chart">
            <h3>Area Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={anxietyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#00C49F" fill="#00C49F" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

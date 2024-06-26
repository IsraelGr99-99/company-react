import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../functions';
import { Pie, Bar } from 'react-chartjs-2';
import '../../stylesheets/graphic.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Graphic = () => {

  const [info, setInfo] = useState([]);
  const [colors, setColors] = useState([]);
  let charOptions = { responsive: true };

  useEffect(() => {
    getData();
  }, []);

  const random = () => {
    return Math.floor(Math.random() * 256);
  };

  const getData = async () => {
    const res = await sendRequest('GET', '', 'api/employeesbydepartment', '');
    setInfo(res);
    res.map(() => {
      setColors(prevColors => [...prevColors, `rgb(${random()},${random()},${random()})`]);
    });
  };

  const charData = {
    labels: info.map(d => d.name),
    datasets: [{ label: 'Employees', data: info.map(d => d.count), backgroundColor: colors }]
  };

  return (
    <div className='container-fluid grahic' >
      <h2>Employees by Department</h2>
        <div className="col-md-10 offset-md-1">
          <Bar options={charOptions} data={charData} />
        </div>
      </div>
  )
}

export default Graphic;
import React, { useEffect, useRef, useState } from 'react';
import { Chart as Chartjs } from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import MotionChart from './MotionChart';
import ServiceChart from './ServiceChart';

const Chart = ({drc,dc,pc}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [ratio, setRatio] = useState('');

  useEffect(() => {
    const chartContext = chartRef.current.getContext('2d');

    // Check if there's an existing chart instance and destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Calculate the ratio
    const doctorsCount = dc;
    const patientsCount = pc;
    const gcd = findGCD(doctorsCount, patientsCount);
    const minimizedDoctorsCount = doctorsCount / gcd;
    const minimizedPatientsCount = patientsCount / gcd;
    const ratioValue = `${minimizedDoctorsCount}:${minimizedPatientsCount}`;

    setRatio(ratioValue);

    // Create a new chart instance with updated data
    chartInstance.current = new Chartjs(chartContext, {
      type: 'bar',
      data: {
        labels: ['Doctors', 'Patients'],
        datasets: [{
          label: 'Count',
          data: [doctorsCount, patientsCount], // Update the data here
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              return Math.round(value * 100 / context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)) + '%';
            },
            color: '#fff',
            anchor: 'end',
            align: 'end'
          }
        }
      }
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Function to find the greatest common divisor
  const findGCD = (a, b) => {
    if (b === 0) {
      return a;
    }
    return findGCD(b, a % b);
  };

  return (
    <div className='text-white'>
      <div className='mb-4 bg-gradient-to-r from-slate-700 to-slate-400'>
        <canvas ref={chartRef}></canvas>
        <p className='text-sm'>Ratio: {ratio}</p>
      </div>
      <div className='  bg-gradient-to-r from-slate-700 to-slate-400 mb-4 '>
        <MotionChart></MotionChart>
      </div>
      <div className='bg-gradient-to-r from-slate-700 to-slate-400 '>
        <ServiceChart></ServiceChart>
      </div>
    </div>
  );
};

export default Chart;

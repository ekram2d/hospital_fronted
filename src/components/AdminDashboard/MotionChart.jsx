import React, { useEffect, useRef } from 'react';
import { Chart as Chartjs } from 'chart.js/auto';

const MotionChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartContext = chartRef.current.getContext('2d');

    // Check if there's an existing chart instance and destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Fake dataset representing the number of patients showing up at different times
    const data = [
      { time: '08:30 AM', count: 5 },
      { time: '09:00 AM', count: 7 },
      { time: '09:30 AM', count: 10 },
      { time: '10:00 AM', count: 8 },
      { time: '10:30 AM', count: 12 },
      { time: '11:00 AM', count: 15 },
      { time: '11:30 AM', count: 18 },
      { time: '12:00 PM', count: 20 },
      { time: '12:30 PM', count: 25 },
      { time: '01:00 PM', count: 22 },
      { time: '01:30 PM', count: 20 },
      { time: '02:00 PM', count: 18 },
      { time: '02:30 PM', count: 15 },
      { time: '03:00 PM', count: 12 },
      { time: '03:30 PM', count: 10 },
      { time: '04:00 PM', count: 8 },
      { time: '04:30 PM', count: 7 },
      { time: '05:00 PM', count: 5 },
      { time: '05:30 PM', count: 3 },
      { time: '06:00 PM', count: 2 },
      { time: '06:30 PM', count: 2 },
      { time: '07:00 PM', count: 3 },
      { time: '07:30 PM', count: 4 },
      { time: '08:00 PM', count: 5 },
      { time: '08:30 PM', count: 6 },
      { time: '09:00 PM', count: 4 }
    ];

    // Extract labels and data from the dataset
    const labels = data.map(entry => entry.time);
    const patientCounts = data.map(entry => entry.count);

    // Create a new chart instance with the fake dataset
    chartInstance.current = new Chartjs(chartContext, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Patients',
          data: patientCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: ''
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
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

  return (
    <div className=''>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default MotionChart;

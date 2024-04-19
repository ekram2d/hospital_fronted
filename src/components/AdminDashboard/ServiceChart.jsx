
import React, { useEffect, useRef } from 'react';
import { Chart as Chartjs } from 'chart.js/auto';

const ServiceChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartContext = chartRef.current.getContext('2d');

    // Check if there's an existing chart instance and destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Fake dataset representing hospital services and their distribution
    const servicesData = {
      labels: ['Emergency Care', 'Surgery', 'Internal Medicine', 'Pediatrics', 'Radiology'],
      data: [25, 20, 15, 30, 10], // Representing percentage distribution of services
      backgroundColors: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ]
    };

    // Create a new chart instance with the fake dataset
    chartInstance.current = new Chartjs(chartContext, {
      type: 'pie',
      data: {
        labels: servicesData.labels,
        datasets: [{
          data: servicesData.data,
          backgroundColor: servicesData.backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 20
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
    <div>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ServiceChart;

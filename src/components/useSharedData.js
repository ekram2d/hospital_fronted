
import { useState, useEffect } from 'react';

const useSharedData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://on-road-server.vercel.app/cars');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default useSharedData;

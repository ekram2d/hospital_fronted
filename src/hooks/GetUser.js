import  { useState, useEffect } from 'react';

const GetUser = () => {
    // Define state to store the user data retrieved from local storage
    const [user, setUser] = useState(null);

    // Fetch user data from local storage when the component mounts
    useEffect(() => {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            // Parse the JSON string to get the user data object
            const userData = JSON.parse(userDataString);
            // Set the user data in component state
            setUser(userData);
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return [user];
};

export default GetUser;
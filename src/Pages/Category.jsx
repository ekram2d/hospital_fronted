import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../hooks/Loading';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://doctor-apps.vercel.app/api/v1/doctors/doctor-features');
                const data = await response.json();
                if (response.ok) {
                    const categoryNames = data.data.map(doctor => doctor.category);
                    const uniqueCategories = [...new Set(categoryNames)];
                    setCategories(uniqueCategories);
                    AOS.init(); // Initialize AOS library after categories are fetched
                } else {
                    console.error('Failed to fetch categories:', data.message);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl text-center font-bold mb-6" data-aos="fade-up">Available Treatments</h1>
            {loading ? ( // Conditional rendering based on loading state
                <p><Loading></Loading></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} category={category} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CategoryCard = ({ category }) => {
    return (
        <div className="bg-gradient-to-r from-slate-300 to-slate-600 shadow-md p-6 rounded-lg" data-aos="fade-up">
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            {/* You can add additional information about the category if needed */}
            {/* For example, you can display the doctors within each category */}
        </div>
    );
};

export default Category;

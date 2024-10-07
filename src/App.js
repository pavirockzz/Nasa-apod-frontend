import React, { useEffect, useState } from 'react';

const Apod = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApodData = async () => {
            try {
                const response = await fetch('http://localhost:3000/apod');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setApodData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApodData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>{apodData.title}</h1>
            <p>{apodData.date}</p>
            <img
                src={apodData.media_type === 'image' ? apodData.url : 'https://via.placeholder.com/400'}
                alt={apodData.title}
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p>{apodData.explanation}</p>
        </div>
    );
};

export default Apod;

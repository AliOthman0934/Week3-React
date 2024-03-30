import React, { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize'; // Assuming you've created the useWindowSize hook as described previously

const MyComponent = () => {
    const windowSize = useWindowSize();
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const response = await fetch(`https://source.unsplash.com/random/${windowSize.width}x${windowSize.height}`);
                setImage(response.url);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchRandomImage();

        const handleResize = () => {
            fetchRandomImage();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowSize.width, windowSize.height]); // Run effect whenever window width or height changes

    return (
        <div>
            <img src={image} alt="Random" style={{width:400 ,height:400, margin:"auto"}} />
        </div>
    );
};

export default MyComponent;

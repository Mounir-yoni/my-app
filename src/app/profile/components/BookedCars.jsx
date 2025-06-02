import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocalStorage } from '../../utils/localStorage';

const BookedCars = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = getLocalStorage("token");
            try {
                const response = await axios.get('https://back-end-obur.onrender.com/api/v1/car-reservations/my-reservations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div>
            {/* Render your reservations component here */}
        </div>
    );
};

export default BookedCars; 
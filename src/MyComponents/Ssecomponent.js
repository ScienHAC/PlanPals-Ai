import React, { useEffect, useState } from 'react';

const SSEComponent = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/events');

        eventSource.onmessage = (event) => {
            const data = event.data;
            console.log(event);
            setMessage(data);
            setLoading(false);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1>Server-Sent Events</h1>
            {loading ? <p>loading..</p> : <p>{message}</p>}
        </div>
    );
};

export default SSEComponent;
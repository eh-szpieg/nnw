import React, { useState } from 'react';

const FetchDataFromAPI = () => {
    const [response, setResponse] = useState(null);

    const handleClick = () => {
        fetch('http://localhost:8080/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "pathFile": "https://sateam5euw01.blob.core.windows.net/pol/IKEA DISTRIBUTION 436000226137.pdf"
            })
        })
            .then(response => response.json())
            .then(data => setResponse(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <button onClick={handleClick}>Wyślij żądanie</button>
            wybik:
            {response && <div>Response: {JSON.stringify(response)}</div>}
        </div>
    );
}

export default FetchDataFromAPI;

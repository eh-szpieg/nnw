import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentData = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            console.log("idzie")
            const response = await fetch('http://localhost:8080/document/recognize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "pathFile":"https://sateam5euw01.blob.core.windows.net/pol/IKEA DISTRIBUTION 436000226137.pdf",
                    "documentType": "pol"
                }),
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-5" onClick={fetchData}>Fetch Data</button>
            {data.map((item, index) => (
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Value: {item.value}</p>
                        <p className="card-text">Confidence: {item.confidence}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DocumentData;

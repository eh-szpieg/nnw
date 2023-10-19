import React, { useState } from 'react';

const ChatWindow = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "prompt":"OPisz mi ten dokument, streść najważniejsze informacje: [{\"name\": \"alcohol\", \"value\": null, \"confidence\": 0.926}, {\"name\": \"peselNumber\", \"value\": null, \"confidence\": 0.726}, {\"name\": \"personalDetails\", \"value\": \" Kamil\", \"confidence\": 0.948}, {\"name\": \"description\", \"value\": \"Zwichnięcie innych i nieokreślonych części stopy\", \"confidence\": 0.91}, {\"name\": \"ICD10Code\", \"value\": \"$93.3\", \"confidence\": 0.921}, {\"name\": \"adressData\", \"value\": null, \"confidence\": 0.869}]"
            })
        });

        const result = await response.json();

        setData(result.response);
    }

    return (
        <div style={{minHeight: '200px', width: '400px', overflowY: 'auto', border: '1px solid black'}}>            <button onClick={fetchData}>PODSUMOWANIE</button>
            {data && (
                <div>
                    <h2>Summary:</h2>
                    <p>{data}</p>
                </div>
            )}
        </div>
    );
}

export default ChatWindow

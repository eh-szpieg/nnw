import React, { useState } from 'react';
import multiForm from './multiForm';


export function selectForm(props) {

    const [document, setDocument] = useState('');

    const handleSubmit = async (event) => {
        props.updateOdpowiedz("Analuzuję dokument: " + document);
    }

    return (
        <multiForm onSubmit={handleSubmit}>
            <label className={styles.description}>Wybierz dokument do analizy</label>
            <select className={styles.description} onChange={(event) => setDocument(event.target.value)} value={document}>
                <option value="OS_ZS009_1010.pdf">OS_ZS009_1010.pdf</option>
                <option value="OS_ZS009_1011.pdf">OS_ZS009_1011.pdf</option>
                <option value="OS_ZS009_1012.pdf">OS_ZS009_1012.pdf</option>
                <option value="OS_ZS009_1013.pdf">OS_ZS009_1013.pdf</option>
            </select>
        </multiForm>
    );
}
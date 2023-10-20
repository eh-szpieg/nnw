import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './classes/Form';
import Chat from './classes/Chat';
import './App.css';
import { useState } from 'react';
import Med from './classes/Med';
import Pol from './classes/Pol';
import Nnw from './classes/Nnw';

function App() {
  const [chat, setChat] = useState('Hello Hestia!');
  const [med, setMed] = useState(null);
  const [nnw, setNnw] = useState(null);
  const [pol, setPol] = useState(null);
  const [medWait, setMedWait] = useState(null);
  const [nnwWait, setNnwWait] = useState(null);
  const [polWait, setPolWait] = useState(null);


  const updateChat = (value) => {
    console.log('Aktualizacja odpowiedzi:', value);
    setChat(value);
  }


  const updateMed = (value) => {
    console.log('Aktualizacja Med:', value);
    setMed(value);
  }

  const isRendered = () => {
    if (medWait === true && nnwWait === true && polWait === true) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-4 border border-dark rounded">
          <h3>Analiza</h3>
          <Form updateChat={updateChat} setMedWait={setMedWait} setNnwWait={setNnwWait} setPolWait={setPolWait} updateMed={setMed} setNnw={setNnw} setPol={setPol}/>
        </div>
        <div className="col-sm-8">
          <h3>Streszczenie ChatGPT</h3>
          <Chat value={chat}/>
          {/* <img src="https://media.tenor.com/kMpnTs0mLGIAAAAd/henry-vacuum.gif" alt=""></img> */}
        </div>
      </div>
      <div className="row">
        <div className="py-5 text-center">
        {medWait === null && nnwWait === null && polWait === null ? (
            <span></span>
        ) : (
          <h2>Dane pobrane</h2>
        )}
        {isRendered() && (<div className="spinner-border text-primary" role="status"></div>)}
        {medWait == false ? (
            <Med value={med}/>
        ) : (
          <span></span>
        )}
        {polWait == false ? (
            <Pol value={pol}/>
        ) : (
          <span></span>
        )}
        {nnwWait == false ? (
            <Nnw value={nnw}/>
        ) : (
          <span></span>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;

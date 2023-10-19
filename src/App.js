import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './classes/Form';
import Chat from './classes/Chat';
import './App.css';
import { useState } from 'react';
import Med from './classes/Med';
import Pol from './classes/Pol';
import Nnw from './classes/Nnw';
import ChatWindow from "./classes/ChatWindow";
import DocumentData from "./classes/DocumentData";

function App() {
  const [chat, setChat] = useState('Hello Hestia!');
  const [medWait, setMedWait] = useState(null);
  const [nnwWait, setNnwWait] = useState(null);
  const [polWait, setPolWait] = useState(null);


  const updateChat = (value) => {
    console.log('Aktualizacja odpowiedzi:', value);
    setChat(value);
  }


  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-4 border border-dark rounded">
          <h3>Analiza</h3>
          <Form updateChat={updateChat} setMedWait={setMedWait} setNnwWait={setNnwWait} setPolWait={setPolWait}/>
        </div>
        <DocumentData/>
        <div className="col-sm-8">
          <h3>Streszczenie ChatGPT</h3>
          <Chat value={chat}/>
          {/* <img src="https://media.tenor.com/kMpnTs0mLGIAAAAd/henry-vacuum.gif" alt=""></img> */}
        </div>
      </div>
      <div className="row">
        <div className="py-5 text-center">
        {medWait === null && nnwWait === null && polWait === null ? (
            <p></p>
        ) : (
          <h2>Dane pobrane</h2>
        )}
        
        {medWait === null ? (
            <p></p>
        ) : (
          <p>{medWait ? (<div className="spinner-border text-primary" role="status"></div>):(<Med />)}</p>
        )}
        {polWait === null ? (
            <p></p>
        ) : (
          <p>{polWait ? (<div className="spinner-border text-primary" role="status"></div>):(<Pol />)}</p>
        )}
        {nnwWait === null ? (
            <p></p>
        ) : (
          <p>{nnwWait ? (<div className="spinner-border text-primary" role="status"></div>):(<Nnw />)}</p>
        )}
        </div>
        <ChatWindow/>
      </div>
    </div>
  );
}

export default App;

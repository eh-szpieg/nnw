import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './classes/Form';
import Chat from './classes/Chat';
import './App.css';
import { useState } from 'react';
import Med from './classes/Med';
import Pol from './classes/Pol';
import Nnw from './classes/Nnw';
import promptGPT from './functions/prompt';
import label from './functions/labels';

function App() {
  const [chat, setChat] = useState('');
  const [med, setMed] = useState(null);
  const [nnw, setNnw] = useState(null);
  const [pol, setPol] = useState(null);
  const [medWait, setMedWait] = useState(null);
  const [nnwWait, setNnwWait] = useState(null);
  const [polWait, setPolWait] = useState(null);
  const [chatWait, setChatWait] = useState(null);


  const updateChat = (value) => {
    console.log('Aktualizacja odpowiedzi:', value);
    setChat(value);
  }

  const promptChat = async () => {
    let prompt = "Dokumentacja medyczna: ";
    for(let i=0; i < med.length; i++) {
      prompt += label(med[i].name) + ":"  +  med[i].value + "\n";
    }
    prompt += "Dokumentacja NNW: ";
    for(let i=0; i < nnw.length; i++) {
      prompt += label(nnw[i].name) + ":"  +  nnw[i].value + "\n";
    }
    prompt += "Dokumentacja polisy: ";
    for(let i=0; i < pol.length; i++) {
      prompt += label(pol[i].name) + ":"  +  pol[i].value + "\n";
    }

    
    const response = await promptGPT(prompt);
    setChat(response);
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
        <div className="col-sm-4 border-end ">
          <h3>Analiza</h3>
          <Form updateChat={updateChat} setMedWait={setMedWait} setNnwWait={setNnwWait} setPolWait={setPolWait} setMed={setMed} setNnw={setNnw} setPol={setPol} setChatWait={setChatWait}/>
          <div className='border-top'>
          <h3>Streszczenie ChatGPT</h3>
          <Chat value={chat} wait={chatWait}/>
          </div>
        </div>
        <div className="col-sm-8" >
        {medWait === null && nnwWait === null && polWait === null ? (
            <span></span>
        ) : (
          <h3 className='border-bottom'>Podsumowanie</h3>
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
      <div className="row">
          
        </div>
      </div>
    </div>
  );
}

{/* <img src="https://media.tenor.com/kMpnTs0mLGIAAAAd/henry-vacuum.gif" alt=""></img> */}
export default App;

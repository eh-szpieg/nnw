import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './classes/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-sm-4">
          <h3>Analiza</h3>
          <Form />
        </div>
        <div className="col-sm-8">
          <h3>Chat</h3>
        </div>
      </div>
    </div>
  );
}

export default App;

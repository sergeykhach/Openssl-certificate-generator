import {useEffect} from "react";
import './App.css';
import Form from "./Form";
//import KeyForm from "./KeyForm";

function App() {  

  useEffect(() => {
    fetch("/data").then((resp) => resp.json()).then((resp) => {
      console.log(JSON.stringify(resp, undefined, 2));
    });
  }, []); // kapna
  

  return (
    <div className="App">
      <Form />
      
    </div>
  );
}

export default App;

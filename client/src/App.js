//import {useEffect} from "react";
import './App.css';
import Form from "./Form";

function App() {  

/*
  useEffect(() => {
    fetch("/data").then((resp) => resp.json()).then((resp) => {
      console.log(JSON.stringify(resp, undefined, 2));
    });
  }, []); // kapna
*/

  return (
    <div className="App">
      <header id="header">
        <h1 className="Vernagir" >OpenSSL private key, CSR and Certificate generator</h1>
        <h2 className="VernagriTak">Certificate's thumbprint and serial number extractor</h2>
        <h2 className="VernagriTak">Qrcode maker from certificate, both in png and svg formats</h2>
        <h2 className="VernagriTakLast">Metamask connector and transactions sender</h2>
      </header>
      <Form />
      <footer id="footer">
        <h2 className="footer1">Generate OpenSSL private key, CSR and Certificate, extract from certificate thumbprint and serial number by only click.
        Make png and svg qrcodes from certificate, connect to Metamask and send transactions. Save in blockchain generated thumbprint and get the last set fingerprint from blockchain via Metamask by using already deployed smart contract. </h2>
        <h2 className="footer2">Copyright ©khachoyan.com 2022. All rights reserved</h2> 
      </footer>  
    </div>
  );
}

export default App;

//import {useEffect} from "react";
import './App.css';
import Form from "./Form";

function App() {  


  return (
    <div className="App">
      <header id="header">
      <h1 className="Vernagir" >OpenSSL private key, CSR and Certificate generator</h1>
        <h2 className="VernagriTak">Certificate's thumbprint and serial number extractor</h2>
        <h2 className="VernagriTak">Qrcode maker from certificate, both in png and svg formats</h2>
        <h2 className="VernagriTak">NFT creator and saver via Metamask, from made Qrcode</h2>
        <h2 className="VernagriTakLast">Metamask connector and transactions sender</h2>
      </header>
      <Form />
      <footer id="footer">
        <h2 className="footer1">Generate openSSL private key, CSR and certificate, extract from certificate thumbprint and serial number by only click.
        Make png and svg qrcodes from certificate. Create and save NFT from made QRcode of certificate using Metamask. Connect to Metamask and send transactions. Save in blockchain generated thumbprint and get the last set fingerprint from blockchain via Metamask by using already deployed smart contract. </h2>
        <h2 className="footer2">Copyright ©khachoyan.com 2023. All rights reserved</h2> 
      </footer>
    </div>
  );
}

export default App;

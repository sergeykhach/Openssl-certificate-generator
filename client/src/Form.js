import React,{ useState, useEffect, Children } from "react";
import ReactiveButton from 'reactive-button';
import GetAccount from "./connectToMetamask";
import registerGetFingPrint from "./GetFingPrint";
import Pahatex from "./SavePahatex";
import Morali from "./sendtransaction";
import registerSetFingPrint from "./SetFingPrint";
import QrCode from "./qrcode";
import QrCodeToSvg from "./qrToSvg";
import PahaPng from "./SavePahaPng"
import QrCodeToSvgSave from "./qrToSvgSave";
import QrCodeToNFT from "./qrToNft";

function Form() {

  const [countryname, setcountryname] = useState("");
  const [statename, setstatename] = useState("");
  const [localityname, setlocalityname] = useState("");
  const [organizationname, setorganizationname] = useState("");
  const [organizationunitname, setorganizationunitname] = useState("");
  const [commonname, setcommonname] = useState("");
  const [email, setemail] = useState("");
  const [message, setMessage] = useState("");
  const [keyText, setKeyText] = useState([]);
  const [csrText, setCsrText] = useState([]);
  const [certText, setCertText] = useState([]);
  const [thumbprint, setThumbprint] = useState([]);
  const [serial, setSerial] = useState([]);
  const [receiver,setReceiver] = useState("");
  const [knopka, setKnopka] = useState('idle');


  const options = [
    {value: "1024", text: "--Choose an option--"},
    {value: "2048", text: "2048"},
    {value: "3072", text: "3072"},
    {value: "4096", text: "4096"},
    
  ];
  
  //takiny menuyi select blokinna
  const [selected, setSelected] = useState(options[0].value);
  const handleChange = event => {
       setSelected(event.target.value);
  };

  //vor handle submiti popoxutyany mi arajin angma reakcia ta
  useEffect(() => {
      handleSubmit();
  }, []);

  const onClickHandler = () => {
    setKnopka('loading');
    setTimeout(() => {
        setKnopka('success');
    }, 8000);
  }

  let handleSubmit = async (e) => {
      e.preventDefault();
      onClickHandler();
      try {
        let res = await fetch("https://khachoyan.com/key", {
          method: "POST",
          body: JSON.stringify({
              countryname: countryname,
              statename: statename,
              localityname: localityname,
              organizationname: organizationname,
              organizationunitname: organizationunitname,
              commonname: commonname,
              email: email,
              selected: selected
          }),
      });
     /* 
     let resJson = await res.json().then((res) => {
        alert(res.email);
      });
      */
     //use effekti ardyunqum stanalu paragayum nor textera set anum
      let resJson = await res.json();
      setKeyText(resJson.keyText);
      setCsrText(resJson.csrText);
      setCertText(resJson.certText);
      setThumbprint(resJson.certThumbrint);
      setSerial(resJson.certSerial);

      /*
      let keyText = resJson.keyCode;
      let csrText = resJson.email;
      let certText = resJson.coutryname;
       */     
      if (res.status === 200) {
        setcountryname("");
        setstatename("");
        setlocalityname("");
        setorganizationname("");
        setorganizationunitname("");
        setcommonname("");
        setemail("");
        setSelected("");
        setMessage("Get or save your key, CSR and certificate with serial number and thumbprint below");
       
      } /*else {
        setMessage("Some error occured");
      }*/
      
    } catch (err) {
      console.log(err);
    }     
  };

  // loadinga grelu texteri poxaren ete undefined arjq linen textery
  if (keyText === csrText === certText === undefined) return <div>Loading...</div>

  //nkaruma sagh forman ira changerov
  return (
    <div id="main">  
      <div className = "Form">
        <div id="generate">
          <form onSubmit={handleSubmit}>
            <container id="container">
              <label id="lab">Country Name (2 letter code) [AU]:</label>
              <input id="countryname" 
              type="text" 
              value={countryname}
              maxLength = "2"
              onChange={(e) => setcountryname(e.target.value)}
              />
              
              <label  id="lab">State or Province Name (full name) [Some-State]:</label>
              <input id="statename" 
              type="text"
              value={statename}
              onChange={(e) => setstatename(e.target.value)}
              />
              
              <label id="lab">Locality Name (eg, city):</label>
              <input id="localityname" 
              type="text" 
              value={localityname}
              onChange={(e) => setlocalityname(e.target.value)}
              />
              
              <label id="lab">Organization Name (eg, company):</label>
              <input id="organizationname"
              type="text"
              value={organizationname}
              onChange={(e) => setorganizationname(e.target.value)}
              />
              
              <label id="lab">Organization Unit Name (eg, division or unit of company):</label>
              <input id="organizationunitname"
              type="text"
              value={organizationunitname}
              onChange={(e) => setorganizationunitname(e.target.value)}
              />
              
              <label id="lab">Common Name (e.g. server FQDN or YOUR name):</label>
              <input id="commonname" 
              type="text" 
              value={commonname}
              onChange={(e) => setcommonname(e.target.value)}
              />
              
              <label id="lab">Email Address:</label>
              <input id="email" 
              type="email" 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              />
              
              <label id="lab">RSA Key Size:</label>
              
              <select id="selectmenu" value={selected} onChange={handleChange}>
              {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <br/>
              </container> 
              
               <ReactiveButton
                  buttonState={knopka}
                  color={'white'}
                  idleText={'Click once and wait a little to generate Key, CSR, Cerificate with Thumbprint and Serial number'}
                  loadingText={'Loading'}
                  successText={'Your data has been successfully created'}
                  errorText={'Error'}
                  type={'submit'}
                  className={'reactivbut'}
                  style={{ borderRadius: '7px', 
                    fontFamily: 'arial', 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color:'rgb(100, 5, 5)',
                    border: 'solid 2px rgb(100, 5, 5)',
                    background: 'white'                    
                   }}
                  outline={false}
                  shadow={false}
                  rounded={false}
                  size={'small'}
                  block={true}
                  messageDuration={5000}
                  disabled={false}
                  buttonRef={null}
                  width={null}
                  height={null}
                  animation={true}
              />
              <br/>
              <br/>      
              <div className="message">{message ? <p>{message}</p> : null}</div>
            
      </form>           
      </div>  
        <div id="takicontain">
          <div>{message ? <>
            <p id="keyHead">Here is the Key file text</p>
            <textarea id="keyTxt"  rows="10" cols="70" value={keyText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the key file" onClick= {() => Pahatex("keyTxt")}></input></>
            : <> <br/>
            {/*<textarea id="keyTxt"  rows="10" cols="70" value={"Key file text"}></textarea>*/}
            </>}
          </div>
          
          
          <div>{message ? <>
            <p id="keyHead">Here is the CSR file text</p>
            <textarea id="csrTxt"  rows="10" cols="70" value={csrText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the CSR file" onClick={() => Pahatex("csrTxt")}></input> </> 
            : <>
            {/*<textarea id="csrTxt"  rows="10" cols="70" value={"CSR file text"}></textarea>*/}
            </>}
          </div>  
                   
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate file text</p>
            <textarea id="certTxt"  rows="10" cols="70" value={certText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the certificate file" onClick={() => Pahatex("certTxt")}></input>
            <br/>
            <p id="keyHead">Click on white empty area just below to get Certificate's text QRcode</p>
            <canvas id="canvas" onClick={() => QrCode(certText)}></canvas>
            <input id="textsave" type="button" value="Click to save the qrcode.png in your downloads" onClick={() => PahaPng("canvas")}></input><br/>
            <input id="textsave" type="button" value="save NFT" onClick={() => QrCodeToNFT()}></input>

            <p id="keyHead">Click on white empty area just below to get Certificate's text QRcode in SVG format</p>
            <h5>(Will work only if RSA key of generated certificate is 2048)</h5>
            <div id="canvassvg" onClick={() => QrCodeToSvg(certText)}></div>
            <input id="textsave" type="button" value="Click to save the qrcode.svg in your downloads" onClick={() => QrCodeToSvgSave(certText)}></input>
            </>
            : <>
            {/*<textarea id="certTxt"  rows="10" cols="70" value={"Certificate file text"}></textarea>*/}
            </>}
          </div> 
        
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate's serial number </p>
            <textarea id="serial"  rows="4" cols="70" value={serial}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the serial number file" onClick={() => Pahatex("serial")}></input></>
            : <>
            {/*<textarea id="serial"  rows="4" cols="70" value={"Certificate's serial number"}></textarea>*/}
            </>}
          </div> 
          
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate's thumbprint</p>
            <textarea id="tprint"  rows="4" cols="70" value={thumbprint}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the thumbprint file" onClick={() => Pahatex("tprint")}></input></>
            : <>
            {/*<textarea id="tprint"  rows="4" cols="70" value={"Certificate's thumbprint"}></textarea>*/}
            </>}
          </div> 
          </div> 
          <br/>
        <div>
      </div>
      <div id="metamask">        
        <container id="metacont">
          <h2 id="metagrvacq">Connect to Metamask and send transaction</h2>
          <input id="metam" type="button" value="Click to connect to Metamask" onClick={() => GetAccount()}></input>      
          <input id="trans" type="button" value="Click to send a transaction" onClick={() => {receiver ? Morali(receiver) && setReceiver("") : alert("Input receiver's address!")}}></input> 
          <input id="receiveraddr" type="text" placeholder="Receiver's address (no spaces)" value={receiver} onChange={e => setReceiver(e.target.value)}/>
        </container>            
      </div>
       <div>
          <container id="fingercont">
            <h2 id="finggrvacq1">Set upper generated thumbprint to deployed smart contract via Metamask or get your last set thumbprint from deployed smart contract</h2>
            <input id="setfing" type="button" value="Set Fingerprint" onClick={() => registerSetFingPrint(thumbprint)}></input>
            <input id="getfing" type="button" value="Get Fingerprint" onClick={() => registerGetFingPrint()}></input>
            <div id="lastFingPrint"></div>                       
          </container>           
        </div>
        </div>
      <br/>     
    </div>
  )
}

export default Form;
import React,{ useState, useEffect } from "react";
import ReactiveButton from 'reactive-button';
import GetAccount from "./connectToMetamask";
import Pahatex from "./SavePahatex";
import Morali from "./sendtransaction";

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
        let res = await fetch("https://khachoyan.com", {
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
    <div>  
      <div className = "Form">
          <form onSubmit={handleSubmit}>
              <label>Country Name (2 letter code) [AU]:</label>
              <input id="countryname" 
              type="text" 
              value={countryname}
              onChange={(e) => setcountryname(e.target.value)}
              />
              <br/>
              <label>State or Province Name (full name) [Some-State]:</label>
              <input id="statename" 
              type="text"
              value={statename}
              onChange={(e) => setstatename(e.target.value)}
              />
              <br/>
              <label>Locality Name (eg, city):</label>
              <input id="localityname" 
              type="text" 
              value={localityname}
              onChange={(e) => setlocalityname(e.target.value)}
              />
              <br/> 
              <label>Organization Name (eg, company):</label>
              <input id="organizationname"
              type="text"
              value={organizationname}
              onChange={(e) => setorganizationname(e.target.value)}
              />
              <br/> 
              <label>Organization Unit Name (eg, division or unit of company):</label>
              <input id="organizationunitname"
              type="text"
              value={organizationunitname}
              onChange={(e) => setorganizationunitname(e.target.value)}
              />
              <br/> 
              <label>Common Name (e.g. server FQDN or YOUR name):</label>
              <input id="commonname" 
              type="text" 
              value={commonname}
              onChange={(e) => setcommonname(e.target.value)}
              />
              <br/> 
              <label>Email Address:</label>
              <input id="email" 
              type="text" 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              />
              <br/>  
              <label>RSA Key Size:</label>
              <div>
              <select id="selectmenu" value={selected} onChange={handleChange}>
              {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              </div>
              <br/> 
              
              <ReactiveButton
                  buttonState={knopka}
                  color={'white'}
                  idleText={'Click once and wait a little to generate Key, CSR, Cerificate with Thumbprint and Serial number'}
                  loadingText={'Loading'}
                  successText={'Your data has been successfully created'}
                  errorText={'Error'}
                  type={'submit'}
                  className={'button'}
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
                  size={'large'}
                  block={true}
                  messageDuration={5000}
                  disabled={false}
                  buttonRef={null}
                  width={null}
                  height={null}
                  animation={true}
              />
                            
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>           
      </div>  
        <div>
          <div>{message ? <>
            <p id="keyHead">Here is the Key file text</p>
            <textarea id="keyTxt"  rows="10" cols="70" value={keyText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the key file" onClick= {() => Pahatex("keyTxt")}></input></>
            : <><p id="keyHead">Here will be the Key file text</p>
            <textarea id="keyTxt"  rows="10" cols="70" value={keyText}></textarea>
            </>}
          </div>
        </div>   
        <div>
          <div>{message ? <>
            <p id="keyHead">Here is the CSR file text</p>
            <textarea id="csrTxt"  rows="10" cols="70" value={csrText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the CSR file" onClick={() => Pahatex("csrTxt")}></input> </> 
            : <><p id="keyHead">Here will be the CSR file text</p>
            <textarea id="csrTxt"  rows="10" cols="70" value={csrText}></textarea>
            </>}
            </div>  
        </div>  
        <div>
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate file text</p>
            <textarea id="certTxt"  rows="10" cols="70" value={certText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the certificate file" onClick={() => Pahatex("certTxt")}></input></>
            : <><p id="keyHead">Here will be the Certificate file text</p>
            <textarea id="certTxt"  rows="10" cols="70" value={certText}></textarea>
            </>}
            </div> 
        </div>
        <div>
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate's serial number </p>
            <textarea id="serial"  rows="4" cols="70" value={serial}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the serial number file" onClick={() => Pahatex("serial")}></input></>
            : <><p id="keyHead">Here will be the Certificate's serial number </p>
            <textarea id="serial"  rows="4" cols="70" value={serial}></textarea>
            </>}
          </div> 
        </div>   
        <div>
          <div>{message ? <>
            <p id="keyHead">Here is the Certificate's thumbprint</p>
            <textarea id="tprint"  rows="4" cols="70" value={thumbprint}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the thumbprint file" onClick={() => Pahatex("tprint")}></input></>
            : <><p id="keyHead">Here will be the Certificate's thumbprint</p>
            <textarea id="tprint"  rows="4" cols="70" value={thumbprint}></textarea>
            </>}
          </div> 
        </div>
        <br/>
        <div>
                
          <h2>Connect to Metamask and send transaction</h2>
          <input id="commonname" type="text" placeholder="Receiver's address (no spaces)" value={receiver} onChange={e => setReceiver(e.target.value)}/>
          <input id="textsave" type="button" value="Click to connect to Metamask" onClick={() => GetAccount()}></input>
          <input id="textsave" type="button" value="Click to send a transaction" onClick={() => {receiver ? Morali(receiver) && setReceiver("") : alert("Input receiver's address!")}}></input> 
          
        </div>
      <br/>     
    </div>
  )
}

export default Form;
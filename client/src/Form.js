import { useState, useEffect } from "react";
import Pahatexty from "./SaveTextFunc";
import Pahatext from "./SavePahatext";
import Pahatex from "./SavePahatex";

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

  const options = [
    {value: "1024", text: "--Choose an option--"},
    {value: "2048", text: "2048"},
    {value: "3072", text: "3072"},
    {value: "4096", text: "4096"},
    {value: "6144", text: "6144"},
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

  let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res = await fetch("http://localhost:60000/", {
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
        setMessage("Your data has been successfully created, get or save your key and certificate as you wish below");
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
              <button id="button" type="submit">Click once and wait for a second to generate Key, CSR and Cerificate</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>           
      </div>  
        <div>
            <p id="keyHead">Hear will be the Key file text</p>
            <textarea id="keyTxt"  rows="10" cols="70" value={keyText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the key file" onClick= {Pahatexty}></input>
        </div>   
        <div>
            <p id="keyHead">Hear will be the CSR file text</p>
            <textarea id="csrTxt"  rows="10" cols="70" value={csrText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the CSR file" onClick={Pahatext}></input>
        </div>  
        <div>
            <p id="keyHead">Hear will be the Certificate file text</p>
            <textarea id="certTxt"  rows="10" cols="70" value={certText}></textarea>
            <input id="textsave" type="button" value="Click to save the text in the certificate file" onClick={Pahatex}></input>
        </div>          
    </div>
  )
}

export default Form;
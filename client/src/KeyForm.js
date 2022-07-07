//import { useState } from "react";
import Pahatexty from "./SaveTextFunc";


function KeyForm(props) {
     const name = props.name;

    return(
        <div>
            <p id="keyHead">Hear will be the Key</p>
            <textarea id="keyText"  rows="8" cols="50">{name}</textarea>
            <input type="button" value="Click to save the text in the key file" onClick={Pahatexty}></input>
        </div>
    )
}

export default KeyForm;
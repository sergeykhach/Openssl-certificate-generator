//import {fileOpen, directoryOpen,fileSave,supported} from 'https://unpkg.com/browser-fs-access';

async function Pahatex(arg) {
        
  var userInput = document.getElementById(arg).value;
  var blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
      const fileHandle = await window.showSaveFilePicker();
      // const fileHandle = await window.chooseFileSystemEntries();
      const fileStream = await fileHandle.createWritable();
      await fileStream.write(blob);
      await fileStream.close();
}

window.Pahatex=Pahatex;

export default Pahatex;
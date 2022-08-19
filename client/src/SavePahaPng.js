
        
  
import { saveAs } from 'file-saver';

export default async function PahaPng(arg) {
        
  var canvas = document.getElementById(arg);
  canvas.toBlob(function(blob) {
      saveAs(blob, "qrcode.png");
  });
}



/*
async function PahaPng(arg) {
  
  
  
}

window.PahaPng=PahaPng;
export default PahaPng;
*/
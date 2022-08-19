import QRCodeStyling from 'qr-code-styling';

export default function QrCodeToSvg(tx){
  const qrCode = new QRCodeStyling({
    width: `500` ,
    height: `500` ,
    type: "svg",
    data: tx,
    
    dotsOptions: {
        color: "black", 
        type: "rounded"
    },
    backgroundOptions: {
        color: "white", 
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 0
        
    }
    
});

qrCode.append(document.getElementById("canvassvg"));
//qrCode.download({ name: "qr", extension: "svg" });

};


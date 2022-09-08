



export default async function QrCodeToNFT(){
	var canvas = document.getElementById('canvas');
	var img_data = canvas.toDataURL('image/jpg');
		
	let resQr = await fetch("https://khachoyan.com/nft", {
		 method: "post",
		 headers: { "content-type": "application/json"},
		 body: JSON.stringify({ file: img_data }) 
		});
		let kayf = await resQr.json();
		console.log(kayf.ipfsURI_CertNFT);
		document.getElementById('ipfs_URI').innerHTML = ("IPFS URI of uploaded NFT: "+ kayf.ipfsURI_CertNFT);
		  
}














/* import QRCodeStyling from 'qr-code-styling';
import GetAccount from "./connectToMetamask";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || 'wss://some.local-or-remote.node:8546');
//const web3 = new Web3(window.web3.currentProvider);
console.log(web3);*/


/*
export default async function QrCodeToNFT(){
	var canvas = document.getElementById('canvas');
	var img_data = canvas.toDataURL('image/jpg');
	await fetch("http://localhost:60000/ppp", {
		 method: 'POST',
		 headers: { "content-type": "application/json"},
		 body: JSON.stringify({ file: img_data }) 
		});

 
}
*/
//qrCode.append(document.getElementById("canvassvg"));
//qrCode.download({ name: "qrcode", extension: "svg" });


//console.log(new XMLSerializer().serializeToString(qrCode._svg));
//console.log(qrCode._svg);

//taki erku toghy base64encoda anum, aranc dimaci en zrtiki 
//const s = new XMLSerializer().serializeToString(qrCode._svg);
//const encodedData = window.btoa(s);
//const replaced =JSON.stringify(qrCode._svg).replace(/"/g, `'`);
//console.log(encodedData);
/*let base= function getImageDataURL(xml) {
  return "data:image/svg+xml;base64," + btoa(decodeURI(encodeURIComponent(xml)));

}
console.log(base(qrCode._svg));*/

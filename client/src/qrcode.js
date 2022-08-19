import QRCode from 'qrcode'


export default function QrCode(tx){

var canvas = document.getElementById('canvas')
QRCode.toCanvas(canvas, tx, function (error) {
  if (error) console.error(error)
  console.log('success!');
})
}
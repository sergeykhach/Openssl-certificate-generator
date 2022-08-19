
//import $ from "jquery";
import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js'
const web3 = new Web3(window.web3.currentProvider);
const { ethereum } = window;
let contractAddrOwn = "0x2d28Dafd034fAB7eF324Bbb659D669263b326373";
let abiOwn =  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_FingPrint",
				"type": "string"
			}
		],
		"name": "setFingPrint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFingPrint",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] 
;

//Smart contract functions
export default function registerGetFingPrint() {

	let abi = abiOwn;
	let contractAddress = contractAddrOwn;
	let contract = new web3.eth.Contract(abi, contractAddress);


	contract.methods.getFingPrint().call().then( function( FingPrint ) {
		console.log("FingPrint: ", FingPrint);
		document.getElementById('lastFingPrint').innerHTML = ("FingPrint: ", FingPrint);
	  });
}

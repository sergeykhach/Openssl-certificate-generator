import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || 'wss://some.local-or-remote.node:8546');

let contractAddrOwn = "0x757F7a4589377872C08d2BbcA334d5640f187b85";
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


import $ from "jquery";
import GetAccount from "./connectToMetamask";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

let accounts =[];
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
export default async function registerSetFingPrint(FingPrint) {
	//contract instance
	let abi = abiOwn;
	let contractAddress = contractAddrOwn;
	let contract = await new web3.eth.Contract(abi, contractAddress);
	
	await GetAccount().
  		then((e) => {accounts.push(e);});
  		let account = accounts[0];
  	
	let info = $("#newFingPrint").val();
  	contract.methods.setFingPrint(FingPrint).send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
  $("#newFingPrint").val('');
}


//import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
import getAccounts from "./connectToMetamask";
//const web3 = new Web3(window.web3.currentProvider);
const { ethereum } = window;
let accounts =[];


export default async function Morali(rec) {
  
  await getAccounts().
  then((e) => {accounts.push(e);});
  let params = [{
      from: accounts[0], 
    //from: '0x82d3BBc84b9B332811B8c17a6eF18F57144e94ac',
      to: rec,
      value: Number(100000000000000000).toString(16),
      //gas: Number(21000).toString(16),
      // gasPrice: Number(2500000).toString(16),
      //data: '0x0A',
      }]
  let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
    console.log(err)
  })    
}




/*
{
 
  if (typeof window.ethereum !== "undefined"){

    ethereum.request({method: "eth_requestAccounts"});
    
    const accounts = web3.eth.getAccounts();

    console.log(accounts);
  }
}
*/
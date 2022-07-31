//import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
//const web3 = new Web3(window.web3.currentProvider);
const { ethereum } = window;
//let accounts = [];


export default async function GetAccount() {
    
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    return(account)
    window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        return(accounts[0])
       });
   // return accounts = await ethereum.request({ method: 'eth_requestAccounts' });
 }
 
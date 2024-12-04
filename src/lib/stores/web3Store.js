import { writable } from 'svelte/store';
import { ethers } from 'ethers';
import { browser } from '$app/environment';
import contractABI from './contractABI.json';

export const provider = writable(null);
export const signer = writable(null);
export const address = writable(null);
export const contract = writable(null);
export const usdEContract = writable(null);

const contractAddress = '0x315c7B1205FcbDC5c8c38C2A4CAA7de0b890Fc2f';
const usdEAddress = '0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE';
//const contractABI = contractABI
const erc20ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)"
];

export async function connectWallet() {
    if (browser && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();
        const userAddress = await web3Signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, web3Signer);
        const usdEContractInstance = new ethers.Contract(usdEAddress, erc20ABI, web3Signer);
  
        provider.set(web3Provider);
        signer.set(web3Signer);
        address.set(userAddress);
        contract.set(contractInstance);
        usdEContract.set(usdEContractInstance);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('MetaMask is not installed or not in a browser environment');
    }
  }
  
  if (browser) {
    connectWallet();
  }
  
  
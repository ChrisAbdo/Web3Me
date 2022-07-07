import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Web3 from "web3";
import Web3Me from "../build/contracts/Web3Me.json";

function upload() {
  const ipfsClient = require("ipfs-http-client");
  const ipfs = ipfsClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  const [account, setAccount] = useState("");
  const [web3me, setWeb3Me] = useState(null);
  const [filesCount, setFilesCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buffer, setBuffer] = useState(null);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Web3Me.networks[networkId];
    if (networkData) {
      const web3me = new web3.eth.Contract(Web3Me.abi, networkData.address);
      setWeb3Me(web3me);

      const filesCount = await web3me.methods.fileCount().call();
      // set the imagesCount to update with every new image
      setFilesCount(filesCount);

      for (let i = 1; i <= filesCount; i++) {
        const file = await web3me.methods.files(i).call();
        setFiles((prevFiles) => [...prevFiles, file]);
      }

      //  this.setState({
      //   images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      // })

      // display the images
      setLoading(false);

      console.log(filesCount);

      setLoading(false);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  const captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log("buffer", buffer);
    };
  };

  // upload image which takes in description
  const uploadFile = async (description) => {
    console.log("submitting to ipfs");

    ipfs.add(buffer, (error, result) => {
      console.log("IPFS result", result);
      if (error) {
        console.log("IPFS error", error);
        return;
      }

      setLoading(true);

      web3me.methods
        .uploadFile(result[0].hash, description)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center ">
        <h1 className="text-6xl font-bold">hello world</h1>
      </div>
    </div>
  );
}

export default upload;

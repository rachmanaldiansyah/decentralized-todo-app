require("dotenv").config();

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

app.use(
  fileUpload({
    extended:true
  })
)
app.use(express.static(__dirname));
app.use(express.json());

const path = require("path");
const ethers = require("ethers");

let port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {
  abi,
} = require("../eth-todo-list/artifacts/contracts/TaskTodo.sol/TaskTodo.json");
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.post("/addTask", async (req, res) => {
  let task = req.body.task;

  async function storeDataInBlockchain(task) {
    console.log("Adding the task in the blockchain network...");
    const tx = await contractInstance.addTask(task);
    await tx.wait();
  }

  await storeDataInBlockchain(task);
  res.send("The task has been registered in the smart contract");
});

app.post("/changeStatus", async (req, res) => {
  let id = req.body.id;

  async function storeDataInBlockchain(id) {
    console.log("Changing the task status...");
    const tx = await contractInstance.markAsFinished(id);
    await tx.wait();
  }

  await storeDataInBlockchain(id);
  res.send("The task has been changed in the smart contract");
});

app.listen(port, function () {
  console.log("App is listening on port 3000");
});

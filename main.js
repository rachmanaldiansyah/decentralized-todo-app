let WALLET_CONNECTED = "";
let contractAddress = "0x5c18A5196691b1C8b8857d850d94a93ED0168255";
let contractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_desc",
        type: "string",
      },
    ],
    name: "addTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTasks",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "desc",
            type: "string",
          },
          {
            internalType: "enum TaskTodo.TaskStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct TaskTodo.Task[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getTask",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "enum TaskTodo.TaskStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTaskCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "markAsFinished",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tasks",
    outputs: [
      {
        internalType: "string",
        name: "desc",
        type: "string",
      },
      {
        internalType: "enum TaskTodo.TaskStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// connect to metamask
const connectToMetamask = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  WALLET_CONNECTED = await signer.getAddress();

  let element = document.getElementById("metamasknotification");
  element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
};

// collect all task from the smart contract
const getAllTasks = async () => {
  if (WALLET_CONNECTED != 0) {
    let p3 = document.getElementById("p3");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    p3.innerHTML = "Please wait, getting all the tasks from the smart contract";
    let tasks = await contractInstance.getAllTasks();
    let table = document.getElementById("myTables");

    for (let i = 0; i < tasks.length; i++) {
      let row = table.insertRow();
      let idCell = row.insertCell();
      let desCell = row.insertCell();
      let statusCell = row.insertCell();

      const status = tasks[i].status == 0 ? "Pending" : "Finished";

      idCell.innerHTML = i;
      desCell.innerHTML = tasks[i].desc;
      statusCell.innerHTML = status;
    }

    p3.innerHTML = "The task are updated";

  } else {
    let p3 = document.getElementById("p3");
    p3.innerHTML = "Please connect Metamask First";
  }
};

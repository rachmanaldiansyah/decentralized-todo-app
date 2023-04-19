async function main() {
    const TaskTodo = await ethers.getContractFactory("TaskTodo");

    // start deployment, returning a promise that resolves to a contract object
    const TaskTodo_ = await TaskTodo.deploy();
    console.log("Contract address: ", TaskTodo_.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});
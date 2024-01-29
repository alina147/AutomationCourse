async function calculateAndPrintSquares() {
    for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100)); //emulate the asynch process
        let square = i * i;
        console.log(`Square of ${i}: ${square}`);
    }
}
calculateAndPrintSquares().then(() => { // call the async function and use the then block to await completion
    console.log("Calculation completed!");
});


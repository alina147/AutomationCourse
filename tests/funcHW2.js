async function printOutName() {
    let name = 'John';
    let surname = 'Doe';
    return name + surname;
}
let printout = printOutName();
printOutName().then(() =>
    console.log(printout)

)
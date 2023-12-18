let numbers = [1, 1, 1, 2, 3, 4, 5, 5, 66, 6, 6, 7, 77, 8, 8, 8888, 9]; // array to work with
console.log(numbers);
let updated_numbers = new Array();

// add 5 to each element in array , and write to new array
for (let number of numbers) {
    number += 5;
    updated_numbers.push(number);
}
console.log(updated_numbers);

// create new set and write here values from array
let S = new Set(numbers);
let updated_set = new Set();

// add 2 to each element in set  , and write to new set 
for (let element of S) {
    element += 2;
    updated_set.add(element);
}
console.log(S);
console.log(updated_set);

// sum of elements is set after +2 for each element 
let sum = 0;
for (let element of updated_set) {
    sum = sum + element;
};
console.log(sum);

// create a map where key is 1 symbols from alphabet and value is from Set 
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let my_map = new Map();
let integer = 0;
S.forEach(function (element) {
    my_map.set(alphabet[integer], element);
    integer++;
})
console.log(my_map);

//concatenate key with space from map 
let concatenatedKeys = Array.from(my_map.keys());
result = concatenatedKeys.join(' ')
console.log(result);


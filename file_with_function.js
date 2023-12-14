outputFizzBuzz = function (param)
 {
    for (let i = 1; i < param; i++) 
    {
        is_devided_to_5 = i % 5;
        is_devided_to_3 = i % 3;

        if (is_devided_to_3 == 0 && is_devided_to_5 == 0) {
            console.log("FizzBuzz");
        } else if (is_devided_to_3 == 0) {
            console.log("Fizz");
        } else if (is_devided_to_5 == 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }

    }

}

num_to_fizzbuzz = 16;

outputFizzBuzz(num_to_fizzbuzz); // call function with param 

const numbers = [65, 44, 12, 4];
const newArr = numbers.map((num) => {
	return {
		number: num,
    	squareroot: num ** 2,
      }
});

console.log(newArr);
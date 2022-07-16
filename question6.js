/*6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
, one number from 1 to 100 is missing , Please write the code for finding the missing
number*/

const points = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 99,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 9, 89,
    86, 87, 88, 90, 91, 92, 93, 94, 96, 97, 98, 82, 27, 13, 100, 51];

const res = points.sort(function(a, b){return a-b});
console.log(res); 

let missingNumber = 0;

for(let i=0;i<res.length+1;i++){
    
    if(res[i] != i+1){
        missingNumber = i+1;
        break;
    }
    
}

console.log(`missing Number is - ${missingNumber}`);
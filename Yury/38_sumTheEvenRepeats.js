/*
    Difficulty: Tricky    

    Write an extension for array that works with a variadic array of integers and return the sum of all numbers that appear an even number of times.

    Samples:
    solution([1, 2, 2, 3, 3, 4])       == 5
    solution([5, 5, 5, 12, 12])        == 12
    solution([1, 1, 2, 2, 3, 3, 4, 4]) == 10
*/

// solution1
Array.prototype.solution1=function(){
    let obj={};
    for(let i=0; i<this.length; i++){
        if(obj[this[i]]){
            obj[this[i]]++;
        }
        else{
            obj[this[i]]=1; 
        }
    }
    let sum=0;
    for(let key in obj){
        if(obj[key]%2==0){
            sum +=Number(key);
        }
    }
    //console.log(obj);
    return sum;
    
}


// solution2


/*
************************* PERFORMANCE TESTS *************************
*/

// import big numbers for test

// duplicate some numbers

// test solution1()
//let arr=[1, 2, 2, 3, 3, 4];
//let arr=[1, 1, 2, 2, 3, 3, 4, 4];
let arr=[5, 5, 5, 12, 12];
console.log(arr.solution1());

// test solution2()

/*
************************* PERFORMANCE RESULTS *************************

*/
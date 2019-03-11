/*
    Difficulty: Tricky    

    Write an extension for array of positive and negative numbers and returns a closed range containing the position of the contiguous positive numbers that sum to the highest value, or null if nothing were found.

    Samples:
    [0, 1, 1, -1, 2, 3, 1].solution()            == [4, 5, 6]
    [10, 20, 30, -10, -20, 10, 20].solution() == [0, 1, 2]
    [1, -1, 2, -1].solution()                 == [2]
    [2, 0, 2, 0, 2].solution()                == [0]
    [].solution()                             == null

    Hints:
    1) Use loop to track best range
*/

// solution
Array.prototype.solution=function(){
    if(this.length==0) return null;
    let sum=0;
    let arr=[];
    //let existing=[];
    for(let i=0; i<this.length; i++){
         if(sum+Number(this[i])>sum){
             arr.push(i);
         }
         else{
            //existing.push(arr);
            sum=0;
            arr=[];
        }
    }

    console.log(arr);
    //console.log(existing);
}


/*
************************* PERFORMANCE TESTS *************************
*/

// import big numbers for test

// add negative numbers to test array

// test solution()

//let arr=[0, 1, 1, -1, 2, 3, 1];
let arr=[10, 20, 30, -10, -20, 10, 20];

arr.solution();


/*
************************* PERFORMANCE RESULTS *************************

*/
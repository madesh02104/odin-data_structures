// Fibonacci : iterative method
function fibs(n){
    let arr = [0, 1];

    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    for (let i = 2; i < n; i++){
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr;
}
console.log(fibs(9));

// Fibonacci : recursive method 
function fibsRec(n){
    if (n === 0) return [0];
    if (n === 1) return [0, 1];

    let arr = fibsRec(n-1);
    arr.push(arr[arr.length - 1] + arr[arr.length -2]);

    return arr;
}
console.log(fibsRec(8));

// Recursive Merge sort
function mergeSort(arr){
    let len = arr.length;
    let mid = Math.floor(len/2);

    if (len < 2) return arr;

    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
    let sortedArray = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            sortedArray.push(left[i++]);
        } else {
            sortedArray.push(right[j++]);
        }
    }

    while (i < left.length){
        sortedArray.push(left[i++]);
    }

    while (j < right.length){
        sortedArray.push(right[j++]);
    }

    return sortedArray;
}

console.log(mergeSort([3,2,1,13,8]));
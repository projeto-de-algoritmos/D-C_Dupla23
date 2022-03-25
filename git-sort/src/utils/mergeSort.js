function mergeSort(unsorted) {
    const divide = unsorted.length / 2
    if(unsorted.length < 2){
      return unsorted
    }
    
    const leftSlice = unsorted.splice(0, divide)
    return merge(mergeSort(leftSlice),mergeSort(unsorted))
  }

function merge(left, right) {
let sorted = []   

while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
        sorted.push(left.shift())  
    } else {
        sorted.push(right.shift()) 
    }
}

let sortedArray = [...sorted, ...left, ...right]

return sortedArray
}

//teste = [15, 6, 9, 17, 1, 4, 2, 8];
//console.log(mergeSort(teste));
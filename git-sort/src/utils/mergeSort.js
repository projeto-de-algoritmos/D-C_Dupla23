export function mergeSort(unsorted, orderBy) {
  const divide = unsorted.length / 2;
  if (unsorted.length < 2) {
    return unsorted;
  }

  const leftSlice = unsorted.splice(0, divide);
  return merge(
    mergeSort(leftSlice, orderBy),
    mergeSort(unsorted, orderBy),
    orderBy
  );
}

function merge(left, right, orderBy) {
  let sorted = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0]?.[orderBy] < right[0]?.[orderBy]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  let sortedArray = [...sorted, ...left, ...right];

  return sortedArray;
}

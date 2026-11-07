// ─── Visualization Step Data ────────────────────────────────────────────────

export function generateBubbleSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: [],
    description: `Start: Array has ${n} elements. We'll make ${n - 1} passes.`,
    pass: 0,
  });

  const sortedIndices = [];

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: [],
        sorted: [...sortedIndices],
        description: `Pass ${i + 1}: Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
        pass: i + 1,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedInPass = true;
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [j, j + 1],
          sorted: [...sortedIndices],
          description: `Swapped! ${arr[j + 1]} > ${arr[j]}, so we swap them. Array: [${arr.join(', ')}]`,
          pass: i + 1,
        });
      } else {
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [],
          sorted: [...sortedIndices],
          description: `No swap needed. ${arr[j]} ≤ ${arr[j + 1]}, already in order.`,
          pass: i + 1,
        });
      }
    }
    sortedIndices.push(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [],
      sorted: [...sortedIndices],
      description: `Pass ${i + 1} complete! Element ${arr[n - 1 - i]} is now in its correct position.`,
      pass: i + 1,
    });
    if (!swappedInPass) break;
  }

  // Mark all as sorted
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    sorted: arr.map((_, i) => i),
    description: `✅ Array fully sorted! Final: [${arr.join(', ')}]`,
    pass: 'Done',
  });

  return steps;
}

export function generateMergeSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  
  steps.push({
    array: [...arr],
    left: [],
    right: [],
    merging: [],
    sorted: [],
    description: `Start: Array = [${arr.join(', ')}]. Merge Sort uses Divide & Conquer.`,
    phase: 'initial',
  });

  function mergeSort(arr, l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    
    steps.push({
      array: [...arr],
      left: Array.from({ length: mid - l + 1 }, (_, i) => l + i),
      right: Array.from({ length: r - mid }, (_, i) => mid + 1 + i),
      merging: [],
      sorted: [],
      description: `Dividing: Left=[${arr.slice(l, mid + 1).join(', ')}] Right=[${arr.slice(mid + 1, r + 1).join(', ')}]`,
      phase: 'divide',
    });

    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }

  function merge(arr, l, mid, r) {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];

    steps.push({
      array: [...arr],
      left: [],
      right: [],
      merging: Array.from({ length: r - l + 1 }, (_, i) => l + i),
      sorted: Array.from({ length: r - l + 1 }, (_, i) => l + i),
      description: `Merged: [${arr.slice(l, r + 1).join(', ')}] into positions ${l}-${r}`,
      phase: 'merge',
    });
  }

  mergeSort(arr, 0, arr.length - 1);

  steps.push({
    array: [...arr],
    left: [],
    right: [],
    merging: [],
    sorted: arr.map((_, i) => i),
    description: `✅ Array fully sorted! Final: [${arr.join(', ')}]`,
    phase: 'done',
  });

  return steps;
}

export const algorithmInfo = {
  'bubble-sort': {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly compares adjacent elements and swaps them if out of order. Simple but inefficient for large datasets.',
    pseudocode: [
      'for i from 0 to n-1:',
      '  for j from 0 to n-i-2:',
      '    if arr[j] > arr[j+1]:',
      '      swap(arr[j], arr[j+1])',
    ],
    color: '#0F766E',
  },
  'merge-sort': {
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divides array into halves, recursively sorts them, then merges. Consistent performance.',
    pseudocode: [
      'mergeSort(arr, l, r):',
      '  if l >= r: return',
      '  mid = (l + r) / 2',
      '  mergeSort(arr, l, mid)',
      '  mergeSort(arr, mid+1, r)',
      '  merge(arr, l, mid, r)',
    ],
    color: '#475569',
  },
};


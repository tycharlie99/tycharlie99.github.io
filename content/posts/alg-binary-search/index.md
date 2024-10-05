---
title: "[Note] Binary Search"
description: "Write some note about Binary Search."
image: img/cover.webp
PublishDate: 2024-10-04
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
  - binary search
  - search
  - algorithms
draft: false
---

# Binary Search

The binary search is the algorithm of searching that may be the first algorithm people learn. The binary search can only use the O(logN) time to find the target.

##  Basic Binary Search

For some basic scenarios, we want to find the index of the target value in the vector; if we cannot, then return -1. We use the variable `l` and `r` to represent the interval that we can find, and continue to narrow the range until there is no number in the interval. In cpp, we use the `int` to store the current index, if `(r - l)` is the odd number, it will be the `floor(r - l)`.

```c++
int brnarySearch(vector<int> &array, int target) {
    int l = 0, r = array.size() - 1;
    while (l <= r) {
        int mid = (r - l) / 2 + l;
        if (target < array[mid]) {
            r = mid - 1;
        } else if (target > array[mid]) {
            l = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
```

## Target Not in Array or Multiple Target

In some scenarios, the target value may not be in the array. We need to find the index closest to the target value. In most scenarios, we will find the index greater than or equal to the target. If you can understand the theory of this one, finding the index that is smaller than or equal is the same.

In the situation that the target is not in the array, it means that we will meet the `l = r` condition in the last iteration. The answer will be at the `l`.

- If the value of `mid` smaller than target: `l = mid + 1`
- If the value of `mid` larger than target: `r = mid - 1`

If multiple values are equal to the target in the array, we want to find the greater than or equal to the value in the array. The point is that if we find the value equal to the target, we need the `r = mid - 1` to check whether there are other possible indexes.

```c++
int binarySearch(vector<int> &array, int taarget) {
    int l = 0, r = array.size();
    while (l <= r) {
        int mid = (r - l) / 2 + l;
        if (target <= array[mid]) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
```

{{% footer %}}

---
title: "[筆記] Binary Search"
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

二分搜尋是一種搜尋演算法，可能大家接觸的第一個演算法。二分搜尋可以只使用 **O(logN)** 的時間來找到目標。

## 基本 Binary Search

對於一些基本場景，我們希望找到目標值在向量中的索引；如果不能，則回傳 -1。我們用變數 `l` 和 `r` 來表示我們能搜尋的區間，並且不斷縮小範圍，直到區間內沒有數字為止。在 cpp 中，我們使用 int 來儲存目前索引，如果 `(r - l)` 是奇數，則它將是 `floor(r - l)`。

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

## 目標不在陣列或是有多個目標在陣列中

在某些場景下，目標值可能不在陣列中。我們需要找到最接近目標值的索引。在大多數情況下，我們會發現索引大於或等於目標。如果你能理解這個原理的話，找出小於等於的索引也是一樣的。
如果目標不在陣列中，則表示我們將在最後一次迭代中遇到 `l = r` 狀況。答案將會在 `l` 處。

- 如果 `mid` 的值小於 `target`：`l = mid + 1`
- 如果 `mid `的值大於 `target`：`r = mid - 1`

如果數組中多個值等於目標值，我們希望找到大於或等於數組中的值。關鍵是，如果我們發現值等於目標，我們需要 `r = mid - 1` 來檢查是否有其他可能的索引。

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

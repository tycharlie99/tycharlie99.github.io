---
title: "[筆記] Sieve of Eratosthenes 質數判斷"
description:
image: "img/cover.webp"
PublishDate: 2024-11-05
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
draft: false
---

## 問題

給定一個數字 N，計算 0 到該數字中有多少個質數 (prime) 或是和數 (composite)。

## 想法

判斷質數即是判斷該數字除了 1 與自己本身是否還有可以將其整除的數，沒有的話即為整數。最簡單的想法即為將全部比自己小的數字都進行判斷，如此會增加大量的運算時間複雜度會有 O(N^2)。Sieve of Eratosthenes 即為將低其運算量的演算法。

Sieve of Eratosthenes 演算法的想法即是，將已知的質數的倍數在小於給定的數字設為和數，當從 1 到 $\ log{N}\ $ 的質數都判斷完即可找完所有的質數。

當找到質數時，會從 $\ N^2\ $ 開始往後將小於 N 的數字都設為和數。為什麼要從 $\ N^2\ $ 開始？因為 $\ N * x\ $ 所有小於 $\ N\ $ 的 $\ x\ $ 都會在先前質數判斷完畢，因此僅需要從 $\ N^2\ $ 開始即可。

## 程式碼

- Space Complexity: $\ O(N)\ $
- Time Complexity: $\ O(\sqrt{N}loglogN)\ $
    - $\ \sqrt{N}\ $: for outter loop
    - $\ loglogN\ $: for inner loop

> 有關於時間複雜度的證明，請參考 [detail](http://www.cs.umd.edu/~gasarch/BLOGPAPERS/sump.pdf).

```cpp
int countPrime (int n) {
    vector<int> prime(n + 1, 1);
    for (int i = 2; i * i <= n; i++) {
        if (prime[i]) {
            for (int j = i * i; j <= n; j += i)
                prime[j] = 0;
        }
    }
    int primeCount = 0;
    for (int i = 2; i < n; i++) {
        if (prime[i])
            primeCount++;
    }
    return primeCount;
}
```

## 練習

[LeetCode 204. Count Primes](https://leetcode.com/problems/count-primes/)

{{< footer >}}

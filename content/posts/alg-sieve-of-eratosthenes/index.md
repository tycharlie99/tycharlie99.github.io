---
title: "[Note] Sieve of Eratosthenes"
description:
image: "img/cover.webp"
PublishDate: 2024-11-05
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
draft: false
---

## Question

Given a number N, count how many primes or composites there are in the number from 0 to N.

## Idea

To judge a prime number is to judge whether the number has any other numbers that can be divisible besides 1 and itself. If not, it is an integer. The simplest idea is to judge all numbers smaller than yourself, which will increase a lot of calculation time and the complexity will be **O(N^2)**. Sieve of Eratosthenes is an algorithm that will reduce its computational complexity.

The idea of the Sieve of Eratosthenes algorithm is to set the multiples of known prime numbers as sums less than a given number. When the prime numbers from 1 to $\ log{N}\ $ have been judged, all the prime numbers can be found. of prime numbers.

When a prime number is found, all numbers less than N will be set as sums starting from $\ N^2\ $. Why start with $\N^2\ $? Because $\ N * x\ $ all $\ x\ $ less than $\ N\ $ will be judged before the previous prime number, so it only needs to start from $\ N^2\ $.

## Code

- Space Complexity: $\ O(N)\ $
- Time Complexity: $\ O(\sqrt{N}loglogN)\ $
    - $\ \sqrt{N}\ $: for outer loop
    - $\ loglogN\ $: for inner loop

> For a proof of time complexity, please refer to [detail](http://www.cs.umd.edu/~gasarch/BLOGPAPERS/sump.pdf).

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

## Practice

[LeetCode 204. Count Primes](https://leetcode.com/problems/count-primes/)

{{% footer %}}

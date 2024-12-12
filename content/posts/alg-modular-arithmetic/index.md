---
title: "[Note] Modular Arithmetic"
description: "Clarify the modular arithmetic. Include modular multiplicative inverse."
image: "img/cover.webp"
PublishDate: 2024-10-19
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
    - modular arithmetic
    - modular
    - modular multiplicative inverse
    - Fermat's little theorem
draft: false
---

# Why Take the Modulus

Modulus is a very important concept in programming and computer science. Its function is to calculate the remainder after dividing two numbers. Modulus can be used to limit the value to a range and reduce the need for calculation. range, which can greatly reduce the amount of calculation and time.

## Basic Modular Arithmetic

Through the [Congruence Theorem](https://en.wikipedia.org/wiki/Modular_arithmetic#Congruence), you can learn the modular operations of basic addition, subtraction, and multiplication.

$$ \text{If }\ A_0 \equiv A_1\ (mod\ m)\ \text{and }\ B_0 \equiv B_1\ (mod\ m) $$
$$ A_0 + B_0 \equiv A_1 + B_1\ (mod\ m) $$
$$ A_0 - B_0 \equiv A_1 - B_1\ (mod\ m) $$
$$ A_0 * B_0 \equiv A_1 * B_1\ (mod\ m) $$

However, in division, we cannot find the corresponding relationship through the above method. In division, we can convert it into multiplying a certain number by its reciprocal so that we can use modular arithmetic on it. We also call it **modular multiplicative inverse**.

## Modular Multiplicative Inverse

$$ A^{-1} \equiv B\ (mod\ m) $$

## Fermat's Little Theorem

In Fermat's Little Theorem, we are told that assuming $\ a\ $ is an integer and $\ p\ $ is a prime number, then $\ a^p - a\ $ is a multiple of $\ p\ $.

It can be expressed as $\ a^p \equiv a\ (mod\ p)\ $ , if $\ a\ $ is not a multiple of $\ p\ $ , it can be expressed as $\ a^{p-1} \equiv 1\$.

In algorithm questions, a value $\ p\ $ is usually given, and we want to find $\ a^{-1}\ $, so $\ a^{p-1} \equiv 1\ $ on both sides Multiplying $\ a^{-1}\ $ is

$$ a^{p - 1} \equiv a^{-1} $$

Therefore the reciprocal of $\ a\ $ modulo p is $\ a^{p - 2}\ $. When $\ p\ $ is a prime number, finding $\ a^{-1}\ $ is equivalent to finding $\ a^{p - 2}\ $.

## LeetCode Usage

In LeetCode, the permutation and combination formula is used to calculate how many results there are. In order to facilitate calculation, we usually calculate $\ n!\ $ and $\ {n!}^{-1}\ $ first, so how to calculate $\ { n!}^{-1}\ $ will require the application of Fermat's Little Theorem and the modular reciprocal. Usually in algorithm questions, in order to reduce the number, the modulus ($\ 10^9 + 7\ $) is usually required. Therefore, after we calculate $\ n!\ $, we can use its value to calculate $\ {n! }^{10^9 + 7 - 2}\ $ to find the reciprocal of $\ {n!}^{-1} \$ modulo $\ (10^9 +7)\ $.

## Code

```cpp
int const MOD = 1e9 + 7;
int exp(int a, int b) {
    int res = 1;
    while (b > 0) {
        if (b & 1)
            ans = 1LL * ans * a % MOD;
        a = 1LL * a * a % MOD;
        b >>= 1;
    }
    return ans;
}

int main() {
    int n = 10;
    vector<int> fact (n + 1, 1), invFact(n + 1, 1);
    for (int i = 1; i <= n; ++i) {
        finv[i] = 1LL * finv[i - 1] * i % MOD;
        invFact[i] = exp(finv[i], MOD - 2);
    }
}
```

{{% footer %}}

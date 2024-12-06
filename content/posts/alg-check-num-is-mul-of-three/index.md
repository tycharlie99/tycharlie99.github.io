---
title: "[Note] Check a Number Is Multiple of Three or Not"
description: "Check number if multiple of three."
image: "img/cover.webp"
PublishDate: 2024-11-03
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
    - MTK
    - Algorithms
    - 考古
draft: false
---

# Question

Given an integer number, check if it is a multiple of three or not.

## Using Division and Mod

The easy mathod to solve this problem is using mod to check the remainder.

- Time Complexity: O(1)
- Space Complexity: O(1)

```cpp
bool helper(int n) {
    return (n % 3) == 0;
}
```

## Without Divsion and Mod

Some problems ask you not to use the division and mod to check the number. On the computer, we usually use binary to represent a number. So, any number can be expressed as $\ 2^0 + 2^1 + 2^2 + 2^3 + ... + 2^n\ $. Then, we can change it to another way of representing the number, such as the following.

$$ 2^0 = 3 * 0 + 1 $$
$$ 2^1 = 3 * 1 - 1 $$
$$ 2^2 = 3 * 1 + 1 $$
$$ 2^3 = 3 * 2 - 1 $$

Therefore, if we want to check whether the number is a multiple of three, only check the number of 1 at the odd position and whether the even position is the same.

- Time Complexity: O(logN)
- Space Complexity: O(1)

```cpp
bool helper(int n) {
    if (n < 0)
        return helper(-n);
    else if (n == 0)
        return true;
    else if (n == 1)
        return false;

    int cnt = 0;
    while (n != 0) {
        if (n & 1)
            cnt++;
        if (n & 2)
            cnt--;
        n >> 2;
    }
    return helper(n);
}
```

{{% footer %}}

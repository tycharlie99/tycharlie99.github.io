---
title: "9 Palindrome Number"
date: 2022-10-14T01:49:00+8:00
tags: ["cpp", "leetcode"]
---

## Problem Description

Given an integer x, return true if x is palindrome integer.

An integer is a **palindrome** when it reads the same backward as forward.

## Constraints

- -231 <= x <= 231 - 1

## Solution

```cpp
class Solution {
public:
  bool isPalindrome(int x) {
    if(x < 0)
      return false;
    string num = to_string(x);
    int length = num.length();
    for(int i=0; i<(length+1)/2; i++){
      if(num[i] != num[length-i-1])
        return false;
    }
    return true;
  }
};
```

{{% footer %}}

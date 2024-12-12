---
title: "[Note] KMP Algorithms"
description: "KMP algorithms learning note."
image: "img/cover.webp"
PublishDate: 2024-12-09
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
    - KMP
    - string
    - algorithms
draft: false
---

## Question

In a string `str`, find substrings that match the string `pattern` and return the indices of all substrings.

## Brute Force

In the most direct idea, we will start from each letter of `str` and compare backward. When each subsequent letter is the same as the letter in `pattern`, we will record it. If we encounter a different letter, the pointer of `str` will point to the next letter, and then it will be compared with the letter in `pattern`. As a result, the time complexity of this algorithm will be **O(m * n)**. When the length of the strings `str` and `pattern` increases, the search time will increase and the algorithm will become inefficient.

```cpp
vector<int> helper (string &str, string &pattern) {
    vector<int> result;
    int m = str.length(), n = pattern.length();
    for (int i = 0; i < m - n; ++i) {
        for (int j = 0; j < n; ++j) {
            if (str[i + j] != pattern[j])
                break;
            if (j == n - 1)
                res.push_back(i);
        }
    }
    return result;
}
```

## KMP Algorithms

Is there anything we can improve on the original brute-force solution? When we find that the next letter is different from `str`, we should think about whether there is something that can be used in the string that has been compared before. In 1977, James H. Morris, Donald Knuth, and Vaughan Pratt published the Knuth-Morris-Pratt algorithm, referred to as the KMP algorithm.

### Core Idea

In the KMP algorithm, the main concept is to create an LPS (Longest Proper Prefix which also a Suffix) table for the `pattern` string. When we find different letters during comparison, we can immediately find the next comparison position from Just continue comparing anywhere in `pattern` without starting the comparison again.

In the example below, we can see that when the sixth (0-index) letter `a` is compared, `pattern` is found to be `f` and needs to be corrected for the compared index.

```
      x
abcabcasdasdf
abcabcf
```

In the brute-force solution, we will change the starting index of `str` to 1 (`b`) and start the comparison from the first letter of `pattern`, but in fact we can find that the index of `str` does not need to be moved only You need to change the index of `pattern` to the third one and continue the comparison.

```
      ↓
abcabcasdasdf
   abcabc
```

In order to quickly find the position where the index needs to be adjusted when we encounter different letters, we need to create an LPS array and find all subpattern of `pattern`. Let's take `abvab` as an example. Its proper prefix includes `a`, `ab`, `abv` and `abva`, and its proper suffix includes `b`, `ab`, `vab` and `bvab`. We It can be seen that his maximum shared string is `ab`, so its LPS length is 2.

### LPS Table

We're finding the LPS table for `pattern`, also called the next table by some, whose first `lps[0]` is `0`. Then we can start creating the LPS table for `pattern`.

How to create LPS table for `pattern`? We can compare `pattern` to ourselves and record it. We will use `ababcababcabc` as an example to demonstrate the LPS table. In the following demonstration, we need to first set `lps[0]` to `0` and start comparing with itself. We can find that when the index is 2 (0-index), the same suffix and suffix can appear. When comparing When we get to `c`, something is different. At this time, we need to find the LPS value in the `ab` that has been compared. We can find that the LPS value of the string `pattern[1]` is `0`, so we will Set the comparison index to `0` and continue the comparison.

```
0012x
ababc
    ababcababcabc
```

After comparison, it is found that `pattern[4]` is different from `pattern[0]`, so the comparison continues.

```
00120
ababc
    ababcababcabc
```

At this point we encounter something different again, so we compare the value in `lps[6]` and find it to be `2`, so we just need to set the comparison index to `2` and continue the comparison.

```
001201234567x
ababcababcabc
     ababcababcabc
```

After comparing the entire `pattern` in this way, the `lps` table can be obtained as `0012012345670`.

```
0012012345670
ababcababcabc
          ababcababcabc
```

Therefore we can summarize the above steps to create an LPS table:
- `lps[0]` is `0`
- Compare `pattern` to itself
    - Increase the lps value when the same.
    - When they are different, check the already created lps table, update the compared index, and continue the comparison.

In the following code, `idx` records the lps of which `pattern` was created, and `len` is the `index` for comparison.

Time Conplexity: **O(n)**

```cpp
void getNext(vector<int> &next, string pattern) {
    int idx = 0, len = 0;
    next[idx++] = 0;
    while (idx < pattern.length()) {
        if (pattern[idx] == pattern[len]) {
            next[idx++] = ++len;
        } else if (len == 0) {
            next[idx++] = 0;
            len = 0;
        } else {
            len = next[len - 1];
        }
    }
}
```

### Complete Algorithm

After understanding and completing the lps table (next table), you can start using the lps table comparison. When it is found to be different from `str`, query the `lps` value and update its `idx` and continue the comparison. The time complexity of comparison with `str` is **O(m)**.

Total Time Complexity: **O(m + n)**

```cpp
void getNext(vector<int> &next, string pattern) {
    int idx = 0, len = 0;
    next[idx++] = 0;
    while (idx < pattern.length()) {
        if (pattern[idx] == pattern[len]) {
            next[idx++] = ++len;
        } else if (len == 0) {
            next[idx++] = 0;
            len = 0;
        } else {
            len = next[len - 1];
        }
    }
}

vector<int> myKMP(string &str, string &pattern) {
    int n = pattern.length();
    vector<int> next(n, -1);
    getNext(next, pattern);

    vector<int> res;
    int sI = 0, pI = 0;
    while (sI < str.length()) {
        if (pI == pattern.length()) {
            res.push_back(sI - n);
            pI = next[pI - 1];
        } else if (str[sI] == pattern[pI]) {
            sI++;
            pI++;
        } else if (pI == 0) {
            sI++;
        } else {
            pI = next[pI - 1];
        }
    }
    if (pI == pattern.length())
        res.push_back(sI - n);
    return res;
}
```

## Reference

- [Knuth–Morris–Pratt algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
- [初學者學 KMP 演算法 | Yeefun](https://yeefun.github.io/kmp-algorithm-for-beginners/)
- [KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)

{{% footer %}}

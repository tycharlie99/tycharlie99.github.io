---
title: "[筆記] KMP 演算法"
description: "KMP 演算法學習筆記"
image: # "img/cover.webp"
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

## 問題

在一個字串 `str` 中，找到符合字串 `pattern` 的子字串，並回傳所有子字串的 index。

## 暴力解

在最直接的想法中，我們會從 `str` 的每一個字母開始往後比較，當後面每一個字母都與 `pattern` 中的字母一樣時，便將其記錄下來，如果遇到不一樣的字母時，便會將 `str` 的指標指向下一個字母，再將其與 `pattern` 中的字母比較。如此一來，此演算法的時間複雜度就會是 **O(m * n)** 。當字串 `str` 與 `pattern` 的長度增加時，就會增加尋找的時間，此演算法也會沒有效率。

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

## KMP 演算法

在原有的暴力解中，有什麼地方是我們可以改進的？當我們在發現下一個字母與 `str` 不一樣時，應該思考是否之前已經比對完的字串是否有可以繼續利用的地方。在 1977 年由 James H. Morris, Donald Knuth 與 Vaughan Pratt 三人發表了 Knuth-Morris-Pratt 演算法，簡稱 KMP 演算法。

### 核心理念

在 KMP 演算法中，主要的概念就是為 `pattern` 字串建立 LPS (Longest Proper Prefix which also a Suffix) 表格，當我們在比對時發現不一樣的字母，我們可以馬上找到下一個比較位置從 `pattern` 中的何處繼續比較即可，不用再重頭比較。

在下面的例子中，我們可以看到當比對到第六個 (0-index) 字母 `a` 時，發現 `pattern` 為 `f`，需要針對比較的 index 進行修正。

```
      x
abcabcasdasdf
abcabcf
```

在暴力解中我們會把 `str` 的起始 index 改為 1 (`b`) ，並從 `pattern` 的第一個字母開始比對，但其實我們可以發現不用移動 `str` 的指標只需將 `pattern` 的 index 改為第三個並繼續比較即可。

```
      ↓
abcabcasdasdf
   abcabc
```

為了可以快速找到當我們遇到不一樣的字母時需要將 index 調整的位置，我們需要建立 LPS 陣列，為所有 `pattern` 的 subpattern 找到。我們先以 `abvab` 為例，其 proper Prefix 有 `a`, `ab`, `abv` 以及 `abva`，其 Proper Suffix 有 `b`, `ab`, `vab` 以及 `bvab`，我們可以看到他的最大共有的字串為 `ab` 因此其 LPS 長度為 2。

### LPS 表格

我們在為 `pattern` 找到其 LPS 表格，有些人也稱 next 表格，其第一個 `lps[0]` 為 `0`。接著我們就可以開始為 `pattern` 建立 LPS 表格了。 

該如何為 `pattern` 建立 LPS 表呢？我們可以將 `pattern` 與自己比較，並記錄他。我們將以 `ababcababcabc` 為例進行 LPS 表格示範。在下面示範中，我需要先將 `lps[0]` 設為 `0`，並且開始與自己比較，我們可以發現在 index 為 2 (0-index) 時，可以有前後綴相同出現，當比較到 `c` 的時候，出現了不一樣，此時就要與已經比對的 `ab` 中尋找 LPS 值，可以發現字串 `pattern[1]` 的 LPS 值為 `0` ，因此我們將比較的 index 設為 `0` 繼續比較。

```
0012x
ababc
    ababcababcabc
```

經過比較後，發現 `pattern[4]` 與 `pattern[0]` 不一樣，因此繼續往後比較。

```
00120
ababc
    ababcababcabc
```

此時我們又再次遇到不一樣的地方，因此我們要比對 `lps[6]` 中的值，可以發現為 `2`，因此只要將比較的 index 設為 `2` 繼續比較即可。

```
001201234567x
ababcababcabc
     ababcababcabc
```

透過此方式將整個 `pattern` 比較完成後即可得到 `lps` 表為 `0012012345670`。

```
0012012345670
ababcababcabc
          ababcababcabc
```

因此我們可以總結以上建立 LPS 表格的步驟：
- `lps[0]` 為 `0`
- 將 `pattern` 與自己比較
    - 一樣時即增加 lps 值。
    - 不一樣時，查看已經建立的 lps 表，並且更新比較的 index ，繼續比較。

在下面的程式碼中 `idx` 為紀錄建立到哪個 `pattern` 的 lps，`len` 則為比較的 `index`。

時間複雜度為: **O(n)**

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

### 完整演算法

了解完成 lps 表格 (next 表格)，即可開始利用 lps 表格比較，當發現與 `str` 不同時，查詢 `lps` 值並且更新其 `idx` 並繼續比較。與 `str` 的比較之時間複雜度為 **O(m)**。

整體時間複雜度: **O(m + n)**

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

## 參考

- [Knuth–Morris–Pratt algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
- [初學者學 KMP 演算法 | Yeefun](https://yeefun.github.io/kmp-algorithm-for-beginners/)
- [KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)

{{% footer %}}

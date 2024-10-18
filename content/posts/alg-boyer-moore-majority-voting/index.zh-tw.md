---
title: "[筆記] Boyer-Moore Majority Voting"
description: "Boyer-Moore majority voting 演算法"
image: img/cover.webp
PublishDate: 2024-10-16
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
    - Boyer-Moore
    - voting
    - leetcode
    - algorithms
draft: false
---

# 問題

您可能會看到一些問題要求計算某人的選票**超過** 1/2 或 1/3。直覺的解決方案是為每個人計票。然而，空間複雜度將為 **O(N)**。是否有任何解決方案僅使用 **O(1)** 來解決空間複雜度？這將是 Boyer-Moore Majority Voting 演算法。

## 基本想法

如果我們知道至少有一個人獲得了 1/2、1/3 或 1/n 選票，我們可以刪除 n 張不同的選票，並且不會影響結果。

例如，我們有三個候選人 (A、B、C)，A 是獲得至少 1/2 選票的候選人。所以，我們可以去掉不同候選人的 2 張不同的選票，並且不會影響 A 至少有 1/n 選票。

- 刪除 (B, C): 不影響 A 超過 1/2 的票。這會讓A的百分比成長。
- 刪除 (A，C): 刪除最多的一個和另一的一個。不會影響 A 票數大於 1/2 的事實。
- 刪除 (A，B): 刪除最多的一個和另一的一個。不會影響 A 票數大於 1/2 的事實。

如上所述，當使用 Boyer-Moore majority voting 演算法時，我們需要找到 `n` 個不同的票並刪除或忽略它們。儲存 `n` 票僅花費 O(1) 空間。

以下程式碼計算得票數超過了 `floor(n/3)` 的候選人。這是來自 Leetcode 的問題 **[229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)**。

```cpp
vector<int> majorityElement(vector<int> &nums) {
    int x = 0, y = 0, cX = 0, cY = 0;

    for (const auto & n: nums) {
        if (n == x)
            cX++;
        else if (n == y)
            cY++;
        else if (cX == 0) {
            x = n;
            cX = 1;
        } else if (cY == 0) {
            y = n;
            cY = 1;
        } else {
            cX--;
            cY--;
        }
    }

    cX = 0;
    cY = 0;
    for (const auto & n: nums) {  
        if (n == x) 
            cX++;
        else if (n == y) 
            cY++;
    }

    vector<int> res;
    if (cX > nums.size() / 3) 
        res.push_back(x);
    if (cY > nums.size() / 3) 
        res.push_back(y);
    return res;
}
```



{{% footer %}}

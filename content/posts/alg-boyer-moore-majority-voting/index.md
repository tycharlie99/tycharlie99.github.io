---
title: "[Note] Boyer-Moore Majority Voting"
description: "The Boyer-Moore majority voting."
image: "img/cover.webp"
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

# Question

You may see some questions asking for counting the vote of someone is **over than** 1/2 or 1/3. The intuition solution is counting the votes for everyone. However, the space complexity will be **O(N)**. Is there have any solution only use the **O(1)** for space complexity? It will be the Boyer-Moore majority voting algorithms.

## Basic Idea

If we know there is at least one person who gets the 1/2, 1/3, or 1/n votes, we can remove n different votes, and it will not affect the result.

For example, we have three candidates (A, B, C), and A is the candidate who gets at least 1/2 vote. So, we can remove 2 different votes from different candidates, and it will not affect the A has at least 1/n votes.

- Remove (B, C): It will not affect that A is over 1/2. It will let A's percentage grow up.
- Remove (A, B): Remove one of the most one and one of the other. It will not affect the truth A is more than 1/2.
- Remove (A, C): Remove one of the most one and one of the other. It will not affect the truth A is more than 1/2.

As the metioned above, when using Boyer-Moore majority voting algorithms, we need to find the `n` of different and remove or ignore them. For storing the `n` votes only spends O(1) space.

The following code finds the votes are more than the `floor(n/3)` candidate. Also the question from Leetcode **[229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)**.

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

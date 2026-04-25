---
title: "Boyer-Moore Majority Voting"
description: "How the Boyer-Moore majority voting algorithm finds elements that appear more than n/2 or n/3 times."
publishedDate: 2024-10-16
categories: ["Algorithms"]
tags: ["LeetCode"]
keywords:
    - Boyer-Moore
    - voting
    - leetcode
    - algorithms
draft: false
---
The Boyer-Moore majority voting algorithm is a well-known algorithm used to find the majority element in an array. The majority element is defined as the element that appears more than `n/2` times in the array, where `n` is the size of the array. This algorithm can also be adapted to find elements that appear more than `n/k` times for any integer `k`.

## Question

You may see some questions asking whether someone's vote count is **more than** 1/2 or 1/3. The intuitive solution is counting the votes for everyone. However, the space complexity will be **O(N)**. Is there any solution that only uses **O(1)** space complexity? That is where the Boyer-Moore majority voting algorithm is useful.

## Basic Idea

If we know there is at least one person who gets the 1/2, 1/3, or 1/n votes, we can remove n different votes, and it will not affect the result.

For example, we have three candidates (A, B, C), and A is the candidate who gets at least 1/2 vote. So, we can remove 2 different votes from different candidates, and it will not affect the A has at least 1/n votes.

- Remove (B, C): It will not affect the fact that A is over 1/2. It will let A's percentage grow.
- Remove (A, B): Remove one of the most one and one of the other. It will not affect the truth A is more than 1/2.
- Remove (A, C): Remove one of the most one and one of the other. It will not affect the truth A is more than 1/2.

As mentioned above, when using Boyer-Moore majority voting algorithms, we need to find the `n` different votes and remove or ignore them. Storing these `n` votes only takes O(1) space.

The following code finds the votes are more than the `floor(n/3)` candidate. Also the question from Leetcode **[229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)**.

## Code

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

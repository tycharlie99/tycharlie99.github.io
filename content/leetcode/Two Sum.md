---
title: "1 Two Sum"
date: 2022-10-11T22:00:00+8:00
tags: ["cpp", "leetcode"]
---

## Problem Description

Gievn ab array of integers `nums` and the integer `target`, return indices of the two numbers such tahe add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Constraints

- 2 <= nums.length <= 10^2
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

## Solution in Cpp

Use the `unordered_map` to build the hash table which can use thge O(1) time to find the value. Therefore the total time will be O(N).

```cpp
class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    vector<int> ans;
    unordered_map<int, int> m;
    for(int i=0; i<nums.size(); i++){
      if(m.find(target-nums[i]) != m.end()){
        ans.push_back(i);
        ans.push_back(m[target-nums[i]]);
        return ans;
      }else{
        m[nums[i]]=i; // use the nums[i] be the key and index be the value 
      }
    }
    return ans;
  }
};
```

{{% footer %}}

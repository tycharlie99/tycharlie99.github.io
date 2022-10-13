---
title: "3 Longest Substring Without Repeating Characters"
date: 2022-10-13T23:23:00+8:00
tags: ["cpp", "leetcode"]
---

## Problem Description

Given a string s, find the length of the longest substring without repeating characters.

## Constraints

- 0 <= s.length <= 5 * 104
- `s` consists of English letters, digits, symbols and spaces.

## Solution

### Solution 1

We use the sliding window to get the longest substring. We have a right pointer and a left pointer. The right pointer will add the value of the specified word. If the value of the word is larger than one, it means we have the same character in our substring. Then we need the move the left pointer to short our substring until the substring does not have the same character.

```cpp
class Solution {
public:
  int lengthOfLongestSubstring(string s) {
    int store[256]={0};
    int l=0;
    int r=0;
    int ans=0;
    while(r<s.length()) {
      store[s[r]]++;
      while(store[s[r]]>1) { 
        store[s[l]]--;
        l++;
      }
      ans = max(ans,r-l+1);
      r++;
    }
    return ans;
  }
};
```

### Solution 2

Use the vector to store the substring we browse. And use the `find()` function to find whether the new character will include in the vector or not. If we find one, remove the found one with the previous substring. And try to get the most significant size of the vector.

```cpp
class Solution {
public:
  int lengthOfLongestSubstring(string s) {
    vector<char> ans;
    vector<char>::iterator p;
    int max = 0;
    for(int i=0; i<s.length(); i++){
      p = find(ans.begin(), ans.end(), s[i]);
      if(p != ans.end()){
        if(max < ans.size())
          max = ans.size();
        ans.erase(ans.begin(), p+1);
      }
      ans.push_back(s[i]);
    }
    return max<ans.size()?ans.size():max;
  }
};
```

{{% footer %}}

---
title: "[筆記] 判斷數字是否為 3 的倍數"
description: "判斷數字是否為 3 的倍數。"
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

# 問題

給訂一個整數，判斷是否為 3 的倍數。

## 利用除法和取模數

解決這個問題的簡單方法是使用 mod 檢查餘數。

- 時間複雜度: O(1)
- 空間複雜度: O(1)

```cpp
bool helper(int n) {
    return (n % 3) == 0;
}
```

## 不利用除法和取模數

有些問題要求你不要使用除法和取模來檢查數字。在計算機中，我們通常使用二進制來表示數字。所以，任何數字都可以表示為$\ 2^0 + 2^1 + 2^2 + 2^3 + ... + 2^n\ $。然後，我們可以將其更改為另一種表示數字的方式，例如下面的。

$$ 2^0 = 3 * 0 + 1 $$
$$ 2^1 = 3 * 1 - 1 $$
$$ 2^2 = 3 * 1 + 1 $$
$$ 2^3 = 3 * 2 - 1 $$

因此，如果我們要檢查這個數字是否是3的倍數，只需檢查奇數位置1的個數和偶數位置是否相同即可。

- 時間複雜度: O(logN)
- 空間複雜度: O(1)

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

---
title: "[筆記] 模運算"
description: "Clarify the modular arithmetic. Include modular multiplicative inverse."
image: img/cover.webp
PublishDate: 2024-10-19
LastMod: 
categories: ["Algorithms"]
tags: ["Note"]
keywords:
    - 模逆元
    - 模運算
    - 費馬小定理
    - modular arithmetic
    - modular
    - modular multiplicative inverse
    - Fermat's little theorem
draft: false
---

# 為什麼要取模

取模 (Modulus) 在程式設計與計算機科學中是一個很重要的概念，它的作用是計算兩個數相除後的餘數，取模可用來將數值限制在一個範圍內，並且可以縮小需要計算的範圍，可以大大減少計算量以及時間。

## 基本模運算

透過[同餘定理](https://zh.wikipedia.org/zh-tw/%E5%90%8C%E9%A4%98)，可以得知基本加、減、乘法的模運算。

$$ 如果\ A_0 \equiv A_1\ (mod\ m)\ 且\ B_0 \equiv B_1\ (mod\ m) $$
$$ A_0 + B_0 \equiv A_1 + B_1\ (mod\ m) $$
$$ A_0 - B_0 \equiv A_1 - B_1\ (mod\ m) $$
$$ A_0 * B_0 \equiv A_1 * B_1\ (mod\ m) $$

但在除法上，並無法透過上述的做法找到對應的關係，在除法上我們可以把它轉換成將某數乘上其倒數來使可以對其使用模運算。我們也稱其為**模導數**。

## 模倒數

$$ 如果 A * B \equiv 1\ (mod\ m)，即可稱\ B\ 為\ A\ 在模\ m\ 下的倒數。 $$
$$ A^{-1} \equiv B\ (mod\ m) $$ 

## 費馬小定理

在費馬小定理中，告訴我們假設 $\ a\ $ 為一個整數，$\ p\ $ 是一個質數，那麼 $\ a^p - a\ $ 是 $\ p\ $ 的倍數。

可表示為 $\ a^p \equiv a\ (mod\ p)\ $ ， 如果 $\ a\ $ 不為 $\ p\ $ 的倍數，可表示為 $\ a^{p-1} \equiv 1\ $ 。

在演算法題目中，通常會給一個值數 $\ p\ $，並且我們要找到 $\ a^{-1}\ $，因此將 $\ a^{p-1} \equiv 1\ $ 兩邊同乘 $\ a^{-1}\ $ 即為

$$ a^{p - 1} \equiv a^{-1} $$

因此 $\ a\ $ 的在模 p 倒數即為 $\ a^{p - 2}\ $。在 $\ p\ $ 為質數時，求 $\ a^{-1}\ $，則等價求 $\ a^{p - 2}\ $。

## LeetCode 應用

在 LeetCode 中，會利用排列組合公式計算出有多少結果，為了方便計算我們通常會先計算 $\ n!\ $ 和 $\ {n!}^{-1}\ $，因此如何計算 $\ {n!}^{-1}\ $就會是需要應用費馬小定理以及模倒數。通常在演算法題目中，為了縮小數字通常會要求取模 ($\ 10^9 + 7\ $)，因此我們在計算出 $\ n!\ $ 後即可利用其值計算 $\ {n!}^{10^9 + 7 - 2}\ $ 來找到 $\ {n!}^{-1} \$在模 $\ (10^9 +7)\ $ 之倒數。

{{% footer %}}

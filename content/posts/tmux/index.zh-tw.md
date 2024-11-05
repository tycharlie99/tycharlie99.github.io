---
title: "Tmux 筆記"
description:
image: "img/cover.webp"
PublishDate: 2024-11-04
LastMod: 
categories: ["Developing"]
tags: ["Note"]
keywords:
draft: false
---

# Tmux 筆記

在 Linux 中，tmux 可以幫助我們方便管理我們的視窗，並且不會因為跳出視窗而關閉正在執行的程式，可以很好的管理終端機。

在 tmux 中有 session、window 以及 pane 三個部分。一台 server 中可以有多個 session，一個 session 中可以有多個 windows，相同的一個 window 中可以有多個 panes。

在 tmux 中所有的指令都需要在 **prefix** 後加上特定按鍵來達成，預設的 prefix 為 `ctrl + b` 。

## Session

當執行 `tmux` 就會產生一個 Session，利用 `tmux ls` 可以查看現在正在執行的 tmux。找到要使用的 session 後可以使用 `tmux a -t <id>` 來使用存在的 session。

> 需要將上面的 <id> 改為要使用的 session 的編號

- prefix + `$`: 重新命名 session
- prefix + `d`: Detach 目前的 session
- prefix + `)`: 下一個 session
- prefix + `)`: 上一個 session

## Window

- prefox + `c`: 建立新的 window
- prefox + `n`: 下一個 window
- prefox + `p`: 上一個 window
- prefox + `&`: 關閉 window

## Pane

- prefix + `space`: 切換 pane 模式
- prefix + `"`: 新增水平切分的 pane
- prefix + `%`: 新增垂直切分的 pane
- prefix + `o`: 切換至下一個 pane
- prefix + `x`: 關閉 pane
- prefix + `[`: 進入複製模式，按 `space` 可以進行選取

## 設定

在 `~/.tmux.conf` 中可以放置自己的設定來自定義自己的 tmux。

{{% footer %}}

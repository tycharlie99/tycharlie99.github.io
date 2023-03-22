---
title: "Vim 初學者指南 (一)"
image: img/cover.jpg
PublishDate: 2023-03-21T00:00:00+08:00
LastMod: 
categories: ["Note"]
tags: ["Vim", "editor","教學"]
draft: false
---

身為一位軟體工程師，每個人都有自己習慣的編輯器像是 Vscode, Sublime Text, Notepad++ 等等，這些大家常用的編輯器通常都有使用者友善的圖形化介面，也因為各個開發者的努力，在大家常用的編輯器都有豐富的套件可以使用。不過大家可能在使用一些 UNIX-like 的 OS 都會接觸到的文字編輯器 "Vim" 也是本篇的主角。

第一次接觸到 Vim 的大家可能也跟我一樣，在鍵盤上亂按之後卻發現畫面一動也不動，或是不知道按到什麼見了才可以輸入，並會覺得這真是個難用的編輯器。但在常用的開發者中 Vim 可是大家很喜歡用的編輯器，熟悉他之後，不用使用滑鼠就可以在裡面快速地進行開發。如果你也想像電影中只需要在鍵盤上敲打，螢幕中的畫面就可以跟上腦中的想法的話，一定要學會 Vim 這個好用的編輯器。

除了會用 Vim 看起來很酷之外，在某些情況下像是 Linux Server 中，我們沒有 GUI 介面，只能透過輸入指令來控制 Server，Vim 就會成為我們好用的編輯器，透過輸入指令就可以完成我們想要的動作，接著我們就來看看身為 Vim 初學者，有哪些關於 Vim 的指令是必學的吧！

## Vim 的模式

在 Vim 中有四種不同的模式，分別為 **正常(Normal)**、**指令(Last Line)**、**輸入(Insert)**、**視覺 (Visual)**。接著我們繼續看看如何在不同的模式中切換，與在不同的模式中分別有什麼可以使用的指令。

### 正常模式 (Normal Mode)

當我們使用指令 `vim demo.txt` 開啟 `demo.txt` 文件後，首先會進入的就是 normal mode，在 normal mode 中我們可以透過按下 `i` 進入 insert mode，按下 `:` 進入 last line mode，按下 `v` 進入 visual mode。在不同的模式中要退出時只需要按下 `Esc` 即可退回 normal mode，唯獨在 Last Line mode 中，需要按下兩次的 `Esc` 才可以回到 normal mode。另外再切換不同的模式時，都需要先回到 normal mode 中，才有辦法可以切換到不同的模式。

在 normal mode 中也可以透過以下的指令對我們檔案中的內容進行編輯：

- 游標移動

    在除了 insert mode 中都可以透過 `h`, `j`, `k`, `l` 進行游標的移動
  - `h` 方向鍵-左
  - `j` 方向鍵-下
  - `k` 方向鍵-上
  - `l` 方向鍵-右
  - `{number}` 移動游標到該行第幾的字的地方
  - `$` 移動游標到該行最後一個字

- 文字編輯
  - `x`刪除游標上的字
  - `dd` 刪除游標該行
  - `{n}dd` 刪除游標該行後的 n 行，包含現在的那行
  - `yy` 複製游標該行
  - `{n}dd` 複製游標該行後的 n 行，包含現在的那行
  - `p` 將複製的內容貼上游標下面的那行
  - `P` 將複製的內容貼上游標上面的那行
  - `"` + `+` + `p` 將剪貼簿中 (register) 的資量快速貼上在游標處，適合大量的資料
  - `u` 回上一步
  - `Ctrl + r` 取消上一步的動作
  - `>>` 輸入 tab
  - `<<` 刪除 tab

- 搜尋
  - `/{target}` 在檔案中搜尋你要的 target
    - `n` 可以找到下一個相同的 target
    - `Shift + n` 可以找到上一個相同的 target

- 畫面分割
  - `Ctrl + w` `v` 將畫面垂直切分
  - `Ctrl + w` `s` 將畫面水平切分
  - `Ctrl + w`  `arrow key` 切換相對應的畫面
  - `Ctrl + w`  `+/-` 增加 / 減少畫面的高度
  - `Ctrl + w`  `>/<` 增加 / 減少畫面的寬度
  - `{number}` `Ctrl+w`  `|` 設定畫面高度
  - `{number}` `Ctrl+w`  `_` 設定畫面寬度
  - `Ctrl + w`  `=` 將所有畫面設定等高等寬

> {n} 須自行將其轉換成自己的內容

### 指令模式 (Last Line Mode)

在 last line mode 中，有許多好用的指令可以幫助我們設定我們的編輯器。當我們從 normal mode 按下 `:` 進入 last line mode 後，我們可以看到在編輯器的下方有可以如入指令的地方透過輸入相對的指令，即可設定我們的編輯器，以下就是一些常用的指令：

- 存擋
  - `q` 離開不儲存
  - `q!` 強制離開不除存
  - `e!` 強制離開並保留最後儲存的版本
  - `w` 存檔
  - `w!` 強制存擋
  - `w {name}` 存檔並將檔案命名
  - `wq` 儲存並離開
  - `wq!` 強制儲存並離開

- 搜尋並取代
  將 `g` 替換成 `gc` 可以在每一個取代前確認
  - `s/{target}/{replace}/g` 尋找該行中的 target 並取代為 replace
  - `%s/{target}/{replace}/g` 尋找檔案中的 target 並取代為 replace
  - `{n1},{n2}s/{target}/{replace}/g` 在 n1 到 n2 中尋找 target 並取代為 replace

- 移動游標
  - `{number}` 將游標移動到 number 行
  - `$` 將游標移動到最後一行

### 輸入模式 (Insert Mode)

在 insert mode 中，就是我們常見的編輯模式，在使用上跟一般的編輯器一樣，我們打什麼他就會出現什麼在我們要編輯的檔案當中。

### 視覺模式 (Visual Mode)

在 visaul mode 有兩種不同的模式，一種是在 normal mode 按下 `v` 進入的 visual mode，另一種是按下 `Ctrl + v` 進入的 block mode，在兩種模式下的差別只有 visual mode 中選擇的都是整行，在 block mode 可以用 block 的方式進行選取。

在進入該模式後，透過方向鍵選去要進行編輯的地方，接著就可以使用兩種模式中常用到的指令：

- `I` 會出現可以再選取的第一行進行編輯，完成後按下 `Esc` 即可對所有選去的地方完成一樣的編輯
- `x` 將選取的地方進行刪除

{{% footer-zh %}}

---
title: "Vim 學習筆記"
image: img/cover.jpg
PublishDate: 2023-03-21T00:00:00+08:00
LastMod: 2023-04-10T17:40:00+08:00
categories: ["Note"]
tags: ["Vim","教學"]
draft: false
---

身為一位軟體工程師，每個人都有自己習慣的編輯器像是 Vscode, Sublime Text, Notepad++ 等等，這些大家常用的編輯器通常都有使用者友善的圖形化介面，也因為各個開發者的努力，在大家常用的編輯器都有豐富的套件可以使用。不過大家可能在使用一些 UNIX-like 的 OS 都會接觸到的文字編輯器 "Vim" 也是本篇的主角。

第一次接觸到 Vim 的大家可能也跟我一樣，在鍵盤上亂按之後卻發現畫面一動也不動，或是不知道按到什麼見了才可以輸入，並會覺得這真是個難用的編輯器。但在常用的開發者中 Vim 可是大家很喜歡用的編輯器，熟悉他之後，不用使用滑鼠就可以在裡面快速地進行開發。如果你也想像電影中只需要在鍵盤上敲打，螢幕中的畫面就可以跟上腦中的想法的話，一定要學會 Vim 這個好用的編輯器。

除了會用 Vim 看起來很酷之外，在某些情況下像是 Linux Server 中，我們沒有 GUI 介面，只能透過輸入指令來控制 Server，Vim 就會成為我們好用的編輯器，透過輸入指令就可以完成我們想要的動作，接著我們就來看看身為 Vim 初學者，有哪些關於 Vim 的指令是必學的吧！

## Vim 的模式

在 Vim 中有四種不同的模式，分別為 **正常(Normal)**、**指令(Last Line)**、**輸入(Insert)**、**視覺 (Visual)**。接著我們繼續看看如何在不同的模式中切換，與在不同的模式中分別有什麼可以使用的指令。

### 正常模式 (Normal Mode)

當我們使用指令 `vim demo.txt` 開啟 `demo.txt` 文件後，首先會進入的就是 Normal mode，在 Normal mode 中我們可以透過按下 `i` 或是 `a` 進入 Insert mode，按下 `:` 進入 Last Line mode，按下 `v` 進入 Visual mode。在不同的模式中要退出時只需要按下 `Esc` 即可退回 Normal mode，唯獨在 Last Line mode 中，需要按下兩次的 `Esc` 才可以回到 Normal mode。另外再切換不同的模式時，都需要先回到 Normal mode 中，才有辦法可以切換到不同的模式。

在 Normal mode 中也可以透過以下的指令對我們檔案中的內容進行編輯：

- 游標移動

    在除了 Insert mode 中都可以透過 `h`, `j`, `k`, `l` 進行游標的移動
  - `h` 方向鍵-左
  - `j` 方向鍵-下
  - `k` 方向鍵-上
  - `l` 方向鍵-右

- 文字編輯
  - `i` 進入 Insert mode 並在游標之前
  - `a` 進入 Insert mode 並在游標之後
  - `o` 在該行的下方新增一行並進入 Insert mode
  - `O` 在該行的上方新增一行並進入 Insert mode
  - `x` 刪除游標上的字
  - `r {n}` 用接著輸入的字取代游標上的字
  - `dd` 刪除游標該行
  - `{n}dd` 刪除游標該行後的 n 行
  - `yy` 複製游標該行
  - `{n}yys` 複製游標該行後的 n 行
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
  - `Ctrl + w`  `+`/`-` 增加 / 減少畫面的高度
  - `Ctrl + w`  `>`/`<` 增加 / 減少畫面的寬度
  - `{number}` `Ctrl + w`  `|` 設定畫面高度
  - `{number}` `Ctrl + w`  `_` 設定畫面寬度
  - `Ctrl + w`  `=` 將所有畫面設定等高等寬

> 須自行將{}內的文字轉換成自己的內容

### 指令模式 (Last Line Mode)

在 Last Line mode 中，有許多好用的指令可以幫助我們設定我們的編輯器。當我們從 Normal mode 按下 `:` 進入 Last Line mode 後，我們可以看到在編輯器的下方有可以如入指令的地方透過輸入相對的指令，即可設定我們的編輯器，以下就是一些常用的指令：

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

在 Insert mode 中，就是我們常見的編輯模式，在使用上跟一般的編輯器一樣，我們打什麼他就會出現什麼在我們要編輯的檔案當中。

### 視覺模式 (Visual Mode)

在 Visual mode 有兩種不同的模式，一種是在 Normal mode 按下 `v` 進入的 Visual mode，另一種是按下 `Ctrl + v` 進入的 Block mode，在兩種模式下的差別只有 Visual mode 中選擇的都是整行，在 Block mode 可以用 Block 的方式進行選取。

在進入該模式後，透過方向鍵選去要進行編輯的地方，接著就可以使用兩種模式中常用到的指令：

- `I` 會出現可以再選取的第一行進行編輯，完成後按下 `Esc` 即可對所有選去的地方完成一樣的編輯
- `x` 將選取的地方進行刪除

## 設定你的 Vim

Vim 的預設設定非常簡單，可能務法滿足某些使用者的需求。但是 Vim 提供了靈活的設定功能，可以根據自己的喜好自定義其設置。接下來將介紹一些有用的 Vim 設定，可以提高使用體驗。

### 設定指令

在 Last Line mode 下，使用以下命令設定 Vim：

- `set number`: 顯示行號
- `set tabstop=2`: 將 tap 設定為 2 格的寬度
- `set shiftwidth=2`: 在括號中可以自動位移 2 格
- `set expandtab`: 將 tab 轉成空格
- `set autoindent`: 自動對齊
- `set cursorline`: 強調現在在的位置
- `set hlsearch`: 強調搜尋結果

### 快捷鍵

有些指令我們經常使用，但是很難記住或者輸入過於繁瑣。我們可以為命令設置快捷鍵，如下所示：

- `nnoremap <C-n> :NERDTreeToggle<CR>`: Control + n 觸發 NERDTreeToggle 指令
- `nnoremap <C-k> :tabnext<CR>`: Control + k 切換到下一個 tab

> 更詳細的內容請參考官方文件 [Vim documentation: map](https://vimdoc.sourceforge.net/htmldoc/map.html)

### 讓設定成為默認

在介紹了一些有用的配置指令後，你可能會發現，當重新打開 Vim 時，原本的配置並沒有被保存。這是因為 Vim 默認不會記住設置。為了保存配置，需要在 `home` 下創建一個 `.vimrc` 的文件。一旦啟動 Vim，它就會讀取 `.vimrc` 文件中的內容，並設置指定的配置。

要創建 `.vimrc` 文件，可以參考下面的範例，並添加一些自己喜歡的命令：

```bash
set number
set tabstop=2
set shiftwidth=2
set expandtab
set autoindent
set cursorline
set hlsearch
nnoremap <C-n> :NERDTreeToggle<CR>
nnoremap <C-k> :tabnext<CR>
```

{{% footer-zh %}}

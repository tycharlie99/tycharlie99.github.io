---
title: "Google 雲端硬碟下載檔案合併"
description: "如何處理從 Google Drive 下載的多個 zip 檔案。"
image: img/cover.webp
PublishDate: 2024-10-18
LastMod: 
categories: ["Tech"]
tags: ["Note"]
keywords:
    - Google Drive
    - download
    - merge
draft: false
---

# 從 Google 雲端硬碟下載多個文件

有時，我們想從 Google Drive 下載大檔案； Google 會將文件分成許多部分。將所有文件一一解壓縮並不是一件容易的事。這裡有一些方法可以幫助您加快這一過程。

## 使用 Google Drive Desktop

使用 Google Drive Desktop 可以使用複製和貼上的方式從 Google Drive 下載檔案。它不會壓縮您的文件，因此文件結構將與雲端相同。

## 使用腳本

您可以使用以下腳本將檔案解壓縮到目標資料夾中。

`ditto` 指令僅適用於 macOS 使用者。如果您使用的不是 macOS，請變更為 `unzip`。不幸的是，當路徑中有一些特殊單字時，它會遇到錯誤。如果有其他解決方案，我會更新文章。

- **ditto**:
    - `-V`: 為每個複製的檔案列印狀態行。
    - `-k`: 以 PKZip 格式建立檔案。
    - `-x`: 來源檔案是壓縮檔。
    - `--rsrc`:
- **unzip**:
    - `-d`: 將檔案解壓縮到目標資料夾中。

```bash
for compressed in {archive file prefix}*.zip
do
    # unzip "$compressed" -d {target folder} # for not macOS users, but it will fail when special char
    ditto -V -k -x --rsrc "$compressed" {target folder} # for macOS
done
```

> 請記住將 `{archive file prefix}` 更改為您的前綴，並確保將 `{target folder}` 更改為正確的路徑。

{{% footer %}}

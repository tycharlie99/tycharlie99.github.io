---
title: "Google Drive Downloaded Files Merge"
description: "How to deal with the multiple zip files downloaded from Google Drive."
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

# Download Multiple Files from Google Drive

Sometimes, we want to download large files from Google Drive; Google will divide the files into many parts. It isn't very easy to unzip all files one by one. Here are some methods for you to speed up the process.

## Using the Google Drive Desktop

Using the Google Drive Desktop you can copy and paste to download the files from Google Drive. It will not zip your files, so the file structure will same as the cloud.

## Use the Script

You can use the following script to unzip the file into the target folder.

The `ditto` command is only for macOS users. If you are not using macOS, please change to `unzip`. Unfortunately, it will meet an error when the path has some special word. I will update the post if there is another solution.

- **ditto**:
    - `-V`: print a status line for every file copied.
    - `-k`: create the archive in the PKZip format.
    - `-x`: src(s) are archives.
    - `--rsrc`:
- **unzip**:
    - `-d`: extract files into exdir.

```bash
for compressed in {archive file prefix}*.zip
do
    # unzip "$compressed" -d {target folder} # for not macOS users, but it will fail when special char
    ditto -V -k -x --rsrc "$compressed" {target folder} # for macOS
done
```

> Remember change `{archive file prefix}` to your prefix, and make sure the `{target folder}` is changed to correct path.

{{% footer %}}

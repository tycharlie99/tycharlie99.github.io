---
title: "Vim Tutorial"
image: img/cover.jpg
PublishDate: 2023-03-22T23:31:00+08:00
LastMod: 
categories: ["Note"]
tags: ["Vim","tutorial"]
draft: false
---

As a software engineer, everyone has their own preferred editor such as Vscode, Sublime Text, Notepad++, etc. These commonly used editors usually have user-friendly graphical interfaces and, thanks to the efforts of various developers, rich packages that can be used. However, "Vim", a text editor that most people will come across when using UNIX-like OS, is also the protagonist of this article.

The first time you encounter Vim, you may be like me, randomly pressing keys on the keyboard and finding that the screen doesn't move, or not knowing what you pressed to enable input, and you may think that this is a difficult editor to use. But among developers, Vim is a very popular editor that, once you are familiar with it, allows you to quickly develop without using a mouse. If you also want to be able to type on the keyboard and have the screen follow your thoughts, just like in the movies, you must learn Vim, this powerful editor.

In addition to looking cool when using Vim, in some situations such as on a Linux Server where there is no GUI interface, we can only control the server by entering commands, and Vim becomes our handy editor, allowing us to complete the actions we want by entering commands. So, let's take a look at the Vim commands that beginner Vim learners must learn!

## Mode in Vim

There are four different modes in Vim, namely **Normal**, **Last Line**, **Insert**, and **Visual**. Next, let's take a look at how to switch between these modes and what commands can be used in each mode.

### Normal Mode

When we use the command `vim demo.txt` to open the file `demo.txt`, we will first enter Normal mode. In Normal mode, we can enter Insert mode by pressing `i` or `a`, Last Line mode by pressing `:`, and Visual mode by pressing `v`. To exit different modes, simply press `Esc` to return to Normal mode, except for Last Line mode, which requires pressing `Esc` twice to return to Normal mode. Additionally, when switching between different modes, you need to return to Normal mode first before you can switch to a different mode.

In Normal mode, we can also use the following commands to edit the contents of our file:

- Cursor movement

    In Normal, Visual, and Command-Line mode, you can move the cursor using `h`, `j`, `k`, and `l`.

  - `h` left arrow key
  - `j` down arrow key
  - `k` up arrow key
  - `l` right arrow key

- Text editing
  - `i` enter Insert mode before the cursor.
  - `a` enter Insert mode after the cursor.
  - `o` insert a new line below the current line and enter Insert mode.
  - `O` insert a new line above the current line and enter Insert mode.
  - `x` delete the character under the cursor.
  - `r {n}` replace the character under the cursor with the next character typed.
  - `dd` delete the current line.
  - `{n}dd` delete n lines starting from the current line
  - `yy` yank (copy) the current line.
  - `{n}yys` yank (copy) n lines starting from the current line
  - `p` put (paste) the yanked line after the current line.
  - `P` put (paste) the yanked line before the current line.
  - `u` undo the previous action.
  - `Ctrl + r` redo the previously undone action.
  - `>>` enter a tab
  - `<<` remove a tab

- Search
  - `/{target}` search for the target in the file
    - `n` find the next occurrence of the target
    - `Shift + n` find the previous occurrence of the target

- Screen splitting
  - `Ctrl + w` `v` split the screen vertically
  - `Ctrl + w` `s` split the screen horizontally
  - `Ctrl + w` `arrow key` switch to the corresponding screen
  - `Ctrl + w` `+`/`-` increase/decrease the height of the screen
  - `Ctrl + w` `>`/`<` increase/decrease the width of the screen
  - `{number}` `Ctrl + w` `|` set the height of the screen
  - `{number}` `Ctrl + w` `_` set the width of the screen
  - `Ctrl + w` `=` make all screens equal in height and width

> You must convert the text inside {} into your own content

### Last Line Mode

In Last Line mode, there are many useful commands that can help us configure our text editor. When we press `:` in Normal mode to enter Last Line mode, we can see a place where we can enter commands at the bottom of the editor. By entering the appropriate commands, we can configure our editor. Here are some commonly used commands:

- Saving:
  - `q` quit without saving changes
  - `q!` force quit without saving changes
  - `e!` force quit and keep the latest saved version
  - `w` save changes
  - `w!` force save changes
  - `w {name}` save changes with a specific file name
  - `wq` save changes and quit
  - `wq!` force save changes and quit

- Search and Replace

    Replacing `g` with `gc` can be confirmed before each replacement.
  - `s/{target}/{replace}/g` looks for target in the current line and replaces it with replace.
  - `%s/{target}/{replace}/g` looks for target in the file and replaces it with replace.
  - `{n1},{n2}s/{target}/{replace}/g` looks for target and replaces it with replace between lines n1 and n2.

- Cursor movement
  - `{number}` move the cursor to the {number}-th character of the current line
  - `$` move the cursor to the last character of the current line

### Insert Mode

In Insert mode, which is the mode we commonly use for editing, usage is similar to other text editors. Whatever we type will appear in the file we are editing.

### Visual Mode

In Visual mode, there are two different modes. One is the visual mode entered by pressing `v` in normal mode, and the other is the block mode entered by pressing `Ctrl + v`. The difference between the two modes is that in visual mode, the entire line is selected, while in block mode, you can select text in a block-shaped manner.

After entering the desired mode, you can select the area to be edited using the arrow keys, and then use the commonly used commands in both modes:

- `I` you will be able to edit the first line of the selected area, and upon completion, pressing `Esc` will apply the same edit to all other selected areas.
- `x` delete the selected area

{{% footer %}}

---
title: "Vim Plugin Introduction"
description: "Intruducing the common vim plugin."
image: img/cover.webp
PublishDate: 2023-03-28
LastMod: 
categories: ["Vim"]
tags: ["Note"]
keywords:
    - vim
    - plugins
    - introduction
draft: false
aliases: ["/post/vim-plugin/"]
---

In some popular code editors, there are many useful plugins available that can significantly speed up the development process for developers. Vim editor also has a wide variety of plugins available. In this blog post, I will introduce how to use these plugins and share some of the most useful ones.

## Plugin Manager

Several popular plugin managers, including [`Pathogen`](https://github.com/tpope/vim-pathogen), [`Vundle`](https://github.com/VundleVim/Vundle.vim), and [`vim-plug`](https://github.com/junegunn/vim-plug), are widely used by many people. This post will focus on [`vim-plug`](https://github.com/junegunn/vim-plug), explaining how to install the plugin manager and utilize it to install the desired plugins.

### vim-plug

According to the user guide from the [`vim-plug`](https://github.com/junegunn/vim-plug), you can use the following command to install it. After running the command, you can see there will have file under the `~/.vim/autoload/`.

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

After successfully installing [`vim-plug`](https://github.com/junegunn/vim-plug), users can install their desired plugins using a command within vim. First, they need to add a script to their `.vimrc` file and specify which plugins they wish to install. Afterward, they can open vim and use the command `:PlugInstall` to install the specified plugins.

```bash
call plug#begin()

Plug <plugin name>

call plug#end()
```

> For more information you can see offical [example](https://github.com/junegunn/vim-plug#example).

### Vim Awesome

[Vim Awesome](https://vimawesome.com/) is a website where users can search for plugins and see their popularity, as measured by the number of stars and users on GitHub. Vim Awesome provides plugin descriptions and installation guides for each plugin manager.

![vimawesome](img/vimawesome.webp)

## Useful Plugin

In this section, I will introduce several plugins that I believe are useful and explain how to interact with them.

### NERDTree

[NERDTree](https://github.com/preservim/nerdtree) is a plugin that displays a file tree in the vim editor, providing users with a clear overview of their file system and facilitating navigation. Adding the following script to your `.vimrc` to install it.

```bash
Plug 'preservim/nerdtree'
```

Once NERDTree is installed, users can open vim in the terminal and enter the command `:NERDTree` to view the file tree. If the file tree appears as shown in the following image, it means that NERDTree has been successfully installed. Users can also use the `:NERDTreeToggle` command to toggle NERDTree, turning the file tree on or off.

![nerdtree](img/nerdtree.webp)

To open NERDTree, users typically need to use the `:NERDTreeToggle` command. However, there is a way to create a shortcut that simplifies the process. To create a shortcut for simplifying the process, users can add the following script to their `.vimrc` file. After adding this script to their `.vimrc` file, users can use `Ctrl + n` to toggle the file tree. Alternatively, users can modify the script according to their preferences.

```bash
nnoremap <C-n> :NERDTreeToggle<CR>
```

### nerdtree-git-plugin

Git is a version control tool that helps developers track changes to their code, particularly when collaborating with others. NERDTree also offers a plugin called [nerdtree-git-plugin](https://github.com/Xuyuanp/nerdtree-git-plugin), which enables users to easily identify whether a file has been edited or not. Adding the following script to your `.vimrc` to install it.

```bash
Plug 'Xuyuanp/nerdtree-git-plugin'
```

If a file in a user's folder has been edited, the plugin will display an icon on the folder, making it easy for users to manage their project and identify which files have been modified. The plugin adds a distinctive icon to the edited file in the folder tree, as shown in the following image. This feature makes it easy for users to quickly identify which files have been modified and manage their projects more efficiently.

![nerdtree-git-plugin](img/nerdtree-git-plugin.webp)

### vim-airline

When working with large files or projects, it's easy to get lost in the code. The [vim-airline](https://github.com/vim-airline/vim-airline) plugin can help you keep track of which file you are currently editing and your position within the file. This plugin improves code navigation and enables developers to quickly understand where they are in the project. Adding the following script to install the plugin.

```bash
Plug 'vim-airline/vim-airline'
```

After installing the plugin, when using Vim to open a file, users will see an "airline" display below the editor that provides information about the file, such as the current position in the file, file type, and git branch information. This can help developers quickly understand where they are in the project and easily navigate the file.

![vim-airline](img/vim-airline.webp)

### indentLine

For programming languages that contain nested loops or conditional statements, this plugin, called [indentLine](https://github.com/Yggdroot/indentLine), can help developers to easily understand which brackets the code belongs to, resulting in improved code readability and efficiency. Adding the following script to your `.vimrc` to install it.

```bash
Plug 'Yggdroot/indentLine'
```

After successfully installing the plugin, users can open files in vim and will see the indent lines displayed in the editor, which help to visually indicate the levels of nesting in the code like the following image. For more configuration please refer to the official user guide.

![indentLine](img/indentLine.webp)

{{% footer %}}

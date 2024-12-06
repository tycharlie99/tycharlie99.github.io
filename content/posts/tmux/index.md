---
title: "Tmux Note"
description:
image: "img/cover.webp"
PublishDate: 2024-11-04
LastMod: 
categories: ["Developing"]
tags: ["Note"]
keywords:
draft: false
---

# Tmux Notes

In Linux, tmux can help us manage our windows conveniently, and will not close the running program due to jumping out of the window, so it can manage the terminal well.

There are three parts in tmux: session, window and pane. There can be multiple sessions in a server, multiple windows in a session, and multiple panes in the same window.

All commands in tmux need to be completed by adding specific keys after **prefix**. The default prefix is `ctrl + b`.

## Session

When `tmux` is executed, a Session will be generated. You can use `tmux ls` to view the currently executing tmux. After finding the session you want to use, you can use `tmux a -t <id>` to use the existing session.

> You need to change the above <id> to the number of the session to be used

- prefix + `$`: rename session
- prefix + `d`: Detach the current session
- prefix + `)`: next session
- prefix + `)`: previous session

## Window

- prefox + `c`: create a new window
- prefox + `n`: next window
- prefox + `p`: previous window
- prefox + `&`: close window

## Pane

- prefix + `space`: switch pane mode
- prefix + `"`: Add horizontally split pane
- prefix + `%`: add vertically split pane
- prefix + `o`: switch to next pane
- prefix + `x`: close pane
- prefix + `[`: Enter copy mode, press `space` to select

## Settings

You can place your own settings in `~/.tmux.conf` to customize your own tmux.

{{% footer %}}

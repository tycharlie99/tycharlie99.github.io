---
title: "htop Cheat Sheet: System Monitoring & Troubleshooting"
description: "A concise reference for interpreting htop metrics, color codes, and shortcuts."
publishedDate: 2026-04-23
lastModified:
categories: ["Developing"]
tags: ["Linux"]
keywords:
    - htop
    - linux
draft: false
---
A concise reference for interpreting `htop` metrics, color codes, and shortcuts.

---

## 1. Essential Shortcuts

| Key | Action | Context |
| :--- | :--- | :--- |
| **F3 / F4** | **Search / Filter** | Locate specific processes (e.g., `python`, `node`). |
| **F5** | **Tree View** | Visualize parent-child process hierarchy. |
| **F6** | **Sort By** | Reorder by CPU%, MEM%, or PID. |
| **F7 / F8** | **Nice - / +** | Shift priority (Lower NI = Higher priority). |
| **F9** | **Kill** | Send signals (e.g., `SIGTERM`, `SIGKILL`). |
| **F10** | **Quit** | Exit htop. |

> **Note:** On macOS or laptops, use `Fn + Fx` or `Esc + [Number]` (e.g., `Esc + 3` for F3).

---

## 2. Meter Color Codes

### CPU Usage
- **Green (User)**: Standard user-space processes.
- **Red (Kernel)**: Kernel-level tasks (I/O, system calls, interrupts).
- **Blue (Nice)**: Low-priority tasks (will yield to standard processes).

### Memory (RAM)
- **Green**: Used memory (actually allocated by apps).
- **Blue (Buffers)**: Temporary storage for raw disk blocks.
- **Orange (Cache)**: Cached files to speed up disk reads.
> **Note:** High cache/buffer usage is expected behavior in Linux; it is released automatically when apps demand RAM.

---

## 3. Load & Tasks

### Tasks: `<tasks> / <threads> / <running>`
* **Tasks**: Total process count.
* **Threads**: Total execution threads.
* **Running**: Units currently using or waiting for a CPU core.

### Load Average (1 / 5 / 15 min)
* **How to read**: Compare values against your **logical CPU core count**.
* **Healthy**: Load < Core count.
* **Saturated**: Load ≥ Core count (processes are queuing for CPU time).

---

## 4. Process Columns

| Column | Full Name | Description |
| :--- | :--- | :--- |
| **PID** | Process ID | Unique system identifier. |
| **NI** | Nice Value | Priority offset (-20 to 19). |
| **VIRT** | Virtual Mem | Total mapped address space (includes shared libs). |
| **RES** | Resident Mem | **Physical RAM used**. The best indicator of actual memory footprint. |
| **S** | State | **R** (Running), **S** (Sleeping), **D** (Uninterruptible Sleep/Waiting for I/O). |

---

## 5. Quick Diagnostic Scenarios

* **High Load + Low CPU%**: Usually indicates an **I/O Bottleneck**. Check for processes in the **D state**.
* **Sustained Red CPU Bars**: Suggests excessive kernel overhead, driver issues, or high system call frequency.
* **Swap Usage Increasing**: Physical RAM is exhausted. System performance will degrade due to disk latency.
* **Shifting PIDs**: If a process PID changes constantly, the service is likely crashing and restarting in a loop.

---
**Config:** `~/.config/htop/htoprc`

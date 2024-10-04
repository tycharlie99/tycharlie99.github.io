---
title: "[筆記] WebRTC 影像串流"
description: "WebRTC 影像串流平台筆記"
image: img/cover.webp
PublishDate: 2024-04-25
LastMod:
categories: ["Programming"]
tags: ["Note"]
keywords:
  - WebRTC
  - RTC
  - Socket
  - 串流
draft: false
---

## WebRTC

WebRTC 全名為 Web Real-Time Communication，是一個 Google 在 2011 開源的專案，獲得 Apple、Google、Microsoft 與 Mozilla 等的支援，提供瀏覽器即時語音以及視訊的 API (Applicatino Programming Interface)，透過 P2P (peer-to-peer) 的方式進行連線 。

### 常用的 API

在 WebRTC API 中包含了兩個最重要的部分，一個為媒體擷取跟點對點連線 (peer-to-peer connection)。

- getUserMedia:

    透過 getUserMedia 來擷取相機以及麥克風的媒體流 (MediaStreams)，並可以根據不同需求設定對於媒體流的限制。

```javascript 
    // set the constraints for the user media
    const constraints = window.constraints = {
        audio: true,
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .than((stream) => {
        console.log('Got MediaStream:', stream);
    })
    .catch((err) => {
        console.error('Error accessing media devices.', error);
    });
```

- RTCPeerConnection:

  在現今的網路環境，因為固定 IP 資源較為有限，因此許多人都是使用虛擬 IP 在進行上網，為了使雙訪可以進行點對點連線，就需要有 NAT 打洞技術。
  常見的有：
  - STUN (Simple Traversla of UDP Through NAT): 透過 UDP 進行 NAT 打洞，僅需要向 STUN server 進行詢問，即可得知自己的 NAT 資訊。
  - TURN (Traversal Using Relays around NAT): 在無透過 STUN 得知自己位置時，需要靠 TURN server 幫我們進行資料的轉發來進行連線。

    在 WebRTC 中，是使用 ICE (Interactive Connectivity Establishment) server 來幫我們完成以上兩種協定，透過 ICE 的方式，會幫我們先使用 STUN 方式嘗試獲得自己的資訊，如果無法獲取時，會使用 TURN 的方式進行連線。

```javascript 
const configuration = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
        {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
        },
    ],
};
const peerConnection = new RTCPeerConnection(configuration);
```

## Socket

在以往的 API 輪詢 (Polling) 方式下，需要持續詢問 server 是否有新的訊息，會導致大量佔用網路資源也沒有效率，因此有了 WebSocket ，只要在一開始將 client 與 server 進行連線，即可實現即時的雙向溝通。

## 程式碼

[github](https://github.com/jkcharlie6679/WebRTC)

### Reference

[WebRTC](https://webrtc.org)

{{% footer %}}


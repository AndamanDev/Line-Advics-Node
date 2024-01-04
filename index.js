const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios").default;
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const app = express();
const PORT = process.env.PORT || 4000;

const lineConfig = {
  channelAccessToken:
    "37vAy1tI5xYwMV/B5dqYYrj/GQOeAMOPMSdvI7x8gFT+K0QI4hpUbM00Am7QbpkPGOMytOLoA3XfPuc4cUGeQXmqhnsKErRJIzohOAFVI36067hsjRpWwWPYtq014lJZGjKrLCIy48Zf8FBoJfoftAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "57b3953866699e1f4ad136d1b8e6ddb7",
};

const client = new line.Client(lineConfig);

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log("event=>>>", events);
    return events.length > 0
      ? await events.map((item) => handleEvent(item))
      : res.status(200).send("ok");
  } catch (error) {
    res.status(500).end();
  }
});

const handleEvent = async (event) => {
  // ส่งข้อความไปยังผู้ใช้
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: "กรุณารอเจ้าหน้าที่ตอบกลับ 5555555555555",
  });

  // ส่ง Line UID กลับมา
  const userId = event.source.userId;
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: `Line UID ของคุณคือ: ${userId}`,
  });
};

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

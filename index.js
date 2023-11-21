const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios").default;
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const app = express();

const lineConfig = {
  channelAccessToken:
    "9Ds7R0I1pKSkab037oxEbuAL+eb7gcgdssusMAtgBWlFTt73hErS2OeRBT1HRLEVGOMytOLoA3XfPuc4cUGeQXmqhnsKErRJIzohOAFVI36Z923KQDV/pQ3Ko6A4llWNL2mZIzmmxnHti6n359HB5wdB04t89/1O/w1cDnyilFU=",
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
  if (event.message.text === "พนักงาน Advisc") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "กำลัลงลิงก์ไปยัง หน้า Advics",
    });
  } else if (event.message.text === "ผู้มาติดต่อ") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "กำลังส่งไปยังลิงก์ปลายทาง",
    });
  }
};

app.listen(8080, () => {
  console.log("listening on 8080");
});

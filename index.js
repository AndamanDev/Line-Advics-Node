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
  if (
    event.message.text === "พนักงาน Advisc" ||
    event.message.text === "ผู้มาติดต่อ" ||
    event.message.text === "บันทึกน้ดหมาย"
  ) {
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
    } else if (event.message.text === "บันทึกน้ดหมาย") {
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "บันทึกน้ดหมาย",
      });
    }
  } else {
    // Send Flex Message
    const flexMessage = {
      type: "flex",
      altText: "This is a Flex Message",
      contents: {
        type: "carousel",
        contents: [
          {
            type: "bubble",
            body: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  wrap: true,
                },
              ],
            },
            footer: {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "button",
                  style: "primary",
                  action: {
                    type: "uri",
                    label: "Go",
                    uri: "https://example.com",
                  },
                },
              ],
            },
          },
        ],
      },
    };

    // Send the Flex Message
    return client.replyMessage(event.replyToken, flexMessage);
  }
};

// ตัวอย่างการใช้งาน
const event = {
  message: {
    text: "คำที่ไม่ตรงเงื่อนไข",
  },
  replyToken: "reply_token_here",
  source: {
    userId: "user_id_here",
  },
};

handleEvent(event);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

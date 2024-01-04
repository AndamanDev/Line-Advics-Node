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

// const handleEvent = async (event) => {
//   const flexMessage = {
//     type: "flex",
//     altText: "This is a Flex Message",
//     contents: {
//       type: "bubble",
//       body: {
//         type: "box",
//         layout: "vertical",
//         contents: [
//           {
//             type: "text",
//             text: "คุณต้องการนัดหมายหรือไม่?",
//             wrap: true,
//           },
//         ],
//       },
//       footer: {
//         type: "box",
//         layout: "horizontal",
//         contents: [
//           {
//             type: "button",
//             style: "primary",
//             action: {
//               type: "uri",
//               label: "นัดหมาย",
//               uri: `https://advicsvms.andamandev.com/api/v1/apt/go-to-apt?user_line_id=${userId}`,
//             },
//           },
//         ],
//       },
//     },
//   };
//   return client.replyMessage(event.replyToken, flexMessage);
// };

const handleEvent = async (event) => {
  const receivedText = event.message.text;

  let flexMessage;

  if (receivedText === "บันทึกนัดหมาย") {
    flexMessage = {
      type: "flex",
      altText: "This is a Flex Message for Appointment",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "คุณต้องการนัดหมายหรือไม่?",
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
                label: "นัดหมาย",
                uri: `https://advicsvms.andamandev.com/api/v1/apt/go-to-apt?user_line_id=${userId}`,
              },
            },
          ],
        },
      },
    };
  } else if (receivedText === "ข้อมูลส่วนตัว") {
    flexMessage = {
      type: "text",
      text: "ขอโทษครับ/ค่ะ ไม่เข้าใจคำสั่งที่ระบุ",
    };
  } else {
    flexMessage = {
      type: "text",
      text: "ขอโทษครับ/ค่ะ ไม่เข้าใจคำสั่งที่ระบุ",
    };
  }

  return client.replyMessage(event.replyToken, flexMessage);
};

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

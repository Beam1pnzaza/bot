const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  "Authorization": "Bearer EIR08pFSF9zXVLg2JMQKv+aMtG4juIIN69mleotJmXZfhJmw59zuvaaibC0bg98eBit+eFFCzFqJtLk3WaSZll/DnucF00q9Kc1AvWoYVJn3K/yFKTXdeZRy8fTg6V79fzkUzaqoApkTDvcaoeBKDQdB04t89/1O/w1cDnyilFU=",
};

exports.LineBotBroadcast = functions.https.onRequest((req, res) => {
  const text = req.query.text;
  if (text !== undefined && text.trim() !== "") {
    return broadcast(res, text);
  } else {
    const ret = {message: "Text not found"};
    return res.status(400).send(ret);
  }
});

const broadcast = (res, msg) => {
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/broadcast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      messages: [
        {
          type: "text",
          text: msg,
        },
      ],
    }),
  }).then(() => {
    const ret = {message: "Done"};
    return res.status(200).send(ret);
  }).catch((error) => {
    const ret = {message: `Sending error: ${error}`};
    return res.status(500).send(ret);
  });
};
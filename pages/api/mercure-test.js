const http = require("http");
const querystring = require("querystring");

export default async function handler(req, res) {
  const JWT = process.env.JWT;
  const topic = "https://intro-mercure.test/users/chat";
  const postData = querystring.stringify({
    topic,
    data: JSON.stringify({ foo: "updated value" }),
  });

  const sender = http.request({
    href: "https://localhost/.well-known/mercure",

    port: "3000",
    path: "/.well-known/mercure",
    method: "POST",
    headers: {
      Authorization: "Bearer " + JWT,
      // the JWT must have a mercure.publish key containing an array of topic selectors (can contain "*" for all topics, and be empty for public updates)
      // the JWT key must be shared between the hub and the server
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  });
  sender.write(postData);
  sender.end();
  res.send("ok");
}

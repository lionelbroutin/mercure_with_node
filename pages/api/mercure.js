// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
const https = require("https");

export default async function handler(req, res) {
  const { message, topic } = req.body;

  const JWT = process.env.JWT;
  /*  const topic = "https://intro-mercure.test/users/chat"; */
  const baseURL = "https://localhost/.well-known/mercure";
  const url = baseURL + "&topic=" + topic;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  /*   const params = { topic, data: { message: "super !!" } }; */
  const params = new URLSearchParams();
  params.append("topic", topic);
  params.append("data", JSON.stringify({ message: message }));

  axios.defaults.httpsAgent = httpsAgent;

  const result = await axios
    .post(baseURL, params, {
      headers: {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        Connection: "keep-alive",
      },
    })
    .then(resp => {
      /* console.log(resp.data); */

      res.send(resp.data);
    });
}

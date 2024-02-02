const express = require('express')

const PORT = process.env.PORT || 1337

const app =  express(PORT)

app.get("/", (req, res) => {
  res.end("HEllO")
})

app.post("/webhook", (req, res) => {
  let body = req.body

  console.log(`\u{1F7EA} Received webhook: `)
  console.dir(body, { depth: null })

  if (body.object === "page") {
    res.status(200).send("EVENT_RECEIVED")
  } else {
    res.sendStatus(404)
  }
})

// Add support for GET requests to our webhook
app.get("/messaging-webhook", (req, res) => {
  // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    const verifyToken = "wagashipets"
  
    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === "subscribe" && token === verifyToken) {
        // Respond with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    } else {
      res.end("TEST");
    }
  });


app.listen(PORT)
console.log(`Server listening on port http://localhost:${PORT}`)
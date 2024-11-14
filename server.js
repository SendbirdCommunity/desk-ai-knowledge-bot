const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.options("*", cors());

app.use(express.json());


app.get('*/aibot', async (req, res) => {
    console.log("working");

    // Retrieve headers and query parameters
    let xSignature = req.headers["x-secret-key"];
    console.log(xSignature)
    const agent_id = req.query.agent_id;
    const html_key = req.query.html_key;
    const app_id = req.originalUrl.split("/")[1];
    const botId = "YOUR_SENBIRD_AI_CHATBOT_ID"
    if (xSignature === 'YOUR_SENDBIRD_DESK_SECRET_KEY') {
        res.send(`
       <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>chatbot</title>

            <!-- Load React first and then, ReactDOM. Also, these two libs' version should be same -->
            <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>

            <!-- Load chat-ai-widget script and set process.env to prevent it get undefined -->
            <script>process = { env: { NODE_ENV: '' } }</script>
            <script crossorigin src="https://unpkg.com/@sendbird/chat-ai-widget@latest/dist/index.umd.js"></script>
            <link href="https://unpkg.com/@sendbird/chat-ai-widget@latest/dist/style.css" rel="stylesheet" />

            <!--Optional; to enable JSX syntax-->
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
                html,body { height:100% }
                #aichatbot-widget-close-icon { display: none }
            </style>
          </head>
          <body>
            <!-- div element for chat-ai-widget container -->
            <div id="root"></div>

            <!-- Initialize chat-ai-widget and render the widget component -->
            <script type="text/babel">
                const { ChatWindow } = window.ChatAiWidget
                const App = () => {
                    return (
                        <ChatWindow
                            applicationId="${app_id}"
                            botId="${botId}"
                        />
                    )
                }
                ReactDOM.createRoot(document.querySelector('#root')).render(<App/>);
            </script>
          </body>
        </html>
        `);
    } else if (!xSignature) {
        res.status(400).send("Error: Missing 'x-secret-key' header!");
    } else {
        res.status(403).send("Not Authorized");
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

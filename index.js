const server = require("./server");
const { connectDB } = require("./config/db");
connectDB();

const port = process.env.PORT || 3000;
const startServer = () => {
    server.listen(port, () => {
        console.log("Starting server on port " + port);
    });
};
startServer();
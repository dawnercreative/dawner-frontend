// submission-created.js
exports.handler = async (event, context) => {
    console.log("log from submission-created.js")
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello, World" }),
    };
};

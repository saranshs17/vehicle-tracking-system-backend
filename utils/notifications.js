const admin = require("../config/firebase");

const sendNotification = async (token, title, body) => {
    try {
        const message = { notification: { title, body }, token };
        await admin.messaging().send(message);
        console.log("✅ Notification Sent");
    } catch (error) {
        console.error("❌ Error Sending Notification:", error);
    }
};

module.exports = { sendNotification };

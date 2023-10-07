const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connect = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connect.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, bindingKey) => {
  try {
    const appQueue = await channel.assertQueue("QUEUE_NAME");

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, bindingKey);

    channel.consume(appQueue.queue, (msg) => {
      console.log("Data Receive");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, bindingKey, message) => {
  try {
    await channel.assertQueue("QUEUE_NAME");
    await channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};

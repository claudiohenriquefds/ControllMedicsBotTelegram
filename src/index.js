const TelegramBot = require('node-telegram-bot-api');
const enviroment = require('../enviroment');

const bot = new TelegramBot (enviroment.token(), {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    
    bot.sendMessage(chatId, resp);
});
    
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, 'Received your message');
    console.log(msg.text);
});
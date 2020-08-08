const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api');
const enviroment = require('./enviroment');



const bot = new telegramBot (enviroment.token(), {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    
    bot.sendMessage(chatId, resp);
});
    
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    

    if(msg.text == 'Teste'){
        bot.sendMessage(chatId, 'Beleza de teste');
    }else{
        bot.sendMessage(chatId, 'Ainda não sei o que isso significa');
    }
});

app.listen(3333);
const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api');
const enviroment = require('./enviroment');
const connection = require('./src/database/connection.js');

const bot = new telegramBot (enviroment.token(), {polling: true});
bot.onText(/\/start/, async msg => {
    const user_id = msg.chat.id;

    await connection('users').insert({
        user_id,
    });
});

bot.onText(/\/addmedicine (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    let text = [];

    if(resp.includes('-')){
        text = resp.split('-');
    }

    const medicine = text[0];
    const amount = parseInt(text[1]);
    
    await connection('medicines').insert({
        medicine,
        amount,
    });
    console.log(chatId);

    bot.sendMessage(chatId,'Medicamento cadastrado com sucesso !');    
});

app.listen(3333);
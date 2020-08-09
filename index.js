const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api');
const enviroment = require('./enviroment');
const connection = require('./src/database/connection.js');

const bot = new telegramBot (enviroment.token(), {polling: true});

bot.onText(/\/start/, async msg => {
    const user_id = msg.chat.id;

    if(await connection('users').where('user_id',user_id).first()){
        bot.sendMessage(user_id, 'Usuário já está cadastrado');
    }else{
        if(await connection('users').insert({
            user_id,
        })){
            bot.sendMessage(user_id, 'Seja Bem vindo ao sistema');
        }else{
            bot.sendMessage(user_id, 'Algo deu errado, tente novamente');
        }
    }

});

bot.onText(/\/addmedicine (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    let text = [];    

    if(resp.includes('-')){
        text = resp.split('-');
    }
    const user_id = (await connection('users').where('user_id',chatId).first()).id;


    const medicine = text[0];
    const amount = parseInt(text[1]);
    
    const medicines = (await connection('medicines').insert({
        user_id,
        medicine,
        amount,
    }));

    if(medicines){
        bot.sendMessage(chatId,'Medicamento cadastrado com sucesso !');    
    }else{
        bot.sendMessage(chatId,'Algo deu errado, o medicamento não foi cadastrado');    
    }

});
bot.onText(/\/renewmedicine (.+)/, async (msg,match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    const user_id = (await connection('users').where('user_id',chatId).first()).id;
    let text = [];

    if(resp.includes('-')){
        text = resp.split('-');
    }

    const medicine = (await connection('medicines').where('medicine',text[0]).andWhere('user_id',user_id).update({amount: text[1]}));

    if(medicine){
       bot.sendMessage(chatId,`O medicamento ${text[0]} foi atualizado com sucesso!`);  
    }else{
        bot.sendMessage(chatId,'Algo deu errado, tente novamente');  
    }
});
bot.onText(/\/removemedicine (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    const user_id = (await connection('users').where('user_id',chatId).first()).id;

    const removemedicine = (await connection('medicines').where('medicine',resp).andWhere('user_id', user_id).del());

    if(removemedicine){
        bot.sendMessage(chatId,`O medicamento ${resp} foi removido com sucesso!`);  
    }else{
        bot.sendMessage(chatId,'Algo deu errado, tente novamente mais tarde');  
    }
});
bot.onText(/\/listmedicines/, async (msg) => {
    const chatId = msg.chat.id;
    const user_id = (await connection('users').where('user_id',chatId).first()).id;
    let med = `Lista de medicamentos:\n---------------------------------------\n`;
    const medicines = (await connection('medicines').where('user_id',user_id).select('medicine','amount'));

    medicines.forEach(element => {
        med += `Medicamento:        ${element.medicine}\nQuantidade:           ${element.amount}\n---------------------------------------\n`
    });

    bot.sendMessage(chatId,med);  
});
app.listen(3333);
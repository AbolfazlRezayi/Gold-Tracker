from telebot import TeleBot, types

BOT_TOKEN = "TOKEN_HERE"
WEB_APP_URL = "https://YOUR_DOMAIN:2083"

bot = TeleBot(BOT_TOKEN, parse_mode=None)

@bot.message_handler(commands=['start'])
def send_welcome(msg: types.Message):
    webapp_info = types.WebAppInfo(url=WEB_APP_URL)
    Button = types.InlineKeyboardButton(text="🤔 چنده؟ 🤔", web_app=webapp_info)
    Keyboard = types.InlineKeyboardMarkup().add(Button)
    bot.send_message(chat_id=msg.chat.id, text="<b>👨🏻‍💻 برای مشاهده قیمت (طلا، دلار، یورو و...) کلیک کنید.</b>", parse_mode='html', reply_markup=Keyboard)

if __name__ == "__main__":
    print("Bot is running (press Ctrl+C to stop)...")
    bot.infinity_polling(timeout=60, long_polling_timeout=120)

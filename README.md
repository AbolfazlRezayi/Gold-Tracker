# 🏆 Gold Tracker - ردیاب قیمت طلا و ارز

یک اپلیکیشن وب پیشرفته برای ردیابی لحظه‌ای قیمت طلا، دلار، یورو و سایر ارزها با قابلیت ربات تلگرام و رابط کاربری مدرن.

## فهرست مطالب

- [معرفی پروژه](#معرفی-پروژه)
- [ویژگی‌ها](#ویژگی‌ها)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [تنظیمات پروژه](#تنظیمات-پروژه)
- [مستندات API](#مستندات-api)
- [استفاده از ربات تلگرام](#استفاده-از-ربات-تلگرام)
- [ساختار پروژه](#ساختار-پروژه)
- [مشکلات رایج](#مشکلات-رایج)
- [مشارکت در پروژه](#مشارکت-در-پروژه)

## معرفی پروژه

**Gold Tracker** یک سیستم جامع برای ردیابی قیمت‌های لحظه‌ای طلا و ارزهای مختلف است که شامل:

- **Frontend**: رابط کاربری React با طراحی مدرن و ریسپانسیو
- **Backend**: API Flask با قابلیت‌های پیشرفته
- **Telegram Bot**: ربات تلگرام برای دسترسی آسان
- **Real-time Data**: دریافت داده‌های لحظه‌ای از منابع معتبر

### منابع داده

- **قیمت طلا**: [تجهیزات جی‌یو](https://www.tgju.org/profile/geram18)
- **قیمت دلار/تتر**: [آرزدیجیتال](https://arzdigital.com/coins/tether/)
- **قیمت یورو**: [تجهیزات جی‌یو](https://www.tgju.org/profile/price_eur)

## ✨ ویژگی‌ها

### رابط کاربری
- **طراحی مدرن**: رابط کاربری زیبا و کاربرپسند
- **حالت تاریک/روشن**: قابلیت تغییر تم
- **ریسپانسیو**: سازگار با تمام دستگاه‌ها
- **RTL Support**: پشتیبانی کامل از راست به چپ
- **PWA Ready**: آماده برای تبدیل به اپلیکیشن موبایل

### عملکرد
- **بروزرسانی دستی**: کنترل کامل بر زمان بروزرسانی
- **Error Handling**: مدیریت خطاهای پیشرفته
- **Performance Monitoring**: نظارت بر عملکرد
- **Timeout Protection**: محافظت در برابر درخواست‌های طولانی

### ربات تلگرام
- **دستورات ساده**: `/start` برای شروع
- **Web App Integration**: اتصال مستقیم به اپلیکیشن وب
- **User-friendly**: رابط کاربری آسان

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

```bash
# Python 3.8+
python --version

# Node.js 16+
node --version

# Git
git --version
```

### 1️⃣ کلون کردن پروژه

```bash
git clone https://github.com/AbolfazlRezayi/gold-tracker.git
cd gold-tracker
```

### 2️⃣ نصب وابستگی‌های Backend

```bash
# ایجاد محیط مجازی
python -m venv venv

# فعال‌سازی محیط مجازی (Windows)
venv\Scripts\activate

# فعال‌سازی محیط مجازی (Linux/Mac)
source venv/bin/activate

# نصب وابستگی‌ها
pip install -r requirements.txt
```

### 3️⃣ نصب وابستگی‌های Frontend

```bash
# نصب Node.js dependencies
npm install

# یا با Yarn
yarn install
```

### 4️⃣ ساخت Frontend

```bash
# ساخت پروژه React
npm run build

# یا با Yarn
yarn build
```

### 5️⃣ راه‌اندازی سرویس‌ها

#### Backend (Terminal 1):
```bash
python api.py
```

#### Telegram Bot (Terminal 2):
```bash
python bot.py
```

### 6️⃣ دسترسی به اپلیکیشن

- **وب اپلیکیشن**: `https://localhost:2083`
- **API**: `https://localhost:2083/prices`

## ⚙️ تنظیمات پروژه

### 1️⃣ تنظیم فایل `api.py`

در فایل `api.py` مقادیر زیر را تغییر دهید:

```python
# خط 143-146: تنظیم مسیر گواهی SSL
context.load_cert_chain(
    certfile='/etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem',  # دامنه خود را جایگزین کنید
    keyfile='/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem'      # دامنه خود را جایگزین کنید
)

# خط 147: تنظیم حالت debug
app.run(debug=False, host="0.0.0.0", port=2083, ssl_context=context)
```

### 2️⃣ تنظیم فایل `bot.py`

در فایل `bot.py` مقادیر زیر را تغییر دهید:

```python
# خط 3: توکن ربات تلگرام
BOT_TOKEN = "TOKEN_HERE"  # توکن ربات خود را از @BotFather دریافت کنید

# خط 4: آدرس وب اپلیکیشن
WEB_APP_URL = "https://YOUR_DOMAIN:2083"  # دامنه خود را جایگزین کنید
```

### 3️⃣ تنظیم فایل `gold.js`

در فایل `gold.js` مقادیر زیر را تغییر دهید:

```javascript
// خط 44: آدرس API
const res = await fetch("https://YOUR_DOMAIN:2083/prices");  // دامنه خود را جایگزین کنید
```

### 4️⃣ تنظیم SSL (اختیاری)

برای استفاده در production، گواهی SSL تنظیم کنید:

```bash
# نصب certbot
sudo apt install certbot

# دریافت گواهی SSL
sudo certbot certonly --standalone -d yourdomain.com

# تنظیم مسیر گواهی در api.py
certfile='/etc/letsencrypt/live/yourdomain.com/fullchain.pem'
keyfile='/etc/letsencrypt/live/yourdomain.com/privkey.pem'
```

## 📚 مستندات API

### Endpoints

#### `GET /prices`
دریافت تمام قیمت‌ها

**Response:**
```json
{
  "gold_price": 1500000,
  "usd_price": 45000,
  "euro_price": 48000,
  "time": "2024-01-15 14:30:25",
  "timestamp": 1705312225,
  "jtime": "1402-10-25 14:30:25"
}
```

#### `GET /gold_price`
دریافت قیمت طلا

**Response:**
```json
{
  "gold_price": 1500000,
  "time": "2024-01-15 14:30:25",
  "timestamp": 1705312225,
  "jtime": "1402-10-25 14:30:25"
}
```

#### `GET /usd_price`
دریافت قیمت دلار

#### `GET /euro_price`
دریافت قیمت یورو

### Error Handling

```json
{
  "gold_error": "Gold price not found",
  "usd_error": "USD price not found",
  "euro_error": "Euro price not found"
}
```

### مثال‌های استفاده

#### JavaScript (Fetch)
```javascript
// دریافت تمام قیمت‌ها
fetch('https://yourdomain.com:2083/prices')
  .then(response => response.json())
  .then(data => {
    console.log('قیمت طلا:', data.gold_price);
    console.log('قیمت دلار:', data.usd_price);
    console.log('قیمت یورو:', data.euro_price);
  })
  .catch(error => {
    console.error('خطا:', error);
  });
```

#### Python (Requests)
```python
import requests

# دریافت تمام قیمت‌ها
response = requests.get('https://yourdomain.com:2083/prices')
data = response.json()

print(f"قیمت طلا: {data['gold_price']}")
print(f"قیمت دلار: {data['usd_price']}")
print(f"قیمت یورو: {data['euro_price']}")
```

#### cURL
```bash
# دریافت تمام قیمت‌ها
curl -X GET https://yourdomain.com:2083/prices

# دریافت فقط قیمت طلا
curl -X GET https://yourdomain.com:2083/gold_price
```

## 🤖 استفاده از ربات تلگرام

### تنظیم ربات

1. ربات جدید در [@BotFather](https://t.me/botfather) ایجاد کنید
2. توکن ربات را در فایل `bot.py` قرار دهید
3. ربات را اجرا کنید

### دستورات

- `/start` - شروع ربات و نمایش دکمه اپلیکیشن وب

### کد ربات

```python
from telebot import TeleBot, types

BOT_TOKEN = "your_bot_token"  # توکن ربات خود را جایگزین کنید
WEB_APP_URL = "https://yourdomain.com:2083"  # دامنه خود را جایگزین کنید

bot = TeleBot(BOT_TOKEN, parse_mode=None)

@bot.message_handler(commands=['start'])
def send_welcome(msg: types.Message):
    webapp_info = types.WebAppInfo(url=WEB_APP_URL)
    Button = types.InlineKeyboardButton(
        text=" چنده؟ ", 
        web_app=webapp_info
    )
    Keyboard = types.InlineKeyboardMarkup().add(Button)
    
    bot.send_message(
        chat_id=msg.chat.id, 
        text="<b>👨🏻‍💻 برای مشاهده قیمت (طلا، دلار، یورو و...) کلیک کنید.</b>", 
        parse_mode='html', 
        reply_markup=Keyboard
    )

if __name__ == "__main__":
    print("Bot is running (press Ctrl+C to stop)...")
    bot.infinity_polling(timeout=60, long_polling_timeout=120)
```

## ساختار پروژه

```
Gold-Tracker/
├── api.py                 # Backend Flask API
├── bot.py                 # Telegram Bot
├── gold.js               # React Frontend
├── README.md             # مستندات پروژه
├── requirements.txt      # Python Dependencies
└── package.json          # Node.js Dependencies
```

### توضیح فایل‌ها

- **`api.py`**: سرور Flask با endpoints مختلف
- **`bot.py`**: ربات تلگرام با قابلیت Web App
- **`gold.js`**: کامپوننت React اصلی
- **`requirements.txt`**: وابستگی‌های Python

## 🔧 مشکلات رایج

### خطای SSL Certificate

```bash
# بررسی مسیر فایل‌های SSL
ls -la /etc/letsencrypt/live/yourdomain.com/

# تولید گواهی خودامضا (Development)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

### خطای Port در دست استفاده

```bash
# بررسی پورت‌های در حال استفاده
netstat -tulpn | grep :2083

# تغییر پورت در api.py
app.run(host="0.0.0.0", port=2084)
```

### خطای Module Not Found

```bash
# نصب مجدد وابستگی‌ها
pip install -r requirements.txt

# یا
pip install --upgrade -r requirements.txt
```

### خطای CORS

اگر از دامنه‌های مختلف استفاده می‌کنید، CORS را تنظیم کنید:

```python
# در api.py
from flask_cors import CORS
CORS(app, origins=['https://yourdomain.com'])
```

## 🤝 مشارکت در پروژه

### گزارش باگ

1. Issue جدید ایجاد کنید
2. توضیح کامل مشکل
3. مراحل بازتولید مشکل
4. تصاویر و لاگ‌ها

### ارسال Pull Request

1. Fork کنید
2. Branch جدید ایجاد کنید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 👨‍ توسعه‌دهنده

**Abolfazl Rezayi (MrNitro)**
- GitHub: [@AbolfazlRezayi](https://github.com/AbolfazlRezayi)
- Telegram: [@MrNitro](https://t.me/MrNitro)

## تشکر

از تمام کسانی که در توسعه این پروژه مشارکت کرده‌اند تشکر می‌کنیم.

---

⭐ اگر این پروژه برای شما مفید بود، لطفاً ستاره بدهید!

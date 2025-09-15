from flask import Flask, jsonify, send_from_directory
import redis, ssl, datetime, jdatetime, requests, time, logging, os
from bs4 import BeautifulSoup
from flask_cors import CORS
from functools import wraps

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="my-app/build/static", template_folder="my-app/build")
CORS(app)

def get_gold_price():
    try:
        url = "https://www.tgju.org/profile/geram18"
        response = requests.get(url, timeout=10)
        response.encoding = response.apparent_encoding
        
        soup = BeautifulSoup(response.text, "html.parser")
        price_tag = soup.find("span", {"class": "price", "data-col": "info.last_trade.PDrCotVal"})
        
        if price_tag:
            price_text = price_tag.text.strip()
            price_num = int(price_text.replace(",", ""))
            return price_num
        return None
    except Exception as e:
        logger.error(f"Error getting gold price: {e}")
        return None

def get_euro_price():
    try:
        url = "https://www.tgju.org/profile/price_eur"
        response = requests.get(url, timeout=10)
        response.encoding = response.apparent_encoding
        
        soup = BeautifulSoup(response.text, "html.parser")
        price_tag = soup.find("span", {"class": "price", "data-col": "info.last_trade.PDrCotVal"})
        
        if price_tag:
            price_text = price_tag.text.strip()
            price_num = int(price_text.replace(",", ""))
            return price_num
        return None
    except Exception as e:
        logger.error(f"Error getting Euro price: {e}")
        return None

def get_usd_price():
    try:
        response = requests.get("https://arzdigital.com/coins/tether/", timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            price_element = soup.find(class_='pulser-toman-tether')
            if price_element:
                price_text = price_element.text.strip()
                price_text = price_text.split(".")[0].replace(",", "").replace(" ریال", "").replace("IRT", "").replace("تومان", "")
                return int(price_text)
        return None
    except Exception as e:
        logger.error(f"Error getting USD price: {e}")
        return None

def get_current_time_info():
    time_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timestamp = int(time.time())
    jtime = jdatetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return time_str, timestamp, jtime

def monitor_performance(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        start_time = time.time()
        result = f(*args, **kwargs)
        end_time = time.time()
        logger.info(f"{f.__name__} took {end_time - start_time:.2f} seconds")
        return result
    return decorated_function

@app.route("/gold_price", methods=["GET"])
@monitor_performance
def gold_price():
    price = get_gold_price()
    if price is not None:
        price_toman = price // 10
        time_str, timestamp, jtime = get_current_time_info()
        return jsonify({
            "gold_price": price_toman, 
            "time": time_str, 
            "timestamp": timestamp, 
            "jtime": jtime
        })
    return jsonify({"error": "Gold price not found"}), 404

@app.route("/usd_price", methods=["GET"])
@monitor_performance
def usd_price():
    price = get_usd_price()
    if price is not None:
        time_str, timestamp, jtime = get_current_time_info()
        return jsonify({
            "usd_price": price, 
            "time": time_str, 
            "timestamp": timestamp, 
            "jtime": jtime
        })
    return jsonify({"error": "USD price not found"}), 404

@app.route("/euro_price", methods=["GET"])
@monitor_performance
def euro_price():
    price = get_euro_price()
    if price is not None:
        price_toman = price // 10
        time_str, timestamp, jtime = get_current_time_info()
        return jsonify({
            "euro_price": price_toman, 
            "time": time_str, 
            "timestamp": timestamp, 
            "jtime": jtime
        })
    return jsonify({"error": "Euro price not found"}), 404

@app.route("/prices", methods=["GET"])
@monitor_performance
def prices():
    gold_price_rial = get_gold_price()
    usd_price_toman = get_usd_price()
    euro_price_rial = get_euro_price()

    time_str, timestamp, jtime = get_current_time_info()
    
    result = {
        "time": time_str,
        "timestamp": timestamp,
        "jtime": jtime
    }
    
    if gold_price_rial is not None:
        result["gold_price"] = gold_price_rial // 10
    else:
        result["gold_error"] = "Gold price not found"
    
    if usd_price_toman is not None:
        result["usd_price"] = usd_price_toman
    else:
        result["usd_error"] = "USD price not found"
    
    if euro_price_rial is not None:
        result["euro_price"] = euro_price_rial // 10
    else:
        result["euro_error"] = "Euro price not found"
    
    return jsonify(result)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join("my-app/build", path)):
        return send_from_directory("my-app/build", path)
    else:
        return send_from_directory("my-app/build", "index.html")

if __name__ == '__main__':
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(
        certfile='/etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem',
        keyfile='/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem'
    )
    app.run(debug=False, host="0.0.0.0", port=2083, ssl_context=context)

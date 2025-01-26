import json
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

def generate_timeseries_data(days, volatility):
    data = []
    base_price = random.uniform(100, 1100)  # Random base price between 100 and 1100
    current_price = base_price

    for i in range(days):
        date = datetime.now() - timedelta(days=days - i)
        change = (random.random() - 0.5) * 2 * volatility * current_price
        current_price = max(1, current_price + change)  # Ensure price doesn't go below 1

        data.append({
            "date": int(date.timestamp() * 1000),  # Convert to milliseconds
            "price": round(current_price, 2)
        })

    return data

def generate_mock_stock_data():
    return {
        "1W": generate_timeseries_data(7, 0.02),  # 2% daily variation
        "1M": generate_timeseries_data(30, 0.03),  # 3% daily variation
        "1Y": generate_timeseries_data(365, 0.04)  # 4% daily variation
    }

def generate_stock_data():
    stocks = []
    for i in range(1, 501):
        stock = {
            "id": i,
            "symbol": fake.unique.lexify(text="?????", letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
            "name": fake.company(),
            "logo": f"https://dummyimage.com/100x100/000/fff&text=STOCK{i}",
            "currentPrice": round(random.uniform(100, 5000), 2),
            "change": round(random.uniform(-2.5, 2.5), 2),
            "data": generate_mock_stock_data()
        }
        stocks.append(stock)
    
    return stocks

def save_to_json(file_name="stock_data.json"):
    stock_data = generate_stock_data()
    with open(file_name, "w") as json_file:
        json.dump(stock_data, json_file, indent=4)

if __name__ == "__main__":
    save_to_json()
    print("Stock data JSON file generated successfully!")

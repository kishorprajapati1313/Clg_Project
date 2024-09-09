from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime
from alpaca_trade_api import REST
from timedelta import Timedelta
from finbert_utils import estimate_sentiment

API_KEY = "PKO7K0ZKDO5VUIG1N9OD"
API_SECRET = "luzfQa9eTl8OCGdT6iGaZfwOYPDNrmpBLI2fltw8"
BASE_URL = "https://paper-api.alpaca.markets/v2"

ALPACA_CREDS = {
    "API_KEY": API_KEY,
    "API_SECRET": API_SECRET,
    "PAPER": True
}

class MLTrader(Strategy):
    def initialize(self, symbol:str="SPY", cash_at_risk:float=.5):
        self.symbol = symbol
        self.sleeptime = "24H"
        self.last_trade = None
        self.cash_at_risk = cash_at_risk
        self.api = REST(base_url=BASE_URL, key_id=API_KEY, secret_key=API_SECRET)

# -------------------------- We Using 50% of over balance cash in 0.5-----------------------
    def position_sizing(self):
        cash = self.get_cash()
        last_price = self.get_last_price(self.symbol)
        quantity = round(cash * self.cash_at_risk / last_price)
        return cash, last_price, quantity

    def get_dates(self):
        today = datetime.now()
        three_days_prior = today - Timedelta(days=3)
        return today.strftime('%Y-%m-%d'), three_days_prior.strftime('%Y-%m-%d')

    def get_sentiment(self):
        today, three_days_prior = self.get_dates()
        news = self.api.get_news(symbol=self.symbol, start=three_days_prior, end=today)
        news = [ev.__dict__["_raw"]["headline"] for ev in news]
        probability, sentiment = estimate_sentiment(news)
        return probability, sentiment

    def on_trading_iteration(self):
        cash, last_price, quantity = self.position_sizing()
        probability, sentiment = self.get_sentiment()

        if cash > last_price:
            print(probability, sentiment)
            if self.last_trade == None:
                order = self.create_order(
                    self.symbol, quantity, "buy", type="bracket",
                    take_profit_price = last_price*1.20,
                    stop_loss_price = last_price*.95
                )
                self.submit_order(order)
                self.last_trade = "buy"

start_date = datetime(2024, 3,15)
end_date = datetime(2024, 3,30)

broker = Alpaca(ALPACA_CREDS)
strategy = MLTrader(name='mlstart', broker=broker, parameters={"symbol":"SPY", "cash_at_risk": .5})

strategy.backtest(
    YahooDataBacktesting,
    start_date,
    end_date,
    parameters={"symbol":"SPY", "cash_at_risk": .5}
)































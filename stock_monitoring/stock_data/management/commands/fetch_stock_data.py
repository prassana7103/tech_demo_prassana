from django.core.management.base import BaseCommand
import yfinance as yf
from stock_data.models import Stock , StockList
from datetime import datetime
#from .send_email import send_email_to_all_users

class Command(BaseCommand):
    help = 'Fetch daily stock data using yfinance for a single day'

    def handle(self, *args, **kwargs):
        
        symbol_object = StockList.objects.all()
        symbols = [symbol.symbol for symbol in symbol_object]
       
        target_date = datetime.now().date()

        for symbol , symbol_object in zip(symbols , symbol_object):
            
            ticker = yf.Ticker(symbol)
            df = ticker.history(period="1d")
            data = df.to_dict()
            if data and data.get("Open"):

                date_time = list(data['Open'].keys())[0]
                Stock.objects.update_or_create(
                    symbol=symbol_object,
                    date=date_time,
                    defaults={
                        'open_price': data['Open'][date_time],
                        'high_price': data['High'][date_time],
                        'low_price': data['Low'][date_time],
                        'close_price': data['Close'][date_time],
                        'volume': data['Volume'][date_time],
                        'change_in_percent': (data['Close'][date_time] - data['Open'][date_time])/data['Open'][date_time]*100,
                        'change_in_price': data['Close'][date_time] - data['Open'][date_time]
                    }
                )

                # if  (data['Close'][date_time] - data['Open'][date_time])/data['Open'][date_time]*100 >= 1:
                #     body = f"Stock {symbol} has increased by more than 1% on {target_date}, today's open price is {data['Open'][date_time]} and close price is {data['Close'][date_time]}"
                #     send_email_to_all_users(body)
            else:
                self.stdout.write(self.style.WARNING(f'No data available for {symbol} on {target_date}'))

        self.stdout.write(self.style.SUCCESS('Successfully fetched and stored stock data for the target date'))
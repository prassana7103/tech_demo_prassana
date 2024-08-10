import time
from django.core.management.base import BaseCommand
from prometheus_client import start_http_server, Gauge
from stock_data.models import Stock

# Define Prometheus metrics
stock_percentage_change = Gauge('stock_percentage_change', 'Percentage change of the stock', ['stock_symbol'])

class Command(BaseCommand):
    help = 'Generate metrics for Prometheus'

    def handle(self, *args, **kwargs):
        start_http_server(8001)  # Expose the metrics on port 8001
        while True:
            self.generate_metrics()
            time.sleep(60)  # Update metrics every minute

    def generate_metrics(self):
        stocks = Stock.objects.all()
        for stock in stocks:
            change_percent = stock.calculate_change_percent()  # Assuming you have this method in your model
            stock_percentage_change.labels(stock.symbol).set(change_percent)

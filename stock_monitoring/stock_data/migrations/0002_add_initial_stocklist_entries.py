from django.db import migrations

def add_initial_stocklist_entries(apps, schema_editor):
    StockList = apps.get_model('stock_data', 'StockList')
    StockList.objects.bulk_create([
        StockList(symbol='AAPL'),
        StockList(symbol='ABBV'),
        StockList(symbol='ABT'),
        StockList(symbol='ACN'),
        StockList(symbol='ADBE'),
        StockList(symbol='AMGN'),
        StockList(symbol='AMZN'),
        StockList(symbol='AVGO'),
        StockList(symbol='BMY'),
        StockList(symbol='CMCSA'),
        StockList(symbol='COST'),
        StockList(symbol='CRM'),
        StockList(symbol='CSCO'),
        StockList(symbol='CVX'),
        StockList(symbol='DHR'),
        StockList(symbol='DIS'),
        StockList(symbol='GOOGL'),
        StockList(symbol='HD'),
        StockList(symbol='HON'),
        StockList(symbol='INTC'),
        StockList(symbol='JNJ'),
        StockList(symbol='KO'),
        StockList(symbol='LLY'),
        StockList(symbol='MA'),
        StockList(symbol='MCD'),
        StockList(symbol='MDT'),
        StockList(symbol='MRK'),
        StockList(symbol='MSFT'),
        StockList(symbol='NEE'),
        StockList(symbol='NFLX'),
        StockList(symbol='NKE'),
        StockList(symbol='NVDA'),
        StockList(symbol='ORCL'),
        StockList(symbol='PEP'),
        StockList(symbol='PFE'),
        StockList(symbol='PG'),
        StockList(symbol='PM'),
        StockList(symbol='PYPL'),
        StockList(symbol='T'),
        StockList(symbol='TMO'),
        StockList(symbol='TSLA'),
        StockList(symbol='TXN'),
        StockList(symbol='UNH'),
        StockList(symbol='V'),
        StockList(symbol='VZ'),
        StockList(symbol='WMT'),
        StockList(symbol='XOM'),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('stock_data', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_initial_stocklist_entries),
    ]
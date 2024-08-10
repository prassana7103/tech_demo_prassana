from rest_framework import serializers
from .models import Stock, StockList, UserStock
from datetime import datetime, timedelta

class StockSerializer(serializers.ModelSerializer):
    symbol_name = serializers.SerializerMethodField()
    class Meta:
        model = Stock
        fields = '__all__'
    
    def get_symbol_name(self, obj):
        return obj.symbol.symbol
    
class StockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockList
        fields = '__all__'
    



class ReportSerializer(serializers.Serializer):
    report_today = serializers.SerializerMethodField()
    report_monthly = serializers.SerializerMethodField()
    report_yearly = serializers.SerializerMethodField()
    stock_name = serializers.SerializerMethodField()
    
    class Meta:
        model = StockList
        fields = '__all__'

    def get_stock_name(self, obj):
        return obj.symbol
    
    def get_report_today(self, obj):
        today = datetime.now().date()
        todays_data = Stock.objects.filter(date=today,symbol=obj).first()
        if not todays_data:
            todays_data = Stock.objects.filter(date__lt=today,symbol=obj).order_by('-date').first()
        day_wise_data = {  
            'open_price': todays_data.open_price,
            'close_price': todays_data.close_price,
            'change_in_price': todays_data.change_in_price,
            'change_in_percent': todays_data.change_in_percent,
            'to_date': todays_data.date,
            'from_date': todays_data.date
        }
        return day_wise_data
    
    def get_report_yearly(self, obj):
        today = datetime.now().date()
        one_year_ago = today - timedelta(days=365)
        data_before_1_year = Stock.objects.filter(date=one_year_ago,symbol=obj).order_by('-date').first()
        todays_data = Stock.objects.filter(date=today,symbol=obj).first()
        if not todays_data:
            todays_data = Stock.objects.filter(date__lt=today,symbol=obj).order_by('-date').first()
        if not data_before_1_year:
            data_before_1_year = Stock.objects.filter(date__gt=one_year_ago,symbol=obj).order_by('-date').last()
        yearly_data = {
            'open_price': data_before_1_year.open_price,
            'close_price': todays_data.close_price,
            'change_in_price': todays_data.close_price - data_before_1_year.open_price,
            'change_in_percent': (todays_data.close_price - data_before_1_year.open_price)/data_before_1_year.open_price*100,
            'to_date': todays_data.date,
            'from_date': data_before_1_year.date
        }
        return yearly_data
    
    def get_report_monthly(self, obj):
        today = datetime.now().date()
        one_month_ago = today - timedelta(days=30)
        data_before_1_month = Stock.objects.filter(date=one_month_ago,symbol=obj).order_by('-date').last()
        todays_data = Stock.objects.filter(date=today,symbol=obj).first()
        if not todays_data:
            todays_data = Stock.objects.filter(date__lt=today,symbol=obj).order_by('-date').first()
        if not data_before_1_month:
            data_before_1_month = Stock.objects.filter(date__gt=one_month_ago,symbol=obj).order_by('-date').last()

        monthly_data = {
            'open_price': data_before_1_month.open_price,
            'close_price': todays_data.close_price,
            'change_in_price': todays_data.close_price - data_before_1_month.open_price,
            'change_in_percent': (todays_data.close_price - data_before_1_month.open_price)/data_before_1_month.open_price*100,
            'to_date': todays_data.date,
            'from_date': data_before_1_month.date
        }
        return monthly_data


class UserStockSerializer(serializers.Serializer):
    stock_name = serializers.SerializerMethodField()
    stock_id = serializers.SerializerMethodField()
    
    class Meta:
        model = UserStock
        fields = '__all__'
    
    def get_stock_name(self, obj):
        return obj.stock.symbol
    def get_stock_id(self, obj):
        return obj.stock.id
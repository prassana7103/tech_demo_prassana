from rest_framework import viewsets 
from .models import Stock, StockList, UserStock
from .serializers import StockSerializer, ReportSerializer, UserStockSerializer, StockListSerializer
from rest_framework.response import Response
from datetime import datetime , timedelta
from django.http import HttpResponse
from django.views import View
from prometheus_client import generate_latest, Gauge,  CONTENT_TYPE_LATEST
from rest_framework import status
from django.utils.dateparse import parse_date
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


class Report(viewsets.ModelViewSet):
    queryset = StockList.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        is_fav = self.request.query_params.get('is_fav', 'false').lower() == 'true'
        
        if is_fav:
            user_stocks = UserStock.objects.filter(user=user)
            user_stocklist = [stock.stock for stock in user_stocks]
            return StockList.objects.filter(id__in=[stock.id for stock in user_stocklist])
        
        return StockList.objects.all()


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]


class StockListViewSet(viewsets.ModelViewSet):
    queryset = StockList.objects.all()
    serializer_class = StockListSerializer
    permission_classes = [IsAuthenticated]

# class Report(viewsets.ModelViewSet):
#     queryset = StockList.objects.all()
#     serializer_class = ReportSerializer

class UserStockViewSet(viewsets.ModelViewSet):
    queryset = UserStock.objects.all()
    serializer_class = UserStockSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        # Filter the queryset based on the authenticated user
        user = self.request.user
        return UserStock.objects.filter(user=user)
    
    def delete_user_stock(self, request, stock_id=None):
            user = request.user
            try:
                stock = StockList.objects.get(id=stock_id)
                user_stock = UserStock.objects.get(user=user, stock=stock)
                user_stock.delete()
                return Response({'status': 'success'}, status=status.HTTP_204_NO_CONTENT)
            except StockList.DoesNotExist:
                return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)
            except UserStock.DoesNotExist:
                return Response({'error': 'User stock not found'}, status=status.HTTP_404_NOT_FOUND)


    def create_by_list(self, request):
        try :
            user = request.user
            stock_ids = request.data['stock_ids']
            stocks =[]
            for i in stock_ids:
                stock=StockList.objects.get(id=i)
                stocks.append(stock)
            for stock in stocks:
                UserStock.objects.create(user=user, stock=stock)
            return Response({'status': 'success'})
        except: 
            import traceback
            traceback.print_exc()
            return Response({'status': 'failed'},status=400)
        
stock_daily_percentage_change = Gauge('stock_daily_percentage_change', 
                                       'Daily percentage change in stock price',
                                       ['date', 'stock_name'])

class PrometheusMetricsView(View):
    def get(self, request, *args, **kwargs):
        # Reset the metric data
        stock_daily_percentage_change.clear()
        
        # Get the current date
        today = datetime.now().date()
        
        # Fetch all stock lists
        stock_lists = StockList.objects.all()
        
        # Iterate through each stock list and calculate daily percentage change
        for stock_list in stock_lists:
            # Get the stock data for today
            todays_data = Stock.objects.filter(date=today, symbol=stock_list).first()
            if not todays_data:
                todays_data = Stock.objects.filter(date__lt=today, symbol=stock_list).order_by('-date').first()
            if not todays_data:
                continue
            
            # Get the previous day's data
            previous_day = today - timedelta(days=1)
            previous_data = Stock.objects.filter(date=previous_day, symbol=stock_list).first()
            
            if not previous_data:
                continue
            
            # Calculate percentage change
            change_in_price = todays_data.close_price - previous_data.close_price
            change_in_percent = (change_in_price / previous_data.close_price) * 100
            
            # Set the metric
            stock_daily_percentage_change.labels(date=today.strftime('%Y-%m-%d'), stock_name=stock_list.symbol).set(change_in_percent)
        
        # Generate and return metrics
        return HttpResponse(generate_latest(stock_daily_percentage_change), content_type=CONTENT_TYPE_LATEST)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockViewSet, Report, UserStockViewSet, PrometheusMetricsView, StockListViewSet
router = DefaultRouter()
router.register(r'stocks', StockViewSet)
router.register(r'report', Report)
router.register(r'user_stock', UserStockViewSet)
router.register(r'liststocks', StockListViewSet, basename='stock-list')


urlpatterns = [
    path('', include(router.urls)),
    path('user_stocks/create_by_list/', UserStockViewSet.as_view({'post': 'create_by_list'})),
    path('user_stock_delete/<int:stock_id>/', UserStockViewSet.as_view({'delete': 'delete_user_stock'})),
    path('metrics/', PrometheusMetricsView.as_view(), name='prometheus-metrics'),
]

from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.ForeignKey('StockList', on_delete=models.CASCADE)
    date = models.DateField()
    open_price = models.FloatField()
    high_price = models.FloatField()
    low_price = models.FloatField()
    close_price = models.FloatField()
    volume = models.BigIntegerField()
    change_in_percent = models.FloatField()
    change_in_price = models.FloatField()


    class Meta:
        unique_together = ('symbol', 'date')

    def __str__(self):
        return f"{self.symbol} - {self.date}"

class StockList(models.Model):
    symbol = models.CharField(max_length=10,unique=True)

    def __str__(self):
        return self.symbol

class UserStock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(StockList, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'stock')

    def __str__(self):
        return f"{self.user} - {self.stock}"



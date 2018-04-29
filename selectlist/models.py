from django.db import models
import django.utils.timezone

# Create your models here.


class Drug(models.Model):
    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    stock = models.IntegerField(default=0)
    company = models.CharField(max_length=200, blank=True)
    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.name
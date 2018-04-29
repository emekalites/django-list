from django.contrib import admin
from .models import Drug


class DrugAdmin(admin.ModelAdmin):
    list_display = ('name', 'amount', 'stock', 'company', 'modified_at', 'created_at')


admin.site.register(Drug, DrugAdmin)
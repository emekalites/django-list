from django.shortcuts import render
from .models import Drug


def index(request):
    context = {'drugs': Drug.objects.all()}
    return render(request, 'selectlist/index.html', context)

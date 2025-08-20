from django.shortcuts import render

def homepage(request):
    return render(request, 'homepage.html')

def journey(request):
    return render(request, 'journey.html')

def services(request):
    return render(request, 'services.html')

def news(request):
    return render(request, 'news.html')

def contact(request):
    return render(request, 'contact.html')
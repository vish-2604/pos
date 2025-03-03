from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import CustomPasswordChangeForm

def home(request):
    # return HttpResponse("<h1>hello</h1>")
    return redirect('staffside:orders')

def render_page(request, template):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, template)
    return render(request, "staffside/base.html", {"template": template})

def orders(request):
    return render_page(request, 'staffside/orders.html')

def tables(request):
    return render_page(request, 'staffside/tables.html')

def pos(request):
    return render_page(request, 'staffside/pos.html')

def sales(request):
    return render_page(request, 'staffside/sales.html')

def customer(request):
    return render_page(request, 'staffside/customer.html')


def staffside_settings_view(request):
    return redirect('staffside:profile')

def render_settings_page(request, template, context=None):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, template, context or {})
    context = context or {}
    context["template"] = template  # Ensures `template` is still passed
    return render(request, "staffside/settings.html", context)

def change_password(request):
    form = CustomPasswordChangeForm(request.user)
    return render_settings_page(request, "staffside/settings/change_password.html", {'form': form})

def edit_profile(request):
    return render_settings_page(request,"staffside/settings/edit_profile.html")

def profile(request):
    return render_settings_page(request,"staffside/settings/profile.html")

def logout_view(request):
    return render_page(request, 'staffside/logout.html')


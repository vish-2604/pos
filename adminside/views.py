from django.shortcuts import render, redirect
from .forms import CustomPasswordChangeForm

def home(request):
    return redirect('dashboard')

def render_page(request, template):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, template)
    return render(request, "adminside/base.html", {"template": template})

def dashboard(request):
    return render_page(request, 'adminside/dashboard.html')

def stores(request):
    return render_page(request, 'adminside/stores.html')

def suppliers(request):
    return render_page(request, 'adminside/suppliers.html')

def purchase(request):
    return render_page(request, 'adminside/purchase.html')

def categories(request):
    return render_page(request, 'adminside/categories.html')

def inventory(request):
    return render_page(request, 'adminside/inventory.html')

def fooditems(request):
    return render_page(request, 'adminside/fooditems.html')

def customer(request):
    return render_page(request, 'adminside/customer.html')

def staff(request):
    return render_page(request, 'adminside/staff.html')

def reports(request):
    return render_page(request, 'adminside/reports.html')

def settings_view(request):
    return redirect('profile')

def render_settings_page(request, template, context=None):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, template, context or {})
    context = context or {}
    context["template"] = template  # Ensures `template` is still passed
    return render(request, "adminside/settings.html", context)

def change_password(request):
    form = CustomPasswordChangeForm(request.user)
    return render_settings_page(request, "adminside/settings/change_password.html", {'form': form})

def edit_profile(request):
    return render_settings_page(request,"adminside/settings/edit_profile.html")

def profile(request):
    return render_settings_page(request,"adminside/settings/profile.html")

def logout_view(request):
    return render_page(request, 'adminside/logout.html')


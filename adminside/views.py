from django.shortcuts import render, redirect

def home(request):
    return redirect('dashboard')

def render_page(request, template):
    """Helper function to handle AJAX and full page requests"""
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

def inventory(request):
    return render_page(request, 'adminside/inventory.html')

def fooditems(request):
    return render_page(request, 'adminside/fooditems.html')

def customer(request):
    return render_page(request, 'adminside/customer.html')

def staff(request):
    return render_page(request, 'adminside/staff.html')

def settings(request):
    return render_page(request, 'adminside/settings.html')

def logout_view(request):
    return render_page(request, 'adminside/logout.html')

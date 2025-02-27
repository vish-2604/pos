from django.shortcuts import render, redirect
from .forms import CustomPasswordChangeForm

def home(request):
    return redirect('dashboard')

def render_page(request, template, data=None):
    return render(request, "adminside/base.html", {"template": template, "data":data})

def dashboard(request):
    return render_page(request, 'adminside/dashboard.html')

def stores(request):
    sales_data = [
    {"invoice_no": "101", "full_name": "John Doe", "phone": "9876543210", "email": "john.doe@example.com", "total": "450", "paid": "200", "balance": "250", "date": "01/15"},
    {"invoice_no": "102", "full_name": "Jane Smith", "phone": "9876543211", "email": "jane.smith@example.com", "total": "350", "paid": "150", "balance": "200", "date": "01/16"},
    {"invoice_no": "103", "full_name": "Robert Brown", "phone": "9876543212", "email": "robert.brown@example.com", "total": "500", "paid": "250", "balance": "250", "date": "01/17"},
    {"invoice_no": "104", "full_name": "Emily White", "phone": "9876543213", "email": "emily.white@example.com", "total": "600", "paid": "300", "balance": "300", "date": "01/18"},
    {"invoice_no": "105", "full_name": "Michael Green", "phone": "9876543214", "email": "michael.green@example.com", "total": "750", "paid": "500", "balance": "250", "date": "01/19"},
    ]
    return render_page(request, 'adminside/stores.html', data=sales_data)

def suppliers(request):
    return render_page(request, 'adminside/suppliers.html')

def purchase(request):
    sales_data = [
    {"invoice_no": "101", "full_name": "John Doe", "phone": "9876543210", "email": "john.doe@example.com", "total": "450", "paid": "200", "balance": "250", "date": "01/15"},
    {"invoice_no": "102", "full_name": "Jane Smith", "phone": "9876543211", "email": "jane.smith@example.com", "total": "350", "paid": "150", "balance": "200", "date": "01/16"},
    {"invoice_no": "103", "full_name": "Robert Brown", "phone": "9876543212", "email": "robert.brown@example.com", "total": "500", "paid": "250", "balance": "250", "date": "01/17"},
    {"invoice_no": "104", "full_name": "Emily White", "phone": "9876543213", "email": "emily.white@example.com", "total": "600", "paid": "300", "balance": "300", "date": "01/18"},
    {"invoice_no": "105", "full_name": "Michael Green", "phone": "9876543214", "email": "michael.green@example.com", "total": "750", "paid": "500", "balance": "250", "date": "01/19"},
    ]
    
    return render_page(request, 'adminside/purchase.html',data=sales_data)

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
    sales_data = [
    {"invoice_no": "101", "full_name": "John Doe", "phone": "9876543210", "email": "john.doe@example.com", "total": "450", "paid": "200", "balance": "250", "date": "01/15"},
    {"invoice_no": "102", "full_name": "Jane Smith", "phone": "9876543211", "email": "jane.smith@example.com", "total": "350", "paid": "150", "balance": "200", "date": "01/16"},
    {"invoice_no": "103", "full_name": "Robert Brown", "phone": "9876543212", "email": "robert.brown@example.com", "total": "500", "paid": "250", "balance": "250", "date": "01/17"},
    {"invoice_no": "104", "full_name": "Emily White", "phone": "9876543213", "email": "emily.white@example.com", "total": "600", "paid": "300", "balance": "300", "date": "01/18"},
    {"invoice_no": "105", "full_name": "Michael Green", "phone": "9876543214", "email": "michael.green@example.com", "total": "750", "paid": "500", "balance": "250", "date": "01/19"},
    ]
    return render_page(request, 'adminside/reports.html', data=sales_data)


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
    sales_data = [
    {"invoice_no": "101", "full_name": "John Doe", "phone": "9876543210", "email": "john.doe@example.com", "total": "450", "paid": "200", "balance": "250", "date": "01/15"},
    
    ]
    return render_page(request, 'adminside/logout.html',data=sales_data)


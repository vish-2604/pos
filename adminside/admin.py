from django.contrib import admin
from .models import Table,Sales_reports,Supplier,Categories,Customer,Staff

# Register your models here.
admin.site.register(Table)

class SalesAdmin(admin.ModelAdmin):
    list_display=("product_id","product_name","categories","quantities")
admin.site.register(Sales_reports,SalesAdmin)

class SupplierAdmin(admin.ModelAdmin):
    list_display=("supplier_id","supplier_name","company_name","supplier_email","supplier_phone","address","branch")
admin.site.register(Supplier,SupplierAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display=("categories_id","categories_name","status")
admin.site.register(Categories,CategoryAdmin)

class CustomerAdmin(admin.ModelAdmin):
    list_display=("customer_id","customer_firstname","customer_lastname","customer_email","customer_phone","gender")
admin.site.register(Customer,CustomerAdmin)

class StaffAdmin(admin.ModelAdmin):
    list_display=("staff_id","staff_username","staff_firstname","staff_lastname","staff_email","staff_phone","staff_role","branch")
admin.site.register(Staff,StaffAdmin)

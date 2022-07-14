from django.contrib import admin
from django.contrib.auth.models import Group,User
from .models import *

admin.site.site_header ="BARRY INTERIOR "
admin.site.index_title =" Dashboard"

admin.site.unregister(User)

admin.site.unregister(Group)
admin.site.register(product)
admin.site.register(subcategory)
admin.site.register(category)
admin.site.register(finish)
admin.site.register(inquiryDetail)
admin.site.register(brochure)
admin.site.register(newsletter)
admin.site.register(gallery)
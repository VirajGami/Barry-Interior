from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


from . import views

urlpatterns = [
    path('base/',views.base, name='base'),
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('product/', views.productpage, name='productpage'),
    path('categoryview/<int:id>', views.categoryview, name='categoryview'),
    path('productlist/<int:id>', views.productlist, name='productlist'),
    path('productdetail/<int:id>', views.productdetail, name='productdetail'),
    path('LatestProduct/',views.latest, name='latest'),
    path('inquiry/', views.inquiry, name='inquiry'),
    path('inquirysubmit/', views.inquirysubmit, name='inquirysubmit'),
    path('brochure/', views.brochurelist, name='brochurelist'),
    path('contact/', views.contact, name='contact'),
    path('photogallery/',views.photogallery, name='photogallery')

]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

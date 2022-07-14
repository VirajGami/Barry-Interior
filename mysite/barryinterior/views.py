from django.shortcuts import render
from django.http import HttpResponse
from .models import product,subcategory,category,finish,inquiryDetail,brochure,newsletter,gallery
from django.template import loader
import random
from django.contrib import messages
from django.shortcuts import redirect
from django.core.mail import BadHeaderError, send_mail
from django.conf import settings
from django.core.mail import send_mail


def index(request):

    cat=category.objects.all()
    return render(request,'barryinterior/index.html',{ 'cat_list':cat})


def base(request):
    if request.method == 'POST':
        mail=request.POST.get('txtEmail','')
        m=newsletter(mail=mail)
        m.save()
    return redirect('index')     


def about(request):
    cat=category.objects.all()

    return render(request,'barryinterior/about.html',{'cat':cat})

def contact(request):
    cat=category.objects.all()

    return render(request,'barryinterior/contact.html',{'cat':cat})    

def productpage(request):
    template=loader.get_template("barryinterior/product.html")
    cat=category.objects.all()

    context={
        'cat_list':cat,
    }
    return HttpResponse(template.render(context,request))





def inquiry(request):
    global str_num
    cat=category.objects.all()
    num=random.randrange(1121,9899)
   
    str_num=str(num)

    return render(request,"barryinterior/inquiry.html",{"img":str_num,'cat':cat})


def inquirysubmit(request):   
   

    if request.method == 'POST':
        name=request.POST.get('txtName','')
        company=request.POST.get('txtCompany','')
        designation=request.POST.get('txtDesignation','')
        address=request.POST.get('txtAddress','')
        city=request.POST.get('txtCity','')
        pincode=request.POST.get('txtPincode','')
        state=request.POST.get('txtState','')
        country=request.POST.get('txtCountry','')
        mobile=request.POST.get('txtMobile','')
        telephone=request.POST.get('txtTelephone','')
        email=request.POST.get('txteMailid','')
        comments=request.POST.get('txtComments','')
        code=request.POST.get('txtcaptcha','')
        print(code)

        if str(code)==str_num :
            i=inquiryDetail(Name=name,Company=company,Designation=designation,Address=address,City=city,Pincode=pincode,State=state,Country=country,Mobile=mobile,Telephone=telephone,Email=email,Comments=comments)
            i.save()  
            
            return redirect('index') 
           
                
        else:
            messages.warning(request, 'Please Enter Valid CAPTCHA.')
            return redirect('inquiry')
           
    else:
        return redirect('inquiry')        

def latest(request):
    p=product.objects.filter().order_by('-id')[:10]
    cat=category.objects.all()
    return render(request,'barryinterior/latest.html',{'product':p,'cat':cat})            




def categoryview(request,id):
    categoryvalue=category.objects.get(id=id)
    cn=categoryvalue.CategoryName
    sc=subcategory.objects.filter(Category=categoryvalue)
    print(cn)
    print(sc)
    return render(request,'barryinterior/subcategory.html',{'categoryvalue':categoryvalue,'subcat':sc}) 


def productlist(request,id):
    subcategoryvalue=subcategory.objects.get(id=id)
    productlist=product.objects.filter(subcategory=subcategoryvalue)
    c=subcategoryvalue.Category
    print("Found dound dounf")

    return render(request,'barryinterior/productlist.html',{'product_list':productlist,'subcategoryvalue':subcategoryvalue,'c':c})            


def productdetail(request,id):
    detail=product.objects.get(id=id)
    f=finish.objects.filter(ProductModelNo=detail)
    cat=detail.category
    c=detail.subcategory
    related=product.objects.filter(subcategory=c)
    print(c)
    print(related)
    print(f)
    return render(request,'barryinterior/productdetail.html',{'detail':detail,'cat':cat,'related':related,'c':c,'f':f})            

def brochurelist(request):
    data=brochure.objects.all()
    cat=category.objects.all()

    return render(request,'barryinterior/brochure.html',{'data':data,'cat':cat})            

    
       
def photogallery(request):
    cat=category.objects.all()
    photos=gallery.objects.all()
    return render(request,'barryinterior/photos.html',{'photos':photos,'cat':cat})    
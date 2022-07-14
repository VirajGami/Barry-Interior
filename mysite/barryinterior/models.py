from django.db import models
import  PIL 
from PIL import Image

class product(models.Model):
    ModelNo=models.CharField(max_length=200)
    ProductImage= models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg")
    category = models.ForeignKey( 'category' , on_delete=models.SET_DEFAULT  , default=1)
    subcategory=models.ForeignKey('subcategory' , on_delete=models.SET_DEFAULT ,default=1)
    
    def __str__(self):
        return self.ModelNo
  
class finish(models.Model):
    FinisType=models.CharField(max_length=200)
    FinishImage=models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg")
    ProductModelNo=models.ForeignKey( 'product' ,on_delete=models.SET_DEFAULT ,default=1)

    def __str__(self):
        return self.FinisType

  

class subcategory(models.Model):
    SubCategoryName=models.CharField(max_length=200)
    Image= models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg")
    Category = models.ForeignKey( 'category' , on_delete=models.SET_DEFAULT  , default=1)


    def __str__(self):
        return self.SubCategoryName
  

class category(models.Model):
    CategoryName=models.CharField(max_length=200)
    Image= models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg") 
   
    def __str__(self):
        return self.CategoryName
     
class inquiryDetail(models.Model):
    Name=models.CharField(max_length=200)
    Company=models.CharField(max_length=200)
    Designation=models.CharField(max_length=200)
    Address=models.TextField(max_length=800)
    City=models.CharField(max_length=200)
    Pincode=models.CharField(max_length=200)
    State=models.CharField(max_length=200)
    Country=models.CharField(max_length=200)
    Mobile=models.IntegerField()
    Telephone=models.IntegerField()
    Email=models.CharField(max_length=200)
    Comments=models.CharField(max_length=200)   

    def __str__(self):
        return self.Name

class brochure(models.Model):
    name=models.CharField(max_length=200)
    image= models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg") 
    pdf= models.FileField( verbose_name="")
        
    def __str__(self):
        return self.name  

class newsletter(models.Model):
    mail=models.EmailField()
    
    def __str__(self):
        return self.mail


class gallery(models.Model):
    image=models.ImageField( default="https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg") 
    name=models.CharField(max_length=200)

    def __str__(self):
        return self.name

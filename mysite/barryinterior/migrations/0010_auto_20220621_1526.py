# Generated by Django 3.1.1 on 2022-06-21 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barryinterior', '0009_inquirydetail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inquirydetail',
            name='Mobile',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='inquirydetail',
            name='Telephone',
            field=models.IntegerField(),
        ),
    ]
# Generated by Django 3.1.1 on 2022-06-21 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barryinterior', '0010_auto_20220621_1526'),
    ]

    operations = [
        migrations.CreateModel(
            name='brochure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(default='https://cdn.wpmeducation.com/53544f/97c04745fa/default.jpg', upload_to='')),
                ('pdf', models.FileField(upload_to='', verbose_name='')),
            ],
        ),
    ]

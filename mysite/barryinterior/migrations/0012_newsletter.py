# Generated by Django 3.1.1 on 2022-06-22 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barryinterior', '0011_brochure'),
    ]

    operations = [
        migrations.CreateModel(
            name='newsletter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail', models.EmailField(max_length=254)),
            ],
        ),
    ]

# Generated by Django 5.1.6 on 2025-03-05 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staffside', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sales',
            name='order_list',
        ),
        migrations.AddField(
            model_name='sales',
            name='order_list',
            field=models.ManyToManyField(to='staffside.order'),
        ),
    ]

# Generated by Django 3.1.4 on 2023-07-13 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0008_auto_20230713_1234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='uploadedDocument',
        ),
    ]

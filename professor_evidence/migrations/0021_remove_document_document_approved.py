# Generated by Django 3.1.4 on 2023-07-25 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0020_auto_20230724_2300'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='document_approved',
        ),
    ]

# Generated by Django 3.1.4 on 2023-07-14 01:15

from django.db import migrations, models
import professor_evidence.models


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0013_auto_20230713_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='uploadedDocument',
            field=models.FileField(upload_to=professor_evidence.models.Document.get_document_upload_path),
        ),
    ]

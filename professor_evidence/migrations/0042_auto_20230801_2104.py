# Generated by Django 3.1.4 on 2023-08-02 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0041_auto_20230801_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='report_uploadDate',
            field=models.DateField(auto_now=True),
        ),
    ]

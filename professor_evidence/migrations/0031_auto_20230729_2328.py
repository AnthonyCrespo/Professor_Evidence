# Generated by Django 3.1.4 on 2023-07-30 04:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0030_auto_20230729_2231'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='report',
            name='report_name',
        ),
        migrations.RemoveField(
            model_name='report',
            name='report_pathToFile',
        ),
    ]

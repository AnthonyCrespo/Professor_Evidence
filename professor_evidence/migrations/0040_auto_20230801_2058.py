# Generated by Django 3.1.4 on 2023-08-02 01:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0039_auto_20230801_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='report_uploadDate',
            field=models.DateField(default=datetime.date(2023, 8, 1)),
        ),
    ]

# Generated by Django 3.1.4 on 2023-07-31 06:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor_evidence', '0037_auto_20230731_0131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='report_uploadDate',
            field=models.DateField(default=datetime.date(2023, 7, 31)),
        ),
    ]
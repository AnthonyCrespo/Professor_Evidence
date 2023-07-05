# Generated by Django 4.2.1 on 2023-07-04 06:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity_Report_Investigation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_report_summary', models.TextField(max_length=200)),
                ('activity_report_hoursPerWeek', models.FloatField()),
                ('activity_report_hoursPerWeekIntersemester', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Activity_Report_Management',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_report_summary', models.TextField(max_length=200)),
                ('activity_report_hoursPerWeek', models.FloatField()),
                ('activity_report_hoursPerWeekIntersemester', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Activity_Report_Teaching',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_report_summary', models.TextField(max_length=200)),
                ('activity_report_hoursPerWeek', models.FloatField()),
                ('activity_report_hoursPerWeekIntersemester', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Activity_Report_Vinculation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_report_summary', models.TextField(max_length=200)),
                ('activity_report_hoursPerWeek', models.FloatField()),
                ('activity_report_hoursPerWeekIntersemester', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Activity_Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_type', models.TextField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Career',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('career_name', models.TextField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('professor_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('professor_degree', models.TextField(max_length=200)),
                ('professor_names', models.TextField(max_length=200)),
                ('professor_lastnames', models.TextField(max_length=200)),
                ('career_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.career')),
            ],
        ),
        migrations.CreateModel(
            name='Professor_Denomination',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('denomination', models.TextField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.TextField(max_length=200)),
                ('school_abbreviation', models.TextField(default=models.TextField(max_length=200), max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester_name', models.TextField(default='SM', max_length=200)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Semester_School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dean_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor')),
                ('school_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.school')),
                ('semester_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester')),
            ],
        ),
        migrations.CreateModel(
            name='Semester_Career',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('career_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.career')),
                ('coordinator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor')),
                ('semester_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester')),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report_name', models.TextField(max_length=200)),
                ('report_uploadDate', models.DateField()),
                ('report_professorComment', models.TextField(max_length=200)),
                ('report_revisorComment', models.TextField(max_length=200)),
                ('report_conclusion', models.TextField(blank=True, max_length=200)),
                ('report_isApproved', models.BooleanField(default=False)),
                ('report_pathToFile', models.TextField(max_length=200)),
                ('activity_report_investigation_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_report_investigation', verbose_name='Investigation Activity')),
                ('activity_report_management_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_report_management', verbose_name='Management Activity')),
                ('activity_report_teaching_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_report_teaching', verbose_name='Teaching Activity')),
                ('activity_report_vinculation_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_report_vinculation', verbose_name='Vinculation Activity')),
                ('professor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor')),
                ('report_approvedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester_school')),
                ('report_reviewedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester_career')),
                ('semester_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester')),
            ],
        ),
        migrations.AddField(
            model_name='professor',
            name='professor_denomination',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor_denomination'),
        ),
        migrations.CreateModel(
            name='Evidence_Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('evidence_type', models.CharField(max_length=250)),
                ('activity_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_type')),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_comment', models.TextField(blank=True)),
                ('document_uploadDate', models.DateField()),
                ('document_pathToFile', models.TextField(max_length=200)),
                ('activity_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.activity_type')),
                ('evidence_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.evidence_type')),
                ('professor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor')),
                ('semester_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester')),
            ],
        ),
        migrations.AddField(
            model_name='career',
            name='school_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.school'),
        ),
        migrations.AddField(
            model_name='activity_report_vinculation',
            name='document_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.document'),
        ),
        migrations.AddField(
            model_name='activity_report_vinculation',
            name='professor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor'),
        ),
        migrations.AddField(
            model_name='activity_report_vinculation',
            name='semester_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester'),
        ),
        migrations.AddField(
            model_name='activity_report_teaching',
            name='document_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.document'),
        ),
        migrations.AddField(
            model_name='activity_report_teaching',
            name='professor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor'),
        ),
        migrations.AddField(
            model_name='activity_report_teaching',
            name='semester_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester'),
        ),
        migrations.AddField(
            model_name='activity_report_management',
            name='document_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.document'),
        ),
        migrations.AddField(
            model_name='activity_report_management',
            name='professor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor'),
        ),
        migrations.AddField(
            model_name='activity_report_management',
            name='semester_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester'),
        ),
        migrations.AddField(
            model_name='activity_report_investigation',
            name='document_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.document'),
        ),
        migrations.AddField(
            model_name='activity_report_investigation',
            name='professor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.professor'),
        ),
        migrations.AddField(
            model_name='activity_report_investigation',
            name='semester_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor_evidence.semester'),
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
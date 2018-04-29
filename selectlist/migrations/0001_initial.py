# Generated by Django 2.0.4 on 2018-04-29 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Drug',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('stock', models.IntegerField(default=0)),
                ('company', models.CharField(blank=True, max_length=200)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

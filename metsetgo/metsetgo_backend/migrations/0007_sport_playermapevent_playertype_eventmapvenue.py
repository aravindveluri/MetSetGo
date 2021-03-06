# Generated by Django 4.0.4 on 2022-04-24 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metsetgo_backend', '0006_venue'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='playermapevent',
            name='playerType',
            field=models.CharField(default='A', max_length=100),
        ),
        migrations.CreateModel(
            name='EventMapVenue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metsetgo_backend.event')),
                ('venue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metsetgo_backend.venue')),
            ],
        ),
    ]

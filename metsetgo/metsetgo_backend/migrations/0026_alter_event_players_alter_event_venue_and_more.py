# Generated by Django 4.0.4 on 2022-04-28 09:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metsetgo_backend', '0025_event_sport_venue_playermapevent_eventmapvenue_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='players',
            field=models.ManyToManyField(through='metsetgo_backend.PlayerMapEvent', to='metsetgo_backend.player'),
        ),
        migrations.AlterField(
            model_name='event',
            name='venue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metsetgo_backend.venue'),
        ),
        migrations.AlterField(
            model_name='eventmapvenue',
            name='event',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='metsetgo_backend.event'),
        ),
        migrations.AlterUniqueTogether(
            name='playermapevent',
            unique_together={('player', 'event')},
        ),
    ]

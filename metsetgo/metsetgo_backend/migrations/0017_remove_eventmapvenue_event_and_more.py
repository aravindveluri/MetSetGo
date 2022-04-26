# Generated by Django 4.0.4 on 2022-04-26 12:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metsetgo_backend', '0016_event_isfinished'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventmapvenue',
            name='event',
        ),
        migrations.RemoveField(
            model_name='eventmapvenue',
            name='venue',
        ),
        migrations.RemoveField(
            model_name='playermapevent',
            name='event',
        ),
        migrations.RemoveField(
            model_name='playermapevent',
            name='player',
        ),
        migrations.DeleteModel(
            name='Event',
        ),
        migrations.DeleteModel(
            name='EventMapVenue',
        ),
        migrations.DeleteModel(
            name='PlayerMapEvent',
        ),
        migrations.DeleteModel(
            name='Sport',
        ),
        migrations.DeleteModel(
            name='Venue',
        ),
    ]

# Generated by Django 4.0.4 on 2022-04-29 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metsetgo_backend', '0026_alter_event_players_alter_event_venue_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other'), ('N', 'Prefer not to say')], default='N', max_length=1),
        ),
    ]

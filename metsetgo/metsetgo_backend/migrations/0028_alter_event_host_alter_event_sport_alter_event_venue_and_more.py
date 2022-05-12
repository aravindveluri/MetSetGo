# Generated by Django 4.0.4 on 2022-05-11 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metsetgo_backend', '0027_alter_player_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='host', to='metsetgo_backend.player'),
        ),
        migrations.AlterField(
            model_name='event',
            name='sport',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.sport'),
        ),
        migrations.AlterField(
            model_name='event',
            name='venue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.venue'),
        ),
        migrations.AlterField(
            model_name='eventmapvenue',
            name='event',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.event'),
        ),
        migrations.AlterField(
            model_name='eventmapvenue',
            name='venue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.venue'),
        ),
        migrations.AlterField(
            model_name='playermapevent',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.event'),
        ),
        migrations.AlterField(
            model_name='playermapevent',
            name='player',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='metsetgo_backend.player'),
        ),
    ]
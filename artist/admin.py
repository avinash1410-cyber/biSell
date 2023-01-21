from re import A
from django.contrib import admin

# Register your models here.
from .models import Artist
admin.site.register(Artist)
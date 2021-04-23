from django.contrib import admin
from api.models import Category,Book,TopBook,Author,UserProfile
# Register your models here.
admin.site.register(Category)
admin.site.register(Book)
# admin.site.register(TopBook)
admin.site.register(Author)
admin.site.register(UserProfile)

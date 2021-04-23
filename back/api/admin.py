from django.contrib import admin

from api.models import Category, Subcategory, Book, Author

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Book)
admin.site.register(Author)

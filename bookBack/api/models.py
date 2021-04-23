from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=300)


class Author(models.Model):
    name = models.CharField(max_length=300)


class TopBook(models.Manager):
    def get_queryset(self):
        return super().get_queryset()[:10]#set of books which quantity =10


class Book(models.Model):
    name = models.CharField(max_length=300)
    price = models.IntegerField(default=5000)
    description = models.TextField(default='default description')
    rating = models.IntegerField(range(1, 6), default=1)
    status = models.TextField(default='default status')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='books')
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')

    objects = models.Manager()
    top_list = TopBook()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=300, default='')
    books = models.ManyToManyField(Book, default=[])

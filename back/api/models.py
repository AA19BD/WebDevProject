from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class Subcategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    description = models.TextField()

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class Author(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField()
    image = models.CharField(max_length=200)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class Book(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField()
    image = models.CharField(max_length=200)
    price = models.IntegerField(default=2000)
    rating = models.IntegerField(range(1, 6), default=1)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, related_name='books')

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

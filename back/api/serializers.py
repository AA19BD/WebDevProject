from rest_framework import serializers
from api.models import Category, Subcategory, Book, Author
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=32)

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data.get('name'))
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ('id', 'category', 'name', 'description')


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'description', 'image', 'price', 'rating', 'author', 'subcategory')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'description', 'image')


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=64)
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=64)

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data.get('username'),
                                        email=validated_data.get('email'),
                                        password=validated_data.get('password'))

        user.save()
        return user

    def update(self, instance, validated_data):
        return instance

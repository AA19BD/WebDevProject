from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.models import Category, Author, Book, UserProfile
from api.serializers import CategorySerializer, AuthorSerializer, BookSerializer, UserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view


@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST',])
def userProfile_list(request):
    if request.method == 'GET':
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request):
    try:
        user = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist as e:
        return Response({'errors': str(e)})

    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors})
    elif request.method == 'DELETE':
        user.delete()
        return Response({'deleted': True})

@api_view(['PUT', 'DELETE'])
def my_book(request, pk):
    if request.user.id:
        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist as e:
            return Response({'errors': str(e)})

        try:
            book = Book.objects.get(id=pk)
        except Book.DoesNotExist as e:
            return Response({'errors': str(e)})

        if request.method == 'PUT':
            user.books.add(book)
            user.save()
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        elif request.method == 'DELETE':
            user.books.remove(book)
            user.save()
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)

    else:
        return Response({'errors': "User id null"})


#First CBV
class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Second CBV
class CategoryDetail(APIView):
    is_exist = True
    def get_category(self, pk):
        try:
            return Category.objects.get(id=pk)
        except Category.DoesNotExist as e:
            self.is_exist = False
            return Response({'error': str(e)})

    def get(self, request, pk):
        self.is_exist = True
        category = self.get_category(pk)
        if self.is_exist:
            serializer = CategorySerializer(category)
            return Response(serializer.data)
        else:
            return category

    def put(self, request, pk):
        self.is_exist = True
        category = self.get_category(pk)
        if self.is_exist:
            serializer = CategorySerializer(instance=category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'errors': serializer.errors})
        else:
            return category

    def delete(self, request, pk):
        self.is_exist = True
        category = self.get_category(pk)
        if self.is_exist:
            category.delete()
            return Response({'deleted': True})
        else:
            return category


class BookList(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializers = BookSerializer(books, many=True)
        return Response(serializers.data)

    def post(self, request):
        serializers = BookSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializers.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BookDetail(APIView):
    is_exist = True

    def get_book(self, pk):
        try:
            return Book.objects.get(id=pk)
        except Book.DoesNotExist as e:
            self.is_exist = False
            return Response({'errors': str(e)})

    def get(self, request, pk):
        self.is_exist = True
        book = self.get_book(pk)
        if self.is_exist:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        else:
            return book

    def put(self, request, pk):
        self.is_exist = True
        book = self.get_book(pk)
        if self.is_exist:
            serializer = BookSerializer(instance=book, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'errors': serializer.errors})
        else:
            return book

    def delete(self, request, pk):
        self.is_exist = True
        book = self.get_book(pk)
        if self.is_exist:
            book.delete()
            return Response({'deleted': True})
        else:
            return book



#First FBV
@api_view(['GET', 'POST'])
def author_list(request):
    if request.method == 'GET':
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Second FBV
@api_view(['GET', 'PUT', 'DELETE'])
def author_detail(request, pk):
    try:
        author = Author.objects.get(id=pk)
    except Author.DoesNotExist as e:
        return Response({'errors': str(e)})

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AuthorSerializer(instance=author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors})

    elif request.method == 'DELETE':
        author.delete()
        return Response({'deleted': True})

@api_view(['GET'])
def category_books(request, pk):
    try:
        category = Category.objects.get(id=pk)
    except Category.DoesNotExist as e:
        return Response({'errors': str(e)})
    books = category.books.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def author_books(request, pk):
    try:
        author = Author.objects.get(id=pk)
    except Author.DoesNotExist as e:
        return Response({'errors': str(e)})
    books = author.books.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def top_books(request):
    top_list = Book.top_list.all()
    serializer = BookSerializer(top_list, many=True)
    return Response(serializer.data)

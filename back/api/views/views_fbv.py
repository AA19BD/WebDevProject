from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Category, Subcategory, Author, Book
from api.serializers import CategorySerializer, SubcategorySerializer, AuthorSerializer, BookSerializer


@api_view(['GET', 'POST'])
def subcategory_list(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        subcategories = Subcategory.objects.filter(category=category)
        serializer = SubcategorySerializer(subcategories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SubcategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def category_details(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response({'error': str(e)})
    serializer = CategorySerializer(category)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def book_details(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BookSerializer(instance=book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors})
    elif request.method == 'DELETE':
        book.delete()
        return Response({'deleted': True})


@api_view(['GET'])
def book_list(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def author_details(request, author_id):
    try:
        author = Author.objects.get(id=author_id)
    except Author.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AuthorSerializer(instance=author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors})
    elif request.method == 'DELETE':
        author.delete()
        return Response({'deleted': True})

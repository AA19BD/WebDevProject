from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from api.models import Category, Subcategory, Author, Book
from api.serializers import CategorySerializer, SubcategorySerializer, AuthorSerializer, BookSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CategoriesListAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)


class AuthorsListAPIView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class SubcategoryRelated:
    @staticmethod
    def get_object(subcategory_id):
        try:
            return Subcategory.objects.get(id=subcategory_id)
        except Subcategory.DoesNotExist as e:
            return Response({'error': str(e)})


class BooksListAPIView(APIView, SubcategoryRelated):
    def get(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        books = Book.objects.filter(subcategory=subcategory)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request, subcategory_id):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubcategoryDetailsAPIView(APIView, SubcategoryRelated):
    def get(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        serializer = SubcategorySerializer(subcategory)
        return Response(serializer.data)

    def put(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        serializer = SubcategorySerializer(instance=subcategory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors})

    def delete(self, request, subcategory_id):
        subcategory = self.get_object(subcategory_id)
        subcategory.delete()
        return Response({'deleted': True})

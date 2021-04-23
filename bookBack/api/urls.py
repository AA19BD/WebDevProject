from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from api.views import CategoryList, CategoryDetail, author_list, author_detail, BookList, BookDetail, user_list,\
    userProfile_list, user_detail, my_book, category_books, author_books, top_books

urlpatterns = [
    path('login', obtain_jwt_token),
    path('categories', CategoryList.as_view()),
    path('categories/<int:pk>', CategoryDetail.as_view()),
    path('categories/<int:pk>/books', category_books),
    path('authors', author_list),
    path('authors/<int:pk>', author_detail),
    path('authors/<int:pk>/books', author_books),
    path('books', BookList.as_view()),
    path('books/<int:pk>', BookDetail.as_view()),
    path('books/top', top_books),
    path('musers', user_list),#all users that were created
    path('users', userProfile_list),#users details with all information
    path('user', user_detail),# current user
    path('mybook/<int:pk>', my_book),#delete or update all books in userprofile
]

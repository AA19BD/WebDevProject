from django.urls import path
from api.views import views_cbv, views_fbv, views_auth
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('categories/', views_cbv.CategoriesListAPIView.as_view()),
    path('categories/<int:category_id>/subcategories', views_fbv.subcategory_list),
    path('subcategories/<int:subcategory_id>/', views_cbv.SubcategoryDetailsAPIView.as_view()),
    path('subcategories/<int:subcategory_id>/books/', views_cbv.BooksListAPIView.as_view()),
    path('books/', views_fbv.book_list),
    path('books/<int:book_id>', views_fbv.book_details),
    path('authors', views_cbv.AuthorsListAPIView.as_view()),
    path('authors/<int:author_id>', views_fbv.author_details),
    path('signup/', views_auth.sign_up),
    path('users/<str:username>/', views_auth.get_user)
]
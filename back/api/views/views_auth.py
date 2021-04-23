from rest_framework.response import Response
from api.serializers import UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User


@api_view(['POST'])
def sign_up(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_user(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist as e:
        return Response({'error': str(e)})

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
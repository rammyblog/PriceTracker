from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import ItemSerializer

from pricechecker.models import Item


class ItemViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    
    serializer_class = ItemSerializer
    

    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user)
    
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # def list(self, request):
    #     queryset = Item.objects.all()
    #     serializer = ItemSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     queryset = User.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data)
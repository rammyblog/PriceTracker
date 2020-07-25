from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import ItemSerializer

from pricechecker.models import Item


class ItemViewSet(viewsets.ModelViewSet):
    """
           retrieve:
           Return the an itemm from the db.

           list:
           Return a list of all the items.

           create:
           Create a new item
           To create an item, you only need to send the
           * URL
           * requested_price.
           The remaining fields will be auto populated by the scraper.
           The custom create method is in use by the serializer.
       """

    serializer_class = ItemSerializer

    def get_queryset(self):
        print(self.request.user)
        return Item.objects.filter(owner=self.request.user).order_by('-updated_at')

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

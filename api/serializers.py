from pricechecker.models import Item
from pricechecker.utils import CrawlData
from rest_framework import serializers
from .mixins import CustomErrorSerializer


from django.utils.translation import ugettext_lazy as _

from rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from .mixins import CustomErrorSerializer
from rest_auth.registration.serializers import RegisterSerializer


class RegisterSerializer(CustomErrorSerializer, RegisterSerializer):
    pass


class PasswordResetSerializer(CustomErrorSerializer, PasswordResetSerializer):
    pass


class LoginSerializer(CustomErrorSerializer, LoginSerializer):
    pass


class ItemSerializer(CustomErrorSerializer, serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'

    @staticmethod
    def get_item_data(url, store):
        crawl = CrawlData()
        if store == 'KO':
            return crawl.crawl_konga(url)
        if store == 'JM':
            return crawl.crawl_jumia(url)

    def get_user(self):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            return request.user
        return None

    def create(self, obj):
        owner = self.get_user()
        if Item.objects.filter(url=obj['url']).exists():
            raise serializers.ValidationError(
                'Oppss, This url already exists, Kindly edit it to make any changes')
        crawled_data = self.get_item_data(obj['url'], obj['store'])
        obj['title'] = crawled_data['title']
        obj['last_price'] = crawled_data['last_price']
        return Item.objects.create(**obj)

    def update(self, obj):
        crawled_data = self.get_item_data(obj['url'], obj['store'])
        obj['title'] = crawled_data['title']
        obj['last_price'] = crawled_data['last_price']
        return Item.objects.create(**obj)

    def update(self, instance, validated_data):
        url = validated_data.get('url', instance.url)
        if(url != instance.url):
            if Item.objects.filter(url=obj['url']).exists():
                raise serializers.ValidationError(
                    'Oppss, This url already exists, Kindly edit it to make any changes')
            crawled_data = self.get_item_data(
                url,  validated_data.get('store', instance.store))
            instance.title = crawled_data['title']
            instance.last_price = crawled_data['last_price']
            instance.url = url
        instance.requested_price = validated_data.get(
            'requested_price', instance.requested_price)
        # instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance

    # def save(self, obj):
    #     print(self.request.obj)

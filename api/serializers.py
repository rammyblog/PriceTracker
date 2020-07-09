from django.core.exceptions import ValidationError
from pricechecker.models import Item
from pricechecker.utils import CrawlData
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from rest_framework import serializers

from .mixins import CustomErrorSerializer


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
        if Item.objects.filter(owner=owner).filter(url=obj['url']).exists():
            raise serializers.ValidationError(
                'Oppss, This url already exists, Kindly edit it to make any changes')
        try:
            crawled_data = self.get_item_data(obj['url'], obj['store'])
        except ValidationError as err:
            print(err.messages)
            raise serializers.ValidationError(err.messages)
        obj['title'] = crawled_data['title']
        obj['last_price'] = crawled_data['last_price']
        return Item.objects.create(**obj)

    def update(self, instance, validated_data):
        url = validated_data.get('url', instance.url)
        if url != instance.url:
            if Item.objects.filter(owner=self.get_user()).filter(url=url).exists():
                raise serializers.ValidationError(
                    'Oppss, This url already exists, Kindly edit it to make any changes')
            try:
                crawled_data = self.get_item_data(
                    url, validated_data.get('store', instance.store))
            except ValidationError as err:
                # print(err)
                raise serializers.ValidationError(err.messages)
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

from pricechecker.models import Item
from pricechecker.utils import CrawlData
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Item
        fields = '__all__'
    
    
    @staticmethod
    def get_item_data( url, store):
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
            raise serializers.ValidationError('Oppss, This url already exists, Kindly edit it to make any changes')
        crawled_data =  self.get_item_data(obj['url'], obj['store'])
        obj['title'] = crawled_data['title']
        obj['last_price'] = crawled_data['last_price']     
        return Item.objects.create(**obj)


    
    # def save(self, obj):
    #     print(self.request.obj)
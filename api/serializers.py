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
        print(obj)
        owner = self.get_user()
        crawled_data =  self.get_item_data(obj['url'], obj['store'])
        obj.title = crawled_data['data']
        obj.last_price = crawled_data['last_price']     
        obj.save()
        return obj

    
    # def save(self, obj):
    #     print(self.request.obj)
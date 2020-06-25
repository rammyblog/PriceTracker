import time
from celery import shared_task
from .models import Item
from .utils import CrawlData


def get_item_data( url, store):
    crawl = CrawlData()
    if store == 'KO':
        return crawl.crawl_konga(url)
    if store == 'JM':
        return crawl.crawl_jumia(url)


@shared_task
def track_for_discount():
    items = Item.objects.all()


    for item in items:


        #crawl item url
        data = get_item_data(item.url, item.store)

        if data['last_price'] <= item.requested_price:
            print(f'Discount for {data["title"]}')
            # update discount field to notify user
            item_discount = Item.objects.get(id=item.id)
            item_discount.discount_price = f'DISCOUNT! The price is {data["last_price"]}'
            item_discount.save()



@shared_task
def track_for_not_discount():
    items = Item.objects.all()
    
    for item in items:
        data = crawl_data(item.url)

        if data["last_price"] > item.requested_price:
            print(f'Discount finished for {data["title"]}')
            item_discount_finished = Item.objects.get(id=item.id)
            item_discount_finished.discount_price = "No discount yet"
            item_discount_finished.save()


while True:
    track_for_discount()
    time.sleep(15)
    # track_for_not_discount()
    # time.sleep(15)
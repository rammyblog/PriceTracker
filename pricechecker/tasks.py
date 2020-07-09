import os
import time

from celery import shared_task
from django.core.exceptions import ValidationError
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from .models import Item
from .utils import CrawlData


def get_item_data(url, store):
    crawl = CrawlData()
    if store == 'KO':
        return crawl.crawl_konga(url)
    if store == 'JM':
        return crawl.crawl_jumia(url)


def send_email(email, last_price, title, url):
    print('meail')
    message = Mail(
        from_email='info@ptracker.com',
        to_emails=email,
        subject=f'{title} got a price update',
        html_content=f'You recently added {title} on pTracker.<br/> We have good news for you 🥳 the price has been '
                     f'updated to fit your budget 🎉🎉. <br/> The new price is <strong> ₦{last_price}</strong>. '
                     f'</br>Click <a href={url}>here</a> to buy now, or copy the link below and paste in your browser '
                     f'<br> {url}')
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print('eerror')
        print(e.message)


@shared_task
def track_for_discount():
    items = Item.objects.all()

    for item in items:

        # crawl item url
        try:
            data = get_item_data(item.url, item.store)
            last_price = data['last_price'].replace(',', '')
            requested_price = item.requested_price
            print(data)
            if int(last_price) <= requested_price:
                # print(f'Discount for {data["title"]}')
                # update discount field to notify user
                email = item.owner.email
                last_price = last_price
                title = item.title
                url = item.url
                send_email(email, last_price, title, url)
                item_discount = Item.objects.get(id=item.id)
                item_discount.last_price = data['last_price']
                item_discount.discount_price = f'DISCOUNT! The price is {data["last_price"]}'
                item_discount.save()
        except ValidationError:
            print(item.url)
            data = {'last_price': '0'}
            item_discount = Item.objects.get(id=item.id)
            item_discount.last_price = data['last_price']
            item_discount.discount_price = f'DISCOUNT! The price is {data["last_price"]}'
            item_discount.save()


@shared_task
def track_for_not_discount():
    items = Item.objects.all()

    for item in items:
        data = crawl_data(item.url)

        last_price = data['last_price'].replace(',', '')
        requested_price = item.requested_price

        if int(last_price) <= requested_price:
            print(f'Discount finished for {data["title"]}')
            item_discount_finished = Item.objects.get(id=item.id)
            item_discount_finished.discount_price = "No discount yet"
            item_discount_finished.save()


while True:
    track_for_discount()
    time.sleep(15)
    # track_for_not_discount()
    # time.sleep(15)

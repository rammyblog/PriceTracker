
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from django.core.exceptions import ValidationError


class CrawlData:

    # def __init__(self):
    def load_url(self, url):

        # User Agent is to prevent 403 Forbidden Error
        req = Request(url, headers={
            'User-Agent': 'Mozilla/5.0'
        })
        html = urlopen(req).read()
        bs = BeautifulSoup(html, 'html.parser')
        # print( bs.find('input', type='hidden').get_text())

        return bs

    def crawl_konga(self, url):

        try:
            document = self.load_url(url)
            price = document.find(
                "input", {'name': 'product_price'}).get('value')
            title = document.find("title").get_text().split('|')[0]

        except:
            raise ValidationError(
                'An error occured. Double check the URL and ensure it leads to the product page')

            # price = '0'
            # title = 'Not Found'

        return {
            'title': title,
            'last_price': price
        }

    def crawl_jumia(self, url):
        try:
            document = self.load_url(url)
            price = document.find(
                "span", {'class': "-b -ltr -tal -fs24"}).get_text().replace("₦", "").strip()
            title = document.find("title").get_text().split('|')[0]
        except:
            raise ValidationError(
                'An error occured. Double check the URL and ensure it leads to the product page')
            # price = '0'
            # title = 'Not Found'
        return {
            'title': title,
            'last_price': price
        }


# crawl_data('https://www.konga.com/product/slim-regular-jeans-for-men-blue-3538616')
# # product_price

# a = CrawlData().crawl_jumia('https://www.jumia.com.ng/infinix-infinix-hot-9-playx680-6.82-hd-cinematic-display-32gb-rom2gb-ram-8mp13mp-6000mah-4g-lte-midnight-black-59578557.html')
# print(a)

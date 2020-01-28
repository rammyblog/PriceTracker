
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup

def crawl_data(url):
    # User Agent is to prevent 403 Forbidden Error
    req = Request(url, headers={
        'User-Agent':'Mozilla/5.0'
    })
    html = urlopen(req).read()
    bs = BeautifulSoup(html, 'html.parser')

    title = bs.find('h1', id='itemTitle').get_text().replace("Details about", "")
    price = bs.find('span', id="prcIsum").get_text()
    clean_price = float(price.strip().replace('US', '').replace("$", ""))
    return {
        'title':title,
        'last_price': clean_price
    }

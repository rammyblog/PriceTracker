# PriceTracker
Price Tracker Application with Django and React  used to Track Discounts on Jumia and Konga 


To run the application, run the following commands on your terminal

```git clone https://github.com/rammyblog/PriceTracker.git``` 

Then install the dependencies 

``` pip3 install -r requirements.txt ```

Cd into the folder PriceTracker-master

``` cd PriceTracker-master ```


First migrate 

``` python manage.py migrate ```

Then run celery with your terminal

``` celery -A pricetracker worker -l info ```

Finally run the application

``` python manage.py runserver ```

The app should be live at http://127.0.0.1:8000
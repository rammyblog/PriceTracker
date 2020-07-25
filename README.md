<h1 align="center">Welcome to pTracker 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/simply_rammy" target="_blank">
    <img alt="Twitter: simply_rammy" src="https://img.shields.io/twitter/follow/simply_rammy.svg?style=social" />
  </a>
</p>

# PriceTracker
Price Tracker Application with Django and React  used to Track Discounts on Jumia and Konga 

##Install
To install the application, run the following commands on your terminal

```git clone https://github.com/rammyblog/PriceTracker.git``` 

Then install the dependencies 

``` pip3 install -r requirements.txt ```

Cd into the folder PriceTracker-master

``` cd PriceTracker-master ```


First migrate 

``` python manage.py migrate ```

Then run celery with your so the scraper can work

``` celery -A pricetracker worker -l info ```

Finally run the application

``` python manage.py runserver ```
The app should be live at http://127.0.0.1:8000

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

* How to Add support for more stores
    
    The scraper class is located in pricechecker.utils, Currently I have a function for Konga and Jumia.
    You can add other methods to that class.
    
    After adding a new method for a store, you will need to add it to the store choice in Item model located in pricechecker.model and get_item_data method in pricechecker.utils

_Also refer to the [Documentation](https://store-tracker.herokuapp.com/api/docs/swagger/) for more details_


<!-- CONTACT -->
## Author

👤 **Onasanya Babatunde**

- Website: [onasanyatunde.codes](https://onasanyatunde.codes/)
- Twitter: [@simply_rammy](https://twitter.com/simply_rammy)
- Github: [@rammyblog](https://github.com/rammyblog)
- LinkedIn: [@onasanya-tunde](https://linkedin.com/in/onasanya-tunde)




web: gunicorn pricetracker.wsgi
worker: celery -A pricetracker worker -l info
release: python manage.py migrate
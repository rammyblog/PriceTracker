from django.shortcuts import render, get_object_or_404,HttpResponseRedirect 
from .models import Item
from .forms import AddNewItemForm
# from .utils import CrawlData

def tracker_view(request):
    items = Item.objects.order_by('-id')
    form = AddNewItemForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            url = form.cleaned_data.get('url')
            requested_price = form.cleaned_data.get('requested_price')

            # crawling the data
            # crawled_data = crawl_data(url)
            Item.objects.create(
                url = url,
                title = crawled_data['title'],
                requested_price=requested_price,
                last_price=crawled_data['last_price'],
                discount_price = 'No discount yet'
            )
            return HttpResponseRedirect('')
        else:
            form = AddNewItemForm()

    context = {
        'items':items,
        'form':form
    }
    return render(request, 'tracker.html', context)
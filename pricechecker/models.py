from django.contrib.auth.models import User
from django.db import models


class Item(models.Model):
    JUMIA = 'JM'
    KONGA = 'KO'
    STORE_CHOICES = [
        (JUMIA, 'Jumia'),
        (KONGA, 'Konga'),
    ]

    title = models.CharField(help_text='Item Name', max_length=200, null=True, blank=True)
    url = models.CharField(help_text='Link to the item', max_length=600, null=True, blank=True)
    requested_price = models.IntegerField(default=0, help_text='The price you want to track (Desired price)')
    last_price = models.CharField(max_length=100, null=True, blank=True,
                                  help_text='The price that the scraper got last')
    discount_price = models.CharField(max_length=100, null=True, blank=True,
                                      help_text='If the last price meets the condition of the requested price, the new price is stored here')
    store = models.CharField(
        max_length=2,
        choices=STORE_CHOICES,
        blank=True,
        null=True,
        help_text='Store choice'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                              help_text='The user that created the item')

    class Meta:
        verbose_name = ("Item")
        verbose_name_plural = ("Items")

    def __str__(self):
        return self.title

    # def get_absolute_url(self):
    #     return reverse("Item_detail", kwargs={"pk": self.pk})

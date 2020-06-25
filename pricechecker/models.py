from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    JUMIA = 'JM'
    KONGA = 'KO'
    STORE_CHOICES = [
        (JUMIA, 'Jumia'),
        (KONGA, 'Konga'),
    ]

    title = models.CharField(max_length=200, null=True, blank=True)
    url = models.CharField(max_length=600, null=True, blank=True)
    requested_price = models.IntegerField(default=0)
    last_price = models.IntegerField(null=True, blank=True)
    discount_price = models.CharField(max_length=100, null=True, blank=True)
    store = models.CharField(
        max_length=2,
        choices=STORE_CHOICES,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at =models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    

    class Meta:
        verbose_name = ("Item")
        verbose_name_plural = ("Items")

    def __str__(self):
        return self.title

    # def get_absolute_url(self):
    #     return reverse("Item_detail", kwargs={"pk": self.pk})

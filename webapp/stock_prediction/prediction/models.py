from django.db import models
from django.forms import ModelForm

# Create your models here.
class ModelConfig(models.Model):
    model_name = models.CharField(max_length=100)
    api_endpoint = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.model_name


class ModelConfigForm(ModelForm):
    class Meta:
        model = ModelConfig
        fields = ['model_name', 'api_endpoint', 'description']
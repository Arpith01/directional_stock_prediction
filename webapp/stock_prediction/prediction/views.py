from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import ModelConfig, ModelConfigForm

# Create your views here.
def index(request):
    models_configs = ModelConfig.objects.all()
    context = {'model_config_list':models_configs}
    return render(request, 'prediction/index.html', context)

def config(request):
    models_configs = ModelConfig.objects.all()
    context = {'model_config_list':models_configs}
    return render(request, 'prediction/config.html', context)

def detail(request, model_id):
    config_detail = get_object_or_404(ModelConfig, pk=model_id)
    context = {'config_detail':config_detail}
    return render(request, 'prediction/config_detail.html', context)

def new_config(request):
    return render(request, 'prediction/config_detail.html')

def upsert_config(request, model_id = None):
    if model_id is None:
        object = None
    else:
        object = get_object_or_404(ModelConfig, pk= model_id)

    if request.method == 'POST':
        form = ModelConfigForm(request.POST, instance = object)
        if form.is_valid():
            object = form.save()
            return HttpResponseRedirect(reverse('prediction:config'))
    else:
        form = ModelConfigForm(instance = object)
    return HttpResponseRedirect(reverse('prediction:config'))


def delete_config(request, model_id):
    config_detail = get_object_or_404(ModelConfig, pk= model_id)
    config_detail.delete()
    return HttpResponseRedirect(reverse('prediction:config'))

def rankings(request):
    models_configs = ModelConfig.objects.all()
    context = {'model_config_list':models_configs}
    return render(request, 'prediction/rankings.html', context)
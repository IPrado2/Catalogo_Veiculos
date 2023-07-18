from rest_framework import serializers
from CatalagoApp.models import Marca, Modelo, Veiculo
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth import authenticate


class MarcaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Marca
		fields = ('marca_id',
				  'nome')
		
class ModeloSerializer(serializers.ModelSerializer):
	class Meta:
		model = Modelo
		fields = ('modelo_id',
				  'nome')
		
class VeiculoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Veiculo
		fields = ('veiculo_id',
				  'nome',
				  'marca',
				  'modelo',
				  'valor',
				  'foto')

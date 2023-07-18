from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from CatalagoApp.models import Marca, Modelo, Veiculo
from CatalagoApp.serializers import MarcaSerializer, ModeloSerializer, VeiculoSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import logout
import os
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import token_obtain_pair
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import User
from rest_framework import status

def get_marca(request, id=0):
	if request.method == 'GET':
		if id != 0:
			marca = Marca.objects.get(marca_id=id)
			marca_serializer = MarcaSerializer(marca)
			return JsonResponse(marca_serializer.data, safe=False)
		else:
			marca = Marca.objects.all()
			marca_serializer = MarcaSerializer(marca, many=True)
			return JsonResponse(marca_serializer.data, safe=False)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_marca(request):
	marca_data = JSONParser().parse(request)
	marca_serializer = MarcaSerializer(data=marca_data)
	if marca_serializer.is_valid():
		marca_serializer.save()
		return JsonResponse("Marca cadastrada com sucesso!", safe=False)
	return JsonResponse("Não foi possível cadastrar essa marca!", safe=False)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_marca(request, id):
    try:
        marca = Marca.objects.get(marca_id=id)
    except Marca.DoesNotExist:
        return JsonResponse("Marca não encontrada!", status=404, safe=False)

    marca.nome = request.data.get('nome', marca.nome)  # Obtém o novo nome da requisição, caso não seja fornecido, mantém o nome atual
    marca.save()

    return JsonResponse("Marca atualizada com sucesso!", safe=False)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_marca(request, id):
	marca = Marca.objects.get(marca_id=id)
	marca.delete()
	return JsonResponse("Marca excluída com sucesso!", safe=False)


## MODELO
def get_modelo(request, id=0):
	if id != 0:
		modelo = Modelo.objects.get(modelo_id=id)
		modelo_serializer = ModeloSerializer(modelo)
		return JsonResponse(modelo_serializer.data, safe=False)
	else:
		modelos = Modelo.objects.all()
		modelo_serializer = ModeloSerializer(modelos, many=True)
		return JsonResponse(modelo_serializer.data, safe=False)
			
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])		
def create_modelo(request):
	modelo_data = JSONParser().parse(request)
	modelo_serializer = ModeloSerializer(data=modelo_data)
	if modelo_serializer.is_valid():
		modelo_serializer.save()
		return JsonResponse("Modelo cadastrado com sucesso!", safe=False)
	return JsonResponse("Não foi possível cadastrar esse modelo!", safe=False)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])	
def update_modelo(request, id):
    try:
        modelo = Modelo.objects.get(modelo_id=id)
    except Modelo.DoesNotExist:
        return JsonResponse("Modelo não encontrada!", status=404, safe=False)

    modelo.nome = request.data.get('nome', modelo.nome)  # Obtém o novo nome da requisição, caso não seja fornecido, mantém o nome atual
    modelo.save()

    return JsonResponse("Modelo atualizada com sucesso!", safe=False)


@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])	
def delete_modelo(request, id):
	modelo = Modelo.objects.get(modelo_id=id)
	modelo.delete()
	return JsonResponse("Modelo excluído com sucesso!", safe=False)



## VEICULO
def get_veiculo(request, id=0):
	order_by = request.GET.get('order_by', None)
	
	if id != 0:
		veiculos = Veiculo.objects.get(veiculo_id=id)
		veiculo_serializer = VeiculoSerializer(veiculos)
		return JsonResponse(veiculo_serializer.data, safe=False)
	else:
		veiculos = Veiculo.objects.all()
		
		if order_by:
			veiculos = sorted(veiculos, key=lambda v: v.valor, reverse=True)
                
	  
		veiculo_serializer = VeiculoSerializer(veiculos, many=True)
		return JsonResponse(veiculo_serializer.data, safe=False)

@api_view(['GET'])		
def get_media_file(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='image/png')
            return response
    else:
        return HttpResponse(status=404)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])		
def create_veiculo(request):
	veiculo_data = JSONParser().parse(request)

	veiculo_serializer = VeiculoSerializer(data=veiculo_data)
	if veiculo_serializer.is_valid():
		veiculo_serializer.save()
		return JsonResponse("Veiculo cadastrado com sucesso!", safe=False)
	return JsonResponse("Não foi possível cadastrar esse veiculo!", safe=False)


@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_veiculo(request, id):
    try:
        veiculo = Veiculo.objects.get(veiculo_id=id)
    except Veiculo.DoesNotExist:
        return JsonResponse("Veiculo não encontrado!", status=404, safe=False)

    veiculo.nome = request.POST.get('nome', veiculo.nome)
    veiculo.marca_id = request.POST.get('marca_id', veiculo.marca_id)
    veiculo.modelo_id = request.POST.get('modelo_id', veiculo.modelo_id)
    veiculo.valor = request.POST.get('valor', veiculo.valor)
    veiculo.foto = request.POST.get('foto', veiculo.foto)
    
    veiculo.save()

    return JsonResponse("Veiculo atualizado com sucesso!", safe=False)


@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_veiculo(request, id):
	veiculo = Veiculo.objects.get(veiculo_id=id)
	veiculo.delete()
	return JsonResponse("Veiculo excluído com sucesso!", safe=False)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def upload_image(request):
	if request.FILES:
		image_file = request.FILES['image']
		fs = FileSystemStorage()
		filename = fs.save(image_file.name, image_file)
		uploaded_file_url = fs.url(filename)
		return Response('Imagem enviada com sucesso: ' + uploaded_file_url)
	return Response('Erro ao enviar a imagem.')


@api_view(['POST'])
def login(request):
    # Extrair as credenciais do usuário do corpo da solicitação POST
    username = request.data.get('username')
    password = request.data.get('password')

    # Autenticar o usuário
    user = authenticate(username=username, password=password)

    if user is not None:
        # Gerar o token JWT para o usuário autenticado
        token_obtain_pair = TokenObtainPairSerializer()
        token = token_obtain_pair.get_token(user)
        # Retornar o token JWT na resposta
        return Response({'access_token': str(token.access_token), "Data": str(token.exp)})
    else:
        # Caso as credenciais estejam incorretas, retornar uma mensagem de erro
        return Response({'error': 'Credenciais inválidas'}, status=401)

        
@api_view(['POST'])
def logout(request):
 	logout(request)
 	return Response('Saiu com sucesso!')
 	

@api_view(['POST'])
def register_admin(request):
    # Extrair os dados do usuário do corpo da solicitação POST
    username = request.data.get('username')
    password = request.data.get('password')

    # Verificar se o usuário não existe no banco de dados
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Nome de usuário já está em uso'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Crie um novo superusuário
    admin_user = User.objects.create_superuser(username=username, password=password)
    
    admin_user.save()

    # Retornar uma resposta de sucesso
    return Response({'success': 'Usuário registrado com sucesso!'}, status=status.HTTP_201_CREATED)


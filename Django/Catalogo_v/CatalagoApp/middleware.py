from django.http import JsonResponse
import jwt
from datetime import datetime
from django.conf import settings
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.exceptions import InvalidToken
import time

class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path_info

         # ROTAS QUE IGNORAM TOKEN
        ignored_paths = [
            '/login/',
            '/get_marca/',
            '/get_modelo/',
            '/get_veiculo/'
        ]

        if path in ignored_paths or path.startswith('/media/') or path.startswith('/admin/'):
            return self.get_response(request)
            
        token = request.META.get('HTTP_AUTHORIZATION')

        if not token:
            response = {
                'error': 'Token inválido'
            }
            return JsonResponse(response, status=401)

        return self.get_response(request)

    def validate_simplejwt_token(self, token):
        try:
            decoded_token = jwt.decode(token, algorithms=["HS256"])
            access_token = decoded_token.get("access")
            
            if access_token:
                # Verifique a validade do token
                expires_at = decoded_token.get("exp") # Obtém a data de expiração do token
                current_time = time.time() # Obtém a data e hora atual em Unix timestamp
                
                if expires_at and current_time < expires_at:
                    # O token é válido
                    return True

                # Token expirado
                return False

            return False

        except jwt.exceptions.InvalidTokenError:
            return False

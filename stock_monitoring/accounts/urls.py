from django.urls import path
from .views import RegisterView, LoginView, CsrfTokenView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('register/', RegisterView.as_view(), name='register'),
    # path('login/', LoginView.as_view(), name='login'),
    # path('csrf-token/', CsrfTokenView.as_view(), name='csrf_token'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('csrf-token/', CsrfTokenView.as_view(), name='csrf_token'),
    
]

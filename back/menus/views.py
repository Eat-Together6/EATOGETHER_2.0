from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from joinorders.models import JoinOrder

from menus.models import Menu
from menus.serializers import MenuSerializer

class MenuView(APIView):
    def get(self, request): #postman 테스트 완료
        join_order_id = request.GET.get('join_order_id', None) 
        if join_order_id is None: #postman 테스트 완료
            print(join_order_id)
            menus = Menu.objects.all()
            serializer = MenuSerializer(menus, many=True)
            return Response(serializer.data)
        else: #postman 테스트 완료 / join_order_id를 쿼리 스트링이 아니라, http body에 담아와서 생기는 문제였음!!
            menu = Menu.objects.filter(join_order_id=join_order_id)
            serializer = MenuSerializer(menu, many=True)
            return Response(serializer.data)

    def post(self, request):#postman 테스트 완료
        join_order = JoinOrder.objects.get(id=request.data['join_order'])
        menu = Menu.objects.create(join_order=join_order,
                                   menu_name=request.data['menu_name'],
                                   menu_price=request.data['menu_price'],
                                   menu_quantity=request.data['menu_quantity']
                                   )
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

class MenuDetail(APIView): # postman 테스트 완료
    def get_object(self, pk):
        try:
            return Menu.objects.get(pk=pk)
        except Menu.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        menus = self.get_object(pk)
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        menu = self.get_object(pk)
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        menu = self.get_object(pk)
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
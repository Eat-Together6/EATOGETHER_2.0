from warnings import catch_warnings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from locations.models import Location
from locations.serializers import LocationSerializer

class LocationList(APIView): 
    def get(self, request, format=None): # POSTMAN TEST 완료
        print("????",self.request.user.is_authenticated)
        if self.request.user.is_authenticated:
            locations = Location.objects.filter(user=self.request.user)
            serializer = LocationSerializer(locations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def post(self, request, format=None): # POSTMAN TEST 완료
        data = request.data.copy()
        data['user'] = self.request.user.id
        serializer = LocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocationDetail(APIView):
    def get_object(self, pk): # POSTMAN TEST 완료
        try:
            return Location.objects.get(pk=pk)
        except Location.DoesNotExist:
            raise Http404

    def get(self, request, pk): # POSTMAN TEST 완료
        location = self.get_object(pk)
        serializer = LocationSerializer(location)
        return Response(serializer.data)

    def put(self, request, pk): # POSTMAN TEST 완료
        location = self.get_object(pk)
        serializer = LocationSerializer(location, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk): # POSTMAN TEST 완료
        location = self.get_object(pk)
        location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
from rest_framework import serializers

from locations.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'user', 'location_nickname', 'latitude', 'longitude',]
        
class LocationSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['location_nickname', 'latitude', 'longitude',]
        

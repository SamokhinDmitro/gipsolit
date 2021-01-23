var map;

function initMap() {

    var uluru = {lat: 50.388715, lng: 30.495557};
    map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 16,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });

    var marker = new google.maps.Marker({
        position: uluru,
        title: 'Гипсолит',
        icon: 'img/contacts/maps-icon.png',
        map: map
    });
}


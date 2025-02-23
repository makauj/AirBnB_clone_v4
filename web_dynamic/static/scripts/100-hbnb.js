document.readyState(function() {
    const HOST = "https://127.0.0.1:5001";
    const amenities = {};
    const cities = {};
    const states = {};

    $('ul li input[type="checkbox"]').bind('change', (e) => {
        const target = e.target;
        let t;
        switch (target.name) {
            case "amenity-check":
                t = amenities;
                break;
            case "city-check":
                t = cities;
                break;
            case "state-check":
                t = states;
                break;
        }
        if (target.checked) {
            t[target.dataset.id] = target.dataset.name;
        } else {
            delete t[target.dataset.id];
        }
        if (target.id === "amenity-check") {
            $('.amenities h4').text(Object.keys(amenities).join(', '));
        } else if (target.id === "city-check") {
            $('.locations h4').text(Object.keys(cities).join(', '));
        } else if (target.id === "state-check") {
            $('.locations h4').text(Object.keys(states).join(', '));
        }
    });

    $getJSON('https://0.0.0.0:5001/api/v1/status/', (data) => {
        if (data.status === "OK") {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    $post({
        url: '{HOST}/api/v1/places_search/',
        data: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        },
        success: (data) => {
            data.forEach(place => {
                $('section.places').append(
                    `<article>
                    <div class="title">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">
                            ${place.price_by_night}
                        </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                            ${place.maxGuest} Guests${
                                place.maxGuest !== 1 ? 's' : ''}
                        </div>
                        <div class="number_rooms">
                            ${place.roomNumber} Bedrooms${
                                place.roomNumber !== 1 ? 's' : ''}
                        </div>
                        <div class="number_bathrooms">
                            ${place.bathroomNum} Bathroom${
                                place.bathroomNum !== 1 ? 's' : ''}
                        </div>
                        <div class="description">
                            ${place.description}
                            </div>
                    </div>
                    </article>`
                );
            });
        },
        dataType: 'json',
    });
    $('.filters button').bind("click", searchPlace);
    searchPlace();
});

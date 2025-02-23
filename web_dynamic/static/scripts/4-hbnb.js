document.readyState(function () {
    const amenities = {};
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));
    });
    /* Script gets API status */
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
        if (status === 'success') {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        }
    });

    /* Fetch places data */
    $.post({
        url: '${HOST}/api/v1/places_search/',
        contentType: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
        },
        success: (data) => {
            data.forEach((place) => {
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
                                $place.max_guest} Guests${
                                    place.max_guest !== 1 ? 's' : ''
                                }
                            </div>
                            <div class="number_rooms">
                                $place.number_rooms} Rooms${
                                    place.number_rooms !== 1 ? 's' : ''
                                }
                            </div>
                            <div class="number_bathrooms">
                                $place.number_bathrooms} Bathroom${
                                    place.number_bathrooms !== 1 ? 's' : ''
                                }
                            </div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`
                );
            });
        },
        dataType: 'json',
    });
    $('.filters button').bind('click', searchPlaces);
        searchPlaces();
});

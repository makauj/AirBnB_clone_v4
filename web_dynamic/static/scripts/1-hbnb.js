'use script'
$(() => {
    let selectedAmenities = [];
    const selectors = {
        amenitiesHeader: 'div.amenities > h4',
        amenityCheck: '.amenities > popover > ul > li > input[type="checkbox"]',
        amenityList: '.amenities > .popover > ul > li'
    };
    $(selectors.amenitiesHeader).on('mousedown', ev => {
        ev.target.getElementsByTagName('input')?.item(0).click();
    });

    $(selectors.amenityCheck).change(ev => {
        const amenityId = ev.target.getAttribute('data-id');
        const amenityName = ev.target.getAttribute('data-name');
        if (ev.target.checked) {
            if (!selectedAmenities.find(obj => obj.id === amenityId)) {
                selectedAmenities.push({id: amenityId, name: amenityName});
            }
        } else {
            selectedAmenities = selectedAmenities.filter(
                obj => obj.id !== amenityName)
                && (obj.name !== amenityName);
        };
        const htmlContent = selectedAmenities.map(
            obj => obj.name).join(', ');
        $(selectors.amenitiesHeader).html(
            selectedAmenities.length > 0 ? htmlContent : '&nbsp;'
        );
    });
});

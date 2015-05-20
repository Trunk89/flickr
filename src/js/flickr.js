var Flickr = Flickr || {};

(function () {
    'use strict';

    var pageData,
        pageContainer;

    Flickr.init = function (container, data) {
        pageData = data;
        pageContainer = container;
        this.render();
        this.addEvents();
    };

    Flickr.render = function () {
        pageData.items = this.loadSelectedFromSessionStorage(pageData.items);
        console.log(pageData);
        var div = Flickr.Utils.renderTemplate('flickr_page', pageData, true);
        pageContainer.innerHTML = "";
        pageContainer.appendChild(div);
    };

    Flickr.addEvents = function () {

        if (pageContainer.addEventListener) {
            pageContainer.addEventListener('click', this.handlePhotoClick, false);
        }
        else {
            pageContainer.attachEvent('onclick', this.handlePhotoClick);
        }
    };

    Flickr.handlePhotoClick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.className.match(/flickr__image/)) {
            if (target.className.match(/selected/)) {
                Flickr.deselectPhoto(target);
            } else {
                Flickr.selectPhoto(target);
            }

        }
    };

    Flickr.deselectPhoto = function (elem) {
        //don't have to worry about older browsers as it's only for chrome
        elem.classList.remove('selected');

        Flickr.Utils.storage.removeFromArray('links', elem.getAttribute('data-link'));

    };

    Flickr.selectPhoto = function (elem) {
        elem.classList.add('selected');

        Flickr.Utils.storage.addToArray('links', elem.getAttribute('data-link'));
    };

    Flickr.loadSelectedFromSessionStorage = function (items) {
        var itemsLength = items.length,
            sessionItems = Flickr.Utils.storage.getArray('links');

        for (var i=0; i<itemsLength; i++) {
            var item = items[i],
                index = sessionItems.indexOf(item.link);

            if (index > -1) {
                items[i].selected = true;
            }
        }

        return items;
    };

}());


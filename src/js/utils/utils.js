Flickr.Utils = (function () {
    'use strict';

    var utils = {};

    utils.renderTemplate = function(name, context, asHtmlElement) {
        var content = this.trim( Handlebars.templates[name](context) );
        if(asHtmlElement) {
            /**
             We can return the rendered template as an HTMLElement if requested
             NOTE: this will break if the template has multiple nodes in the root,
             e.g.
             for the template: "<div>{{foo}}</div><div>{{bar}}</div>"
             only the first div, containing foo, will be returned
             **/
            var d = document.createElement("div");
            d.innerHTML = content;
            return d.firstChild;
        } else {
            // otherwise just return the rendered content as a string
            return content;
        }
    };

    utils.trim = function(str) {
        return str.replace(/^\s+|\s+$/g,'');
    };

    utils.storage = {
        set: function (item, value) {
            sessionStorage.setItem(item, value);
        },
        get: function (item) {
            var value = sessionStorage.getItem(item);
            return value;
        },
        count: function () {
            var len = sessionStorage.length;
            return len;
        },
        remove: function (item) {
            sessionStorage.removeItem(item);
        },
        empty: function () {
            sessionStorage.clear();
        },
        setArray: function (item, value) {
            if (value instanceof Array) {
                value = value.join(',');
            }

            sessionStorage.setItem(item, value);
        },
        getArray: function (item) {
            var string = sessionStorage.getItem(item);

            if (string) {
                string = string.split(',');
            } else {
                string = [];
            }

            return string;
        },
        addToArray: function (item, value) {
            var sessionItems = this.getArray(item);
            if (sessionItems) {
                var string;

                sessionItems.push(value);

                string = sessionItems.join(',');

                sessionStorage.setItem(item, string);
            } else {
                this.setArray(item, value);
            }
        },
        removeFromArray: function (item, value) {
            var sessionItems = this.getArray(item);

            if (sessionItems) {
                var index = sessionItems.indexOf(value);

                if (index > -1) {
                    sessionItems.splice(index, 1);
                }

                sessionStorage.setItem(item, sessionItems.join(','));
            }
        },
        getArrayLength: function (item) {
            var sessionItems = this.getArray(item),
                size = 0;

            if (sessionItems) {
                size = sessionItems.length;
            }

            return size;
        },
        removeOldestFromArray: function (item) {
            var sessionItems = this.getArray(item);

            if (sessionItems) {
                sessionItems.splice(0, 1);
            }

            sessionStorage.setItem(item, sessionItems.join(','));
        }

    };

    return utils;
})();

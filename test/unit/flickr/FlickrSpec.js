describe("[Flickr Main]", function() {

    var flickr;

    beforeEach(function() {
        flickr = Flickr;
    });

    it("should return items object with selected=true of link property matches with session storage", function () {
        flickr.Utils.storage.setArray('links', ['value']);
        var data = [{'link':'value2'},{'link':'value5'},{'link':'value'}],
            result = flickr.loadSelectedFromSessionStorage(data);

        expect(result).toEqual([{'link':'value2'},{'link':'value5'},{'link':'value', 'selected': true}]);

    });

});
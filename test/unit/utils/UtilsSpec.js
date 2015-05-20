describe("[Flickr Utilities]", function() {

    var utils;

    beforeEach(function() {
        utils = Flickr.Utils;
    });

    it("should create sessionStorage item", function () {
        utils.storage.set('test', 'value');

        expect(sessionStorage.getItem('test')).toBe('value');

    });

    it("should retrieve sessionStorage item", function () {
        utils.storage.set('test', 'value');

        expect(sessionStorage.getItem('test')).toBe(utils.storage.get('test'));

    });

    it("should remove sessionStorage item", function () {
        utils.storage.set('test', 'value');

        expect(utils.storage.get('test')).toBe('value');

        utils.storage.remove('test');

        expect(utils.storage.get('test')).toBe(null);

    });

    it("should remove all sessionStorage items", function () {
        utils.storage.set('test', 'value');
        utils.storage.set('test2', 'value2');

        expect(sessionStorage.getItem('test')).toBe('value');

        utils.storage.empty();

        expect(utils.storage.get('test')).toBe(null);
        expect(utils.storage.get('test2')).toBe(null);
    });

    it("should create array sessionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);

        expect(sessionStorage.getItem('test')).toBe('value,value2');
    });

    it("should retrieve array sessionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);

        expect(utils.storage.getArray('test')).toEqual(['value', 'value2']);
    });

    it("should retrieve an empty array sessionStorage item if item does not exist", function () {
        expect(utils.storage.getArray('testNotExisting')).toEqual([]);
    });

    it("should add an item to an array of sessionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);
        utils.storage.addToArray('test', 'addedValue');

        expect(utils.storage.getArray('test')).toEqual(['value', 'value2', 'addedValue']);
    });

    it("should remove an item from the array of sessionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);
        utils.storage.removeFromArray('test', 'value2');

        expect(utils.storage.getArray('test')).toEqual(['value']);

        utils.storage.removeFromArray('test', 'value5');

        expect(utils.storage.getArray('test')).toEqual(['value']);
    });

    it("should return correct length of array of sesionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);

        expect(utils.storage.getArrayLength('test')).toBe(2);
    });

    it("should return correct length of array of sesionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);

        expect(utils.storage.getArrayLength('test')).toBe(2);
    });

    it("should remove the oldest entry (index 0) from array of sesionStorage item", function () {
        utils.storage.setArray('test', ['value','value2']);
        utils.storage.removeOldestFromArray('test');

        expect(utils.storage.getArray('test')).toEqual(['value2']);
    });
});
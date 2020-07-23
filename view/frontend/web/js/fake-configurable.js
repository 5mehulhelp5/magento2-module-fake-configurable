define([
    'ko',
    'uiComponent',
    'mage/url',
    'mage/storage',
], function (ko, Component, urlBuilder,storage) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'DNAFactory_FakeConfigurable/fakeconfigurable',
        },

        brotherLabel: 'Color',
        productId: null,
        products: ko.observableArray([]),

        initialize: function (config) {
            this._super();
            this.productId = config.productId;
            this.getFakeConfigurable();
        },

        getFakeConfigurable: function () {
            var that = this;

            var serviceUrl = urlBuilder.build('fakeconfigurable/product/getBrothers?productId=' + that.productId);
            return storage.post(
                serviceUrl,
                ''
            ).done(
                function (response) {
                    if (response.status >= 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            that.products.push(response.data[i]);
                        }
                    }
                }
            ).fail(
                function (response) {

                }
            );
        }
    });
});

'use strict';

angular.module('slide').component('slide', {
    template: require('./slide.template.html'),
    transclude: true,
    require: {
        parent: '^slideDeck',
    },
    controller: function () {
        this.$onInit = function () {
            this.parent.addSlide(this);
        };
    },
});

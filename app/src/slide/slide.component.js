'use strict';
import template from './slide.template.html';

export default {
    template: template,
    transclude: true,
    require: {
        parent: '^slideDeck',
    },
    controller: function () {
        this.$onInit = function () {
            this.parent.addSlide(this);
        };
    },
};

import template from './slide.template.html';

export default {
    template,
    transclude: true,
    require: {
        parent: '^slideDeck',
    },
    controller: function () {
        this.$onInit = () => this.parent.addSlide(this);
    },
};

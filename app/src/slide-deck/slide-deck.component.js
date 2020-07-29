import template from './slide-deck.template.html';

export default {
    template,
    transclude: true,
    controller: [
        '$scope',
        function SlideDeckController($scope) {
            const slides = [];
            this.slides = slides;
            this.select = (selectedSlide) => {
                angular.forEach(slides, (slide) => {
                    slide.isSelected = false;
                });
                selectedSlide.isSelected = true;
            };
            this.addSlide = (slide) => {
                if (slides.length === 0) {
                    this.select(slide);
                }
                slides.push(slide);
            };
            this.next = () => {
                const currentSlide = slides.shift();
                currentSlide.isSelected = false;
                slides.push(currentSlide);
                const nextSlide = slides[0] || {};
                nextSlide.isSelected = true;
            };
            this.prev = () => {
                const currentSlide = slides.shift();
                const nextSlide = slides.pop();
                currentSlide.isSelected = false;
                nextSlide.isSelected = true;
                slides.unshift(nextSlide, currentSlide);
            };

            $scope.next = this.next;
            $scope.prev = this.prev;
        },
    ],
};

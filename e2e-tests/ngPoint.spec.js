/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const { by, element, browser } = require('protractor');

const hasClass = (el, cls) =>
    el
        .getAttribute('class')
        .then((classes) => classes.split(' ').indexOf(cls) !== -1);

describe('ngPoint', function () {
    beforeEach(function () {
        browser.get('index.html');
    });

    it('should compile 6 slides and their content.', () => {
        element.all(by.css('.slide')).then((slides) => {
            expect(slides.length).toBe(6);
        });

        element.all(by.css('.image')).then((slides) => {
            expect(slides.length).toBe(6);
        });
    });

    it('should go to the next slide when Next button is clicked.', () => {
        element.all(by.css('.slide')).then((slides) => {
            expect(hasClass(slides[0], 'ng-hide')).toBe(false);
            for (let i = 1; i < slides.length; i += 1) {
                expect(hasClass(slides[i], 'ng-hide')).toBe(true);
            }
        });

        const nextButton = element(by.css('.next_button'));
        nextButton.click();

        element.all(by.css('.slide')).then((slides) => {
            expect(hasClass(slides[0], 'ng-hide')).toBe(true);
            expect(hasClass(slides[1], 'ng-hide')).toBe(false);
            for (let i = 2; i < slides.length; i += 1) {
                expect(hasClass(slides[i], 'ng-hide')).toBe(true);
            }
        });
    });

    it('should go to the previous slide when Previous button is clicked.', () => {
        element.all(by.css('.slide')).then((slides) => {
            expect(hasClass(slides[0], 'ng-hide')).toBe(false);
            for (let i = 1; i < slides.length; i += 1) {
                expect(hasClass(slides[i], 'ng-hide')).toBe(true);
            }
        });

        const prevButton = element(by.css('.prev_button'));
        prevButton.click();

        element.all(by.css('.slide')).then((slides) => {
            expect(hasClass(slides[slides.length - 1], 'ng-hide')).toBe(false);
            for (let i = 0; i < slides.length - 1; i += 1) {
                expect(hasClass(slides[i], 'ng-hide')).toBe(true);
            }
        });
    });
});

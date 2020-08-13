import ngPoint from './ngPoint';

const checkIfOnlyGivenSlideSelected = (slides, index) => {
    let condition;
    for (let i = 0; i < slides.length; i += 1) {
        condition = Object.values(slides[i].classList).includes('ng-hide');
        if (i === index) {
            expect(condition).toBe(false);
        } else {
            expect(condition).toBe(true);
        }
    }
};

beforeEach(angular.mock.module(ngPoint));

describe('ngPoint', () => {
    let _$compile;
    let _$rootScope;
    let slideDeckController;
    let slideDeckElement;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $compile) => {
                _$compile = $compile;
                _$rootScope = $rootScope;
            },
        ),
    );

    it(
        'should start the slide show when auto mode is on',
        angular.mock.inject(
            /* @ngInject */ ($interval, $componentController) => {
                const $intervalSpy = jasmine
                    .createSpy('$interval', $interval)
                    .and.callThrough();
                const controller = $componentController('slideDeck', {
                    $scope: _$rootScope,
                    $interval: $intervalSpy,
                });

                expect($intervalSpy).not.toHaveBeenCalled();
                controller.toggleAutoCommence();
                expect($intervalSpy).toHaveBeenCalledWith(controller.next, 200);

                spyOn($intervalSpy, 'cancel');
                controller.toggleAutoCommence();
                expect($intervalSpy.cancel).toHaveBeenCalled();
            },
        ),
    );

    it('should not throw any errors if no slide is given', () => {
        slideDeckElement = angular.element('<slide-deck></slide-deck>');
        _$compile(slideDeckElement)(_$rootScope.$new());
        slideDeckElement = slideDeckElement[0];
        slideDeckController = angular
            .element(slideDeckElement)
            .controller('slideDeck');

        slideDeckController.next();
        slideDeckController.prev();
        slideDeckController.toggleAutoCommence();
        slideDeckController.toggleAutoCommence();
    });

    beforeEach(() => {
        slideDeckElement = angular.element(
            `<slide-deck>
                <slide>Bu birinci slayt.</slide>
                <slide>Bu ikinci slayt.</slide>
                <slide>Bu üçüncü slayt.</slide>
                <slide>Bu dördüncü slayt.</slide>
            </slide-deck>`,
        );
        _$compile(slideDeckElement)(_$rootScope.$new());
        slideDeckElement = slideDeckElement[0];
        slideDeckController = angular
            .element(slideDeckElement)
            .controller('slideDeck');
    });

    it('should render the given slides to the DOM', () => {
        const slides = slideDeckElement.querySelectorAll('.slide');
        expect(slides.length).toBe(4);

        const testContents = ['birinci', 'ikinci', 'üçüncü', 'dördüncü'];

        slides.forEach((slide, index) => {
            expect(angular.element(slide).html()).toContain(
                testContents[index],
            );
        });
    });

    it('should select the given slide', () => {
        expect(slideDeckController.slides[3].isSelected).toBe(false);
        slideDeckController.select(slideDeckController.slides[3]);
        expect(slideDeckController.slides[3].isSelected).toBe(true);
    });

    it('should go on to the next slide when Next button is clicked', () => {
        const cycle = [0, 1, 2, 3, 0, 1, 2, 3];

        cycle.forEach((value, index) => {
            _$rootScope.$digest();
            checkIfOnlyGivenSlideSelected(
                slideDeckElement.querySelectorAll('.slide'),
                cycle[index],
            );

            const nextButton = slideDeckElement.querySelector('.next_button');
            nextButton.click();

            _$rootScope.$digest();
            checkIfOnlyGivenSlideSelected(
                slideDeckElement.querySelectorAll('.slide'),
                cycle[index + 1] || cycle[0],
            );
        });
    });

    it('should go on to the previous slide when Previous button is clicked', () => {
        const cycle = [0, 3, 2, 1, 0, 3, 2, 1];

        cycle.forEach((value, index) => {
            _$rootScope.$digest();
            checkIfOnlyGivenSlideSelected(
                slideDeckElement.querySelectorAll('.slide'),
                cycle[index],
            );

            const prevButton = slideDeckElement.querySelector('.prev_button');
            prevButton.click();

            _$rootScope.$digest();
            checkIfOnlyGivenSlideSelected(
                slideDeckElement.querySelectorAll('.slide'),
                cycle[index + 1] || cycle[0],
            );
        });
    });
});

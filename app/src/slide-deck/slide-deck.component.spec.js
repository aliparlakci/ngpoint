import './slide-deck.module';

describe('SlideDeck', () => {
    beforeEach(angular.mock.module('app.slideDeck'));

    let ctrl;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController) => {
                const $scope = $rootScope.$new();
                ctrl = $componentController('slideDeck', { $scope });
            },
        ),
    );

    beforeEach(() => {
        // for (let i = 0; i < 10; i += 1) {
        //     ctrl.addSlide({ id: i + 1 });
        // }
        ctrl.addSlide({ id: 1 });
        ctrl.addSlide({ id: 2 });
        ctrl.addSlide({ id: 3 });
        ctrl.addSlide({ id: 4 });
        ctrl.addSlide({ id: 5 });
        ctrl.addSlide({ id: 6 });
        ctrl.addSlide({ id: 7 });
        ctrl.addSlide({ id: 8 });
        ctrl.addSlide({ id: 9 });
        ctrl.addSlide({ id: 10 });
    });

    describe('addSlide function', () => {
        it('should add new slide to slides array.', () => {
            expect(ctrl.slides.length).toBe(10);
        });

        it('should select only the first added slide', () => {
            expect(ctrl.slides[0].isSelected).toBe(true);
        });

        it('should deselect slides other than the first one.', () => {
            expect(
                ctrl.slides
                    .slice(1)
                    .every((slide) => slide.isSelected !== true),
            ).toBe(true);
        });
    });

    describe('select function', () => {
        it("should set the given element's isSelected attribute to true.", () => {
            ctrl.select(ctrl.slides[9]);

            expect(ctrl.slides[9].isSelected).toBe(true);
        });

        it("should set the other elements' isSelected attribute to false.", () => {
            ctrl.select(ctrl.slides[9]);

            expect(
                ctrl.slides
                    .slice(0, ctrl.slides.length - 1)
                    .every((slide) => slide.isSelected !== true),
            ).toBe(true);
        });
    });

    describe('next function', () => {
        beforeEach(() => {
            ctrl.next();
        });

        it('should cycle the slides array one element forward', () => {
            expect(ctrl.slides[0].id).toBe(2);
            expect(ctrl.slides[ctrl.slides.length - 1].id).toBe(1);
        });

        it('should select the first slide in the array', () => {
            expect(ctrl.slides[0].isSelected).toBe(true);
        });

        it('should deselect slides other than the first one.', () => {
            expect(
                ctrl.slides
                    .slice(1)
                    .every((slide) => slide.isSelected !== true),
            ).toBe(true);
        });
    });

    describe('prev function', () => {
        beforeEach(() => {
            ctrl.prev();
        });

        it('should cycle the slides array one element backward', () => {
            expect(ctrl.slides[0].id).toBe(10);
            expect(ctrl.slides[1].id).toBe(1);
        });

        it('should select the first slide in the array', () => {
            expect(ctrl.slides[0].isSelected).toBe(true);
        });

        it('should deselect slides other than the first one.', () => {
            expect(
                ctrl.slides
                    .slice(1)
                    .every((slide) => slide.isSelected !== true),
            ).toBe(true);
        });
    });

    describe('toggleAutoCommence function', () => {
        let _$interval;

        beforeEach(
            angular.mock.inject(
                /* @ngInject */ ($interval) => {
                    _$interval = $interval;
                },
            ),
        );

        it('should invoke next function every 200 seconds.', () => {
            spyOn(ctrl, 'next');

            ctrl.toggleAutoCommence();

            _$interval.flush(200);

            expect(ctrl.next).toHaveBeenCalledTimes(1);
        });

        it('should stop auto commencing when called the second time.', () => {
            spyOn(ctrl, 'next');

            ctrl.toggleAutoCommence();

            _$interval.flush(200);

            expect(ctrl.next).toHaveBeenCalledTimes(1);

            ctrl.toggleAutoCommence();

            _$interval.flush(200);

            expect(ctrl.next).toHaveBeenCalledTimes(1);
        });
    });
});

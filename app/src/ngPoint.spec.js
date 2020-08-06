import ngPoint from './ngPoint';

beforeEach(angular.mock.module(ngPoint));

describe('Slide', () => {
    let _$compile, _$rootScope;
    let slideDeckController, slideController;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController, $compile) => {
                _$compile = $compile;
                _$rootScope = $rootScope;

                const slideDeckScope = _$rootScope.$new();
                slideDeckController = $componentController('slideDeck', {
                    $scope: slideDeckScope,
                });

                const slideScope = slideDeckScope.$new();
                slideController = $componentController('slide', {
                    $scope: slideScope,
                });

                // This does not feel right
                slideController.parent = slideDeckController;
            },
        ),
    );

    it('should call addSlide function of its parent and pass itself.', () => {
        spyOn(slideDeckController, 'addSlide');

        slideController.$onInit();

        expect(slideDeckController.addSlide).toHaveBeenCalledWith(
            slideController,
        );
    });
});

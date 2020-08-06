/* eslint-disable no-undef */

import ngPoint from './ngPoint';

beforeEach(angular.mock.module(ngPoint));

describe('Slide', () => {
    let _$compile, _$rootScope;
    let slideDeckScope, slideScope;
    let slideDeckController, slideController;
    let slideElement;
    const testString = `
        Hey kız 17'li kız, gözleri yıldız yıldız
        Gel otur çakıllara, seninle konuşacağız
        Eğer baban vermezse dağlara kaçacağız
        Yedi renk martı gibi göklere çıkacağız, Efulim

        Yel uçurur ağlari, oy farozda farozda
        Kaçamayan kızları kuruturlar çirozda
        Ah sevdalim uşak olsam, belune kuşak olsam
        Okşarken yanağuni gülden yumuşak olsam, Efulim
    `;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController, $compile) => {
                _$compile = $compile;
                _$rootScope = $rootScope;

                slideDeckScope = _$rootScope.$new();
                slideDeckController = $componentController('slideDeck', {
                    $scope: slideDeckScope,
                });
            },
        ),
    );

    beforeEach(
        angular.mock.inject(() => {
            slideElement = angular.element(`<slide>${testString}</slide>`);
            slideElement.data('$slideDeckController', slideDeckController);
            _$compile(slideElement[0])(slideDeckScope);
            slideDeckScope.$digest();

            slideController = slideElement.controller('slide');
        }),
    );

    it('should call addSlide function of its parent and pass itself.', () => {
        spyOn(slideDeckController, 'addSlide');

        slideController.$onInit();

        expect(slideDeckController.addSlide).toHaveBeenCalledWith(
            slideController,
        );
    });

    it('should not show its content to DOM if isSelected is false.', () => {
        slideController.isSelected = false;
        slideDeckScope.$digest();

        expect(
            angular
                .element(slideElement[0].querySelector('#slide'))
                .hasClass('ng-hide'),
        ).toBe(true);
    });

    it('should transclude its content', () => {
        expect(slideElement.html()).toContain(testString);
    });
});

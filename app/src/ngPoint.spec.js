import ngPoint from './ngPoint';

beforeEach(angular.mock.module(ngPoint));

describe('ngPoint', () => {
    let _$compile, _$rootScope;
    let slideDeckController, slideControllers;
    let slideElements;
    let slideDeckElement;
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
            },
        ),
    );

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
        slideDeckController = slideDeckElement.controller('slideDeck');
    });

    it('should add itself to the slideDeckController.slides.', () => {
        expect(slideDeckController.slides.length).toBe(4);
    });

    it('should not show its content to DOM if it is not selected.', () => {
        slideDeckController.select(slideDeckController.slides[2]);
        _$rootScope.$digest();

        const slides = angular.element(
            slideDeckElement[0].querySelectorAll('#slide'),
        );

        for (let index = 0; index < slides.length; index += 1) {
            const condition = Object.values(slides[index].classList).includes(
                'ng-hide',
            );
            if (index === 2) {
                expect(condition).toBe(false);
            } else {
                expect(condition).toBe(true);
            }
        }
    });
});

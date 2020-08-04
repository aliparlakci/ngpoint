import './slide-deck.module';

beforeEach(angular.mock.module('app.slideDeck'));

describe('dummy component', () => {
    it(
        'should be defined',
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController) => {
                const $scope = $rootScope.$new();
                const sut = $componentController('slideDeck', { $scope });
                expect(sut).toBeDefined();
            },
        ),
    );
});

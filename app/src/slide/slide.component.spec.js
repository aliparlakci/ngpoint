import './slide.module';

beforeEach(angular.mock.module('app.slide'));

describe('dummy component', () => {
    it(
        'should be defined',
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController) => {
                const $scope = $rootScope.$new();
                const sut = $componentController('slide', { $scope });
                expect(sut).toBeDefined();
            },
        ),
    );
});

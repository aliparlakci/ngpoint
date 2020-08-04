import './slide.module';

beforeEach(angular.mock.module('app.slide'));

let sut;

beforeEach(
    angular.mock.inject(
        /* @ngInject */ ($rootScope, $componentController) => {
            const $scope = $rootScope.$new();
            sut = $componentController('slide', { $scope });
        },
    ),
);

describe('dummy component', () => {
    it('should be defined', () => {
        expect(sut).toBeDefined();
    });
});

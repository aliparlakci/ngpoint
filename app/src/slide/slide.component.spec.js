import './slide.module';

beforeEach(angular.mock.module('app.slide'));

describe('Slide', () => {
    let ctrl;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController) => {
                const $scope = $rootScope.$new();
                ctrl = $componentController('slide', { $scope });
            },
        ),
    );
    it('should call addSlide function of its parent and pass itself.', () => {
        ctrl.parent = { addSlide: (param) => param };

        spyOn(ctrl.parent, 'addSlide');

        ctrl.$onInit();

        expect(ctrl.parent.addSlide).toHaveBeenCalledWith(ctrl);
    });
});

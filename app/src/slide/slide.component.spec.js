import './slide.module';

describe('Slide', () => {
    beforeEach(angular.mock.module('app.slide'));
    let _$compile;
    let _$rootScope;
    let $ctrl;

    beforeEach(
        angular.mock.inject(
            /* @ngInject */ ($rootScope, $componentController, $compile) => {
                _$compile = $compile;
                _$rootScope = $rootScope;
                const $scope = _$rootScope.$new();
                $ctrl = $componentController('slide', { $scope });
            },
        ),
    );

    it('should call addSlide function of its parent and pass itself.', () => {
        $ctrl.parent = { addSlide: (param) => param };

        spyOn($ctrl.parent, 'addSlide');

        $ctrl.$onInit();

        expect($ctrl.parent.addSlide).toHaveBeenCalledWith($ctrl);
    });

    it('should show its content to DOM if isSelected is true.', () => {
        const element = angular.element('<slide></slide>');
        element.data('$slideDeckController', { addSlide: () => null });
        _$compile(element[0])(_$rootScope.$new());

        element.controller('slide').isSelected = true;
        _$rootScope.$digest();

        expect(
            angular
                .element(element[0].querySelector('#slide'))
                .hasClass('ng-hide'),
        ).toBe(false);
    });

    it('should not show its content to DOM if isSelected is false.', () => {
        const element = angular.element('<slide></slide>');
        element.data('$slideDeckController', { addSlide: () => null });
        _$compile(element[0])(_$rootScope.$new());

        element.controller('slide').isSelected = false;
        _$rootScope.$digest();

        expect(
            angular
                .element(element[0].querySelector('#slide'))
                .hasClass('ng-hide'),
        ).toBe(true);
    });

    it('should transclude its content', () => {
        const testString = `
            Somebody once told me the world is gonna roll me
            I ain't the sharpest tool in the shed
            She was looking kind of dumb with her finger and her thumb
            In the shape of an "L" on her forehead
            Well, the years start coming and they don't stop coming
            Fed to the rules and I hit the ground running
            Didn't make sense not to live for fun
            Your brain gets smart but your head gets dumb
            So much to do, so much to see
            So what's wrong with taking the backstreets?
            You'll never know if you don't go
            You'll never shine if you don't glow
            Hey now, you're an all star
            Get your game on, go play
            Hey now, you're a rock star
            Get the show on, get paid
            And all that glitters is gold
            Only shooting stars break the mold
            It's a cool place, and they say it gets colder
            You're bundled up now, wait 'til you get older
            But the meteor men beg to differ
            Judging by the hole in the satellite picture
            The ice we skate is getting pretty thin
            The water's getting warm so you might as well swim
            My world's on fire, how 'bout yours?
            That's the way I like it and I'll never get bored
            Hey now, you're an all star
            Get your game on, go play
            Hey now, you're a rock star
            Get the show on, get paid
            All that glitters is gold
            Only shooting stars break the mold
            Somebody once asked
            Could I spare some change for gas?
            "I need to get myself away from this place"
            I said, "Yep, what a concept
            I could use a little fuel myself
            And we could all use a little change"
            Well, the years start coming and they don't stop coming
            Fed to the rules and I hit the ground running
            Didn't make sense not to live for fun
            Your brain gets smart but your head gets dumb
            So much to do, so much to see
            So what's wrong with taking the backstreets?
            You'll never know if you don't go (go!)
            You'll never shine if you don't glow
            Hey now, you're an all star
            Get your game on, go play
            Hey now, you're a rock star
            Get the show on, get paid
            And all that glitters is gold
            Only shooting stars break the mold
        `;

        const element = angular.element(`<slide>${testString}</slide>`);
        element.data('$slideDeckController', { addSlide: () => null });
        _$compile(element[0])(_$rootScope.$new());
        _$rootScope.$digest();

        expect(element.html()).toContain(testString);
    });
});

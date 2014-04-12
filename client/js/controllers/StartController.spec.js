define(function () {
  describe('StartController', function () {
    var controller, scope;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('StartController', {
        $scope: scope
      });
    }));

    describe('initial state', function () {
      it('sets name', function () {
        expect(scope.name).toBe('You are home!');
      })
    });
  });
});
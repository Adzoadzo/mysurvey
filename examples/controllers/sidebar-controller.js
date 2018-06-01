app.controller('sidebarCtrl', function($scope, $location, $http){

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            localStorage.setItem('user',response.data.token)
            toastr.success('Logged in successfully');
        }),function(error){
            console.log(error);
        }
    }

    $scope.registration = function() {
        $http.post('/mysurvey/rest/addUser', $scope.user, config).then(function(data) {
            $scope.user = null;
            $scope.users_list.push(data);
    
            refresh_users();
            toastr.success('Registration succesfull!');
        });
    }

    $scope.logout = function(){
        localStorage.clear();
    }

    $scope.getClass = function (path) {
        if (path == '/dashboard' && $location.path() == '/') return 'active';
        return ($location.path() === path) ? 'active' : '';
    },

    $scope.openNavigationDrawer = function(){
        if ($scope.mobileNavigationOpen == 'nav-open'){
            $scope.mobileNavigationOpen = '';
        }else{
            $scope.mobileNavigationOpen = 'nav-open';
        }
        
    }
    $scope.menuItemClicked = function(){
        $scope.mobileNavigationOpen = '';
    }
});
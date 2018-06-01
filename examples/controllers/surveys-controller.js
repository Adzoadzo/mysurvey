function SurveysController($http, $scope, toastr){
    console.log("Hello from surveys controller");

    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };

    refresh_surveys();

    function refresh_surveys(){
        $http.get('/mysurvey/rest/getSurvey', config).then(function(res){
            $scope.surveys_list = res.data;
        }),
        function(res){
            alert(res.status);
        }
    }

    $scope.edit_survey = function(survey){
        $scope.survey ={
            _id : survey._id,
            survey_question : survey.survey_question,
            survey_answer1 : survey.survey_answer1,
            survey_answer2 : survey.survey_answer2,
            survey_answer3 : survey.survey_answer3,
            survey_category : survey.survey_category
        };
    }

    $scope.clear = function(survey){
        $scope.survey ={
            _id : survey._id,
            survey_question : '',
            survey_answer1 : '',
            survey_answer2 : '',
            survey_answer3 : '',
            survey_category : ''
        };
    }

    $scope.add_survey = function() {
        $http.post('/mysurvey/rest/addSurvey', $scope.survey, config).then(function(data) {
            $scope.survey = null;
            $scope.surveys_list.push(data);
    
            refresh_surveys();
            toastr.success('Survey added successfully!');
        });
    }

    $scope.update_survey = function(){
        $http.put('/mysurvey/rest/survey/'+$scope.survey._id, $scope.survey, config).then(function(data){
          refresh_surveys();
          toastr.info('You have successfully updated survey!');
          $scope.survey = null;
        });
    }

    $scope.delete_survey = function(survey_id){
        $http.delete('/mysurvey/rest/survey/'+ survey_id, config).then(function(data){
            refresh_surveys();
            toastr.success('Survey deleted');
        });
    }

    $scope.add_vote = function(survey_id){
        $http.put('/addVote/'+survey_id).then(function(data){
            console.log('updated');
        });
    }
}   
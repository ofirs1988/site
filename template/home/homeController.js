/**
 * Created by ofir on 02/08/2017.
 */

app.controller('homeController',["videoService","$http","$scope","$rootScope","httpService",'AuthenticationService', function (videoService,$http$,$scope,$rootScope,httpService,AuthenticationService) {
    // var subtitles = {
    //     'src' : 'http://www.videogular.com/assets/subs/pale-blue-dot.vtt',
    //     'kind' : 'subtitles',
    //     'srclang' : 'en',
    //     'label' : "English",
    //     'default' : ""
    // };
    //
    // var src = 'http://localhost:8080/site/assets/site/video/DotEXE - Inside Out (Official Music Files).mp4';
    // var type = 'video/mp4';
    // var theme = '';
    // var poster = 'http://www.videogular.com/assets/images/videogular.png';
    // this.config = videoService.Start(src,type,subtitles,theme,poster);



    if($rootScope.userLogin) {
        var userParser = AuthenticationService.decodejj();

        var user = JSON.parse(userParser);
        $scope.avatar = user.avatar;
        $scope.name = user.name;
        $scope.email = user.email;
    }

    var current_page;
    var last_page;
    var total;

    httpService.httpPost('getVideos').then(function (response){
        if(response[0].data.success){
            current_page = response[0].data.data.current_page;
            last_page = response[0].data.data.last_page;
            total = response[0].data.data.total;
            //this.config = videoService.Start(response[0].data.data.data);
            $scope.videos = videoService.Start(response[0].data.data.data);
        }
    })

    // var videos = httpService.httpGet('getVideos');
    //
    //

    //
    // this.config = videoService.Start(videos.$$state.value[0].data.data.data);
    //this.config = videoService.Start(src,type,subtitles,theme,poster);

    // return $http({
    //     url:'http://localhost:1337/',
    //     method: 'GET',
    // }).then(function(response) {
    //     console.log(response);
    // });

}]);
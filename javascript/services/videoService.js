(function () {
    'use strict';
    app.factory('videoService', videoService);
    videoService.$inject = ['$sce','$rootScope'];
    function videoService($sce,$rootScope) {
        var service = {};
        service.Start = Start;
        service.GetInfo = GetInfo;

        return service;



        function Start(obj) {

            var array = [];
            angular.forEach(obj, function(value, key) {
                //var subtitles = '';
                var subtitles =  {
                    'src' : '',
                    'kind' : '',
                    'srclang' : '',
                    'label' : "",
                    'default' : ""
                };

                var src = value.src || "";
                var type = value.type || "video/mp4";
                //subtitles = subtitles || defaultSubtitle;
                var theme = theme || $rootScope.apiUrl + "site/node_modules/videogular/dist/themes/default/videogular.css";
                var poster = value.poster || "";
                var video = {
                    sources: [
                        {src: $sce.trustAsResourceUrl(src), type: type},
                    ],
                    tracks: [
                        {
                            src: subtitles.src,
                            kind: subtitles.kind,
                            srclang: subtitles.srclang,
                            label: subtitles.label,
                            default: subtitles.default
                        }
                    ],
                    theme: theme,
                    plugins: {
                        poster: poster
                    }
                };
                array.push(video);
            });
            return array;
        }





        //Start(string,string,obj,string,string)
        // function Start(src,type,subtitles,theme,poster) {
        //     var defaultSubtitle = subtitles = {
        //         'src' : '',
        //         'kind' : '',
        //         'srclang' : '',
        //         'label' : "",
        //         'default' : ""
        //     };
        //
        //     src = src || "";
        //     type = type || "video/mp4";
        //     subtitles = subtitles || defaultSubtitle;
        //     theme = theme || "http://localhost:8080/site/node_modules/videogular/dist/themes/default/videogular.css";
        //     poster = poster || "";
        //     this.config = {
        //         sources: [
        //             {src: $sce.trustAsResourceUrl(src), type: type},
        //         ],
        //         tracks: [
        //             {
        //                 src: subtitles.src,
        //                 kind: subtitles.kind,
        //                 srclang: subtitles.srclang,
        //                 label: subtitles.label,
        //                 default: subtitles.default
        //             }
        //         ],
        //         theme: theme,
        //         plugins: {
        //             poster: poster
        //         }
        //     };
        //     return this.config;
        // }

        function GetInfo(message, keepAfterLocationChange) {

        }
    }

})();
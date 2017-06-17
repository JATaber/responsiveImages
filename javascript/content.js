/**
 * Created by jamestaber on 6/16/17.
 */
var request = new XMLHttpRequest();

var clientID = "2685ef356706bf8a536aa7c97e824fb0fe5d52a679999a7faa776ddd36313ced";

var api = 'https://api.unsplash.com/search/photos?client_id='+ clientID +'&query=travel&per_page=12';

request.onload = function(){
    if(request.status >= 200 && request.status < 400){
        var data = JSON.parse(request.responseText);

        console.log(data);

        var ele = document.getElementById("results");

        if(ele){
            var picture = document.querySelector("#results");

            console.log(data.results.length);

            var pictureData = '';

            if(data.results.length > 0){

                for( var i = 0; i < data.results.length; i++){

                    var smallImg = data.results[i].urls.small;
                    var medImg = data.results[i].urls.regular;
                    var largeImg = data.results[i].urls.raw;

                    pictureData += '<article>';
                    pictureData += '<a href=" ' +data.results[i].links.html + ' " target="_blank">';
                    pictureData += '<img src=" '+smallImg+' " ' +
                        'srcset=" '+smallImg+' 300w, '
                                +medImg+' 600w, '
                                +largeImg+' 800w" ' +
                        'sizes="(max-width: 599px)100vw, ' +
                                '(min-width: 600px)25vw, ' +
                                '599px" ' +
                                'alt="Travel Image">';
                    pictureData += '</a>';
                    pictureData += '</article>';
                }
            }else{
                pictureData += '<p>Looks like something has gone wrong!</p>';
            }

            picture.insertAdjacentHTML('beforeEnd', pictureData);

        }else{
            console.log('response error');
        }
    }
};

request.open('GET', api, true);
request.send();
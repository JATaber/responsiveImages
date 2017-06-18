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

                    var smallImg = data.results[i].urls.thumb;
                    var medImg = data.results[i].urls.small;
                    var largeImg = data.results[i].urls.regular;
                    var likes = data.results[i].likes;
                    var name = data.results[i].user.name;

                    pictureData += '<article>';
                    pictureData += '<a href=" ' +data.results[i].links.html + ' " target="_blank">';
                    pictureData += '<img class="result" src=" '+smallImg+' " ' +
                        'srcset=" '+smallImg+' 200w, ' +
                                    medImg+' 400w, ' +
                                    largeImg+' 1080w"' +
                        ' alt="Travel Image">';
                    pictureData += '<div class="picInfo">';
                    pictureData += '<h2><img class="userIcon" src="../images/user-icon.svg" alt="user icon"><strong>'+name+'</strong>';
                    pictureData += '<h3><img class="heartIcon" src="../images/heart.svg" alt="heart icon"><strong>'+likes+'</strong>';
                    pictureData += '</div>';
                    pictureData += '</a>';
                    pictureData += '</article>';
                }


            }else{
                pictureData += '<p>Looks like something has gone wrong!</p>';
            }



            picture.insertAdjacentHTML('afterbegin', pictureData);

        }else{
            console.log('response error');
        }
    }
};

request.open('GET', api, true);
request.send();
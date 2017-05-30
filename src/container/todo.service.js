$.get('http://128.199.76.9:8002/jbee/todo/count')
    .then(function(data) {
        console.log(data);
    }).fail(function(err) {
    console.error(err);
});

//start 시작하는 number
//limit 개수

$.get('http://128.199.76.9:8002/jbee/todo/page?start=0&limit=5')
    .then(function(data) {
        console.log(data);
    }).fail(function(err) {
    console.error(err);
});


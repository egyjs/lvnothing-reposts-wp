function parseURL(data){
    var    a      = document.createElement('a');
    a.href = data;
    return a.hostname;
}

var $api  = 'http://localhost/lvnothing/?autopost';
var data = {};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    // console.log(document);
    var data = request.data || {};
    console.log(data);
    console.log(parseURL(data.domain));

    repost(parseURL(data.domain),'._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8',data.limit,data.ignore);

    sendResponse({ success: true});
});

function scrollToBottom(){
    bottom = document.body.scrollHeight;
    current = window.innerHeight+ document.body.scrollTop;
    if((bottom-current) >0){
        window.scrollTo(0, bottom);
        setTimeout ( 'scrollToBottom()', 1000 );
    }
};

function repost(domain,dom,limit = false,ignore){

    console.log('repost start');


    if(domain == "www.facebook.com") {

        // var posts = ('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8'); // 7 posts
        var posts = (dom); // 7 posts
        // _4-u2 mbm _4mrt _5jmm _5pat _5v3q _7cqq _4-u8

        $(posts).each(function(index, element) {

            var href = $("#" + element.id + " a[rel=\"theater\"]:first").attr('href');
            data[index] = {};

            if (href != undefined) data[index]['id'] = (/[^/]*$/.exec(href.substring(0, href.lastIndexOf('/')))[0]) || [] ;

            data[index]['image'] = $("#" + element.id + " img:eq(1)").attr('src');

            data[index]['content'] = $("#" + element.id + " div[data-testid=\"post_message\"]").text();
        });
        console.log(data);

        if (limit != false || limit != 0){
            data['limit'] = limit;
        }
        if (ignore){
            data['ignore'] = ignore;
        }

        $.ajax({
            url: $api,
            type:"post",
            data: {"autoP" :data},
            success: function(response) {
                console.log(response);
                alert('repost end');
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

    }else {
        alert('sorry,this is not domain i know')
    }
    console.log('repost end');
}
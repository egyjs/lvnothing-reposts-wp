var $limit  = 0;
var $ignore = ['تخسيس','املس','منتج','تواصل','بالحجز','للتواصل','هتخسى','هتخسي','واتس','المنتج'];
var $dom = '._4-u2.mbm._4mrt._5jmm._5pat._5v3q._7cqq._4-u8';


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    var url = new URL(tab.url)
    $('[name="fburl"]').val(url.href);
    $('[name="dom"]').val($dom);
    $('[name="limit"]').val($limit);
    $('[name="ignore"]').val($ignore);
    // `domain` now has a value like 'example.com'
});

$('#fburl').click(function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];

        var url = new URL(tab.url)
        reqArr = {
            domain : $('[name="limit"]').val(),
            dom : $('[name="dom"]').val(),
            limit : $('[name="limit"]').val(),
            ignore : $('[name="ignore"]').val(),
        };
        chrome.tabs.sendMessage(tabs[0].id, {data: reqArr}, function(response) {
            console.log(response);
        });
        // console.log(tab.id)


        // `domain` now has a value like 'example.com'
    })


});

//
// var getBasePath = function(url) {
//     var r = ('' + url).match(/^(https?:)?\/\/[^/]+/i);
//     return r ? r[0] : '';
// };
// 获取搜索内容
var urlparmas = new URLSearchParams(location.search);
var key = urlparmas.get('key');
// 发送搜索请求
if (key) {
    $.ajax({
        type: 'get',
        url: '/posts/search/' + key,
        success: function (res) {
            var html = template('searchTpl', {
                data: res
            });
            $('#searchBox').html(html)
        }
    })
}
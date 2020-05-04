// 判断是否有分类要求
var urlparmas = new URLSearchParams(location.search);
var categoryId = urlparmas.get('categoryId');
if (categoryId) {
    $.ajax({
        type: 'get',
        url: '/posts/category/' + categoryId,
        success: function (res) {
            console.log(res);
            var html = template('listTpl', {
                data: res
            });
            $('#listBox').html(html)
        }
    })
    // 根据id查询分类
    $.ajax({
        type: 'get',
        url: '/categories/' + categoryId,
        success: function (res) {
            $('#listName').html(res.title)
        }
    })
} else {
    $.ajax({
        type: 'get',
        url: '/posts/lasted',
        success: function (res) {
            var html = template('listTpl', {
                data: res
            });
            $('#listBox').html(html)
        }
    })
}
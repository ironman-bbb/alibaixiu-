// 获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        // 设置变量来获取是否开启人工审核
        review = res.review
        // 判断网站是否开启了评论功能
        if (res.comment) {
            var html = template('commentTpl')
            $('#commentBox').html(html)
        }
    }
})

// 获取查询的ID
var urlparmas = new URLSearchParams(location.search);
var id = urlparmas.get('id');
var review;
// 发送查询请求
$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (res) {
        var html = template('articleTpl', res)
        $('#articleBox').html(html)
    }
})

// 发送请求实现点赞功能
$('#articleBox').on('click', '#like', function () {
    // 发送请求
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function (res) {
            alert('点赞成功,感谢您的支持')
        }
    })
})

// 实现评论功能
$('#commentBox').on('submit', 'form', function () {
    // 获取评论内容
    var comment = $(this).find('textarea').val()
    // 评论状态
    var state
    // 判断是否开启人工审核
    state = review ? 0 : 1;
    // 发送添加评论请求
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            post: id,
            content: comment,
            state: state
        },
        success: function (res) {
            alert('评论成功')
        },
        error: function () {
            alert('评论失败')
        }
    })
    return false
})
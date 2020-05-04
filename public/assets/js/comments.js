// 向服务器发送请求 获取评论
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (res) {
        // 向模板插入数据
        var html = template('commentsTpl', res)
        // 渲染在页面中
        $('#commentsBox').html(html)
        // 向模板插入数据
        var page = template('pageTpl', res)
        // 渲染在页面中
        $('#pageBox').html(page)
    }
})

// 实现评论列表分页的功能
function changePage(page) {
    if (page) {
        $.ajax({
            type: 'get',
            url: '/comments',
            data: {
                page: page
            },
            success: function (res) {
                // 向模板插入数据
                var html = template('commentsTpl', res)
                // 渲染在页面中
                $('#commentsBox').html(html)
                // 向模板插入数据
                var page = template('pageTpl', res)
                // 渲染在页面中
                $('#pageBox').html(page)
            }
        })
    }
}

// 实现评论的审核与驳回
$('#commentsBox').on('click', '.status', function () {
    // 获取当前要修改状态的评论id
    var id = $(this).attr('data-id')
    // 获取当前要修改状态的评论状态
    var status = $(this).attr('data-status')
    // 发送修改评论状态请求
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            // 根据当前状态设置修改后的状态
            state: status == 0 ? 1 : 0
        },
        success: function (res) {
            // 成功修改状态后直接刷新页面
            location.href = './comments.html'
        }
    })
})

// 实现评论删除功能
$('#commentsBox').on('click', '.delete', function () {
    // 询问是否确定删除
    if (confirm('确定要删除这条评论吗?')) {
        // 获取当前要删除的评论id
        var id = $(this).attr('data-id')
        // 发送删除请求
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.href = './comments.html'
            }
        })
    }
})
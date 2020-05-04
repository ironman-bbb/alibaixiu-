// 实现渲染文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        // 引用文章列表模板
        var html = template('postsTpl', {
            data: res
        })
        // 引用文章列表分页模板
        var page = template('pageTpl', {
            data: res
        })
        // 渲染文章列表
        $('#postListBox').html(html)
        // 渲染文章列表分页
        $('#pageBox').html(page)
    }
})

// 实现文章分页的功能
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (res) {
            console.log(res);
            // 引用文章列表模板
            var html = template('postsTpl', {
                data: res
            })
            // 引用文章列表分页模板
            var page = template('pageTpl', {
                data: res
            })
            // 渲染文章列表
            $('#postListBox').html(html)
            // 渲染文章列表分页
            $('#pageBox').html(page)
        }
    })
}

// 处理时间函数
function Dateformat() {
    var date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向模板导入处理时间函数
template.defaults.imports.Dateformat = Dateformat;

// 发送查询文章分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // 渲染模板
        var html = template('options', {
            data: res
        })
        // 在页面渲染模板
        $('#categoryBox').html(html)
    }
})

// 当查询请求发送时处理请求
$('#filterForm').on('submit', function () {
    // 获取表单数据
    var formData = $(this).serialize();
    // 发送查找请求
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (res) {
            // 引用文章列表模板
            var html = template('postsTpl', {
                data: res
            })
            // 引用文章列表分页模板
            var page = template('pageTpl', {
                data: res
            })
            // 渲染文章列表
            $('#postListBox').html(html)
            // 渲染文章列表分页
            $('#pageBox').html(page)
        }
    })
    return false
})

// 使用事件委托删除文章
$('#postListBox').on('click', '.delete', function () {
    // 获取当前要删除文章的id
    var id = $(this).attr('data-id')
    if (confirm('确定要删除该篇文章吗?')) {
        // 发送根据id删除文章请求
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.href = './posts.html'
            }
        })
    }
})
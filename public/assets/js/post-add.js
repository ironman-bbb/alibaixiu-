// 发送查找文章分类请求
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // 向模板中添加数据
        var html = template('categoryTpl', {
            data: res
        })
        // 将模板渲染到页面
        $('#category').html(html)
    }
})

// 选择文件时触发
$('.ModifyBox').on('change', '#feature', function () {
    // 获取到上传的文件
    var file = this.files[0];
    var formDate = new FormData()
    // 将上传的文件转换为二进制格式
    formDate.append('cover', file);
    // 发送上传图片文件请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formDate,
        // 告诉ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉ajax方法不要设置参数类型
        contentType: false,
        success: function (res) {
            // 将上传的文件的地址放到页面的隐藏域中
            $('#thumbnail').val(res[0].cover)
            $('.thumbnail').prop('src', res[0].cover)
            $('.thumbnail').css('display', 'inline-block')
        }
    })
})

// 为添加文章表单添加提交事件
$('#addForm').on('submit', function () {
    // 获取表单数据
    var formData = $(this).serialize();
    // 发送添加文章请求
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function (res) {
            location.href = './posts.html'
        }
    })
    return false
})

// 封装从地址栏获取查询参数
function getUrlParmas(name) {
    // 获取地址栏search内容
    var parmas = location.search.substr(1).split('&');
    var searchParmas = '';
    // 进行循环返回查找的内容
    for (var attr in parmas) {
        var tem = parmas[attr].split('=');
        if (tem[0] == name) {
            // 返回找到的符合内容
            return tem[1]
        }
    }
    // 若未能找到返回-1
    return -1
}

// 获取浏览器地址中的id参数
var id = getUrlParmas('id');
// 判断是否查询到id参数 若查询到id参数 说明本次请求为修改文章
if (id != -1) {
    // 发送根据id查找文章请求
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (res) {
            // 获取文章分类信息
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    res.categories = categories
                    var html = template('ModifypostTpl', res);
                    $('.ModifyBox').html(html);
                }
            })
        }
    })
}

// 当修改表单发生提交时
$('.ModifyBox').on('submit', '#ModifyForm', function () {
    // 获取表单内容
    var formData = $(this).serialize()
    // 获取当前修改的表单id
    var id = $(this).attr('data-id');
    // 发送修改表单请求
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function (res) {
            location.href = './posts.html'
        }
    })
    return false
})
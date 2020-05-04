// 当点击上传文件按钮时触发
$('#file').on('change', function () {
    // 获取到上传的文件地址
    var file = this.files[0]
    // 创建formData对象 实现文件转化为二进制
    var formData = new FormData();
    formData.append('images', file);
    // 发送文件上传请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不对数据进行解析
        processData: false,
        // 不设置数据类型
        contentType: false,
        success: function (res) {
            // 返回值中就包含上传文件的地址
            // 将获取的图片地址在页面中存储
            $('#image').val(res[0].images)
            $('.thumbnail').css('display', 'inline-block');
            $('.thumbnail').attr('src', res[0].images)
        }
    })
})

// 当表单发生提交时触发
$('#slidesForm').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize();
    // 发送添加表单请求
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function (res) {
            // 重新调转到当前页面
            location.href = './slides.html'
        }
    })
    // 组织表单默认提交行为
    return false
})

// 展示slides列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        // 向模板中存放数据
        var html = template('slidesTpl', {
            data: res
        })
        // 向页面渲染数据
        $('#slidesBox').html(html)
    }
})

// 实现slides列表删除功能
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('确定要删除吗?')) {
        // 获取当前要删除的slide id
        var id = $(this).attr('data-id');
        // 发送请求 根于id删除slide
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function (res) {
                // 刷新页面
                location.href = './slides.html'
            }
        })
    }
})
// 实现网站图标上传功能
$('#file').on('change', function () {
    // 获取上传的图片
    var file = this.files[0];
    // 创建formData对象 实现长传图片转二进制
    var formData = new FormData();
    formData.append('logo', file);
    // 发送图片上传请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要对数据进行序列化
        processData: false,
        // 不要设置响应头Data属性
        contentType: false,
        success: function (res) {
            $('#logo').val(res[0].logo);
            $('#logoimage').attr('src', res[0].logo);
        }
    })
})

// 实现网站设置表单提交功能
$('#settingsForm').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize()
    // 发送提交表单请求
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (res) {
            location.href = './index/html'
        }
    })
    // 阻止表单默认行为
    return false
})

// 获取网站设置 
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        // 判断是否已设置过网站设置
        if (res) {
            $('#logo').val(res.logo);
            $('#logoimage').attr('src', res.logo);
            $('#SiteName').val(res.title)
            $('#comment').val(res.comment)
            $('#review').val(res.review)
        }
    }
})
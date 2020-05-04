// 当修改密码表单触发提交行为时触发
$('#modifyForm').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize();
    // 发送修改密码请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            location.href = './login.html'
        }
    })
    // 阻止表单默认行为
    return false
})
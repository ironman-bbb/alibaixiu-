// 退出功能
$("#logout").on('click', function () {
    // 询问用户是否退出
    var isLoginOut = confirm('确定退出账户')
    // 根据用户给与的请求作出反应
    if (isLoginOut) {
        // 向服务器发生退出请求
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (res) {
                alert(res.message);
                location.href = './login.html'
            },
        })
    }
})

// 处理时间函数
function Dateformat() {
    var date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向模板导入处理时间函数
template.defaults.imports.Dateformat = Dateformat;

// 发送请求获取当前登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (res) {
        $('.profile .name').html(res.nickName)
        $('.profile .avatar').attr('src', res.avatar)
        $('.profile').slideDown()
    }
})
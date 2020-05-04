// 检测到表单发生提交事件时触发
$("#userForm").on('submit', function () {
    // 获取表单内容
    var userForm = $(this).serialize();
    // 向服务器发送添加请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: userForm,
        success: function (res) {
            // 成功后刷新当前页面
            location.reload()
        },
        error: function (err) {
            // 警告错误信息
            alert(JSON.parse(err.responseText).message)
        }
    })
    return false
})

// 检测到avatar发生改变时触发
$('.modifyBox').on('change', '#avatar', function () {
    // 创建formdata对象 
    var formData = new FormData()
    // 在formdata对象中存储上传的图片(转换为二进制)
    formData.append('avatar', this.files[0]);
    // 发送上传请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 因为上传的为二进制文件 所以不需要服务器进行解析
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头
        success: (res) => {
            // 上传成功后 
            // 实现上传头像阅览
            $('#preview').attr('src', res[0].avatar);
            // 实现存储上传头像的地址
            $('#HiddenAvatar').val(res[0].avatar);
        }
    })
})

// 渲染用户列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', {
            data: res
        });
        $('#show_Box').html(html)
    }
})

// 使用事件委托给编辑按钮添加点击事件
$("#show_Box").on('click', '.edit', function () {
    // 获取当前点击按钮的id
    var id = $(this).attr('data-id');
    // 发送查询请求
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            // 引用模板
            var html = template('modifyTpl', {
                data: res
            });
            $(".modifyBox").html(html)
        }
    })
})

// 使用事件委托给修改表单按钮添加点击事件
$('.modifyBox').on('submit', '#modifyForm', function () {
    // 获取表单值
    var data = $(this).serialize()
    // 获取当前要修改的id
    var id = $('#editBtn').attr('data-id')
    // 发送修改请求
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: data,
        success: function (res) {
            location.href = './users.html'
        }
    })
    return false
})

// 使用事件委托给删除按钮添加点击事件
$("#show_Box").on('click', '.delete', function () {
    // 确定是否删除
    if (confirm('确定删除该用户吗?')) {
        // 获取当前要删除的id
        var id = $(this).attr('data-id');
        // 发送删除请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                location.href = './users.html'
            }
        })
    }
})

// 实现全选按钮
$('#selectAll').on('click', function () {
    // 获取全选按钮的状态
    var status = $(this).prop('checked');
    // 将全选按钮的状态赋予普通按钮
    $('.userStatus').prop('checked', status);
    if ($(this).prop('checked')) {
        $('#deleteMany').slideDown()
    } else {
        $('#deleteMany').slideUp()
    }
})

// 实现单选按钮关联全选按钮
$("#show_Box").on('click', '.userStatus', function () {
    // 判断选中的单选按钮和所有的单选按钮长度是否一致
    if ($('.userStatus').length == $('.userStatus:checked').length) {
        // 如果一致 正面所有单选按钮都选中了 设置全选按钮状态为选中
        $('#selectAll').prop('checked', true);
    } else {
        // 否则设置全选按钮选中状态为未选中
        $('#selectAll').prop('checked', false);
    }
    if ($('.userStatus:checked').length > 1) {
        $('#deleteMany').slideDown()
    } else {
        $('#deleteMany').slideUp()
    }
})

// 实现批量删除
$('#deleteMany').on('click', function () {
    // 设置空数组 用于存放查找到的id
    var deleteArray = [];
    // 对被选中的用户进行循环 获取到他们的id存入到deleteArray中
    $('.userStatus:checked').each((index, item) => {
        deleteArray.push($(item).attr('data-id'))
    })
    // 询问是否删除
    if (confirm('确定删除这些用户吗?')) {
        // 发送删除请求
        $.ajax({
            type: 'delete',
            // 使用 Array.join() 进行分割数组
            url: '/users/' + deleteArray.join('-'),
            success: function (res) {
                location.href = './users.html'
            }
        })
    }
})
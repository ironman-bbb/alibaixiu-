// 实现分类目录展示功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // 引用模板字符串
        var html = template('categoriesListTpl', {
            data: res
        })
        // 渲染分类列表
        $('#categoriesListBox').html(html)
    }
})

// 实现分类添加
$('#addCategory').on('submit', function () {
    // 获取表单内容
    var formData = $(this).serialize();
    // 发送添加分类请求
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (res) {
            location.href = './categories.html'
        }
    })
    // 阻止默认行为
    return false
})

// 使用事件委托给修改分类按钮添加点击事件
$('#categoriesListBox').on('click', '.edit', function () {
    // 获取当前点击修改分类按钮ID
    var id = $(this).attr('data-id');
    // 发送查询请求
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (res) {
            // 引用模板
            var html = template('ModifyCategoryTpl', {
                data: res
            })
            // 渲染模板
            $('#ModifyCategoryBox').html(html)
        }
    })
})

// 使用事件委托给修改分类添加提交时间
$('#ModifyCategoryBox').on('submit', '#ModifyCategory', function () {
    // 获取当前表单内容
    var formData = $(this).serialize()
    // 获取当前修改分类ID
    var id = $(this).attr('data-id');
    // 发送修改分类请求
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (res) {
            location.href = './categories.html'
        }
    })
    // 阻止表单默认行为
    return false
})

// 使用事件委托给删除分类按钮添加点击事件   未实现的功能
$('#categoriesListBox').on('click', '.delete', function () {
    // 询问是否要确定删除
    if (confirm('确定删除该分类吗')) {
        // 获取当前点击修改分类按钮ID
        // var id = $(this).attr('data-id');
        // 发送查询请求
        // $.ajax({
        //     type: '',
        //     url: '',
        //     success: function (res) {
        //     }
        // })
    }
})
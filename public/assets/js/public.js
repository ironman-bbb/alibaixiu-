// 发送请求获取随机推荐文章
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        var tpl = `
        {{each data}}
        <li>
            <a href="./detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(tpl, {
            data: res
        });
        $('#randomBox').html(html)
    }
})

// 发送请求获取最新评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (res) {
        var tpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
                <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                <p>
                    <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
                </p>
                <p>{{$value.content}}</p>
                </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(tpl, {
            data: res
        });
        $('#discuzBox').html(html)
    }
})

// 发送请求获取分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var tpl = `
        {{each data}}
        <li><a href="./list.html?categoryId={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        // 向模板中导入数据
        var html = template.render(tpl, {
            data: res
        })
        // 渲染到页面上
        $('#navBox').html(html)
        $('#topnavBox').html(html)
    }
})

// 实现搜索功能
$('.search form').on('submit', function () {
    // 获取表单内容
    var keys = $(this).find('.keys').val()
    location.href = './search.html?key=' + keys
    // 阻止表单默认行为
    return false
})
// 获取热门推荐列表
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (res) {
        // 创建模板字符串
        var recommend = `
        {{each data}}
        <li>
            <a href="./detail.html?id={{@$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        // 使用template.render向模板字符串中传递数据
        var html = template.render(recommend, {
            data: res
        })
        // 将模板字符串渲染到页面上
        $('#recommendBox').html(html)
    }
})
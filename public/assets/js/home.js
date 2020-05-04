// 发送请求 获取轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        // 向模板中添加数据
        var html = template('slidesTpl', {
            data: res
        });
        // 将模板渲染到页面上
        $('#slidesBox').html(html)
        // 播放轮播图
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination'
            },
        });
    }
})

// 发送请求 获取最新发布文章数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (res) {
        // 将数据存入模板中
        var html = template('panelnewTpl', {
            data: res
        })
        // 渲染数据
        $('#panelnewBox').html(html)
    }
})
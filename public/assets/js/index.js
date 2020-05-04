// 发送请求获取当前文章统计
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (res) {
        $('#postsCount').html(`<strong>${res.draftCount}</strong>篇文章（<strong>${res.postCount}</strong>篇草稿）`)
    }
})

// 发送请求获取分类统计
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (res) {
        $('#categoriesCount').html(`<strong>${res.categoryCount}</strong>个分类`)
    }
})

// 发送请求获取评论统计
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (res) {
        $('#commentsCount').html(`<strong>${res.commentCount}</strong>条评论`)
    }
})
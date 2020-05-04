1. 最后一个评论功能有一点小问题，包括接口，好像同步不到后台
2. 02-实现批量删除用户（一）_白屏有问题


一，首先总结案例中模板的使用，渲染页面。
引用模板文件 <script src="../assets/vendors/art-template/template-web.js"></script>
将文件中你想要渲染的部分放到下边的script type="text/html"中<tbody id="usersBox">
                                                        </tbody>
<!-- 将文件放到这个容器中  <!-- <script type="text/html" id="userstpl">
   {{each data}}
   <tr>
      <td class="text-center"><input type="checkbox" class="status" data-id="{{$value._id}}"></td>
      {{if $value.avatar == null}}
      <td class="text-center"><img class="avatar" src="../assets/img/default.png"></td>
      {{else}}
      <td class="text-center"><img class="avatar" src="{{$value.avatar}}"></td>
      {{/if}}
      <td>{{$value.email}}</td>
      <td>{{$value.nickName}}</td>
      <td>{{$value.status == 0?'未激活':'激活'}}</td>
      <td>{{$value.role == 'admin'?'超管':'普通用户'}}</td>
      <td class="text-center">
        <a href="javascript:;" class="btn btn-default btn-xs edit"data-id="{{$value._id}}">编辑</a>
        <a href="javascript:;" class="btn btn-danger btn-xs delete" data-id="{{$value._id}}">删除</a>
      </td>
    </tr>
   {{/each}}
  </script> --> -->
  <!-- 利用ajax请求数据$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result)
   var html = template('userstpl',{data:result});
   $('#usersBox').html(html)
  }
}) -->
===================================================================================
二，在编辑文章的时候跳转到文章编辑页面同时还要把你想要修改文章的id传过去http://localhost:3000/admin/post-add.html?id=5d2010c189b3351fecb8e405。
操作步骤如下看注释掉的代码实现了跳转，和id的传递1.<script type="text/html" id="wordContens">
    {{each records}}
    <tr>
      <td>{{$value.title}}</td>
      <td>{{$value.author.nickName}}</td>
      <td>{{$value.category.title}}</td>
      <td class="text-center">{{$imports.dateFormat($value.createAt)}}</td>
      <td class="text-center">{{$value.state=1?'发布':'未发布'}}</td>
      <td class="text-center">
        <!-- <a href="post-add.html?id={{$value._id}}" class="btn btn-default btn-xs edit" data-id="{{$value._id}}">编辑</a> -->
        <a href="javascript:;" class="btn btn-danger btn-xs delete" data-id="{{$value._id}}" >删除</a>
      </td>
    </tr>
    {{/each}}
  </script>
  2.利用构造好的函数将id利用字符串的方法处理好
   <!-- function getUrl(name){
   var paramsAry = location.search.substr(1).split('&');
    for (var i=0; i<paramsAry.length; i++){
    var tmp = paramsAry[i].split('=');
    if(tmp[0]==name){
    return tmp[1];
    }
     }
    return -1
     } -->
  利用ajax,请求数据并且渲染页面。
  三.封面的文件获取与呈现
  这里用隐藏域，把 <input type="hidden" id="hiddenImg" name="thumbnail">
            <div class="form-group">
              <label for="feature">文章封面</label>
              <!-- show when image chose -->
              <img class="help-block thumbnail" style="display: none">
              <input  id="feature" class="form-control" type="file">
              <input type="hidden" id="hiddenImg" name="thumbnail">
            </div>
  再利用onchange事件当中var formData = new FormData();formData.append('avatar', file);实现二进制文件上传 传递二进制数据值这里是必要的设置contentType:false, 告诉$ajax方法不要处理data属性对应的参数
  processData:false,
  <!-- $('#feature').on('change',function(){
  // 获取到管理员选择到的文件
  var file = this.files[0] 
  // 创建二formdata对象，实现二进制文件上传
  var formData = new FormData();
  formData.append('avatar', file);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // 告诉$ajax方法不要设置参数类型
    传递二进制数据值这里是必要的设置
    contentType:false,
    // 告诉$ajax方法不要处理data属性对应的参数
    processData:false,
    success:function(result){//成功的回调函数
      console.log(result);
      这两句通过控制台打印可观察到，所以如下设置
      $('.thumbnail').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar)
    }
     })
      }) -->
    四，当进行删除，和编辑(在不跳转页面时)操作时，用事件委托如下
  <!-- $('#usersBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    console.log(id);
  $.ajax({
    type:'delete',//get或post
    url:'/users/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload();
      重新加载页面
    }
  })
}) -->
同时呢也要给对应的Html页面，的删除案件，设置类名，自定义id，如下
    <a href="javascript:;" class="btn btn-default btn-xs edit"data-id="{{$value._id}}">编辑</a>
    <a href="javascript:;" class="btn btn-danger btn-xs delete" data-id="{{$value._id}}">删除</a>
    五，对渲染时间的格式进行处理，在对应js中声明函数function dateFormat(str)，
    function dateFormat(str) {
    var date = new Date(str);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    之后要开放到html中 <td class="text-center">{{$imports.dateFormat($value.createAt)}}</td>
}
   六，对显示内容转换的如下<td class="text-center">{{$value.state=1?'发布':'未发布'}}</td>
   七，编辑完后要修改的整个表单整体提交，也可以分开去获取，不过麻烦，操作如下，
   给整个修改的表单，添加自定义属性去获取id
<!-- <script type="text/html" id="modifyFormTpl">
        <form id="usersForm" data-id="{{_id}}">
        <h2>修改用户</h2>
        <div class="form-group">
          <label>头像</label>
          <div class="form-group">
            <label class="form-image">
            对上传的文件判断，如果没有，就用默认的，有的话，就用有的
              <input id="avatar" type="file">
              {{if avatar}}
              <img src="{{avatar}}" id="preview">
              {{else}}
              <img src="../assets/img/default.png" id="preview">
              {{/if}}
              <input type="hidden" name="avatar" id="hiddenAvatar" value="{{avatar}}">
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input value="{{email}}" name="email" class="form-control" type="email" placeholder="请输入邮箱">
        </div>
        <div class="form-group">
          <label>昵称</label>
          <input value="{{nickName}}" name="nickName" class="form-control" type="text" placeholder="请输入昵称">
        </div>
        <div class="form-group">
          <div class="radio-inline">
            <label><input {{status==0?'checked':''}} type="radio" name="status" value="0" >未激活</label>
          </div>
          <div class="radio-inline">
            <label><input {{status==1?'checked':''}} type="radio" name="status" value="1">激活</label>
          </div>
        </div>
        <div class="form-group">
          <div class="radio-inline">
            <label><input {{role=='admin'?'checked':''}} type="radio"  name="role" value="admin">超级管理员</label>
          </div>
          <div class="radio-inline">
            <label><input {{role=='normal'?'checked':''}} type="radio"  name="role" value="normal">普通用户</label>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">修改</button>
        </div>
      </form>
  <!-- </script> --> -->
  注意啦，新的表单事件，用事件委托，同时还要用到serialize()， console.log($(this).serialize());var id = $(this).att('data-id');还要清楚表单的，默认行为
  
```js
$('#formBox').on('submit','#usersForm',function(){
  console.log($(this).serialize());
  var id = $(this).attr('data-id');
  console.log(id)
  $.ajax({
    type:'put',//get或post
    url:'/users/' + id,//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();
    }
  })
  return false;
})
```
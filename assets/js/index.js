$(function () {
    getUserInfo();
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('失败')
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr('src', user.user_pic);
        $(".user_avater").hide();
    } else {
        $(".layui-nav-img").hide();
        var str = user.username[0].toUpperCase();
        $(".user_avater").html(str)
    }

}
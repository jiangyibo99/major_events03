$(function () {
    $("#link_reg").on('click', function () {
        $(".reg-box").show();
        $(".login-box").hide()
    })
    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show()
    })
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $("#form_reg [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }
    })
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录');
            $("#link_login").click();
        })
    })
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})
$(function () {
    $("#link_reg").on('click', function () {
        $("#form_reg").show();
        $("#form_login").hide();
    })
    $("#link_login").on('click', function () {
        $("#form_reg").hide();
        $("#form_login").show();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $("#form_reg [name=password]").val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg('注册失败 ' +res.message)
            }
            $("#form_reg")[0].reset();
            $("#link_login").click();

        })
    })
    $("#form_login").on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $("#form_login [name=username]").val(),
                password: $("#form_login [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败' +res.message)
                }
                localStorage.setItem('token',res.token)
                location.href = '/index.html';
            }
        })
    })
})
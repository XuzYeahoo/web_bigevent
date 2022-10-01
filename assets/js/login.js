$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  // 从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过form.verify()自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一个等于的比较
      // 如果失败 return一个错误提示即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });
  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    // 1.阻止默认提交行为
    e.preventDefault();
    // 2.发起Ajax的post请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功");
      // 注册成功跳转到登录页面
      // 通过代码模拟人的点击行为
      $("#link_login").click();
    });
  });
  // 监听登录表单的提交事件
  $("#form_login").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        // 将登录成功得到的 token 字符串存储到 localStorage中
        localStorage.setItem("token", res.token);
        console.log(res.token);
        // 登录成功后自动跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
});

// 注意：每次调用$.get()或$.post()或$.ajax()的时候，会先调用$.ajaxPrefilter()这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  // 1.在发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = "http://big-event-api-t.itheima.net" + options.url;
  // 2.统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 2.全局统一挂载complete函数
  options.complete = function (res) {
    //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 1.强制清空 token
      localStorage.removeItem("token");
      // 2.跳转页面
      location.href = "/login.html";
    }
  };
});

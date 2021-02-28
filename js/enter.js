var text = document.querySelector('[type="text"]')
var password = document.querySelector('[type="password"]')
var button = document.querySelector('[type="button"]')

//给能被点击的登录按钮绑定点击事件
button.onclick = function(){
    //获取输入框value
    var u1 = text.value
    var p1 = password.value
    //调用ajax
    Ajax({
        url: './php/enter.php',  /* 路径问题不用.. */
        data: `username=${u1}&password=${p1}`,/* php */
        success: function(dt){
            //判断当前返回值是否等于1
            if(dt == 1){
                localStorage.setItem('login', "1")
                location.href = './index.html'  /* 因为是解析到html里，以html为源文件 */
            } else {
                alert('登录失败，请重新输入')
            }
        }
    })
    return false
}

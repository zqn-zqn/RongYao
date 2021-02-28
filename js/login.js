var text = document.querySelector('[type="text"]')
var password = document.querySelector('[type="password"]')
var password2 = document.querySelector('[type="password2"]')
var button = document.querySelector('[type="button"]')

//给能被点击的登录按钮绑定点击事件
button.onclick = function(){
    /* 获取输入框value */
    var u1 = text.value
    var p1 = password.value
    var p2 = password2.value
    if(p1 = p2){
        //调用ajax
        Ajax({
            url: './php/login.php',  /* 路径问题不用.. */
            data: `username=${u1}&password=${p1}`,/* php */
            success: function(dt){
                //判断当前返回值是否等于1
                if(dt == 1){
                    /* 注册成功跳转页面 */
                    location.href = './index.html'  /* 因为解析到html里，以html为源文件 */
                } else {
                    alert('注册失败')
                }
                console.log(dt)
            }
        })
        return false
    } else {
        alert('输入有误，请重新输入')
    }
    
    
}

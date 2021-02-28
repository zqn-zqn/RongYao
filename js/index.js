if (localStorage.getItem("login")) {
    /* console.log($(".shortcut .layout .layout_2 .login")); */
    $(".shortcut .layout .layout_2 .login").html('<span id="tui_chu">退出</span>')
    $("#tui_chu").click(() => {
        alert('确定退出?')
        $(".shortcut .layout .layout_2 .login").html(`<span class="layout_login">注册</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span class="layout_enter">登录</span>`)
        /* localStorage.setItem('login', "0") */
    })

    $('.layout_enter').click(()=>{
        console.log(123);
    })
}

/* var mySwiper = new Swiper('.swiper-container', {
    autoplay:true,//自动切换，默认时间3s
    navigation: {  //左右按钮
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect : 'fade',//淡入切换效果。
    loop : true,//循环切换。
});
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function(){
    mySwiper.autoplay.stop();
}
//鼠标离开开始自动切换
mySwiper.el.onmouseout = function(){
    mySwiper.autoplay.start();
} */
var mySwiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

$(function() {
    $.ajax({
        url: './data/list.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(json) {
            main2_listData(json);
        },
        error: function(err) {
            console.log(err);
        }
    })

    function main2_listData(data) {
        let result = '';
        /* swiper-container */
        for (let i = 0, len = data.length; i < len; i++) {
            /* class="main2_li" */
            result += `
            <li class="recom-li" id= '${data[i].id}'>
                <a class="recom-aone" href="javascript:">
                    <img src=${data[i].img_url} alt="">
                </a>
                <p>
                    <a href="javascript:">${data[i].name}</a>
                </p>
                <p class="recom-ptwo">
                    <span class="recom-span">${data[i].price}起</span>
                </p>
                <a class="recom-atwo" href="javascript:">
                    <input class="recom-input" type="button" value="加入购物车">
                </a>
                <p class="recom-pone">${data[i].evaluate}评价&nbsp;${data[i].score}</p>
            </li>
            `


        }
        $('.main2_list').append(result)
    }

})


//获取操作对象
var box = document.querySelector('body')

//获取所有选中框对象
var inps = document.getElementsByName('a1')

//获取全选框对象
var quan = document.querySelector('[name="a0"]')

var shte = document.querySelector('.shopp-table')//要插入元素的父节点。
var shNtr = document.getElementsByClassName('shopp-tr')//这里要获取className的名,才能得到金额
var shtro = document.querySelector('.shopp-tro')//主要是来获取到店铺总计


var clsp = document.querySelector('close-divsp')//主要是获取结算栏中的总计(不含运费)下的数字



var shtt = document.querySelector('.shopp-tfoot')//要插入到这个元素节点的上面

var shty = document.querySelector('.shopp-tbody')//所有的商品
var shtr = document.querySelector('.shopp-tr')//这个才是所有的商品
//console.log(shty)



//获取所有商品
var divs = document.getElementsByClassName('shopp-div')


var inps = document.getElementsByName('a1')
var inps2 = document.getElementsByName('a0')



//单击
box.onclick = function (e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    if (target.value == "加入购物车") {
        var newTbody = document.createElement("tbody")
        newTbody.className = 'shopp-tbody'
        newTbody.innerHTML = `
        <tr class="shopp-tr">
            <td class="shopp-td-1">&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="a1" value="1">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td class="shopp-tdimg"><img src="./images/sj-ry01.png" alt="" width="80px" height="80px"></td>
            <td class="shopp-tdname"><a href="javascript:">荣耀V40</a></td>
            <td class="shopp-td-2">¥<span>3599</span></td>
            <td class="shopp-tdshuli">
                <span class="shopp-span">
                    <a href="javascript:"><input class="aa" type="button" value="-" style="display: inline-block; width: 28px; height: 28px;"></a>
                    <input class="cc" type="text" name="wenben" value="1">
                    <a href="javascript:"><input class="aa" type="button" value="+" style="display: inline-block; width: 28px; height: 28px;"></a>
                </span>
            </td>
            <td class="shopp-td-3">¥<span>3599.00</span></td>
            <td class="shopp-td-4">
                <span><a href="javascript:">移入收藏</a></span><br>
                <span><a href="javascript:"><input type="button" value="删除"></a></span>
            </td>
        </tr>
         `
        //把当前新的div对象插入到指定位置
        //插入要先找到它的父标签
        shte.insertBefore(newTbody, shtt)
        /* a++
        if(a>7){
            a=1
        } */
        total1()
        checked1()
    }
    //console.log(newTbody)

    //判断点击的是否为全选框
    if (target.value == "全选") {
        inps2.checked = true//for循环
        //遍历所有选中框对象
        for (var i = 0; i < inps.length; i++) {
            //判断全选框是否被选中
            if (target.checked) {
                inps[i].checked = true
            } else {
                inps[i].checked = false
            }
        }
    }

    //判断点击的是否为选中框对象
    if(target.name='wenben'){

        checked1()
    }

    //判断点击的是否为删除
    if (target.value == "删除") {
        target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()//节点要获取对
        total1()
        //checked1()
    }

    //判断点击的对象是否为批量删除按钮
    if (target.value == '批量删除') {
        //遍历所有商品
        for (var i = divs.length - 1; i >= 0; i--) {
            //获取当前商品选中框的对象
            var check1 = divs[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild//节点要获取对
            //判断当前商品是否被选中
            if (check1.checked) {
                //删除当前被选中的商品
                divs[i].remove()
            }
        }
        total1()
        checked1()
    }

    //判断点击的是否为加号
    if (target.value == '+') {
        //获取当前对象前面的数量
        var num = target.parentNode.previousElementSibling.value//html没分，节点找错了。value要放后面有顺序
        //给当前数量加加
        num++
        //在把计算之后的结果赋值给输入框对象
        target.parentNode.previousElementSibling.value = num

        //获取单价（元）  //＋号 的父节点 的父节点 的父节点 的上一个元素节点 的最后一个子元素节点
        var price = target.parentNode.parentNode.parentNode.previousElementSibling.lastElementChild.innerHTML
        //计算金额（元）
        var xiaoji=parseFloat(price)*parseFloat(num)
        //获取当前商品中所有子元素节点
        var sons=target.parentNode.parentNode.parentNode.parentNode.children
        //把计算结果赋值给金额（元）的位置  //length为7，金额为6(长度6，下标5)
        sons[sons.length-2].lastElementChild.innerHTML=xiaoji
        total1()
    }
    //console.log(target.value)

    //判断点击的是否为-号
    if (target.value == '-') {
        //获取当前对象后面的数量
        var num = target.parentNode.nextElementSibling.value
        //判断数量是否小于等于1
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        //重新把计算结果赋值给输入框
        target.parentNode.nextElementSibling.value = num
        //获取单价（元）  //-号 的父节点 的父节点 的父节点 的上一个元素节点 的最后一个子元素节点
        var price=target.parentNode.parentNode.parentNode.previousElementSibling.lastElementChild.innerHTML
        //计算金额（元）
        var xiaoji=parseFloat(price)*parseFloat(num)
        //获取当前商品中所有子元素节点
        var sons=target.parentNode.parentNode.parentNode.parentNode.children
        //把计算结果赋值给金额（元）的位置  //length为7，金额为6(长度6，下标5)
        sons[sons.length-2].lastElementChild.innerHTML=xiaoji
        total1()
    }


}

function checked1(){
    //判断当前购物车中是否存在商品
    if(inps.length>0){
      var mm=0 //被选中的次数
        //遍历所有的选中框
        for(var i=0;i<inps.length;i++){
          //判断当前选中框是否被选中
          if(inps[i].checked){
            mm++
          }
        }
        //判断当前选中框被选中的次数是否等于长度
        if(inps.length==mm){
          quan.checked=true
        }else{
          quan.checked=false
        }
      }else{
        quan.checked=false
      }
}

//获取所有的input输入框
var inputs=document.getElementsByClassName('cc')
//给每个输入框绑定一个oninput事件
for(var i=0;i<inputs.length;i++){
  inputs[i].oninput=function(){
    //获取当前输入框中的文本
    var val=this.value
    var reg=/^[1-9]\d{0,4}$/
    if(reg.test(val)){
      //获取单价
      var price=this.parentNode.nextElementSibling.lastElementChild.innerHTML
      //计算小计
      var xiaoji=parseInt(val)*parseFloat(price)
      //重新给小计赋值
      this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML=xiaoji
    }else{
      alert("数量有误，请重新输入")
      this.value=1
      //获取单价
      var price=this.parentNode.nextElementSibling.lastElementChild.innerHTML

      //重新给小计赋值
      this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML=price
    }
    total1()
  }
}


//创建统计函数，计算总计
function total1() {
    var sum = 0 //总计
    //遍历所有商品
    for (var i = 0; i < shNtr.length; i++) {
        //获取当前商品中所有的子元素节点
        var sons = shNtr[i].children
        //获取金额
        var jine = sons[sons.length - 2].lastElementChild.innerHTML //获取金额
        sum += parseFloat(jine)//金额赋值给店铺合计
    }
    //把当前总计赋值给店铺合计
    shtro.lastElementChild.lastElementChild.innerHTML = sum

}
total1()
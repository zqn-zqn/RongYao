$(function() {
    let product_id = localStorage.getItem('product')

    $.ajax({
        url: './data/list.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
            for (let i = 0, len = json.length; i < len; i++) {
                if (json[i].id == product_id) {
                    $('.full_title').html(json[i].full_title)
                    $('.f').html(json[i].price)
                }
            }
        },
        error: function(err) {
            console.log(err)
        }
    })

    $('.plus1').click(() => {
        console.log(1)
        let num = $('input.amount1').val()
        num++
        $('input.amount1').val(num)
    })

    $('.minus1').click(() => {
        let num = $('input.amount1').val()
        if (num > 1) {
            num--
            $('input.amount1').val(num)
        }
    })

    var s1 = $('.i_list .s1');
    var s2 = $('.i_list .s2');
    var lis = $('.list_u li');
    var ul = $('.list_u');
    var width = ul.css('width');

    s1.click(() => {
        for (let i = 0, len = lis.length; i < len / 2; i++) {
            $('.list_u').scrollLeft(70 * i);
        }
    });

    s2.click(() => {
        for (let i = 0, len = lis.length; i < len / 2; i++) {
            $('.list_u').scrollLeft(-70 * i);
        }
    })


    //点击加入购物车
    /* $('.r_a').on('click', '.r_a1', function() {
        $.ajax({
            url: './php/user.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: localStorage.getItem('username'),
                productId: localStorage.getItem('product'),
                productAmount: $('input.amount1').val(),
                request_type: 'update_cart'
            },
            success: function(json) {
                console.log(json)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }) */


})
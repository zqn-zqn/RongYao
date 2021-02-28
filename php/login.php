<?php
header("content-type: text/html; charset = utf-8");

//获取传入的参数
$u = $_GET['username'];
$p = $_GET['password'];

//连接数据库
$link = mysqli_connect('localhost','root','','rongyao');

//设置编码
mysqli_set_charset($link,'utf8');

//SQL语句
$sql = "select * from enter where name = '$u' and password = '$p'"; /* 登录、注册就是MySql语句不同 */

//执行SQL语句，并返回结果集
$result = mysqli_query($link, $sql);

//判断当前结果集中是否存在数据
if(mysqli_fetch_assoc($result)){
    /* 是的话返回0，不给注册 */
    echo '0';
} else {
    //SQL语句
    $sql = "insert into enter values(null,'$u','$p')";
    //执行SQL
    $result = mysqli_query($link, $sql);
    echo '1';
}

//关闭连接
mysqli_close($link);

?>
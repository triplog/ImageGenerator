<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>ラーメン三銃士ジェネレータ</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="./../../../main.css">
  <link rel="stylesheet" href="./../../pg.css">
  <link rel="stylesheet" href="ra-men.css?0522">
  <?php
    date_default_timezone_set('Asia/Tokyo');
    $serif1   = "ラーメン三銃士を連れてきたよ。";
    $serif2   = "ラーメン　三銃士？";
    $serif3_1 = "麺の専門家、乃士勇造。";
    $serif3_2 = "うっす、　よろしく。";
    $serif4_1 = "スープの　専門家、　出川　実。";
    $serif4_2 = "がんばります、よろしく。";
    $serif5_1 = "チャーシュー、メンマなど　　具の専門家、　多木　康。";
    $serif5_2 = "よっす、どうも。";
  ?>
</head>
<nav id="breadcrumbs">
  <a href="./../../../">ホーム</a> &gt;
  <a href="./../../">プログラミング</a> &gt;
  <a href="./../">月1</a> &gt;
  <a href="./">画像ジェネレータ</a> &gt;
</nav>

<body>
  <h1>ラーメン三銃士ジェネレータ</h1>
  <div id="canvas">
    <canvas id="srcImg" width="568" height="660"></canvas>
  </div>
    <div id="edit">
    <h2 class="js">使い方</h2>
    <p>下のテキストボックスに台詞を入力．
    文字位置は空白で調整してください．
    保存ボタンを押すとpng形式で保存．</p>

    <h2 class="js">編集</h2>
    <input type="text" name="serif1"   placeholder=<?php echo $serif1  ;?>><br>
    <input type="text" name="serif2"   placeholder=<?php echo $serif2  ;?>><br>
    <input type="text" name="serif3_1" placeholder=<?php echo $serif3_1;?>><br>
    <input type="text" name="serif3_2" placeholder=<?php echo $serif3_2;?>><br>
    <input type="text" name="serif4_1" placeholder=<?php echo $serif4_1;?>><br>
    <input type="text" name="serif4_2" placeholder=<?php echo $serif4_2;?>><br>
    <input type="text" name="serif5_1" placeholder=<?php echo $serif5_1;?>><br>
    <input type="text" name="serif5_2" placeholder=<?php echo $serif5_2;?>><br>
    <input type="text" name="auther"   placeholder=<?php echo "@作者名";?>><br>
    <input type="hidden" id="baseTweet" value="ラーメン三銃士を連れてきたよ。 #ラーメン三銃士 @triplog_">

    <a class="button" onClick="buttonClear()">全消し</a>
    <a class="button" onClick="buttonOriginalize()">オリジナル</a>
    <a class="button" onClick="buttonSave()">保存</a>
    <a class="button" href="javascript:w=window.open('http://www55.atpages.jp/triplog/ultimateoauth534/UltimateOAuth-master/prepare.php','','scrollbars=yes,Width=600,Height=500');w.focus();">twitter連携</a>
<!--    <a class="button" onClick="inputTest()">test</a>-->

    <h2 class="js">その他</h2>
    <p>動作環境はGoogle Chromeを想定．IE/Firefoxだと不具合出るかも．フォントは<a href="http://www.fontna.com/blog/1122/" class="font1">やさしさアンチック</a>を使用しています．</p>
  </div>
  
  <div style="clear:both;">
    <hr>
    <p>最終更新：<?php echo date("Y.m.d.H:i:s", filemtime("ra-men34.php")); ?></p>
  </div>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="http://twitter.com/intent/tweet?http://platform.twitter.com/widgets.js"></script>
  <script src="ra-men.js?0526"></script>
</body>
</html>

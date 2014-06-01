<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>魔法陣ジェネレータ【1】</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="./../../../main.css">
  <link rel="stylesheet" href="./../../pg.css">
  <link rel="stylesheet" href="ra-men.css?0522">
  <?php
    date_default_timezone_set('Asia/Tokyo');
    $serif1 = "外円";
    $serif2 = "中円";
    $serif3 = "内円";
  ?>
<style>
#color0,#color1,#color2,#color3,#color4,#color5,#color6 { background-color:#888888;color:white;}
#edit span {-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;unselectable="on"}
#edit>input{width:246px;}
.color { background-color:#888888;color:white;}
.plus  { background-color:red;color:white;}
.minus { background-color:blue;color:white;}
#edit>div{float:left;width:100px;}
#numN,#numM { width:24px;}
</style>
</head>
<nav id="breadcrumbs">
  <a href="./../../../">ホーム</a> &gt;
  <a href="./../../">プログラミング</a> &gt;
  <a href="./../">月1</a> &gt;
  <a href="./">画像ジェネレータ</a> &gt;
</nav>

<body>
  <h1>魔法陣ジェネレータ【1】</h1>
  <div id="canvas" style="width:480px;">
    <canvas id="srcImg" width="480" height="500" style="background-color:#000000"></canvas>
    <input type="hidden" id="baseTweet" value="あなたの魔法陣 #魔法陣ジェネレータ @triplog_">
  </div>
  <div id="edit">
    <h2 class="js">使い方</h2>
    <p>手軽にオリジナルの魔法陣を作成できます．
    下のテキストボックスに言葉(半角英数記号)を入力．
    各項目左の■で文字色を，右の＋－で大きさを変更．
    またキャンバスをクリックで背景色を変更，グレーのチェックは透明を示します．
    保存を押すとpng形式で保存．
    まだまだ開発途中なので上手く動かない所があるかも．</p>

    <h2 class="js">編集</h2>
    <span id="color0">■</span><input type="text" name="outer"  placeholder=<?php echo $serif1;?>><span class="plus" name="0">＋</span><span class="minus" name="0">－</span><br>
    <span id="color1">■</span><input type="text" name="middle" placeholder=<?php echo $serif2;?>><span class="plus" name="1">＋</span><span class="minus" name="1">－</span><br>
    <span id="color2">■</span><input type="text" name="inner"  placeholder=<?php echo $serif3;?>><span class="plus" name="2">＋</span><span class="minus" name="2">－</span><br>

    <div><span id="color3">■</span><span class="stroke" name="1">円１</span><span class="plus" name="3">＋</span><span class="minus" name="3">－</span></div>
    <div><span id="color4">■</span><span class="stroke" name="2">円２</span><span class="plus" name="4">＋</span><span class="minus" name="4">－</span></div>
    <div><span id="color5">■</span><span class="stroke" name="3">円３</span><span class="plus" name="5">＋</span><span class="minus" name="5">－</span></div><br>
    <div style="width:190px"><span id="color6">■</span><span class="stroke" name="4">N/M芒星</span><input type="text" id="numN" placeholder="N" value="5">/<input type="text" id="numM" placeholder="M" value="2">
    <span class="plus" name="6">＋</span><span class="minus" name="6">－</span></div>
    <input type="text" name="auther" style="width:106px;" placeholder="@作者名"><br>

    <a class="button" onClick="buttonOriginalize()">ガイド</a>
 <!--   <a class="button" href="magicringCV.php" target="blank">画像加工(未)</a>-->
    <a class="button" onClick="buttonNext()">画像加工</a>
    <a class="button" onClick="buttonSave()">保存</a>
    <a class="button" onClick="buttonTweet()">twitter連携</a>

    </div>
  <div id="detail">
    <h2 class="js">詳細説明</h2>
    <p>半角英数字及び一部の記号のみがフォントに対応，大文字/小文字の区別はしません．
    文字数が一定数に満たない場合は繰り返し並べ，
    繰り返しの両端を配置してから残りを均等に配置しているため
    文字数が少ないと思い通りに出ない可能性があります．</p>
    <p>01～08文字：45度*8（内周のみ）</p>
    <p>09～10文字：60度*6</p>
    <p>11～12文字：72度*5</p>
    <p>13～16文字：90度*4</p>
    <p>17～32文字：90度*2*2(前半/後半)</p>
    <p>33～64文字：90度*1*4</p>
    <p>64文字以上の場合最初の64文字を使う．<p>
    <h2 class="js">その他</h2>
    <p>動作環境はGoogle Chromeを想定．Firefoxだと不具合出るかも．
    フォントは<a href="http://inatsuka.hp2.jp/extra/magicring/" class="font3">MagicRing</a>を使用しています．
    もっと本格的な魔法陣を描きたい人は<a href="http://inajob.no-ip.org:10080/mce2/mce2.html" target="blank">魔法陣エンジンMCE2</a>へ．</p>
  </div>
  <div style="clear:both;">
    <hr>
    <p>最終更新：<?php echo date("Y.m.d.H:i:s", filemtime("magicring.php")); ?></p>
  </div>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="magicring.js?0531"></script>
  <script>
  
  </script>
</body>
</html>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>マサル図説ジェネレータ</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="./../../../main.css">
  <link rel="stylesheet" href="./../../pg.css">
  <link rel="stylesheet" href="ra-men.css?0522">
  <?php
    date_default_timezone_set('Asia/Tokyo');
    $serif1 = "セクシー　　コマンドー";
    $serif2 = "省　　　略";
    $serif3 = "けじめ";
    $serif4 = "高校生になっても    ３－Ｂの事忘れ     ないでね！という気持ち";
    $serif5 = "ヒ　ゲ";
    $serif6 = "　　　　　　　　　　学ラン";
    $serif7 = "セクシーさ";
    $serif8 = "３年間の思い出";
  ?>
</head>
<nav id="breadcrumbs">
  <a href="./../../../">ホーム</a> &gt;
  <a href="./../../">プログラミング</a> &gt;
  <a href="./../">月1</a> &gt;
  <a href="./">画像ジェネレータ</a> &gt;
</nav>

<body>
  <h1>マサル図説ジェネレータ</h1>
  <div id="canvas" style="width:300px;">
    <canvas id="srcImg" width="300" height="320"></canvas>
    <h2 class="js">フォントオリジナル記号</h2>
    <ul>
      <li>♪(おんぷ)→<span class="font2">♪(ハート)</span></li>
      <li>♭(フラット)→<span class="font2">♭(汗)</span></li>
      <li>‡(ダガー)→<span class="font2">‡(ケシケシ君)</span></li>
      <li>‰(パーミル)→<span class="font2">‰(ピースっ)</span></li>
      <li>§(セクション)→<span class="font2">§(みかちゃん)</span></li>
    </ul>
    <h2 class="js">備考</h2>
    <p>「けじめ」が枠に収まらず・・・</p>
  </div>
  <div id="edit">
    <h2 class="js">使い方</h2>
    <p>下のテキストボックスに言葉を入力．
    文字位置は空白で調整してください．
    保存ボタンを押すとpng形式で保存．</p>

    <h2 class="js">編集</h2>
    <input type="text" name="serif1" placeholder=<?php echo $serif1;?>><br>
    <input type="text" name="serif2" placeholder=<?php echo $serif2;?>><br>
    <input type="text" name="serif3" placeholder=<?php echo $serif3;?>><br>
    <input type="text" name="serif4" placeholder=<?php echo $serif4;?>><br>
    <input type="text" name="serif5" placeholder=<?php echo $serif5;?>><br>
    <input type="text" name="serif6" placeholder=<?php echo $serif6;?>><br>
    <input type="text" name="serif7" placeholder=<?php echo $serif7;?>><br>
    <input type="text" name="serif8" placeholder=<?php echo $serif8;?>><br>
    <input type="text" name="auther" placeholder=<?php echo "@作者名";?>><br>
    <input type="hidden" id="baseTweet" value="セクシーコマンドー部、略して『ヒゲ部』 #マサル図説 @triplog_">

    <a class="button" onClick="buttonClear()">全消し</a>
    <a class="button" onClick="buttonOriginalize()">オリジナル</a>
    <a class="button" onClick="buttonSave()">保存</a>
    <a class="button" href="javascript:w=window.open('http://www55.atpages.jp/triplog/ultimateoauth534/UltimateOAuth-master/prepare.php','','scrollbars=yes,Width=600,Height=500');w.focus();">twitter連携</a>

    <h2 class="js">その他</h2>
    <p>動作環境はGoogle Chromeを想定．Firefoxだと不具合出るかも．フォントは<a href="http://cute-freefont.flop.jp/mikachan.html" class="font2">みかちゃんフォント</a>を使用しています．</p>
  </div>
  
  <div style="clear:both;">
    <hr>
    <p>最終更新：<?php echo date("Y.m.d.H:i:s", filemtime("masaru.php")); ?></p>
  </div>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="http://twitter.com/intent/tweet?http://platform.twitter.com/widgets.js"></script>
  <script src="masaru.js?0523_3"></script>
</body>
</html>

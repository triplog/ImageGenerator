<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>魔法陣ジェネレータ【2】</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="./../../../main.css">
  <link rel="stylesheet" href="./../../pg.css">
  <link rel="stylesheet" href="ra-men.css">
<style>
.marker {
  top: 0px; left: 0px;
  background: -webkit-linear-gradient(top, #7EF 0%, #067 100%);
  position: absolute;
  width: 15px; height: 15px;
  border-radius: 7px;
}
#container{
  float:left;
  margin-right:1em;
}
#srcImg {
  background-color:pink;
  -webkit-transform-origin: 0% 0%;
  display:none;
}
#srcImage{
  -webkit-transform-origin: 0% 0%;
}
#tempImage{
  display:none;
  -webkit-transform-origin: 0% 0%;
}
#edit>span {-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;unselectable="on"}
#edit>input{width:96px;}
#message { font-size:12px;}
</style>

</head>
<nav id="breadcrumbs">
  <a href="./../../../">ホーム</a> &gt;
  <a href="./../../">プログラミング</a> &gt;
  <a href="./../">月1</a> &gt;
  <a href="./">画像ジェネレータ</a> &gt;
  <a href="./magicring.php">魔法陣ジェネレータ【1】</a> &gt;
</nav>

<body>
  <h1>魔法陣ジェネレータ【2】</h1>
  <div id="container" style="background-image:url('clear.png?0531');background-color:#888888">
    <img id="srcImage" src="../../../OpenCVjs-master/javascript/dmy.jpg" title="">
    <canvas id="srcImg" width="480" height="500" ></canvas>
    <div class="marker" id="marker1"></div>
    <div class="marker" id="marker2"></div>
    <div class="marker" id="marker3"></div>
    <div class="marker" id="marker4"></div>
  </div>
  <div id="edit">
    <h2 class="js">使い方</h2>
    <p>作成した魔法陣に画像効果を加えます．
    キャンバスクリックで背景を変更しますが，あくまで確認用で，出力画像には反映されません．
    出力画像の背景を変えたい場合は親ウィンドウで変えた上でリロードして下さい．
    四隅のマーカーをドラッグすると姿勢を変えられますがこちらも出力画像には反映されません．
    姿勢を保ったまま保存したい場合はSSを撮って下さい，今後改善したいところです．</p>
    
    <h2 class="js">編集</h2>
<!--    <input type="file" id="file1" onClick="cvLoadImagePre(event, 'file1')" onchange="cvLoadImage(event, 'srcImg', iplImage, 800)">
    <input type="file" id="file1" onClick="cvLoadDataUrl(event, 'srcImg', iplImage, 800)">
    <input type="button" value="smooth" onClick="Smooth('srcImg', iplImage)">
    <input type="button" value="white_black" onClick="WhiteBlack('srcImg', iplImage)">
    <input type="button" value="rainbow" onClick="Rainbow('srcImg', iplImage)">
    <input type="file" id="file1" onClick="cvLoadImagePre(event, 'file1')" onchange="cvLoadImage(event, 'srcImg', iplImage, 800)">
-->
    <input type="button" value="reload" onClick="buttonReload()" />
    <input type="button" value="store" onClick="buttonStore()" />
    <input type="button" value="restore" onClick="buttonRestore()" /><br />
    <p id="message"> システムメッセージ </p>
    
    <input type="button" value="lineMono" onClick="cvSharpEdge('srcImage', iplImage, 'Mono')">
    <input type="button" value="lineColor" onClick="cvSharpEdge('srcImage', iplImage, 'Color')">
    <input type="button" value="lineRainbow" onClick="cvSharpEdge('srcImage', iplImage, 'Rainbow')">

<!--    <input type="button" value="edgeRainbow" onClick="cvSharpEdge('srcImg', iplImage, 'rainbow2')">
    <input type="button" value="egdeMono" onClick="cvSharpEdge('srcImg', iplImage, 'mono')">
    <input type="button" value="chaos2" onClick="cvFilterTest('srcImg', iplImage)">
-->
    <input type="button" value="exMono" onClick="cvExpand('srcImage', iplImage, 'Mono')">
    <input type="button" value="exColor" onClick="cvExpand('srcImage', iplImage, 'Color')">
    <input type="button" value="exRainbow" onClick="cvExpand('srcImage', iplImage, 'Rainbow')">

    <input type="button" value="smooth" onClick="buttonOpenCVjs(cvGaussianSmooth,'smooth')">
    <input type="button" value="lightControll" onClick="buttonOpenCVjs(cvLightControll,'lightControll')">
    <input type="button" value="chaos" onClick="buttonOpenCVjs(cvChaos3,'chaos')">

    <input type="button" value="oSoftFocus" onClick="buttonOpenCVjs(SoftFocus, 'oSoftFocus')">
    <input type="button" value="oLightFall" onClick="buttonOpenCVjs(LightFall, 'oLightFall')">
    <input type="button" value="oRainbow" onClick="buttonOpenCVjs(Rainbow, 'oRainbow')">

    <a class="button" onclick="buttonMarker()">マーカーOn/Off</a>
    <a class="button" onclick="cvSuperimpose()">重ねる</a>
    <a class="button" onClick="buttonSave()">保存</a>
    <a class="button" onClick="buttonTweet()">twitter連携</a>
    <input type="hidden" id="baseTweet" value="あなたの魔法陣 #魔法陣ジェネレータ @triplog_">
    <img id="tempImage" src="../../../OpenCVjs-master/javascript/dmy.jpg" title="">

  </div>
  <div id="detail">
    <h2 class="js">詳細説明</h2>
    <p>reload:親ウィンドウから読み込む．</p>
    <p>store:現在の状態を一時保存．</p>
    <p>restore:一時保存した状態に戻す．</p>
    <p>line~ は輪郭の線を描きます．</p>
    <p>smooth は平滑化．</p>
    <p>LightControll は周囲を暗く．</p>
    <p>chaos は彩度や明度をランダム変化．</p>
    <p>oSoftFocus は焦点をぼかした感じに．</p>
    <p>oLightFall は LightControll と同様．</p>
    <p>oRainbowはexRainbowと似た感じ．</p>
    <p>o から始まるフィルタは時間が掛かる上<br>透明部分は黒くなることに注意．</p>
    <p>逆に背景が色付きの場合は，<br>o のフィルタを使った方が綺麗．</p>
    <p>フィルタを重ねがけするには，</p>
    <p>フィルタ → store → フィルタ と操作．</p>
    <p>重ねる は親ウィンドウから新たに追加．</p>
  </div>
  <div style="clear:both;">
    <hr>
    <p>最終更新：<?php echo date("Y.m.d.H:i:s", filemtime("magicringCV.php")); ?></p>
  </div>
<!--  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0-beta.2/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="http://code.jquery.com/ui/1.11.0-beta.2/jquery-ui.min.js"></script>
-->  <link type="text/css" rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/cupertino/jquery-ui.min.css" />
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>

  <script type="text/javascript" src="../../../sylvester-0-1-3/sylvester.js"></script>
  <script type="text/javascript" src="../../../OpenCVjs-master/javascript/opencv.js"></script>
  <script type="text/javascript" src="../../../OpenCVjs-master/javascript/image_filter.js"></script>
  <script type="text/javascript" src="magicringCV.js?0531_3"></script>
  <script>
 
  </script>
</body>
</html>

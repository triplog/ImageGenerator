//初期動作
var img = new Image();
img.src = "ra-men_temp.jpg";
//読み込み時に呼び出し
if( window.addEventListener ){
  window.addEventListener( 'load', init, false );
}else if( window.attachEvent ){
  window.attachEvent( 'onload', init );
}else{
  window.onload = init;
}
function init(){
  var cvs = document.getElementById('srcImg');
  if(cvs.getContext){
    var context = cvs.getContext('2d');
    //キャンバスを白で塗りつぶす
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0,0,cvs.width,cvs.height);
    //元画像を読み込み
    context.fillStyle = "rgb(0, 0, 0)";
    context.drawImage(img,0,0);
    //サイトURL
    inputText("ラーメン三銃士ジェネレータ http://www55.atpages.jp/triplog/pg/monthly/1405/ra-men34.php",9);
  }
}

//テキスト表示の挙動
/*
 * @author phi_jp
 */
function tategaki(context, text, x, y, num) {
  var lineHeight = context.measureText("あ").width;
  Array.prototype.forEach.call(text,function(ch,i){
    if(ch==='ー'||ch==='－'||ch==='―')
      context.fillText('｜', x-lineHeight*Math.floor(i/num)*1.1, y+lineHeight*(i%num));
    else if(ch==='、'||ch==='，'||ch==='。'||ch==='．'||ch==='.'||ch===',')
      context.fillText(ch, x-lineHeight*(Math.floor(i/num)-0.6)*1.1, y+lineHeight*(i%num-0.6));
    else
      context.fillText(ch, x-lineHeight*Math.floor(i/num)*1.1, y+lineHeight*(i%num));
  });
};
function inputText2(text, x, y, size, font, num, vertical, right){
  //キャンバスの取得
  var canvas = document.getElementById("srcImg");
  var context= canvas.getContext("2d");
  //フォントの指定
  switch(font){
    case 0:
      context.font = size+"px 'Hiragino Kaku Gothic ProN'";
      break;
    case 1:
      context.font = size+"px 'YasashisaAntique'";
      break;
  }
  //縦書の場合
  if(vertical){
    tategaki(context, text, x, y, num);
  }
  //右詰めの場合
  else if(right){
    context.textAlign = "end";
    context.fillText(text, x, y);
    context.textAlign = "start";
  }
  else{
    context.fillText(text, x, y);
  }
}
function inputTest(){
//  inputText2($("#edit>input:eq(2)").val(),197,21,16,1,8,true,false);
  inputText2($("#edit>input:eq(0)").data('xyz'));
  console.log($("#edit>input:eq(0)"));
  console.log($("#edit>input:eq(0)").data('xyz'));
  inputText2("test",568,655,11,0,10,false,true);
}
function inputText(text, id){
  var canvas = document.getElementById("srcImg");
  var context= canvas.getContext("2d");
  if(id<8)
    context.font = "16px 'YasashisaAntique'";
  else
    context.font = "11px 'Hiragino Kaku Gothic ProN'";
  switch(id){
    case 0:
      tategaki(context, text, 197,  21, 8);
      break;
    case 1:
      tategaki(context, text, 197, 196, 5);
      break;
    case 2:
      tategaki(context, text, 547, 371, 6);
      break;
    case 3:
      tategaki(context, text, 412, 371, 5);
      break;
    case 4:
      tategaki(context, text, 357, 371, 5);
      break;
    case 5:
      tategaki(context, text, 222, 371, 7);
      break;
    case 6:
      tategaki(context, text, 167, 371, 7);
      break;
    case 7:
      tategaki(context, text,  27, 371, 4);
      break;
    case 8:
      context.textAlign = "end";
      context.fillText(text, 568, 655);
      context.textAlign = "start";
      break;
    case 9:
      context.fillText(text, 2, 655);
      break;
  }
}
function renewText(){
  init();
  for(var i=0;i<9;i++){
    var text = $('#edit>input:eq('+i+')').val();
    inputText(text,i);
  }
}

//保存の挙動
//ペンギンコラの場合
function saveBlob(blob, name) {  
//     var url = parent.URL || parent.webkitURL,
      var url = window.URL || window.webkitURL,
      url2 = new URL(''),          // Creates a URL pointing to 'https://www.example.com'
    objectUrl = url.createObjectURL(blob),
    e = new Event('click'),
    el = document.createElement('a');
    el.href = objectUrl;
    el.download = name;  
    el.dispatchEvent(e);
};
/**
 * convert data URL to blob.
 * Thanks to http://stackoverflow.com/questions/12168909/blob-from-dataurl
 */
function dataUrlToBlob(dataUrl) {
  var splitted = dataUrl.split(','),
      byteString = atob(splitted[1]),
      mimeString = splitted[0].split(':')[1].split(';')[0],
      ab = new ArrayBuffer(byteString.length),
      ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
//ハンドサインの場合
function chgImg(){
  var cvs = document.getElementById("srcImg");
  document.getElementById("dstImg").src = cvs.toDataURL();
}

//ボタンの挙動
function buttonClear(){
  $('#edit>input:lt(9)').val("");
  renewText();
}
function buttonOriginalize(){
  $('#edit>input:eq(0)').val("ラーメン三銃士を連れてきたよ。");
  $('#edit>input:eq(1)').val("ラーメン　三銃士？");
  $('#edit>input:eq(2)').val("麺の専門家、乃士勇造。");
  $('#edit>input:eq(3)').val("うっす、　よろしく。");
  $('#edit>input:eq(4)').val("スープの　専門家、　出川　実。");
  $('#edit>input:eq(5)').val("がんばります、よろしく。");
  $('#edit>input:eq(6)').val("チャーシュー、メンマなど　　具の専門家、　多木　康。");
  $('#edit>input:eq(7)').val("よっす、どうも。");
  renewText();
}
function buttonSave(){
  if((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
    w = window.open('http://www55.atpages.jp/triplog/ultimateoauth534/UltimateOAuth-master/popup.php','','scrollbars=yes,Width=600,Height=500');
    w.focus();
  }
  else{
    var cvs = document.getElementById('srcImg');
    saveBlob(dataUrlToBlob(cvs.toDataURL()), 'ra-men_collage.png');
  }
}
//自動反映
$(window).keyup(function(){
  renewText();
});


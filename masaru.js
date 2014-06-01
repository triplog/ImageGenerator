//初期動作
var img = new Image();
img.src = "masaru_temp.png?0526";
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
    inputText("マサル図説ジェネレータ",9);
  }
}

//テキスト表示の挙動
/*
 * @author phi_jp
 */
function tategaki(context, text, x, y, num) {
  var lineHeight = context.measureText("あ").width;
  Array.prototype.forEach.call(text,function(ch,i){
    if(ch==='ー'||ch==='－'||ch==='―'||ch==='-')
      context.fillText('｜', x-lineHeight*Math.floor(i/num)*1.1, y+lineHeight*(i%num));
    else if(ch==='、'||ch==='，'||ch==='。'||ch==='．'||ch==='.'||ch===',')
      context.fillText(ch, x-lineHeight*(Math.floor(i/num)-0.6)*1.1, y+lineHeight*(i%num-0.6));
    else
      context.fillText(ch, x-lineHeight*Math.floor(i/num)*1.1, y+lineHeight*(i%num));
  });
};
function yokogaki(context, text, x, y, num){
  var lineHeight = context.measureText("あ").width;
  Array.prototype.forEach.call(text,function(ch,i){
      context.fillText(ch, x+lineHeight*(i%num), y+lineHeight*Math.floor(i/num)*1.1);
  });
}
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
    case 2:
      context.font = size+"px 'Mikachan'";
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
    yokogaki(context, text, x, y, num)
  }
/*  else if(right){
    context.textAlign = "end";
    context.fillText(text, x, y);
    context.textAlign = "start";
  }
  else{
    context.fillText(text, x, y);
  }
  */
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
    context.font = "16px 'Mikachan'";
  else
    context.font = "11px 'Hiragino Kaku Gothic ProN'";
  switch(id){
    case 0:
      inputText2(text, 5, 25, 16, 2, 6, false, false);
      break;
    case 1:
      inputText2(text, 90, 60, 22, 2, 3, false, false);
      break;
    case 2:
      inputText2(text, 185, 80, 3, 2, 4, false, false);
      inputText2(text, 208, 38, 3, 2, 4, false, false);
      inputText2(text, 225, 93, 3, 2, 4, false, false);
      break;
    case 3:
      inputText2(text, 58, 150, 14, 2, 12, true, false);
      break;
    case 4:
      inputText2(text, 145, 170, 16, 2, 5, false, false);
      break;
    case 5:
      inputText2(text, 225, 130, 14, 2, 5, false, false);
      break;
    case 6:
      inputText2(text, 205, 240, 14, 2, 5, false, false);
      break;
    case 7:
      inputText2(text, 80, 280, 22, 2, 9, false, false);
      break;
    case 8:
      context.textAlign = "end";
      context.fillText(text, 298, 318);
      context.textAlign = "start";
      break;
    case 9:
      context.fillText(text, 2, 318);
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
  $('#edit>input:eq(0)').val("セクシー　　コマンドー");
  $('#edit>input:eq(1)').val("省　　　略");
  $('#edit>input:eq(2)').val("けじめ");
  $('#edit>input:eq(3)').val("高校生になっても    ３－Ｂの事忘れ     ないでね！という気持ち");
  $('#edit>input:eq(4)').val("ヒ　ゲ");
  $('#edit>input:eq(5)').val("　　　　　　　　　　学ラン");
  $('#edit>input:eq(6)').val("セクシーさ");
  $('#edit>input:eq(7)').val("３年間の思い出");
  renewText();
}
function buttonSave(){
  var cvs = document.getElementById('srcImg');
  console.log(cvs.toDataURL());
  saveBlob(dataUrlToBlob(cvs.toDataURL()), 'masaru_collage.png');
}
//自動反映
$(window).keyup(function(){
  renewText();
});


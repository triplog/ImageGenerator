//グローバル変数
radius = [220,180,140,220,180,140,100];
stroke = [1,1,1,1];
//読み込み時に呼び出し
/*if( window.addEventListener ){
  window.addEventListener( 'load', init, false );
}else if( window.attachEvent ){
  window.attachEvent( 'onload', init );
}else{
  window.onload = init;
}*/
if( window.addEventListener ){
  window.addEventListener( 'load', renewText(false), false );
}else if( window.attachEvent ){
  window.attachEvent( 'onload', renewText(false) );
}else{
  window.onload = renewText(false);
}
function init(){
  var cvs = document.getElementById('srcImg');
  if(cvs.getContext){
    var context = cvs.getContext('2d');
    //キャンバスを初期化
    context.setTransform(1,0,0,1,240,240);
    context.clearRect(-240,-240,500,500);
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
function marugaki90(context, text,r){
  context.rotate(5/2/180*Math.PI);
  for(var i=0;i<text.length;i++){
    context.fillText(text[i], 0, -r);
    if(i!==text.length-1)
      context.rotate(16/(text.length-1)*5/180*Math.PI);
    else if(text.length===1)
      context.rotate(80/180*Math.PI);
  }
  context.rotate(5/2/180*Math.PI);
  context.rotate(5/180*Math.PI);
}
function marugaki72(context, text,r){
  context.rotate(4/180*Math.PI);
  for(var i=0;i<text.length;i++){
    context.fillText(text[i], 0, -r);
    if(i!==text.length-1)
      context.rotate(12/(text.length-1)*5/180*Math.PI);
  }
  context.rotate(2/180*Math.PI);
  context.rotate(6/180*Math.PI);
}
function marugaki60(context, text,r){
  context.rotate(5/180*Math.PI);
  for(var i=0;i<text.length;i++){
    context.fillText(text[i], 0, -r);
    if(i!==text.length-1)
      context.rotate(10/(text.length-1)*5/180*Math.PI);
  }
  context.rotate(5/180*Math.PI);
}
function marugaki45(context, text,r){
  context.rotate(4.5/2/180*Math.PI);
  for(var i=0;i<text.length;i++){
    context.fillText(text[i], 0, -r);
    if(i!==text.length-1)
      context.rotate(8/(text.length-1)*4.5/180*Math.PI);
    else if(text.length===1)
      context.rotate(36/180*Math.PI);
  }
  context.rotate(4.5/2/180*Math.PI);
  context.rotate(4.5/180*Math.PI);
}

function marugakiTest(text, i){
  var canvas  = document.getElementById("srcImg");
  var context = canvas.getContext("2d");
  context.setTransform(1,0,0,1,240,240);
  context.rotate(-45/180*Math.PI);
  //半径の設定
  var r = radius[i];
  context.font = ((radius[i]-40)/10)+"px 'MagicRing'";
  context.fillStyle = $("#color"+i).css("color");
  if(text.length>64){
    var text1 = text.substr( 0,16);
    var text2 = text.substr(16,16);
    var text3 = text.substr(32,16);
    var text4 = text.substr(48,16);

    for(var j=0;j<4;j++){
      if(j===0) marugaki90(context,text1,r);
      else if(j===1)marugaki90(context,text2,r);
      else if(j===2)marugaki90(context,text3,r);
      else marugaki90(context,text4,r);
    }
  }
  else if(text.length>32){
    var text1 = text.substr(              0,text.length/4);
    var text2 = text.substr(text.length/4  ,text.length/4);
    var text3 = text.substr(text.length/4*2,text.length/4);
    var text4 = text.substr(text.length/4*3,text.length  );

    for(var j=0;j<4;j++){
      if(j===0) marugaki90(context,text1,r);
      else if(j===1)marugaki90(context,text2,r);
      else if(j===2)marugaki90(context,text3,r);
      else marugaki90(context,text4,r);
    }
  }
  else if(text.length>16){
    var text1 = text.substr(            0,text.length/2);
    var text2 = text.substr(text.length/2,text.length  );

    for(var j=0;j<4;j++){
      if(j%2===0) marugaki90(context,text1,r);
      else marugaki90(context,text2,r);
    }
  }/*else if(num===0){
    for(var j=0;j<4;j++){
      marugaki90(context,text,r);
    }
  }*/
  else if(text.length>12){
    for(var j=0;j<4;j++){
      marugaki90(context,text,r);
    }
  }else if(text.length>10){
    context.rotate(45/180*Math.PI);
    for(var j=0;j<5;j++){
      marugaki72(context,text,r);
    }
  }
  else if(text.length>8){
    context.rotate(12.5/180*Math.PI);
    for(var j=0;j<6;j++){
      marugaki60(context,text,r);
    }
  }
  else{
    for(var j=0;j<8;j++){
      marugaki45(context,text,r);
    }
  }
  context.setTransform(1,0,0,1,240,240);
}
function inputText(text, x, y, size, font, num, vertical, right){
  //キャンバスの取得
  var canvas = document.getElementById("srcImg");
  var context= canvas.getContext("2d");
  context.setTransform(1,0,0,1,0,0);
  //フォントの指定
  context.fillStyle = "rgb(255, 255, 255)";
  switch(font){
    case 1:  context.font = size+"px 'YasashisaAntique'"; break;
    case 2:  context.font = size+"px 'Mikachan'"; break;
    case 3:  context.font = size+"px 'MagicRing'"; break;
    default: context.font = size+"px 'Hiragino Kaku Gothic ProN'"; break;
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
  else if(num>0){
    yokogaki(context, text, x, y, num)
  }
  else{
    context.fillText(text, x, y);
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
function inputFigure(id){
  //canvas の準備
  var canvas  = document.getElementById("srcImg");
  var context = canvas.getContext("2d");
  context.setTransform(1,0,0,1,240,240);
  var r = radius[id]+(radius[id]-40)/10;
  context.strokeStyle = $("#color"+id).css("color");
  context.lineWidth = 2;  

  if(stroke[id-3]>0){
    if(stroke[id-3]===1||stroke[id-3]===3){
      if ( context.setLineDash !== undefined )   context.setLineDash([5,0]);
      if ( context.mozDash !== undefined )       context.mozDash = [5,0];
    }
    else if(stroke[id-3]===2||stroke[id-3]===4){
      if ( context.setLineDash !== undefined )   context.setLineDash([5,10]);
      if ( context.mozDash !== undefined )       context.mozDash = [5,10];
    }

  //新しいパスを開始する
  context.beginPath();
  switch(id){
    case 3: case 4: case 5:
      context.arc(0,0,r,0,360/180*Math.PI,true);
      if(stroke[id-3]>=3){
        context.stroke();
        context.beginPath();
        context.arc(0,0,r+5,0,360/180*Math.PI,true);
      }
      break;
    default:
        var N = parseInt($("#numN").val());
        var M = parseInt($("#numM").val());
        if(!isNaN(N)&&!isNaN(M)){
          inputStar(N,M,r);
          if(stroke[id-3]>=3){
            inputStar(N,M,r+10);
          }
        }
      break;
  }
  //現在のパスを輪郭表示する
  context.stroke();
  }
}
function inputStar(n,m,r){
  var canvas  = document.getElementById("srcImg");
  var context = canvas.getContext("2d");
  context.setTransform(1,0,0,1,240,240);
/*  var r = radius[6]+(radius[6]-40)/10;
  context.strokeStyle = $("#color7").css("color");
  context.lineWidth = 2;  
*///  if ( context.setLineDash !== undefined )   context.setLineDash([5,10]);
//  if ( context.mozDash !== undefined )       context.mozDash = [5,10];

  context.beginPath();
  context.moveTo(0,-r);
  for(var i=1;i<=n;i++){
    context.rotate(360/n/180*Math.PI*m);
    context.lineTo(0,-r);
    if(n%m===0&&i%(n/m)===0){
      context.closePath();
      context.stroke();
      context.rotate(360/n/180*Math.PI);
      context.moveTo(0,-r);
    }
  }
  context.closePath();
  context.stroke();
}
//内容のリフレッシュ
function renewText(bg){
  init();
  if(bg){
    var canvas = document.getElementById('srcImg');
    var context = canvas.getContext('2d');
      context.setTransform(1,0,0,1,0,0);
    switch($('#srcImg').css("background-color")){
      case "rgb(136, 136, 136)":
        context.clearRect(0,0,480,500); break;
      case "rgb(0, 0, 0)"      :
        context.fillStyle="rgb(0,0,0)";
        context.fillRect(0,0,480,500);
        break;
      case "rgb(255, 255, 255)":
        context.fillStyle="rgb(255,255,255)";
        context.fillRect(0,0,480,500);
        break;
  }}
  for(var i=6;i>=0;i--){
    if(i>2){
      inputFigure(i);
    }
    else{
      var text = $('#edit>input:eq('+i+')').val();
      marugakiTest(text,i);
    }
  }
  if($('#edit>input:last').val().length>0){
    inputText($('#edit>input:last').val(),478,498,11,0,0,false,true);
    inputText("魔法陣ジェネレータ http://www55.atpages.jp/triplog/pg/monthly/1405/magicring.php",2,498,11,0,0,false,false);
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
  radius[0]=220; radius[1]=180; radius[2]=140;
  renewText(false);
}
function buttonOriginalize(){
  $('#edit>input:eq(0)').val("outer circle");
  $('#edit>input:eq(1)').val("middle circle");
  $('#edit>input:eq(2)').val("inner circle");
  $('#color0').css('color','#00FFFF');
  $('#color1').css('color','#FF00FF');
  $('#color2').css('color','#FFFF00');
  $('#color3').css('color','#FF0000');
  $('#color4').css('color','#00FF00');
  $('#color5').css('color','#0000FF');
  $('#color6').css('color','#FFFFFF');
/*  radius[0]=220; radius[1]=180; radius[2]=140;
  radius[3]=220; radius[4]=180; radius[5]=140, radius[6]=100;
 */
  $("#numN").val(5);
  $("#numM").val(2);
  radius = [220,180,140,220,180,140,100];
  stroke = [1,1,1,1];
  renewText(false);
}
function buttonSave(){
  //保存前にリフレッシュ＋背景色書き込み
  renewText(true);
  var canvas = document.getElementById('srcImg');
  saveBlob(dataUrlToBlob(canvas.toDataURL()), 'magicring.png');
  renewText(false);
}
function buttonTweet(){
  //保存前にリフレッシュ＋背景色書き込み
  renewText(true);
  var canvas = document.getElementById('srcImg');
  w = window.open('http://www55.atpages.jp/triplog/ultimateoauth534/UltimateOAuth-master/prepare.php','','scrollbars=yes,Width=600,Height=500');
  w.focus();
}
function buttonNext(){
  renewText(true);
  window.open('magicringCV.php', "blank");
}
//自動反映
var numFocus=[false,false];
$("#numN").focus(function(){ numFocus[0]=true;}).blur(function(){ numFocus[0]=false;})
$("#numM").focus(function(){ numFocus[1]=true;}).blur(function(){ numFocus[1]=false;})
$(window).keyup(function(evt){
  if($("#edit>input:eq(0)").val().length>64)$("#edit>input:eq(0)").css('background-color','red');
  else $("#edit>input:eq(0)").css('background-color','white');
  if($("#edit>input:eq(1)").val().length>64)$("#edit>input:eq(1)").css('background-color','red');
  else $("#edit>input:eq(1)").css('background-color','white');
  if($("#edit>input:eq(2)").val().length>64)$("#edit>input:eq(2)").css('background-color','red');
  else $("#edit>input:eq(2)").css('background-color','white');

  if(numFocus[0]){
    if(evt) var kc = evt.keyCode;
    else    var kc = event.keyCode;
    var chr = String.fromCharCode(kc);
    if(chr==="&"){
      $("#numN").val(parseInt($("#numN").val())+1);
    }
    else if(chr==="("){
      $("#numN").val((parseInt($("#numN").val())-1>0)?(parseInt($("#numN").val())-1):0);
    }
  }
  else if(numFocus[1]){
    if(evt) var kc = evt.keyCode;
    else    var kc = event.keyCode;
    var chr = String.fromCharCode(kc);
    if(chr==="&"){
      $("#numM").val(parseInt($("#numM").val())+1);
    }
    else if(chr==="("){
      $("#numM").val((parseInt($("#numM").val())-1>0)?(parseInt($("#numM").val())-1):0);
    }
  }
  renewText(false);
});
$("#srcImg").click(function(){
  switch($('#srcImg').css("background-color")){
    case "rgb(136, 136, 136)":$('#srcImg').css("background-color","#000000").css("background-image","none");break;
    case "rgb(0, 0, 0)"      :$('#srcImg').css("background-color","#FFFFFF");break;
    case "rgb(255, 255, 255)":$('#srcImg').css("background-color","#888888").css("background-image","url('clear.png')");break;
  }
  renewText(false);
});
$("#edit span:contains('■')").click(function(){
  switch($(this).css('color')){
    case "rgb(255, 255, 255)":$(this).css('color','#00FFFF');break;
    case "rgb(0, 255, 255)"  :$(this).css('color','#FF00FF');break;
    case "rgb(255, 0, 255)"  :$(this).css('color','#FFFF00');break;
    case "rgb(255, 255, 0)"  :$(this).css('color','#FF0000');break;
    case "rgb(255, 0, 0)"    :$(this).css('color','#00FF00');break;
    case "rgb(0, 255, 0)"    :$(this).css('color','#0000FF');break;
    case "rgb(0, 0, 255)"    :$(this).css('color','#000000');break;
    case "rgb(0, 0, 0)"      :$(this).css('color','#FFFFFF');break;
  }
  renewText(false);
});
$("#edit .plus").click(function(){
  var num = $(this).attr("name");
  var index = parseInt(num,10);
  radius[index]+=10;
  renewText(false);
});
$("#edit .minus").click(function(){
  var num = $(this).attr("name");
  var index = parseInt(num,10);
  radius[index] = (radius[index]>50)?radius[index]-10:50;
  renewText(false);
});
$("#edit .stroke").click(function(){
  var num = $(this).attr("name");
  var index = parseInt(num,10)-1;
  stroke[index]=(stroke[index]+1)%5;
  renewText(false);
});

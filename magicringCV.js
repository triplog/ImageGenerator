var iplImage = new IplImage();
var dataurl;
var text;

(getDataUrl = function(){
  if(!window.opener||window.opener.closed){
    window.alert('no parent window');
    return 'no parent window';
  }else{
    var srcImage = window.opener.document.getElementById("srcImg");
    dataurl = srcImage.toDataURL();
    document.getElementById("srcImage").src = dataurl;
    //canvas→iplImage
    iplImage = cvGetIplImageAtImg("srcImage");
    //背景が透明でない場合は反映
    if(srcImage.style.backgroundColor==="rgb(255, 255, 255)"||srcImage.style.backgroundColor==="rgb(0, 0, 0)"){
      var bg = cvCreateImage(srcImage.width, srcImage.height);
      var bw = (srcImage.style.backgroundColor==="rgb(0, 0, 0)")?0:255;
      for(var i=0;i<srcImage.width*srcImage.height*CHANNELS;i+=CHANNELS){
        bg.RGBA[i]=bw; bg.RGBA[i+1]=bw; bg.RGBA[i+2]=bw; bg.RGBA[i+3]=255;
      }
      cvShowImage('srcImage', bg);
      cvMixIplImages(bg, iplImage, iplImage, 1.0);
    }
    Original("srcImage", iplImage);
  }
})();
function buttonReload(){
  getDataUrl();
  Original("srcImage", iplImage);
  $("#container").css("background-color","#888888").css("background-image","url('clear.png')");
  $("#message").text("reload完了");
}
function buttonStore(){
  iplImage = cvGetIplImageAtImg("srcImage");
  cvShowImage("srcImage", iplImage);
  $("#message").text("store完了");
}
function buttonRestore(){
	var newIplImage = cvCloneImage(iplImage);
	cvShowImage("srcImage", newIplImage);
  $("#message").text("restore完了");
}
function buttonOpenCVjs(func,name){
  func.apply(window, ["srcImage",iplImage]);
  $("#message").text(name+"完了");
}
function buttonMarker(){
  if($("#container>.marker").css("visibility")==="hidden"){
    $("#message").text("マーカーOff");
    $("#container>.marker").css("visibility","visible");
  }
  else{
    $("#message").text("マーカーOn");
    $("#container>.marker").css("visibility","hidden");
  }
}
function buttonMarkerReset(){
  var img = $('#srcImage');
  var imgx = img.position().left;
  var imgy = img.position().top;
  var imgwidth = img.width();
  var imgheight = img.height();
  $("#marker1").style.position(imgx,imgy);
  $("#marker2").style.position(imgx,imgy);
  $("#marker3").style.position(imgx,imgy);
  $("#marker4").style.position(imgx,imgy);
//  $("#marker2").x(imgx + imgwidth).y(imgy);
//  $("#marker3").x(imgx + imgwidth).y(imgy + imgheight);
//  $("#marker4").x(imgx).y(imgy + imgheight);
console.log($("#marker2"));
 }
function buttonSave(){
  iplImage = cvGetIplImageAtImg("srcImage");
  cvShowImageToCanvas("srcImg", iplImage)  //保存前にリフレッシュ＋背景色書き込み
  var canvas = document.getElementById("srcImg");
  saveBlob(dataUrlToBlob(canvas.toDataURL()), 'magicring.png');
}
function buttonTweet(){
  iplImage = cvGetIplImageAtImg("srcImage");
  cvShowImageToCanvas("srcImg", iplImage)  //保存前にリフレッシュ＋背景色書き込み
  w = window.open('http://www55.atpages.jp/triplog/ultimateoauth534/UltimateOAuth-master/prepare.php','','scrollbars=yes,Width=600,Height=500');
  w.focus();
}
function iplToCanvas(canvasId, iplImage){
  
}
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

//フィルタ OpenCVjs extends
function cvChaos(imgId, srcImage){
//画像サイズを指定して画像領域を確保
	var dstImage = cvCreateImage(srcImage.width, srcImage.height);
  console.log([srcImage.RGBA[0],srcImage.RGBA[1],srcImage.RGBA[2],srcImage.RGBA[3]]);
	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var R = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+0]; 
      var G = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+1]; 
      var B = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+2]; 
      var A = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+3]; 
      var r,g,b;
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //alpha
      //透明は透明
      if(A===0){
        r=0; g=0; b=0;
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //alpha
      }
      else if( R===0 && G===0 && B===0 ){
        r=0; g=0; b=0;
      }
      else if( R===255 && G===255 && B===255 ){
        r=255; g=255; b=255;
      }
      else{
        r=g=b=0;
        while(R+G+B!==r+g+b){
          r = (R+G+B>255)?Math.floor(Math.random()*256):Math.floor(Math.random()*(R+G+B+1));
          g = (R+G+B-r>255)?Math.floor(Math.random()*256):Math.floor(Math.random()*(R+G+B-r+1));
          b = R+G+B-r-g;
        }
      }
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = r; //R
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = g; //G
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = b; //B
    }
  }
    
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
}
function cvChaos2(imgId, srcImage){
//画像サイズを指定して画像領域を確保
	var dstImage = cvCreateImage(srcImage.width, srcImage.height);
	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var R = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+0]; 
      var G = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+1]; 
      var B = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+2]; 
      var A = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+3]; 
      var r,g,b;
      var key = ((R===0)?0:1)+((G===0)?0:1)*2+(B===0?0:1)*4;
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //alpha
      //透明は透明
      if(A===0){
        r=0; g=0; b=0;
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //alpha
      }
      else 
      switch(key){
        case 0: r=g=b=0;break;
        case 7: var rate=Math.floor(Math.random()*256)/255;r=R*rate;g=G*rate;b=B*rate;break;
        case 1: r=255;g=Math.floor(Math.random()*256);b=Math.floor(Math.random()*256);break;
        case 2: g=255;b=Math.floor(Math.random()*256);r=Math.floor(Math.random()*256);break;
        case 4: b=255;r=Math.floor(Math.random()*256);g=Math.floor(Math.random()*256);break;
        case 3: b=0;r=Math.floor(Math.random()*256);g=Math.floor(Math.random()*256);break;
        case 5: g=0;b=Math.floor(Math.random()*256);r=Math.floor(Math.random()*256);break;
        case 6: r=0;g=Math.floor(Math.random()*256);b=Math.floor(Math.random()*256);break;
      }
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = r; //R
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = g; //G
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = b; //B
    }
  }
    
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
}
function cvChaos3(imgId, srcImage){
//画像サイズを指定して画像領域を確保
	var dstImage = cvCreateImage(srcImage.width, srcImage.height);
  var newIplImage = cvCloneImage(srcImage);
  cvCvtColor(newIplImage,newIplImage,CV_CODE.RGB2HSV);
	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var R = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+0]; 
      var G = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+1]; 
      var B = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+2]; 
      var A = srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+3]; 
      dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //alpha
      //透明は透明
      if(A===0){
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = 0;//H
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = 0;//S
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = 0;//V
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+3] = 0; //alpha
      }
      else {
        if(R===255&&G===255&&B===255){
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = Math.floor(Math.random()*256);//H
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = Math.floor(Math.random()*128);//S
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = 128+Math.floor(Math.random()*128);//V
        }
        else if(R===0&&G===0&&B===0){
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = Math.floor(Math.random()*256);//H
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = Math.floor(Math.random()*128);//S
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = 128-Math.floor(Math.random()*128);//V
        }
        else{
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = newIplImage.RGBA[(j+i*dstImage.width)*CHANNELS+0];//H
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = Math.floor(Math.random()*128)+128;//S
          dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = Math.floor(Math.random()*128)+128;//V
        }
      }
    }
  }
  cvCvtColor(dstImage,dstImage,CV_CODE.HSV2RGB);  
//  cvCvtColor(newIplImage,newIplImage,CV_CODE.HSV2RGB);  
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
//  cvShowImage(imgId, newIplImage);
}
function cvExpand(imgId, srcImage, mode){
//画像サイズを指定して画像領域を確保
	var dstImage = cvCreateImage(srcImage.width, srcImage.height);
  var max = Math.sqrt(dstImage.width*dstImage.width + dstImage.height*dstImage.height/4);

	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var alpha = getAlphas(srcImage,i,j,3); 
      if(alpha[4]===0&&alpha[8]!==0||alpha[7]!==0||alpha[6]!==0||alpha[5]!==0||alpha[3]!==0||alpha[2]!==0||alpha[1]!==0||alpha[0]!==0){
      var v = Math.sqrt((j-dstImage.width/2)*(j-dstImage.width/2)*4 + (i-dstImage.height/2)*(i-dstImage.height/2)*4);
        switch(mode){
          case 'Color' :
            var red = getAlphas(srcImage,i,j,0);
            var green = getAlphas(srcImage,i,j,1);
            var blue = getAlphas(srcImage,i,j,2);
            var num=0;
            var r=0,g=0,b=0;
            for(var k=0;k<8;k++){
              if(alpha[k]!==0){
                r += red[k];
                g += green[k];
                b += blue[k];
                num++;
              }
            }
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = r/num; //R
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = g/num; //G
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = b/num; //B
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+3] = 255; //A
            break;
          case 'Rainbow':
            var x = j-srcImage.width/2;
            var y = i-srcImage.height/2;
            var r = Math.sqrt(x*x+y*y);
            var R = Math.sqrt((srcImage.width*srcImage.width)+(srcImage.height*srcImage.height))/4;
      //      var theta = Math.atan(y/x)/(Math.PI/180);
            var theta = Math.atan2(y,x)/(Math.PI/180);
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = 255*(theta+180)/360;//H
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = 128*r/R;//S
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = 255;//V
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+3] = 255;//V
            break;
          case 'Mono' :
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 255*(1-v/max); //R
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 255*(1-v/max); //G
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 255*(1-v/max); //B
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
            break;
          default :
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
            break;
        }
      }
      else{
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //A
      }
    }
  }
  if(mode==='Rainbow')
  cvCvtColor(dstImage,dstImage,CV_CODE.HSV2RGB); 
  var newIplImage = cvCloneImage(srcImage);
  cvMixIplImages(dstImage, newIplImage, dstImage, 0.5);
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
  $("#message").text("ex"+mode+"完了");
}
function cvSharpEdge(imgId, srcImage, mode){
//画像サイズを指定して画像領域を確保
  var dstImage = cvCreateImage(srcImage.width, srcImage.height);
  var max = dstImage.width*dstImage.width + dstImage.height*dstImage.height;
  var na=0;
	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var alpha = getAlphas(srcImage,i,j,3); 
      if(alpha[4]===0&&((alpha[0]===0&&alpha[8]!==0)||(alpha[1]===0&&alpha[7]!==0)||(alpha[2]===0&&alpha[6]!==0)||(alpha[3]===0&&alpha[5]!==0)
                      ||(alpha[5]===0&&alpha[3]!==0)||(alpha[6]===0&&alpha[2]!==0)||(alpha[7]===0&&alpha[1]!==0)||(alpha[8]===0&&alpha[0]!==0))){
//      if(alpha[4]===0&&alpha[8]!==0||alpha[7]!==0||alpha[6]!==0||alpha[5]!==0||alpha[3]!==0||alpha[2]!==0||alpha[1]!==0||alpha[0]!==0){
        var v = j*j + i*i;
        switch(mode){
          case 'Color' :
            var red = getAlphas(srcImage,i,j,0);
            var green = getAlphas(srcImage,i,j,1);
            var blue = getAlphas(srcImage,i,j,2);
            var num=0;
            var r=0,g=0,b=0;
            for(var k=0;k<8;k++){
              if(alpha[k]!==0){
                r += red[k];
                g += green[k];
                b += blue[k];
                num++;
              }
            }
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = r/num; //R
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = g/num; //G
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = b/num; //B
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
            break;
          case 'Rainbow2' :
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 255*v/max; //H
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 255; //S
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 255; //V
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
            break;
          case 'Rainbow':
            var x = j-srcImage.width/2;
            var y = i-srcImage.height/2;
            var r = Math.sqrt(x*x+y*y);
            var R = Math.sqrt((srcImage.width*srcImage.width)+(srcImage.height*srcImage.height))/4;
            var theta = Math.atan2(y,x)/(Math.PI/180);
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = 255*(theta+180)/360;//H
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = 128*r/R;//S
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = 255;//V
            dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+3] = 255;//A
            break;
          case 'Mono' :
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 255*v/max; //H
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 255*v/max; //S
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 255*v/max; //V
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
            break;
          default :
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
            dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
        }
      }
      else{
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //A
      }
    }
  }
  if(mode==='Rainbow'||mode==='Rainbow2')cvCvtColor(dstImage, dstImage, CV_CODE.HSV2RGB);

//  var newIplImage = cvCloneImage(srcImage);
//  cvMixIplImages(dstImage, newIplImage, dstImage, 0.5);
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
  $("#message").text("line"+mode+"完了");
}
function cvLightControll(imgId, srcImage){
  var dstImage = cvCreateImage(srcImage.width, srcImage.height);
  var max = dstImage.width*dstImage.width + dstImage.height*dstImage.height/4;

	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var v = (j-dstImage.width/2)*(j-dstImage.width/2)*4 + (i-dstImage.height/2)*(i-dstImage.height/2)*4;
/*        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255*v/max; //A
*/
      if(srcImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3]!==0){
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 255-255*v/max; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 255-255*v/max; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 255-255*v/max; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 255; //A
      }
      else{
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //A
      }
    }
  }
  var newIplImage = cvCloneImage(srcImage);
  cvCvtColor(dstImage, dstImage, CV_CODE.RGB2HSV);
  cvCvtColor(newIplImage, newIplImage, CV_CODE.RGB2HSV);
  
  cvMixIplImagesHSV(newIplImage, dstImage, dstImage, 0.2);
  cvCvtColor(dstImage, dstImage, CV_CODE.HSV2RGB);
//  cvCvtColor(dstImage, dstImage, CV_CODE.RGB2HSV);
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
//  cvShowImage(imgId, newIplImage);
}
function cvGaussianSmooth(imgId, srcImage){
//画像サイズを指定して画像領域を確保
	var dstImage = cvCreateImage(srcImage.width, srcImage.height);

	for(var i = 0 ; i < srcImage.height ; i++){
		for(var j = 0 ; j < srcImage.width ; j++){
      var alpha = getAlphas(srcImage,i,j,3); 
      if(alpha[4]!==0
//      ||(alpha[4]===0&&alpha[8]!==0||alpha[7]!==0||alpha[6]!==0||alpha[5]!==0||alpha[3]!==0||alpha[2]!==0||alpha[1]!==0||alpha[0]!==0)
      ){
        var red = getAlphas(srcImage,i,j,0);
        var green = getAlphas(srcImage,i,j,1);
        var blue = getAlphas(srcImage,i,j,2);
        var num=0;
        var r=0,g=0,b=0;
        for(var k=0;k<8;k++){
          if(alpha[k]!==0){
            if(k===4){
              r += red[k]*4;
              g += green[k]*4;
              b += blue[k]*4;
              num+=4;
            }
            else if(k%2===1){
              r += red[k]*2;
              g += green[k]*2;
              b += blue[k]*2;
              num+=2;
            }
            else{
              r += red[k];
              g += green[k];
              b += blue[k];
              num++;
            }
          }
        }
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+0] = r/num; //R
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+1] = g/num; //G
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+2] = b/num; //B
        dstImage.RGBA[(j+i*dstImage.width)*CHANNELS+3] = 255; //A
      }
      else{
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 0] = 0; //R
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 1] = 0; //G
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 2] = 0; //B
        dstImage.RGBA[(j + i * dstImage.width) * CHANNELS + 3] = 0; //A
      }
    }
  }
  var newIplImage = cvCloneImage(srcImage);
//  cvMixIplImages(dstImage, newIplImage, dstImage, 0.5);
  //imgIdで指定したimgタグに画像を転送
  cvShowImage(imgId, dstImage);
//  cvShowImage(imgId, newIplImage);
}
function cvSuperimpose(){
  if(!window.opener||window.opener.closed){
    window.alert('no parent window');
    return 'no parent window';
  }
  else{
    var tempImg = window.opener.document.getElementById("srcImg");
    document.getElementById("tempImage").src = tempImg.toDataURL();
    //canvas→iplImage
    var newIplImage = cvGetIplImageAtImg("tempImage");
    //背景が透明でない場合は反映
    if(tempImg.style.backgroundColor==="rgb(255, 255, 255)"||tempImg.style.backgroundColor==="rgb(0, 0, 0)"){
      var bg = cvCreateImage(tempImg.width, tempImg.height);
      var bw = (tempImg.style.backgroundColor==="rgb(0, 0, 0)")?0:255;
      for(var i=0;i<tempImg.width*tempImg.height*CHANNELS;i+=CHANNELS){
        bg.RGBA[i]=bw; bg.RGBA[i+1]=bw; bg.RGBA[i+2]=bw; bg.RGBA[i+3]=255;
      }
      cvMixIplImages(bg, newIplImage, newIplImage, 1.0);
    }
    cvMixIplImages(newIplImage, iplImage, newIplImage, 0.5);
    cvShowImage("srcImage", newIplImage);
    document.getElementById("tempImage").src = "";
  }
}
function getAlphas(srcImage,i,j,c){
  var l = (j===0)? j : j-1;
  var r = (j===srcImage.width)? j : j+1;
  var t = (i===0)? i : i-1;
  var b = (i===srcImage.height)? i : i+1;
  var alpha = [srcImage.RGBA[(l+t*srcImage.width)*CHANNELS+c],srcImage.RGBA[(j+t*srcImage.width)*CHANNELS+c],srcImage.RGBA[(r+t*srcImage.width)*CHANNELS+c],
               srcImage.RGBA[(l+i*srcImage.width)*CHANNELS+c],srcImage.RGBA[(j+i*srcImage.width)*CHANNELS+c],srcImage.RGBA[(r+i*srcImage.width)*CHANNELS+c],
               srcImage.RGBA[(l+b*srcImage.width)*CHANNELS+c],srcImage.RGBA[(j+b*srcImage.width)*CHANNELS+c],srcImage.RGBA[(r+b*srcImage.width)*CHANNELS+c]];
  return alpha;
}
function cvMixIplImages(bg, fg, dst, rate){
  for(var i = 0 ; i < dst.height ; i++){
		for(var j = 0 ; j < dst.width ; j++){
      if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]===0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]===0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = 0; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = 0; //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = 0; //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 0; //A
      }
      else if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]!==0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]===0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = bg.RGBA[(j+i*dst.width)*CHANNELS+0]; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = bg.RGBA[(j+i*dst.width)*CHANNELS+1]; //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = bg.RGBA[(j+i*dst.width)*CHANNELS+2]; //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
      else if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]===0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]!==0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = fg.RGBA[(j+i*dst.width)*CHANNELS+0]; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = fg.RGBA[(j+i*dst.width)*CHANNELS+1]; //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = fg.RGBA[(j+i*dst.width)*CHANNELS+2]; //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
      else{
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = fg.RGBA[(j+i*dst.width)*CHANNELS+0]*rate + bg.RGBA[(j+i*dst.width)*CHANNELS+0]*(1-rate); //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = fg.RGBA[(j+i*dst.width)*CHANNELS+1]*rate + bg.RGBA[(j+i*dst.width)*CHANNELS+1]*(1-rate); //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = fg.RGBA[(j+i*dst.width)*CHANNELS+2]*rate + bg.RGBA[(j+i*dst.width)*CHANNELS+2]*(1-rate); //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
    }
  }
}
function cvMixIplImagesHSV(bg, fg, dst, rate){
  for(var i = 0 ; i < dst.height ; i++){
		for(var j = 0 ; j < dst.width ; j++){
      if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]===0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]===0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = 0; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = 0; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = 0; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 0; //R
      }
      else if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]!==0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]===0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = bg.RGBA[(j+i*dst.width)*CHANNELS+0]; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = bg.RGBA[(j+i*dst.width)*CHANNELS+1]; //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = bg.RGBA[(j+i*dst.width)*CHANNELS+2]; //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
      else if(bg.RGBA[(j+i*dst.width)*CHANNELS+3]===0&&fg.RGBA[(j+i*dst.width)*CHANNELS+3]!==0){
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = fg.RGBA[(j+i*dst.width)*CHANNELS+0]; //R
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = fg.RGBA[(j+i*dst.width)*CHANNELS+1]; //G
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = fg.RGBA[(j+i*dst.width)*CHANNELS+2]; //B
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
      else{
        dst.RGBA[(j+i*dst.width)*CHANNELS+0] = bg.RGBA[(j+i*dst.width)*CHANNELS+0]; //H
        dst.RGBA[(j+i*dst.width)*CHANNELS+1] = fg.RGBA[(j+i*dst.width)*CHANNELS+1]*rate + bg.RGBA[(j+i*dst.width)*CHANNELS+1]*(1-rate); //S
        dst.RGBA[(j+i*dst.width)*CHANNELS+2] = fg.RGBA[(j+i*dst.width)*CHANNELS+2]*rate + bg.RGBA[(j+i*dst.width)*CHANNELS+2]*(1-rate); //V
        dst.RGBA[(j+i*dst.width)*CHANNELS+3] = 255; //A
      }
    }
  }
}
/*
function cvRainbow(imgId, iplImage){
	try{
		var layer1 = cvCreateImage(iplImage.width, iplImage.height);
		
		var max = layer1.width*layer1.width + layer1.height*layer1.height;
		
		for(i = 0 ; i < layer1.height ; i++){
			for(j = 0 ; j < layer1.width ; j++){
				var v = j*j + i*i;
				layer1.RGBA[(j + i * layer1.width) * CHANNELS] = 255*v/max;
				layer1.RGBA[1 + (j + i * layer1.width) * CHANNELS] = 255;
				layer1.RGBA[2 + (j + i * layer1.width) * CHANNELS] = 255;
        if(iplImage.RGBA[(j+i*layer1.width)*CHANNELS+3]===255)
          layer1.RGBA[3 + (j + i * layer1.width) * CHANNELS] = 255;
        else
          layer1.RGBA[3 + (j + i * layer1.width) * CHANNELS] = 0;
			}
		}
	
		cvCvtColor(layer1, layer1, CV_CODE.HSV2RGB);
		
		var newIplImage = cvCloneImage(iplImage);
		var bg = cvCloneImage(iplImage);
		
		cvSmooth(bg, bg, CV_SMOOTH_TYPE.GAUSSIAN, 7);
		cvBlendImageCl(bg, newIplImage, newIplImage, CV_BLEND_MODE.SCREEN);
			
		cvBlendImageCl(newIplImage, layer1, newIplImage, CV_BLEND_MODE.SOFT_LIGHT);
	
		cvShowImage(imgId, newIplImage);
//		cvShowImage(imgId, layer1);
	}
	catch(ex){
		alert("Rainbow : " + ex);
	}
}
*/
/*function cvBlendImageCl(bg, fg, dst, blend_mode){
	try{
		if(cvUndefinedOrNull(bg) || cvUndefinedOrNull(fg)  || cvUndefinedOrNull(dst))
			throw "fg or bg or dst" + ERROR.IS_UNDEFINED_OR_NULL;
		if(bg.width != fg.width || bg.height != fg.height || 
			bg.width != dst.width || bg.height != dst.height) throw ERROR.DIFFERENT_SIZE;
		
		if(cvUndefinedOrNull(blend_mode)) blendMode = CV_BLEND_MODE.OVER_LAY;

		var percent = 1;
		for (i = 0; i < bg.height; i++) {
			for (j = 0; j < bg.width; j++) {
				var ch = CHANNELS - 1 ;
				for(var  c = 0 ; c < ch ; c++){
					
					var bgV = bg.RGBA[c + (j + i * bg.width) * CHANNELS] / 255;
					var fgV = fg.RGBA[c + (j + i * bg.width) * CHANNELS] / 255;

					var v;

					switch(blend_mode){
					
					case CV_BLEND_MODE.OVER_LAY://オーバーレイ
						v = bgV < 0.5 ? 2.0 * bgV * percent * fgV : 
							1.0 - 2.0 * (1.0 - bgV) * (1.0 - percent * fgV);
						break;

					case CV_BLEND_MODE.SCREEN: //スクリーン
						v = 1.0 - ( 1.0 - bgV ) * ( 1.0 - fgV );
						break;

					case CV_BLEND_MODE.HARD_LIGHT: // ハードライト
						v = fgV < 0.5 ? 2.0 * bgV * fgV : 1.0 - 2.0 * ( 1.0 - bgV ) * ( 1.0 - fgV );
						break;
						
					case CV_BLEND_MODE.SOFT_LIGHT: // ソフトライト
						v = fgV < 0.5 ? 
								bgV + ( bgV -  bgV * bgV ) * ( 2.0 * fgV - 1.0 ) : 
								bgV <= ( 32.0 / 255.0 ) ? 
								bgV + ( bgV -  bgV * bgV ) * ( 2.0 * fgV - 1.0 ) * ( 3.0 - 8.0 * bgV ) : 
								bgV + ( Math.sqrt( bgV ) - bgV ) * ( 2.0 * fgV - 1.0 );
						break;

					case CV_BLEND_MODE.VIVID_LIGHT: //ビビットライト
						v = fgV < 0.5 ? ( bgV <= 1 - fgV * 2 ? 0.0 : ( bgV - ( 1 - fgV * 2 ) ) / ( fgV * 2 ) ) : 
							( bgV < 2 - fgV * 2 ? bgV / ( 2 - fgV * 2 ) : 1.0 );
						break;
					
					case CV_BLEND_MODE.LINEAR_LIGHT: //リニアライト
						v = fgV < 0.5 ? ( bgV < 1 - fgV * 2 ? 0.0 : fgV * 2 + bgV - 1 ) : 
							( bgV < 2 - fgV * 2 ? fgV * 2 + bgV - 1 : 1.0);
						break;
				
					case CV_BLEND_MODE.PIN_LIGHT: //ピンライト
						v = fgV < 0.5 ? ( fgV * 2 < bgV ? fgV * 2 : bgV) : 
							( fgV * 2 - 1 < bgV ? bgV : fgV * 2 - 1 );
						break;

					case CV_BLEND_MODE.COLOR_DODGE: //覆い焼きカラー
						v = bgV + fgV > 1.0 ? 1.0 : ( bgV > 0.0 ? bgV / ( 1.0 - fgV ) : 0.0 );
						break;

					case CV_BLEND_MODE.LINEAR_DODGE: //覆い焼き（リニア）
						v = bgV + fgV > 1.0 ? 1.0 : ( bgV + fgV );
						break;

					case CV_BLEND_MODE.COLOR_BURN: //焼きこみカラー
						v = fgV + bgV < 1.0 ? 0.0 : fgV > 0.0 ? 1.0 - ( 1.0 - bgV ) / fgV : 1.0;
						break;
			
					case CV_BLEND_MODE.LINEAR_BURN: //焼きこみ（リニア）
						v = bgV + fgV < 1.0 ? 0.0 : ( bgV + fgV - 1.0 );
						break;
					
					case CV_BLEND_MODE.EXCLUSION: //除外
						v = (1.0 - bgV ) * fgV + ( 1.0 - fgV ) * bgV;
						break;
						
					case CV_BLEND_MODE.MUL: //掛け算
						v = bgV * fgV;
						break;
						
					default:
						throw "blend_mode" + ERROR.SWITCH_VALUE;
						break;
					}

					var iv = (255 * v);
					
					dst.RGBA[c + (j + i * dst.width) * CHANNELS] = iv;
				}
        if(bg.RGBA[ch+(j+i*dst.width)*CHANNELS]===255||fg.RGBA[ch+(j+i*dst.width)*CHANNELS]/255)
          dst.RGBA[ch + (j + i * dst.width) * CHANNELS] = 255;
        else
          dst.RGBA[ch + (j + i * dst.width) * CHANNELS] = 0;
			}
		}
	}
	catch(ex){
		alert("cvBlendImage : " + ex);
	}
}
*/
// forked from shogo82148's "CSS3 Transform Test" http://jsdo.it/shogo82148/5Y1p
$(function() {
  function refresh() {
    var i, M = [], V = [];
    var x, y, X, Y;
    for(i=0;i<4;i++) {
      x = origin[i][0];
      y = origin[i][1];
      X = markers[i].x() - imgx;
      Y = markers[i].y() - imgy;
      M.push([x, y, 1, 0, 0, 0, -x*X, -y*X]);
      M.push([0, 0, 0, x, y, 1, -x*Y, -y*Y]);
      V.push(X);
      V.push(Y);
    }
    var ans = $M(M).inv().x($V(V));
  //  console.log($M(M).inspect());
  //  console.log($V(V).inspect());
  //  console.log(ans.inspect());
    var transform = "perspective(1px)scaleZ(-1)translateZ(-1px)matrix3d(" +
                  ans.e(1) + ',' + ans.e(4) + ',' + ans.e(7) + ',0,' +
                  ans.e(2) + ',' + ans.e(5) + ',' + ans.e(8) + ',0,' +
                  ans.e(3) + ',' + ans.e(6) + ',1,0,' +
                  '0,0,0,1)translateZ(1px)';
    img.css('-webkit-transform', transform);
  }
  function Marker(elem, func) {
    elem = $(elem);
    this.elem = elem;
    elem.draggable({
      drag: func || refresh
    });
  }
  Marker.prototype.x = function(x) {
    var e = this.elem;
    if(x) {
      e.css('left', (x - e.width()/2) + 'px');
      return this;
    }
    else {
      return e.position().left + e.width()/2;
    }
  };
  Marker.prototype.y = function(y) {
    var e = this.elem;
    if(y) {
      e.css('top', (y - e.height()/2) + 'px');
      return this;
    }
    else {
      return e.position().top + e.height()/2;
    }
  };
  var markers = [
    new Marker('#marker1'),
    new Marker('#marker2'),
    new Marker('#marker3'),
    new Marker('#marker4')
  ];
  var img = $('#srcImage');
  var imgx = img.position().left;
  var imgy = img.position().top;
  var imgwidth = img.width();
  var imgheight = img.height();
  markers[0].x(imgx).y(imgy);
  markers[1].x(imgx + imgwidth).y(imgy);
  markers[2].x(imgx + imgwidth).y(imgy + imgheight);
  markers[3].x(imgx).y(imgy + imgheight);
  
  var origin = [
    [0, 0],
    [imgwidth, 0],
    [imgwidth, imgheight],
    [0, imgheight]
  ];
  refresh();
})
$("#container").click(function(){
  switch($('#container').css("background-color")){
    case "rgb(136, 136, 136)":$('#container').css("background-color","#000000").css("background-image","none");break;
    case "rgb(0, 0, 0)"      :$('#container').css("background-color","#FFFFFF");break;
    case "rgb(255, 255, 255)":$('#container').css("background-color","#888888").css("background-image","url('clear.png')");break;
  }
});

webpackJsonp([6],{1036:function(e,t,i){"use strict";var n=i(115),s=i.n(n),a=i(113),o=i.n(a),r=i(37),l=i.n(r),c=i(38),h=i.n(c),p=i(40),u=i.n(p),m=i(39),d=i.n(m),g=i(4),f=i.n(g),v=i(97),y=(i.n(v),i(213),i(1070)),w=i.n(y),E=i(1069),x=i(1068),_=function(e){function t(e){l()(this,t);var i=u()(this,(t.__proto__||o()(t)).call(this,e));return i.props.class.push("g-core-image-upload-btn"),i.state={formID:"g-core-upload-input-"+Math.floor(1e4*Math.random()),uploading:!1,hasImage:!1,class:i.props.class.join(" "),image:{src:"http://img1.vued.vanthink.cn/vuedcb0efb21e5f2ca013ca1480198bbf4b3.png",width:0,height:0}},i}return d()(t,e),h()(t,[{key:"render",value:function(){return f.a.createElement("div",{className:this.state.class,id:this.state.formID},this.props.text,f.a.createElement("form",{className:"g-core-image-upload-form",method:"post",encType:"multipart/form-data",action:"",style:{display:"block",cursor:"pointer",position:"absolute",left:0,top:0,width:1242,height:61,opacity:0,margin:0,padding:0,overflow:"hidden"}},f.a.createElement("input",{disabled:this.state.uploading,onChange:this.change.bind(this),name:this.props.inputOfFile,type:"file",accept:this.props.inputAccept,style:{width:"100%",height:"100%"}})),f.a.createElement("div",{className:"g-core-image-corp-container",style:{display:this.state.hasImage?"block":"none"}},f.a.createElement("div",{className:"image-aside"},f.a.createElement("div",{className:"g-crop-image-box"},f.a.createElement("div",{className:"g-crop-image-principal"},f.a.createElement("img",{src:this.state.image.src,style:{width:this.state.image.width,height:this.state.image.height}}),f.a.createElement("div",{className:"select-recorte",onMouseDown:this.drag.bind(this),onTouchStart:this.drag.bind(this),style:{width:100,height:100}},f.a.createElement("div",{className:"g-s-resize"}),f.a.createElement("div",{className:"g-e-resize"}),f.a.createElement("div",{className:"g-resize",onTouchStart:this.resize.bind(this),onMouseDown:this.resize.bind(this)}))))),f.a.createElement("div",{className:"info-aside"},f.a.createElement("div",{className:"btn-groups"},f.a.createElement("div",{onClick:this.cancel.bind(this),className:"btn btn-cancel"},this.props.cropBtn.cancel),f.a.createElement("div",{onClick:this.doCrop.bind(this),className:"btn btn-upload"},this.props.cropBtn.ok)))))}},{key:"__find",value:function(e){return document.getElementById(this.state.formID).querySelector(e)}},{key:"change",value:function(e){var t=this.__find("input").value.replace(/C:\\fakepath\\/i,""),i=t.substring(t.lastIndexOf(".")+1),n=this.props.extensions;if(n.length>1){if(!new RegExp("^["+n.join("|")+"]+$","i").test(i))return this.props.errorHandle("TYPE ERROR")}if(e.target.files[0].size>this.props.maxFileSize){var s;return parseInt(this.maxFileSize/1024/1024)>0?s=(this.maxFileSize/1024/1024).toFixed(2)+"MB":parseInt(this.maxFileSize/1024)>0&&(s=(this.maxFileSize/1024).toFixed(2)+"kB"),void this.props.errorHandle("FILE IS TOO LARGER THAN THE MAX VALUE "+s)}if(this.files=e.target.files,this.props.crop)return void this.__showImage();this.props.imageChanged(this.files[0]),this.tryAjaxUpload()}},{key:"__showImage",value:function(){document.body.style.overflow="hidden",this.setState({hasImage:!0}),this.__readFiles()}},{key:"__readFiles",value:function(){var e=new FileReader,t=this;e.onload=function(e){var i=e.target.result;t.__initImage(i)},e.readAsDataURL(this.files[0])}},{key:"__initImage",value:function(e){var t=new Image,i=this;t.src=e,t.onload=function(){i.setState({image:{src:e,width:t.naturalWidth,height:t.naturalHeight}}),i.__reseyLayout(),i.__initCropBox()}}},{key:"__initCropBox",value:function(){var e=this.__find(".select-recorte"),t=this.__find(".g-crop-image-principal"),i=parseInt(t.style.width),n=parseInt(t.style.height),s=this.props.cropRatio.split(":")[0],a=this.props.cropRatio.split(":")[1],o=i/100*80,r=o/s*a;e.style.cssText="width:"+o+"px;height: "+r+"px;left:"+(i-o)/2+"px;top:"+(n-r)/2+"px;",r>n&&(r=n/100*80,o=r*s/a,e.style.cssText="width:"+o+"px;height:"+r+"px;left:"+(i-o)/2+"px;top:"+(n-r)/2+"px")}},{key:"__reseyLayout",value:function(){var e=window.innerHeight-80,t=window.innerWidth-60,i=this.state.image.width,n=this.state.image.height,s=i/n,a=t/e,o=this.__find(".g-crop-image-principal");s>a?(this.setState({image:{src:this.state.image.src,width:t,height:t/s}}),o.style.cssText="width:"+t+"px;height:"+t/s+"px;margin-top:"+(e-t/s)/2+"px"):(this.setState({image:{src:this.state.image.src,width:e*s,height:e}}),o.style.cssText="width:"+e*s+"px;height:"+e+"px;margin-left:"+(t-e*s)/2+"px;"),this.imgChangeRatio=i/this.state.image.width}},{key:"doCrop",value:function(e){var t=e.target;t.value=t.value+"...",t.disabled=!0,"object"!==s()(this.data)&&(this.data={});var i=this.__find(".select-recorte");this.data.postionX=Math.ceil(parseInt(window.getComputedStyle(i).left)*this.imgChangeRatio),this.data.postionY=Math.ceil(parseInt(window.getComputedStyle(i).top)*this.imgChangeRatio),this.data.width=Math.ceil(parseInt(window.getComputedStyle(i).width)*this.imgChangeRatio),this.data.height=Math.ceil(parseInt(window.getComputedStyle(i).height)*this.imgChangeRatio),this.tryAjaxUpload(function(){t.value=t.value.replace("...",""),t.disabled=!1})}},{key:"cancel",value:function(){this.files="",this.setState({hasImage:!1}),this.__find("input").value="",document.body.removeAttribute("style")}},{key:"tryAjaxUpload",value:function(e){for(var t=this,i=new FormData,n=0;n<this.files.length;n++)i.append(t.props.inputOfFile,this.files[n]);if("object"===s()(this.data))for(var a in this.data)void 0!==this.data[a]&&i.append(a,this.data[a]);if(this.props.imageUploading(this.files),!this.props.isXhr)return this.props.crop&&this.setState({hasImage:!1}),"function"==typeof e&&e();w()("POST",this.props.url,this.props.header,i,function(i){"function"==typeof e&&e(),t.uploading=!1,t.props.crop&&t.cancel(),t.props.imageUploaded(i)})}},{key:"resize",value:function(e){var t=e.target.parentElement,i=this.__find(".g-crop-image-principal");new E.a(t,i,this.props.cropRatio,e)}},{key:"drag",value:function(e){var t=e.target,i=this.__find(".g-crop-image-principal");new x.a(t,i,e)}}]),t}(g.Component);_.propTypes={url:f.a.PropTypes.string,text:f.a.PropTypes.string,inputAccept:f.a.PropTypes.string,inputOfFile:f.a.PropTypes.string,class:f.a.PropTypes.array},_.defaultProps={url:"",text:"upload",inputAccept:"image/jpg,image/jpeg,image/png,image/gif",inputOfFile:"file",crop:!1,cropBtn:{ok:"Save",cancel:"Cancel"},class:[],extensions:[],cropRatio:"1:1",maxFileSize:10485760,isXhr:!0,header:null,imageUploaded:function(e){},imageUploading:function(e){},imageChanged:function(){},errorHandle:function(e){}},t.a=_},1037:function(e,t,i){"use strict";var n=i(113),s=i.n(n),a=i(37),o=i.n(a),r=i(38),l=i.n(r),c=i(40),h=i.n(c),p=i(39),u=i.n(p),m=i(4),d=i.n(m),g=i(993),f=i.n(g),v=i(96),y=i.n(v),w=function(e){function t(){o()(this,t);var e=h()(this,(t.__proto__||s()(t)).call(this));return e.toJumpPage=e.toJumpPage.bind(e),e.toPost=e.toPost.bind(e),e}return u()(t,e),l()(t,[{key:"toPost",value:function(e){var t=this.props.history;"/thread"===e&&t.push(e)}},{key:"toJumpPage",value:function(e){this.props.history.push(e)}},{key:"render",value:function(){var e=this,t=this.props.item;return d.a.createElement("div",{className:f.a.item,onClick:function(){return e.toPost(t.url)}},d.a.createElement("span",{className:y()(f.a.icon,f.a[t.icon])}),d.a.createElement("span",{className:f.a["menu-name"]},t.name),t.mark>0&&d.a.createElement("span",{className:f.a.mark}),d.a.createElement("span",{className:f.a.arrows,onClick:function(){return e.toJumpPage(t.url)}}))}}]),t}(m.Component);t.a=w},1065:function(e,t,i){"use strict";var n=i(55),s=i.n(n),a=i(113),o=i.n(a),r=i(37),l=i.n(r),c=i(38),h=i.n(c),p=i(40),u=i.n(p),m=i(39),d=i.n(m),g=i(4),f=i.n(g),v=i(214),y=i(1085),w=i.n(y),E=i(1036),x=i(213),_=function(e){function t(e){l()(this,t);var i=u()(this,(t.__proto__||o()(t)).call(this,e));return i.handleRes=i.handleRes.bind(i),i.imageChanged=i.imageChanged.bind(i),i.imageUploading=i.imageUploading.bind(i),i.jumpPage=i.jumpPage.bind(i),i}return d()(t,e),h()(t,[{key:"handleRes",value:function(e){var t=this.props.dispatch,n=s()({},this.props.userinfo);e.data&&(n.head_img=e.data.picUrl,i.i(x.updateBbsUserHeadimg)(e.data.picUrl).then(function(e){e.result&&t({type:"change user info",userinfo:n})})),e.error_code&&this.Toast.show(e.error_code.error.message),this.props.dispatch({type:"loading hidden"})}},{key:"imageChanged",value:function(){}},{key:"imageUploading",value:function(){this.props.dispatch({type:"loading show"})}},{key:"jumpPage",value:function(e){this.props.history.push(e)}},{key:"render",value:function(){var e=this,t=this.props.userinfo;return f.a.createElement("div",{className:w.a.container},f.a.createElement("div",{className:w.a.user},f.a.createElement("div",{className:w.a["user-left"]},f.a.createElement(E.a,{extensions:"png,jpg,jpeg",text:"",className:"pure-button",crop:"server",inputOfFile:"img",cropBtn:{ok:"选取",cancel:"取消"},url:x.imgUpload,imageChanged:this.imageChanged,imageUploading:this.imageUploading,imageUploaded:this.handleRes}),f.a.createElement("img",{className:w.a.avatar,src:t.head_img})),f.a.createElement("div",{className:w.a["user-right"]},f.a.createElement("h1",{className:w.a.nickname},t.nickname),f.a.createElement("div",{className:w.a["edit-info"],onClick:function(){return e.jumpPage("/editName")}},f.a.createElement("span",null,"编辑资料")))),f.a.createElement("div",{className:w.a.info},f.a.createElement("div",{className:w.a.item},f.a.createElement("div",{className:w.a.num},t.userZanNum),f.a.createElement("div",{className:w.a.title},f.a.createElement("span",null,"收到的赞"))),f.a.createElement("div",{className:w.a.item},f.a.createElement("div",{className:w.a.num},t.userCommentNum),f.a.createElement("div",{className:w.a.title},f.a.createElement("span",null,"收到的评论"))),f.a.createElement("div",{className:w.a.item},f.a.createElement("div",{className:w.a.num},t.userThreadCollectionNum),f.a.createElement("div",{className:w.a.title},f.a.createElement("span",null,"被收藏")))))}}]),t}(g.Component);t.a=i.i(v.b)(function(e){return e.user})(_)},1066:function(e,t,i){"use strict";var n=i(113),s=i.n(n),a=i(37),o=i.n(a),r=i(38),l=i.n(r),c=i(40),h=i.n(c),p=i(39),u=i.n(p),m=i(4),d=i.n(m),g=i(114),f=i(96),v=i.n(f),y=i(993),w=i.n(y),E=i(1037),x=function(e){function t(){return o()(this,t),h()(this,(t.__proto__||s()(t)).apply(this,arguments))}return u()(t,e),l()(t,[{key:"render",value:function(){var e=this.props.history,t=[{name:"消息提醒",icon:"message",mark:this.props.countPm||0,url:"/message"},{name:"我的收藏",icon:"collect",url:"/collection"},{name:"我的帖子",icon:"topic",url:"/thread"},{name:"我的评论",icon:"comment",url:"/comment"},{name:"我的任务",icon:"task",mark:this.props.userinfo.awardReadPoint||0,url:"/task"}];return d.a.createElement("div",{className:v()(w.a.menu)},t.map(function(t,i){return d.a.createElement(E.a,{item:t,key:i,history:e})}))}}]),t}(m.Component);t.a=i.i(g.e)(x)},1067:function(e,t,i){"use strict";var n=i(113),s=i.n(n),a=i(37),o=i.n(a),r=i(38),l=i.n(r),c=i(40),h=i.n(c),p=i(39),u=i.n(p),m=i(4),d=i.n(m),g=i(1086),f=i.n(g),v=i(213),y=i(139),w=function(e){function t(){o()(this,t);var e=h()(this,(t.__proto__||s()(t)).call(this));return e.toLogin=e.toLogin.bind(e),e.toRegister=e.toRegister.bind(e),e}return u()(t,e),l()(t,[{key:"toLogin",value:function(){y.a.ready({app:function(e){e.loginApp({refresh:1,url:""})},other:function(){window.location.href=v.currentHost+"/wechat/verify?next=/bbs/mine?source=app"}})}},{key:"toRegister",value:function(){y.a.ready({app:function(e){e.registerApp({refresh:1,url:""})},other:function(){window.location.href=v.currentHost+"/wechat/verify?next=/bbs/mine?source=app"}})}},{key:"render",value:function(){return d.a.createElement("div",{className:f.a.container},d.a.createElement("div",{className:f.a.btn},d.a.createElement("span",{onClick:this.toLogin},"登录"),d.a.createElement("span",null,"/"),d.a.createElement("span",{onClick:this.toRegister},"注册")),d.a.createElement("div",{className:f.a.movement},d.a.createElement("div",null),d.a.createElement("div",null)))}}]),t}(m.Component);t.a=w},1068:function(e,t,i){"use strict";var n=i(37),s=i.n(n),a=i(38),o=i.n(a),r=i(992),l=i.n(r),c=l.a.isMobile,h=void 0,p=void 0,u=function(){function e(t,i,n){s()(this,e);var a=this;if(this.el=t,this.container=i,this.coor={x:(c?n.touches[0].clientX:n.clientX)-t.offsetLeft-t.parentElement.offsetLeft-document.getElementsByClassName("image-aside")[0].offsetLeft,y:(c?n.touches[0].clientY:n.clientY)-t.offsetTop-t.parentElement.offsetTop-document.getElementsByClassName("image-aside")[0].offsetTop,posX:c?n.touches[0].clientX:n.clientX,posy:c?n.touches[0].clientY:n.clientY,maxLeft:parseInt(this.container.style.width)-parseInt(this.el.style.width),maxTop:parseInt(this.container.style.height)-parseInt(this.el.style.height)},h=function(e){a.move(e)},p=function(e){a.stopMove(e)},c)return document.addEventListener("touchmove",h,!1),void document.addEventListener("touchend",p,!1);document.addEventListener("mousemove",h,!1),document.addEventListener("mouseup",p,!1)}return o()(e,[{key:"move",value:function(e){if(this.el){var t=c?e.changedTouches[0].clientX:e.clientX,i=c?e.changedTouches[0].clientY:e.clientY,n=t-this.el.parentElement.offsetLeft-document.getElementsByClassName("image-aside")[0].offsetLeft-this.coor.x,s=i-this.el.parentElement.offsetTop-document.getElementsByClassName("image-aside")[0].offsetTop-this.coor.y;n<=0&&(n=0),n>=this.coor.maxLeft&&(n=this.coor.maxLeft),s<=0&&(s=0),s>=this.coor.maxTop&&(s=this.coor.maxTop),this.el.style.left=n+"px",this.el.style.top=s+"px"}}},{key:"stopMove",value:function(){if(this.el=null,c)return document.removeEventListener("touchmove",h,!1),void document.removeEventListener("touchend",p,!1);document.removeEventListener("mousemove",h,!1),document.removeEventListener("mouseup",p,!1)}}]),e}();t.a=u},1069:function(e,t,i){"use strict";var n=i(37),s=i.n(n),a=i(38),o=i.n(a),r=i(992),l=i.n(r),c=void 0,h=void 0,p=l.a.isMobile,u=document.body.offsetWidth,m=document.body.offsetHeight,d=function(){function e(t,i,n,a){s()(this,e),a.stopPropagation();var o=this;this.coor={x:p?a.touches[0].clientX:a.clientX,y:p?a.touches[0].clientY:a.clientY,w:parseInt(window.getComputedStyle(t).width,10),h:parseInt(window.getComputedStyle(t).height,10)},this.splitX=n.split(":")[0],this.splitY=n.split(":")[1],this.el=t,this.container=i,c=function(e){o.drag(e)},h=function(e){o.stopDrag(e)},p&&(document.addEventListener("touchmove",c,!1),document.addEventListener("touchend",h,!1)),document.addEventListener("mousemove",c,!1),document.addEventListener("mouseup",h,!1)}return o()(e,[{key:"drag",value:function(e){if(this.el){var t=this.container,i=parseInt(window.getComputedStyle(t).width),n=parseInt(window.getComputedStyle(t).height),s=document.querySelector(".info-aside"),a=u-i,o=m-n-window.getComputedStyle(s).height,r=p?e.changedTouches[0].clientX:e.clientX,l=p?e.changedTouches[0].clientY:e.clientY;this.splitX>this.splitY?parseInt(r)<=a/2+i&&(parseInt(this.el.offsetWidth)>=i&&(this.el.style.width=window.getComputedStyle(t).width),this.el.style.width=this.coor.w+(p?e.changedTouches[0].clientX:e.clientX)-this.coor.x+"px",this.el.style.height=parseInt(this.el.offsetWidth)*(this.splitY/this.splitX)+"px",i>n?parseInt(this.el.offsetWidth)>=parseInt(window.getComputedStyle(t).height)&&(this.el.style.height=window.getComputedStyle(t).height,this.el.style.width=parseInt(window.getComputedStyle(t).height)*(this.splitX/this.splitY)+"px"):i<n?parseInt(this.el.offsetWidth)>=i&&(this.el.style.width=window.getComputedStyle(t).width,this.el.style.height=i*(this.splitY/this.splitX)+"px"):parseInt(this.el.offsetHeight)>=i&&(this.el.style.width=i,this.el.style.height=i*(this.splitY/this.splitX)+"px")):this.splitX<this.splitY?parseInt(l)<=o/2+n+window.getComputedStyle(s).height&&(this.el.style.height=this.coor.h+(p?e.changedTouches[0].clientY:e.clientY)-this.coor.y+"px",this.el.style.width=parseInt(this.el.style.height)*(this.splitX/this.splitY)+"px",i>n?parseInt(this.el.offsetHeight)>=n&&(this.el.style.height=n,this.el.style.width=n*(this.splitX/this.splitY)+"px"):parseInt(this.el.offsetWidth)>=i&&(this.el.style.width=i,this.el.style.height=i*(this.splitY/this.splitX)+"px")):parseInt(r)<=a/2+i&&(this.el.style.width=this.coor.w+(p?e.changedTouches[0].clientX:e.clientX)-this.coor.x+"px",this.el.style.height=this.el.style.width,i>n?parseInt(this.el.offsetHeight)>=n&&(this.el.style.height=n,this.el.style.width=n):i<n?parseInt(this.el.offsetWidth)>=i&&(this.el.style.width=i,this.el.style.height=i):parseInt(this.el.offsetWidth)>=i&&(this.el.style.width=this.el.style.height=i))}}},{key:"stopDrag",value:function(){this.el=null,p&&(document.removeEventListener("touchmove",c,!1),document.removeEventListener("touchend",h,!1)),document.removeEventListener("mousemove",c,!1),document.removeEventListener("mouseup",h,!1)}}]),e}();t.a=d},1070:function(e,t){e.exports=function(e,t,i,n,s,a){function o(e){for(var t={},i=/([a-z-]+):\s?(.*);?/gi,n=void 0;n===i.exec(e);)t[n[1]]=n[2];return t}var r=new XMLHttpRequest,l=a||function(){},c=!1;"blob"===e&&(c=e,e="GET"),e=e.toUpperCase(),r.onload=function(){var t=r.response;try{t=JSON.parse(r.responseText)}catch(e){401===r.status&&(t=l("access_denied",r.statusText))}var i=o(r.getAllResponseHeaders());i.statusCode=r.status,s(t||("GET"===e?l("empty_response","Could not get resource"):{}),i)},r.onerror=function(){var e=r.responseText;try{e=JSON.parse(r.responseText)}catch(e){}s(e||l("access_denied","Could not get resource"))};var h=void 0;if("GET"===e||"DELETE"===e)n=null;else if(n&&"string"!=typeof n&&!(n instanceof FormData)&&!(n instanceof File)&&!(n instanceof Blob)){var p=new FormData;for(h in n)n.hasOwnProperty(h)&&(n[h]instanceof HTMLInputElement?"files"in n[h]&&n[h].files.length>0&&p.append(h,n[h].files[0]):n[h]instanceof Blob?p.append(h,n[h],n.name):p.append(h,n[h]));n=p}if(r.open(e,t,!0),c&&("responseType"in r?r.responseType=c:r.overrideMimeType("text/plain; charset=x-user-defined")),i)for(h in i)r.setRequestHeader(h,i[h]);return r.send(n),r}},1085:function(e,t){e.exports={container:"container-2FUZQ",info:"info-3cLJ7",user:"user-12sIi","user-left":"user-left-Pelev",avatar:"avatar-o4W_V","user-right":"user-right-3H5ic",nickname:"nickname-afIT3","edit-info":"edit-info-HgdSN",item:"item-upqPw",num:"num-3QA-r",title:"title-flZEM"}},1086:function(e,t){e.exports={container:"container-3TaSN",btn:"btn-4buJP",movement:"movement-2W1-l",move:"move-2NWed"}},859:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(113),s=i.n(n),a=i(37),o=i.n(a),r=i(38),l=i.n(r),c=i(40),h=i.n(c),p=i(39),u=i.n(p),m=i(4),d=i.n(m),g=i(114),f=i(214),v=i(340),y=i(1067),w=i(1065),E=i(1066),x=i(344),_=function(e){function t(){return o()(this,t),h()(this,(t.__proto__||s()(t)).apply(this,arguments))}return u()(t,e),l()(t,[{key:"componentWillMount",value:function(){this.props.dispatch(x.b()),this.props.dispatch(x.c())}},{key:"render",value:function(){var e=this.props.loginState;return d.a.createElement("div",{className:"layout"},d.a.createElement(v.a,{titleContent:"我的"}),d.a.createElement("div",{className:"scroll-wrap bg-white"},"logined"===e&&d.a.createElement(w.a,this.props),"nologin"===e&&d.a.createElement(y.a,null),d.a.createElement(E.a,this.props)))}}]),t}(m.Component);t.default=i.i(g.e)(i.i(f.b)(function(e){return e.user})(_))},992:function(e,t){e.exports={isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}},993:function(e,t){e.exports={menu:"menu-2KCCU",item:"item-3HBHO","menu-name":"menu-name-2qc7L",icon:"icon-2R6kH",message:"message-3XV8m",collect:"collect-2vqSK",topic:"topic-2HpCa",comment:"comment-1iFxF",task:"task-1GORY",mark:"mark-29zqD",arrows:"arrows-3J0CL"}}});
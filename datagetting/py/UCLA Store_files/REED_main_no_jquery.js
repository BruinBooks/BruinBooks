var reedVars={};var _gaq=_gaq||[];var _gaq=_gaq||[];var _kmq=_kmq||[];if(typeof(window.console)=="undefined"){window.console={};window.console.log=function(){}}if(typeof(window.REED_host)=="undefined"){window.REED_host=(("https:"==document.location.protocol)?"https://s3.amazonaws.com/statics.reedge.com":"http://statics.reedge.com")}if(typeof(REED)=="undefined"&&(typeof(reedge_dont_load)=="undefined"||!reedge_dont_load)){var REED_$=null;var REED={sizzle:null,intervalMonitor:12000,monitoringMaxTimes:1,monitoringTimes:0,monitorTimingId:0,serverUrl:"",ressourcesUrl:"",jsUrl:"/REED.php",reed_url_track:"",showDebug:false,track:true,actionsDone:new Array(),retries:new Array(),maxRetries:100,retryPeriod:200,inited:false,footerInited:false,documentReady:false,TRACKCOOKIETTL:525600,SESSIONCOOKIETTL:20,$:null,footerId:"REED_insert_footerInit",dis:[],gaRequeuedCnt:0,elements:{},pollId:0,hideBody:true,usePolling:true,domTimeout:2500,initTime:0,hideBodyTimeoutId:null,auto_pull_transaction:true,ga_pushes:{},revenueData:null,done_reed_tran_data:false,throttle:null,pushedVars:{},inventoriesDone:{},latestPollTimoutid:null,init:function(g){if(this.inited){return}this.inited=true;if(REED_$==null){if((typeof(jQuery)!="undefined")){REED_$=jQuery;REED.$=jQuery}}var k=/(?:\?|&(?:amp;)?)([a-zA-Z0-9_\-\.]+)=?([^&#]*)/g,i,a=function(e){return decodeURIComponent(e.replace(/\+/g," "))};var b=""+document.location;while(i=k.exec(b)){if(typeof(i[1])!="undefined"&&typeof(i[2])!="undefined"){try{window.reedVars[a(i[1])]=a(i[2])}catch(j){}}}if(typeof(reedVars.reedge_codecheck)!="undefined"){window.parent["codefound_"+reedVars.reedge_domain_id]=true;return}var f=g.split("_");if(f[2]==1001121){window.REED_th=10}if(typeof(REED_th)!="undefined"&&typeof(reedVars.reed_action)=="undefined"){this.throttle=REED_th;var d=this.getCookie("REED_th");if(d==1||d=="1"){return}else{if(d==null){var c=Math.floor(Math.random()*100);if(c>REED_th){var h=document.domain.replace(/^www\./,"");this.setCookie("REED_th",1,43200,"/",h);return}else{this.setCookie("REED_th",0,43200,"/",h)}}}}if(this.auto_pull_transaction&&typeof(window._gaq)=="undefined"){window._gaq=[];window._gaq[0]=function(){var e=window._gaq.push;window._gaq.push=function(){for(var l=0;l<arguments.length;l++){REED.handleGaPush(arguments[l]);e(arguments[l])}}};window._gaq.push=function(){for(var e=0;e<arguments.length;e++){REED.handleGaPush(arguments[e]);window._gaq[window._gaq.length]=arguments[e]}}}if(typeof(REED_$.browser)=="undefined"){REED_$.browser=this.fixMissingBrowserjQuery1_9()}if(typeof(REED_removeBlink)!="undefined"){this.hideBody=REED_removeBlink;if(REED_removeBlink&&typeof(REED_change_content_asap)=="undefined"){this.usePolling=true}}if(typeof(REED_change_content_asap)!="undefined"){this.usePolling=REED_change_content_asap}if(typeof(REED_empty_screen_timeout)!="undefined"){this.domTimeout=REED_empty_screen_timeout}if(REED_$.browser.msie){this.usePolling=false}if(this.hideBody){REED_$("head").append("<style id='reedge_hide_body' type='text/css' media='all'>body {position:relative;left:-10000px;background-image:none !important;background-color:#fff !important;}</style>");this.hideBodyTimeoutId=setTimeout("REED.showBody()",this.domTimeout)}this.initTime=new Date().getTime();this.serverUrl=(("https:"==document.location.protocol)?"https://":"http://");this.serverUrl+="tracking.reedge.com";this.ressourcesUrl=REED_host;this.reed_acc=g;this.jsUrl=this.serverUrl+this.jsUrl;this.dotrack();REED_$(document).ready(function(){REED.doAutoPickedTransactionData()})},triggerHeadActions:function(){this.addHtmlCodes(0);this.runJses(1);if(this.usePolling){this.doPollingJsChanges()}},footerInit:function(){if(this.footerInited){return}if(!REED.track){if(this.hideBody){this.showBody()}return false}if(this.throttle!=null){return}this.footerInited=true;REED_$(document).ready(function(){document.write=function(a){REED_$("body").append(a)}});if(!this.track){return}if(REED.documentReady){REED_$("body").append('<div id="'+this.footerId+'"></div>')}else{REED_$(document).ready(function(){REED_$("body").append('<div id="'+this.footerId+'"></div>')})}this.footerInitComplete()},footerInitComplete:function(){if(!REED.track){if(this.hideBody){this.showBody()}return false}var a="footerInit";if(typeof(reedResult)=="undefined"){if(typeof(this.retries[a])=="undefined"){this.retries[a]=0}else{if(this.retries[a]>this.maxRetries){return}else{this.retries[a]++}}setTimeout("REED.footerInitComplete()",this.retryPeriod);return}if(reedResult==null){return}if(this.monitoringMaxTimes>0){this.monitorTimingId=setTimeout("REED.footerMonitor()",this.intervalMonitor)}this.triggerActions();if(!this.usePolling){this.runJses(2)}if(this.hideBody){this.showBody()}if(this.showDebug){code="<div id=\"reedDebug\" class=\"jqDnR \"><div class='reedDrag'><div class='close'></div></div><div class='reedDebugContent'></div></div>";document.getElementById(this.footerId).innerHTML=code;this.loadjscssfile(this.ressourcesUrl+"/js/debug.js","js")}if(this.hideBody){this.showBody()}},footerMonitor:function(){var b=new Date();var a=REED.reed_url_track+"&callback=1";var c=document.createElement("script");c.setAttribute("type","text/javascript");document.getElementsByTagName("html")[0].appendChild(c);c.setAttribute("src",a+"&rand="+b.getTime());if(REED.monitoringTimes<REED.monitoringMaxTimes){REED.monitoringTimes++;REED.monitorTimingId=setTimeout("REED.footerMonitor()",this.intervalMonitor)}},triggerActions:function(a){if(typeof(a)=="undefined"){a=0}this.addHtmlCodes(1);this.changeContentMonitor();this.runJses(a)},dotrack:function(){var c=""+document.referrer;try{c=""+parent.document.referrer}catch(h){c=""+document.referrer}reed_url=""+document.location;c=c.substring(0,450);reed_url=reed_url.substring(0,450);c=escape(c);reed_url=escape(reed_url);var j=screen.height;var l=screen.width;var a=screen.pixelDepth;reed_date=new Date();reed_gmtOffset=-reed_date.getTimezoneOffset()/60;var k=0;this.setCookie("REED_test","test",1);if(this.getCookie("REED_test")=="test"){k=1}if(k==0){this.track=false;return}this.reed_url_track=this.jsUrl+("?acc="+this.reed_acc);if(typeof(REED_plugin_id)!="undefined"){this.reed_url_track+=("&pid="+REED_plugin_id)}else{if(typeof(REED_plugin_ID)!="undefined"){this.reed_url_track+=("&pid="+REED_plugin_ID)}}this.reed_url_track+=("&url="+reed_url);this.reed_url_track+=("&s_height="+j);this.reed_url_track+=("&s_width="+l);this.reed_url_track+=("&s_color="+a);this.reed_url_track+=("&js=1");if(typeof(REED_page_type)!="undefined"){this.reed_url_track+=("&v0="+escape(REED_page_type))}if(typeof(REED_category_id)!="undefined"){this.reed_url_track+=("&v1="+escape(REED_category_id))}if(typeof(REED_category_name)!="undefined"){this.reed_url_track+=("&v2="+escape(REED_category_name))}if(typeof(REED_product_sku)!="undefined"){this.reed_url_track+=("&v3="+escape(REED_product_sku))}if(typeof(REED_product_name)!="undefined"){this.reed_url_track+=("&v4="+escape(REED_product_name))}if(typeof(REED_product_price)!="undefined"){this.reed_url_track+=("&v41="+escape(REED_product_price))}if(typeof(REED_customer_id)!="undefined"){this.reed_url_track+=("&v5="+escape(REED_customer_id))}if(typeof(REED_custom_v1)!="undefined"){this.reed_url_track+=("&cv1="+escape(REED_custom_v1))}if(typeof(REED_custom_v2)!="undefined"){this.reed_url_track+=("&cv2="+escape(REED_custom_v2))}if(typeof(REED_custom_v3)!="undefined"){this.reed_url_track+=("&cv3="+escape(REED_custom_v3))}if(typeof(REED_custom_v4)!="undefined"){this.reed_url_track+=("&cv4="+escape(REED_custom_v4))}if(navigator.javaEnabled()){this.reed_url_track+=("&java=1")}else{this.reed_url_track+=("&java=0")}var d=0;if((typeof(navigator.mimeTypes)!="undefined"&&(typeof(navigator.mimeTypes["application/x-shockwave-flash"])!="undefined"||typeof(navigator.mimeTypes["application/futuresplash"])!="undefined"))||(typeof(navigator.plugins)!="undefined"&&(typeof(navigator.plugins["Shockwave Flash"])!="undefined"||typeof(navigator.plugins["Shockwave Flash 2.0"])!="undefined"))){d=1}this.reed_url_track+=("&flash="+d);this.reed_url_track+=("&cookies="+k);this.reed_url_track+=("&gmt="+reed_gmtOffset);if(typeof(e)=="undefined"){var e=true}if(typeof(e)!="undefined"&&e){this.reed_url_track+=("&ntg=1")}if(typeof(REED_segids)!="undefined"){this.reed_url_track+=("&segids="+REED_segids)}var b=this.getCookie("REED_t");var g=this.getCookie("REED_v");this.reed_url_track+=("&referer="+c);if(b!=""){this.reed_url_track+=("&REED_t="+b)}if(g!=""){this.reed_url_track+=("&REED_v="+g)}var f=document.createElement("script");f.type="text/javascript";f.async=true;f.src=this.reed_url_track+"&rand="+reed_date.getTime();var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(f,i)},pushData:function(d,g,b){var h;if(typeof(b)=="undefined"){b=false}var e=""+document.location;e=e.substring(0,255);var h=""+document.location;h=h.substring(0,150);e=escape(e);h=escape(h);reed_date=new Date();var i=0;REED.setCookie("REED_test","test",1);if(REED.getCookie("REED_test")=="test"){i=1}var a=REED.jsUrl+("?referer="+e);a+=("&url="+h);a+=("&acc="+REED.reed_acc);a+=("&js=1");a+=("&cookies="+i);a+=("&callback=1");a+=("&rtype=adddata");switch(g){case"strigg":a+=("&dtype=strigg");a+=("&segid="+d.sid);break;case"rev_track":a+=("&dtype=rev_track");a+=("&trid="+d.trid);a+=("&val="+d.val);a+=("&pno="+d.pno);break;default:break}var c=this.getCookie("REED_t");var f=this.getCookie("REED_v");if(c!=""){a+=("&REED_t="+c)}if(f!=""){a+=("&REED_v="+f)}a+=("&rand="+reed_date.getTime());var j=document.createElement("script");j.type="text/javascript";j.src=a;j.async=true;j.defer=true;document.getElementsByTagName("head")[0].appendChild(j)},getBanner:function(bannerId,zone_id){var name="ID_"+bannerId;var banner;var retryTableKey="zone"+zone_id;var id="REED_insert_"+zone_id;if(typeof(reedResult)=="undefined"){return}if(typeof(reedResult.data.banners)=="undefined"){return}eval("banner = reedResult.data.banners."+name+";");if(banner!=null&&banner!="undefined"&&banner.content!=null){REED_$("#"+id).html(banner.content)}},getZonesBanner:function(zone_id){var nameZone="ID_"+zone_id;var banner_id;var retryTableKey="zone"+zone_id;var id="REED_insert_"+zone_id;if(typeof(reedResult)=="undefined"){if(typeof(this.retries[retryTableKey])=="undefined"){document.write('<div id="'+id+'"></div>');this.retries[retryTableKey]=0}else{if(this.retries[retryTableKey]>this.maxRetries){return}else{this.retries[retryTableKey]++}}setTimeout("REED.getZonesBanner("+zone_id+")",this.retryPeriod);return}if(typeof(reedResult.data)=="undefined"){return}if(typeof(reedResult.data.zones)=="undefined"){return}eval("banner_id=reedResult.data.zones."+nameZone+";");this.getBanner(banner_id,zone_id)},changeContentMonitor:function(){for(var c in reedResult.data.contentChanges){if(!reedResult.data.contentChanges.hasOwnProperty(c)){continue}if(typeof(reedResult.data.contentChanges[c].selector)=="undefined"){continue}if(!(c in this.actionsDone)){if(reedResult.data.contentChanges[c].delay==0||reedResult.data.contentChanges[c].delay=="0"){this.doChangeContent(c)}else{var b="REED.doChangeContent('"+c+"')";var a=reedResult.data.contentChanges[c].delay*1000;setTimeout(b,a)}}}},doChangeContent:function(e){if(typeof(reedResult)=="undefined"||typeof(reedResult.data)=="undefined"||typeof(reedResult.data.contentChanges)=="undefined"||typeof(reedResult.data.contentChanges[e])=="undefined"||reedResult.data.contentChanges[e].content==null){return}var d=REED_$(reedResult.data.contentChanges[e].selector);var a=d.length;if(reedResult.data.contentChanges[e].stock_id<=112){for(var b=0;b<a;b++){d[b].innerHTML=reedResult.data.contentChanges[e].content}}else{var c=REED_$(unescape(reedResult.data.contentChanges[e].content));if(c.length>1){c=REED_$("<span />").append(c)}else{if(c.length==0){c=REED_$("<span>"+reedResult.data.contentChanges[e].content+"</span>")}}d.after(c).remove()}this.actionsDone[e]=1},addHtmlCodes:function(a){if(typeof(a)=="undefined"){a=1}if(typeof(reedResult)=="undefined"||typeof(reedResult.data)=="undefined"||typeof(reedResult.data.htmlCodes)=="undefined"){return}for(var b in reedResult.data.htmlCodes){if(!reedResult.data.htmlCodes.hasOwnProperty(b)){continue}if(reedResult.data.htmlCodes[b].rwhen==a){this.addHtmlCode(reedResult.data.htmlCodes[b],a)}}},addHtmlCode:function(b,a){if(typeof(a)=="undefined"){a=1}if(b.rwhen!=a){return}b.content=unescape(b.content);if(b.rwhen==0){if(REED_$!=null&&REED_$("head").length>0){REED_$("head").append(b.content)}else{document.write(b.content)}}else{if(b.rwhen==1){REED_$("body").append(b.content)}}},showPopup:function(){if(reedResult.data.popup!=""&&reedResult.data.popup!=null){if(reedResult.data.popup.delay!=0){setTimeout("REED.showPopup()",reedResult.data.popup.delay*1000);reedResult.data.popup.delay=0;return}this.write('<div id="myPopup"></div>');popup_width="455";bg_color="#ffffff";popup_content='<div class="wps_closewin_text" align="right"><a href="" onclick="document.getElementById(\'WPS_popup_message\').style.visibility=\'hidden\';document.getElementById(\'lightbox_div\').style.visibility=\'hidden\';return false;"><span style="color:#000000">Close</span>&nbsp;</a></div><div class="popupContentWrapp"><div class="popupContent">'+reedResult.data.popup.content+'</div></div><div class="clear"></div>';effect="lightbox";popup_left="center";popup_top="center";this.loadjscssfile(this.ressourcesUrl+"/css/popup_css.css","css");this.loadjscssfile(this.ressourcesUrl+"/js/simple_popup.js","js")}},runJses:function(a){if(typeof(a)=="undefined"){a=0}var b=reedResult.data.js.length;for(var c=0;c<b;c++){if(typeof(reedResult.data.js[c].rwhen)=="undefined"&&a!=0){continue}if(reedResult.data.js[c].rwhen!=a){continue}if(typeof(this.inventoriesDone[reedResult.data.js[c].stock_id])!="undefined"&&this.monitoringTimes>0){continue}if(reedResult.data.js[c].delay==0||reedResult.data.js[c].delay=="0"){this.runJs(c)}else{setTimeout("REED.runJs("+c+")",reedResult.data.js[c].delay*1000)}}},runJs:function(i){try{this.inventoriesDone[reedResult.data.js[i].stock_id]=1;eval(reedResult.data.js[i].content)}catch(e){console.log(e.description)}},setCookie:function(c,f,b,h,e,g){if(typeof(h)=="undefined"){h=""}if(typeof(e)=="undefined"){e=""}if(typeof(g)=="undefined"){g=""}var a=new Date();var d=new Date();d.setTime(a.getTime()+60000*b);document.cookie=c+"="+escape(f)+";expires="+d.toGMTString()+((h)?";path="+h:"")+((e)?";domain="+e:"")+((g)?";secure":"")},getCookie:function(a){var b=""+document.cookie;var d=b.indexOf(a+"=");if(d==-1||a==""){return null}var c=b.indexOf(";",d);if(c==-1){c=b.length}return unescape(b.substring(d+a.length+1,c))},deleteCookie:function(a){this.setCookie(a,"deleted",-1)},write:function(b){content=b;for(var a=1;a<this.arguments;a++){content+=this.argument[a]}if(document.all){reed_writer.innerHTML=content}else{if(document.getElementById){document.getElementById("reed_writer").innerHTML=content}else{if(document.layers){document.reed_writer.document.reed_writer.document.writeln(content);document.reed_writer.document.reed_writer.document.close();document.reed_writer.clip.width=document.reed_writer.document.reed_writer.clip.width;document.reed_writer.clip.height=document.reed_writer.document.reed_writer.clip.height}}}},loadjscssfile:function(a,b){if(b=="js"){var c=document.createElement("script");c.setAttribute("type","text/javascript");c.setAttribute("src",a)}else{if(b=="css"){var c=document.createElement("link");c.setAttribute("rel","stylesheet");c.setAttribute("type","text/css");c.setAttribute("href",a)}}if(typeof c!="undefined"){document.getElementsByTagName("head")[0].appendChild(c)}},loadDebugDeps:function(){this.loadjscssfile(this.ressourcesUrl+"/css/debug.css","css");this.showDebug=true},removePreviewVar:function(a){REED_$("head .REED_head_section_"+a).remove()},previewVar:function(a,c){var b=REED_$(unescape(c));b.addClass("REED_head_section_"+a);REED_$("head").append(b)},previewVarJs:function(content){try{eval(content)}catch(e){}},setDis:function(){REED_$(document).ready(function(){REED.documentReady=true;if(this.latestPollTimoutid!=null){clearTimeout(this.latestPollTimoutid);REED.doPollingJsChanges()}for(var a=0;a<REED.dis.length;a++){if(typeof(REED.dis[a].ev)=="undefined"||typeof(REED.dis[a].sid)=="undefined"||typeof(REED.dis[a].sl)=="undefined"){continue}var b=function(c){REED_$(REED.dis[c].sl).bind(REED.dis[c].ev,function(){REED.pushData({sid:REED.dis[c].sid},"strigg",true);REED.doWait(350)})};b(a)}})},doWait:function(b){var c=new Date();var a=null;do{a=new Date()}while(a-c<b)},dc:function(){var a=document.domain;if(typeof(REED_d)!="undefined"){a=REED_d}if(typeof(REED_c)!="undefined"){if(REED_c.REED_t){this.setCookie("REED_t",REED_c.REED_t,this.TRACKCOOKIETTL,"/",a)}if(REED_c.REED_v){this.setCookie("REED_v",REED_c.REED_v,this.SESSIONCOOKIETTL,"/",a)}}},dolnk:function(){if(REED_dms!=null){REED_$(document).ready(function(){REED_$("a").click(function(){var a=this.hostname;a=a.replace(/^www./,"");if(typeof(REED_dms[a])!="undefined"){var b;if(this.href.indexOf("?")!=-1){b="&"}else{b="?"}var c=this.href+b+"REED_t="+REED.getCookie("REED_t")+"&REED_v="+REED.getCookie("REED_v");window.location=c;return false}});REED_$("form").submit(function(){var d=document.createElement("a");var e=REED_$(this).attr("action");d.setAttribute("href",e);var a=d.hostname;a=a.replace(/^www./,"");if(typeof(REED_dms[a])!="undefined"){var c=REED_$(this).attr("method");if(c&&c!=null){c=c.toLowerCase()}if(c=="get"||!c||c==null){REED_$(this).append('<input type="hidden" name="REED_t" value="'+REED.getCookie("REED_t")+'" /><input type="hidden" name="REED_v" value="'+REED.getCookie("REED_v")+'" />');return true}else{var b;if(e.indexOf("?")!=-1){b="&"}else{b="?"}var f=e+b+"REED_t="+REED.getCookie("REED_t")+"&REED_v="+REED.getCookie("REED_v");this.setAttribute("action",f);return true}}})})}},_$:function(b){var a;if(typeof(b)=="undefined"){return REED_$}if(b.indexOf("none_")==0){a=REED_$}else{try{a=REED_$(b)}catch(c){}}if(typeof(REED_insideApp)=="undefined"||REED_insideApp){if(typeof(this.elements[b])=="undefined"){this.elements[b]=false}if(this.elements[b]!=false&&this.elements[b]!=this.pollId){return REED_$([])}if(a.length>=1){this.elements[b]=this.pollId}else{}}return a},doPollingJsChanges:function(){if(this.latestPollTimoutid!=null){this.latestPollTimoutid=null}if(typeof(reedResult)=="undefined"||typeof(reedResult.data)=="undefined"||typeof(reedResult.data.js)=="undefined"||reedResult.data.js.length==0){return}this.pollId++;this.runJses(2);var c=true;for(var b in this.elements){if(!this.elements.hasOwnProperty(b)){continue}if(!this.elements[b]){c=false;break}}if(!c&&!this.documentReady){var a=new Date().getTime()-this.initTime;if(a>this.domTimeout){this.showBody()}this.latestPollTimoutid=setTimeout("REED.doPollingJsChanges()",100)}else{this.showBody()}},showBody:function(){REED_$("style#reedge_hide_body").remove();if(this.hideBodyTimeoutId!=null){clearTimeout(this.hideBodyTimeoutId)}},do_ga:function(isRequeued){if(REED.gaRequeuedCnt>35){return}if(typeof(REED_tst)=="undefined"){REED.gaRequeuedCnt++;setTimeout("REED.do_ga(true)",300);return}var slot=5;if(typeof(REED_ga_slot)!="undefined"){slot=REED_ga_slot}var tracker=null;if(typeof(pageTracker)!="undefined"){tracker=pageTracker}if(typeof(REED_pageTracker)!="undefined"){var customTracker=null;eval("if(typeof("+REED_pageTracker+')!="undefined") customTracker = '+REED_pageTracker+";");if(customTracker!=null){tracker=customTracker}}for(var tst_id in REED_tst){if(!REED_tst.hasOwnProperty(tst_id)){continue}var d=REED_tst[tst_id];var varName="CONVERT-"+tst_id;var varValue;var avch=40;if(d.stk.length<1){return}if(d.stk.length==1){varValue=d.stk[0].vn}else{var maxCharsPerV=Math.floor(avch/d.stk.length);varValue="";for(var i=0;i<d.stk.length;i++){varValue+=("/"+d.stk[i].vn.replace(/\s{2,}/g,"_").replace(/\s/g,"_").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$|[^a-zA-Z0-9\s-_]/g,"").substr(0,maxCharsPerV))}varValue=varValue.substr(1);var escaped_varValue=escape(varValue);if(escaped_varValue.length>avch){varValue=varValue.substr(0,varValue.length-escaped_varValue.length+avch)}}if(tracker!=null){try{tracker._addDevId("RVchy");tracker._setCustomVar(slot,varName,varValue,1);tracker._trackEvent("Convert_Events","View_var",varValue,1,true)}catch(e){}}else{if(typeof(_gaq)!="undefined"){_gaq.push(["_addDevId","RVchy"]);_gaq.push(["_setCustomVar",slot,varName,varValue,1]);_gaq.push(["_trackEvent","Convert_Events","View_var",varValue,1,true])}}return}},do_km:function(c){for(var a in REED_tst){if(!REED_tst.hasOwnProperty(a)){continue}var f=REED_tst[a];var h="CONVERT-"+a;var g;if(f.stk.length<1){return}if(f.stk.length==1){g=f.stk[0].vn}else{g="";for(var b=0;b<f.stk.length;b++){g+=("/"+f.stk[b].vn.replace(/\s{2,}/g,"_").replace(/\s/g,"_").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$|[^a-zA-Z0-9\s-_]/g,""))}g=g.substr(1)}if(typeof(_kmq)!="undefined"){var e={};e[h]=g;_kmq.push(["set",e])}return}},handleGaPush:function(a){if(typeof(this.ga_pushes[a[0]])=="undefined"){this.ga_pushes[a[0]]=[]}this.ga_pushes[a[0]].push(a)},doAutoPickedTransactionData:function(){if(!this.done_reed_tran_data){if(typeof(this.ga_pushes._addTrans)!="undefined"){var a=0;for(var b=0;b<this.ga_pushes._addItem.length;b++){a+=parseInt(this.ga_pushes._addItem[b][6])}this.pushData({trid:this.ga_pushes._addTrans[0][1],val:this.ga_pushes._addTrans[0][3],pno:a},"rev_track",true)}}},addRevenueData:function(c,a,b){if(typeof(c)=="undefined"||c==""){return}this.done_reed_tran_data=true;this.revenueData={trid:c,val:a,pno:b};this.sendRevenueData()},sendRevenueData:function(){if(typeof(reedResult)=="undefined"){setTimeout("REED.sendRevenueData()",300);return}this.pushData({trid:this.revenueData.trid,val:this.revenueData.val,pno:this.revenueData.pno},"rev_track",true)},redirect:function(a){a=a.replace(/[\/\s\t]+$/,"");if(window.location.href.indexOf("editor.convertexperiments.com")==-1){var b=window.location.href.replace(/[\/\s\t]+$/,"");if(b!=a){window.location.href=a}}else{alert("This variation will redirect users to "+a+" \nThe redirect is not visible here but it will be later on when you can do a Live Preview.")}},finish:function(){},fixMissingBrowserjQuery1_9:function(){var a=function(d){d=d.toLowerCase();var c=/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[];return{browser:c[1]||"",version:c[2]||"0"}};matched=a(navigator.userAgent);var b={};if(matched.browser){b[matched.browser]=true;b.version=matched.version}return b}};if(typeof(jQuery)!="undefined"&&(typeof(REED_do_not_track)=="undefined"||!REED_do_not_track)){if(typeof(REED_s)!="undefined"){REED.init(REED_s);(function(){var a=REED_$.fn.css;REED_$.fn.css=function(b,c){if(b=="cssText"&&typeof(c)=="undefined"){try{return this.get(0).style.cssText}catch(d){console.log("error "+d)}}else{return a.apply(this,arguments)}}})();REED_$(document).ready(function(){REED.documentReady=true;REED.footerInit()})}}};
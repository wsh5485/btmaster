var language="zh";var enablePast=0;var fixedX=-1;var fixedY=-1;var startAt=1;var showWeekNumber=0;var showToday=1;var imgDir="images/calendar/";var dayName="日";var selectDateMessage={zh:"Go"};var monthName={zh:new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月")};var monthName2={zh:new Array("1","2","3","4","5","6","7","8","9","10","11","12")};if(startAt==0){dayName={zh:new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六")};}else{dayName={zh:new Array("一","二","三","四","五","六","日")};}var crossobj,crossMonthObj,crossYearObj,monthSelected,yearSelected,dateSelected,omonthSelected,oyearSelected,odateSelected,monthConstructed,yearConstructed,intervalID1,intervalID2,timeoutID1,timeoutID2,ctlToPlaceValue,ctlNow,dateFormat,nStartingYear,selDayAction,isPast;var visYear=0;var visMonth=0;var bPageLoaded=false;var ie=document.all;var dom=document.getElementById;var ns4=document.layers;var today=new Date();var dateNow=today.getDate();var monthNow=today.getMonth();var yearNow=today.getFullYear();var timeNow=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();var imgsrc=new Array("pcaldrop1.gif","pcaldrop2.gif","pcalleft1.gif","pcalleft2.gif","pcalright1.gif","pcalright2.gif");var img=new Array();var bShow=false;function hideElement(c,d){if(ie){for(i=0;i<document.all.tags(c).length;i++){obj=document.all.tags(c)[i];if(!obj||!obj.offsetParent){continue;}objLeft=obj.offsetLeft;objTop=obj.offsetTop;objParent=obj.offsetParent;while(objParent.tagName.toUpperCase()!="BODY"){objLeft+=objParent.offsetLeft;objTop+=objParent.offsetTop;objParent=objParent.offsetParent;}objHeight=obj.offsetHeight;objWidth=obj.offsetWidth;if((d.offsetLeft+d.offsetWidth)<=objLeft){}else{if((d.offsetTop+d.offsetHeight)<=objTop){}else{if(d.offsetTop>=(objTop+objHeight+obj.height)){}else{if(d.offsetLeft>=(objLeft+objWidth)){}else{obj.style.visibility="hidden";}}}}}}}function showElement(c){if(ie){for(i=0;i<document.all.tags(c).length;i++){obj=document.all.tags(c)[i];if(!obj||!obj.offsetParent){continue;}obj.style.visibility="";}}}function HolidayRec(f,c,g,e){this.d=f;this.m=c;this.y=g;this.desc=e;}var HolidaysCounter=0;var Holidays=new Array();function addHoliday(f,c,g,e){Holidays[HolidaysCounter++]=new HolidayRec(f,c,g,e);}if(dom){for(i=0;i<imgsrc.length;i++){img[i]=new Image;img[i].src=imgDir+imgsrc[i];}document.write('<div onclick="bShow=true" id="calendar" style="z-index:999;position:absolute;visibility:hidden;"><table width="'+((showWeekNumber==1)?250:220)+'" style="border:1px solid #46BEE4;"bgcolor="#ffffff"><tr bgcolor="#46BEE4"><td><table width="'+((showWeekNumber==1)?248:218)+'"><tr><td style="padding:2px;"><font color="#ffffff"><b><span id="caption"></span></b></font></td><td align="right"><a href="javascript:hideCalendar()"><img src="'+imgDir+'pcalclose.gif" width="15" height="13" border="0" /></a></td></tr></table></td></tr><tr><td style="padding:5px" bgcolor="#ffffff"><span id="content"></span></td></tr>');if(showToday==1){document.write('<tr bgcolor="#f0f0f0"><td style="padding:5px" align="center"><span id="lblToday"></span></td></tr>');}document.write('</table></div><div id="selectMonth" style="z-index:999;position:absolute;visibility:hidden;"></div><div id="selectYear" style="z-index:999;position:absolute;visibility:hidden;"></div>');}var styleAnchor="text-decoration:none;color:black;";var styleLightBorder="border:1px solid #a0a0a0;";function swapImage(d,c){if(ie){document.getElementById(d).setAttribute("src",imgDir+c);}}function init(){if(!ns4){crossobj=(dom)?document.getElementById("calendar").style:ie?document.all.calendar:document.calendar;hideCalendar();crossMonthObj=(dom)?document.getElementById("selectMonth").style:ie?document.all.selectMonth:document.selectMonth;crossYearObj=(dom)?document.getElementById("selectYear").style:ie?document.all.selectYear:document.selectYear;monthConstructed=false;yearConstructed=false;if(showToday==1){document.getElementById("lblToday").innerHTML='今天： <a onmousemove="window.status=\'当前月\'" onmouseout="window.status=\'\'" title="当前月" style="'+styleAnchor+'" href="javascript:monthSelected=monthNow;yearSelected=yearNow;constructCalendar();">星期'+dateNow+","+yearNow+"年"+monthName[language][monthNow].substring(0,3)+dayName[language][(today.getDay()-startAt==-1)?6:(today.getDay()-startAt)]+", "+dateNow+"</a>";}sHTML1='<span id="spanLeft" style="cursor:pointer"  onclick="decMonth()"  onmousedown="clearTimeout(timeoutID1);timeoutID1=setTimeout(\'StartDecMonth()\',500)" onmouseup="clearTimeout(timeoutID1);clearInterval(intervalID1)">&nbsp<img id="changeLeft" src="'+imgDir+'pcalleft1.gif" width="10" height="11" border="0">&nbsp</span>&nbsp;';sHTML1+='<span id="spanRight" style="cursor:pointer"  onclick="incMonth()" onmousedown="clearTimeout(timeoutID1);timeoutID1=setTimeout(\'StartIncMonth()\',500)" onmouseup="clearTimeout(timeoutID1);clearInterval(intervalID1)">&nbsp<img id="changeRight" src="'+imgDir+'pcalright1.gif" width="10" height="11" border="0">&nbsp</span>&nbsp;';sHTML1+='<span id="spanMonth" style="cursor:pointer"  onclick="popUpMonth()"></span>&nbsp;';sHTML1+='<span id="spanYear" style="cursor:pointer"  onclick="popUpYear()"></span>&nbsp;';document.getElementById("caption").innerHTML=sHTML1;bPageLoaded=true;}}function hideCalendar(){crossobj.visibility="hidden";if(crossMonthObj!=null){crossMonthObj.visibility="hidden";}if(crossYearObj!=null){crossYearObj.visibility="hidden";}showElement("SELECT");showElement("APPLET");}function padZero(c){return(c<10)?"0"+c:c;}function constructDate(f,c,g,e){sTmp=dateFormat;sTmp=sTmp.replace("dd","<e>");sTmp=sTmp.replace("d","<d>");sTmp=sTmp.replace("<e>",padZero(f));sTmp=sTmp.replace("<d>",f);sTmp=sTmp.replace("mmmm","<p>");sTmp=sTmp.replace("mmm","<o>");sTmp=sTmp.replace("mm","<n>");sTmp=sTmp.replace("m","<m>");sTmp=sTmp.replace("<m>",c+1);sTmp=sTmp.replace("<n>",padZero(c+1));sTmp=sTmp.replace("<o>",monthName[language][c]);sTmp=sTmp.replace("<p>",monthName2[language][c]);sTmp=sTmp.replace("yyyy",g);sTmp=sTmp.replace("yy",padZero(g%100));return sTmp.replace("tt",e);}function closeCalendar(){var c=new Date();var d=c.getHours()+":"+c.getMinutes()+":"+c.getSeconds()+"";hideCalendar();ctlToPlaceValue.value=constructDate(dateSelected,monthSelected,yearSelected,d);}function StartDecMonth(){intervalID1=setInterval("decMonth()",80);}function StartIncMonth(){intervalID1=setInterval("incMonth()",80);}function incMonth(){monthSelected++;if(monthSelected>11){monthSelected=0;yearSelected++;}constructCalendar();}function decMonth(){monthSelected--;if(monthSelected<0){monthSelected=11;yearSelected--;}constructCalendar();}function constructMonth(){popDownYear();if(!monthConstructed){sHTML="";for(i=0;i<12;i++){sName=monthName[language][i];if(i==monthSelected){sName="<b>"+sName+"</b>";}sHTML+='<tr><td id="m'+i+'" style="cursor:pointer" onclick="monthConstructed=false;monthSelected='+i+';constructCalendar();popDownMonth();event.cancelBubble=true"><font color="#46BEE4">&nbsp;'+sName+"&nbsp;</font></td></tr>";}document.getElementById("selectMonth").innerHTML='<table width="70" style="border:1px solid #a0a0a0;" bgcolor="#f0f0f0" cellspacing="0" >'+sHTML+"</table>";monthConstructed=true;}}function popUpMonth(){if(visMonth==1){popDownMonth();visMonth--;}else{constructMonth();crossMonthObj.visibility=(dom||ie)?"visible":"show";crossMonthObj.left=(parseInt(crossobj.left)+50)+"px";crossMonthObj.top=(parseInt(crossobj.top)+26)+"px";hideElement("SELECT",document.getElementById("selectMonth"));hideElement("APPLET",document.getElementById("selectMonth"));visMonth++;}}function popDownMonth(){crossMonthObj.visibility="hidden";visMonth=0;}function incYear(){for(i=0;i<7;i++){newYear=(i+nStartingYear)+1;if(newYear==yearSelected){txtYear='<span style="color:#006;font-weight:bold;">&nbsp;'+newYear+"&nbsp;</span>";}else{txtYear='<span style="color:#006;">&nbsp;'+newYear+"&nbsp;</span>";}document.getElementById("y"+i).innerHTML=txtYear;}nStartingYear++;bShow=true;}function decYear(){for(i=0;i<7;i++){newYear=(i+nStartingYear)-1;if(newYear==yearSelected){txtYear='<span style="color:#006;font-weight:bold">&nbsp;'+newYear+"&nbsp;</span>";}else{txtYear='<span style="color:#006;">&nbsp;'+newYear+"&nbsp;</span>";}document.getElementById("y"+i).innerHTML=txtYear;}nStartingYear--;bShow=true;}function selectYear(c){yearSelected=parseInt(c+nStartingYear);yearConstructed=false;constructCalendar();popDownYear();}function constructYear(){popDownMonth();sHTML="";if(!yearConstructed){sHTML='<tr><td align="center" style="cursor:pointer" onmousedown="clearInterval(intervalID1);intervalID1=setInterval(\'decYear()\',30)" onmouseup="clearInterval(intervalID1)"><font color="#46BEE4">-</font></td></tr>';j=0;nStartingYear=yearSelected-3;for(i=(yearSelected-3);i<=(yearSelected+3);i++){sName=i;if(i==yearSelected){sName="<b>"+sName+"</b>";}sHTML+='<tr><td id="y'+j+'"  style="cursor:pointer" onclick="selectYear('+j+');event.cancelBubble=true"><font color="#46BEE4">&nbsp;'+sName+"&nbsp;</font></td></tr>";j++;}sHTML+='<tr><td align="center" style="cursor:pointer" onmousedown="clearInterval(intervalID2);intervalID2=setInterval(\'incYear()\',30)" onmouseup="clearInterval(intervalID2)"><font color="#46BEE4">+</font></td></tr>';document.getElementById("selectYear").innerHTML='<table width="44" cellspacing="0" bgcolor="#f0f0f0" style="border:1px solid #a0a0a0;" >'+sHTML+"</table>";yearConstructed=true;}}function popDownYear(){clearInterval(intervalID1);clearTimeout(timeoutID1);clearInterval(intervalID2);clearTimeout(timeoutID2);crossYearObj.visibility="hidden";visYear=0;}function popUpYear(){var c;if(visYear==1){popDownYear();visYear--;}else{constructYear();crossYearObj.visibility=(dom||ie)?"visible":"show";c=parseInt(crossobj.left)+document.getElementById("spanYear").offsetLeft;if(ie){c+=6;}crossYearObj.left=c+"px";crossYearObj.top=(parseInt(crossobj.top)+26)+"px";visYear++;}}function WeekNbr(c){year=c.getFullYear();month=c.getMonth()+1;if(startAt==0){day=c.getDate()+1;}else{day=c.getDate();}a=Math.floor((14-month)/12);y=year+4800-a;m=month+12*a-3;b=Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400);J=day+Math.floor((153*m+2)/5)+365*y+b-32045;d4=(((J+31741-(J%7))%146097)%36524)%1461;L=Math.floor(d4/1460);d1=((d4-L)%365)+L;week=Math.floor(d1/7)+1;return week;}function constructCalendar(){var f=Array(31,0,31,30,31,30,31,31,30,31,30,31);var d;var c=new Date(yearSelected,monthSelected,1);var g;if(monthSelected==1){g=new Date(yearSelected,monthSelected+1,1);g=new Date(g-(24*60*60*1000));numDaysInMonth=g.getDate();}else{numDaysInMonth=f[monthSelected];}datePointer=0;dayPointer=c.getDay()-startAt;if(dayPointer<0){dayPointer=6;}sHTML='<table border="0"><tr>';if(showWeekNumber==1){sHTML+='<td width="27"><b>星期</b></td><td width="1" rowspan="7" bgcolor="#d0d0d0" style="padding:0;"><img src="'+imgDir+'divider.gif" width="1"></td>';}for(e=0;e<7;e++){sHTML+='<td width="27" align="right"><b><font color="#46BEE4">'+dayName[language][e]+"</font></b></td>";}sHTML+="</tr><tr>";if(showWeekNumber==1){sHTML+='<td align="right">'+WeekNbr(c)+"&nbsp;</td>";}for(var e=1;e<=dayPointer;e++){sHTML+="<td>&nbsp;</td>";}for(datePointer=1;datePointer<=numDaysInMonth;datePointer++){dayPointer++;sHTML+='<td align="right">';sStyle=styleAnchor;if((datePointer==odateSelected)&&(monthSelected==omonthSelected)&&(yearSelected==oyearSelected)){sStyle+=styleLightBorder;}sHint="";for(k=0;k<HolidaysCounter;k++){if((parseInt(Holidays[k].d)==datePointer)&&(parseInt(Holidays[k].m)==(monthSelected+1))){if((parseInt(Holidays[k].y)==0)||((parseInt(Holidays[k].y)==yearSelected)&&(parseInt(Holidays[k].y)!=0))){sStyle+="background-color:#fdd;";sHint+=sHint==""?Holidays[k].desc:"\n"+Holidays[k].desc;}}}sHint=sHint.replace('/"/g',"&quot;");d="onmousemove=\"window.status='"+selectDateMessage[language].replace("[date]",constructDate(datePointer,monthSelected,yearSelected,timeNow))+"'\" onmouseout=\"window.status=''\" ";if(enablePast==0&&((yearSelected<yearNow)||(monthSelected<monthNow)&&(yearSelected==yearNow)||(datePointer<dateNow)&&(monthSelected==monthNow)&&(yearSelected==yearNow))){selDayAction='href="javascript:dateSelected='+datePointer+';closeCalendar();"';isPast=1;}else{selDayAction='href="javascript:dateSelected='+datePointer+';closeCalendar();"';isPast=0;}if((datePointer==dateNow)&&(monthSelected==monthNow)&&(yearSelected==yearNow)){sHTML+="<b><a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+"><font color=#ff0000>&nbsp;"+datePointer+"</font>&nbsp;</a></b>";}else{if(dayPointer%7==(startAt*-1)+1){if(isPast==1){sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</a>";}else{sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#54A6E2>"+datePointer+"</font>&nbsp;</a>";}}else{if((dayPointer%7==(startAt*-1)+7&&startAt==1)||(dayPointer%7==startAt&&startAt==0)){if(isPast==1){sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</a>";}else{sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#54A6E2>"+datePointer+"</font>&nbsp;</a>";}}else{if(isPast==1){sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</a>";}else{sHTML+="<a "+d+' title="'+sHint+"\" style='"+sStyle+"' "+selDayAction+">&nbsp;<font color=#46BEE4>"+datePointer+"</font>&nbsp;</a>";}}}}sHTML+="";if((dayPointer+startAt)%7==startAt){sHTML+="</tr><tr>";if((showWeekNumber==1)&&(datePointer<numDaysInMonth)){sHTML+='<td align="right">'+(WeekNbr(new Date(yearSelected,monthSelected,datePointer+1)))+"&nbsp;</td>";}}}document.getElementById("content").innerHTML=sHTML;document.getElementById("spanMonth").innerHTML="&nbsp;"+monthName[language][monthSelected]+'&nbsp;<img id="changeMonth" src="'+imgDir+'pcaldrop1.gif" width="12" height="10" border="0">';document.getElementById("spanYear").innerHTML="&nbsp;"+yearSelected+'&nbsp;<img id="changeYear" src="'+imgDir+'pcaldrop1.gif" width="12" height="10" border="0">';}function showCalendar(c,l,g,h,e,f,d){if(h!=null&&h!=""){language=h;}if(e!=null){enablePast=e;}else{enablePast=0;}if(f!=null){fixedX=f;}else{fixedX=-1;}if(d!=null){fixedY=d;}else{fixedY=-1;}if(showToday==1){document.getElementById("lblToday").innerHTML='今天： <a onmousemove="window.status=\'当前月\'" onmouseout="window.status=\'\'" title="当前月" style="'+styleAnchor+'" href="javascript:monthSelected=monthNow;yearSelected=yearNow;constructCalendar();">星期'+dayName[language][(today.getDay()-startAt==-1)?6:(today.getDay()-startAt)]+","+yearNow+"年"+monthName[language][monthNow].substring(0,3)+dateNow+"日</a>";}popUpCalendar(c,l,g);}function popUpCalendar(c,g,f){var e=0;var d=0;if(bPageLoaded){if(crossobj.visibility=="hidden"){ctlToPlaceValue=g;dateFormat=f;formatChar=" ";aFormat=dateFormat.split(formatChar);if(aFormat.length<3){formatChar="/";aFormat=dateFormat.split(formatChar);if(aFormat.length<3){formatChar=".";aFormat=dateFormat.split(formatChar);if(aFormat.length<3){formatChar="-";aFormat=dateFormat.split(formatChar);if(aFormat.length<3){formatChar="";}}}}tokensChanged=0;if(formatChar!=""){aData=g.value.split(formatChar);for(i=0;i<3;i++){if((aFormat[i]=="d")||(aFormat[i]=="dd")){dateSelected=parseInt(aData[i],10);tokensChanged++;}else{if((aFormat[i]=="m")||(aFormat[i]=="mm")){monthSelected=parseInt(aData[i],10)-1;tokensChanged++;}else{if(aFormat[i]=="yyyy"){yearSelected=parseInt(aData[i],10);tokensChanged++;}else{if(aFormat[i]=="mmm"){for(j=0;j<12;j++){if(aData[i]==monthName[language][j]){monthSelected=j;tokensChanged++;}}}else{if(aFormat[i]=="mmmm"){for(j=0;j<12;j++){if(aData[i]==monthName2[language][j]){monthSelected=j;tokensChanged++;}}}}}}}}}if((tokensChanged!=3)||isNaN(dateSelected)||isNaN(monthSelected)||isNaN(yearSelected)){dateSelected=dateNow;monthSelected=monthNow;yearSelected=yearNow;}odateSelected=dateSelected;omonthSelected=monthSelected;oyearSelected=yearSelected;aTag=c;do{aTag=aTag.offsetParent;e+=aTag.offsetLeft;d+=aTag.offsetTop;}while(aTag.tagName!="BODY");crossobj.left=((fixedX==-1)?c.offsetLeft+e:fixedX)+"px";crossobj.top=((fixedY==-1)?c.offsetTop+d+c.offsetHeight+2:fixedY)+"px";constructCalendar(1,monthSelected,yearSelected);crossobj.visibility=(dom||ie)?"visible":"show";hideElement("SELECT",document.getElementById("calendar"));hideElement("APPLET",document.getElementById("calendar"));bShow=true;}else{hideCalendar();if(ctlNow!=c){popUpCalendar(c,g,f);}}ctlNow=c;}}document.onkeypress=function hidecal1(){if(event.keyCode==27){hideCalendar();}};document.onclick=function hidecal2(){if(!bShow){hideCalendar();}bShow=false;};if(document.all){window.attachEvent("onload",init);}else{window.addEventListener("load",init,false);}
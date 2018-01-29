window.onerror = function(msg, file, line, col, error) {
	//this will show any error message
	alert(msg);
}; 

var app = {};
app.deviceid = document.URL.split("?")[1];
app.groupName = document.URL.split("?")[2];	
if(!app.deviceid){ app.deviceid = ""; alert('Could not get deviceid')}
if(!app.groupName){ app.groupName = ""; alert('Could not get groupname')}

// app.deviceid = 'pl_a_tower';
app.imageElements = {};
app.videoElements = {};
app.imageElements.image1 = '<img id="img1" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image2 = '<img id="img2" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image3 = '<img id="img3" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
// app.imageElements.image4 = '<img id="img4" class="imgs" onerror="this.onerror=null;this.src=\'default.png\';"></img>';
app.imageElements.image5 = '<img id="img5" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image7 = '<img id="img7" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';

app.videoElements.video1 = '<video id="vid1" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video2 = '<video id="vid2" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
app.videoElements.video3 = '<video id="vid3" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
// app.videoElements.video4 = '<video id="vid4" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video5 = '<video id="vid5" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video6 = '<video id="vid6" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video7 = '<video id="vid7" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
app.resourceFolder = "society";
app.advtFolder = 'advt';

app.config = {}
app.visibleCampaign = "campaign1";
app.campaignInterval;
app.campaignIntervalTime;

app.firstChannelInterval;
app.firstChannelIntervalTime;

app.secondChannelInterval;
app.secondChannelIntervalTime;

app.thirdChannelInterval;
app.thirdChannelIntervalTime;

app.fourthChannelInterval;
app.fourthChannelIntervalTime;

app.videoAndSOSInterval;
app.videoAndSOSlIntervalTime;

app.videoInterval;
app.videoIntervalTime;

app.sosInterval;
app.sosIntervalTime;


app.masterPlanInterval;

app.isuserloggedin = false;

var URL = "..";
// var interval1 = 1000;
// var interval2 = 1000;
// var interval3 = 1000;
// var interval4 = 1000;
/*IN MIUNTES*/

window.onload = function(){

	;(function($) {
	    $.fn.textfill = function(options) {
	        var fontSize = options.maxFontPixels;
	        var ourText = $('span:visible:first', this);
	        var maxHeight = $(this).height();
	        var maxWidth = $(this).width();
	        var textHeight;
	        var textWidth;
	        do {
	            ourText.css('font-size', fontSize + 'vw');
	            textHeight = ourText.height();
	            textWidth = ourText.width();
	            fontSize = fontSize - 0.1;
	        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 0.1);
	        return this;
	    }
	})(jQuery);

	;(function($) {
	    $.fn.textfillWeather = function(options) {
	        var fontSize = options.maxFontPixels;
	        var ourText = $('div:visible:first', this);
	        // var maxHeight = $('div:visible:first', this).height();
	        var maxWidth = $('div:visible:first', this)	.innerWidth();
	        var textHeight;
	        var textWidth;
	        do {
	            ourText.css('font-size', fontSize + 'vw');
	            // textHeight = ourText.height();
	            textWidth = ourText[0].scrollWidth;
	            fontSize = fontSize - 0.1;
	        } while ((textWidth > maxWidth) && fontSize > 1);
	        return this;
	    }
	})(jQuery);

	;(function($) {
	    $.fn.textverticalalign = function(options) {
	        var initialTop = options.initialTop;
	        var ourText = $('span:visible:first', this);
	        var totalHeight = $('body').height()
	        var textTop;
	        do {
	            ourText.css('top', initialTop + 'vw');
	            textTop = ourText.position().top;
	            textBottom = totalHeight - ourText.height() - ourText.position().top;
	            // textHeight = ourText.height();
	            initialTop = initialTop - 0.1;
	        } while ((textBottom <= textTop) && initialTop > 0);
	        return this;
	    }
	})(jQuery);


	

	  	
	  	// $(".myHeader .myAppDateLabel").text(moment().format('MMM DD, YYYY'))
	  	// $(".myHeader .myAppTimeLabel").text(moment().format('hh:mm:ss A'))
	  	// $(".myHeader .myAppTimeLabel").text(moment().format('hh:mm:ss A'))
	// setInterval(function(){
 //  		$(".myHeader .myAppDateLabel").text(moment().format('MMM DD, YYYY'))
	//   	$(".myHeader .myAppTimeLabel").text(moment().format('hh:mm:ss A'))
 //  	},1000)

	if(moment().year() >= 2017){
		$(".myHeader .myAppDateLabel").text(moment().format('Do MMM,YY hh:mm A'))
	}
	updateTime();
  	function updateTime() {
	    setTimeout(function() {
			if(moment().year() >= 2017){
	    		$(".myHeader .myAppDateLabel").text(moment().format('Do MMM,YY hh:mm A'))
	    	}
	    	// $(".myHeader .myAppDateLabel").text(moment().format('MMM DD, YYYY'))
		  	// $(".myHeader .myAppTimeLabel").text(moment().format('hh:mm:ss A'))
		  	// $(".myHeader .myAppTimeLabel").text(moment().format('hh:mm:ss A'))
	        updateTime();       // repeat
	    }, 60 * 1000)
	}

	function loadConfig(callback){
		// $.ajax({
		// 	url : "config.json",
		// 	datatype : "json",
		// 	complete : function(jqXHR, statusText){
		// 		callback(jqXHR.status, jqXHR.responseText);
		// 	}
		// })
		// pankaj Shinde
		// configData = {
		// 	"url":"..",
		// 	"master_plan_interval":60000,
		// 	"firebaseconfiguration":{
		// 		"apiKey": "AIzaSyCO2wgpjMMusdCTYquQewx5g0ucOFbdl-Q",
		// 		"authDomain": "digitaladvert-a688e.firebaseapp.com",
		// 		"databaseURL": "https://digitaladvert-a688e.firebaseio.com",
		// 		"projectId": "digitaladvert-a688e",
		// 		"storageBucket": "digitaladvert-a688e.appspot.com",
		// 		"messagingSenderId": "150823123548"
		// 	  },
		// 	"firstChannelIntervalTime" : 15,
		// 	"secondChannelIntervalTime" : 15,
		// 	"thirdChannelIntervalTime" : 15,
		// 	"fourthChannelIntervalTime" : 15,
		// 	"videoAndSOSIntervalTime" : 1,
		// 	"campaignIntervalTime" : 60
		// }
		//  LGD
		configData = {
			"url":"..",
			"master_plan_interval":60000,
			// "firebaseconfiguration":{
			//     apiKey: "AIzaSyCZAKwAQNkBed1tqss0qcepaX2koH1XSss",
			//     authDomain: "digitaladvertisemntsviewdata.firebaseapp.com",
			//     databaseURL: "https://digitaladvertisemntsviewdata.firebaseio.com",
			//     projectId: "digitaladvertisemntsviewdata",
			//     storageBucket: "digitaladvertisemntsviewdata.appspot.com",
			//     messagingSenderId: "1075588574618"
			//   },
			  "firebaseconfiguration":{
			    apiKey: "AIzaSyB97ywis2ZFyoKpJ_wrMdJqgsJ7S_CDWyQ",
			    authDomain: "for-lgd-schedule.firebaseapp.com",
			    databaseURL: "https://for-lgd-schedule.firebaseio.com",
			    projectId: "for-lgd-schedule",
			    storageBucket: "for-lgd-schedule.appspot.com",
			    messagingSenderId: "848626933775"
			  },
			"firstChannelIntervalTime" : 20,
			"secondChannelIntervalTime" : 20,
			"thirdChannelIntervalTime" : 20,
			"fourthChannelIntervalTime" : 20,
			"fullscreenChannelIntervalTime" : 10,
			"videoAndSOSIntervalTime" : 1,
			"videoIntervalTime" : 1,
			"sosIntervalTime" : 1,
			"campaignIntervalTime" : 60
		}
		callback(200,configData)
	}

	loadConfig(function(statusCode, configData){
	 	// configData = JSON.parse(configData);
		if(statusCode == 200){
			URL = configData.url;
			app.config = configData.firebaseconfiguration;
			app.masterPlanInterval = configData.master_plan_interval;
			app.campaignIntervalTime = configData.campaignIntervalTime;
			app.firstChannelIntervalTime = configData.firstChannelIntervalTime;
			app.secondChannelIntervalTime = configData.secondChannelIntervalTime;
			app.thirdChannelIntervalTime = configData.thirdChannelIntervalTime;
			app.fourthChannelIntervalTime = configData.fourthChannelIntervalTime;
			app.fullscreenChannelIntervalTime = configData.fullscreenChannelIntervalTime;
			app.videoAndSOSIntervalTime = configData.videoAndSOSIntervalTime;
			app.videoIntervalTime = configData.videoIntervalTime;
			app.sosIntervalTime = configData.sosIntervalTime;
			// alert('initializing firebase');
			initializeFirebase(function(){
				// alert('firebase initialized')
				// alert('getting campaign')

			// recheckData = setInterval(function(){
				// if(ifFirebaseIsEstablished()){
					// getAvailableCampaign(function(campaignName){
						campaignName = "campaign1";
						// alert('Campaign received ' + campaignName)
						// console.log('here')
						// initializeChannels();
						initializeApp(campaignName);
						checkForVideoAndSOS();
					// })
					// clearInterval(recheckData)
				// }
				// else console.warn('Rechecking for data...')
			// },100)
			});
		}else{
			alert('config error');
		}
	});

// , 
	      					// `+weather.currently+`

		function getWeather(){
			$.simpleWeather({
			    location: 'Noida, UP',
			    woeid: '',
			    unit: 'c',
			    success: function(weather) {
			      html = 	`<div class="row" style="height:100%">
			      				<div class="col-xs-6" style="padding:0;height:100%;margin-top: -2px;">
			      					<div style="font-size:2.6vw;float:right"><i class="icon-`+weather.code+`"></i> `+weather.temp+`&deg;`+weather.units.temp+`,</div>
		      					</div>
					      		<div class="col-xs-6" style="padding:0;height:100%;">
					      			<div style="padding:0;font-size:1.5vw;height:50%;margin-left:10px;font-weight:700">
					      				`+weather.currently+ `
			      					</div>
			      					<div style="padding:0;font-size:1.5vw;font-weight:700;height:50%;margin-left:10px;line-height:1;">
					      				`+weather.city+ `
			      					</div>
		      					</div>
		  					</div>`
			  
			      $("#weather").html(html);
			      $('#weather > div > div:nth-child(2)').textfillWeather({ maxFontPixels: 1.5});
			    },
			    error: function(error) {
			    	console.debug(error);
			      $("#weather").html('<p>'+error+'</p>');
			    }
		  	});
		}
	getWeather();
	updateWeather();
  	function updateWeather() {
	    setTimeout(function() {
	    	if($("#weather").children().length == 0){
				getWeather();
				updateWeather();
			}
	    }, 300 * 1000)
	}

	// var weatherInterval = setInterval(function(){
	// 	if($("#weather").children().length == 0){
	// 		getWeather();
	// 	}else{
	// 		clearInterval(weatherInterval)
	// 	}
	// },5000)

	// var weatherInterval2 = setInterval(function(){
	// 	getWeather();
	// // },10000)
	// },900 * 1000)
  	// html = '<div class="row" style="height:100%"><div class="col-xs-4" style="padding:0;height:100%"><label style="font-size:1.3vw;"><i class="icon-'+32+'"></i> '+27+'&deg;'+'C'+'  Noida</label></div>';
	  //   html += '</div>';
	  
	  //     $("#weather").html(html);


	function getCurrentISODate(){
		// var tzoffset = (new Date()).getTimezoneOffset() * 60000;
		// return localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1) + "Z";
		start = moment(new Date());
		remainder = start.minute() % 20;
		return new moment(start).subtract(remainder,'minutes').startOf('minute').toISOString();
	}

	function getResType(resourceName){
		var resourceType = 'image'
		if(resourceName != ""){
			if(resourceName.split('.')[1].toUpperCase() == "JPG" || resourceName.split('.')[1].toUpperCase() == "JPEG" || resourceName.split('.')[1].toUpperCase() == "PNG"){
				resourceType = 'image'
			}else if(resourceName.split('.')[1].toUpperCase() == "MP4"){
				resourceType = 'video'
			}
		}else{
			resourceType = "image";
		}
		return resourceType;
	}

	// function initializeChannels(){
	// 	// function from firebaseController
	// 	initializeChannel1();
	// 	// initializeChannel2();
	// 	// initializeChannel3();
	// 	// initializeChannel4();
	// }

	function getAvailableCampaign(callback){
		getCampaignIntervalData(new moment(new Date()).startOf('hour').toISOString(),function(campaignData){
			app.visibleCampaign = "campaign1";
			app.firstChannelIntervalTime = 0.016667;
			// if(app.firstChannelInterval) clearInterval(app.firstChannelInterval);
			// var campaignData = JSON.parse('{ "name":"campaign1", "age":30, "city":"New York"}');
			if(campaignData && campaignData.campName){
				if(campaignData.campName =="campaign1"){
					$(".campaign1").show();
					$(".campaign2").hide();
					app.visibleCampaign = "campaign1";
				}else if(campaignData.campName == "campaign2"){
					$(".campaign2").show();
					$(".campaign1").hide();
					app.visibleCampaign = "campaign2";
				}else{
					app.visibleCampaign = "campaign1"
				}
			}else{
				app.visibleCampaign = "campaign1"
			}

			callback(app.visibleCampaign);
		});
	}


	function checkForVideoAndSOS(){
		// time as 1 mnute for video
		
		app.checkSOSData = function(){	
			getSOSData(new moment(new Date()).startOf('minute').toISOString(),function(sosData){
				
				// app.checkVideoData = function(){
					// getVideoData(new moment(new Date()).startOf('minute').toISOString(),function(videoData){
						if(!(Object.keys(sosData).length === 0 && sosData.constructor === Object)){
							// hide video and show sos
							$(".sosContent").show();
							// $(".videoContentRow").hide();
							// $(".multiContentRow").hide();

							$(".contentHolder5").empty();
							$(".contentHolder5").append('<div class="warningText"><span>'+ sosData.data.text +'</span></div>');
							$('.warningText').textfill({ maxFontPixels: 2 });
							$('.warningText').textverticalalign({ initialTop: 27 });
							// app.videoAndSOSIntervalTime = 30;
							// endTimeFOrCurrentSlot = moment(new Date());
							// remainder = 30 - endTimeFOrCurrentSlot.minute() % 30;
							// nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							// if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							// currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							// duration = nextEndTimeMinute - currentTimeMinute;
							// app.videoAndSOSIntervalTime = duration;
							app.sosIntervalTime = (((30 * 60) - new moment(new Date()).seconds()) * 1000)/60000
							// app.videoIntervalTime = (((30 * 60) - new moment(new Date()).seconds()) * 1000)/60000




						}else{
							// if(!(Object.keys(videoData).length === 0 && videoData.constructor === Object)){
							// 	// show video hide sos
							// 	$(".videoContentRow").show();
							// 	$(".sosContent").hide();
							// 	// $(".multiContentRow").hide();

							// 	$(".contentHolder6").empty();
							// 	$(".contentHolder6").append(app.videoElements.video6);
							// 	$(".contentHolder6 #vid6").append('<source src="' + URL + "/" + app.advtFolder + "/" + videoData.data.resName + '" type="video/mp4">');
							// 	$(".contentHolder6 #vid6").show();

							// 	// endTimeFOrCurrentSlot = moment(new Date());
							// 	// remainder = 1 - endTimeFOrCurrentSlot.minute() % 1;
							// 	// nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							// 	// if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							// 	// currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							// 	// duration = nextEndTimeMinute - currentTimeMinute;
							// 	// app.videoAndSOSIntervalTime = duration;

							// 	// app.videoAndSOSIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000
							// 	app.videoIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000

							// }else{
								// hide sos and show video
								$(".videoContentRow").hide();
								// $(".multiContentRow").show();
								$(".sosContent").hide();
								// $(".contentHolder5").empty();
								$(".contentHolder6").empty();
								// app.videoAndSOSIntervalTime =1;
								// app.videoAndSOSIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000
								// app.videoIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000
								app.sosIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000
							// }
							
						}
					// })
					// clearTimeout(app.videoInterval);
					// app.videoInterval = setTimeout(function(){
					// 	app.checkVideoData();
					// },app.videoIntervalTime * 60000)
				// }
				// app.checkVideoData();
				// clearTimeout(app.videoAndSOSInterval);
				// app.videoAndSOSInterval = setTimeout(function(){
				// 	checkForVideoAndSOS();
				// },app.videoAndSOSIntervalTime * 60000)

				// clearTimeout(app.sosInterval);
				

			})
			clearTimeout(app.sosInterval);
			app.sosInterval = setTimeout(function(){
				app.checkSOSData();
			},app.sosIntervalTime * 60000)
		}
		app.checkSOSData();
	}



	function initializeApp(campaignName){
		app.visibleCampaign = campaignName;
		$(".loadingText").text('Just there...')

		function initializeFirstChannel(){
			getChannelData('ch1_p',getCurrentISODate(),function(firstChannelData){
				clearTimeout(app.firstChannelInterval);
				if(!(Object.keys(firstChannelData).length === 0 && firstChannelData.constructor === Object)){
						console.log('channel 1 updated')
						// console.log(firstChannelData);
						// console.info(moment(new Date()).startOf('minute').format('hh:mm:ss a'))
						$(".ovalWrapper").text(firstllArray.indexOf(firstChannelData.resName)+1 + "/" + firstllArray.length);

						if(getResType(firstChannelData.resName) == "image"){
							$("." + app.visibleCampaign + " .contentHolder1").empty();
							$("." + app.visibleCampaign + " .contentHolder1").append(app.imageElements.image1);
							$("." + app.visibleCampaign + " .contentHolder1 #img1").attr('src', URL + "/" + app.resourceFolder + "/" + firstChannelData.resName);
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").hide();
							$("." + app.visibleCampaign + " .contentHolder1 #img1").show();


							// function chekcColor() {
							//     var vibrant = new Vibrant($("#img1")[0]);
							//     var swatches = vibrant.swatches()
							//     for (var swatch in swatches)
							//         if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
							//             console.log(swatch, swatches[swatch].getHex())
							//     		$(".ovalWrapper").css('background-color',swatches[swatch].getHex())
							//     	}
							//     $("#img1")[0].removeEventListener('load', chekcColor, false);
							// }

							// $("#img1")[0].addEventListener('load', chekcColor, false);

						}else if(getResType(firstChannelData.resName) == "video"){
							console.log($("." + app.visibleCampaign + " .contentHolder1"));
							$("." + app.visibleCampaign + " .contentHolder1").empty();
							$("." + app.visibleCampaign + " .contentHolder1").append(app.videoElements.video1);
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").append('<source src="' + URL + "/" + app.resourceFolder + "/" + firstChannelData.resName + '" type="video/mp4">');
							$("." + app.visibleCampaign + " .contentHolder1 #img1").hide();
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").show();
						}

					if(firstChannelData.duration){
						// app.firstChannelIntervalTime = firstChannelData.duration;//-4;

						// currentTime = new moment(new Date());
						// remainingSecondsForCurrentMinute = 60 - currentTime.seconds();
						// endTime = new moment(currentTime).add(1,'minutes');
						// remainder = 1 - endTime.minute() % 1;
						// endTime.subtract(1, "minutes")
						// endTime.add(remainder, "minutes")
						// remainingMinutsForCurrentInterval = (endTime.minute() - currentTime.startOf('minute').minute()) * 60
						// if(remainingMinutsForCurrentInterval != 60)
						// 	secondss = (1 * 60) - remainingMinutsForCurrentInterval - remainingSecondsForCurrentMinute;
						// else
						// 	secondss = remainingMinutsForCurrentInterval - remainingSecondsForCurrentMinute;
						
						// app.firstChannelIntervalTime = (secondss/60);

						endTimeFOrCurrentSlot = moment(new Date());
						remainder = firstChannelData.duration - endTimeFOrCurrentSlot.minute() % firstChannelData.duration;
						nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
						if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

						currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

						duration = nextEndTimeMinute - currentTimeMinute;
						app.firstChannelIntervalTime = duration;
					}
					else{
						console.log("Got planned Data for " + "channel1");
						endTimeFOrCurrentSlot = moment(new Date());
						remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
						nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
						if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

						currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

						duration = nextEndTimeMinute - currentTimeMinute;
						app.firstChannelIntervalTime = duration;
					}
				}
				console.warn("ch1-> "+app.firstChannelIntervalTime)
				app.firstChannelInterval = setTimeout(function(){
					initializeFirstChannel();
				},app.firstChannelIntervalTime * 60000);
				$(".loadingDiv").hide()
			});
		}

		function initializeSecondChannel(){
			getChannelData('ch2_p',getCurrentISODate(),function(secondChannelData){
				clearTimeout(app.secondChannelInterval);
				if(!(Object.keys(secondChannelData).length === 0 && secondChannelData.constructor === Object)){
						console.log('channel 2 updated')
						// console.log(secondChannelData);
						// console.info(moment(new Date()).startOf('minute').format('hh:mm:ss a'))
						if(getResType(secondChannelData.resName) == "image"){
							$("." + app.visibleCampaign + " .contentHolder2").empty();
							$("." + app.visibleCampaign + " .contentHolder2").append(app.imageElements.image2);
							$("." + app.visibleCampaign + " .contentHolder2 #img2").attr('src', URL + "/" + app.advtFolder + "/" + secondChannelData.resName);
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").hide();
							$("." + app.visibleCampaign + " .contentHolder2 #img2").show();

						}else if(getResType(secondChannelData.resName) == "video"){
							// console.log($("." + app.visibleCampaign + " .contentHolder2"));
							$("." + app.visibleCampaign + " .contentHolder2").empty();
							$("." + app.visibleCampaign + " .contentHolder2").append(app.videoElements.video2);
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").append('<source src="' + URL + "/" + app.advtFolder + "/" + secondChannelData.resName + '" type="video/mp4">');
							$("." + app.visibleCampaign + " .contentHolder2 #img2").hide();
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").show();
						}

					
						if(secondChannelData.duration){
							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 5 - endTimeFOrCurrentSlot.minute() % 5;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.secondChannelIntervalTime = duration;
						}else{

							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.secondChannelIntervalTime = duration;
						}
				}
				console.warn("ch2-> "+app.secondChannelIntervalTime)
				app.secondChannelInterval = setTimeout(function(){
					// console.log('started')
					initializeSecondChannel();
				},app.secondChannelIntervalTime * 60000)
			});
		}

		function initializeThirdChannel(){
			getChannelData('ch3_p',getCurrentISODate(),function(thirdChannelData){
				clearTimeout(app.thirdChannelInterval);
				if(!(Object.keys(thirdChannelData).length === 0 && thirdChannelData.constructor === Object)){
						console.log('channel 3 updated')
						// console.log(thirdChannelData);
						// console.info(moment(new Date()).startOf('minute').format('hh:mm:ss a'))
						if(getResType(thirdChannelData.resName) == "image"){
							$("." + app.visibleCampaign + " .contentHolder3").empty();
							$("." + app.visibleCampaign + " .contentHolder3").append(app.imageElements.image3);
							$("." + app.visibleCampaign + " .contentHolder3 #img3").attr('src', URL + "/" + app.advtFolder + "/" + thirdChannelData.resName);
							$("." + app.visibleCampaign + " .contentHolder3 #vid3").hide();
							$("." + app.visibleCampaign + " .contentHolder3 #img3").show();

						}else if(getResType(thirdChannelData.resName) == "video"){
							// console.log($("." + app.visibleCampaign + " .contentHolder3"));
							$("." + app.visibleCampaign + " .contentHolder3").empty();
							$("." + app.visibleCampaign + " .contentHolder3").append(app.videoElements.video3);
							$("." + app.visibleCampaign + " .contentHolder3 #vid3").append('<source src="' + URL + "/" + app.advtFolder + "/" + thirdChannelData.resName + '" type="video/mp4">');
							$("." + app.visibleCampaign + " .contentHolder3 #img3").hide();
							$("." + app.visibleCampaign + " .contentHolder3 #vid3").show();
						}
						if(thirdChannelData.duration){
							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 5 - endTimeFOrCurrentSlot.minute() % 5;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.thirdChannelIntervalTime = duration;
						}else{
							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.thirdChannelIntervalTime = duration;
						}
				}
				console.warn("ch3-> "+app.thirdChannelIntervalTime)
				app.thirdChannelInterval = setTimeout(function(){
					console.log('started')
					initializeThirdChannel();
				},app.thirdChannelIntervalTime * 60000)
				$(".loadingDiv").hide()
			});
		}
		app.slide = function(){
			slideOutELement = ""
			slideInElement = ""
			if($(".multiContent div.multiContentRow").position().left == 0){
				slideOutELement = 'multiContentRow';
				slideInElement = 'fullscreenRow';
			}else{
				slideOutELement = 'fullscreenRow';
				slideInElement = 'multiContentRow';
			}


			$(".multiContent div." + slideOutELement).animate({
			        left: '-100%'
			    }, 500, function() {
			        $(this).css('left', '100%');
			        // $(this).appendTo('.multiContentRow');
			    });

			    $('.multiContent div.' + slideInElement ).animate({
			        left: '0'
			    }, 500);
		}
		initializeFullscreenChannel();
		function initializeFullscreenChannel(){
			// var format = 'HH:mm'
		 //  	var timeCurr = moment(new Date(),format),
		 //  	sh1BeforeTime = timeCurr.clone(),
		 //  	sh1BeforeTime = sh1BeforeTime.startOf('hour'),
		 //  	sh1AfterTime = sh1BeforeTime.clone(),
		 //  	sh1AfterTime = sh1AfterTime.add(8,'minute');

		  	
	 	//  	if (timeCurr.isBetween(sh1BeforeTime, sh1AfterTime)) {
	 	 		
				getChannelData('fs',new moment(new Date()).startOf('hour').toISOString(),function(fullscreenChannelData){
					clearTimeout(app.fullscreenChannelInterval);
					if(!(Object.keys(fullscreenChannelData).length === 0 && fullscreenChannelData.constructor === Object)){
							app.slide();
							console.log('fullscreenChannel updated')
							// console.log(fullscreenChannelData);
							// console.info(moment(new Date()).startOf('minute').format('hh:mm:ss a'))
							if(getResType(fullscreenChannelData.resName) == "image"){
								$(".contentHolder7").empty();
								$(".contentHolder7").append(app.imageElements.image7);
								$(".contentHolder7 #img7").attr('src', URL + "/" + app.advtFolder + "/" + fullscreenChannelData.resName);
								$(".contentHolder7 #vid7").hide();
								$(".contentHolder7 #img7").show();

							}else if(getResType(fullscreenChannelData.resName) == "video"){
								// console.log($(".contentHolder7"));
								$(".contentHolder7").empty();
								$(".contentHolder7").append(app.videoElements.video7);
								$(".contentHolder7 #vid7").append('<source src="' + URL + "/" + app.advtFolder + "/" + fullscreenChannelData.resName + '" type="video/mp4">');
								$(".contentHolder7 #img7").hide();
								$(".contentHolder7 #vid7").show();
							}

						
							

								// if user starts in between time then calcultae remaining time 
								// for that slot and get next content after that duration
								endTimeFOrCurrentSlot = moment(new Date());
								remainder = 10 - endTimeFOrCurrentSlot.minute() % 10;
								nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
								if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

								currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

								duration = nextEndTimeMinute - currentTimeMinute;
								app.fullscreenChannelIntervalTime = duration;
								

								slideToggleTimeout();
								function slideToggleTimeout(){
									// if user starts in between time then calcultae remaining time 
									// for that slot and get next content after that duration
									// endTimeForSlide = moment(new Date());
									// remainder = 8 - endTimeForSlide.minute() % 8;
									// nextEndTimeForSlide = moment(endTimeForSlide).add(remainder,"minutes").startOf('minute').minute()
									// if(nextEndTimeForSlide == 0) nextEndTimeForSlide = 60; 

									// currentTimeForSlide = moment(moment(new Date()).startOf('minute').toISOString()).minute();

									// duration = nextEndTimeForSlide - currentTimeForSlide;
									

									setTimeout(function(){
										// console.log('started')
										app.slide();
									},.25 * 60000)
									
								}
							
					}
					console.warn("fullscreenChannel-> "+app.fullscreenChannelIntervalTime)
					app.fullscreenChannelInterval = setTimeout(function(){
						// console.log('started')
						initializeFullscreenChannel();
					},app.fullscreenChannelIntervalTime * 60000)
				});
	 	 // 	}else{

	 	 // 		// if user starts in between time then calcultae remaining time 
				// // for that slot and get next content after that duration
				// endTimeFOrCurrentSlot = moment(new Date());
				// remainder = 60 - endTimeFOrCurrentSlot.minute() % 60;
				// nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
				// if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

				// currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

				// duration = nextEndTimeMinute - currentTimeMinute;
				// app.fullscreenChannelIntervalTime = duration;

	 	 // 		clearTimeout(app.fullscreenChannelInterval);
	 	 // 		console.warn("fullscreenChannel-> "+app.fullscreenChannelIntervalTime)
				// 	app.fullscreenChannelInterval = setTimeout(function(){
				// 		// console.log('started')
				// 		initializeFullscreenChannel();
				// 	},app.fullscreenChannelIntervalTime * 60000)

	 	 // 	}
		}

		function initializeFourthChannel(){
			getChannelData('tickers',getCurrentISODate(),function(fourthChannelData){
				clearTimeout(app.fourthChannelInterval);
				if(!(Object.keys(fourthChannelData).length === 0 && fourthChannelData.constructor === Object)){
						console.log('channel 4 updated')
						// console.log(fourthChannelData);
						// console.info(moment(new Date()).startOf('minute').format('hh:mm:ss a'))
						
						
							$(".contentHolder4").empty();
							$(".contentHolder4>div.marquee").empty();
							$(".contentHolder4").append('<div class="marquee"></div>');
							$(".contentHolder4>div.marquee").append('<p>' + fourthChannelData.text + '</p>');
							$(".contentHolder4>div.marquee").marquee({duration: 20000});

					
						// console.log("Got ticker Data for " + "channel4");
						// if user starts in between time then calcultae remaining time 
						// for that slot and get next content after that duration
							// endTimeFOrCurrentSlot = moment(new Date());
							// remainder = 15 - endTimeFOrCurrentSlot.minute() % 15;
							// nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							// if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							// currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							// duration = nextEndTimeMinute - currentTimeMinute;
							// app.fourthChannelIntervalTime = duration;
				}
				console.warn("ch4-> "+app.fourthChannelIntervalTime)
				app.fourthChannelInterval = setTimeout(function(){
					// console.log('started')
					initializeFourthChannel();
				},app.fourthChannelIntervalTime * 60000)
			});
		}

		// initializeFirstChannel();
		// initializeSecondChannel();
		// initializeThirdChannel();
		// initializeFourthChannel();
		
		// db.collection("ch1_g").doc(app.deviceid).collection('data')
		db.collection("ch1_g").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          firstll = new CircularList();
	          firstllArray = [];
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              firstllArray.push(value.resName);
		              firstll.add(value.resName, value.duration);
		        });
              console.log("Initializing Channel 1 general...=>" + querySnapshot.size);
		      // }else{
		      // 	// window.location.reload()
		      // 	firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // 		console.log('signed in')
		      // 	})    
		      // }
	    });

	    db.collection("ch1_p").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	      	if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          initializeFirstChannel();
	      	// }else{
	      		// window.location.reload()
	      		// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      		// console.log('signed in')
		      	// })    
	      	// }
      	});  


		db.collection("ch2_p").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	          if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          	secondll = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              secondll.add(value.resName, value.duration);
		        });
		              console.log("Initializing Channel 2 general...=>" + querySnapshot.size);
			          	initializeSecondChannel();



	          // }else{
		      	// window.location.reload()
		      	// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      		// console.log('signed in')
		      	// })    
		      // }
      	});

	    db.collection("ch3_p").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	          if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          	thirdll = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              thirdll.add(value.resName, value.duration);
		        });
		              console.log("Initializing Channel 3 general...=>" + querySnapshot.size);
			          	initializeThirdChannel();


          	// }else{
	    	  	// window.location.reload()
	    	  	// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      		// console.log('signed in')
		      	// })    
   		    // }
      	});

	    db.collection("ch2_sh1").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          secondllSH1 = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              secondllSH1.add(value.resName, value.duration);
		        });
              console.log("Initializing Channel 2 shared1 ...=>" + querySnapshot.size);
		      // }else{
		      // 	// window.location.reload()
		      // 	firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // 		console.log('signed in')
		      // 	})    
		      // }
	    });

	    db.collection("ch2_sh2").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          secondllSH2 = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              secondllSH2.add(value.resName, value.duration);
		        });
              console.log("Initializing Channel 2 shared2...=>" + querySnapshot.size);
		      // }else{
		      // 	// window.location.reload()
		      // 	firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // 		console.log('signed in')
		      // 	})    
		      // }
	    });

	    db.collection("ch3_sh1").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          thirdllSH1 = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              thirdllSH1.add(value.resName, value.duration);
		        });
              console.log("Initializing Channel 3 shared1...=>" + querySnapshot.size);
		      // }else{
		      // 	// window.location.reload()
		      // 	firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // 		console.log('signed in')
		      // 	})    
		      // }
	    });

	    db.collection("ch3_sh2").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          thirdllSH2 = new CircularList();
		          querySnapshot.forEach(function(doc) {
		              value = doc.data();
		              thirdllSH2.add(value.resName, value.duration);
		        });
              console.log("Initializing Channel 3 shared2...=>" + querySnapshot.size);
		      // }else{
		      // 	// window.location.reload()
		      // 	firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // 		console.log('signed in')
		      // 	})    
		      // }
	    });

	    // db.collection("tickers").doc(app.deviceid)
	    db.collection("tickers").doc(app.groupName)
	      .onSnapshot(function(querySnapshot) {
	          if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          	initializeFourthChannel();
	          // }else{
		      	// window.location.reload()

		      	// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      		// console.log('signed in')
		      	// }) 
		      // }
      	});

     //  	db.collection("fv_p").doc(app.groupName).collection('data')
	    //   .onSnapshot(function(querySnapshot) {
	    //       if(!app.checkIfUserIsLoggedIn()){
			  //   firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			  //     console.log('signed in')
			  //     app.isuserloggedin = true;
			  //   }).catch(function(err){
			  //   	console.log(err)
			  //   })
			  // }
	    //       	if(app.checkSOSData) app.checkSOSData();
	    //       // }else{
		   //    	// window.location.reload()
		   //    	// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		   //    		// console.log('signed in')
		   //    	// }) 
		   //    // }
     //  	});

	    db.collection("sos").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	          if(!app.checkIfUserIsLoggedIn()){
			    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
			      console.log('signed in')
			      app.isuserloggedin = true;
			    }).catch(function(err){
			    	console.log(err)
			    })
			  }
	          	// if(app.checkVideoData) app.checkVideoData();


	          // }else{
		      	// window.location.reload()
		      	// firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
		      		// console.log('signed in')
		      	// }) 
		      // }
      	});  

	// })
	// clearInterval(app.campaignInterval)
	// app.campaignIntervalTime = 60;
// },app.campaignIntervalTime * 60000)

	
		
	}


}
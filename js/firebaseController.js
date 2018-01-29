

var db;

function Node(resName, duration) {
  this.resName = resName;
  // this.resType = resType;
  this.duration = duration;
  this.next = null;
}

var CircularList = function() {
  this._length = 0;
  this.head = null;
  this.pHead = null;
}

CircularList.prototype.add = function(resName, duration){
  var new_node = new Node(resName, duration);
  if(this.head==null)
  {
    new_node.next = new_node;
    this.head = new_node;
  }
  else
  {
    var currentNode = this.head;
    while(currentNode.next!=this.head)
    {
      currentNode = currentNode.next;
    }
    currentNode.next = new_node;
    new_node.next = this.head;
  }
};

CircularList.prototype.deleteList = function(){
  this.head = null;
  this.pHead = null;
};

CircularList.prototype.getNextNode = function(){
  if(this.head==null)
    return {};
  var nextNode = {};
  if(this.pHead==null)
  {
    this.pHead = this.head;
  }
  nextNode['resName'] = this.pHead.resName;
  // nextNode['resType'] = this.pHead.resType;
  nextNode['duration'] = this.pHead.duration;
  this.pHead = this.pHead.next;
  return nextNode;
};



var firstll = new CircularList();
var secondll = new CircularList();
var secondllSH1 = new CircularList();
var secondllSH2 = new CircularList();
var thirdllSH1 = new CircularList();
var thirdllSH2 = new CircularList();
var thirdll = new CircularList();
var fourthll = new CircularList();


// var firstJSON = {};
// var secondJSON = {};
// var thirdJSON = {};
// var fourthJSON = {};

/*
  Function to read data from local database on startup
*/
//1.Read from first_folder
// function initializeChannel1(){
  // firstll = new CircularList();
  // collection = db.collection('ch1_g').doc(app.deviceid).collection('data')
  // collection.get().then(function(coll) {
  //     console.log("Initializing Channel 1 general...=>" + coll.docs.length);
  //   $.each(coll.docs, function(index,value){
  //     value = value.data(); 
  //     firstll.add(value.resName, value.resType, value.duration);
  //   })
  // })
// }


app.checkIfUserIsLoggedIn = function(){
  return app.isuserloggedin;
}


function getFileBasedOnTime(channel,time,callback){
  // if(channel == 'channel1') collection_name = "ch1_p"
  // if(channel == 'channel2') collection_name = "ch2_p"
  // if(channel == 'channel3') collection_name = "ch3_p"
  // if(channel == 'channel4') collection_name = "tickers"

  var format = 'HH:mm'
  var time = moment(new Date(time),format),
  sh1BeforeTime = moment('09:00', format),
  sh1AfterTime = moment('14:00', format);

  sh2BeforeTime = moment('14:00', format),
  sh2AfterTime = moment('18:00', format);
  if (time.isBetween(sh1BeforeTime, sh1AfterTime)) {
    if(channel == "ch2_p") channel = 'ch2_sh1'
    if(channel == "ch3_p") channel = 'ch3_sh1'
  }
  if (time.isBetween(sh2BeforeTime, sh2AfterTime)) {
    if(channel == "ch2_p") channel = 'ch2_sh2';
    if(channel == "ch3_p") channel = 'ch3_sh2';
  }

  time = moment(time).format('YYYY-MM-DD_HH:mm')
  if(!app.checkIfUserIsLoggedIn()){
    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
      console.log('signed in')
      app.isuserloggedin = true;
    }).catch(function(err){
            console.log(err)
          })
  }
  docRef = db.collection(channel).doc(app.groupName).collection('data').doc(time);

  if(channel == "ch2_p" || channel == "ch3_p")
    docRef = db.collection(channel).doc(app.groupName).collection('data').doc(time.split("_")[1]);

  if(channel == "ch2_sh1" || channel == "ch2_sh2" || channel == "ch3_sh1" || channel == 'ch3_sh2')
      docRef = db.collection(channel).doc(app.groupName).collection('data').doc();
  


  // if(channel == "ch2_p" || channel == "ch3_p")
  //   docRef = db.collection(channel).doc(app.groupName).collection('data').doc(time);

  if(channel == "tickers")
      docRef = db.collection(channel).doc(app.groupName)

  docRef.get().then(function(doc) {
      var nextFile = {};
      if (doc.exists) {
          console.log("Got New Planned data for " + channel);
          nextFile = doc.data();

          // if(channel == "ch2_p"){
          //     nextFile = secondll.getNextNode();
          // }
          // if(channel == "ch3_p"){
          //   nextFile = thirdll.getNextNode();
          // }
          if(channel == 'ch1_p'){
            $(".ovalWrapper").hide();
          }
          if(channel == 'ch2_sh1'){
            nextFile = secondllSH1.getNextNode();
          }

          if(channel == 'ch2_sh2'){
            nextFile = secondllSH2.getNextNode();
          }

          if(channel == 'ch3_sh1'){
            nextFile = thirdllSH1.getNextNode();
          }

          if(channel == 'ch3_sh2'){
            nextFile = thirdllSH2.getNextNode();
          }


      } else {
          console.log("Got default planned data for " + channel);
          if(channel == "ch1_p")
          {
            $(".ovalWrapper").show();
            nextFile = firstll.getNextNode();
          }
          else if(channel == "ch2_p")
          {
            // nextFile = secondll.getNextNode();
            nextFile = {resName:"../advt/default.png"};
            // nextFile = {startTime : time, resType : "image", resName:"../advt/default.png"};
          }
          else if(channel == "ch3_p")
          {
            // nextFile = thirdll.getNextNode();
            nextFile = {resName:"../advt/default.png"};
            // nextFile = {startTime : time, resType : "image", resName:"../advt/default.png"};
          }
          if(channel == 'ch2_sh1'){
            // nextFile = secondllSH1.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch2_sh2'){
            // nextFile = secondllSH2.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch3_sh1'){
            // nextFile = thirdllSH1.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch3_sh2'){
            // nextFile = thirdllSH2.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }
          else if(channel == "tickers")
          {
            nextFile = {startTime : time,text:"WELCOME TO PRATEEK LAUREL"};
            // nextFile = fourthll.getNextNode();
          }
      }
      callback(nextFile);
  }).catch(function(error) {
      if(error.message == "Failed to get document because the client is offline."){
          if(channel == "ch1_p")
          {
            nextFile = firstll.getNextNode();
          }
          else if(channel == "ch2_p")
          {
            // nextFile = secondll.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }
          else if(channel == "ch3_p")
          {
            nextFile = {resName:"../advt/default.png"};
            // nextFile = thirdll.getNextNode();
          }
          if(channel == 'ch2_sh1'){
            // nextFile = secondllSH1.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch2_sh2'){
            // nextFile = secondllSH2.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch3_sh1'){
            // nextFile = thirdllSH1.getNextNode();
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch3_sh2'){
            nextFile = {resName:"../advt/default.png"};
            // nextFile = thirdllSH2.getNextNode();
          }
          else if(channel == "tickers")
          {
            nextFile = {startTime : time,text:"WELCOME TO PRATEEK LAUREL"};
            // nextFile = fourthll.getNextNode();
          }
          callback(nextFile);
      }
      console.log("Error getting document:", error);
  });
}



function initializeFirebase(callback){
  firebase.initializeApp(app.config);
  if(navigator.onLine){
    // alert('authenticating firebase user')
    $(".loadingText").text('Authorizing...')
    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){    
        // alert('user authorized')
        // alert('enabling persistance')
        $(".loadingText").text('Authorization success');
  		  app.isuserloggedin = true;
        firebase.firestore().enablePersistence()
  		  .then(function() {
        $(".loadingText").text('Setting up data...')
        db = firebase.firestore(); 

          
        

        // db.collection("ch2_p").doc(app.deviceid).collection('data')
        // .onSnapshot(function(querySnapshot) {
        //     initializeSecondChannel();
        //     // firstll = new CircularList();
        //     // querySnapshot.forEach(function(doc) {
        //     //     value = doc.data();
        //     //     firstll.add(value.resName, value.resType, value.duration);
        //     //     console.log("Initializing Channel 1 general...=>" + querySnapshot.size);
        //     // });
        // });

          // alert('persistance enabled')
        callback();
  		  })
  		  .catch(function(err) {
  			  if (err.code == 'failed-precondition') {
  				alert("Cannot open multiple tabs");
  			  } else if (err.code == 'unimplemented') {
  				alert("Browser does not support");
  			  }
  		  });
  	}).catch(function(error){
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log("Error : " + errorCode +  " === Message : " + errorMessage);
      if(errorMessage == "A network error (such as timeout, interrupted connection or unreachable host) has occurred."){
        firebase.firestore().enablePersistence()
          .then(function() {
          db = firebase.firestore(); 
            callback();
          })
      }
  	});
  }else{
    $(".loadingText").text('Going offline...');
    firebase.firestore().enablePersistence()
      .then(function() {
      db = firebase.firestore(); 
        callback();
      })
  }

  // firebase.firestore().enablePersistence()
  //   .then(function() {
  //   db = firebase.firestore(); 
  //   callback();
  //   })
  //   .catch(function(err) {
  //     if (err.code == 'failed-precondition') {
  //     alert("Cannot open multiple tabs");
  //     } else if (err.code == 'unimplemented') {
  //     alert("Browser does not support");
  //     }
  //   });
  
}

function ifFirebaseIsEstablished(){
  if(!db) return false
  else{
    db.collection('campaigns').get().then(function(snapshot){ 
      console.log("database established");
    }).catch(function(err){
      console.log(err);
    })
    return true;
  }
}

function getCampaignFromFirebase(time,callback){
  time = moment(time).format('YYYY-MM-DD')
  if(!app.checkIfUserIsLoggedIn()){
    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
      console.log('signed in')
      app.isuserloggedin = true;
    }).catch(function(err){
            console.log(err)
          })
  }
  docRef = db.collection('campaigns').doc(app.groupName).collection('data').doc(time);
  docRef.get().then(function(doc) {
      if (doc.exists) {
          callback(doc.data())
      } else {
          callback({})
      }
  }).catch(function(error) {
      if(error.message == "Failed to get document because the client is offline."){
          callback({})
      }
      console.log("Error getting document:", error);
  });

  // collection.where("startTime","<=",time).onSnapshot({includeQueryMetadataChanges: true}, function(snapshot) {
  //   docs = snapshot.docs;
  //   if(docs.length != 0){
  //     callback(docs[0].data())
  //   }
  //   // callback(callbackData);
  // });


  // db.collection('campaigns').get().then(function(snapshot){ 
  //   callback(snapshot.docs[0].data())
  // }).catch(function(err){
  //   console.log(err);
  // });
}

function getVideoFromFirebase(time,callback){

  if(!app.checkIfUserIsLoggedIn()){
    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
      console.log('signed in')
      app.isuserloggedin = true;
    }).catch(function(err){
            console.log(err)
          })

  }
  callbackData = {};
  time = moment(time).format('YYYY-MM-DD_HH:mm')
  docRef = db.collection('fv_p').doc(app.groupName).collection('data').doc(time)

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Received VIDEO request...=>");
          callbackData.data = doc.data();
          callbackData.type = "video"
          callback(callbackData)
      } else {
          callback({})
      }
  }).catch(function(error) {
    if(error.message == "Failed to get document because the client is offline."){
          callback({})
      }
      console.log("Error getting document:", error);
  });


  // collection.where("startTime","==",time).onSnapshot({includeQueryMetadataChanges: true}, function(snapshot) {
  //   docs = snapshot.docs;
  //   if(docs.length != 0){
  //     callbackData.data = docs[0].data();
  //     callbackData.type = "video"
  //   }
  //   callback(callbackData);
  // });

    
}

function getSOSFromFirebase(time,callback){
  if(!app.checkIfUserIsLoggedIn()){
    firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
      console.log('signed in')
      app.isuserloggedin = true;
    }).catch(function(err){
            console.log(err)
          })
  }
  callbackData = {};
  time = moment(time).format('YYYY-MM-DD_HH:mm')
  docRef = db.collection('sos').doc(app.groupName).collection('data').doc(time)

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Received SOS request...=>");
          callbackData.data = doc.data();
          callbackData.type = "sos"
          callback(callbackData)
      } else {
          callback({})
      }
  }).catch(function(error) {
      if(error.message == "Failed to get document because the client is offline."){
          callback({})
      }
      console.log("Error getting document:", error);
  });





  // collection.where("startTime","==",time).onSnapshot({includeQueryMetadataChanges: true}, function(snapshot) {
  //   docs = snapshot.docs;
  //   console.log("Received SOS request...=>" + docs.length);
  //   if(docs.length != 0){
  //     callbackData.data = docs[0].data();
  //     callbackData.type = "sos";
  //   }
  //   callback(callbackData);
  // });
}

// function getChannelDataFromFirebase(channel,currentTime,callback){
//   collection = db.collection('channels')
//   collection.where("startTime","<=",new Date().toISOString()).onSnapshot({includeQueryMetadataChanges: true}, function(snapshot) {
//     if(snapshot.docs) console.log(snapshot.docs.length)
//         // snapshot.docChanges.forEach(function(change) {
//         // });


//   // then(function(snapshot){ 
//   //   callback(snapshot.docs.length)
//   // }).catch(function(err){
//   //   console.log(err);
//   // });
//   // callback({});
//   });
// };



// initializeChannel1();




// Initialize Cloud Firestore through firebase
      // var db = firebase.firestore();
      // db.collection("user").onSnapshot({includeQueryMetadataChanges: true}, function(snapshot) {
      //   snapshot.docChanges.forEach(function(change) {
      //     if (change.type === "added") {
      //       var userData = change.doc.data();
      //     }
      //     var source = snapshot.metadata.fromCache ? "local cache" : "server";
      //     console.log("Data came from " + source);
      //   });
      // });
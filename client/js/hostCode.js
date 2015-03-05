// TokBox Settings constructor
var tokSettings = {
  // this.audioVolume = volume,
  insertMode : 'append',
  width : 200,
  height : 150,
  // subscribeToAudio : true,
  // subscribeToVideo : false,
  name  : 'host'
}
var user = [,,,,,,]

// console.log(token, apiKey, sessionId);

// Initialize an OpenTok Session object
var session = OT.initSession(apiKey, sessionId)
// Initialize a Publisher, place it into the element with id="publisher"
// var publisher = OT.initPublisher('host', { name: 'host' })

// Attach event handlers
session.on({

  sessionConnected: function(event) {
      var element = document.getElementById('host')
      var publisher = OT.initPublisher( element , {
        audioFallbackEnabled: true,
        height: 240,
        width: 320,
        insertMode: 'append',
        name: 'host',
        style: {
          nameDisplayMode: 'off',
          buttonDisplayMode: 'off'
        }
      }, function() {
        session.publish(publisher, function (err) {
          if (err) console.log('session didnt publish')
        })
      })},

  // This function runs when another client publishes a stream (eg. session.publish())
  streamCreated: function(event) {
    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"
    var userNum = Number(event.stream.name)
    var subContainer = document.getElementById(userNum)
    console.log(subContainer)
    // Subscribe to the stream that caused this event, put it inside the container we just made
    user[userNum] = (session.subscribe(event.stream, subContainer), function( err ) {
      user[userNum].setAudioVolume(0)
    })
  }
})

// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(token)
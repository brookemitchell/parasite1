Meteor.startup(function() {
  var session = getTokDetails().then( tDs => {
    return OT.initSession(tDs.apiKey, tDs.sessionId)
  }).then(sess => {
    watchEvents(sess)
    return sess
  })
  // big squish
  Promise.all([session, createToken()]).then( proms => {
    var session = proms[0]
    var token = proms[1]
    session.connect(token)
  })
})

//##### Event Watcher
function watchEvents ( session ) {

  streamCreatedResponse =  _.bind(streamCreatedResponse, session)
  startSessionResponse =  _.bind(startSessionResponse, session)
  // _.bindAll(session, streamCreatedResponse, startSessionResponse)

  // I feel I am a mildly bad person for doing this...
  window.onbeforeunload = () => Meteor.call('endConnection', globalSlotId)


  session.on({
    //when we connect to a session....
    sessionConnected: startSessionResponse,
    // This function runs when another client publishes a stream (eg. session.publish())
    streamCreated: streamCreatedResponse,
    //when we get a tok message signal
    signal: signalResponse
  })
  return session
}
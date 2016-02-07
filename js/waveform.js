// This script generates an array of values and renders them as a waveform

function generateWaveform(resolution, dynamics){

  // get passed arguments, set defaults if not passed
  if ( typeof resolution == 'undefined' ) resolution = 400
  if ( typeof dynamics == 'undefined' ) dynamics = 10

  // array for the values
  var wave = []

  // index counter
  var i = 0

  // no. of nodes (resolution of waveform)
  var res = resolution

  // set number of dynamics/troughs (less = more)
  // TODO make this control (dynamics) more intuitive
  var mods = dynamics

  // maximum variation (each part's difference from last)
  maxDiff = 20

  // amount of volume fade in/out
  ampFadeAmount = 20

  // build the number array
  while (i < res) {
    i++

    // max height value (percentage)
    maxHeight = 100

    // randomize variation
    diff = Math.floor( 0 - (maxDiff / 2) + Math.random() * maxDiff )

    // if this is first cycle, create a number (n)...
    if (typeof n == 'undefined') n = 0

    // ... otherwise use previous number from previous iteration

    // if it's time for a new dynamic part (peak/trough)
    if ( i % mods == 0) {
      // do a completely random number
      n = Math.floor( Math.random() * maxHeight )
    // if not
    } else {
      // modify last value using variation
      n = n + diff
    }

    // check for < 0, turn it into a positive
    if ( n < 0 ) n = n * -1

    // check for > max, limit to max
    if ( n > maxHeight ) n = maxHeight

    // if within fade boundary
    if ( i < ampFadeAmount || i > ( res - ampFadeAmount ) ) {
      // fade in
      if ( i < ampFadeAmount ) {
        // get a percentage (increasing)
        f = (i / ampFadeAmount)
      }

      // fade out
      if ( i > ( res - ampFadeAmount ) ) {
        // percentage (decreasing)
        f = (res - i) / ampFadeAmount
      }

      // apply the fade percentage
      n = n * f
    }

    // add to array
    wave.push(n)
  }

  return wave
}

function renderWaveform(selector, resolution, dynamics) {
  // clear existing
  $(selector).empty()

  // get a waveform array
  var wave = generateWaveform(resolution, dynamics)

  // fail if no selector
  if (typeof selector == 'undefined') return false

  // where to fade in / out (%)
  var renderFadeAmount = 10

  // render the wave
  for (var i = 0; i < wave.length; i++) {
    // jquery element for the node
    $w = $('<div></div>')
    $w.addClass('waveform__node')

    // TODO add control for this
    // set individual width based on resolution
    // var width = 100 / wave.length + '%'
    // $w.css({'width':width})

    // add height value as percentage
    $w.css({'height': wave[i]+'%'})

    // this node as a percentage...
    var p = ( i / wave.length * 100 )
    // ...to 1 dp
    p = Math.round( p * 10 ) / 10

    // opacity var
    var o

    // if this % is within fade boundaries...
    if ( p < renderFadeAmount || p > ( 100 - renderFadeAmount ) ) {

      // fade in
      if ( p < renderFadeAmount ) {
        // fade amount (increasing)
        o1 = (p / renderFadeAmount)
        // amplitude as percentage
        o2 = wave[i] / 100
        // average of both
        o = (o1 + o2) / 2
      }

      // fade out
      if ( p > ( 100 - renderFadeAmount ) ) {
        // fade amount (decreasing)
        o1 = (100 - p) / renderFadeAmount
        // amplitude as percentage
        o2 = wave[i] / 100
        // average of both
        o = (o1 + o2) / 2
      }

      o = Math.round( o * 100 ) / 100
    } else {
      // TODO apply minimum
      // assign opacity to amplitude
      o = wave[i] / 100
    }

    $w.css({'opacity': o})

    // insert into dom
    $(selector).append($w)
  }
}

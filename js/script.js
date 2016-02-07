renderWaveform( $('.waveform'), 120, 4 )

$('body').keyup(function(e){
  console.log(e.keyCode)
  if(e.keyCode == 32 || e.keyCode == 13){ // space bar / return
     renderWaveform( $('.waveform'), 120, 4 )
  }
})

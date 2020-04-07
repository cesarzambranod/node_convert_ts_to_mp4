const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const FFmpeg = require('fluent-ffmpeg');
//var command = FFmpeg({ source: '/home/franco/Documentos/ffmpeg3/video/input.ts' });

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

function myPreset(command) {
  command
      //.withAudioCodec('libmp3lame')
      .withAudioCodec('aac')
      .withVideoCodec('libx264')
}

new FFmpeg({ source: '/home/franco/Documentos/ffmpeg3/video/input.ts' })
  .usingPreset(myPreset)
  .saveToFile('/home/franco/Documentos/ffmpeg3/video/output.mp4');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));

});

app.use(express.static(__dirname + '/'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
app.listen(process.env.port || 3600);

console.log('Running at Port 3600');


window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "vertical-title-blur",
  "duration": 14.1,
  "hold": 0,
  "segments": [
    {
      "from": 3.8,
      "to": 8,
      "plate": 5.95,
      "label": "片名",
      "layers": "map",
      "start": 0,
      "duration": 4.2
    },
    {
      "from": 17.9,
      "to": 21.6,
      "plate": 19.7,
      "label": "地点标题",
      "layers": "map",
      "start": 4.2,
      "duration": 3.7
    },
    {
      "from": 25.5,
      "to": 29.6,
      "plate": null,
      "label": "回忆竖排字幕",
      "layers": "map",
      "start": 7.9,
      "duration": 4.1
    },
    {
      "from": 57.9,
      "to": 60,
      "plate": 58,
      "label": "fin.",
      "layers": "map,routes,markers",
      "start": 12,
      "duration": 2.1
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "片名"
    },
    {
      "t": 4.2,
      "label": "地点标题"
    },
    {
      "t": 7.9,
      "label": "回忆竖排字幕"
    },
    {
      "t": 12,
      "label": "fin."
    }
  ],
  "anchors": {},
  "liveMap": false,
  "plateBase": "../assets/plates",
  "scoreUrl": "score.json",
  "showHud": false,
  "showStamps": false
};

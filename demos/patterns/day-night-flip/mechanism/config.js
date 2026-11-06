window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "day-night-flip",
  "duration": 7,
  "hold": 0,
  "segments": [
    {
      "from": 31.3,
      "to": 35.8,
      "plate": null,
      "label": "白天与入夜",
      "layers": "map",
      "start": 0,
      "duration": 4.5
    },
    {
      "from": 36.6,
      "to": 39.1,
      "plate": null,
      "label": "天亮",
      "layers": "map",
      "start": 4.5,
      "duration": 2.5
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "白天"
    },
    {
      "t": 1.5,
      "label": "入夜"
    },
    {
      "t": 4.5,
      "label": "天亮"
    }
  ],
  "anchors": {},
  "liveMap": true,
  "plateBase": "assets/plates",
  "scoreUrl": "mechanism/score.json",
  "showHud": true,
  "showStamps": false,
  "ignoreOverlays": true
};

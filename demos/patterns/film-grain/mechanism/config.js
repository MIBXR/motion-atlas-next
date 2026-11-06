window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "film-grain",
  "duration": 7.5,
  "hold": 0,
  "segments": [
    {
      "from": 10.4,
      "to": 12.9,
      "plate": 10.4,
      "label": "地图上的颗粒",
      "layers": "map",
      "start": 0,
      "duration": 2.5
    },
    {
      "from": 13.5,
      "to": 16,
      "plate": null,
      "label": "照片颗粒",
      "layers": "map",
      "start": 2.5,
      "duration": 2.5
    },
    {
      "from": 27.56,
      "to": 30.06,
      "plate": null,
      "label": "插画颗粒",
      "layers": "map",
      "start": 5,
      "duration": 2.5
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "地图上的颗粒"
    },
    {
      "t": 2.5,
      "label": "照片颗粒"
    },
    {
      "t": 5,
      "label": "插画颗粒"
    }
  ],
  "anchors": {},
  "liveMap": false,
  "plateBase": "../assets/plates",
  "scoreUrl": "score.json",
  "showHud": false,
  "showStamps": false,
  "frameTimes": [
    10.4,
    13.5,
    27.56
  ]
};

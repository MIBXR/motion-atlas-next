window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "route-draw-marker",
  "duration": 10.6,
  "hold": 0,
  "segments": [
    {
      "from": 0,
      "to": 3.6,
      "plate": null,
      "label": "机场",
      "layers": "map",
      "start": 0,
      "duration": 3.6
    },
    {
      "from": 4,
      "to": 6.8,
      "plate": null,
      "label": "第二段",
      "layers": "map",
      "start": 4,
      "duration": 2.8
    },
    {
      "from": 7.2,
      "to": 10.6,
      "plate": null,
      "label": "步行",
      "layers": "map",
      "start": 7.2,
      "duration": 3.4
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "机场"
    },
    {
      "t": 0.6,
      "label": "描画"
    },
    {
      "t": 4,
      "label": "第二段"
    },
    {
      "t": 7.2,
      "label": "步行"
    }
  ],
  "anchors": {},
  "actions": [
    {
      "at": 0,
      "from": 1.5,
      "to": 2.35,
      "stop": "kix"
    },
    {
      "at": 0.6,
      "from": 14.6,
      "to": 17.05,
      "route": "haruka"
    },
    {
      "at": 2.6,
      "from": 16.6,
      "to": 17.45,
      "stop": "kyoto"
    },
    {
      "at": 4,
      "from": 37.4,
      "to": 39.85,
      "route": "naraLine"
    },
    {
      "at": 6,
      "from": 39.4,
      "to": 40.25,
      "stop": "jrNara"
    },
    {
      "at": 7.2,
      "from": 39.4,
      "to": 41.25,
      "route": "walk1"
    },
    {
      "at": 8.6,
      "from": 40.8,
      "to": 41.65,
      "stop": "naraPark"
    }
  ],
  "liveMap": true,
  "plateBase": "../assets/plates",
  "scoreUrl": "score.json",
  "showHud": false,
  "showStamps": false
};

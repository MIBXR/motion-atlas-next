window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "chapter-frame",
  "duration": 7.05,
  "hold": 0.4,
  "segments": [
    {
      "from": 24.2,
      "to": 25.85,
      "plate": 24.6,
      "label": "鸭川框线入场",
      "layers": "map",
      "start": 0,
      "duration": 1.65
    },
    {
      "from": 33,
      "to": 33.8,
      "plate": 24.6,
      "label": "框线退场",
      "layers": "map",
      "start": 1.65,
      "duration": 0.8
    },
    {
      "from": 40.6,
      "to": 44.8,
      "plate": 41,
      "label": "奈良胶带与网点",
      "layers": "map",
      "start": 2.45,
      "duration": 4.2
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "鸭川框线入场"
    },
    {
      "t": 1.65,
      "label": "框线退场"
    },
    {
      "t": 2.45,
      "label": "奈良胶带与网点"
    }
  ],
  "anchors": {},
  "liveMap": false,
  "plateBase": "../assets/plates",
  "scoreUrl": "score.json",
  "showHud": false,
  "showStamps": false
};

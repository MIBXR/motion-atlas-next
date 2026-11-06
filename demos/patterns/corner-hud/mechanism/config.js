window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "corner-hud",
  "duration": 13.8,
  "hold": 0.6,
  "segments": [
    {
      "from": 7,
      "to": 13.6,
      "plate": 10.4,
      "label": "顶部 HUD 入场",
      "layers": "map",
      "start": 0,
      "duration": 6.6
    },
    {
      "from": 35.8,
      "to": 42.4,
      "plate": 41,
      "label": "跨天",
      "layers": "map",
      "start": 6.6,
      "duration": 6.6
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "顶部 HUD 入场"
    },
    {
      "t": 6.6,
      "label": "跨天"
    }
  ],
  "anchors": {},
  "liveMap": false,
  "plateBase": "assets/plates",
  "scoreUrl": "mechanism/score.json",
  "showHud": true,
  "showStamps": false
};

window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "alert-reroute",
  "duration": 6.2,
  "hold": 0.7,
  "segments": [
    {
      "from": 44.8,
      "to": 50.3,
      "plate": null,
      "label": "警示改道",
      "layers": "map",
      "start": 0,
      "duration": 5.5
    }
  ],
  "markers": [
    {
      "t": 0.2,
      "label": "警示"
    },
    {
      "t": 1.5,
      "label": "错误终点"
    },
    {
      "t": 2.2,
      "label": "改道"
    }
  ],
  "anchors": {},
  "liveMap": true,
  "plateBase": "assets/plates",
  "scoreUrl": "mechanism/score.json",
  "showHud": false,
  "showStamps": false
};

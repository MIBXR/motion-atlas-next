window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "collect-counter",
  "duration": 6.6,
  "hold": 0.6,
  "segments": [
    {
      "from": 8.1,
      "to": 8.9,
      "plate": 10.4,
      "label": "徽章出现",
      "layers": "map",
      "start": 0,
      "duration": 0.8
    },
    {
      "from": 12.6,
      "to": 14,
      "plate": 10.4,
      "label": "×1 + 关空",
      "layers": "map",
      "start": 0.8,
      "duration": 1.4
    },
    {
      "from": 19.2,
      "to": 20.4,
      "plate": 20.4,
      "label": "×2 + 京都",
      "layers": "map",
      "start": 2.2,
      "duration": 1.2
    },
    {
      "from": 41.8,
      "to": 43,
      "plate": 41,
      "label": "×3 + 奈良",
      "layers": "map",
      "start": 3.4,
      "duration": 1.2
    },
    {
      "from": 51.2,
      "to": 52.6,
      "plate": 51.6,
      "label": "×4 + 大阪",
      "layers": "map",
      "start": 4.6,
      "duration": 1.4
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "徽章出现"
    },
    {
      "t": 0.8,
      "label": "×1 + 关空"
    },
    {
      "t": 2.2,
      "label": "×2 + 京都"
    },
    {
      "t": 3.4,
      "label": "×3 + 奈良"
    },
    {
      "t": 4.6,
      "label": "×4 + 大阪"
    }
  ],
  "anchors": {},
  "liveMap": false,
  "plateBase": "../assets/plates",
  "scoreUrl": "score.json",
  "showHud": false,
  "showStamps": true
};

window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "card-expand-fullscreen",
  "duration": 6.6,
  "hold": 0.4,
  "segments": [
    {
      "from": 18.4,
      "to": 24.6,
      "plate": 20.4,
      "label": "出卡",
      "layers": "map",
      "start": 0,
      "duration": 6.2
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "出卡"
    },
    {
      "t": 2.6,
      "label": "展开"
    },
    {
      "t": 5.4,
      "label": "收回"
    }
  ],
  "anchors": {
    "landscape": {
      "20.4": {
        "stops": {
          "inari": {
            "x": 719.9999999988227,
            "y": 679.9999999997057
          }
        }
      }
    },
    "portrait": {
      "20.4": {
        "stops": {
          "inari": {
            "x": 540,
            "y": 760
          }
        }
      }
    }
  },
  "liveMap": false,
  "plateBase": "assets/plates",
  "scoreUrl": "mechanism/score.json",
  "showHud": true,
  "showStamps": true,
  "showBadge": true
};

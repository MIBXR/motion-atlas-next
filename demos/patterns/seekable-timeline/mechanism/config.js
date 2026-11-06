window.CASE_CONFIG = window.CONFIG;
window.CONFIG = {
  "id": "seekable-timeline",
  "duration": 7,
  "hold": 0,
  "segments": [
    {
      "from": 12,
      "to": 14,
      "plate": 13,
      "label": "播放",
      "layers": "map",
      "start": 0,
      "duration": 2,
      "mode": "play"
    },
    {
      "from": 14,
      "to": 12.6,
      "plate": 13,
      "label": "倒拖",
      "layers": "map",
      "start": 2,
      "duration": 0.6,
      "mode": "drag"
    },
    {
      "from": 12.6,
      "to": 13.4,
      "plate": 13,
      "label": "播放",
      "layers": "map",
      "start": 2.6,
      "duration": 0.8,
      "mode": "play"
    },
    {
      "from": 13.4,
      "to": 15.5,
      "plate": 13,
      "label": "前跳",
      "layers": "map",
      "start": 3.4,
      "duration": 0.5,
      "mode": "drag"
    },
    {
      "from": 15.5,
      "to": 16.6,
      "plate": 13,
      "label": "播放",
      "layers": "map",
      "start": 3.9,
      "duration": 1.1,
      "mode": "play"
    },
    {
      "from": 16.6,
      "to": 13,
      "plate": 13,
      "label": "再倒拖",
      "layers": "map",
      "start": 5,
      "duration": 0.6,
      "mode": "drag"
    },
    {
      "from": 13,
      "to": 14.4,
      "plate": 13,
      "label": "播放",
      "layers": "map",
      "start": 5.6,
      "duration": 1.4,
      "mode": "play"
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "播放"
    },
    {
      "t": 2,
      "label": "倒拖"
    },
    {
      "t": 3.4,
      "label": "前跳"
    },
    {
      "t": 5,
      "label": "再倒拖"
    }
  ],
  "anchors": {
    "landscape": {
      "13": {
        "stops": {
          "kix": {
            "x": 649.0157664937358,
            "y": 585.0491483138986
          }
        }
      }
    },
    "portrait": {
      "13": {
        "stops": {
          "kix": {
            "x": 546.1929564131025,
            "y": 689.7302161834256
          }
        }
      }
    }
  },
  "liveMap": false,
  "plateBase": "assets/plates",
  "scoreUrl": "mechanism/score.json",
  "showHud": true,
  "showStamps": false
};

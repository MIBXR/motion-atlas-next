const config = {
      "title": "竖排汉字模糊入场 + 英文打字",
      "root": "#stage",
      "orients": [
        "landscape",
        "portrait"
      ],
      "fps": 30,
      "segments": [
        {
          "caseId": "map-pilgrimage",
          "label": "地图巡礼",
          "source": "mechanism/scene.html",
          "from": 0,
          "to": 14.1,
          "nativeAudio": true
        },
        {
          "caseId": "mg-3d-render",
          "label": "三维软床 · 逐词去糊落字",
          "source": "../../cases/mg-3d-render/index.html",
          "from": 7.8,
          "to": 9.7
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
        },
        {
          "t": 14.1,
          "label": "三维软床"
        },
        {
          "t": 14.3,
          "label": "标语入场"
        }
      ],
      "reduced": 2.6
    };
    await MotionKit.replay(config);

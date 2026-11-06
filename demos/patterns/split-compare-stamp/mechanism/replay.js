const config = {
      "title": "分屏对比与时间戳盖章",
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
          "to": 4.8,
          "nativeAudio": true
        },
        {
          "caseId": "mg-hanazi",
          "label": "综艺花字 · 认证印章砸落",
          "source": "../../cases/mg-hanazi/index.html",
          "from": 8.167,
          "to": 9.5
        }
      ],
      "markers": [
        {
          "t": 0,
          "label": "分屏"
        },
        {
          "t": 1.65,
          "label": "盖章"
        },
        {
          "t": 4.8,
          "label": "综艺花字"
        },
        {
          "t": 5.133,
          "label": "猫主认证"
        },
        {
          "t": 5.533,
          "label": "下期见"
        }
      ],
      "reduced": 2.4
    };
    await MotionKit.replay(config);

const config = {
      "title": "路线描画与标记脉冲",
      "orients": [
        "landscape",
        "portrait"
      ],
      "segments": [
        {
          "caseId": "map-pilgrimage",
          "label": "地图巡礼",
          "source": "mechanism/scene.html",
          "from": 0,
          "to": 10.6,
          "nativeAudio": true
        },
        {
          "caseId": "mg-isometric",
          "label": "等距城市数据弧线",
          "from": 5.835,
          "to": 7.07
        },
        {
          "caseId": "mg-paperclip",
          "label": "贴纸科普",
          "from": 5.86,
          "to": 7.2
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
        },
        {
          "t": 10.6,
          "label": "等距数据弧"
        },
        {
          "t": 10.8,
          "label": "弧线接通"
        },
        {
          "t": 11.25,
          "label": "到达标记"
        },
        {
          "t": 11.635,
          "label": "弧线齐备"
        },
        {
          "t": 11.835,
          "label": "贴纸科普"
        }
      ],
      "reduced": 8.6,
      "root": "#stage",
      "fps": 30
    };
    await MotionKit.replay(config);

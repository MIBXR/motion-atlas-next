const config = {
      "title": "阵列选择波浪",
      "segments": [
        {
          "caseId": "archive-os",
          "label": "原有演示",
          "source": "mechanism/scene.html",
          "nativeAudio": true,
          "from": 0,
          "to": 15
        },
        {
          "caseId": "mg-liquid",
          "label": "液态流动",
          "from": 7.0,
          "to": 9.966666666666667
        }
      ],
      "markers": [
        {
          "t": 15,
          "label": "液态流动"
        }
      ],
      "reduced": 2.4,
      "root": "#stage",
      "orients": [
        "landscape",
        "portrait"
      ],
      "fps": 30
    };
    await MotionKit.replay(config);

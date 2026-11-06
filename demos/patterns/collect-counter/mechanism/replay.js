const config = {
      "title": "收集计数徽章与收集物托盘",
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
          "to": 6.6,
          "nativeAudio": true
        },
        {
          "caseId": "mg-paperclip",
          "label": "贴纸科普",
          "from": 3.1,
          "to": 4.7
        },
        {
          "caseId": "mg-hanazi",
          "label": "综艺花字 · 快乐电池充满",
          "source": "../../cases/mg-hanazi/index.html",
          "from": 1.367,
          "to": 2.7
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
        },
        {
          "t": 6.6,
          "label": "贴纸科普"
        },
        {
          "t": 8.2,
          "label": "综艺花字"
        },
        {
          "t": 8.4,
          "label": "快乐电池"
        },
        {
          "t": 9.333,
          "label": "凝视切镜"
        },
        {
          "t": 9.4,
          "label": "问号弹入"
        }
      ],
      "reduced": 6.2,
      "root": "#stage",
      "fps": 30
    };
    await MotionKit.replay(config);

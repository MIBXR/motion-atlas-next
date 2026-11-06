const config = {
      "title": "可复现的胶片颗粒与暗角",
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
          "to": 7.5,
          "nativeAudio": true
        },
        {
          "caseId": "mg-bauhaus",
          "label": "几何包豪斯",
          "from": 0,
          "to": 10
        },
        {
          "caseId": "mg-line-art",
          "label": "线条艺术",
          "from": 0,
          "to": 10
        },
        {
          "caseId": "mg-morph",
          "label": "形状变形",
          "from": 0,
          "to": 10
        },
        {
          "caseId": "mg-aurora-glass",
          "label": "极光玻璃",
          "from": 0,
          "to": 10
        },
        {
          "caseId": "mg-3d-render",
          "label": "三维软床 · 逐帧颗粒暗角",
          "source": "../../cases/mg-3d-render/index.html",
          "from": 0,
          "to": 10
        },
        {
          "caseId": "mg-collage",
          "label": "脑洞拼贴 · 颗粒尘点换板",
          "source": "../../cases/mg-collage/index.html",
          "from": 0,
          "to": 10
        }
      ],
      "markers": [
        {
          "t": 0,
          "label": "地图上的颗粒"
        },
        {
          "t": 2.5,
          "label": "照片颗粒"
        },
        {
          "t": 5,
          "label": "插画颗粒"
        },
        {
          "t": 7.5,
          "label": "几何包豪斯"
        },
        {
          "t": 17.5,
          "label": "线条艺术"
        },
        {
          "t": 27.5,
          "label": "形状变形"
        },
        {
          "t": 37.5,
          "label": "极光玻璃"
        },
        {
          "t": 47.5,
          "label": "三维软床"
        },
        {
          "t": 48.0,
          "label": "首字落地"
        },
        {
          "t": 49.0,
          "label": "第二字落地"
        },
        {
          "t": 49.5,
          "label": "第三字落地"
        },
        {
          "t": 50.0,
          "label": "第四字落地"
        },
        {
          "t": 50.875,
          "label": "字母再起"
        },
        {
          "t": 52.8,
          "label": "金属球入场"
        },
        {
          "t": 53.3,
          "label": "金属球悬停"
        },
        {
          "t": 53.5,
          "label": "砸落主拍"
        },
        {
          "t": 53.92,
          "label": "冠状波悬停"
        },
        {
          "t": 55.5,
          "label": "标语入场"
        },
        {
          "t": 57.5,
          "label": "脑洞拼贴"
        },
        {
          "t": 57.8333333,
          "label": "人像拍落"
        },
        {
          "t": 58.8333333,
          "label": "纸偶开口"
        },
        {
          "t": 59.8333333,
          "label": "剪线盖印"
        },
        {
          "t": 60.0,
          "label": "剪开头盖"
        },
        {
          "t": 61.1666667,
          "label": "动作悬停"
        },
        {
          "t": 61.5,
          "label": "脑洞弹开"
        },
        {
          "t": 61.8333333,
          "label": "火箭飞出"
        },
        {
          "t": 63.8333333,
          "label": "黑带拍入"
        },
        {
          "t": 64.1666667,
          "label": "脑洞大开"
        },
        {
          "t": 65.0,
          "label": "撕开纸页"
        },
        {
          "t": 65.8333333,
          "label": "刊名拍入"
        },
        {
          "t": 67.0,
          "label": "头盖合拢"
        }
      ],
      "reduced": 1.2,
      "root": "#stage",
      "fps": 30
    };
    await MotionKit.replay(config);

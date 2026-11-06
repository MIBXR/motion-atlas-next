const config = {
  "title": "章节主题：标签、强调色与四角框线",
  "segments": [
    {
      "caseId": "map-pilgrimage",
      "label": "原有演示",
      "source": "mechanism/scene.html",
      "nativeAudio": true,
      "from": 0,
      "to": 7.05
    }
  ],
  "markers": [
    {
      "t": 0,
      "label": "鸭川框线入场"
    },
    {
      "t": 1.65,
      "label": "框线退场"
    },
    {
      "t": 2.45,
      "label": "奈良胶带与网点"
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

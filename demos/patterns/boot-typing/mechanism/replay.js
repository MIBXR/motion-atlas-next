const config = {
  "title": "终端逐字开机序列",
  "segments": [
    {
      "caseId": "archive-os",
      "label": "原有演示",
      "source": "mechanism/scene.html",
      "nativeAudio": true,
      "from": 0,
      "to": 21.92
    }
  ],
  "markers": [],
  "reduced": 8.6,
  "root": "#stage",
  "orients": [
    "landscape"
  ],
  "fps": 30
};
    await MotionKit.replay(config);

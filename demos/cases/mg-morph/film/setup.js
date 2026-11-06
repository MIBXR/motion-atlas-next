document.body.insertAdjacentHTML('afterbegin', "<div id=\"stage\"><canvas id=\"c\" width=\"1920\" height=\"1080\"></canvas><svg id=\"svg\" width=\"0\" height=\"0\" style=\"position:absolute;left:-10px;top:-10px\"></svg></div>");
await import('./scene.js');

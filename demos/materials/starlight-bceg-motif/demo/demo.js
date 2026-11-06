const data = await (await MotionKit.load.fetch('demo/data/motif.json')).json();
const VF = Vex.Flow;
const app = document.querySelector('#app');
const audio = document.querySelector('#audio');
const mode = new URLSearchParams(location.search).get('demo') || 'tracks';
const labels = data.intro.evidenceLabels;
const palette = getComputedStyle(document.documentElement);
const white = palette.getPropertyValue('--white').trim();
const gold = palette.getPropertyValue('--gold').trim();
const keyNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const scales = [
  ['C', 'D', 'E', 'F', 'G', 'A', 'B'], ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
];
const pc = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const icon = type => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${{ play: '<path d="m8 5 11 7-11 7Z"/>', pause: '<path d="M8 5v14M16 5v14"/>', download: '<path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/>' }[type]}</svg>`;
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const keyLabel = key => (Array.isArray(key) ? key : [key]).map(k => k.replace(' major', ' 大调').replaceAll('Bb', 'B♭').replaceAll('Eb', 'E♭').replaceAll('Ab', 'A♭').replaceAll('Db', 'D♭').replaceAll('Gb', 'G♭').replaceAll('#', '♯')).join(' / ');
document.querySelector(`[data-mode="${mode}"]`).setAttribute('aria-current', 'page');

function drawNotation(host, score, degrees) {
  host.replaceChildren();
  const mapped = [];
  score.notes.forEach((note, i) => {
    mapped.push({ ...note, index: i, degree: degrees[i] });
    for (const rest of score.rests || []) if (rest.afterNote === i) mapped.push({ rest: true, duration: rest.duration, index: null });
  });
  const bars = [];
  let bar = [];
  for (const note of mapped) {
    bar.push(note);
    if (score.barlines.some(b => b.afterNote === note.index)) { bars.push(bar); bar = []; }
  }
  if (bar.length) bars.push(bar);
  const minimum = Math.max(260, Math.max(...bars.map(b => b.length)) * 26 + 100);
  const available = host.clientWidth;
  const perRow = Math.max(1, Math.min(bars.length, Math.floor(available / Math.min(minimum, 330))));
  const width = Math.max(available, minimum * perRow);
  const barWidth = width / perRow;
  const height = Math.ceil(bars.length / perRow) * 188 + 4;
  const renderer = new VF.Renderer(host, VF.Renderer.Backends.SVG);
  renderer.resize(width, height);
  const ctx = renderer.getContext();
  ctx.setFillStyle(white).setStrokeStyle(white);
  const noteMap = new Map();
  const beams = [], tuplets = [], staves = [];
  const fifthKeys = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
  bars.forEach((notes, b) => {
    const row = Math.floor(b / perRow), column = b % perRow;
    const stave = new VF.Stave(column * barWidth + 5, row * 188 + 46, barWidth - 10);
    staves.push(stave);
    if (column === 0) {
      stave.addClef(score.clef || 'treble');
      if (score.keySignature) stave.addKeySignature(fifthKeys[score.keySignature.fifths + 7]);
      if (score.timeSignature) stave.addTimeSignature(score.timeSignature);
    }
    const startIndex = notes.find(n => n.index !== null)?.index;
    const lastIndex = notes.filter(n => n.index !== null).at(-1)?.index;
    const beginRepeat = score.repeatSigns.some(r => r.beforeNote === startIndex && r.type === 'start-repeat');
    const end = score.barlines.find(x => x.afterNote === lastIndex);
    stave.setBegBarType(beginRepeat ? VF.Barline.type.REPEAT_BEGIN : VF.Barline.type.NONE);
    stave.setEndBarType(end?.type === 'end-repeat' ? VF.Barline.type.REPEAT_END : end ? VF.Barline.type.SINGLE : VF.Barline.type.NONE);
    stave.setStyle({ fillStyle: white, strokeStyle: white });
    stave.getModifiers().forEach(modifier => modifier.setStyle({ fillStyle: white, strokeStyle: white }));
    stave.setContext(ctx).draw();
    const vexNotes = notes.map(note => {
      const duration = note.tuplet?.writtenDuration ?? note.duration;
      const code = ({ 4: 'w', 2: 'h', 1: 'q', 0.5: '8', 0.25: '16', 0.125: '32' })[duration];
      const written = note.writtenPitch || 'B4';
      const parts = written.match(/^([A-G])([#b]?)(-?\d+)$/);
      const key = `${parts[1].toLowerCase()}${parts[2]}/${parts[3]}`;
      const n = new VF.StaveNote({ clef: score.clef || 'treble', keys: [note.rest ? 'b/4' : key], duration: code + (note.rest ? 'r' : ''), auto_stem: true });
      n.setStyle({ fillStyle: white, strokeStyle: white });
      if (note.accidentalShown) n.addModifier(new VF.Accidental({ sharp: '#', flat: 'b', natural: 'n' }[note.accidentalShown]), 0);
      if (note.index !== null) noteMap.set(note.index, { note: n, data: note, row });
      return n;
    });
    const tupletGroups = new Map();
    notes.forEach((note, i) => {
      if (note.tuplet) {
        const id = note.tuplet.group;
        if (!tupletGroups.has(id)) tupletGroups.set(id, []);
        tupletGroups.get(id).push(vexNotes[i]);
      }
    });
    const barBeams = tupletGroups.size ? [...tupletGroups.values()].map(group => new VF.Beam(group)) : VF.Beam.generateBeams(vexNotes, { groups: [new VF.Fraction(score.timeSignature === '3/4' ? 3 : 4, 4)] });
    for (const group of tupletGroups.values()) tuplets.push(new VF.Tuplet(group, { num_notes: 3, notes_occupied: 2, bracketed: false, ratioed: false }));
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables(vexNotes);
    beams.push(...barBeams);
    new VF.Formatter().joinVoices([voice]).format([voice], stave.getNoteEndX() - stave.getNoteStartX() - 16);
    voice.draw(ctx, stave);
  });
  beams.forEach(beam => beam.setContext(ctx).draw());
  tuplets.forEach(tuplet => tuplet.setContext(ctx).draw());
  for (const [index, entry] of noteMap) {
    if (!entry.data.tie?.toNext) continue;
    const next = noteMap.get(index + 1);
    if (next.row === entry.row) new VF.StaveTie({ first_note: entry.note, last_note: next.note, first_indices: [0], last_indices: [0] }).setContext(ctx).draw();
    else {
      new VF.StaveTie({ first_note: entry.note, first_indices: [0], last_indices: [0] }).setContext(ctx).draw();
      new VF.StaveTie({ last_note: next.note, first_indices: [0], last_indices: [0] }).setContext(ctx).draw();
    }
  }
  if (score.ottava) {
    for (let row = 0; row < Math.ceil(bars.length / perRow); row++) {
      const entries = [...noteMap.values()].filter(n => n.row === row);
      const bracket = new VF.TextBracket({ start: entries[0].note, stop: entries.at(-1).note, text: '8', position: VF.TextBracket.Position.TOP });
      bracket.render_options.color = white;
      bracket.setFont({ family: 'serif', size: 15 }).setContext(ctx).draw();
    }
  }
  const svg = host.querySelector('svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.style.width = '100%';
  svg.style.height = 'auto';
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `音高 ${score.notes.filter(n => !n.rest).map(n => n.pitch).join(' ')}`);
  host.dataset.pitches = score.notes.filter(n => !n.rest).map(n => n.pitch).join(' ');
  for (const { note, data: n, row } of noteMap.values()) {
    if (n.rest || n.degree === null || n.degree === undefined) continue;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', note.getAbsoluteX() + 5);
    text.setAttribute('y', row * 188 + 174);
    text.setAttribute('fill', gold);
    text.setAttribute('font-family', 'system-ui, sans-serif');
    text.setAttribute('font-size', '16');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = n.degree;
    svg.append(text);
  }
}

let selectedTrack, clipIndex = 0, playRequest = 0;
const audioFiles = new Map();
const notationJobs = [];
function watchNotation(host, score, degrees) {
  notationJobs.push({ host, score, degrees });
  drawNotation(host, score, degrees);
}
const resize = new ResizeObserver(() => {
  for (const job of notationJobs) if (job.host.isConnected) drawNotation(job.host, job.score, job.degrees);
});

function groupScores(scores) {
  const groups = new Map();
  for (const score of scores) {
    const signature = JSON.stringify([score.notes, score.keySignature, score.timeSignature, score.ottava, score.rests, score.repeatSigns]);
    if (!groups.has(signature)) groups.set(signature, []);
    groups.get(signature).push(score);
  }
  return [...groups.values()];
}

function selectTrack(no) {
  playRequest++;
  audio.pause();
  selectedTrack = data.tracks.find(t => t.no === no);
  clipIndex = 0;
  audio.removeAttribute('src');
  audio.dataset.clip = selectedTrack.clips[0].file;
  audio.load();
  notationJobs.length = 0;
  for (const button of document.querySelectorAll('.track-choice')) {
    if (Number(button.dataset.track) === no) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  }
  const detail = document.querySelector('.track-detail');
  detail.dataset.track = no;
  const correction = selectedTrack.videoNo !== selectedTrack.ostNo ? ` · 视频标为 ${selectedTrack.videoTitle}，音频来自 OST ${selectedTrack.ostNo} ${selectedTrack.ostTitle}` : '';
  detail.innerHTML = `<div class="album-head"><img class="cover" src="demo/assets/cover.jpg" alt="少女歌剧 TV 原声带封面"><div><div class="title-row"><span class="badge">${String(no).padStart(2, '0')}</span><h1>${escape(selectedTrack.title)}</h1></div><p class="track-meta">音频估计约 ${Math.round(selectedTrack.tempo)} BPM · ${selectedTrack.meter || '拍号未标'}${escape(correction)}</p></div></div><div class="position-bar" aria-label="OST 片段位置">${selectedTrack.clips.map((c, i) => `<button class="clip-range" data-clip="${i}" style="left:${c.trackT0 / selectedTrack.ostDuration * 100}%;width:${(c.trackT1 - c.trackT0) / selectedTrack.ostDuration * 100}%" aria-label="播放 ${fmt(c.trackT0)} 至 ${fmt(c.trackT1)}"></button>`).join('')}<span class="playhead"></span></div><div class="transport"><button class="icon-button" id="toggle-play" aria-label="播放">${icon('play')}<span>播放</span></button><time id="position-time"></time></div><div class="score-list"></div>`;
  for (const button of detail.querySelectorAll('[data-clip]')) button.addEventListener('click', event => {
    const rect = detail.querySelector('.position-bar').getBoundingClientRect();
    const clip = selectedTrack.clips[Number(button.dataset.clip)];
    const t = Math.min(clip.trackT1 - .01, Math.max(clip.trackT0, (event.clientX - rect.left) / rect.width * selectedTrack.ostDuration));
    playAt(t);
  });
  detail.querySelector('#toggle-play').addEventListener('click', toggleAudio);
  const list = detail.querySelector('.score-list');
  for (const group of groupScores(selectedTrack.scores)) {
    const score = group[0];
    const card = document.createElement('article');
    card.className = 'score-card';
    card.dataset.scoreIds = group.map(s => s.id).join(' ');
    card.windows = group.flatMap(s => s.windows);
    const occurrences = group.flatMap(s => s.occurrences);
    const evidences = [...new Set(occurrences.map(o => o.evidence))];
    card.innerHTML = `<div class="notation"></div><div class="score-footer"><span>${escape(keyLabel(score.key))}</span><a href="?demo=rhythms#${score.cellId}">${score.cellId}</a>${evidences.map(e => `<span class="evidence">${labels[e]}</span>`).join('')}</div><div class="times">${occurrences.map((o, i) => `<button class="time-button" data-occurrence="${i}" data-evidence="${o.evidence}">${fmt(o.trackT0)}<small>${labels[o.evidence]}</small></button>`).join('')}</div>`;
    list.append(card);
    for (const button of card.querySelectorAll('[data-occurrence]')) button.addEventListener('click', () => playAt(occurrences[Number(button.dataset.occurrence)].trackT0));
    watchNotation(card.querySelector('.notation'), score, score.degrees);
  }
  if (!selectedTrack.scores.length) {
    list.innerHTML = `<section class="audio-candidates"><h2>音频候选</h2>${selectedTrack.candidates.length ? `<div class="candidates">${selectedTrack.candidates.map((c, i) => `<button class="candidate" data-candidate="${i}"><time>${fmt(c.trackT0)}</time><span>${escape(keyLabel(c.key))}</span><span>匹配分 ${c.score.toFixed(3)}</span></button>`).join('')}</div>` : '<p class="empty">未检出达到阈值的候选</p>'}</section>`;
    for (const button of list.querySelectorAll('[data-candidate]')) button.addEventListener('click', () => playAt(selectedTrack.candidates[Number(button.dataset.candidate)].trackT0));
  }
  resize.disconnect();
  resize.observe(detail);
  updatePosition();
}

async function playAt(time) {
  const i = selectedTrack.clips.findIndex(c => time >= c.trackT0 && time < c.trackT1);
  if (i < 0) throw new Error('时刻不在收录片段内');
  const clip = selectedTrack.clips[i];
  const request = ++playRequest;
  audio.pause();
  if (!audioFiles.has(clip.file)) audioFiles.set(clip.file, MotionKit.load.fetch(clip.file).then(r => r.blob()).then(blob => URL.createObjectURL(blob)));
  const url = await audioFiles.get(clip.file);
  if (request !== playRequest) return;
  clipIndex = i;
  if (audio.src !== url) {
    audio.src = url;
    audio.dataset.clip = clip.file;
    audio.load();
    await new Promise(resolve => audio.addEventListener('loadedmetadata', resolve, { once: true }));
  }
  if (request !== playRequest) return;
  audio.currentTime = Math.max(0, time - clip.trackT0);
  await audio.play();
  updatePosition();
}
function toggleAudio() {
  if (!audio.getAttribute('src')) playAt(selectedTrack.clips[clipIndex].trackT0);
  else if (audio.paused) audio.play();
  else audio.pause();
}
function updatePosition() {
  if (!selectedTrack) return;
  const time = selectedTrack.clips[clipIndex].trackT0 + audio.currentTime;
  document.querySelector('.playhead').style.left = `${time / selectedTrack.ostDuration * 100}%`;
  document.querySelector('#position-time').textContent = `${fmt(time)} / ${fmt(selectedTrack.ostDuration)}`;
  const button = document.querySelector('#toggle-play');
  button.setAttribute('aria-label', audio.paused ? '播放' : '暂停');
  button.innerHTML = icon(audio.paused ? 'play' : 'pause') + `<span>${audio.paused ? '播放' : '暂停'}</span>`;
  for (const card of document.querySelectorAll('.score-card')) card.classList.toggle('is-playing', !audio.paused && card.windows.some(w => time >= w.trackT0 && time < w.trackT1));
}
audio.addEventListener('ended', async () => {
  if (clipIndex + 1 < selectedTrack.clips.length) {
    await playAt(selectedTrack.clips[clipIndex + 1].trackT0);
  }
  updatePosition();
});
for (const event of ['timeupdate', 'play', 'pause', 'loadedmetadata']) audio.addEventListener(event, updatePosition);

let context, master, delay, feedback, soundOn = true;
addEventListener('message', event => {
  if (event.origin !== location.origin || event.data?.type !== 'motion:sound') return;
  soundOn = !!event.data.on;
  audio.muted = !soundOn;
  if (master) master.gain.value = soundOn ? .25 : 0;
});
let oscillators = [], synthTimer, synthPlaying = false, lastCell = null;
function stopSynth() {
  clearTimeout(synthTimer);
  for (const osc of oscillators) osc.stop();
  oscillators = [];
  synthPlaying = false;
  document.querySelectorAll('[data-synth]').forEach(b => b.innerHTML = icon('play') + '<span>播放</span>');
  const all = document.querySelector('#play-all');
  if (all) all.innerHTML = icon('play') + '<span>全部播放</span>';
}
function transposed(cell) {
  const keyIndex = Number(document.querySelector('#key-select').value);
  const shift = keyIndex > 6 ? keyIndex - 12 : keyIndex;
  const notes = cell.notes.map(note => {
    if (note.rest) return { ...note };
    const value = note.midi + shift;
    const spelling = scales[keyIndex][note.degree - 1];
    const accidental = spelling.slice(1);
    const chromatic = pc[spelling[0]] + (accidental === '#' ? 1 : accidental === 'b' ? -1 : 0);
    const octave = Math.round((value - chromatic) / 12) - 1;
    return { ...note, midi: value, pitch: spelling + octave, writtenPitch: spelling + octave, accidentalShown: null };
  });
  const ottava = Math.max(...notes.filter(n => !n.rest).map(n => n.midi)) > 89;
  if (ottava) for (const n of notes) if (!n.rest) n.writtenPitch = n.writtenPitch.replace(/(-?\d+)$/, m => Number(m) - 1);
  const fifths = [0, -5, 2, -3, 4, -1, 6, 1, -4, 3, -2, 5][keyIndex];
  return { ...cell, notes, timeSignature: cell.meter, keySignature: { fifths }, ottava: ottava ? { octaveShift: 1 } : null, rests: [] };
}
function renderRhythms() {
  notationJobs.length = 0;
  for (const cell of data.cells) {
    const card = document.querySelector(`#${cell.id}`);
    const score = transposed(cell);
    watchNotation(card.querySelector('.notation'), score, score.notes.map(n => n.degree));
    const total = score.notes.reduce((sum, n) => sum + n.duration, 0);
    const pitches = score.notes.filter(n => !n.rest).map(n => n.midi);
    const min = Math.min(...pitches), max = Math.max(...pitches);
    let beat = 0;
    card.querySelector('.time-grid').innerHTML = score.notes.map(n => {
      const left = beat / total * 100;
      beat += n.duration;
      const top = n.rest ? 78 : 12 + (max - n.midi) / Math.max(1, max - min) * 62;
      return `<span class="grid-note${n.rest ? ' is-rest' : ''}" style="left:${left}%;width:${n.duration / total * 100}%;top:${top}px" title="${n.rest ? '休止' : n.pitch} · ${n.duration}">${n.rest ? '休止' : ''}</span>`;
    }).join('');
  }
}
async function playCells(cells) {
  stopSynth();
  if (!context) {
    context = new AudioContext();
    master = context.createGain(); master.gain.value = soundOn ? .25 : 0; master.connect(context.destination);
    delay = context.createDelay(); delay.delayTime.value = .18;
    feedback = context.createGain(); feedback.gain.value = .25;
    master.connect(delay); delay.connect(feedback); feedback.connect(delay); feedback.connect(context.destination);
  }
  await context.resume();
  synthPlaying = true;
  let time = context.currentTime + .03;
  const beat = 60 / Number(document.querySelector('#tempo').value);
  for (const cell of cells) {
    const score = transposed(cell);
    for (const note of score.notes) {
      if (!note.rest && !note.tie.fromPrevious) {
        const gain = context.createGain();
        gain.gain.setValueAtTime(.0001, time);
        gain.gain.exponentialRampToValueAtTime(1, time + .004);
        gain.gain.exponentialRampToValueAtTime(.0001, time + .9);
        gain.connect(master);
        for (const [type, ratio, volume] of [['triangle', 1, .78], ['sine', 1.2, .22]]) {
          const osc = context.createOscillator(), mix = context.createGain();
          osc.type = type; osc.frequency.value = 440 * 2 ** ((note.midi - 69) / 12) * ratio;
          mix.gain.value = volume; osc.connect(mix); mix.connect(gain); osc.start(time); osc.stop(time + .92);
          oscillators.push(osc);
        }
      }
      time += note.duration * beat;
    }
    time += .35;
  }
  if (cells.length === 1) document.querySelector(`[data-synth="${cells[0].id}"]`).innerHTML = icon('pause') + '<span>暂停</span>';
  else document.querySelector('#play-all').innerHTML = icon('pause') + '<span>暂停</span>';
  synthTimer = setTimeout(stopSynth, Math.max(0, (time - context.currentTime + .9) * 1000));
}

if (mode === 'tracks') {
  app.innerHTML = `<div class="track-layout"><aside class="track-list" aria-label="原声带曲目">${data.tracks.map(t => `<button class="track-choice" data-track="${t.no}"><span class="badge">${String(t.no).padStart(2, '0')}</span><span class="track-name">${escape(t.title)}</span><span class="score-count">${t.scores.length} 张</span></button>`).join('')}</aside><section class="track-detail" aria-label="曲目片段与谱例"></section></div>`;
  for (const button of app.querySelectorAll('[data-track]')) button.addEventListener('click', () => selectTrack(Number(button.dataset.track)));
  const initial = Number(location.hash.replace('#track-', '')) || data.tracks.find(t => t.scores.length).no;
  selectTrack(initial);
} else {
  app.innerHTML = `<div class="rhythm-page"><div class="rhythm-controls"><label>大调<select id="key-select" aria-label="大调">${keyNames.map((k, i) => `<option value="${i}">${escape(k.replace('b', '♭').replace('#', '♯'))}</option>`).join('')}</select></label><label>速度<input id="tempo" type="range" min="40" max="200" value="92" aria-label="速度"><output for="tempo">92 BPM</output></label><button class="icon-button" id="play-all">${icon('play')}<span>全部播放</span></button></div><div class="rhythm-cards">${data.cells.map(cell => `<article class="rhythm-card" id="${cell.id}"><div class="rhythm-heading"><h2>${cell.id}</h2><span>${cell.meter || '拍号未标'}</span></div><div class="notation"></div><div class="time-grid" aria-label="音高与时值网格"></div><div class="rhythm-footer"><span class="source-links">${cell.sourceTracks.length ? cell.sourceTracks.map(no => `<a href="?demo=tracks#track-${no}">${String(no).padStart(2, '0')} ${escape(data.tracks.find(t => t.no === no).title)}</a>`).join('') : '片头 · 片尾'}</span><button class="icon-button" data-synth="${cell.id}">${icon('play')}<span>播放</span></button><a class="download" download="${cell.id}.mid" href="${cell.midi}">${icon('download')}MIDI（C 调）</a></div></article>`).join('')}</div></div>`;
  renderRhythms();
  resize.observe(document.querySelector('.rhythm-page'));
  document.querySelector('#key-select').addEventListener('change', () => { stopSynth(); renderRhythms(); });
  document.querySelector('#tempo').addEventListener('input', event => { document.querySelector('output').textContent = `${event.target.value} BPM`; stopSynth(); });
  for (const button of app.querySelectorAll('[data-synth]')) button.addEventListener('click', () => {
    const cell = data.cells.find(c => c.id === button.dataset.synth);
    if (synthPlaying && lastCell === cell.id) stopSynth();
    else { lastCell = cell.id; playCells([cell]); }
  });
  document.querySelector('#play-all').addEventListener('click', () => { if (synthPlaying) stopSynth(); else { lastCell = null; playCells(data.cells); } });
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
}
document.addEventListener('keydown', event => {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return;
  if (event.code === 'Space') {
    event.preventDefault();
    if (mode === 'tracks') toggleAudio();
    else if (synthPlaying) stopSynth();
    else playCells(lastCell ? data.cells.filter(c => c.id === lastCell) : data.cells);
  }
  if (mode === 'tracks' && ['ArrowUp', 'ArrowDown'].includes(event.code)) {
    event.preventDefault();
    const index = data.tracks.indexOf(selectedTrack);
    const next = Math.min(data.tracks.length - 1, Math.max(0, index + (event.code === 'ArrowDown' ? 1 : -1)));
    selectTrack(data.tracks[next].no);
    document.querySelector(`[data-track="${selectedTrack.no}"]`).scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
});
await document.fonts.ready;
await Promise.all([...document.images].map(image => image.decode()));
MotionKit.expose(MotionKit.timeline({ duration: 1, render() {} }), { title: document.title });
document.documentElement.dataset.motifReady = 'true';

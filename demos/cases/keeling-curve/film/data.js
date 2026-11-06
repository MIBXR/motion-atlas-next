const rows = text => text.split(/\r?\n/).map((line, i) => ({ line: i + 1, cells: line.trim().split(/\s+/).map(Number), raw: line.trim() })).filter(r => r.raw && !r.raw.startsWith('#'));
export async function loadData() {
  const [mm, ann] = await Promise.all(['co2_mm_mlo.txt', 'co2_annmean_mlo.txt'].map(name => MotionKit.load.fetch(`./assets/${name}`).then(r => r.text())));
  const monthly = rows(mm).filter(r => r.cells[0] <= 2025).map(r => ({ year: r.cells[0], month: r.cells[1], date: r.cells[2], value: r.cells[3] >= 0 ? r.cells[3] : null, line: r.line }));
  const annual = rows(ann).map(r => ({ year: r.cells[0], value: r.cells[1], line: r.line }));
  return { monthly, annual, first: annual.find(d => d.year === 1959), last: annual.find(d => d.year === 2025) };
}

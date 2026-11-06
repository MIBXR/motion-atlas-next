import sys
from pathlib import Path
import json,math
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
REPO=Path(sys.argv[2]);CASE=REPO/'demos/cases/butterfly-garden-score';read=lambda p:json.loads(Path(p).read_text(encoding='utf8'))
fonts=read(CASE/'source/analysis/title-font-sources.json')
selected=next(item for item in fonts if item['family']=='Noto Sans JP');selected['path']=str(CASE/selected['fontFile']);font=TTFont(selected['path']);glyphSet=font.getGlyphSet(location={'wght':selected['weight']}if'fvar'in font else None);cmap=font.getBestCmap();scale=190/font['head'].unitsPerEm;tolerance=.10
def point(p):return [float(p[0])*scale,-float(p[1])*scale]
def distance(p,a,b):
    dx=b[0]-a[0];dy=b[1]-a[1];return abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/math.hypot(dx,dy)if dx or dy else math.hypot(p[0]-a[0],p[1]-a[1])
def middle(a,b):return[(a[0]+b[0])/2,(a[1]+b[1])/2]
class FlattenPen(BasePen):
    def __init__(self,glyphs):super().__init__(glyphs);self.contours=[];self.current=None;self.path=[]
    def _moveTo(self,p):self.path=[point(p)];self.current=point(p)
    def _lineTo(self,p):self.current=point(p);self.path.append(self.current)
    def _qCurveToOne(self,control,end):
        def flatten(a,b,c):
            if distance(b,a,c)<=tolerance:self.path.append(c);return
            ab=middle(a,b);bc=middle(b,c);m=middle(ab,bc);flatten(a,ab,m);flatten(m,bc,c)
        flatten(self.current,point(control),point(end));self.current=point(end)
    def _curveToOne(self,a,b,end):
        def flatten(p0,p1,p2,p3):
            if max(distance(p1,p0,p3),distance(p2,p0,p3))<=tolerance:self.path.append(p3);return
            a=middle(p0,p1);b=middle(p1,p2);c=middle(p2,p3);d=middle(a,b);e=middle(b,c);m=middle(d,e);flatten(p0,a,d,m);flatten(m,e,c,p3)
        flatten(self.current,point(a),point(b),point(end));self.current=point(end)
    def _closePath(self):self.contours.append([[round(x,5),round(y,5)]for x,y in self.path]);self.path=[];self.current=None
    def _endPath(self):self._closePath()
glyphs={}
for char in sorted(set('第二場ニ長調第三場イ長調第四場ホ長調')):
    pen=FlattenPen(glyphSet);glyphSet[cmap[ord(char)]].draw(pen);glyphs[char]=dict(advance=round(glyphSet[cmap[ord(char)]].width*scale,5),contours=pen.contours)
data=dict(font=dict(family=selected['family'],weight=selected['weight'],commit=selected['commit'],source=selected['source']),fontSize=190,curveTolerance=tolerance,fillRule='nonzero',glyphs=glyphs)
(CASE/'film/data/titleGlyphs.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf8');print('fontTools outlines',len(glyphs),'vertices',sum(len(p)for g in glyphs.values()for p in g['contours']),'bytes',(CASE/'film/data/titleGlyphs.json').stat().st_size,flush=True)

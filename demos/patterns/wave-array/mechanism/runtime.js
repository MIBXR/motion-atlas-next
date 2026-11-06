var pd=0,$c=1,md=2;var qr=1,Ro=2,Qs=3,dn=0,Ht=1,yn=2,Et=0,Yi=1,eh=2,th=3,nh=4,Ks=5;var fn=100,gd=101,xd=102,vd=103,Ad=104,Qr=200,Po=201,yd=202,_d=203,Ds=204,qi=205,Io=206,Md=207,Do=208,bd=209,Sd=210,Ed=211,wd=212,Td=213,Cd=214,so=0,ro=1,ao=2,Qi=3,oo=4,lo=5,co=6,ho=7,Lo=0,Rd=1,Pd=2,Pn=0,Kr=1,jr=2,Zr=3,ts=4,Jr=5,$r=6,ea=7,zc="attached",Id="detached",ih=300,Ni=301,ns=302,No=303,Oo=304,ta=306,Rn=1e3,xn=1001,Ls=1002,nt=1003,Uo=1004;var is=1005;var At=1006,js=1007;var In=1008;var rn=1009,sh=1010,rh=1011,Zs=1012,Fo=1013,Dn=1014,Zt=1015,Rt=1016,Bo=1017,ko=1018,Oi=1020,ah=35902,oh=35899,lh=1021,ch=1022,mn=1023,Fn=1026,Yn=1027,Js=1028,zo=1029,ss=1030,Ho=1031;var Vo=1033,na=33776,ia=33777,sa=33778,ra=33779,Go=35840,Wo=35841,Xo=35842,Yo=35843,qo=36196,Qo=37492,Ko=37496,jo=37488,Zo=37489,Jo=37490,$o=37491,el=37808,tl=37809,nl=37810,il=37811,sl=37812,rl=37813,al=37814,ol=37815,ll=37816,cl=37817,hl=37818,ul=37819,dl=37820,fl=37821,pl=36492,ml=36494,gl=36495,xl=36283,vl=36284,Al=36285,yl=36286;var Ki=2300,ji=2301,io=2302,Hc=2303,Vc=2400,Gc=2401,Wc=2402,Dd=2500;var hh=0,aa=1,$s=2,Ld=3200,uh=3201;var oa=0,Nd=1,mi="",vt="srgb",kt="srgb-linear",_r="linear",tt="srgb";var Xi=7680;var Xc=519,Od=512,Ud=513,Fd=514,_l=515,Bd=516,kd=517,Ml=518,zd=519,uo=35044,gi=35048;var dh="300 es",Tn=2e3,Ns=2001;function Cp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Rp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hd(){let i=Os("canvas");return i.style.display="block",i}var Pu={},Us=null;function Mr(...i){let e="THREE."+i.shift();Us?Us("log",e,...i):console.log(e,...i)}function Vd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ce(...i){i=Vd(i);let e="THREE."+i.shift();if(Us)Us("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Le(...i){i=Vd(i);let e="THREE."+i.shift();if(Us)Us("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function br(...i){let e=i.join(" ");e in Pu||(Pu[e]=!0,Ce(...i))}function Gd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Wd={[so]:ro,[ao]:co,[oo]:ho,[Qi]:lo,[ro]:so,[co]:ao,[ho]:oo,[lo]:Qi},li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Iu=1234567,Ar=Math.PI/180,Zi=180/Math.PI;function Cn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Qe(i,e,t){return Math.max(e,Math.min(t,i))}function fh(i,e){return(i%e+e)%e}function Pp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Ip(i,e,t){return i!==e?(t-i)/(e-i):0}function yr(i,e,t){return(1-t)*i+t*e}function Dp(i,e,t,n){return yr(i,e,1-Math.exp(-t*n))}function Lp(i,e=1){return e-Math.abs(fh(i,e*2)-e)}function Np(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Op(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Up(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Fp(i,e){return i+Math.random()*(e-i)}function Bp(i){return i*(.5-Math.random())}function kp(i){i!==void 0&&(Iu=i);let e=Iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zp(i){return i*Ar}function Hp(i){return i*Zi}function Vp(i){return(i&i-1)===0&&i!==0}function Gp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xp(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:Ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Pe={DEG2RAD:Ar,RAD2DEG:Zi,generateUUID:Cn,clamp:Qe,euclideanModulo:fh,mapLinear:Pp,inverseLerp:Ip,lerp:yr,damp:Dp,pingpong:Lp,smoothstep:Np,smootherstep:Op,randInt:Up,randFloat:Fp,randFloatSpread:Bp,seededRandom:kp,degToRad:zp,radToDeg:Hp,isPowerOfTwo:Vp,ceilPowerOfTwo:Gp,floorPowerOfTwo:Wp,setQuaternionFromProperEuler:Xp,normalize:st,denormalize:wn},De=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},pn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(d!==v||c!==u||l!==f||h!==g){let p=c*u+l*f+h*g+d*v;p<0&&(u=-u,f=-f,g=-g,v=-v,p=-p);let m=1-o;if(p<.9995){let y=Math.acos(p),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,c=c*m+u*o,l=l*m+f*o,h=h*m+g*o,d=d*m+v*o}else{c=c*m+u*o,l=l*m+f*o,h=h*m+g*o,d=d*m+v*o;let y=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=y,l*=y,h*=y,d*=y}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-o*f,e[t+2]=l*g+h*f+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Du.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Du.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pc.copy(this).projectOnVector(e),this.sub(pc)}reflect(e){return this.sub(pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},pc=new I,Du=new pn,He=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=s[0],p=s[3],m=s[6],y=s[1],b=s[4],M=s[7],T=s[2],w=s[5],R=s[8];return r[0]=a*v+o*y+c*T,r[3]=a*p+o*b+c*w,r[6]=a*m+o*M+c*R,r[1]=l*v+h*y+d*T,r[4]=l*p+h*b+d*w,r[7]=l*m+h*M+d*R,r[2]=u*v+f*y+g*T,r[5]=u*p+f*b+g*w,r[8]=u*m+f*M+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(s*l-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(mc.makeScale(e,t)),this}rotate(e){return this.premultiply(mc.makeRotation(-e)),this}translate(e,t){return this.premultiply(mc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},mc=new He,Lu=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nu=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yp(){let i={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?_r:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return br("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return br("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[kt]:{primaries:e,whitePoint:n,transfer:_r,toXYZ:Lu,fromXYZ:Nu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vt},outputColorSpaceConfig:{drawingBufferColorSpace:vt}},[vt]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:Lu,fromXYZ:Nu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vt}}}),i}var Ye=Yp();function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xs,fo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xs===void 0&&(xs=Os("canvas")),xs.width=e.width,xs.height=e.height;let s=xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=xs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Os("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},qp=0,Fs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gc(s[a].image)):r.push(gc(s[a]))}else r=gc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function gc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}var Qp=0,xc=new I,ut=class i extends li{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=xn,s=xn,r=At,a=In,o=mn,c=rn,l=i.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=Cn(),this.name="",this.source=new Fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xc).x}get height(){return this.source.getSize(xc).y}get depth(){return this.source.getSize(xc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ih)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rn:e.x=e.x-Math.floor(e.x);break;case xn:e.x=e.x<0?0:1;break;case Ls:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rn:e.y=e.y-Math.floor(e.y);break;case xn:e.y=e.y<0?0:1;break;case Ls:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ut.DEFAULT_IMAGE=null;ut.DEFAULT_MAPPING=ih;ut.DEFAULT_ANISOTROPY=1;var mt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,M=(f+1)/2,T=(m+1)/2,w=(h+u)/4,R=(d+v)/4,A=(g+p)/4;return b>M&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=R/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=A/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=A/r),this.set(n,s,r,t),this}let y=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},po=class extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new ut(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:At,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Fs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},yt=class extends po{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Sr=class extends ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nt,this.minFilter=nt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var mo=class extends ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nt,this.minFilter=nt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ne=class i{constructor(e,t,n,s,r,a,o,c,l,h,d,u,f,g,v,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,f,g,v,p)}set(e,t,n,s,r,a,o,c,l,h,d,u,f,g,v,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,s=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,f=c*d,g=l*h,v=l*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,f=c*d,g=l*h,v=l*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,f=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*c,f=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kp,e,jp)}lookAt(e,t,n){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),bi.crossVectors(n,hn),bi.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),bi.crossVectors(n,hn)),bi.normalize(),Ia.crossVectors(hn,bi),s[0]=bi.x,s[4]=Ia.x,s[8]=hn.x,s[1]=bi.y,s[5]=Ia.y,s[9]=hn.y,s[2]=bi.z,s[6]=Ia.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],p=n[10],m=n[14],y=n[3],b=n[7],M=n[11],T=n[15],w=s[0],R=s[4],A=s[8],S=s[12],W=s[1],C=s[5],U=s[9],F=s[13],k=s[2],X=s[6],z=s[10],B=s[14],te=s[3],J=s[7],ce=s[11],de=s[15];return r[0]=a*w+o*W+c*k+l*te,r[4]=a*R+o*C+c*X+l*J,r[8]=a*A+o*U+c*z+l*ce,r[12]=a*S+o*F+c*B+l*de,r[1]=h*w+d*W+u*k+f*te,r[5]=h*R+d*C+u*X+f*J,r[9]=h*A+d*U+u*z+f*ce,r[13]=h*S+d*F+u*B+f*de,r[2]=g*w+v*W+p*k+m*te,r[6]=g*R+v*C+p*X+m*J,r[10]=g*A+v*U+p*z+m*ce,r[14]=g*S+v*F+p*B+m*de,r[3]=y*w+b*W+M*k+T*te,r[7]=y*R+b*C+M*X+T*J,r[11]=y*A+b*U+M*z+T*ce,r[15]=y*S+b*F+M*B+T*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15],y=c*f-l*u,b=o*f-l*d,M=o*u-c*d,T=a*f-l*h,w=a*u-c*h,R=a*d-o*h;return t*(v*y-p*b+m*M)-n*(g*y-p*T+m*w)+s*(g*b-v*T+m*R)-r*(g*M-v*w+p*R)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],y=t*o-n*a,b=t*c-s*a,M=t*l-r*a,T=n*c-s*o,w=n*l-r*o,R=s*l-r*c,A=h*v-d*g,S=h*p-u*g,W=h*m-f*g,C=d*p-u*v,U=d*m-f*v,F=u*m-f*p,k=y*F-b*U+M*C+T*W-w*S+R*A;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/k;return e[0]=(o*F-c*U+l*C)*X,e[1]=(s*U-n*F-r*C)*X,e[2]=(v*R-p*w+m*T)*X,e[3]=(u*w-d*R-f*T)*X,e[4]=(c*W-a*F-l*S)*X,e[5]=(t*F-s*W+r*S)*X,e[6]=(p*M-g*R-m*b)*X,e[7]=(h*R-u*M+f*b)*X,e[8]=(a*U-o*W+l*A)*X,e[9]=(n*W-t*U-r*A)*X,e[10]=(g*w-v*M+m*y)*X,e[11]=(d*M-h*w-f*y)*X,e[12]=(o*S-a*C-c*A)*X,e[13]=(t*C-n*S+s*A)*X,e[14]=(v*b-g*T-p*y)*X,e[15]=(h*T-d*b+u*y)*X,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,v=a*h,p=a*d,m=o*d,y=c*l,b=c*h,M=c*d,T=n.x,w=n.y,R=n.z;return s[0]=(1-(v+m))*T,s[1]=(f+M)*T,s[2]=(g-b)*T,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(u+m))*w,s[6]=(p+y)*w,s[7]=0,s[8]=(g+b)*R,s[9]=(p-y)*R,s[10]=(1-(u+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=vs.set(s[0],s[1],s[2]).length(),o=vs.set(s[4],s[5],s[6]).length(),c=vs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),bn.copy(this);let l=1/a,h=1/o,d=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Tn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===Tn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Ns)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Tn,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===Tn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Ns)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vs=new I,bn=new Ne,Kp=new I(0,0,0),jp=new I(1,1,1),bi=new I,Ia=new I,hn=new I,Ou=new Ne,Uu=new pn,vn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ou.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ou,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uu.setFromEuler(this),this.setFromQuaternion(Uu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var Bs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zp=0,Fu=new I,As=new pn,ti=new Ne,Da=new I,dr=new I,Jp=new I,$p=new pn,Bu=new I(1,0,0),ku=new I(0,1,0),zu=new I(0,0,1),Hu={type:"added"},em={type:"removed"},ys={type:"childadded",child:null},vc={type:"childremoved",child:null},lt=class i extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new vn,n=new pn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ne},normalMatrix:{value:new He}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Bu,e)}rotateY(e){return this.rotateOnAxis(ku,e)}rotateZ(e){return this.rotateOnAxis(zu,e)}translateOnAxis(e,t){return Fu.copy(e).applyQuaternion(this.quaternion),this.position.add(Fu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bu,e)}translateY(e){return this.translateOnAxis(ku,e)}translateZ(e){return this.translateOnAxis(zu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(dr,Da,this.up):ti.lookAt(Da,dr,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),As.setFromRotationMatrix(ti),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hu),ys.child=e,this.dispatchEvent(ys),ys.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(em),vc.child=e,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hu),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,e,Jp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,$p,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};lt.DEFAULT_UP=new I(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var $t=class extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},tm={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},La={h:0,s:0,l:0};function Ac(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=fh(e,1),t=Qe(t,0,1),n=Qe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ac(a,r,e+1/3),this.g=Ac(a,r,e),this.b=Ac(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=Xd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return Ye.workingToColorSpace(Yt.copy(this),e),Math.round(Qe(Yt.r*255,0,255))*65536+Math.round(Qe(Yt.g*255,0,255))*256+Math.round(Qe(Yt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=vt){Ye.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(La);let n=yr(Si.h,La.h,t),s=yr(Si.s,La.s,t),r=yr(Si.l,La.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new ve;ve.NAMES=Xd;var Er=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ve(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ci=class extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sn=new I,ni=new I,yc=new I,ii=new I,_s=new I,Ms=new I,Vu=new I,_c=new I,Mc=new I,bc=new I,Sc=new mt,Ec=new mt,wc=new mt,Ri=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Sn.subVectors(e,t),s.cross(Sn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Sn.subVectors(s,t),ni.subVectors(n,t),yc.subVectors(e,t);let a=Sn.dot(Sn),o=Sn.dot(ni),c=Sn.dot(yc),l=ni.dot(ni),h=ni.dot(yc),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ii.x),c.addScaledVector(a,ii.y),c.addScaledVector(o,ii.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sc.setScalar(0),Ec.setScalar(0),wc.setScalar(0),Sc.fromBufferAttribute(e,t),Ec.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sc,r.x),a.addScaledVector(Ec,r.y),a.addScaledVector(wc,r.z),a}static isFrontFacing(e,t,n,s){return Sn.subVectors(n,t),ni.subVectors(e,t),Sn.cross(ni).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Sn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;_s.subVectors(s,n),Ms.subVectors(r,n),_c.subVectors(e,n);let c=_s.dot(_c),l=Ms.dot(_c);if(c<=0&&l<=0)return t.copy(n);Mc.subVectors(e,s);let h=_s.dot(Mc),d=Ms.dot(Mc);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(_s,a);bc.subVectors(e,r);let f=_s.dot(bc),g=Ms.dot(bc);if(g>=0&&f<=g)return t.copy(r);let v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ms,o);let p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Vu.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Vu,o);let m=1/(p+v+u);return a=v*m,o=u*m,t.copy(n).addScaledVector(_s,a).addScaledVector(Ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ot=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Na.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox)),Na.applyMatrix4(e.matrixWorld),this.union(Na)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),Oa.subVectors(this.max,fr),bs.subVectors(e.a,fr),Ss.subVectors(e.b,fr),Es.subVectors(e.c,fr),Ei.subVectors(Ss,bs),wi.subVectors(Es,Ss),Hi.subVectors(bs,Es);let t=[0,-Ei.z,Ei.y,0,-wi.z,wi.y,0,-Hi.z,Hi.y,Ei.z,0,-Ei.x,wi.z,0,-wi.x,Hi.z,0,-Hi.x,-Ei.y,Ei.x,0,-wi.y,wi.x,0,-Hi.y,Hi.x,0];return!Tc(t,bs,Ss,Es,Oa)||(t=[1,0,0,0,1,0,0,0,1],!Tc(t,bs,Ss,Es,Oa))?!1:(Ua.crossVectors(Ei,wi),t=[Ua.x,Ua.y,Ua.z],Tc(t,bs,Ss,Es,Oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},si=[new I,new I,new I,new I,new I,new I,new I,new I],En=new I,Na=new Ot,bs=new I,Ss=new I,Es=new I,Ei=new I,wi=new I,Hi=new I,fr=new I,Oa=new I,Ua=new I,Vi=new I;function Tc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Vi.fromArray(i,r);let o=s.x*Math.abs(Vi.x)+s.y*Math.abs(Vi.y)+s.z*Math.abs(Vi.z),c=e.dot(Vi),l=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Tt=new I,Fa=new De,nm=0,Ct=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=uo,this.updateRanges=[],this.gpuType=Zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fa.fromBufferAttribute(this,t),Fa.applyMatrix3(e),this.setXY(t,Fa.x,Fa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==uo&&(e.usage=this.usage),e}};var wr=class extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Tr=class extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Nt=class extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}},im=new Ot,pr=new I,Cc=new I,en=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):im.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);let t=pr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(pr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(Cc)),this.expandByPoint(pr.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},sm=0,gn=new Ne,Rc=new lt,ws=new I,un=new Ot,mr=new Ot,Lt=new I,zt=class i extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cp(e)?Tr:wr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ot);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(un.min,mr.min),un.expandByPoint(Lt),Lt.addVectors(un.max,mr.max),un.expandByPoint(Lt)):(un.expandByPoint(mr.min),un.expandByPoint(mr.max))}un.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Lt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Lt.fromBufferAttribute(o,l),c&&(ws.fromBufferAttribute(e,l),Lt.add(ws)),s=Math.max(s,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let A=0;A<n.count;A++)o[A]=new I,c[A]=new I;let l=new I,h=new I,d=new I,u=new De,f=new De,g=new De,v=new I,p=new I;function m(A,S,W){l.fromBufferAttribute(n,A),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,W),u.fromBufferAttribute(r,A),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,W),h.sub(l),d.sub(l),f.sub(u),g.sub(u);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[A].add(v),o[S].add(v),o[W].add(v),c[A].add(p),c[S].add(p),c[W].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let A=0,S=y.length;A<S;++A){let W=y[A],C=W.start,U=W.count;for(let F=C,k=C+U;F<k;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let b=new I,M=new I,T=new I,w=new I;function R(A){T.fromBufferAttribute(s,A),w.copy(T);let S=o[A];b.copy(S),b.sub(T.multiplyScalar(T.dot(S))).normalize(),M.crossVectors(w,S);let C=M.dot(c[A])<0?-1:1;a.setXYZW(A,b.x,b.y,b.z,C)}for(let A=0,S=y.length;A<S;++A){let W=y[A],C=W.start,U=W.count;for(let F=C,k=C+U;F<k;F+=3)R(e.getX(F+0)),R(e.getX(F+1)),R(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new I,r=new I,a=new I,o=new I,c=new I,l=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),f=0,g=0;for(let v=0,p=c.length;v<p;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new Ct(u,h,d)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},zs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=uo,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Qt=new I,Hs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Mr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Mr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},rm=0,Ut=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Yi,this.side=dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ds,this.blendDst=qi,this.blendEquation=fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ds&&(n.blendSrc=this.blendSrc),this.blendDst!==qi&&(n.blendDst=this.blendDst),this.blendEquation!==fn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ri=new I,Pc=new I,Ba=new I,Ti=new I,Ic=new I,ka=new I,Dc=new I,Pi=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Pc.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub(Pc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ba),o=Ti.dot(this.direction),c=-Ti.dot(Ba),l=Ti.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Pc).addScaledVector(Ba,u),f}intersectSphere(e,t){ri.subVectors(e.center,this.origin);let n=ri.dot(this.direction),s=ri.dot(ri)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,n,s,r){Ic.subVectors(t,e),ka.subVectors(n,e),Dc.crossVectors(Ic,ka);let a=this.direction.dot(Dc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ti.subVectors(this.origin,e);let c=o*this.direction.dot(ka.crossVectors(Ti,ka));if(c<0)return null;let l=o*this.direction.dot(Ic.cross(Ti));if(l<0||c+l>a)return null;let h=-o*Ti.dot(Dc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Kt=class extends Ut{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Gu=new Ne,Gi=new Pi,za=new en,Wu=new I,Ha=new I,Va=new I,Ga=new I,Lc=new I,Wa=new I,Xu=new I,Xa=new I,ke=class extends lt{constructor(e=new zt,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Wa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(Lc.fromBufferAttribute(d,e),a?Wa.addScaledVector(Lc,h):Wa.addScaledVector(Lc.sub(t),h))}t.add(Wa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(za.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(za,Wu)===null||Gi.origin.distanceToSquared(Wu)>(e.far-e.near)**2))&&(Gu.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(Gu),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),b=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,T=b;M<T;M+=3){let w=o.getX(M),R=o.getX(M+1),A=o.getX(M+2);s=Ya(this,m,e,n,l,h,d,w,R,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let y=o.getX(p),b=o.getX(p+1),M=o.getX(p+2);s=Ya(this,a,e,n,l,h,d,y,b,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),b=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,T=b;M<T;M+=3){let w=M,R=M+1,A=M+2;s=Ya(this,m,e,n,l,h,d,w,R,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let y=p,b=p+1,M=p+2;s=Ya(this,a,e,n,l,h,d,y,b,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function am(i,e,t,n,s,r,a,o){let c;if(e.side===Ht?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===dn,o),c===null)return null;Xa.copy(o),Xa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Xa);return l<t.near||l>t.far?null:{distance:l,point:Xa.clone(),object:i}}function Ya(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ha),i.getVertexPosition(c,Va),i.getVertexPosition(l,Ga);let h=am(i,e,t,n,Ha,Va,Ga,Xu);if(h){let d=new I;Ri.getBarycoord(Xu,Ha,Va,Ga,d),s&&(h.uv=Ri.getInterpolatedAttribute(s,o,c,l,d,new De)),r&&(h.uv1=Ri.getInterpolatedAttribute(r,o,c,l,d,new De)),a&&(h.normal=Ri.getInterpolatedAttribute(a,o,c,l,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new I,materialIndex:0};Ri.getNormal(Ha,Va,Ga,u.normal),h.face=u,h.barycoord=d}return h}var Yu=new I,qu=new mt,Qu=new mt,om=new I,Ku=new Ne,qa=new I,Nc=new en,ju=new Ne,Oc=new Pi,Cr=class extends ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zc,this.bindMatrix=new Ne,this.bindMatrixInverse=new Ne,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ot),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingBox.expandByPoint(qa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingSphere.expandByPoint(qa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nc.copy(this.boundingSphere),Nc.applyMatrix4(s),e.ray.intersectsSphere(Nc)!==!1&&(ju.copy(s).invert(),Oc.copy(e.ray).applyMatrix4(ju),!(this.boundingBox!==null&&Oc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Oc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Id?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ce("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;qu.fromBufferAttribute(s.attributes.skinIndex,e),Qu.fromBufferAttribute(s.attributes.skinWeight,e),Yu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Qu.getComponent(r);if(a!==0){let o=qu.getComponent(r);Ku.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(om.copy(Yu).applyMatrix4(Ku),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Vs=class extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ii=class extends ut{constructor(e=null,t=1,n=1,s,r,a,o,c,l=nt,h=nt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zu=new Ne,lm=new Ne,Rr=class i{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ce("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ne)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ne;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:lm;Zu.multiplyMatrices(o,t[r]),Zu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ii(t,e,e,mn,Zt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ce("Skeleton: No bone found with UUID:",r),a=new Vs),this.bones.push(a),this.boneInverses.push(new Ne().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},tn=class extends Ct{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ts=new Ne,Ju=new Ne,Qa=[],$u=new Ot,cm=new Ne,gr=new ke,xr=new en,jt=class extends ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tn(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,cm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ot),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),$u.copy(e.boundingBox).applyMatrix4(Ts),this.boundingBox.union($u)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new en),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),xr.copy(e.boundingSphere).applyMatrix4(Ts),this.boundingSphere.union(xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(gr.geometry=this.geometry,gr.material=this.material,gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(n),e.ray.intersectsSphere(xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ts),Ju.multiplyMatrices(n,Ts),gr.matrixWorld=Ju,gr.raycast(e,Qa);for(let a=0,o=Qa.length;a<o;a++){let c=Qa[a];c.instanceId=r,c.object=this,t.push(c)}Qa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ii(new Float32Array(s*this.count),s,this.count,Js,Zt));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Uc=new I,hm=new I,um=new He,On=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Uc.subVectors(n,t).cross(hm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Uc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||um.getNormalMatrix(e),s=this.coplanarPoint(Uc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Wi=new en,dm=new De(.5,.5),Ka=new I,Bn=class{constructor(e=new On,t=new On,n=new On,s=new On,r=new On,a=new On){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],p=r[10],m=r[11],y=r[12],b=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-a,f-h,m-g,T-y).normalize(),s[1].setComponents(l+a,f+h,m+g,T+y).normalize(),s[2].setComponents(l+o,f+d,m+v,T+b).normalize(),s[3].setComponents(l-o,f-d,m-v,T-b).normalize(),n)s[4].setComponents(c,u,p,M).normalize(),s[5].setComponents(l-c,f-u,m-p,T-M).normalize();else if(s[4].setComponents(l-c,f-u,m-p,T-M).normalize(),t===Tn)s[5].setComponents(l+c,f+u,m+p,T+M).normalize();else if(t===Ns)s[5].setComponents(c,u,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);let t=dm.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ka.x=s.normal.x>0?e.max.x:e.min.x,Ka.y=s.normal.y>0?e.max.y:e.min.y,Ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Gs=class extends Ut{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},go=new I,xo=new I,ed=new Ne,vr=new Pi,ja=new en,Fc=new I,td=new I,Ji=class extends lt{constructor(e=new zt,t=new Gs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)go.fromBufferAttribute(t,s-1),xo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=go.distanceTo(xo);e.setAttribute("lineDistance",new Nt(n,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(s),ja.radius+=r,e.ray.intersectsSphere(ja)===!1)return;ed.copy(s).invert(),vr.copy(e.ray).applyMatrix4(ed);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,p=g-1;v<p;v+=l){let m=h.getX(v),y=h.getX(v+1),b=Za(this,e,vr,c,m,y,v);b&&t.push(b)}if(this.isLineLoop){let v=h.getX(g-1),p=h.getX(f),m=Za(this,e,vr,c,v,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=f,p=g-1;v<p;v+=l){let m=Za(this,e,vr,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){let v=Za(this,e,vr,c,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Za(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(go.fromBufferAttribute(o,s),xo.fromBufferAttribute(o,r),t.distanceSqToSegment(go,xo,Fc,td)>n)return;Fc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Fc);if(!(l<e.near||l>e.far))return{distance:l,point:td.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var nd=new I,id=new I,Pr=class extends Ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)nd.fromBufferAttribute(t,s),id.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+nd.distanceTo(id);e.setAttribute("lineDistance",new Nt(n,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ir=class extends Ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ws=class extends Ut{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},sd=new Ne,Yc=new Pi,Ja=new en,$a=new I,Dr=class extends lt{constructor(e=new zt,t=new Ws){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;sd.copy(s).invert(),Yc.copy(e.ray).applyMatrix4(sd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,v=f;g<v;g++){let p=l.getX(g);$a.fromBufferAttribute(d,p),rd($a,p,c,s,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,v=f;g<v;g++)$a.fromBufferAttribute(d,g),rd($a,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function rd(i,e,t,n,s,r,a){let o=Yc.distanceSqToPoint(i);if(o<t){let c=new I;Yc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Lr=class extends ut{constructor(e=[],t=Ni,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},$i=class extends ut{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},kn=class extends ut{constructor(e,t,n=Dn,s,r,a,o=nt,c=nt,l,h=Fn,d=1){if(h!==Fn&&h!==Yn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},vo=class extends kn{constructor(e,t=Dn,n=Ni,s,r,a=nt,o=nt,c,l=Fn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Nr=class extends ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Di=class i extends zt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(h,3)),this.setAttribute("uv",new Nt(d,2));function g(v,p,m,y,b,M,T,w,R,A,S){let W=M/R,C=T/A,U=M/2,F=T/2,k=w/2,X=R+1,z=A+1,B=0,te=0,J=new I;for(let ce=0;ce<z;ce++){let de=ce*C-F;for(let he=0;he<X;he++){let Oe=he*W-U;J[v]=Oe*y,J[p]=de*b,J[m]=k,l.push(J.x,J.y,J.z),J[v]=0,J[p]=0,J[m]=w>0?1:-1,h.push(J.x,J.y,J.z),d.push(he/R),d.push(1-ce/A),B+=1}}for(let ce=0;ce<A;ce++)for(let de=0;de<R;de++){let he=u+de+X*ce,Oe=u+de+X*(ce+1),Je=u+(de+1)+X*(ce+1),je=u+(de+1)+X*ce;c.push(he,Oe,je),c.push(Oe,Je,je),te+=6}o.addGroup(f,te,S),f+=te,u+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var hi=class i extends zt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){let y=m*u-a;for(let b=0;b<l;b++){let M=b*d-r;g.push(M,-y,0),v.push(0,0,1),p.push(b/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<o;y++){let b=y+l*m,M=y+l*(m+1),T=y+1+l*(m+1),w=y+1+l*m;f.push(b,M,w),f.push(M,T,w)}this.setIndex(f),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=rs(i[t]);for(let s in n)e[s]=n[s]}return e}function fm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ph(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var Vt={clone:rs,merge:qt},pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dt=class extends Ut{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pm,this.fragmentShader=mm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=fm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Xs=class extends dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},An=class extends Ut{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oa,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},nn=class extends An{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Or=class extends Ut{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oa,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Ur=class extends Ut{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oa,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Lo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ys=class extends Ut{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ao=class extends Ut{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function eo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function gm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function ad(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Yd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var zn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yo=class extends zn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vc,endingEnd:Vc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Gc:r=e,o=2*t-n;break;case Wc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Gc:a=e,c=2*n-t;break;case Wc:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,p=v*g,m=-u*p+2*u*v-u*g,y=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*g+1,b=(-1-f)*p+(1.5+f)*v+.5*g,M=f*p-f*v;for(let T=0;T!==o;++T)r[T]=m*a[h+T]+y*a[l+T]+b*a[c+T]+M*a[d+T];return r}},_o=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},Mo=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},bo=class extends zn{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let v=(n-t)/(s-t),p=1-v;for(let m=0;m!==o;++m)r[m]=a[l+m]*p+a[c+m]*v;return r}let f=o*2,g=e-1;for(let v=0;v!==o;++v){let p=a[l+v],m=a[c+v],y=g*f+v*2,b=u[y],M=u[y+1],T=e*f+v*2,w=d[T],R=d[T+1],A=(n-t)/(s-t),S,W,C,U,F;for(let k=0;k<8;k++){S=A*A,W=S*A,C=1-A,U=C*C,F=U*C;let z=F*t+3*U*A*b+3*C*S*w+W*s-n;if(Math.abs(z)<1e-10)break;let B=3*U*(b-t)+6*C*A*(w-b)+3*S*(s-w);if(Math.abs(B)<1e-10)break;A=A-z/B,A=Math.max(0,Math.min(1,A))}r[v]=F*p+3*U*A*M+3*C*S*R+W*m}return r}},sn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=eo(t,this.TimeBufferType),this.values=eo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:eo(e.times,Array),values:eo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new bo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ki:t=this.InterpolantFactoryMethodDiscrete;break;case ji:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break;case Hc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ce("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ki;case this.InterpolantFactoryMethodLinear:return ji;case this.InterpolantFactoryMethodSmooth:return io;case this.InterpolantFactoryMethodBezier:return Hc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Le("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Le("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Rp(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Le("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===io,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let v=t[d+g];if(v!==t[u+g]||v!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};sn.prototype.ValueTypeName="";sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=ji;var ui=class extends sn{constructor(e,t,n){super(e,t,n)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Ki;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Fr=class extends sn{constructor(e,t,n,s){super(e,t,n,s)}};Fr.prototype.ValueTypeName="color";var Hn=class extends sn{constructor(e,t,n,s){super(e,t,n,s)}};Hn.prototype.ValueTypeName="number";var So=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)pn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Vn=class extends sn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}};Vn.prototype.ValueTypeName="quaternion";Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends sn{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Ki;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var Gn=class extends sn{constructor(e,t,n,s){super(e,t,n,s)}};Gn.prototype.ValueTypeName="vector";var Br=class{constructor(e="",t=-1,n=[],s=Dd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(vm(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(sn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=gm(c);c=ad(c,1,h),l=ad(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Hn(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let d=h[1],u=s[d];u||(s[d]=u=[]),u.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(Ce("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Le("AnimationClip: No animation in JSONLoader data."),null;let n=function(d,u,f,g,v){if(f.length!==0){let p=[],m=[];Yd(f,p,m,g),p.length!==0&&v.push(new d(u,p,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let u=l[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let v=0;v<u[g].morphTargets.length;v++)f[u[g].morphTargets[v]]=-1;for(let v in f){let p=[],m=[];for(let y=0;y!==u[g].morphTargets.length;++y){let b=u[g];p.push(b.time),m.push(b.morphTarget===v?1:0)}s.push(new Hn(".morphTargetInfluence["+v+"]",p,m))}c=f.length*a}else{let f=".bones["+t[d].name+"]";n(Gn,f+".position",u,"pos",s),n(Vn,f+".quaternion",u,"rot",s),n(Gn,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function xm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hn;case"vector":case"vector2":case"vector3":case"vector4":return Gn;case"color":return Fr;case"quaternion":return Vn;case"bool":case"boolean":return ui;case"string":return di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function vm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=xm(i.type);if(i.times===void 0){let t=[],n=[];Yd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Un={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(od(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!od(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function od(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Eo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qd=new Eo,Wn=class{constructor(e){this.manager=e!==void 0?e:qd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ai={},qc=class extends Error{constructor(e,t){super(e),this.response=t}},qs=class extends Wn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Un.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ai[e]!==void 0){ai[e].push({onLoad:t,onProgress:n,onError:s});return}ai[e]=[],ai[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ce("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ai[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0,v=0,p=new ReadableStream({start(m){y();function y(){d.read().then(({done:b,value:M})=>{if(b)m.close();else{v+=M.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let w=0,R=h.length;w<R;w++){let A=h[w];A.onProgress&&A.onProgress(T)}m.enqueue(M),y()}},b=>{m.error(b)})}}});return new Response(p)}else throw new qc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Un.add(`file:${e}`,l);let h=ai[e];delete ai[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=ai[e];if(h===void 0)throw this.manager.itemError(e),l;delete ai[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Cs=new WeakMap,wo=class extends Wn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Un.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Cs.get(a);d===void 0&&(d=[],Cs.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=Os("img");function c(){h(),t&&t(this);let d=Cs.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Cs.delete(this),r.manager.itemEnd(e)}function l(d){h(),s&&s(d),Un.remove(`image:${e}`);let u=Cs.get(this)||[];for(let f=0;f<u.length;f++){let g=u[f];g.onError&&g.onError(d)}Cs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Un.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var kr=class extends Wn{constructor(e){super(e)}load(e,t,n,s){let r=new ut,a=new wo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},fi=class extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},zr=class extends fi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Bc=new Ne,ld=new I,cd=new I,Hr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bn,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ld.setFromMatrixPosition(e.matrixWorld),t.position.copy(ld),cd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cd),t.updateMatrixWorld(),Bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ns||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},to=new I,no=new pn,Nn=new I,Vr=class extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(to,no,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(to,no,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ci=new I,hd=new De,ud=new De,bt=class extends Vr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,hd,ud),t.subVectors(ud,hd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Qc=class extends Hr{constructor(){super(new bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Zi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Gr=class extends fi{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Qc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Kc=class extends Hr{constructor(){super(new bt(90,1,.5,500)),this.isPointLightShadow=!0}},es=class extends fi{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Kc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xn=class extends Vr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},jc=class extends Hr{constructor(){super(new Xn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Li=class extends fi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new jc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var pi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var kc=new WeakMap,Wr=class extends Wn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ce("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ce("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Un.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{if(kc.has(a)===!0)s&&s(kc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Un.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),kc.set(c,l),Un.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Un.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Rs=-90,Ps=1,To=class extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new bt(Rs,Ps,e,t);s.layers=this.layers,this.add(s);let r=new bt(Rs,Ps,e,t);r.layers=this.layers,this.add(r);let a=new bt(Rs,Ps,e,t);a.layers=this.layers,this.add(a);let o=new bt(Rs,Ps,e,t);o.layers=this.layers,this.add(o);let c=new bt(Rs,Ps,e,t);c.layers=this.layers,this.add(c);let l=new bt(Rs,Ps,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Co=class extends bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var mh="\\[\\]\\.:\\/",Am=new RegExp("["+mh+"]","g"),gh="[^"+mh+"]",ym="[^"+mh.replace("\\.","")+"]",_m=/((?:WC+[\/:])*)/.source.replace("WC",gh),Mm=/(WCOD+)?/.source.replace("WCOD",ym),bm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gh),Sm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gh),Em=new RegExp("^"+_m+Mm+bm+Sm+"$"),wm=["material","materials","bones","map"],Zc=class{constructor(e,t,n){let s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ht=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Am,"")}static parseTrackName(e){let t=Em.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);wm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ce("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ht.Composite=Zc;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dy=new Float32Array(1);var dd=new Ne,Xr=class{constructor(e,t,n=0,s=1/0){this.ray=new Pi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Le("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dd),this}intersectObject(e,t=!0,n=[]){return Jc(e,this,n,t),n.sort(fd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Jc(e[s],this,n,t);return n.sort(fd),n}};function fd(i,e){return i.distance-e.distance}function Jc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Jc(r[a],e,t,!0)}}var Yr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Tm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Tm(){this._document.hidden===!1&&this.reset()}function xh(i,e,t,n){let s=Cm(n);switch(t){case lh:return i*e;case Js:return i*e/s.components*s.byteLength;case zo:return i*e/s.components*s.byteLength;case ss:return i*e*2/s.components*s.byteLength;case Ho:return i*e*2/s.components*s.byteLength;case ch:return i*e*3/s.components*s.byteLength;case mn:return i*e*4/s.components*s.byteLength;case Vo:return i*e*4/s.components*s.byteLength;case na:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Go:case Xo:return Math.max(i,8)*Math.max(e,8)/2;case qo:case Qo:case jo:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ko:case Jo:case $o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case pl:case ml:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case xl:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Al:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cm(i){switch(i){case rn:case sh:return{byteLength:1,components:1};case Zs:case rh:case Rt:return{byteLength:2,components:1};case Bo:case ko:return{byteLength:2,components:4};case Dn:case Fo:case Zt:return{byteLength:4,components:1};case ah:case oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function xf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Pm(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let v=d[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Im=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Um=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,km=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$m=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,eg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ng=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ig=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,og="gl_FragColor = linearToOutputTexel( gl_FragColor );",lg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ag=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ug=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$g=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,e0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,n0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,r0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,u0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,p0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,m0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,g0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,M0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,S0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,E0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,R0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,P0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,I0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,F0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,B0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,k0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,K0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Z0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,J0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ix=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Im,alphahash_pars_fragment:Dm,alphamap_fragment:Lm,alphamap_pars_fragment:Nm,alphatest_fragment:Om,alphatest_pars_fragment:Um,aomap_fragment:Fm,aomap_pars_fragment:Bm,batching_pars_vertex:km,batching_vertex:zm,begin_vertex:Hm,beginnormal_vertex:Vm,bsdfs:Gm,iridescence_fragment:Wm,bumpmap_pars_fragment:Xm,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:qm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:Km,color_fragment:jm,color_pars_fragment:Zm,color_pars_vertex:Jm,color_vertex:$m,common:eg,cube_uv_reflection_fragment:tg,defaultnormal_vertex:ng,displacementmap_pars_vertex:ig,displacementmap_vertex:sg,emissivemap_fragment:rg,emissivemap_pars_fragment:ag,colorspace_fragment:og,colorspace_pars_fragment:lg,envmap_fragment:cg,envmap_common_pars_fragment:hg,envmap_pars_fragment:ug,envmap_pars_vertex:dg,envmap_physical_pars_fragment:bg,envmap_vertex:fg,fog_vertex:pg,fog_pars_vertex:mg,fog_fragment:gg,fog_pars_fragment:xg,gradientmap_pars_fragment:vg,lightmap_pars_fragment:Ag,lights_lambert_fragment:yg,lights_lambert_pars_fragment:_g,lights_pars_begin:Mg,lights_toon_fragment:Sg,lights_toon_pars_fragment:Eg,lights_phong_fragment:wg,lights_phong_pars_fragment:Tg,lights_physical_fragment:Cg,lights_physical_pars_fragment:Rg,lights_fragment_begin:Pg,lights_fragment_maps:Ig,lights_fragment_end:Dg,logdepthbuf_fragment:Lg,logdepthbuf_pars_fragment:Ng,logdepthbuf_pars_vertex:Og,logdepthbuf_vertex:Ug,map_fragment:Fg,map_pars_fragment:Bg,map_particle_fragment:kg,map_particle_pars_fragment:zg,metalnessmap_fragment:Hg,metalnessmap_pars_fragment:Vg,morphinstance_vertex:Gg,morphcolor_vertex:Wg,morphnormal_vertex:Xg,morphtarget_pars_vertex:Yg,morphtarget_vertex:qg,normal_fragment_begin:Qg,normal_fragment_maps:Kg,normal_pars_fragment:jg,normal_pars_vertex:Zg,normal_vertex:Jg,normalmap_pars_fragment:$g,clearcoat_normal_fragment_begin:e0,clearcoat_normal_fragment_maps:t0,clearcoat_pars_fragment:n0,iridescence_pars_fragment:i0,opaque_fragment:s0,packing:r0,premultiplied_alpha_fragment:a0,project_vertex:o0,dithering_fragment:l0,dithering_pars_fragment:c0,roughnessmap_fragment:h0,roughnessmap_pars_fragment:u0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:f0,shadowmap_vertex:p0,shadowmask_pars_fragment:m0,skinbase_vertex:g0,skinning_pars_vertex:x0,skinning_vertex:v0,skinnormal_vertex:A0,specularmap_fragment:y0,specularmap_pars_fragment:_0,tonemapping_fragment:M0,tonemapping_pars_fragment:b0,transmission_fragment:S0,transmission_pars_fragment:E0,uv_pars_fragment:w0,uv_pars_vertex:T0,uv_vertex:C0,worldpos_vertex:R0,background_vert:P0,background_frag:I0,backgroundCube_vert:D0,backgroundCube_frag:L0,cube_vert:N0,cube_frag:O0,depth_vert:U0,depth_frag:F0,distance_vert:B0,distance_frag:k0,equirect_vert:z0,equirect_frag:H0,linedashed_vert:V0,linedashed_frag:G0,meshbasic_vert:W0,meshbasic_frag:X0,meshlambert_vert:Y0,meshlambert_frag:q0,meshmatcap_vert:Q0,meshmatcap_frag:K0,meshnormal_vert:j0,meshnormal_frag:Z0,meshphong_vert:J0,meshphong_frag:$0,meshphysical_vert:ex,meshphysical_frag:tx,meshtoon_vert:nx,meshtoon_frag:ix,points_vert:sx,points_frag:rx,shadow_vert:ax,shadow_frag:ox,sprite_vert:lx,sprite_frag:cx},me={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Qn={basic:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:qt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:qt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:qt([me.points,me.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:qt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:qt([me.common,me.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:qt([me.sprite,me.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:qt([me.common,me.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:qt([me.lights,me.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Qn.physical={uniforms:qt([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var bl={r:0,b:0,g:0},as=new vn,hx=new Ne;function ux(i,e,t,n,s,r){let a=new ve(0),o=s===!0?0:1,c,l,h=null,d=0,u=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let M=y.backgroundBlurriness>0;b=e.get(b,M)}return b}function g(y){let b=!1,M=f(y);M===null?p(a,o):M&&M.isColor&&(p(M,1),b=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,b){let M=f(b);M&&(M.isCubeTexture||M.mapping===ta)?(l===void 0&&(l=new ke(new Di(1,1,1),new dt({name:"BackgroundCubeMaterial",uniforms:rs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),as.copy(b.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hx.makeRotationFromEuler(as)),l.material.toneMapped=Ye.getTransfer(M.colorSpace)!==tt,(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ke(new hi(2,2),new dt({name:"BackgroundMaterial",uniforms:rs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(M.colorSpace)!==tt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,b){y.getRGB(bl,ph(i)),t.buffers.color.setClear(bl.r,bl.g,bl.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:g,addToRenderList:v,dispose:m}}function dx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(C,U,F,k,X){let z=!1,B=d(C,k,F,U);r!==B&&(r=B,l(r.object)),z=f(C,k,F,X),z&&g(C,k,F,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,M(C,U,F,k),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function d(C,U,F,k){let X=k.wireframe===!0,z=n[U.id];z===void 0&&(z={},n[U.id]=z);let B=C.isInstancedMesh===!0?C.id:0,te=z[B];te===void 0&&(te={},z[B]=te);let J=te[F.id];J===void 0&&(J={},te[F.id]=J);let ce=J[X];return ce===void 0&&(ce=u(c()),J[X]=ce),ce}function u(C){let U=[],F=[],k=[];for(let X=0;X<t;X++)U[X]=0,F[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:F,attributeDivisors:k,object:C,attributes:{},index:null}}function f(C,U,F,k){let X=r.attributes,z=U.attributes,B=0,te=F.getAttributes();for(let J in te)if(te[J].location>=0){let de=X[J],he=z[J];if(he===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),de===void 0||de.attribute!==he||he&&de.data!==he.data)return!0;B++}return r.attributesNum!==B||r.index!==k}function g(C,U,F,k){let X={},z=U.attributes,B=0,te=F.getAttributes();for(let J in te)if(te[J].location>=0){let de=z[J];de===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(de=C.instanceColor));let he={};he.attribute=de,de&&de.data&&(he.data=de.data),X[J]=he,B++}r.attributes=X,r.attributesNum=B,r.index=k}function v(){let C=r.newAttributes;for(let U=0,F=C.length;U<F;U++)C[U]=0}function p(C){m(C,0)}function m(C,U){let F=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;F[C]=1,k[C]===0&&(i.enableVertexAttribArray(C),k[C]=1),X[C]!==U&&(i.vertexAttribDivisor(C,U),X[C]=U)}function y(){let C=r.newAttributes,U=r.enabledAttributes;for(let F=0,k=U.length;F<k;F++)U[F]!==C[F]&&(i.disableVertexAttribArray(F),U[F]=0)}function b(C,U,F,k,X,z,B){B===!0?i.vertexAttribIPointer(C,U,F,X,z):i.vertexAttribPointer(C,U,F,k,X,z)}function M(C,U,F,k){v();let X=k.attributes,z=F.getAttributes(),B=U.defaultAttributeValues;for(let te in z){let J=z[te];if(J.location>=0){let ce=X[te];if(ce===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor)),ce!==void 0){let de=ce.normalized,he=ce.itemSize,Oe=e.get(ce);if(Oe===void 0)continue;let Je=Oe.buffer,je=Oe.type,j=Oe.bytesPerElement,ie=je===i.INT||je===i.UNSIGNED_INT||ce.gpuType===Fo;if(ce.isInterleavedBufferAttribute){let ne=ce.data,be=ne.stride,_e=ce.offset;if(ne.isInstancedInterleavedBuffer){for(let Ie=0;Ie<J.locationSize;Ie++)m(J.location+Ie,ne.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ie=0;Ie<J.locationSize;Ie++)p(J.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let Ie=0;Ie<J.locationSize;Ie++)b(J.location+Ie,he/J.locationSize,je,de,be*j,(_e+he/J.locationSize*Ie)*j,ie)}else{if(ce.isInstancedBufferAttribute){for(let ne=0;ne<J.locationSize;ne++)m(J.location+ne,ce.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ne=0;ne<J.locationSize;ne++)p(J.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let ne=0;ne<J.locationSize;ne++)b(J.location+ne,he/J.locationSize,je,de,he*j,he/J.locationSize*ne*j,ie)}}else if(B!==void 0){let de=B[te];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(J.location,de);break;case 3:i.vertexAttrib3fv(J.location,de);break;case 4:i.vertexAttrib4fv(J.location,de);break;default:i.vertexAttrib1fv(J.location,de)}}}}y()}function T(){S();for(let C in n){let U=n[C];for(let F in U){let k=U[F];for(let X in k){let z=k[X];for(let B in z)h(z[B].object),delete z[B];delete k[X]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;let U=n[C.id];for(let F in U){let k=U[F];for(let X in k){let z=k[X];for(let B in z)h(z[B].object),delete z[B];delete k[X]}}delete n[C.id]}function R(C){for(let U in n){let F=n[U];for(let k in F){let X=F[k];if(X[C.id]===void 0)continue;let z=X[C.id];for(let B in z)h(z[B].object),delete z[B];delete X[C.id]}}}function A(C){for(let U in n){let F=n[U],k=C.isInstancedMesh===!0?C.id:0,X=F[k];if(X!==void 0){for(let z in X){let B=X[z];for(let te in B)h(B[te].object),delete B[te];delete X[z]}delete F[k],Object.keys(F).length===0&&delete n[U]}}}function S(){W(),a=!0,r!==s&&(r=s,l(r.object))}function W(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:W,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:y}}function fx(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,n,1)}function c(l,h,d,u){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function px(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==mn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let A=R===Rt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==rn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Zt&&!A)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ce("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:M,maxSamples:T,samples:w}}function mx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new On,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{let y=r?0:n,b=y*4,M=m.clippingState||null;c.value=M,M=h(g,u,b,f);for(let T=0;T!==b;++T)M[T]=t[T];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=c.value,g!==!0||p===null){let m=f+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,M=f;b!==v;++b,M+=4)a.copy(d[b]).applyMatrix4(y,o),a.normal.toArray(p,M),p[M+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var Ui=4,Qd=[.125,.215,.35,.446,.526,.582],ls=20,gx=256,la=new Xn,Kd=new ve,vh=null,Ah=0,yh=0,_h=!1,xx=new I,nr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=xx}=r;vh=this._renderer.getRenderTarget(),Ah=this._renderer.getActiveCubeFace(),yh=this._renderer.getActiveMipmapLevel(),_h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vh,Ah,yh),this._renderer.xr.enabled=_h,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ni||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vh=this._renderer.getRenderTarget(),Ah=this._renderer.getActiveCubeFace(),yh=this._renderer.getActiveMipmapLevel(),_h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:Rt,format:mn,colorSpace:kt,depthBuffer:!1},s=jd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=vx(r)),this._blurMaterial=yx(r,e,t),this._ggxMaterial=Ax(r,e,t)}return s}_compileMaterial(e){let t=new ke(new zt,e);this._renderer.compile(t,la)}_sceneToCubeUV(e,t,n,s,r){let c=new bt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Kd),d.toneMapping=Pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ke(new Di,new Kt({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,y=e.background;y?y.isColor&&(p.color.copy(y),e.background=null,m=!0):(p.color.copy(Kd),m=!0);for(let b=0;b<6;b++){let M=b%3;M===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):M===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));let T=this._cubeSize;er(s,M*T,b>2?T:0,T,T),d.setRenderTarget(s),m&&d.render(v,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ni||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,la)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-Ui?n-g+Ui:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,er(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(o,la),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,er(e,p,m,3*v,2*v),s.setRenderTarget(e),s.render(o,la)}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=l;let u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ls-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):ls;p>ls&&Ce(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ls}`);let m=[],y=0;for(let R=0;R<ls;++R){let A=R/v,S=Math.exp(-A*A/2);m.push(S),R===0?y+=S:R<p&&(y+=2*S)}for(let R=0;R<m.length;R++)m[R]=m[R]/y;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;let M=this._sizeLods[s],T=3*M*(s>b-Ui?s-b+Ui:0),w=4*(this._cubeSize-M);er(t,T,w,3*M,2*M),c.setRenderTarget(t),c.render(d,la)}};function vx(i){let e=[],t=[],n=[],s=i,r=i-Ui+1+Qd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ui?c=Qd[a-i+Ui-1]:a===0&&(c=0),t.push(c);let l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,y=new Float32Array(v*g*f),b=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let w=0;w<f;w++){let R=w%3*2/3-1,A=w>2?0:-1,S=[R,A,0,R+2/3,A,0,R+2/3,A+1,0,R,A,0,R+2/3,A+1,0,R,A+1,0];y.set(S,v*g*w),b.set(u,p*g*w);let W=[w,w,w,w,w,w];M.set(W,m*g*w)}let T=new zt;T.setAttribute("position",new Ct(y,v)),T.setAttribute("uv",new Ct(b,p)),T.setAttribute("faceIndex",new Ct(M,m)),n.push(new ke(T,null)),s>Ui&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function jd(i,e,t){let n=new yt(i,e,t);return n.texture.mapping=ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ax(i,e,t){return new dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Et,depthTest:!1,depthWrite:!1})}function yx(i,e,t){let n=new Float32Array(ls),s=new I(0,1,0);return new dt({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Et,depthTest:!1,depthWrite:!1})}function Zd(){return new dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Et,depthTest:!1,depthWrite:!1})}function Jd(){return new dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Et,depthTest:!1,depthWrite:!1})}function Tl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var El=class extends yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Lr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Di(5,5,5),r=new dt({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Et});r.uniforms.tEquirect.value=t;let a=new ke(s,r),o=t.minFilter;return t.minFilter===In&&(t.minFilter=At),new To(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function _x(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===No||f===Oo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new El(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===No||f===Oo,v=f===Ni||f===ns;if(g||v){let p=t.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new nr(i)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{let y=u.image;return g&&y&&y.height>0||v&&y&&c(y)?(n===null&&(n=new nr(i)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===No?u.mapping=Ni:f===Oo&&(u.mapping=ns),u}function c(u){let f=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function l(u){let f=u.target;f.removeEventListener("dispose",l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Mx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&br("WebGLRenderer: "+n+" extension not supported."),s}}}function bx(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(f!==null){let y=f.array;v=f.version;for(let b=0,M=y.length;b<M;b+=3){let T=y[b+0],w=y[b+1],R=y[b+2];u.push(T,w,w,R,R,T)}}else{let y=g.array;v=g.version;for(let b=0,M=y.length/3-1;b<M;b+=3){let T=b+0,w=b+1,R=b+2;u.push(T,w,w,R,R,T)}}let p=new(g.count>=65535?Tr:wr)(u,1);p.version=v;let m=r.get(d);m&&e.remove(m),r.set(d,p)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Sx(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*a,g),t.update(f,n,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}function d(u,f,g,v){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)l(u[m]/a,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y]*v[y];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Ex(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Le("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function wx(i,e,t){let n=new WeakMap,s=new mt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],b=0;f===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let M=o.attributes.position.count*b,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let w=new Float32Array(M*T*4*d),R=new Sr(w,M,T,d);R.type=Zt,R.needsUpdate=!0;let A=b*4;for(let W=0;W<d;W++){let C=p[W],U=m[W],F=y[W],k=M*T*4*W;for(let X=0;X<C.count;X++){let z=X*A;f===!0&&(s.fromBufferAttribute(C,X),w[k+z+0]=s.x,w[k+z+1]=s.y,w[k+z+2]=s.z,w[k+z+3]=0),g===!0&&(s.fromBufferAttribute(U,X),w[k+z+4]=s.x,w[k+z+5]=s.y,w[k+z+6]=s.z,w[k+z+7]=0),v===!0&&(s.fromBufferAttribute(F,X),w[k+z+8]=s.x,w[k+z+9]=s.y,w[k+z+10]=s.z,w[k+z+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new De(M,T)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Tx(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Cx={[Kr]:"LINEAR_TONE_MAPPING",[jr]:"REINHARD_TONE_MAPPING",[Zr]:"CINEON_TONE_MAPPING",[ts]:"ACES_FILMIC_TONE_MAPPING",[$r]:"AGX_TONE_MAPPING",[ea]:"NEUTRAL_TONE_MAPPING",[Jr]:"CUSTOM_TONE_MAPPING"};function Rx(i,e,t,n,s){let r=new yt(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),a=new yt(e,t,{type:Rt,depthBuffer:!1,stencilBuffer:!1}),o=new zt;o.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Nt([0,2,0,0,2,0],2));let c=new Xs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new ke(o,c),h=new Xn(-1,1,1,-1,0,1),d=null,u=null,f=!1,g,v=null,p=[],m=!1;this.setSize=function(y,b){r.setSize(y,b),a.setSize(y,b);for(let M=0;M<p.length;M++){let T=p[M];T.setSize&&T.setSize(y,b)}},this.setEffects=function(y){p=y,m=p.length>0&&p[0].isRenderPass===!0;let b=r.width,M=r.height;for(let T=0;T<p.length;T++){let w=p[T];w.setSize&&w.setSize(b,M)}},this.begin=function(y,b){if(f||y.toneMapping===Pn&&p.length===0)return!1;if(v=b,b!==null){let M=b.width,T=b.height;(r.width!==M||r.height!==T)&&this.setSize(M,T)}return m===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=Pn,!0},this.hasRenderPass=function(){return m},this.end=function(y,b){y.toneMapping=g,f=!0;let M=r,T=a;for(let w=0;w<p.length;w++){let R=p[w];if(R.enabled!==!1&&(R.render(y,T,M,b),R.needsSwap!==!1)){let A=M;M=T,T=A}}if(d!==y.outputColorSpace||u!==y.toneMapping){d=y.outputColorSpace,u=y.toneMapping,c.defines={},Ye.getTransfer(d)===tt&&(c.defines.SRGB_TRANSFER="");let w=Cx[u];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(v),y.render(l,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}var vf=new ut,Sh=new kn(1,1),Af=new Sr,yf=new mo,_f=new Lr,$d=[],ef=[],tf=new Float32Array(16),nf=new Float32Array(9),sf=new Float32Array(4);function ir(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=$d[s];if(r===void 0&&(r=new Float32Array(s),$d[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Cl(i,e){let t=ef[e];t===void 0&&(t=new Int32Array(e),ef[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Px(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function Dx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function Lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function Nx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;sf.set(n),i.uniformMatrix2fv(this.addr,!1,sf),It(t,n)}}function Ox(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;nf.set(n),i.uniformMatrix3fv(this.addr,!1,nf),It(t,n)}}function Ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Pt(t,n))return;tf.set(n),i.uniformMatrix4fv(this.addr,!1,tf),It(t,n)}}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function Hx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function Gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function Xx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sh.compareFunction=t.isReversedDepthBuffer()?Ml:_l,r=Sh):r=vf,t.setTexture2D(e||r,s)}function Yx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||yf,s)}function qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||_f,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Af,s)}function Kx(i){switch(i){case 5126:return Px;case 35664:return Ix;case 35665:return Dx;case 35666:return Lx;case 35674:return Nx;case 35675:return Ox;case 35676:return Ux;case 5124:case 35670:return Fx;case 35667:case 35671:return Bx;case 35668:case 35672:return kx;case 35669:case 35673:return zx;case 5125:return Hx;case 36294:return Vx;case 36295:return Gx;case 36296:return Wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return qx;case 36289:case 36303:case 36311:case 36292:return Qx}}function jx(i,e){i.uniform1fv(this.addr,e)}function Zx(i,e){let t=ir(e,this.size,2);i.uniform2fv(this.addr,t)}function Jx(i,e){let t=ir(e,this.size,3);i.uniform3fv(this.addr,t)}function $x(i,e){let t=ir(e,this.size,4);i.uniform4fv(this.addr,t)}function ev(i,e){let t=ir(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tv(i,e){let t=ir(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nv(i,e){let t=ir(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function iv(i,e){i.uniform1iv(this.addr,e)}function sv(i,e){i.uniform2iv(this.addr,e)}function rv(i,e){i.uniform3iv(this.addr,e)}function av(i,e){i.uniform4iv(this.addr,e)}function ov(i,e){i.uniform1uiv(this.addr,e)}function lv(i,e){i.uniform2uiv(this.addr,e)}function cv(i,e){i.uniform3uiv(this.addr,e)}function hv(i,e){i.uniform4uiv(this.addr,e)}function uv(i,e,t){let n=this.cache,s=e.length,r=Cl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Sh:a=vf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function dv(i,e,t){let n=this.cache,s=e.length,r=Cl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yf,r[a])}function fv(i,e,t){let n=this.cache,s=e.length,r=Cl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||_f,r[a])}function pv(i,e,t){let n=this.cache,s=e.length,r=Cl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Af,r[a])}function mv(i){switch(i){case 5126:return jx;case 35664:return Zx;case 35665:return Jx;case 35666:return $x;case 35674:return ev;case 35675:return tv;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return sv;case 35668:case 35672:return rv;case 35669:case 35673:return av;case 5125:return ov;case 36294:return lv;case 36295:return cv;case 36296:return hv;case 35678:case 36198:case 36298:case 36306:case 35682:return uv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return pv}}var Eh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kx(t.type)}},wh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mv(t.type)}},Th=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Mh=/(\w+)(\])?(\[|\.)?/g;function rf(i,e){i.seq.push(e),i.map[e.id]=e}function gv(i,e,t){let n=i.name,s=n.length;for(Mh.lastIndex=0;;){let r=Mh.exec(n),a=Mh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){rf(t,l===void 0?new Eh(o,i,e):new wh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Th(o),rf(t,d)),t=d}}}var tr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);gv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function af(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var xv=37297,vv=0;function Av(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var of=new He;function yv(i){Ye._getMatrix(of,Ye.workingColorSpace,i);let e=`mat3( ${of.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case _r:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function lf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Av(i.getShaderSource(e),o)}else return r}function _v(i,e){let t=yv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Mv={[Kr]:"Linear",[jr]:"Reinhard",[Zr]:"Cineon",[ts]:"ACESFilmic",[$r]:"AgX",[ea]:"Neutral",[Jr]:"Custom"};function bv(i,e){let t=Mv[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Sl=new I;function Sv(){Ye.getLuminanceCoefficients(Sl);let i=Sl.x.toFixed(4),e=Sl.y.toFixed(4),t=Sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ev(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ha).join(`
`)}function wv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ha(i){return i!==""}function cf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(i){return i.replace(Cv,Pv)}var Rv=new Map;function Pv(i,e){let t=Ve[e];if(t===void 0){let n=Rv.get(e);if(n!==void 0)t=Ve[n],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ch(t)}var Iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uf(i){return i.replace(Iv,Dv)}function Dv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function df(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Lv={[qr]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function Nv(i){return Lv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ov={[Ni]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[ta]:"ENVMAP_TYPE_CUBE_UV"};function Uv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ov[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Fv={[ns]:"ENVMAP_MODE_REFRACTION"};function Bv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Fv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var kv={[Lo]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};function zv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":kv[i.combine]||"ENVMAP_BLENDING_NONE"}function Hv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Vv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Nv(t),l=Uv(t),h=Bv(t),d=zv(t),u=Hv(t),f=Ev(t),g=wv(r),v=s.createProgram(),p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ha).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ha).join(`
`),m.length>0&&(m+=`
`)):(p=[df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ha).join(`
`),m=[df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Pn?bv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,_v("linearToOutputTexel",t.outputColorSpace),Sv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ha).join(`
`)),a=Ch(a),a=cf(a,t),a=hf(a,t),o=Ch(o),o=cf(o,t),o=hf(o,t),a=uf(a),o=uf(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=y+p+a,M=y+m+o,T=af(s,s.VERTEX_SHADER,b),w=af(s,s.FRAGMENT_SHADER,M);s.attachShader(v,T),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(v)||"",F=s.getShaderInfoLog(T)||"",k=s.getShaderInfoLog(w)||"",X=U.trim(),z=F.trim(),B=k.trim(),te=!0,J=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,w);else{let ce=lf(s,T,"vertex"),de=lf(s,w,"fragment");Le("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+X+`
`+ce+`
`+de)}else X!==""?Ce("WebGLProgram: Program Info Log:",X):(z===""||B==="")&&(J=!1);J&&(C.diagnostics={runnable:te,programLog:X,vertexShader:{log:z,prefix:p},fragmentShader:{log:B,prefix:m}})}s.deleteShader(T),s.deleteShader(w),A=new tr(s,v),S=Tv(s,v)}let A;this.getUniforms=function(){return A===void 0&&R(this),A};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=s.getProgramParameter(v,xv)),W},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=w,this}var Gv=0,Rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ph(e),t.set(e,n)),n}},Ph=class{constructor(e){this.id=Gv++,this.code=e,this.usedTimes=0}};function Wv(i,e,t,n,s,r){let a=new Bs,o=new Rh,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(A){return c.add(A),A===0?"uv":`uv${A}`}function v(A,S,W,C,U){let F=C.fog,k=U.geometry,X=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?C.environment:null,z=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,B=e.get(A.envMap||X,z),te=B&&B.mapping===ta?B.image.height:null,J=f[A.type];A.precision!==null&&(u=n.getMaxPrecision(A.precision),u!==A.precision&&Ce("WebGLProgram.getParameters:",A.precision,"not supported, using",u,"instead."));let ce=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,de=ce!==void 0?ce.length:0,he=0;k.morphAttributes.position!==void 0&&(he=1),k.morphAttributes.normal!==void 0&&(he=2),k.morphAttributes.color!==void 0&&(he=3);let Oe,Je,je,j;if(J){let it=Qn[J];Oe=it.vertexShader,Je=it.fragmentShader}else Oe=A.vertexShader,Je=A.fragmentShader,o.update(A),je=o.getVertexShaderID(A),j=o.getFragmentShaderID(A);let ie=i.getRenderTarget(),ne=i.state.buffers.depth.getReversed(),be=U.isInstancedMesh===!0,_e=U.isBatchedMesh===!0,Ie=!!A.map,xt=!!A.matcap,Ge=!!B,We=!!A.aoMap,Ze=!!A.lightMap,Fe=!!A.bumpMap,rt=!!A.normalMap,P=!!A.displacementMap,ft=!!A.emissiveMap,Ke=!!A.metalnessMap,$e=!!A.roughnessMap,Ae=A.anisotropy>0,E=A.clearcoat>0,x=A.dispersion>0,N=A.iridescence>0,K=A.sheen>0,$=A.transmission>0,Y=Ae&&!!A.anisotropyMap,fe=E&&!!A.clearcoatMap,L=E&&!!A.clearcoatNormalMap,V=E&&!!A.clearcoatRoughnessMap,ae=N&&!!A.iridescenceMap,Z=N&&!!A.iridescenceThicknessMap,ee=K&&!!A.sheenColorMap,ue=K&&!!A.sheenRoughnessMap,pe=!!A.specularMap,le=!!A.specularColorMap,Ue=!!A.specularIntensityMap,D=$&&!!A.transmissionMap,oe=$&&!!A.thicknessMap,se=!!A.gradientMap,Me=!!A.alphaMap,re=A.alphaTest>0,Q=!!A.alphaHash,Se=!!A.extensions,Be=Pn;A.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Be=i.toneMapping);let pt={shaderID:J,shaderType:A.type,shaderName:A.name,vertexShader:Oe,fragmentShader:Je,defines:A.defines,customVertexShaderID:je,customFragmentShaderID:j,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:u,batching:_e,batchingColor:_e&&U._colorsTexture!==null,instancing:be,instancingColor:be&&U.instanceColor!==null,instancingMorph:be&&U.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:kt,alphaToCoverage:!!A.alphaToCoverage,map:Ie,matcap:xt,envMap:Ge,envMapMode:Ge&&B.mapping,envMapCubeUVHeight:te,aoMap:We,lightMap:Ze,bumpMap:Fe,normalMap:rt,displacementMap:P,emissiveMap:ft,normalMapObjectSpace:rt&&A.normalMapType===Nd,normalMapTangentSpace:rt&&A.normalMapType===oa,metalnessMap:Ke,roughnessMap:$e,anisotropy:Ae,anisotropyMap:Y,clearcoat:E,clearcoatMap:fe,clearcoatNormalMap:L,clearcoatRoughnessMap:V,dispersion:x,iridescence:N,iridescenceMap:ae,iridescenceThicknessMap:Z,sheen:K,sheenColorMap:ee,sheenRoughnessMap:ue,specularMap:pe,specularColorMap:le,specularIntensityMap:Ue,transmission:$,transmissionMap:D,thicknessMap:oe,gradientMap:se,opaque:A.transparent===!1&&A.blending===Yi&&A.alphaToCoverage===!1,alphaMap:Me,alphaTest:re,alphaHash:Q,combine:A.combine,mapUv:Ie&&g(A.map.channel),aoMapUv:We&&g(A.aoMap.channel),lightMapUv:Ze&&g(A.lightMap.channel),bumpMapUv:Fe&&g(A.bumpMap.channel),normalMapUv:rt&&g(A.normalMap.channel),displacementMapUv:P&&g(A.displacementMap.channel),emissiveMapUv:ft&&g(A.emissiveMap.channel),metalnessMapUv:Ke&&g(A.metalnessMap.channel),roughnessMapUv:$e&&g(A.roughnessMap.channel),anisotropyMapUv:Y&&g(A.anisotropyMap.channel),clearcoatMapUv:fe&&g(A.clearcoatMap.channel),clearcoatNormalMapUv:L&&g(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&g(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&g(A.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(A.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(A.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(A.sheenRoughnessMap.channel),specularMapUv:pe&&g(A.specularMap.channel),specularColorMapUv:le&&g(A.specularColorMap.channel),specularIntensityMapUv:Ue&&g(A.specularIntensityMap.channel),transmissionMapUv:D&&g(A.transmissionMap.channel),thicknessMapUv:oe&&g(A.thicknessMap.channel),alphaMapUv:Me&&g(A.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(rt||Ae),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Ie||Me),fog:!!F,useFog:A.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||k.attributes.normal===void 0&&rt===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:he,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Ie&&A.map.isVideoTexture===!0&&Ye.getTransfer(A.map.colorSpace)===tt,decodeVideoTextureEmissive:ft&&A.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(A.emissiveMap.colorSpace)===tt,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===yn,flipSided:A.side===Ht,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Se&&A.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&A.extensions.multiDraw===!0||_e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(A){let S=[];if(A.shaderID?S.push(A.shaderID):(S.push(A.customVertexShaderID),S.push(A.customFragmentShaderID)),A.defines!==void 0)for(let W in A.defines)S.push(W),S.push(A.defines[W]);return A.isRawShaderMaterial===!1&&(m(S,A),y(S,A),S.push(i.outputColorSpace)),S.push(A.customProgramCacheKey),S.join()}function m(A,S){A.push(S.precision),A.push(S.outputColorSpace),A.push(S.envMapMode),A.push(S.envMapCubeUVHeight),A.push(S.mapUv),A.push(S.alphaMapUv),A.push(S.lightMapUv),A.push(S.aoMapUv),A.push(S.bumpMapUv),A.push(S.normalMapUv),A.push(S.displacementMapUv),A.push(S.emissiveMapUv),A.push(S.metalnessMapUv),A.push(S.roughnessMapUv),A.push(S.anisotropyMapUv),A.push(S.clearcoatMapUv),A.push(S.clearcoatNormalMapUv),A.push(S.clearcoatRoughnessMapUv),A.push(S.iridescenceMapUv),A.push(S.iridescenceThicknessMapUv),A.push(S.sheenColorMapUv),A.push(S.sheenRoughnessMapUv),A.push(S.specularMapUv),A.push(S.specularColorMapUv),A.push(S.specularIntensityMapUv),A.push(S.transmissionMapUv),A.push(S.thicknessMapUv),A.push(S.combine),A.push(S.fogExp2),A.push(S.sizeAttenuation),A.push(S.morphTargetsCount),A.push(S.morphAttributeCount),A.push(S.numDirLights),A.push(S.numPointLights),A.push(S.numSpotLights),A.push(S.numSpotLightMaps),A.push(S.numHemiLights),A.push(S.numRectAreaLights),A.push(S.numDirLightShadows),A.push(S.numPointLightShadows),A.push(S.numSpotLightShadows),A.push(S.numSpotLightShadowsWithMaps),A.push(S.numLightProbes),A.push(S.shadowMapType),A.push(S.toneMapping),A.push(S.numClippingPlanes),A.push(S.numClipIntersection),A.push(S.depthPacking)}function y(A,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),A.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),A.push(a.mask)}function b(A){let S=f[A.type],W;if(S){let C=Qn[S];W=Vt.clone(C.uniforms)}else W=A.uniforms;return W}function M(A,S){let W=h.get(S);return W!==void 0?++W.usedTimes:(W=new Vv(i,S,A,s),l.push(W),h.set(S,W)),W}function T(A){if(--A.usedTimes===0){let S=l.indexOf(A);l[S]=l[l.length-1],l.pop(),h.delete(A.cacheKey),A.destroy()}}function w(A){o.remove(A)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:b,acquireProgram:M,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:R}}function Xv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Yv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ff(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function pf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,p,m){let y=i[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:m},i[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=p,y.group=m),e++,y}function c(u,f,g,v,p,m){let y=o(u,f,g,v,p,m);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(u,f,g,v,p,m){let y=o(u,f,g,v,p,m);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function h(u,f){t.length>1&&t.sort(u||Yv),n.length>1&&n.sort(f||ff),s.length>1&&s.sort(f||ff)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function qv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new pf,i.set(n,[a])):s>=r.length?(a=new pf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Qv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ve};break;case"SpotLight":t={position:new I,direction:new I,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":t={color:new ve,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Kv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var jv=0;function Zv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Jv(i){let e=new Qv,t=Kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);let s=new I,r=new Ne,a=new Ne;function o(l){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,y=0,b=0,M=0,T=0,w=0,R=0;l.sort(Zv);for(let S=0,W=l.length;S<W;S++){let C=l[S],U=C.color,F=C.intensity,k=C.distance,X=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ss?X=C.shadow.map.texture:X=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=U.r*F,d+=U.g*F,u+=U.b*F;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],F);R++}else if(C.isDirectionalLight){let z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let B=C.shadow,te=t.get(C);te.shadowIntensity=B.intensity,te.shadowBias=B.bias,te.shadowNormalBias=B.normalBias,te.shadowRadius=B.radius,te.shadowMapSize=B.mapSize,n.directionalShadow[f]=te,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=z,f++}else if(C.isSpotLight){let z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(U).multiplyScalar(F),z.distance=k,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[v]=z;let B=C.shadow;if(C.map&&(n.spotLightMap[T]=C.map,T++,B.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[v]=B.matrix,C.castShadow){let te=t.get(C);te.shadowIntensity=B.intensity,te.shadowBias=B.bias,te.shadowNormalBias=B.normalBias,te.shadowRadius=B.radius,te.shadowMapSize=B.mapSize,n.spotShadow[v]=te,n.spotShadowMap[v]=X,M++}v++}else if(C.isRectAreaLight){let z=e.get(C);z.color.copy(U).multiplyScalar(F),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=z,p++}else if(C.isPointLight){let z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){let B=C.shadow,te=t.get(C);te.shadowIntensity=B.intensity,te.shadowBias=B.bias,te.shadowNormalBias=B.normalBias,te.shadowRadius=B.radius,te.shadowMapSize=B.mapSize,te.shadowCameraNear=B.camera.near,te.shadowCameraFar=B.camera.far,n.pointShadow[g]=te,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,b++}n.point[g]=z,g++}else if(C.isHemisphereLight){let z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(F),z.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[m]=z,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==v||A.rectAreaLength!==p||A.hemiLength!==m||A.numDirectionalShadows!==y||A.numPointShadows!==b||A.numSpotShadows!==M||A.numSpotMaps!==T||A.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,A.directionalLength=f,A.pointLength=g,A.spotLength=v,A.rectAreaLength=p,A.hemiLength=m,A.numDirectionalShadows=y,A.numPointShadows=b,A.numSpotShadows=M,A.numSpotMaps=T,A.numLightProbes=R,n.version=jv++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0,p=h.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){let b=l[m];if(b.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(b.isSpotLight){let M=n.spot[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),f++}else if(b.isRectAreaLight){let M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){let M=n.point[u];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){let M=n.hemi[v];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),v++}}}return{setup:o,setupView:c,state:n}}function mf(i){let e=new Jv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function $v(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new mf(i),e.set(s,[o])):r>=a.length?(o=new mf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var eA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nA=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],iA=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],gf=new Ne,ca=new I,bh=new I;function sA(i,e,t){let n=new Bn,s=new De,r=new De,a=new mt,o=new Ys,c=new Ao,l={},h=t.maxTextureSize,d={[dn]:Ht,[Ht]:dn,[yn]:yn},u=new dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:eA,fragmentShader:tA}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new zt;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ke(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr;let m=this.type;this.render=function(w,R,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===Ro&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qr);let S=i.getRenderTarget(),W=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Et),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let F=m!==this.type;F&&R.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(X=>X.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,X=w.length;k<X;k++){let z=w[k],B=z.shadow;if(B===void 0){Ce("WebGLShadowMap:",z,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let te=B.getFrameExtents();s.multiply(te),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,B.mapSize.y=r.y));let J=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=J,B.map===null||F===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Qs){if(z.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new yt(s.x,s.y,{format:ss,type:Rt,minFilter:At,magFilter:At,generateMipmaps:!1}),B.map.texture.name=z.name+".shadowMap",B.map.depthTexture=new kn(s.x,s.y,Zt),B.map.depthTexture.name=z.name+".shadowMapDepth",B.map.depthTexture.format=Fn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=nt,B.map.depthTexture.magFilter=nt}else z.isPointLight?(B.map=new El(s.x),B.map.depthTexture=new vo(s.x,Dn)):(B.map=new yt(s.x,s.y),B.map.depthTexture=new kn(s.x,s.y,Dn)),B.map.depthTexture.name=z.name+".shadowMap",B.map.depthTexture.format=Fn,this.type===qr?(B.map.depthTexture.compareFunction=J?Ml:_l,B.map.depthTexture.minFilter=At,B.map.depthTexture.magFilter=At):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=nt,B.map.depthTexture.magFilter=nt);B.camera.updateProjectionMatrix()}let ce=B.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<ce;de++){if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,de),i.clear();else{de===0&&(i.setRenderTarget(B.map),i.clear());let he=B.getViewport(de);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),U.viewport(a)}if(z.isPointLight){let he=B.camera,Oe=B.matrix,Je=z.distance||he.far;Je!==he.far&&(he.far=Je,he.updateProjectionMatrix()),ca.setFromMatrixPosition(z.matrixWorld),he.position.copy(ca),bh.copy(he.position),bh.add(nA[de]),he.up.copy(iA[de]),he.lookAt(bh),he.updateMatrixWorld(),Oe.makeTranslation(-ca.x,-ca.y,-ca.z),gf.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),B._frustum.setFromProjectionMatrix(gf,he.coordinateSystem,he.reversedDepth)}else B.updateMatrices(z);n=B.getFrustum(),M(R,A,B.camera,z,this.type)}B.isPointLightShadow!==!0&&this.type===Qs&&y(B,A),B.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(S,W,C)};function y(w,R){let A=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new yt(s.x,s.y,{format:ss,type:Rt})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,A,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,A,f,v,null)}function b(w,R,A,S){let W=null,C=A.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)W=C;else if(W=A.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let U=W.uuid,F=R.uuid,k=l[U];k===void 0&&(k={},l[U]=k);let X=k[F];X===void 0&&(X=W.clone(),k[F]=X,R.addEventListener("dispose",T)),W=X}if(W.visible=R.visible,W.wireframe=R.wireframe,S===Qs?W.side=R.shadowSide!==null?R.shadowSide:R.side:W.side=R.shadowSide!==null?R.shadowSide:d[R.side],W.alphaMap=R.alphaMap,W.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,W.map=R.map,W.clipShadows=R.clipShadows,W.clippingPlanes=R.clippingPlanes,W.clipIntersection=R.clipIntersection,W.displacementMap=R.displacementMap,W.displacementScale=R.displacementScale,W.displacementBias=R.displacementBias,W.wireframeLinewidth=R.wireframeLinewidth,W.linewidth=R.linewidth,A.isPointLight===!0&&W.isMeshDistanceMaterial===!0){let U=i.properties.get(W);U.light=A}return W}function M(w,R,A,S,W){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&W===Qs)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,w.matrixWorld);let F=e.update(w),k=w.material;if(Array.isArray(k)){let X=F.groups;for(let z=0,B=X.length;z<B;z++){let te=X[z],J=k[te.materialIndex];if(J&&J.visible){let ce=b(w,J,S,W);w.onBeforeShadow(i,w,R,A,F,ce,te),i.renderBufferDirect(A,null,F,ce,w,te),w.onAfterShadow(i,w,R,A,F,ce,te)}}}else if(k.visible){let X=b(w,k,S,W);w.onBeforeShadow(i,w,R,A,F,X,null),i.renderBufferDirect(A,null,F,X,w,null),w.onAfterShadow(i,w,R,A,F,X,null)}}let U=w.children;for(let F=0,k=U.length;F<k;F++)M(U[F],R,A,S,W)}function T(w){w.target.removeEventListener("dispose",T);for(let A in l){let S=l[A],W=w.target.uuid;W in S&&(S[W].dispose(),delete S[W])}}}function rA(i,e){function t(){let D=!1,oe=new mt,se=null,Me=new mt(0,0,0,0);return{setMask:function(re){se!==re&&!D&&(i.colorMask(re,re,re,re),se=re)},setLocked:function(re){D=re},setClear:function(re,Q,Se,Be,pt){pt===!0&&(re*=Be,Q*=Be,Se*=Be),oe.set(re,Q,Se,Be),Me.equals(oe)===!1&&(i.clearColor(re,Q,Se,Be),Me.copy(oe))},reset:function(){D=!1,se=null,Me.set(-1,0,0,0)}}}function n(){let D=!1,oe=!1,se=null,Me=null,re=null;return{setReversed:function(Q){if(oe!==Q){let Se=e.get("EXT_clip_control");Q?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),oe=Q;let Be=re;re=null,this.setClear(Be)}},getReversed:function(){return oe},setTest:function(Q){Q?ie(i.DEPTH_TEST):ne(i.DEPTH_TEST)},setMask:function(Q){se!==Q&&!D&&(i.depthMask(Q),se=Q)},setFunc:function(Q){if(oe&&(Q=Wd[Q]),Me!==Q){switch(Q){case so:i.depthFunc(i.NEVER);break;case ro:i.depthFunc(i.ALWAYS);break;case ao:i.depthFunc(i.LESS);break;case Qi:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case lo:i.depthFunc(i.GEQUAL);break;case co:i.depthFunc(i.GREATER);break;case ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=Q}},setLocked:function(Q){D=Q},setClear:function(Q){re!==Q&&(re=Q,oe&&(Q=1-Q),i.clearDepth(Q))},reset:function(){D=!1,se=null,Me=null,re=null,oe=!1}}}function s(){let D=!1,oe=null,se=null,Me=null,re=null,Q=null,Se=null,Be=null,pt=null;return{setTest:function(it){D||(it?ie(i.STENCIL_TEST):ne(i.STENCIL_TEST))},setMask:function(it){oe!==it&&!D&&(i.stencilMask(it),oe=it)},setFunc:function(it,$n,ei){(se!==it||Me!==$n||re!==ei)&&(i.stencilFunc(it,$n,ei),se=it,Me=$n,re=ei)},setOp:function(it,$n,ei){(Q!==it||Se!==$n||Be!==ei)&&(i.stencilOp(it,$n,ei),Q=it,Se=$n,Be=ei)},setLocked:function(it){D=it},setClear:function(it){pt!==it&&(i.clearStencil(it),pt=it)},reset:function(){D=!1,oe=null,se=null,Me=null,re=null,Q=null,Se=null,Be=null,pt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,y=null,b=null,M=null,T=null,w=null,R=new ve(0,0,0),A=0,S=!1,W=null,C=null,U=null,F=null,k=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,B=0,te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(te)[1]),z=B>=1):te.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),z=B>=2);let J=null,ce={},de=i.getParameter(i.SCISSOR_BOX),he=i.getParameter(i.VIEWPORT),Oe=new mt().fromArray(de),Je=new mt().fromArray(he);function je(D,oe,se,Me){let re=new Uint8Array(4),Q=i.createTexture();i.bindTexture(D,Q),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Se=0;Se<se;Se++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(oe+Se,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return Q}let j={};j[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(i.DEPTH_TEST),a.setFunc(Qi),Fe(!1),rt($c),ie(i.CULL_FACE),We(Et);function ie(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function ne(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function be(D,oe){return d[D]!==oe?(i.bindFramebuffer(D,oe),d[D]=oe,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=oe),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function _e(D,oe){let se=f,Me=!1;if(D){se=u.get(oe),se===void 0&&(se=[],u.set(oe,se));let re=D.textures;if(se.length!==re.length||se[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Se=re.length;Q<Se;Q++)se[Q]=i.COLOR_ATTACHMENT0+Q;se.length=re.length,Me=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,Me=!0);Me&&i.drawBuffers(se)}function Ie(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let xt={[fn]:i.FUNC_ADD,[gd]:i.FUNC_SUBTRACT,[xd]:i.FUNC_REVERSE_SUBTRACT};xt[vd]=i.MIN,xt[Ad]=i.MAX;let Ge={[Qr]:i.ZERO,[Po]:i.ONE,[yd]:i.SRC_COLOR,[Ds]:i.SRC_ALPHA,[Sd]:i.SRC_ALPHA_SATURATE,[Do]:i.DST_COLOR,[Io]:i.DST_ALPHA,[_d]:i.ONE_MINUS_SRC_COLOR,[qi]:i.ONE_MINUS_SRC_ALPHA,[bd]:i.ONE_MINUS_DST_COLOR,[Md]:i.ONE_MINUS_DST_ALPHA,[Ed]:i.CONSTANT_COLOR,[wd]:i.ONE_MINUS_CONSTANT_COLOR,[Td]:i.CONSTANT_ALPHA,[Cd]:i.ONE_MINUS_CONSTANT_ALPHA};function We(D,oe,se,Me,re,Q,Se,Be,pt,it){if(D===Et){v===!0&&(ne(i.BLEND),v=!1);return}if(v===!1&&(ie(i.BLEND),v=!0),D!==Ks){if(D!==p||it!==S){if((m!==fn||M!==fn)&&(i.blendEquation(i.FUNC_ADD),m=fn,M=fn),it)switch(D){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Le("WebGLState: Invalid blending: ",D);break}else switch(D){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case th:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",D);break}y=null,b=null,T=null,w=null,R.set(0,0,0),A=0,p=D,S=it}return}re=re||oe,Q=Q||se,Se=Se||Me,(oe!==m||re!==M)&&(i.blendEquationSeparate(xt[oe],xt[re]),m=oe,M=re),(se!==y||Me!==b||Q!==T||Se!==w)&&(i.blendFuncSeparate(Ge[se],Ge[Me],Ge[Q],Ge[Se]),y=se,b=Me,T=Q,w=Se),(Be.equals(R)===!1||pt!==A)&&(i.blendColor(Be.r,Be.g,Be.b,pt),R.copy(Be),A=pt),p=D,S=!1}function Ze(D,oe){D.side===yn?ne(i.CULL_FACE):ie(i.CULL_FACE);let se=D.side===Ht;oe&&(se=!se),Fe(se),D.blending===Yi&&D.transparent===!1?We(Et):We(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let Me=D.stencilWrite;o.setTest(Me),Me&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ft(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function rt(D){D!==pd?(ie(i.CULL_FACE),D!==C&&(D===$c?i.cullFace(i.BACK):D===md?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ne(i.CULL_FACE),C=D}function P(D){D!==U&&(z&&i.lineWidth(D),U=D)}function ft(D,oe,se){D?(ie(i.POLYGON_OFFSET_FILL),(F!==oe||k!==se)&&(F=oe,k=se,a.getReversed()&&(oe=-oe),i.polygonOffset(oe,se))):ne(i.POLYGON_OFFSET_FILL)}function Ke(D){D?ie(i.SCISSOR_TEST):ne(i.SCISSOR_TEST)}function $e(D){D===void 0&&(D=i.TEXTURE0+X-1),J!==D&&(i.activeTexture(D),J=D)}function Ae(D,oe,se){se===void 0&&(J===null?se=i.TEXTURE0+X-1:se=J);let Me=ce[se];Me===void 0&&(Me={type:void 0,texture:void 0},ce[se]=Me),(Me.type!==D||Me.texture!==oe)&&(J!==se&&(i.activeTexture(se),J=se),i.bindTexture(D,oe||j[D]),Me.type=D,Me.texture=oe)}function E(){let D=ce[J];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function N(){try{i.compressedTexImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function K(){try{i.texSubImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function $(){try{i.texSubImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function fe(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function L(){try{i.texStorage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function V(){try{i.texStorage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function ae(){try{i.texImage2D(...arguments)}catch(D){Le("WebGLState:",D)}}function Z(){try{i.texImage3D(...arguments)}catch(D){Le("WebGLState:",D)}}function ee(D){Oe.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Oe.copy(D))}function ue(D){Je.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Je.copy(D))}function pe(D,oe){let se=l.get(oe);se===void 0&&(se=new WeakMap,l.set(oe,se));let Me=se.get(D);Me===void 0&&(Me=i.getUniformBlockIndex(oe,D.name),se.set(D,Me))}function le(D,oe){let Me=l.get(oe).get(D);c.get(oe)!==Me&&(i.uniformBlockBinding(oe,Me,D.__bindingPointIndex),c.set(oe,Me))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},J=null,ce={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,y=null,b=null,M=null,T=null,w=null,R=new ve(0,0,0),A=0,S=!1,W=null,C=null,U=null,F=null,k=null,Oe.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:ne,bindFramebuffer:be,drawBuffers:_e,useProgram:Ie,setBlending:We,setMaterial:Ze,setFlipSided:Fe,setCullFace:rt,setLineWidth:P,setPolygonOffset:ft,setScissorTest:Ke,activeTexture:$e,bindTexture:Ae,unbindTexture:E,compressedTexImage2D:x,compressedTexImage3D:N,texImage2D:ae,texImage3D:Z,updateUBOMapping:pe,uniformBlockBinding:le,texStorage2D:L,texStorage3D:V,texSubImage2D:K,texSubImage3D:$,compressedTexSubImage2D:Y,compressedTexSubImage3D:fe,scissor:ee,viewport:ue,reset:Ue}}function aA(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new De,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return f?new OffscreenCanvas(E,x):Os("canvas")}function v(E,x,N){let K=1,$=Ae(E);if(($.width>N||$.height>N)&&(K=N/Math.max($.width,$.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let Y=Math.floor(K*$.width),fe=Math.floor(K*$.height);d===void 0&&(d=g(Y,fe));let L=x?g(Y,fe):d;return L.width=Y,L.height=fe,L.getContext("2d").drawImage(E,0,0,Y,fe),Ce("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+fe+")."),L}else return"data"in E&&Ce("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function p(E){return E.generateMipmaps}function m(E){i.generateMipmap(E)}function y(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,x,N,K,$=!1){if(E!==null){if(i[E]!==void 0)return i[E];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=x;if(x===i.RED&&(N===i.FLOAT&&(Y=i.R32F),N===i.HALF_FLOAT&&(Y=i.R16F),N===i.UNSIGNED_BYTE&&(Y=i.R8)),x===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.R8UI),N===i.UNSIGNED_SHORT&&(Y=i.R16UI),N===i.UNSIGNED_INT&&(Y=i.R32UI),N===i.BYTE&&(Y=i.R8I),N===i.SHORT&&(Y=i.R16I),N===i.INT&&(Y=i.R32I)),x===i.RG&&(N===i.FLOAT&&(Y=i.RG32F),N===i.HALF_FLOAT&&(Y=i.RG16F),N===i.UNSIGNED_BYTE&&(Y=i.RG8)),x===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RG8UI),N===i.UNSIGNED_SHORT&&(Y=i.RG16UI),N===i.UNSIGNED_INT&&(Y=i.RG32UI),N===i.BYTE&&(Y=i.RG8I),N===i.SHORT&&(Y=i.RG16I),N===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),N===i.UNSIGNED_INT&&(Y=i.RGB32UI),N===i.BYTE&&(Y=i.RGB8I),N===i.SHORT&&(Y=i.RGB16I),N===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),N===i.UNSIGNED_INT&&(Y=i.RGBA32UI),N===i.BYTE&&(Y=i.RGBA8I),N===i.SHORT&&(Y=i.RGBA16I),N===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&(N===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),x===i.RGBA){let fe=$?_r:Ye.getTransfer(K);N===i.FLOAT&&(Y=i.RGBA32F),N===i.HALF_FLOAT&&(Y=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Y=fe===tt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(E,x){let N;return E?x===null||x===Dn||x===Oi?N=i.DEPTH24_STENCIL8:x===Zt?N=i.DEPTH32F_STENCIL8:x===Zs&&(N=i.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Dn||x===Oi?N=i.DEPTH_COMPONENT24:x===Zt?N=i.DEPTH_COMPONENT32F:x===Zs&&(N=i.DEPTH_COMPONENT16),N}function T(E,x){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==nt&&E.minFilter!==At?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function w(E){let x=E.target;x.removeEventListener("dispose",w),A(x),x.isVideoTexture&&h.delete(x)}function R(E){let x=E.target;x.removeEventListener("dispose",R),W(x)}function A(E){let x=n.get(E);if(x.__webglInit===void 0)return;let N=E.source,K=u.get(N);if(K){let $=K[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(E),Object.keys(K).length===0&&u.delete(N)}n.remove(E)}function S(E){let x=n.get(E);i.deleteTexture(x.__webglTexture);let N=E.source,K=u.get(N);delete K[x.__cacheKey],a.memory.textures--}function W(E){let x=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let $=0;$<x.__webglFramebuffer[K].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[K][$]);else i.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)i.deleteFramebuffer(x.__webglFramebuffer[K]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let N=E.textures;for(let K=0,$=N.length;K<$;K++){let Y=n.get(N[K]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(N[K])}n.remove(E)}let C=0;function U(){C=0}function F(){let E=C;return E>=s.maxTextures&&Ce("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),C+=1,E}function k(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function X(E,x){let N=n.get(E);if(E.isVideoTexture&&Ke(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let K=E.image;if(K===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{j(N,E,x);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+x)}function z(E,x){let N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){j(N,E,x);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+x)}function B(E,x){let N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){j(N,E,x);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+x)}function te(E,x){let N=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){ie(N,E,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+x)}let J={[Rn]:i.REPEAT,[xn]:i.CLAMP_TO_EDGE,[Ls]:i.MIRRORED_REPEAT},ce={[nt]:i.NEAREST,[Uo]:i.NEAREST_MIPMAP_NEAREST,[is]:i.NEAREST_MIPMAP_LINEAR,[At]:i.LINEAR,[js]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},de={[Od]:i.NEVER,[zd]:i.ALWAYS,[Ud]:i.LESS,[_l]:i.LEQUAL,[Fd]:i.EQUAL,[Ml]:i.GEQUAL,[Bd]:i.GREATER,[kd]:i.NOTEQUAL};function he(E,x){if(x.type===Zt&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===At||x.magFilter===js||x.magFilter===is||x.magFilter===In||x.minFilter===At||x.minFilter===js||x.minFilter===is||x.minFilter===In)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,J[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,J[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,J[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ce[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ce[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,de[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===nt||x.minFilter!==is&&x.minFilter!==In||x.type===Zt&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Oe(E,x){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",w));let K=x.source,$=u.get(K);$===void 0&&($={},u.set(K,$));let Y=k(x);if(Y!==E.__cacheKey){$[Y]===void 0&&($[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),$[Y].usedTimes++;let fe=$[E.__cacheKey];fe!==void 0&&($[E.__cacheKey].usedTimes--,fe.usedTimes===0&&S(x)),E.__cacheKey=Y,E.__webglTexture=$[Y].texture}return N}function Je(E,x,N){return Math.floor(Math.floor(E/N)/x)}function je(E,x,N,K){let Y=E.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,N,K,x.data);else{Y.sort((Z,ee)=>Z.start-ee.start);let fe=0;for(let Z=1;Z<Y.length;Z++){let ee=Y[fe],ue=Y[Z],pe=ee.start+ee.count,le=Je(ue.start,x.width,4),Ue=Je(ee.start,x.width,4);ue.start<=pe+1&&le===Ue&&Je(ue.start+ue.count-1,x.width,4)===le?ee.count=Math.max(ee.count,ue.start+ue.count-ee.start):(++fe,Y[fe]=ue)}Y.length=fe+1;let L=i.getParameter(i.UNPACK_ROW_LENGTH),V=i.getParameter(i.UNPACK_SKIP_PIXELS),ae=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Z=0,ee=Y.length;Z<ee;Z++){let ue=Y[Z],pe=Math.floor(ue.start/4),le=Math.ceil(ue.count/4),Ue=pe%x.width,D=Math.floor(pe/x.width),oe=le,se=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ue,D,oe,se,N,K,x.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,L),i.pixelStorei(i.UNPACK_SKIP_PIXELS,V),i.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function j(E,x,N){let K=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=i.TEXTURE_3D);let $=Oe(E,x),Y=x.source;t.bindTexture(K,E.__webglTexture,i.TEXTURE0+N);let fe=n.get(Y);if(Y.version!==fe.__version||$===!0){t.activeTexture(i.TEXTURE0+N);let L=Ye.getPrimaries(Ye.workingColorSpace),V=x.colorSpace===mi?null:Ye.getPrimaries(x.colorSpace),ae=x.colorSpace===mi||L===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let Z=v(x.image,!1,s.maxTextureSize);Z=$e(x,Z);let ee=r.convert(x.format,x.colorSpace),ue=r.convert(x.type),pe=b(x.internalFormat,ee,ue,x.colorSpace,x.isVideoTexture);he(K,x);let le,Ue=x.mipmaps,D=x.isVideoTexture!==!0,oe=fe.__version===void 0||$===!0,se=Y.dataReady,Me=T(x,Z);if(x.isDepthTexture)pe=M(x.format===Yn,x.type),oe&&(D?t.texStorage2D(i.TEXTURE_2D,1,pe,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,pe,Z.width,Z.height,0,ee,ue,null));else if(x.isDataTexture)if(Ue.length>0){D&&oe&&t.texStorage2D(i.TEXTURE_2D,Me,pe,Ue[0].width,Ue[0].height);for(let re=0,Q=Ue.length;re<Q;re++)le=Ue[re],D?se&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,le.width,le.height,ee,ue,le.data):t.texImage2D(i.TEXTURE_2D,re,pe,le.width,le.height,0,ee,ue,le.data);x.generateMipmaps=!1}else D?(oe&&t.texStorage2D(i.TEXTURE_2D,Me,pe,Z.width,Z.height),se&&je(x,Z,ee,ue)):t.texImage2D(i.TEXTURE_2D,0,pe,Z.width,Z.height,0,ee,ue,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,pe,Ue[0].width,Ue[0].height,Z.depth);for(let re=0,Q=Ue.length;re<Q;re++)if(le=Ue[re],x.format!==mn)if(ee!==null)if(D){if(se)if(x.layerUpdates.size>0){let Se=xh(le.width,le.height,x.format,x.type);for(let Be of x.layerUpdates){let pt=le.data.subarray(Be*Se/le.data.BYTES_PER_ELEMENT,(Be+1)*Se/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Be,le.width,le.height,1,ee,pt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,le.width,le.height,Z.depth,ee,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,pe,le.width,le.height,Z.depth,0,le.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?se&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,le.width,le.height,Z.depth,ee,ue,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,pe,le.width,le.height,Z.depth,0,ee,ue,le.data)}else{D&&oe&&t.texStorage2D(i.TEXTURE_2D,Me,pe,Ue[0].width,Ue[0].height);for(let re=0,Q=Ue.length;re<Q;re++)le=Ue[re],x.format!==mn?ee!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,le.width,le.height,ee,le.data):t.compressedTexImage2D(i.TEXTURE_2D,re,pe,le.width,le.height,0,le.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?se&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,le.width,le.height,ee,ue,le.data):t.texImage2D(i.TEXTURE_2D,re,pe,le.width,le.height,0,ee,ue,le.data)}else if(x.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,pe,Z.width,Z.height,Z.depth),se)if(x.layerUpdates.size>0){let re=xh(Z.width,Z.height,x.format,x.type);for(let Q of x.layerUpdates){let Se=Z.data.subarray(Q*re/Z.data.BYTES_PER_ELEMENT,(Q+1)*re/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,Z.width,Z.height,1,ee,ue,Se)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,ue,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,Z.width,Z.height,Z.depth,0,ee,ue,Z.data);else if(x.isData3DTexture)D?(oe&&t.texStorage3D(i.TEXTURE_3D,Me,pe,Z.width,Z.height,Z.depth),se&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,ue,Z.data)):t.texImage3D(i.TEXTURE_3D,0,pe,Z.width,Z.height,Z.depth,0,ee,ue,Z.data);else if(x.isFramebufferTexture){if(oe)if(D)t.texStorage2D(i.TEXTURE_2D,Me,pe,Z.width,Z.height);else{let re=Z.width,Q=Z.height;for(let Se=0;Se<Me;Se++)t.texImage2D(i.TEXTURE_2D,Se,pe,re,Q,0,ee,ue,null),re>>=1,Q>>=1}}else if(Ue.length>0){if(D&&oe){let re=Ae(Ue[0]);t.texStorage2D(i.TEXTURE_2D,Me,pe,re.width,re.height)}for(let re=0,Q=Ue.length;re<Q;re++)le=Ue[re],D?se&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ee,ue,le):t.texImage2D(i.TEXTURE_2D,re,pe,ee,ue,le);x.generateMipmaps=!1}else if(D){if(oe){let re=Ae(Z);t.texStorage2D(i.TEXTURE_2D,Me,pe,re.width,re.height)}se&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee,ue,Z)}else t.texImage2D(i.TEXTURE_2D,0,pe,ee,ue,Z);p(x)&&m(K),fe.__version=Y.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ie(E,x,N){if(x.image.length!==6)return;let K=Oe(E,x),$=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);let Y=n.get($);if($.version!==Y.__version||K===!0){t.activeTexture(i.TEXTURE0+N);let fe=Ye.getPrimaries(Ye.workingColorSpace),L=x.colorSpace===mi?null:Ye.getPrimaries(x.colorSpace),V=x.colorSpace===mi||fe===L?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);let ae=x.isCompressedTexture||x.image[0].isCompressedTexture,Z=x.image[0]&&x.image[0].isDataTexture,ee=[];for(let Q=0;Q<6;Q++)!ae&&!Z?ee[Q]=v(x.image[Q],!0,s.maxCubemapSize):ee[Q]=Z?x.image[Q].image:x.image[Q],ee[Q]=$e(x,ee[Q]);let ue=ee[0],pe=r.convert(x.format,x.colorSpace),le=r.convert(x.type),Ue=b(x.internalFormat,pe,le,x.colorSpace),D=x.isVideoTexture!==!0,oe=Y.__version===void 0||K===!0,se=$.dataReady,Me=T(x,ue);he(i.TEXTURE_CUBE_MAP,x);let re;if(ae){D&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ue,ue.width,ue.height);for(let Q=0;Q<6;Q++){re=ee[Q].mipmaps;for(let Se=0;Se<re.length;Se++){let Be=re[Se];x.format!==mn?pe!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,Be.width,Be.height,pe,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,Ue,Be.width,Be.height,0,Be.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,Be.width,Be.height,pe,le,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,Ue,Be.width,Be.height,0,pe,le,Be.data)}}}else{if(re=x.mipmaps,D&&oe){re.length>0&&Me++;let Q=Ae(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Ue,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Z){D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ee[Q].width,ee[Q].height,pe,le,ee[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ue,ee[Q].width,ee[Q].height,0,pe,le,ee[Q].data);for(let Se=0;Se<re.length;Se++){let pt=re[Se].image[Q].image;D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,pt.width,pt.height,pe,le,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,Ue,pt.width,pt.height,0,pe,le,pt.data)}}else{D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,pe,le,ee[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ue,pe,le,ee[Q]);for(let Se=0;Se<re.length;Se++){let Be=re[Se];D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,pe,le,Be.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,Ue,pe,le,Be.image[Q])}}}p(x)&&m(i.TEXTURE_CUBE_MAP),Y.__version=$.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ne(E,x,N,K,$,Y){let fe=r.convert(N.format,N.colorSpace),L=r.convert(N.type),V=b(N.internalFormat,fe,L,N.colorSpace),ae=n.get(x),Z=n.get(N);if(Z.__renderTarget=x,!ae.__hasExternalTextures){let ee=Math.max(1,x.width>>Y),ue=Math.max(1,x.height>>Y);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Y,V,ee,ue,x.depth,0,fe,L,null):t.texImage2D($,Y,V,ee,ue,0,fe,L,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),ft(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,$,Z.__webglTexture,0,P(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,$,Z.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(E,x,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){let K=x.depthTexture,$=K&&K.isDepthTexture?K.type:null,Y=M(x.stencilBuffer,$),fe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ft(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,P(x),Y,x.width,x.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,P(x),Y,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Y,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,E)}else{let K=x.textures;for(let $=0;$<K.length;$++){let Y=K[$],fe=r.convert(Y.format,Y.colorSpace),L=r.convert(Y.type),V=b(Y.internalFormat,fe,L,Y.colorSpace);ft(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,P(x),V,x.width,x.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,P(x),V,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,V,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _e(E,x,N){let K=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(x.depthTexture);if($.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),K){if($.__webglInit===void 0&&($.__webglInit=!0,x.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),he(i.TEXTURE_CUBE_MAP,x.depthTexture);let ae=r.convert(x.depthTexture.format),Z=r.convert(x.depthTexture.type),ee;x.depthTexture.format===Fn?ee=i.DEPTH_COMPONENT24:x.depthTexture.format===Yn&&(ee=i.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,ee,x.width,x.height,0,ae,Z,null)}}else X(x.depthTexture,0);let Y=$.__webglTexture,fe=P(x),L=K?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,V=x.depthTexture.format===Yn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Fn)ft(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,L,Y,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,V,L,Y,0);else if(x.depthTexture.format===Yn)ft(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,L,Y,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,V,L,Y,0);else throw new Error("Unknown depthTexture format")}function Ie(E){let x=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let K=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){let $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",$)};K.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=K}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(N)for(let K=0;K<6;K++)_e(x.__webglFramebuffer[K],E,K);else{let K=E.texture.mipmaps;K&&K.length>0?_e(x.__webglFramebuffer[0],E,0):_e(x.__webglFramebuffer,E,0)}else if(N){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=i.createRenderbuffer(),be(x.__webglDepthbuffer[K],E,!1);else{let $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}else{let K=E.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),be(x.__webglDepthbuffer,E,!1);else{let $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(E,x,N){let K=n.get(E);x!==void 0&&ne(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ie(E)}function Ge(E){let x=E.texture,N=n.get(E),K=n.get(x);E.addEventListener("dispose",R);let $=E.textures,Y=E.isWebGLCubeRenderTarget===!0,fe=$.length>1;if(fe||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=x.version,a.memory.textures++),Y){N.__webglFramebuffer=[];for(let L=0;L<6;L++)if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer[L]=[];for(let V=0;V<x.mipmaps.length;V++)N.__webglFramebuffer[L][V]=i.createFramebuffer()}else N.__webglFramebuffer[L]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer=[];for(let L=0;L<x.mipmaps.length;L++)N.__webglFramebuffer[L]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(fe)for(let L=0,V=$.length;L<V;L++){let ae=n.get($[L]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&ft(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let L=0;L<$.length;L++){let V=$[L];N.__webglColorRenderbuffer[L]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[L]);let ae=r.convert(V.format,V.colorSpace),Z=r.convert(V.type),ee=b(V.internalFormat,ae,Z,V.colorSpace,E.isXRRenderTarget===!0),ue=P(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,ee,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+L,i.RENDERBUFFER,N.__webglColorRenderbuffer[L])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),be(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),he(i.TEXTURE_CUBE_MAP,x);for(let L=0;L<6;L++)if(x.mipmaps&&x.mipmaps.length>0)for(let V=0;V<x.mipmaps.length;V++)ne(N.__webglFramebuffer[L][V],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,V);else ne(N.__webglFramebuffer[L],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);p(x)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let L=0,V=$.length;L<V;L++){let ae=$[L],Z=n.get(ae),ee=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ee=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,Z.__webglTexture),he(ee,ae),ne(N.__webglFramebuffer,E,ae,i.COLOR_ATTACHMENT0+L,ee,0),p(ae)&&m(ee)}t.unbindTexture()}else{let L=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(L=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(L,K.__webglTexture),he(L,x),x.mipmaps&&x.mipmaps.length>0)for(let V=0;V<x.mipmaps.length;V++)ne(N.__webglFramebuffer[V],E,x,i.COLOR_ATTACHMENT0,L,V);else ne(N.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,L,0);p(x)&&m(L),t.unbindTexture()}E.depthBuffer&&Ie(E)}function We(E){let x=E.textures;for(let N=0,K=x.length;N<K;N++){let $=x[N];if(p($)){let Y=y(E),fe=n.get($).__webglTexture;t.bindTexture(Y,fe),m(Y),t.unbindTexture()}}}let Ze=[],Fe=[];function rt(E){if(E.samples>0){if(ft(E)===!1){let x=E.textures,N=E.width,K=E.height,$=i.COLOR_BUFFER_BIT,Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(E),L=x.length>1;if(L)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let V=E.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),L){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ae]);let Z=n.get(x[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,N,K,0,0,N,K,$,i.NEAREST),c===!0&&(Ze.length=0,Fe.length=0,Ze.push(i.COLOR_ATTACHMENT0+ae),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ze.push(Y),Fe.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Fe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),L)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ae]);let Z=n.get(x[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,Z,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function P(E){return Math.min(s.maxSamples,E.samples)}function ft(E){let x=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ke(E){let x=a.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function $e(E,x){let N=E.colorSpace,K=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==kt&&N!==mi&&(Ye.getTransfer(N)===tt?(K!==mn||$!==rn)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",N)),x}function Ae(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.setTexture2D=X,this.setTexture2DArray=z,this.setTexture3D=B,this.setTextureCube=te,this.rebindTextures=xt,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function oA(i,e){function t(n,s=mi){let r,a=Ye.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===Bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ah)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===oh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===sh)return i.BYTE;if(n===rh)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===Fo)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===Zt)return i.FLOAT;if(n===Rt)return i.HALF_FLOAT;if(n===lh)return i.ALPHA;if(n===ch)return i.RGB;if(n===mn)return i.RGBA;if(n===Fn)return i.DEPTH_COMPONENT;if(n===Yn)return i.DEPTH_STENCIL;if(n===Js)return i.RED;if(n===zo)return i.RED_INTEGER;if(n===ss)return i.RG;if(n===Ho)return i.RG_INTEGER;if(n===Vo)return i.RGBA_INTEGER;if(n===na||n===ia||n===sa||n===ra)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Go||n===Wo||n===Xo||n===Yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qo||n===Qo||n===Ko||n===jo||n===Zo||n===Jo||n===$o)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qo||n===Qo)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ko)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===jo)return r.COMPRESSED_R11_EAC;if(n===Zo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Jo)return r.COMPRESSED_RG11_EAC;if(n===$o)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===el)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===il)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===al)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ll)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ul)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pl||n===ml||n===gl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pl)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xl||n===vl||n===Al||n===yl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Oi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var lA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Nr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dt({vertexShader:lA,fragmentShader:cA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ke(new hi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends li{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null,v=typeof XRWebGLBinding<"u",p=new Ih,m={},y=t.getContextAttributes(),b=null,M=null,T=[],w=[],R=new De,A=null,S=new bt;S.viewport=new mt;let W=new bt;W.viewport=new mt;let C=[S,W],U=new Co,F=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=T[j];return ie===void 0&&(ie=new ks,T[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=T[j];return ie===void 0&&(ie=new ks,T[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=T[j];return ie===void 0&&(ie=new ks,T[j]=ie),ie.getHandSpace()};function X(j){let ie=w.indexOf(j.inputSource);if(ie===-1)return;let ne=T[ie];ne!==void 0&&(ne.update(j.inputSource,j.frame,l||a),ne.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",B);for(let j=0;j<T.length;j++){let ie=w[j];ie!==null&&(w[j]=null,T[j].disconnect(ie))}F=null,k=null,p.reset();for(let j in m)delete m[j];e.setRenderTarget(b),f=null,u=null,d=null,s=null,M=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",z),s.addEventListener("inputsourceschange",B),y.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,be=null,_e=null;y.depth&&(_e=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=y.stencil?Yn:Fn,be=y.stencil?Oi:Dn);let Ie={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ie),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new yt(u.textureWidth,u.textureHeight,{format:mn,type:rn,depthTexture:new kn(u.textureWidth,u.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ne={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new yt(f.framebufferWidth,f.framebufferHeight,{format:mn,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function B(j){for(let ie=0;ie<j.removed.length;ie++){let ne=j.removed[ie],be=w.indexOf(ne);be>=0&&(w[be]=null,T[be].disconnect(ne))}for(let ie=0;ie<j.added.length;ie++){let ne=j.added[ie],be=w.indexOf(ne);if(be===-1){for(let Ie=0;Ie<T.length;Ie++)if(Ie>=w.length){w.push(ne),be=Ie;break}else if(w[Ie]===null){w[Ie]=ne,be=Ie;break}if(be===-1)break}let _e=T[be];_e&&_e.connect(ne)}}let te=new I,J=new I;function ce(j,ie,ne){te.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(ne.matrixWorld);let be=te.distanceTo(J),_e=ie.projectionMatrix.elements,Ie=ne.projectionMatrix.elements,xt=_e[14]/(_e[10]-1),Ge=_e[14]/(_e[10]+1),We=(_e[9]+1)/_e[5],Ze=(_e[9]-1)/_e[5],Fe=(_e[8]-1)/_e[0],rt=(Ie[8]+1)/Ie[0],P=xt*Fe,ft=xt*rt,Ke=be/(-Fe+rt),$e=Ke*-Fe;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX($e),j.translateZ(Ke),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),_e[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let Ae=xt+Ke,E=Ge+Ke,x=P-$e,N=ft+(be-$e),K=We*Ge/E*Ae,$=Ze*Ge/E*Ae;j.projectionMatrix.makePerspective(x,N,K,$,Ae,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function de(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ie=j.near,ne=j.far;p.texture!==null&&(p.depthNear>0&&(ie=p.depthNear),p.depthFar>0&&(ne=p.depthFar)),U.near=W.near=S.near=ie,U.far=W.far=S.far=ne,(F!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),F=U.near,k=U.far),U.layers.mask=j.layers.mask|6,S.layers.mask=U.layers.mask&-5,W.layers.mask=U.layers.mask&-3;let be=j.parent,_e=U.cameras;de(U,be);for(let Ie=0;Ie<_e.length;Ie++)de(_e[Ie],be);_e.length===2?ce(U,S,W):U.projectionMatrix.copy(S.projectionMatrix),he(j,U,be)};function he(j,ie,ne){ne===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(ne.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Zi*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(j){return m[j]};let Oe=null;function Je(j,ie){if(h=ie.getViewerPose(l||a),g=ie,h!==null){let ne=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let be=!1;ne.length!==U.cameras.length&&(U.cameras.length=0,be=!0);for(let Ge=0;Ge<ne.length;Ge++){let We=ne[Ge],Ze=null;if(f!==null)Ze=f.getViewport(We);else{let rt=d.getViewSubImage(u,We);Ze=rt.viewport,Ge===0&&(e.setRenderTargetTextures(M,rt.colorTexture,rt.depthStencilTexture),e.setRenderTarget(M))}let Fe=C[Ge];Fe===void 0&&(Fe=new bt,Fe.layers.enable(Ge),Fe.viewport=new mt,C[Ge]=Fe),Fe.matrix.fromArray(We.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(We.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ge===0&&(U.matrix.copy(Fe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),be===!0&&U.cameras.push(Fe)}let _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Ge=d.getDepthInformation(ne[0]);Ge&&Ge.isValid&&Ge.texture&&p.init(Ge,s.renderState)}if(_e&&_e.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Ge=0;Ge<ne.length;Ge++){let We=ne[Ge].camera;if(We){let Ze=m[We];Ze||(Ze=new Nr,m[We]=Ze);let Fe=d.getCameraImage(We);Ze.sourceTexture=Fe}}}}for(let ne=0;ne<T.length;ne++){let be=w[ne],_e=T[ne];be!==null&&_e!==void 0&&_e.update(be,ie,l||a)}Oe&&Oe(j,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}let je=new xf;je.setAnimationLoop(Je),this.setAnimationLoop=function(j){Oe=j},this.dispose=function(){}}},os=new vn,hA=new Ne;function uA(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ph(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,b,M){m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,y,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ht&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ht&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=e.get(m),b=y.envMap,M=y.envMapRotation;b&&(p.envMap.value=b,os.copy(M),os.x*=-1,os.y*=-1,os.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),p.envMapRotation.value.setFromMatrix4(hA.makeRotationFromEuler(os)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=b*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dA(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,b){let M=b.program;n.uniformBlockBinding(y,M)}function l(y,b){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",p));let T=b.program;n.updateUBOMapping(y,T);let w=e.render.frame;r[y.id]!==w&&(u(y),r[y.id]=w)}function h(y){let b=d();y.__bindingPointIndex=b;let M=i.createBuffer(),T=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let b=s[y.id],M=y.uniforms,T=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,R=M.length;w<R;w++){let A=Array.isArray(M[w])?M[w]:[M[w]];for(let S=0,W=A.length;S<W;S++){let C=A[S];if(f(C,w,S,T)===!0){let U=C.__offset,F=Array.isArray(C.value)?C.value:[C.value],k=0;for(let X=0;X<F.length;X++){let z=F[X],B=v(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,U+k,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,k),k+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,b,M,T){let w=y.value,R=b+"_"+M;if(T[R]===void 0)return typeof w=="number"||typeof w=="boolean"?T[R]=w:T[R]=w.clone(),!0;{let A=T[R];if(typeof w=="number"||typeof w=="boolean"){if(A!==w)return T[R]=w,!0}else if(A.equals(w)===!1)return A.copy(w),!0}return!1}function g(y){let b=y.uniforms,M=0,T=16;for(let R=0,A=b.length;R<A;R++){let S=Array.isArray(b[R])?b[R]:[b[R]];for(let W=0,C=S.length;W<C;W++){let U=S[W],F=Array.isArray(U.value)?U.value:[U.value];for(let k=0,X=F.length;k<X;k++){let z=F[k],B=v(z),te=M%T,J=te%B.boundary,ce=te+J;M+=J,ce!==0&&T-ce<B.storage&&(M+=T-ce),U.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=B.storage}}}let w=M%T;return w>0&&(M+=T-w),y.__size=M,y.__cache={},this}function v(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ce("WebGLRenderer: Unsupported uniform value type.",y),b}function p(y){let b=y.target;b.removeEventListener("dispose",p);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}var fA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qn=null;function pA(){return qn===null&&(qn=new Ii(fA,16,16,ss,Rt),qn.name="DFG_LUT",qn.minFilter=At,qn.magFilter=At,qn.wrapS=xn,qn.wrapT=xn,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}var wl=class{constructor(e={}){let{canvas:t=Hd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=f,p=new Set([Vo,Ho,zo]),m=new Set([rn,Dn,Zs,Oi,Bo,ko]),y=new Uint32Array(4),b=new Int32Array(4),M=null,T=null,w=[],R=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,W=!1;this._outputColorSpace=vt;let C=0,U=0,F=null,k=-1,X=null,z=new mt,B=new mt,te=null,J=new ve(0),ce=0,de=t.width,he=t.height,Oe=1,Je=null,je=null,j=new mt(0,0,de,he),ie=new mt(0,0,de,he),ne=!1,be=new Bn,_e=!1,Ie=!1,xt=new Ne,Ge=new I,We=new mt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Fe=!1;function rt(){return F===null?Oe:1}let P=n;function ft(_,O){return t.getContext(_,O)}try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"183"}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",pt,!1),P===null){let O="webgl2";if(P=ft(O,_),P===null)throw ft(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw Le("WebGLRenderer: "+_.message),_}let Ke,$e,Ae,E,x,N,K,$,Y,fe,L,V,ae,Z,ee,ue,pe,le,Ue,D,oe,se,Me;function re(){Ke=new Mx(P),Ke.init(),oe=new oA(P,Ke),$e=new px(P,Ke,e,oe),Ae=new rA(P,Ke),$e.reversedDepthBuffer&&u&&Ae.buffers.depth.setReversed(!0),E=new Ex(P),x=new Xv,N=new aA(P,Ke,Ae,x,$e,oe,E),K=new _x(S),$=new Pm(P),se=new dx(P,$),Y=new bx(P,$,E,se),fe=new Tx(P,Y,$,se,E),le=new wx(P,$e,N),ee=new mx(x),L=new Wv(S,K,Ke,$e,se,ee),V=new uA(S,x),ae=new qv,Z=new $v(Ke),pe=new ux(S,K,Ae,fe,g,c),ue=new sA(S,fe,$e),Me=new dA(P,E,$e,Ae),Ue=new fx(P,Ke,E),D=new Sx(P,Ke,E),E.programs=L.programs,S.capabilities=$e,S.extensions=Ke,S.properties=x,S.renderLists=ae,S.shadowMap=ue,S.state=Ae,S.info=E}re(),v!==rn&&(A=new Rx(v,t.width,t.height,s,r));let Q=new Dh(S,P);this.xr=Q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let _=Ke.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Ke.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(_){_!==void 0&&(Oe=_,this.setSize(de,he,!1))},this.getSize=function(_){return _.set(de,he)},this.setSize=function(_,O,q=!0){if(Q.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}de=_,he=O,t.width=Math.floor(_*Oe),t.height=Math.floor(O*Oe),q===!0&&(t.style.width=_+"px",t.style.height=O+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,_,O)},this.getDrawingBufferSize=function(_){return _.set(de*Oe,he*Oe).floor()},this.setDrawingBufferSize=function(_,O,q){de=_,he=O,Oe=q,t.width=Math.floor(_*q),t.height=Math.floor(O*q),this.setViewport(0,0,_,O)},this.setEffects=function(_){if(v===rn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let O=0;O<_.length;O++)if(_[O].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(z)},this.getViewport=function(_){return _.copy(j)},this.setViewport=function(_,O,q,G){_.isVector4?j.set(_.x,_.y,_.z,_.w):j.set(_,O,q,G),Ae.viewport(z.copy(j).multiplyScalar(Oe).round())},this.getScissor=function(_){return _.copy(ie)},this.setScissor=function(_,O,q,G){_.isVector4?ie.set(_.x,_.y,_.z,_.w):ie.set(_,O,q,G),Ae.scissor(B.copy(ie).multiplyScalar(Oe).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(_){Ae.setScissorTest(ne=_)},this.setOpaqueSort=function(_){Je=_},this.setTransparentSort=function(_){je=_},this.getClearColor=function(_){return _.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor(...arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha(...arguments)},this.clear=function(_=!0,O=!0,q=!0){let G=0;if(_){let H=!1;if(F!==null){let ge=F.texture.format;H=p.has(ge)}if(H){let ge=F.texture.type,ye=m.has(ge),xe=pe.getClearColor(),Ee=pe.getClearAlpha(),Te=xe.r,ze=xe.g,Xe=xe.b;ye?(y[0]=Te,y[1]=ze,y[2]=Xe,y[3]=Ee,P.clearBufferuiv(P.COLOR,0,y)):(b[0]=Te,b[1]=ze,b[2]=Xe,b[3]=Ee,P.clearBufferiv(P.COLOR,0,b))}else G|=P.COLOR_BUFFER_BIT}O&&(G|=P.DEPTH_BUFFER_BIT),q&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",pt,!1),pe.dispose(),ae.dispose(),Z.dispose(),x.dispose(),K.dispose(),fe.dispose(),se.dispose(),Me.dispose(),L.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Mu),Q.removeEventListener("sessionend",bu),ki.stop()};function Se(_){_.preventDefault(),Mr("WebGLRenderer: Context Lost."),W=!0}function Be(){Mr("WebGLRenderer: Context Restored."),W=!1;let _=E.autoReset,O=ue.enabled,q=ue.autoUpdate,G=ue.needsUpdate,H=ue.type;re(),E.autoReset=_,ue.enabled=O,ue.autoUpdate=q,ue.needsUpdate=G,ue.type=H}function pt(_){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function it(_){let O=_.target;O.removeEventListener("dispose",it),$n(O)}function $n(_){ei(_),x.remove(_)}function ei(_){let O=x.get(_).programs;O!==void 0&&(O.forEach(function(q){L.releaseProgram(q)}),_.isShaderMaterial&&L.releaseShaderCache(_))}this.renderBufferDirect=function(_,O,q,G,H,ge){O===null&&(O=Ze);let ye=H.isMesh&&H.matrixWorld.determinant()<0,xe=Mp(_,O,q,G,H);Ae.setMaterial(G,ye);let Ee=q.index,Te=1;if(G.wireframe===!0){if(Ee=Y.getWireframeAttribute(q),Ee===void 0)return;Te=2}let ze=q.drawRange,Xe=q.attributes.position,Re=ze.start*Te,at=(ze.start+ze.count)*Te;ge!==null&&(Re=Math.max(Re,ge.start*Te),at=Math.min(at,(ge.start+ge.count)*Te)),Ee!==null?(Re=Math.max(Re,0),at=Math.min(at,Ee.count)):Xe!=null&&(Re=Math.max(Re,0),at=Math.min(at,Xe.count));let St=at-Re;if(St<0||St===1/0)return;se.setup(H,G,xe,q,Ee);let Mt,ot=Ue;if(Ee!==null&&(Mt=$.get(Ee),ot=D,ot.setIndex(Mt)),H.isMesh)G.wireframe===!0?(Ae.setLineWidth(G.wireframeLinewidth*rt()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(H.isLine){let Wt=G.linewidth;Wt===void 0&&(Wt=1),Ae.setLineWidth(Wt*rt()),H.isLineSegments?ot.setMode(P.LINES):H.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else H.isPoints?ot.setMode(P.POINTS):H.isSprite&&ot.setMode(P.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)br("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))ot.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Wt=H._multiDrawStarts,we=H._multiDrawCounts,cn=H._multiDrawCount,et=Ee?$.get(Ee).bytesPerElement:1,Mn=x.get(G).currentProgram.getUniforms();for(let Ln=0;Ln<cn;Ln++)Mn.setValue(P,"_gl_DrawID",Ln),ot.render(Wt[Ln]/et,we[Ln])}else if(H.isInstancedMesh)ot.renderInstances(Re,St,H.count);else if(q.isInstancedBufferGeometry){let Wt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,we=Math.min(q.instanceCount,Wt);ot.renderInstances(Re,St,we)}else ot.render(Re,St)};function _u(_,O,q){_.transparent===!0&&_.side===yn&&_.forceSinglePass===!1?(_.side=Ht,_.needsUpdate=!0,Pa(_,O,q),_.side=dn,_.needsUpdate=!0,Pa(_,O,q),_.side=yn):Pa(_,O,q)}this.compile=function(_,O,q=null){q===null&&(q=_),T=Z.get(q),T.init(O),R.push(T),q.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),_!==q&&_.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights();let G=new Set;return _.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let ge=H.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){let xe=ge[ye];_u(xe,q,H),G.add(xe)}else _u(ge,q,H),G.add(ge)}),T=R.pop(),G},this.compileAsync=function(_,O,q=null){let G=this.compile(_,O,q);return new Promise(H=>{function ge(){if(G.forEach(function(ye){x.get(ye).currentProgram.isReady()&&G.delete(ye)}),G.size===0){H(_);return}setTimeout(ge,10)}Ke.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let dc=null;function _p(_){dc&&dc(_)}function Mu(){ki.stop()}function bu(){ki.start()}let ki=new xf;ki.setAnimationLoop(_p),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(_){dc=_,Q.setAnimationLoop(_),_===null?ki.stop():ki.start()},Q.addEventListener("sessionstart",Mu),Q.addEventListener("sessionend",bu),this.render=function(_,O){if(O!==void 0&&O.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;let q=Q.enabled===!0&&Q.isPresenting===!0,G=A!==null&&(F===null||q)&&A.begin(S,F);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(O),O=Q.getCamera()),_.isScene===!0&&_.onBeforeRender(S,_,O,F),T=Z.get(_,R.length),T.init(O),R.push(T),xt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),be.setFromProjectionMatrix(xt,Tn,O.reversedDepth),Ie=this.localClippingEnabled,_e=ee.init(this.clippingPlanes,Ie),M=ae.get(_,w.length),M.init(),w.push(M),Q.enabled===!0&&Q.isPresenting===!0){let ye=S.xr.getDepthSensingMesh();ye!==null&&fc(ye,O,-1/0,S.sortObjects)}fc(_,O,0,S.sortObjects),M.finish(),S.sortObjects===!0&&M.sort(Je,je),Fe=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,Fe&&pe.addToRenderList(M,_),this.info.render.frame++,_e===!0&&ee.beginShadows();let H=T.state.shadowsArray;if(ue.render(H,_,O),_e===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&A.hasRenderPass())===!1){let ye=M.opaque,xe=M.transmissive;if(T.setupLights(),O.isArrayCamera){let Ee=O.cameras;if(xe.length>0)for(let Te=0,ze=Ee.length;Te<ze;Te++){let Xe=Ee[Te];Eu(ye,xe,_,Xe)}Fe&&pe.render(_);for(let Te=0,ze=Ee.length;Te<ze;Te++){let Xe=Ee[Te];Su(M,_,Xe,Xe.viewport)}}else xe.length>0&&Eu(ye,xe,_,O),Fe&&pe.render(_),Su(M,_,O)}F!==null&&U===0&&(N.updateMultisampleRenderTarget(F),N.updateRenderTargetMipmap(F)),G&&A.end(S),_.isScene===!0&&_.onAfterRender(S,_,O),se.resetDefaultState(),k=-1,X=null,R.pop(),R.length>0?(T=R[R.length-1],_e===!0&&ee.setGlobalState(S.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?M=w[w.length-1]:M=null};function fc(_,O,q,G){if(_.visible===!1)return;if(_.layers.test(O.layers)){if(_.isGroup)q=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(O);else if(_.isLight)T.pushLight(_),_.castShadow&&T.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||be.intersectsSprite(_)){G&&We.setFromMatrixPosition(_.matrixWorld).applyMatrix4(xt);let ye=fe.update(_),xe=_.material;xe.visible&&M.push(_,ye,xe,q,We.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||be.intersectsObject(_))){let ye=fe.update(_),xe=_.material;if(G&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),We.copy(_.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),We.copy(ye.boundingSphere.center)),We.applyMatrix4(_.matrixWorld).applyMatrix4(xt)),Array.isArray(xe)){let Ee=ye.groups;for(let Te=0,ze=Ee.length;Te<ze;Te++){let Xe=Ee[Te],Re=xe[Xe.materialIndex];Re&&Re.visible&&M.push(_,ye,Re,q,We.z,Xe)}}else xe.visible&&M.push(_,ye,xe,q,We.z,null)}}let ge=_.children;for(let ye=0,xe=ge.length;ye<xe;ye++)fc(ge[ye],O,q,G)}function Su(_,O,q,G){let{opaque:H,transmissive:ge,transparent:ye}=_;T.setupLightsView(q),_e===!0&&ee.setGlobalState(S.clippingPlanes,q),G&&Ae.viewport(z.copy(G)),H.length>0&&Ra(H,O,q),ge.length>0&&Ra(ge,O,q),ye.length>0&&Ra(ye,O,q),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Eu(_,O,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[G.id]===void 0){let Re=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[G.id]=new yt(1,1,{generateMipmaps:!0,type:Re?Rt:rn,minFilter:In,samples:$e.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let ge=T.state.transmissionRenderTarget[G.id],ye=G.viewport||z;ge.setSize(ye.z*S.transmissionResolutionScale,ye.w*S.transmissionResolutionScale);let xe=S.getRenderTarget(),Ee=S.getActiveCubeFace(),Te=S.getActiveMipmapLevel();S.setRenderTarget(ge),S.getClearColor(J),ce=S.getClearAlpha(),ce<1&&S.setClearColor(16777215,.5),S.clear(),Fe&&pe.render(q);let ze=S.toneMapping;S.toneMapping=Pn;let Xe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),T.setupLightsView(G),_e===!0&&ee.setGlobalState(S.clippingPlanes,G),Ra(_,q,G),N.updateMultisampleRenderTarget(ge),N.updateRenderTargetMipmap(ge),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let at=0,St=O.length;at<St;at++){let Mt=O[at],{object:ot,geometry:Wt,material:we,group:cn}=Mt;if(we.side===yn&&ot.layers.test(G.layers)){let et=we.side;we.side=Ht,we.needsUpdate=!0,wu(ot,q,G,Wt,we,cn),we.side=et,we.needsUpdate=!0,Re=!0}}Re===!0&&(N.updateMultisampleRenderTarget(ge),N.updateRenderTargetMipmap(ge))}S.setRenderTarget(xe,Ee,Te),S.setClearColor(J,ce),Xe!==void 0&&(G.viewport=Xe),S.toneMapping=ze}function Ra(_,O,q){let G=O.isScene===!0?O.overrideMaterial:null;for(let H=0,ge=_.length;H<ge;H++){let ye=_[H],{object:xe,geometry:Ee,group:Te}=ye,ze=ye.material;ze.allowOverride===!0&&G!==null&&(ze=G),xe.layers.test(q.layers)&&wu(xe,O,q,Ee,ze,Te)}}function wu(_,O,q,G,H,ge){_.onBeforeRender(S,O,q,G,H,ge),_.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),H.onBeforeRender(S,O,q,G,_,ge),H.transparent===!0&&H.side===yn&&H.forceSinglePass===!1?(H.side=Ht,H.needsUpdate=!0,S.renderBufferDirect(q,O,G,H,_,ge),H.side=dn,H.needsUpdate=!0,S.renderBufferDirect(q,O,G,H,_,ge),H.side=yn):S.renderBufferDirect(q,O,G,H,_,ge),_.onAfterRender(S,O,q,G,H,ge)}function Pa(_,O,q){O.isScene!==!0&&(O=Ze);let G=x.get(_),H=T.state.lights,ge=T.state.shadowsArray,ye=H.state.version,xe=L.getParameters(_,H.state,ge,O,q),Ee=L.getProgramCacheKey(xe),Te=G.programs;G.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;let ze=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;G.envMap=K.get(_.envMap||G.environment,ze),G.envMapRotation=G.environment!==null&&_.envMap===null?O.environmentRotation:_.envMapRotation,Te===void 0&&(_.addEventListener("dispose",it),Te=new Map,G.programs=Te);let Xe=Te.get(Ee);if(Xe!==void 0){if(G.currentProgram===Xe&&G.lightsStateVersion===ye)return Cu(_,xe),Xe}else xe.uniforms=L.getUniforms(_),_.onBeforeCompile(xe,S),Xe=L.acquireProgram(xe,Ee),Te.set(Ee,Xe),G.uniforms=xe.uniforms;let Re=G.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Re.clippingPlanes=ee.uniform),Cu(_,xe),G.needsLights=Sp(_),G.lightsStateVersion=ye,G.needsLights&&(Re.ambientLightColor.value=H.state.ambient,Re.lightProbe.value=H.state.probe,Re.directionalLights.value=H.state.directional,Re.directionalLightShadows.value=H.state.directionalShadow,Re.spotLights.value=H.state.spot,Re.spotLightShadows.value=H.state.spotShadow,Re.rectAreaLights.value=H.state.rectArea,Re.ltc_1.value=H.state.rectAreaLTC1,Re.ltc_2.value=H.state.rectAreaLTC2,Re.pointLights.value=H.state.point,Re.pointLightShadows.value=H.state.pointShadow,Re.hemisphereLights.value=H.state.hemi,Re.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Re.spotLightMatrix.value=H.state.spotLightMatrix,Re.spotLightMap.value=H.state.spotLightMap,Re.pointShadowMatrix.value=H.state.pointShadowMatrix),G.currentProgram=Xe,G.uniformsList=null,Xe}function Tu(_){if(_.uniformsList===null){let O=_.currentProgram.getUniforms();_.uniformsList=tr.seqWithValue(O.seq,_.uniforms)}return _.uniformsList}function Cu(_,O){let q=x.get(_);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Mp(_,O,q,G,H){O.isScene!==!0&&(O=Ze),N.resetTextureUnits();let ge=O.fog,ye=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,xe=F===null?S.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:kt,Ee=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Te=K.get(G.envMap||ye,Ee),ze=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Xe=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Re=!!q.morphAttributes.position,at=!!q.morphAttributes.normal,St=!!q.morphAttributes.color,Mt=Pn;G.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Mt=S.toneMapping);let ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Wt=ot!==void 0?ot.length:0,we=x.get(G),cn=T.state.lights;if(_e===!0&&(Ie===!0||_!==X)){let Dt=_===X&&G.id===k;ee.setState(G,_,Dt)}let et=!1;G.version===we.__version?(we.needsLights&&we.lightsStateVersion!==cn.state.version||we.outputColorSpace!==xe||H.isBatchedMesh&&we.batching===!1||!H.isBatchedMesh&&we.batching===!0||H.isBatchedMesh&&we.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&we.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&we.instancing===!1||!H.isInstancedMesh&&we.instancing===!0||H.isSkinnedMesh&&we.skinning===!1||!H.isSkinnedMesh&&we.skinning===!0||H.isInstancedMesh&&we.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&we.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&we.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&we.instancingMorph===!1&&H.morphTexture!==null||we.envMap!==Te||G.fog===!0&&we.fog!==ge||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ee.numPlanes||we.numIntersection!==ee.numIntersection)||we.vertexAlphas!==ze||we.vertexTangents!==Xe||we.morphTargets!==Re||we.morphNormals!==at||we.morphColors!==St||we.toneMapping!==Mt||we.morphTargetsCount!==Wt)&&(et=!0):(et=!0,we.__version=G.version);let Mn=we.currentProgram;et===!0&&(Mn=Pa(G,O,H));let Ln=!1,zi=!1,ms=!1,ct=Mn.getUniforms(),Bt=we.uniforms;if(Ae.useProgram(Mn.program)&&(Ln=!0,zi=!0,ms=!0),G.id!==k&&(k=G.id,zi=!0),Ln||X!==_){Ae.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),ct.setValue(P,"projectionMatrix",_.projectionMatrix),ct.setValue(P,"viewMatrix",_.matrixWorldInverse);let Mi=ct.map.cameraPosition;Mi!==void 0&&Mi.setValue(P,Ge.setFromMatrixPosition(_.matrixWorld)),$e.logarithmicDepthBuffer&&ct.setValue(P,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ct.setValue(P,"isOrthographic",_.isOrthographicCamera===!0),X!==_&&(X=_,zi=!0,ms=!0)}if(we.needsLights&&(cn.state.directionalShadowMap.length>0&&ct.setValue(P,"directionalShadowMap",cn.state.directionalShadowMap,N),cn.state.spotShadowMap.length>0&&ct.setValue(P,"spotShadowMap",cn.state.spotShadowMap,N),cn.state.pointShadowMap.length>0&&ct.setValue(P,"pointShadowMap",cn.state.pointShadowMap,N)),H.isSkinnedMesh){ct.setOptional(P,H,"bindMatrix"),ct.setOptional(P,H,"bindMatrixInverse");let Dt=H.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),ct.setValue(P,"boneTexture",Dt.boneTexture,N))}H.isBatchedMesh&&(ct.setOptional(P,H,"batchingTexture"),ct.setValue(P,"batchingTexture",H._matricesTexture,N),ct.setOptional(P,H,"batchingIdTexture"),ct.setValue(P,"batchingIdTexture",H._indirectTexture,N),ct.setOptional(P,H,"batchingColorTexture"),H._colorsTexture!==null&&ct.setValue(P,"batchingColorTexture",H._colorsTexture,N));let _i=q.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&le.update(H,q,Mn),(zi||we.receiveShadow!==H.receiveShadow)&&(we.receiveShadow=H.receiveShadow,ct.setValue(P,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(Bt.envMapIntensity.value=O.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=pA()),zi&&(ct.setValue(P,"toneMappingExposure",S.toneMappingExposure),we.needsLights&&bp(Bt,ms),ge&&G.fog===!0&&V.refreshFogUniforms(Bt,ge),V.refreshMaterialUniforms(Bt,G,Oe,he,T.state.transmissionRenderTarget[_.id]),tr.upload(P,Tu(we),Bt,N)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(tr.upload(P,Tu(we),Bt,N),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ct.setValue(P,"center",H.center),ct.setValue(P,"modelViewMatrix",H.modelViewMatrix),ct.setValue(P,"normalMatrix",H.normalMatrix),ct.setValue(P,"modelMatrix",H.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Dt=G.uniformsGroups;for(let Mi=0,gs=Dt.length;Mi<gs;Mi++){let Ru=Dt[Mi];Me.update(Ru,Mn),Me.bind(Ru,Mn)}}return Mn}function bp(_,O){_.ambientLightColor.needsUpdate=O,_.lightProbe.needsUpdate=O,_.directionalLights.needsUpdate=O,_.directionalLightShadows.needsUpdate=O,_.pointLights.needsUpdate=O,_.pointLightShadows.needsUpdate=O,_.spotLights.needsUpdate=O,_.spotLightShadows.needsUpdate=O,_.rectAreaLights.needsUpdate=O,_.hemisphereLights.needsUpdate=O}function Sp(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(_,O,q){let G=x.get(_);G.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),x.get(_.texture).__webglTexture=O,x.get(_.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,O){let q=x.get(_);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0};let Ep=P.createFramebuffer();this.setRenderTarget=function(_,O=0,q=0){F=_,C=O,U=q;let G=null,H=!1,ge=!1;if(_){let xe=x.get(_);if(xe.__useDefaultFramebuffer!==void 0){Ae.bindFramebuffer(P.FRAMEBUFFER,xe.__webglFramebuffer),z.copy(_.viewport),B.copy(_.scissor),te=_.scissorTest,Ae.viewport(z),Ae.scissor(B),Ae.setScissorTest(te),k=-1;return}else if(xe.__webglFramebuffer===void 0)N.setupRenderTarget(_);else if(xe.__hasExternalTextures)N.rebindTextures(_,x.get(_.texture).__webglTexture,x.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let ze=_.depthTexture;if(xe.__boundDepthTexture!==ze){if(ze!==null&&x.has(ze)&&(_.width!==ze.image.width||_.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(_)}}let Ee=_.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ge=!0);let Te=x.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Te[O])?G=Te[O][q]:G=Te[O],H=!0):_.samples>0&&N.useMultisampledRTT(_)===!1?G=x.get(_).__webglMultisampledFramebuffer:Array.isArray(Te)?G=Te[q]:G=Te,z.copy(_.viewport),B.copy(_.scissor),te=_.scissorTest}else z.copy(j).multiplyScalar(Oe).floor(),B.copy(ie).multiplyScalar(Oe).floor(),te=ne;if(q!==0&&(G=Ep),Ae.bindFramebuffer(P.FRAMEBUFFER,G)&&Ae.drawBuffers(_,G),Ae.viewport(z),Ae.scissor(B),Ae.setScissorTest(te),H){let xe=x.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,xe.__webglTexture,q)}else if(ge){let xe=O;for(let Ee=0;Ee<_.textures.length;Ee++){let Te=x.get(_.textures[Ee]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ee,Te.__webglTexture,q,xe)}}else if(_!==null&&q!==0){let xe=x.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,xe.__webglTexture,q)}k=-1},this.readRenderTargetPixels=function(_,O,q,G,H,ge,ye,xe=0){if(!(_&&_.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=x.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee){Ae.bindFramebuffer(P.FRAMEBUFFER,Ee);try{let Te=_.textures[xe],ze=Te.format,Xe=Te.type;if(_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+xe),!$e.textureFormatReadable(ze)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Xe)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=_.width-G&&q>=0&&q<=_.height-H&&P.readPixels(O,q,G,H,oe.convert(ze),oe.convert(Xe),ge)}finally{let Te=F!==null?x.get(F).__webglFramebuffer:null;Ae.bindFramebuffer(P.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(_,O,q,G,H,ge,ye,xe=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=x.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee)if(O>=0&&O<=_.width-G&&q>=0&&q<=_.height-H){Ae.bindFramebuffer(P.FRAMEBUFFER,Ee);let Te=_.textures[xe],ze=Te.format,Xe=Te.type;if(_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+xe),!$e.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Re=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Re),P.bufferData(P.PIXEL_PACK_BUFFER,ge.byteLength,P.STREAM_READ),P.readPixels(O,q,G,H,oe.convert(ze),oe.convert(Xe),0);let at=F!==null?x.get(F).__webglFramebuffer:null;Ae.bindFramebuffer(P.FRAMEBUFFER,at);let St=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Gd(P,St,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Re),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ge),P.deleteBuffer(Re),P.deleteSync(St),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,O=null,q=0){let G=Math.pow(2,-q),H=Math.floor(_.image.width*G),ge=Math.floor(_.image.height*G),ye=O!==null?O.x:0,xe=O!==null?O.y:0;N.setTexture2D(_,0),P.copyTexSubImage2D(P.TEXTURE_2D,q,0,0,ye,xe,H,ge),Ae.unbindTexture()};let wp=P.createFramebuffer(),Tp=P.createFramebuffer();this.copyTextureToTexture=function(_,O,q=null,G=null,H=0,ge=0){let ye,xe,Ee,Te,ze,Xe,Re,at,St,Mt=_.isCompressedTexture?_.mipmaps[ge]:_.image;if(q!==null)ye=q.max.x-q.min.x,xe=q.max.y-q.min.y,Ee=q.isBox3?q.max.z-q.min.z:1,Te=q.min.x,ze=q.min.y,Xe=q.isBox3?q.min.z:0;else{let Bt=Math.pow(2,-H);ye=Math.floor(Mt.width*Bt),xe=Math.floor(Mt.height*Bt),_.isDataArrayTexture?Ee=Mt.depth:_.isData3DTexture?Ee=Math.floor(Mt.depth*Bt):Ee=1,Te=0,ze=0,Xe=0}G!==null?(Re=G.x,at=G.y,St=G.z):(Re=0,at=0,St=0);let ot=oe.convert(O.format),Wt=oe.convert(O.type),we;O.isData3DTexture?(N.setTexture3D(O,0),we=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(N.setTexture2DArray(O,0),we=P.TEXTURE_2D_ARRAY):(N.setTexture2D(O,0),we=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);let cn=P.getParameter(P.UNPACK_ROW_LENGTH),et=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Mn=P.getParameter(P.UNPACK_SKIP_PIXELS),Ln=P.getParameter(P.UNPACK_SKIP_ROWS),zi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Mt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Mt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Te),P.pixelStorei(P.UNPACK_SKIP_ROWS,ze),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xe);let ms=_.isDataArrayTexture||_.isData3DTexture,ct=O.isDataArrayTexture||O.isData3DTexture;if(_.isDepthTexture){let Bt=x.get(_),_i=x.get(O),Dt=x.get(Bt.__renderTarget),Mi=x.get(_i.__renderTarget);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,Dt.__webglFramebuffer),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let gs=0;gs<Ee;gs++)ms&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,x.get(_).__webglTexture,H,Xe+gs),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,x.get(O).__webglTexture,ge,St+gs)),P.blitFramebuffer(Te,ze,ye,xe,Re,at,ye,xe,P.DEPTH_BUFFER_BIT,P.NEAREST);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(H!==0||_.isRenderTargetTexture||x.has(_)){let Bt=x.get(_),_i=x.get(O);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,wp),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,Tp);for(let Dt=0;Dt<Ee;Dt++)ms?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,H,Xe+Dt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,H),ct?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_i.__webglTexture,ge,St+Dt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,_i.__webglTexture,ge),H!==0?P.blitFramebuffer(Te,ze,ye,xe,Re,at,ye,xe,P.COLOR_BUFFER_BIT,P.NEAREST):ct?P.copyTexSubImage3D(we,ge,Re,at,St+Dt,Te,ze,ye,xe):P.copyTexSubImage2D(we,ge,Re,at,Te,ze,ye,xe);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ct?_.isDataTexture||_.isData3DTexture?P.texSubImage3D(we,ge,Re,at,St,ye,xe,Ee,ot,Wt,Mt.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(we,ge,Re,at,St,ye,xe,Ee,ot,Mt.data):P.texSubImage3D(we,ge,Re,at,St,ye,xe,Ee,ot,Wt,Mt):_.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ge,Re,at,ye,xe,ot,Wt,Mt.data):_.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ge,Re,at,Mt.width,Mt.height,ot,Mt.data):P.texSubImage2D(P.TEXTURE_2D,ge,Re,at,ye,xe,ot,Wt,Mt);P.pixelStorei(P.UNPACK_ROW_LENGTH,cn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,et),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ln),P.pixelStorei(P.UNPACK_SKIP_IMAGES,zi),ge===0&&O.generateMipmaps&&P.generateMipmap(we),Ae.unbindTexture()},this.initRenderTarget=function(_){x.get(_).__webglFramebuffer===void 0&&N.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?N.setTextureCube(_,0):_.isData3DTexture?N.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?N.setTexture2DArray(_,0):N.setTexture2D(_,0),Ae.unbindTexture()},this.resetState=function(){C=0,U=0,F=null,Ae.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};var Rl={categories:["\u673A\u6784\u6863\u6848","\u5DE5\u7A0B\u7814\u7A76","\u751F\u547D\u79D1\u5B66","\u80FD\u91CF\u7814\u7A76","\u7279\u522B\u9879\u76EE"],columns:["\u5DE5\u7A0B\u7814\u7A76","\u751F\u547D\u79D1\u5B66","\u673A\u6784\u6863\u6848","\u80FD\u91CF\u7814\u7A76","\u7279\u522B\u9879\u76EE"],records:[{id:"X-001",title:"\u83B1\u8335\u751F\u547D",en:"RHINE LAB, LLC.",department:"\u603B\u8F96\u6784\u4EF6\u79D1",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright / Saria",clearance:"REFERENCE AREA",abstract:"\u83B1\u8335\u751F\u547D\u4ECE\u514B\u4E3D\u65AF\u817E\u4E0E\u585E\u96F7\u5A05\u5171\u540C\u521B\u529E\u7684\u7814\u7A76\u5BA4\u53D1\u5C55\u800C\u6765\u3002\u8FD9\u91CC\u805A\u96C6\u7740\u7814\u7A76\u751F\u547D\u3001\u80FD\u6E90\u4E0E\u672A\u77E5\u6280\u672F\u7684\u4EBA\uFF0C\u4E5F\u627F\u53D7\u7740\u8D44\u91D1\u3001\u6743\u529B\u548C\u6210\u679C\u5E94\u7528\u7684\u538B\u529B\u3002\u7406\u89E3\u8FD9\u5BB6\u673A\u6784\uFF0C\u9700\u8981\u540C\u65F6\u9605\u8BFB\u5B83\u7684\u5B9E\u9A8C\u8BB0\u5F55\u4E0E\u7814\u7A76\u8005\u7684\u9009\u62E9\u3002",findings:["\u7814\u7A76\u65B9\u5411\u8DE8\u8D8A\u591A\u4E2A\u79D1\u5C5E\uFF0C\u91CD\u5927\u9879\u76EE\u5F80\u5F80\u4F9D\u8D56\u8DE8\u79D1\u534F\u4F5C\u3002","\u4E00\u9879\u6210\u679C\u7684\u6280\u672F\u4EF7\u503C\uFF0C\u4E0E\u5B83\u6700\u7EC8\u88AB\u600E\u6837\u4F7F\u7528\uFF0C\u9700\u8981\u5206\u522B\u8BA8\u8BBA\u3002","\u673A\u6784\u6CBF\u9769\u4E0E\u4E2A\u4EBA\u5C65\u5386\u4EA4\u53C9\u7F16\u76EE\uFF0C\u4FDD\u7559\u4E0D\u540C\u9636\u6BB5\u7684\u7ACB\u573A\u53D8\u5316\u3002"],source:"https://arknights.wiki.gg/wiki/Rhine_Lab"},{id:"X-002",title:"\u7ED3\u6784\u4E0E\u8FB9\u754C",en:"STRUCTURE & BOUNDARIES",department:"\u5DE5\u7A0B\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Engineering Section",clearance:"REFERENCE AREA",abstract:"\u628A\u5B9E\u9A8C\u5BA4\u4E2D\u7684\u8BBE\u60F3\u53D8\u6210\u53EF\u8FD0\u884C\u7684\u8BBE\u65BD\uFF0C\u9700\u8981\u89E3\u51B3\u627F\u91CD\u3001\u7EF4\u4FEE\u548C\u4EBA\u5458\u901A\u884C\u8FD9\u4E9B\u5177\u4F53\u95EE\u9898\u3002\u83B1\u8335\u751F\u547D\u7684\u5DE5\u7A0B\u4EBA\u5458\u4E3A\u5927\u578B\u7814\u7A76\u9879\u76EE\u63D0\u4F9B\u8BBE\u5907\u652F\u6301\u3002\u672C\u5377\u4EE5\u8BBE\u65BD\u8FB9\u754C\u4E3A\u4E3B\u9898\uFF0C\u5173\u6CE8\u6784\u60F3\u843D\u5730\u4E4B\u540E\u7531\u8C01\u7EF4\u62A4\u3001\u7531\u8C01\u627F\u62C5\u5931\u6548\u540E\u679C\u3002",findings:["\u627F\u8F7D\u7ED3\u6784\u4E0E\u751F\u547D\u79D1\u5B66\u610F\u4E49\u4E0A\u7684\u7ED3\u6784\u79D1\u5206\u5C5E\u4E0D\u540C\u95EE\u9898\u3002","\u6BD4\u8F83\u8BD5\u9A8C\u88C5\u7F6E\u4E0E\u957F\u671F\u8FD0\u884C\u8BBE\u65BD\u5BF9\u68C0\u4FEE\u7A7A\u95F4\u7684\u4E0D\u540C\u8981\u6C42\u3002","\u4E3A\u5F02\u5E38\u505C\u673A\u4FDD\u7559\u901A\u9053\uFF0C\u4E0D\u80FD\u53EA\u8BB0\u5F55\u8BBE\u5907\u6B63\u5E38\u5DE5\u4F5C\u7684\u72B6\u6001\u3002"],source:"https://prts.wiki/w/\u83B1\u8335\u751F\u547D\u9AD8\u7EA7\u5DE5\u7A0B\u79D1\u6210\u5458"},{id:"X-003",title:"\u751F\u547D\u7684\u8F6E\u5ED3",en:"THE CONTOUR OF LIFE",department:"\u7ED3\u6784\u79D1",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Silence",clearance:"REFERENCE AREA",abstract:"\u8D6B\u9ED8\u5728\u83B1\u8335\u751F\u547D\u65F6\u671F\u4ECE\u4E8B\u4E0E\u6E90\u77F3\u6709\u5173\u7684\u751F\u547D\u79D1\u5B66\u7814\u7A76\uFF0C\u540E\u6765\u6210\u4E3A\u7F57\u5FB7\u5C9B\u7684\u533B\u7597\u5E72\u5458\u3002\u5979\u7684\u7ECF\u5386\u8BA9\u7814\u7A76\u5BF9\u8C61\u4E0E\u60A3\u8005\u4E4B\u95F4\u7684\u8DDD\u79BB\u53D8\u5F97\u5177\u4F53\uFF1A\u4E00\u4EFD\u770B\u4F3C\u5B8C\u6574\u7684\u5B9E\u9A8C\u7ED3\u679C\uFF0C\u672A\u5FC5\u56DE\u7B54\u4E86\u53D7\u8BD5\u8005\u5C06\u5982\u4F55\u751F\u6D3B\u3002",findings:["\u628A\u7EC4\u7EC7\u53D8\u5316\u3001\u529F\u80FD\u53D8\u5316\u4E0E\u4E2A\u4EBA\u611F\u53D7\u653E\u5728\u540C\u4E00\u89C2\u5BDF\u6846\u67B6\u4E2D\u3002","\u4E34\u5E8A\u7167\u62A4\u8BB0\u5F55\u5E94\u4E0E\u5B9E\u9A8C\u9636\u6BB5\u7684\u76EE\u6807\u548C\u5047\u8BBE\u76F8\u4E92\u6838\u5BF9\u3002","\u7814\u7A76\u4E2D\u7684\u672A\u77E5\u5E94\u88AB\u4FDD\u7559\u4E0B\u6765\uFF0C\u4E0D\u80FD\u88AB\u6F02\u4EAE\u7684\u7ED3\u8BBA\u63A9\u76D6\u3002"],source:"https://prts.wiki/w/\u8D6B\u9ED8"},{id:"X-004",title:"\u80FD\u91CF\u8F6C\u6362",en:"ENERGY CONVERSION",department:"\u80FD\u91CF\u79D1",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ferdinand Clooney",clearance:"REFERENCE AREA",abstract:"\u6590\u5C14\u8FEA\u5357\u4E0E\u83B1\u8335\u751F\u547D\u80FD\u91CF\u79D1\u3001\u91CD\u5927\u9879\u76EE\u7684\u8D44\u6E90\u6295\u5165\u5173\u7CFB\u5BC6\u5207\u3002\u5927\u578B\u80FD\u6E90\u5DE5\u7A0B\u4E5F\u56E0\u6B64\u540C\u65F6\u662F\u4E00\u9879\u79D1\u7814\u5DE5\u4F5C\u548C\u4E00\u573A\u7EC4\u7EC7\u534F\u4F5C\u3002\u672C\u5377\u8BA8\u8BBA\u80FD\u91CF\u4ECE\u5B9E\u9A8C\u7ED3\u679C\u8D70\u5411\u5B9E\u9645\u5E94\u7528\u65F6\uFF0C\u6548\u7387\u3001\u4F9B\u7ED9\u4E0E\u5916\u90E8\u5229\u76CA\u4E4B\u95F4\u7684\u5173\u8054\u3002",findings:["\u8BB0\u5F55\u80FD\u6E90\u6765\u6E90\u3001\u8F6C\u6362\u73AF\u8282\u548C\u6700\u7EC8\u7528\u9014\u4E4B\u95F4\u7684\u8054\u7CFB\u3002","\u89C4\u6A21\u6269\u5927\u540E\uFF0C\u5355\u6B21\u5B9E\u9A8C\u7684\u6210\u529F\u4E0D\u80FD\u66FF\u4EE3\u6301\u7EED\u8FD0\u884C\u7684\u9A8C\u8BC1\u3002","\u9879\u76EE\u7684\u8D44\u91D1\u5B89\u6392\u4E5F\u4F1A\u6539\u53D8\u6280\u672F\u8DEF\u7EBF\u4E0E\u6210\u679C\u4F7F\u7528\u7684\u65B9\u5411\u3002"],source:"https://prts.wiki/w/\u591A\u841D\u897F"},{id:"X-005",title:"\u751F\u6001\u89C2\u6D4B",en:"ECOLOGICAL OBSERVATION",department:"\u751F\u6001\u79D1",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Muelsyse",clearance:"REFERENCE AREA",abstract:"\u7F2A\u5C14\u8D5B\u601D\u9886\u5BFC\u7684\u751F\u6001\u79D1\u7814\u7A76\u751F\u547D\u4E0E\u73AF\u5883\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C\u4E5F\u4E0E\u7F57\u5FB7\u5C9B\u5F00\u5C55\u8054\u5408\u79D1\u7814\u3002\u6D01\u51C0\u7684\u5B9E\u9A8C\u73AF\u5883\u5BF9\u4E8E\u5979\u5177\u6709\u7279\u6B8A\u610F\u4E49\u3002\u672C\u5377\u4ECE\u6C34\u4F53\u548C\u690D\u7269\u7684\u8FDE\u7EED\u89C2\u5BDF\u51FA\u53D1\uFF0C\u8FFD\u95EE\u5B9E\u9A8C\u5BA4\u91CC\u7684\u7A33\u5B9A\u6761\u4EF6\u80FD\u591F\u89E3\u91CA\u591A\u5C11\u771F\u5B9E\u73AF\u5883\u4E2D\u7684\u53D8\u5316\u3002",findings:["\u5BF9\u7167\u6C34\u4F53\u3001\u690D\u7269\u4E0E\u73AF\u5883\u8BB0\u5F55\uFF0C\u907F\u514D\u628A\u5173\u8054\u76F4\u63A5\u5F53\u4F5C\u56E0\u679C\u3002","\u8BB0\u5F55\u91C7\u6837\u5730\u70B9\u548C\u6761\u4EF6\uFF0C\u4FDD\u7559\u65E0\u6CD5\u5728\u5B9E\u9A8C\u5BA4\u4E2D\u91CD\u73B0\u7684\u5DEE\u5F02\u3002","\u73AF\u5883\u51C0\u5316\u65E2\u5F71\u54CD\u7814\u7A76\u7ED3\u679C\uFF0C\u4E5F\u5173\u7CFB\u5230\u7814\u7A76\u8005\u81EA\u8EAB\u7684\u9700\u8981\u3002"],source:"https://prts.wiki/w/\u7F2A\u5C14\u8D5B\u601D"},{id:"X-006",title:"\u5B9E\u9A8C\u5B89\u5168\u89C4\u8303",en:"LABORATORY SAFETY",department:"\u9632\u536B\u79D1",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Saria",clearance:"REFERENCE AREA",abstract:"\u585E\u96F7\u5A05\u517C\u5177\u79D1\u7814\u80CC\u666F\u4E0E\u5F02\u5E38\u4E8B\u4EF6\u5904\u7F6E\u80FD\u529B\uFF0C\u66FE\u62C5\u4EFB\u83B1\u8335\u751F\u547D\u9632\u536B\u79D1\u4E3B\u4EFB\u3002\u5979\u7684\u7ECF\u5386\u63D0\u793A\uFF0C\u5B9E\u9A8C\u5B89\u5168\u4E0D\u80FD\u53EA\u88AB\u7406\u89E3\u4E3A\u95E8\u7981\u4E0E\u88C5\u5907\uFF1A\u5F53\u9879\u76EE\u76EE\u6807\u4E0E\u5177\u4F53\u751F\u547D\u53D1\u751F\u51B2\u7A81\u65F6\uFF0C\u5FC5\u987B\u6709\u4EBA\u62E5\u6709\u53EB\u505C\u7814\u7A76\u5E76\u4FDD\u62A4\u73B0\u573A\u4EBA\u5458\u7684\u80FD\u529B\u3002",findings:["\u4E8B\u524D\u51C6\u5907\u5E94\u5305\u542B\u64A4\u79BB\u8DEF\u5F84\u3001\u8054\u7EDC\u5173\u7CFB\u4E0E\u4E2D\u6B62\u6761\u4EF6\u3002","\u5F02\u5E38\u8BB0\u5F55\u9700\u8981\u8BF4\u660E\u5F71\u54CD\u5230\u8C01\uFF0C\u800C\u4E0D\u53EA\u662F\u635F\u574F\u4E86\u54EA\u4E9B\u8BBE\u5907\u3002","\u5B89\u4FDD\u4E0E\u79D1\u7814\u4EBA\u5458\u5E94\u5171\u4EAB\u5FC5\u8981\u4FE1\u606F\uFF0C\u907F\u514D\u98CE\u9669\u88AB\u79D1\u5C5E\u8FB9\u754C\u9694\u65AD\u3002"],source:"https://prts.wiki/w/\u585E\u96F7\u5A05"},{id:"X-007",title:"\u7CBE\u5BC6\u4EEA\u5668\u6821\u51C6",en:"INSTRUMENT CALIBRATION",department:"\u5DE5\u7A0B\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Mayer",clearance:"REFERENCE AREA",abstract:"\u6885\u5C14\u66FE\u4E3A\u8D6B\u9ED8\u53C2\u4E0E\u7684\u9879\u76EE\u7B79\u5907\u548C\u8C03\u8BD5\u5B9E\u9A8C\u88C5\u7F6E\uFF0C\u4E5F\u5728\u9C81\u7279\u62C9\u5DE5\u4F5C\u5BA4\u6301\u7EED\u8FDB\u884C\u673A\u68B0\u8BBE\u8BA1\u3002\u4EEA\u5668\u628A\u7814\u7A76\u8005\u7684\u60F3\u6CD5\u53D8\u6210\u53EF\u6D4B\u91CF\u7684\u4FE1\u53F7\uFF1B\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D\u7684\u504F\u5DEE\uFF0C\u53EF\u80FD\u88AB\u4E4B\u540E\u7684\u6BCF\u4E00\u6B65\u8BA1\u7B97\u653E\u5927\u3002",findings:["\u4FDD\u7559\u6D4B\u91CF\u57FA\u51C6\u3001\u8BBE\u5907\u72B6\u6001\u4E0E\u539F\u59CB\u8BFB\u6570\u4E4B\u95F4\u7684\u5BF9\u5E94\u5173\u7CFB\u3002","\u8BBE\u5907\u79FB\u4EA4\u65F6\uFF0C\u89E3\u91CA\u9002\u7528\u6761\u4EF6\u4E0E\u7EF4\u62A4\u65B9\u5F0F\u540C\u6837\u5FC5\u8981\u3002","\u8C03\u8BD5\u4EBA\u5458\u638C\u63E1\u7684\u5C40\u90E8\u7ECF\u9A8C\uFF0C\u5E94\u6210\u4E3A\u9879\u76EE\u8BB0\u5F55\u7684\u4E00\u90E8\u5206\u3002"],source:"https://prts.wiki/w/\u6885\u5C14"},{id:"X-008",title:"\u8FB9\u754C\u4E4B\u5916",en:"BEYOND THE HORIZON",department:"\u603B\u8F96\u6784\u4EF6\u79D1",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright",clearance:"REFERENCE AREA",abstract:"\u514B\u4E3D\u65AF\u817E\u628A\u7814\u7A76\u7684\u65B9\u5411\u6307\u5411\u6CF0\u62C9\u5929\u7A7A\u4E4B\u5916\u3002\u300A\u5B64\u661F\u300B\u4E2D\u7684\u63A2\u7D22\uFF0C\u5C06\u5173\u4E8E\u5929\u7A7A\u7684\u7591\u95EE\u53D8\u6210\u4E86\u7275\u52A8\u6574\u5EA7\u7279\u91CC\u8499\u7684\u4E8B\u4EF6\u3002\u672C\u5377\u6536\u5F55\u8FD9\u4E00\u4E3B\u9898\u7684\u89C2\u5BDF\u7EBF\u7D22\uFF0C\u4E5F\u4FDD\u7559\u7406\u60F3\u3001\u9690\u7792\u4E0E\u4EE3\u4EF7\u4E4B\u95F4\u96BE\u4EE5\u6D88\u89E3\u7684\u5F20\u529B\u3002",findings:["\u5C06\u5BF9\u672A\u77E5\u7684\u8FFD\u6C42\u4E0E\u5177\u4F53\u9879\u76EE\u7684\u6267\u884C\u65B9\u5F0F\u5206\u522B\u5BA1\u89C6\u3002","\u4ECE\u53C2\u4E0E\u8005\u80FD\u591F\u770B\u5230\u7684\u4FE1\u606F\u51FA\u53D1\uFF0C\u6BD4\u8F83\u4ED6\u4EEC\u5BF9\u540C\u4E00\u4E8B\u4EF6\u7684\u5224\u65AD\u3002","\u7A81\u7834\u8FB9\u754C\u4E4B\u540E\uFF0C\u7559\u4E0B\u7684\u4EBA\u4ECD\u9700\u8981\u9762\u5BF9\u5730\u9762\u4E0A\u7684\u540E\u679C\u3002"],source:"https://arknights.wiki.gg/wiki/Lone_Trail"},{id:"X-009",title:"\u6750\u6599\u8BB0\u5FC6",en:"MATERIAL MEMORY",department:"\u5DE5\u7A0B\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Engineering Section",clearance:"REFERENCE AREA",abstract:"\u52A8\u529B\u88C5\u7532\u628A\u6750\u6599\u3001\u52A8\u529B\u4E0E\u63A7\u5236\u7CFB\u7EDF\u538B\u7F29\u5728\u6709\u9650\u7A7A\u95F4\u91CC\u3002\u83B1\u8335\u751F\u547D\u7684 R \u7CFB\u5217\u8BBE\u5907\u4E3A\u89C2\u5BDF\u8FD9\u4E9B\u7EA6\u675F\u63D0\u4F9B\u4E86\u5165\u53E3\u3002\u672C\u5377\u5C06\u53CD\u590D\u53D7\u529B\u540E\u7684\u6750\u6599\u53D8\u5316\u4F5C\u4E3A\u7814\u7A76\u4E3B\u9898\uFF0C\u5173\u6CE8\u88C5\u7F6E\u770B\u4F3C\u6062\u590D\u6B63\u5E38\u65F6\uFF0C\u5185\u90E8\u662F\u5426\u4ECD\u4FDD\u7559\u7740\u4E0A\u4E00\u6B21\u4F7F\u7528\u7684\u75D5\u8FF9\u3002",findings:["\u628A\u5916\u89C2\u5B8C\u597D\u4E0E\u5185\u90E8\u72B6\u6001\u5206\u5F00\u8BB0\u5F55\uFF0C\u907F\u514D\u53EA\u4F9D\u8D56\u76EE\u89C6\u5224\u65AD\u3002","\u6BD4\u8F83\u53EF\u66F4\u6362\u90E8\u4EF6\u4E0E\u6574\u4F53\u627F\u8F7D\u90E8\u4EF6\u7684\u7EF4\u62A4\u9700\u6C42\u3002","\u75B2\u52B3\u3001\u78E8\u635F\u548C\u91CD\u590D\u88C5\u914D\u5E94\u8FDB\u5165\u540C\u4E00\u4EFD\u8BBE\u5907\u5C65\u5386\u3002"],source:"https://prts.wiki/w/R-31\u91CD\u578B\u52A8\u529B\u88C5\u7532"},{id:"X-010",title:"\u89C2\u6D4B\u8005\u65E5\u5FD7",en:"OBSERVER\u2019S JOURNAL",department:"\u79D1\u8003\u79D1",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Magallan",clearance:"REFERENCE AREA",abstract:"\u9EA6\u54F2\u4F26\u957F\u671F\u5728\u504F\u8FDC\u5730\u533A\u5F00\u5C55\u63A2\u7D22\uFF0C\u51B0\u539F\u662F\u5979\u53CD\u590D\u524D\u5F80\u7684\u7814\u7A76\u573A\u6240\u3002\u4E00\u6B21\u5916\u52E4\u5E26\u56DE\u7684\u53EF\u80FD\u53EA\u662F\u4E00\u6BB5\u5F71\u50CF\u6216\u4E00\u4EF6\u6807\u672C\uFF0C\u5374\u80FD\u4E3A\u4E0B\u4E00\u4F4D\u7814\u7A76\u8005\u51CF\u5C11\u4E00\u5904\u76F2\u533A\u3002\u672C\u5377\u5173\u6CE8\u73B0\u573A\u8BB0\u5F55\u5982\u4F55\u9010\u6E10\u7D2F\u79EF\u6210\u53EF\u4F20\u9012\u7684\u77E5\u8BC6\u3002",findings:["\u4FDD\u7559\u8DEF\u7EBF\u3001\u5929\u6C14\u4E0E\u89C2\u5BDF\u4F4D\u7F6E\uFF0C\u8BF4\u660E\u8D44\u6599\u53D6\u5F97\u65F6\u7684\u5B9E\u9645\u6761\u4EF6\u3002","\u628A\u5C1A\u672A\u89E3\u91CA\u7684\u73B0\u8C61\u5217\u4E3A\u95EE\u9898\uFF0C\u7559\u5F85\u540E\u7EED\u89C2\u6D4B\u6BD4\u8F83\u3002","\u5F52\u6863\u4E0D\u4EC5\u4FDD\u5B58\u6210\u529F\u53D1\u73B0\uFF0C\u4E5F\u4FDD\u5B58\u8D70\u9519\u7684\u8DEF\u4E0E\u672A\u5B8C\u6210\u7684\u8C03\u67E5\u3002"],source:"https://prts.wiki/w/Magallan"},{id:"X-011",title:"\u4FE1\u53F7\u4E0E\u566A\u58F0",en:"SIGNAL & NOISE",department:"\u6570\u636E\u8D44\u6599\u7EC4",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ptilopsis",clearance:"REFERENCE AREA",abstract:"\u767D\u9762\u9E2E\u66FE\u662F\u83B1\u8335\u751F\u547D\u7684\u6570\u636E\u7EF4\u62A4\u4EBA\u5458\uFF0C\u5728\u7F57\u5FB7\u5C9B\u7EE7\u7EED\u534F\u52A9\u533B\u7597\u8BB0\u5F55\u4E0E\u4FE1\u606F\u6574\u7406\u3002\u53EF\u88AB\u68C0\u7D22\u7684\u6570\u636E\u5E76\u4E0D\u81EA\u52A8\u7B49\u4E8E\u53EF\u9760\u7684\u77E5\u8BC6\u3002\u672C\u5377\u8BA8\u8BBA\u8BB0\u5F55\u3001\u7B5B\u9009\u4E0E\u89E3\u91CA\u4E4B\u95F4\u7684\u8FB9\u754C\uFF0C\u5C24\u5176\u5173\u6CE8\u5F02\u5E38\u4FE1\u53F7\u88AB\u5F53\u4F5C\u566A\u58F0\u4E22\u5F03\u7684\u53EF\u80FD\u3002",findings:["\u4FDD\u7559\u539F\u59CB\u8BB0\u5F55\u4E0E\u5904\u7406\u7ED3\u679C\uFF0C\u4FBF\u4E8E\u91CD\u65B0\u5BA1\u89C6\u7B5B\u9009\u6761\u4EF6\u3002","\u6570\u636E\u7F3A\u5931\u548C\u5F02\u5E38\u90FD\u5E94\u660E\u786E\u6807\u6CE8\uFF0C\u4E0D\u80FD\u88AB\u9ED8\u8BA4\u586B\u8865\u3002","\u68C0\u7D22\u7ED3\u8BBA\u9700\u8981\u56DE\u5230\u8BB0\u5F55\u53D1\u751F\u7684\u60C5\u5883\u4E2D\u89E3\u91CA\u3002"],source:"https://prts.wiki/w/\u767D\u9762\u9E2E"},{id:"X-012",title:"\u660E\u65E5\u7684\u5750\u6807",en:"COORDINATES OF TOMORROW",department:"\u603B\u8F96\u6784\u4EF6\u79D1",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Silence / Saria",clearance:"REFERENCE AREA",abstract:"\u91CD\u5927\u4E8B\u4EF6\u4E4B\u540E\uFF0C\u83B1\u8335\u751F\u547D\u4ECD\u9700\u8981\u51B3\u5B9A\u4E0B\u4E00\u9879\u7814\u7A76\u8981\u5F80\u54EA\u91CC\u53BB\u3002\u8D6B\u9ED8\u63A8\u52A8\u7684\u79D1\u5B66\u4F26\u7406\u8BA8\u8BBA\uFF0C\u4E3A\u8FD9\u79CD\u51B3\u5B9A\u589E\u52A0\u4E86\u65B0\u7684\u5C3A\u5EA6\u3002\u672C\u5377\u4E0D\u628A\u672A\u6765\u5199\u6210\u5DF2\u7ECF\u5B8C\u6210\u7684\u7B54\u6848\uFF0C\u800C\u628A\u7814\u7A76\u81EA\u7531\u3001\u8D23\u4EFB\u548C\u5408\u4F5C\u89C6\u4E3A\u9700\u8981\u6301\u7EED\u534F\u5546\u7684\u95EE\u9898\u3002",findings:["\u6BD4\u8F83\u6280\u672F\u76EE\u6807\u4E0E\u5176\u5E0C\u671B\u6539\u5584\u7684\u5177\u4F53\u751F\u6D3B\u4E4B\u95F4\u7684\u8DDD\u79BB\u3002","\u4E3A\u4E0D\u540C\u7ACB\u573A\u7559\u4E0B\u8BA8\u8BBA\u7684\u4F4D\u7F6E\uFF0C\u8BB0\u5F55\u5C1A\u672A\u8FBE\u6210\u7684\u5171\u8BC6\u3002","\u9879\u76EE\u7ED3\u675F\u4E4B\u540E\uFF0C\u4ECD\u5E94\u8FFD\u8E2A\u5176\u5BF9\u4EBA\u5458\u4E0E\u73AF\u5883\u7684\u957F\u671F\u5F71\u54CD\u3002"],source:"https://prts.wiki/w/\u6DEC\u7FBD\u8D6B\u9ED8"},{id:"X-013",title:"\u5171\u540C\u7684\u8D77\u70B9",en:"A SHARED BEGINNING",department:"\u673A\u6784\u6CBF\u9769\u7EC4",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright / Saria",clearance:"REFERENCE AREA",abstract:"\u516C\u5F00\u7684\u83B1\u8335\u751F\u547D\u8C03\u67E5\u8D44\u6599\u5C06\u65E9\u671F\u7814\u7A76\u5BA4\u8FFD\u6EAF\u81F3\u514B\u4E3D\u65AF\u817E\u4E0E\u585E\u96F7\u5A05\u7684\u5408\u4F5C\u3002\u4E24\u4F4D\u521B\u59CB\u4EBA\u62E5\u6709\u76F8\u4EA4\u7684\u5FD7\u5411\uFF0C\u4E5F\u9010\u6E10\u5F62\u6210\u4E0D\u540C\u7684\u5224\u65AD\u3002\u672C\u5377\u628A\u673A\u6784\u7684\u8D77\u70B9\u4E0E\u540E\u6765\u7684\u9009\u62E9\u5E76\u7F6E\uFF0C\u89C2\u5BDF\u5171\u540C\u7684\u7406\u60F3\u5982\u4F55\u627F\u53D7\u73B0\u5B9E\u538B\u529B\u3002",findings:["\u4EE5\u7814\u7A76\u5BA4\u4E0E\u516C\u53F8\u5316\u7EC4\u7EC7\u4E24\u4E2A\u9636\u6BB5\u68B3\u7406\u673A\u6784\u53D1\u5C55\u3002","\u533A\u5206\u4E8B\u540E\u56DE\u987E\u4E0E\u5F53\u65F6\u80FD\u591F\u638C\u63E1\u7684\u4FE1\u606F\u3002","\u5171\u540C\u521B\u7ACB\u673A\u6784\uFF0C\u5E76\u4E0D\u610F\u5473\u7740\u4E4B\u540E\u5BF9\u6BCF\u4E00\u9879\u7814\u7A76\u90FD\u4F1A\u8FBE\u6210\u4E00\u81F4\u3002"],source:"https://arknights.wiki.gg/wiki/Rhine_Lab_Research_Report"},{id:"X-014",title:"\u79D1\u5C5E\u4E4B\u95F4",en:"BETWEEN SECTIONS",department:"\u603B\u8F96\u6784\u4EF6\u79D1",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Rhine Lab",clearance:"REFERENCE AREA",abstract:"\u83B1\u8335\u751F\u547D\u7684\u5DE5\u4F5C\u901A\u8FC7\u591A\u4E2A\u79D1\u5C5E\u5C55\u5F00\uFF1A\u7814\u7A76\u3001\u8BBE\u5907\u3001\u4EBA\u5458\u548C\u9632\u536B\u5F7C\u6B64\u4F9D\u8D56\u3002\u8D6B\u9ED8\u540E\u6765\u7684\u5C97\u4F4D\u53D8\u5316\uFF0C\u4E5F\u4F53\u73B0\u4E86\u79D1\u7814\u51B3\u7B56\u4E0E\u7EC4\u7EC7\u8D23\u4EFB\u4E4B\u95F4\u7684\u8054\u7CFB\u3002\u672C\u5377\u4EE5\u79D1\u5C5E\u534F\u4F5C\u4E3A\u7EBF\u7D22\uFF0C\u6574\u7406\u4FE1\u606F\u5728\u673A\u6784\u5185\u90E8\u5982\u4F55\u4F20\u9012\uFF0C\u53C8\u53EF\u80FD\u5728\u54EA\u91CC\u4E2D\u65AD\u3002",findings:["\u533A\u5206\u6B63\u5F0F\u804C\u8D23\u4E0E\u91CD\u5927\u9879\u76EE\u4E2D\u4E34\u65F6\u5F62\u6210\u7684\u5408\u4F5C\u5173\u7CFB\u3002","\u4EA4\u63A5\u8BB0\u5F55\u5E94\u8BF4\u660E\u5C1A\u672A\u89E3\u51B3\u7684\u95EE\u9898\uFF0C\u800C\u4E0D\u53EA\u662F\u5DF2\u5B8C\u6210\u7684\u5DE5\u4F5C\u3002","\u5728\u9879\u76EE\u8DE8\u8D8A\u79D1\u5C5E\u65F6\uFF0C\u660E\u786E\u8C01\u80FD\u591F\u63D0\u51FA\u5F02\u8BAE\u4E0E\u8FFD\u95EE\u3002"],source:"https://prts.wiki/w/\u6DEC\u7FBD\u8D6B\u9ED8"},{id:"X-015",title:"\u7279\u91CC\u8499\u7684\u65E5\u5E38",en:"LIFE IN TRIMOUNTS",department:"\u5730\u533A\u8D44\u6599\u7EC4",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Muelsyse",clearance:"REFERENCE AREA",abstract:"\u7279\u91CC\u8499\u4E0D\u4EC5\u662F\u79D1\u7814\u4E8B\u4EF6\u53D1\u751F\u7684\u5730\u70B9\uFF0C\u4E5F\u662F\u7814\u7A76\u8005\u5DE5\u4F5C\u3001\u793E\u4EA4\u4E0E\u751F\u6D3B\u7684\u57CE\u5E02\u3002\u7F2A\u5C14\u8D5B\u601D\u7684\u6863\u6848\u5C55\u793A\u4E86\u5B9E\u9A8C\u5BA4\u4E4B\u5916\u7684\u5174\u8DA3\u4E0E\u57CE\u5E02\u7ECF\u9A8C\u3002\u672C\u5377\u4ECE\u8FD9\u4E9B\u65E5\u5E38\u7247\u6BB5\u89C2\u5BDF\u4E00\u5EA7\u79D1\u5B66\u90FD\u5E02\uFF1A\u5B8F\u5927\u7684\u7814\u7A76\u8BA1\u5212\u59CB\u7EC8\u7531\u5177\u4F53\u7684\u4EBA\u53C2\u4E0E\u3002",findings:["\u628A\u751F\u6D3B\u7A7A\u95F4\u4E0E\u7814\u7A76\u7A7A\u95F4\u4E00\u5E76\u7EB3\u5165\u4EBA\u7269\u80CC\u666F\u3002","\u4E0D\u540C\u8EAB\u4EFD\u7684\u4EBA\uFF0C\u5BF9\u540C\u4E00\u5EA7\u57CE\u5E02\u4F1A\u6709\u4E0D\u540C\u7684\u8DEF\u7EBF\u4E0E\u8BB0\u5FC6\u3002","\u4FDD\u7559\u65E5\u5E38\u7EC6\u8282\uFF0C\u907F\u514D\u4EBA\u7269\u53EA\u5269\u4E0B\u804C\u52A1\u4E0E\u6210\u679C\u3002"],source:"https://prts.wiki/w/\u7F2A\u5C14\u8D5B\u601D"},{id:"X-016",title:"\u57FA\u91D1\u4F1A\u4E0E\u7814\u7A76\u5BA4",en:"PATRONS & RESEARCH",department:"\u673A\u6784\u6CBF\u9769\u7EC4",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Maylander Foundation",clearance:"REFERENCE AREA",abstract:"\u83B1\u8335\u751F\u547D\u7684\u53D1\u5C55\u4E0E\u5916\u90E8\u652F\u6301\u8005\u5E76\u975E\u5F7C\u6B64\u72EC\u7ACB\u3002\u8C03\u67E5\u8D44\u6599\u63D0\u53CA\u6885\u5170\u5FB7\u57FA\u91D1\u4F1A\u7B49\u529B\u91CF\u4E0E\u673A\u6784\u65E9\u671F\u6210\u957F\u7684\u8054\u7CFB\u3002\u672C\u5377\u5173\u6CE8\u8D44\u6E90\u652F\u6301\u5982\u4F55\u4F7F\u7814\u7A76\u6210\u4E3A\u53EF\u80FD\uFF0C\u4E5F\u5173\u6CE8\u63A5\u53D7\u8D44\u6E90\u4E4B\u540E\uFF0C\u7814\u7A76\u76EE\u6807\u4E0E\u51B3\u7B56\u7A7A\u95F4\u53EF\u80FD\u53D1\u751F\u7684\u53D8\u5316\u3002",findings:["\u628A\u8D44\u91D1\u3001\u8BBE\u5907\u4E0E\u4EBA\u5458\u652F\u6301\u653E\u5728\u540C\u4E00\u5F20\u9879\u76EE\u5173\u7CFB\u56FE\u4E2D\u3002","\u8BB0\u5F55\u5408\u4F5C\u6761\u4EF6\u4E0E\u7814\u7A76\u76EE\u6807\u4E4B\u95F4\u53EF\u80FD\u5B58\u5728\u7684\u5F20\u529B\u3002","\u5BF9\u6210\u679C\u7528\u9014\u7684\u8BA8\u8BBA\uFF0C\u5E94\u65E9\u4E8E\u6210\u679C\u6B63\u5F0F\u4EA4\u4ED8\u3002"],source:"https://arknights.wiki.gg/wiki/Rhine_Lab_Research_Report"},{id:"X-017",title:"\u5408\u4F5C\u7684\u63A5\u53E3",en:"POINTS OF CONTACT",department:"\u5408\u4F5C\u4E8B\u52A1\u7EC4",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Dorothy / Rhodes Island",clearance:"REFERENCE AREA",abstract:"\u591A\u841D\u897F\u4EE5\u83B1\u8335\u751F\u547D\u4E0E\u7F57\u5FB7\u5C9B\u5408\u4F5C\u9879\u76EE\u8D1F\u8D23\u4EBA\u7684\u8EAB\u4EFD\u52A0\u5165\u5408\u4F5C\u3002\u673A\u6784\u4E4B\u95F4\u7684\u8054\u7CFB\u7531\u6B64\u843D\u5B9E\u4E3A\u5177\u4F53\u4EBA\u5458\u3001\u8D44\u6599\u548C\u7814\u7A76\u4EFB\u52A1\u3002\u672C\u5377\u5173\u6CE8\u5408\u4F5C\u5982\u4F55\u5EFA\u7ACB\u4FE1\u4EFB\uFF0C\u4E5F\u5173\u6CE8\u53CC\u65B9\u4FDD\u6709\u4E0D\u540C\u7ACB\u573A\u65F6\uFF0C\u600E\u6837\u7EE7\u7EED\u8FDB\u884C\u6709\u9650\u800C\u660E\u786E\u7684\u534F\u4F5C\u3002",findings:["\u628A\u5171\u540C\u7814\u7A76\u8303\u56F4\u4E0E\u5404\u81EA\u627F\u62C5\u7684\u8D23\u4EFB\u5199\u6E05\u695A\u3002","\u4EBA\u5458\u6D3E\u9A7B\u63D0\u4F9B\u6C9F\u901A\u6E20\u9053\uFF0C\u4F46\u4E0D\u4EE3\u8868\u673A\u6784\u7ACB\u573A\u5B8C\u5168\u4E00\u81F4\u3002","\u5408\u4F5C\u5173\u7CFB\u5E94\u5141\u8BB8\u95EE\u9898\u88AB\u63D0\u51FA\uFF0C\u800C\u4E0D\u53EA\u5C55\u793A\u5DF2\u7ECF\u8FBE\u6210\u7684\u6210\u679C\u3002"],source:"https://prts.wiki/w/\u591A\u841D\u897F"},{id:"X-018",title:"\u79D1\u5B66\u4E0E\u4EBA\u7684\u4F4D\u7F6E",en:"SCIENCE & ITS PEOPLE",department:"\u603B\u8F96\u6784\u4EF6\u79D1",category:"\u673A\u6784\u6863\u6848",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Silence",clearance:"REFERENCE AREA",abstract:"\u8D6B\u9ED8\u53D1\u8D77\u300A\u7279\u91CC\u8499\u79D1\u5B66\u4F26\u7406\u8054\u5408\u5BA3\u8A00\u300B\uFF0C\u5E76\u53C2\u4E0E\u76F8\u5173\u4F26\u7406\u4E8B\u52A1\u3002\u5979\u628A\u5728\u5B9E\u9A8C\u5BA4\u548C\u4E34\u5E8A\u4E2D\u9762\u5BF9\u7684\u95EE\u9898\u5E26\u5230\u4E86\u66F4\u5E7F\u6CDB\u7684\u8BA8\u8BBA\u4E2D\u3002\u672C\u5377\u56F4\u7ED5\u4E00\u4E2A\u6301\u7EED\u5B58\u5728\u7684\u96BE\u9898\u5C55\u5F00\uFF1A\u79D1\u5B66\u5411\u524D\u63A8\u8FDB\u65F6\uFF0C\u5177\u4F53\u7684\u4EBA\u5982\u4F55\u4FDD\u6709\u88AB\u503E\u542C\u7684\u4F4D\u7F6E\u3002",findings:["\u8BA8\u8BBA\u7814\u7A76\u5BF9\u8C61\u7684\u5904\u5883\uFF0C\u4E0D\u80FD\u53EA\u8BA8\u8BBA\u7814\u7A76\u80FD\u591F\u5E26\u6765\u4EC0\u4E48\u3002","\u628A\u540C\u610F\u3001\u5F02\u8BAE\u4E0E\u4E2D\u6B62\u4F5C\u4E3A\u6301\u7EED\u8FC7\u7A0B\u8BB0\u5F55\u3002","\u89C4\u8303\u9700\u8981\u5728\u5177\u4F53\u6848\u4F8B\u4E2D\u53CD\u590D\u68C0\u9A8C\uFF0C\u800C\u975E\u5199\u5B9A\u4E4B\u540E\u4FBF\u4E0D\u518D\u8FFD\u95EE\u3002"],source:"https://prts.wiki/w/\u6DEC\u7FBD\u8D6B\u9ED8"},{id:"X-019",title:"\u54AA\u6CE2\u7684\u5DE5\u4F5C\u53F0",en:"MEEBOO WORKBENCH",department:"\u9C81\u7279\u62C9\u5DE5\u4F5C\u5BA4",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Mayer",clearance:"REFERENCE AREA",abstract:"\u54AA\u6CE2\u662F\u6885\u5C14\u8BBE\u8BA1\u548C\u64CD\u63A7\u7684\u673A\u68B0\u88C5\u7F6E\uFF0C\u4E5F\u662F\u5979\u503E\u6CE8\u611F\u60C5\u7684\u4F5C\u54C1\u3002\u4ECE\u5DE5\u5177\u5230\u4F19\u4F34\u7684\u8DDD\u79BB\uFF0C\u5728\u7EF4\u4FEE\u3001\u547D\u540D\u4E0E\u4FDD\u7559\u65E7\u90E8\u4EF6\u8FD9\u4E9B\u52A8\u4F5C\u4E2D\u9010\u6E10\u7F29\u77ED\u3002\u672C\u5377\u4EE5\u5DE5\u4F5C\u53F0\u4E3A\u89C2\u5BDF\u4F4D\u7F6E\uFF0C\u8BA8\u8BBA\u521B\u9020\u8005\u5982\u4F55\u7406\u89E3\u81EA\u5DF1\u5236\u9020\u7684\u673A\u5668\u3002",findings:["\u8BB0\u5F55\u8BBE\u8BA1\u8FED\u4EE3\u65F6\u4FDD\u7559\u4E0B\u6765\u7684\u90E8\u4EF6\u548C\u7ECF\u9A8C\u3002","\u628A\u64CD\u4F5C\u8005\u7684\u719F\u6089\u7A0B\u5EA6\u7EB3\u5165\u8BBE\u5907\u4F7F\u7528\u6761\u4EF6\u3002","\u7EF4\u4FEE\u8BB0\u5F55\u540C\u65F6\u4E5F\u662F\u4E00\u4EF6\u4F5C\u54C1\u9010\u6E10\u6210\u5F62\u7684\u5386\u53F2\u3002"],source:"https://prts.wiki/w/\u6885\u5C14"},{id:"X-020",title:"\u9F99\u817E\u5F0F\u652F\u63F4\u65E0\u4EBA\u673A",en:"SOARING DRAGON",department:"\u79D1\u7814\u8BBE\u5907\u7814\u53D1\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Magallan",clearance:"REFERENCE AREA",abstract:"\u9EA6\u54F2\u4F26\u4F7F\u7528\u7684\u9F99\u817E\u5F0F\u652F\u63F4\u65E0\u4EBA\u673A\u91C7\u7528\u6A21\u5757\u5316\u8BBE\u8BA1\uFF0C\u80FD\u591F\u9002\u5E94\u4E0D\u540C\u4EFB\u52A1\u3002\u6D4B\u7ED8\u4E0E\u652F\u63F4\u9700\u6C42\u5728\u540C\u4E00\u5957\u8BBE\u5907\u4E0A\u76F8\u9047\u3002\u672C\u5377\u5173\u6CE8\u6A21\u5757\u5316\u5E26\u6765\u7684\u7075\u6D3B\u6027\uFF0C\u4EE5\u53CA\u5207\u6362\u7528\u9014\u65F6\u5FC5\u987B\u91CD\u65B0\u786E\u8BA4\u7684\u73AF\u5883\u4E0E\u64CD\u4F5C\u6761\u4EF6\u3002",findings:["\u5C06\u4EFB\u52A1\u9700\u6C42\u4E0E\u6A21\u5757\u9009\u62E9\u5BF9\u5E94\uFF0C\u4FDD\u7559\u5207\u6362\u7406\u7531\u3002","\u8BBE\u5907\u80FD\u529B\u5FC5\u987B\u7ED3\u5408\u5730\u5F62\u3001\u7EED\u822A\u548C\u56DE\u6536\u6761\u4EF6\u5224\u65AD\u3002","\u540C\u4E00\u5E73\u53F0\u627F\u62C5\u591A\u79CD\u7528\u9014\u65F6\uFF0C\u5E94\u907F\u514D\u628A\u4E0D\u540C\u6A21\u5F0F\u7684\u8868\u73B0\u6DF7\u4E3A\u4E00\u8C08\u3002"],source:"https://prts.wiki/w/Magallan"},{id:"X-021",title:"R \u7CFB\u5217\u52A8\u529B\u88C5\u7532",en:"R-SERIES PLATFORM",department:"\u5DE5\u7A0B\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Engineering Section",clearance:"REFERENCE AREA",abstract:"R \u7CFB\u5217\u52A8\u529B\u88C5\u7532\u51FA\u73B0\u5728\u83B1\u8335\u751F\u547D\u76F8\u5173\u5B9E\u9A8C\u8BBE\u65BD\u4E2D\u3002\u5DE5\u7A0B\u8BBE\u5907\u4E0E\u6B66\u88C5\u7528\u9014\u5728\u8FD9\u91CC\u76F4\u63A5\u76F8\u63A5\u3002\u672C\u5377\u4ECE\u7EF4\u62A4\u4E0E\u4F7F\u7528\u6761\u4EF6\u5207\u5165\uFF0C\u89C2\u5BDF\u590D\u6742\u8BBE\u5907\u5982\u4F55\u4F9D\u8D56\u4EBA\u5458\u534F\u4F5C\uFF0C\u4E5F\u8FFD\u95EE\u7814\u53D1\u6210\u679C\u79BB\u5F00\u5DE5\u4F5C\u53F0\u4E4B\u540E\u6240\u83B7\u5F97\u7684\u65B0\u8EAB\u4EFD\u3002",findings:["\u533A\u5206\u8BBE\u5907\u5F85\u673A\u3001\u7EF4\u62A4\u4E0E\u6295\u5165\u4F7F\u7528\u65F6\u7684\u4E0D\u540C\u72B6\u6001\u3002","\u5C06\u64CD\u4F5C\u8005\u3001\u7EF4\u4FEE\u4EBA\u5458\u548C\u88C5\u7F6E\u4F5C\u4E3A\u5173\u8054\u7684\u7CFB\u7EDF\u89C2\u5BDF\u3002","\u8BB0\u5F55\u7528\u9014\u53D8\u5316\uFF0C\u907F\u514D\u7528\u6700\u521D\u7684\u7814\u53D1\u76EE\u6807\u89E3\u91CA\u6240\u6709\u540E\u7EED\u884C\u4E3A\u3002"],source:"https://prts.wiki/w/R-31\u91CD\u578B\u52A8\u529B\u88C5\u7532"},{id:"X-022",title:"\u503E\u659C\u7684\u5B9E\u9A8C\u5BA4",en:"A SHIFTING LABORATORY",department:"\u5DE5\u7A0B\u79D1",category:"\u5DE5\u7A0B\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Trimounts Laboratory",clearance:"REFERENCE AREA",abstract:"\u300A\u5B64\u661F\u300B\u4E2D\u7684\u5B9E\u9A8C\u5BA4\u5177\u6709\u4F1A\u5F71\u54CD\u884C\u52A8\u7684\u91CD\u529B\u73AF\u5883\uFF0C\u673A\u5173\u4E0E\u53EF\u79FB\u52A8\u7269\u4F53\u5171\u540C\u6539\u53D8\u7A7A\u95F4\u7684\u4F7F\u7528\u65B9\u5F0F\u3002\u672C\u5377\u628A\u8FD9\u7C7B\u573A\u666F\u4F5C\u4E3A\u8BBE\u65BD\u7814\u7A76\u4E3B\u9898\uFF1A\u5F53\u5730\u9762\u4E0D\u518D\u662F\u7A33\u5B9A\u53C2\u7167\u65F6\uFF0C\u8DEF\u5F84\u3001\u56FA\u5B9A\u65B9\u5F0F\u548C\u64CD\u4F5C\u4E60\u60EF\u90FD\u9700\u8981\u91CD\u65B0\u8003\u8651\u3002",findings:["\u8BB0\u5F55\u73AF\u5883\u5207\u6362\u524D\u540E\uFF0C\u4EBA\u5458\u4E0E\u8BBE\u5907\u80FD\u591F\u5B89\u5168\u505C\u7559\u7684\u4F4D\u7F6E\u3002","\u628A\u79FB\u52A8\u7269\u4F53\u7684\u8DEF\u5F84\u7EB3\u5165\u901A\u884C\u4E0E\u89C2\u5BDF\u5B89\u6392\u3002","\u540C\u4E00\u7A7A\u95F4\u5728\u4E0D\u540C\u72B6\u6001\u4E0B\uFF0C\u5E94\u62E5\u6709\u6E05\u695A\u53EF\u8FA8\u7684\u4F7F\u7528\u6761\u4EF6\u3002"],source:"https://prts.wiki/w/\u5B64\u661F2024"},{id:"X-023",title:"\u4F0A\u8299\u5229\u7279\u7684\u6062\u590D",en:"IFRIT: RECOVERY",department:"\u533B\u7597\u534F\u4F5C\u7EC4",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ifrit / Silence",clearance:"REFERENCE AREA",abstract:"\u4F0A\u8299\u5229\u7279\u66FE\u662F\u83B1\u8335\u751F\u547D\u7684\u533B\u7597\u5BF9\u8C61\uFF0C\u4E4B\u540E\u5728\u7F57\u5FB7\u5C9B\u7531\u8D6B\u9ED8\u7167\u62A4\u3002\u5979\u7684\u6545\u4E8B\u4E0D\u5E94\u505C\u7559\u5728\u5F02\u5E38\u80FD\u529B\u6216\u5B9E\u9A8C\u7ECF\u5386\u4E0A\u3002\u672C\u5377\u628A\u6062\u590D\u3001\u5B66\u4E60\u4E0E\u65E5\u5E38\u5173\u7CFB\u653E\u5230\u8BB0\u5F55\u4E2D\u5FC3\uFF0C\u5173\u6CE8\u5979\u5982\u4F55\u9010\u6E10\u7406\u89E3\u81EA\u5DF1\u7684\u529B\u91CF\uFF0C\u5E76\u5EFA\u7ACB\u81EA\u5DF1\u7684\u751F\u6D3B\u3002",findings:["\u5C06\u8EAB\u4F53\u72B6\u6001\u4E0E\u65E5\u5E38\u9002\u5E94\u5171\u540C\u8BB0\u5F55\uFF0C\u907F\u514D\u53EA\u8FFD\u8E2A\u80FD\u529B\u8868\u73B0\u3002","\u4FDD\u7559\u5F53\u4E8B\u4EBA\u7684\u8868\u8FBE\uFF0C\u4E0D\u8BA9\u65C1\u89C2\u8005\u7684\u63CF\u8FF0\u53D6\u4EE3\u5979\u7684\u58F0\u97F3\u3002","\u533A\u5206\u5386\u53F2\u4E8B\u4EF6\u9020\u6210\u7684\u5F71\u54CD\u4E0E\u6B63\u5728\u53D1\u751F\u7684\u6539\u53D8\u3002"],source:"https://prts.wiki/w/Ifrit"},{id:"X-024",title:"\u767D\u9762\u9E2E\u7684\u8BB0\u5F55\u65B9\u5F0F",en:"PTILOPSIS: RECORDS",department:"\u533B\u7597\u6570\u636E\u7EC4",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ptilopsis",clearance:"REFERENCE AREA",abstract:"\u767D\u9762\u9E2E\u4EE5\u72EC\u7279\u7684\u8868\u8FBE\u65B9\u5F0F\u4EA4\u6D41\uFF0C\u4E5F\u7EE7\u7EED\u627F\u62C5\u533B\u7597\u4E0E\u8D44\u6599\u6574\u7406\u5DE5\u4F5C\u3002\u5979\u7684\u8BED\u8A00\u5F62\u5F0F\u5E76\u4E0D\u610F\u5473\u7740\u7F3A\u4E4F\u60C5\u611F\u3002\u672C\u5377\u5173\u6CE8\u4FE1\u606F\u8868\u8FBE\u4E0E\u4EBA\u7684\u7ECF\u9A8C\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C\u63D0\u9192\u8BFB\u8005\u5728\u7CBE\u786E\u7684\u8BB0\u5F55\u683C\u5F0F\u4E4B\u5916\uFF0C\u4ECD\u8981\u7406\u89E3\u6B63\u5728\u4E0E\u81EA\u5DF1\u4EA4\u6D41\u7684\u4E2A\u4F53\u3002",findings:["\u8BB0\u5F55\u4EA4\u6D41\u6240\u9700\u7684\u65F6\u95F4\u4E0E\u6761\u4EF6\uFF0C\u907F\u514D\u6025\u4E8E\u66FF\u5BF9\u65B9\u4F5C\u7B54\u3002","\u5C06\u8868\u8FBE\u5F62\u5F0F\u4E0E\u610F\u56FE\u5206\u5F00\u7406\u89E3\u3002","\u8D44\u6599\u7EF4\u62A4\u4E2D\u7684\u53EF\u9760\u6027\uFF0C\u6765\u81EA\u5BF9\u7EC6\u8282\u4E0E\u5177\u4F53\u9700\u6C42\u7684\u6301\u7EED\u5173\u6CE8\u3002"],source:"https://prts.wiki/w/\u767D\u9762\u9E2E"},{id:"X-025",title:"\u6CBB\u7597\u62B5\u8FBE\u4E4B\u524D",en:"CARE IN TRANSIT",department:"\u533B\u7597\u534F\u4F5C\u7EC4",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Silence",clearance:"REFERENCE AREA",abstract:"\u8D6B\u9ED8\u63D0\u51FA\u7684\u533B\u7597\u65E0\u4EBA\u673A\u4EE5\u63D0\u4F9B\u6CBB\u7597\u4E3A\u6838\u5FC3\u76EE\u7684\u3002\u5B83\u8BA9\u7167\u62A4\u80FD\u591F\u62B5\u8FBE\u4EBA\u5458\u96BE\u4EE5\u53CA\u65F6\u9760\u8FD1\u7684\u4F4D\u7F6E\uFF0C\u4E5F\u53D7\u5230\u73AF\u5883\u4E0E\u8BBE\u5907\u6761\u4EF6\u7684\u9650\u5236\u3002\u672C\u5377\u4ECE\u6CBB\u7597\u5982\u4F55\u88AB\u9001\u8FBE\u8FD9\u4E00\u95EE\u9898\u51FA\u53D1\uFF0C\u8BA8\u8BBA\u533B\u7597\u5DE5\u5177\u4E0E\u4E34\u5E8A\u5224\u65AD\u4E4B\u95F4\u7684\u914D\u5408\u3002",findings:["\u533A\u5206\u8BBE\u5907\u80FD\u591F\u62B5\u8FBE\u7684\u4F4D\u7F6E\u4E0E\u771F\u6B63\u80FD\u591F\u5B8C\u6210\u7684\u4EFB\u52A1\u3002","\u628A\u73B0\u573A\u6761\u4EF6\u3001\u54CD\u5E94\u65F6\u95F4\u4E0E\u540E\u7EED\u7167\u62A4\u8FDE\u7EED\u8BB0\u5F55\u3002","\u5DE5\u5177\u5EF6\u4F38\u533B\u751F\u7684\u80FD\u529B\uFF0C\u4E5F\u9700\u8981\u533B\u751F\u5224\u65AD\u4F55\u65F6\u4E0D\u80FD\u4F9D\u8D56\u5DE5\u5177\u3002"],source:"https://prts.wiki/w/\u8D6B\u9ED8"},{id:"X-026",title:"\u6E29\u5BA4\u4E0E\u6545\u4E61",en:"GREENHOUSE & HOME",department:"\u751F\u6001\u79D1",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Muelsyse",clearance:"REFERENCE AREA",abstract:"\u7F2A\u5C14\u8D5B\u601D\u7684\u7CBE\u7075\u8EAB\u4EFD\uFF0C\u8BA9\u73AF\u5883\u7814\u7A76\u4E0E\u5979\u81EA\u8EAB\u7684\u5904\u5883\u7D27\u5BC6\u76F8\u8FDE\u3002\u6E29\u5BA4\u65E2\u662F\u7814\u7A76\u573A\u6240\uFF0C\u4E5F\u627F\u8F7D\u7740\u5BF9\u9002\u5B9C\u751F\u6D3B\u7A7A\u95F4\u7684\u8FFD\u5BFB\u3002\u672C\u5377\u7531\u6B64\u8BA8\u8BBA\u4FDD\u5B58\u4E0E\u6539\u53D8\u4E4B\u95F4\u7684\u5173\u7CFB\uFF1A\u80FD\u591F\u88AB\u7EF4\u6301\u7684\u73AF\u5883\uFF0C\u600E\u6837\u624D\u80FD\u6210\u4E3A\u771F\u6B63\u53EF\u4EE5\u751F\u6D3B\u7684\u5730\u65B9\u3002",findings:["\u628A\u73AF\u5883\u9700\u6C42\u4E0E\u4E2A\u4EBA\u7ECF\u9A8C\u540C\u65F6\u7EB3\u5165\u89C2\u5BDF\u3002","\u533A\u5206\u4FDD\u5B58\u4E00\u4E2A\u6837\u672C\u4E0E\u5EF6\u7EED\u4E00\u79CD\u751F\u6D3B\u6240\u9700\u7684\u6761\u4EF6\u3002","\u7814\u7A76\u53EF\u4EE5\u89E3\u91CA\u73AF\u5883\u53D8\u5316\uFF0C\u5374\u4E0D\u80FD\u4EE3\u66FF\u5F53\u4E8B\u4EBA\u51B3\u5B9A\u5F52\u5C5E\u3002"],source:"https://prts.wiki/w/\u7F2A\u5C14\u8D5B\u601D"},{id:"X-027",title:"\u51B0\u539F\u4E2D\u7684\u751F\u547D\u7EBF",en:"LIFE ON THE ICEFIELD",department:"\u79D1\u8003\u79D1",category:"\u751F\u547D\u79D1\u5B66",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Magallan",clearance:"REFERENCE AREA",abstract:"\u9EA6\u54F2\u4F26\u7684\u51B0\u539F\u63A2\u7D22\u4E0D\u65AD\u628A\u8FDC\u65B9\u8D44\u6599\u5E26\u56DE\u7814\u7A76\u673A\u6784\u3002\u5728\u4EBA\u8FF9\u7A00\u5C11\u7684\u5730\u65B9\uFF0C\u6807\u672C\u3001\u5730\u8C8C\u4E0E\u73AF\u5883\u6761\u4EF6\u9700\u8981\u4E00\u8D77\u8BB0\u5F55\u3002\u672C\u5377\u5173\u6CE8\u5982\u4F55\u5728\u4FE1\u606F\u6709\u9650\u7684\u60C5\u51B5\u4E0B\u4FDD\u7559\u73B0\u573A\u7EC6\u8282\uFF0C\u4F7F\u540E\u7EED\u7814\u7A76\u4ECD\u80FD\u56DE\u5230\u89C2\u5BDF\u53D1\u751F\u7684\u5730\u70B9\u4E0E\u60C5\u5883\u3002",findings:["\u5C06\u6807\u672C\u4E0E\u53D6\u5F97\u5B83\u7684\u73AF\u5883\u7ED1\u5B9A\u7F16\u76EE\u3002","\u4E3A\u65E0\u6CD5\u91CD\u590D\u7684\u89C2\u5BDF\u4FDD\u7559\u5F71\u50CF\u3001\u8DEF\u7EBF\u548C\u63CF\u8FF0\u3002","\u5BF9\u672A\u77E5\u73B0\u8C61\u4FDD\u6301\u5F00\u653E\uFF0C\u540C\u65F6\u660E\u786E\u8BC1\u636E\u80FD\u591F\u652F\u6301\u5230\u54EA\u91CC\u3002"],source:"https://prts.wiki/w/Magallan"},{id:"X-028",title:"\u9499\u8D28\u5316\u7684\u5E94\u7528",en:"CALCIFICATION STUDIES",department:"\u6E90\u77F3\u6280\u827A\u8D44\u6599\u7EC4",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Saria",clearance:"REFERENCE AREA",abstract:"\u585E\u96F7\u5A05\u7684\u6280\u827A\u4E0E\u9499\u53CA\u5176\u5316\u5408\u7269\u6709\u5173\uFF0C\u5E76\u4E0E\u5979\u7684\u533B\u5B66\u77E5\u8BC6\u76F8\u4E92\u914D\u5408\u3002\u9632\u62A4\u3001\u652F\u63F4\u4E0E\u73AF\u5883\u5F71\u54CD\u5728\u8FD9\u4E00\u80FD\u529B\u4E2D\u540C\u65F6\u51FA\u73B0\u3002\u672C\u5377\u5C06\u5176\u4F5C\u4E3A\u5E94\u7528\u7814\u7A76\u7684\u6848\u4F8B\uFF0C\u5173\u6CE8\u80FD\u529B\u7684\u76EE\u7684\u5982\u4F55\u51B3\u5B9A\u540C\u4E00\u6280\u672F\u88AB\u600E\u6837\u4F7F\u7528\u3002",findings:["\u5C06\u80FD\u529B\u8868\u73B0\u4E0E\u4F7F\u7528\u76EE\u7684\u3001\u5BF9\u8C61\u548C\u8303\u56F4\u8054\u7CFB\u8D77\u6765\u3002","\u6BD4\u8F83\u9632\u62A4\u4E0E\u533B\u7597\u652F\u63F4\u5BF9\u63A7\u5236\u7CBE\u5EA6\u7684\u4E0D\u540C\u8981\u6C42\u3002","\u907F\u514D\u4EC5\u4EE5\u7834\u574F\u529B\u8861\u91CF\u4E00\u9879\u6E90\u77F3\u6280\u827A\u7684\u4EF7\u503C\u3002"],source:"https://prts.wiki/w/\u585E\u96F7\u5A05"},{id:"X-029",title:"\u6E90\u77F3\u5236\u54C1\u7684\u5DE5\u5E8F",en:"ORIGINIUM WORKFLOWS",department:"\u8BBE\u5907\u7814\u53D1\u7EC4",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Mayer",clearance:"REFERENCE AREA",abstract:"\u6E90\u77F3\u76F8\u5173\u5236\u54C1\u628A\u80FD\u6E90\u5E94\u7528\u5E26\u5165\u7814\u7A76\u8005\u7684\u65E5\u5E38\u5DE5\u4F5C\u3002\u6885\u5C14\u7684\u6863\u6848\u63D0\u53CA\u5979\u5728\u52A0\u5DE5\u4E2D\u91CD\u89C6\u5B89\u5168\u5DE5\u5E8F\u3002\u672C\u5377\u56F4\u7ED5\u5DE5\u4F5C\u53F0\u4E0A\u7684\u79E9\u5E8F\u5C55\u5F00\uFF1A\u6750\u6599\u5982\u4F55\u8FDB\u5165\u3001\u600E\u6837\u88AB\u52A0\u5DE5\u3001\u4F7F\u7528\u540E\u53C8\u5982\u4F55\u88AB\u5904\u7406\uFF0C\u51B3\u5B9A\u4E86\u7814\u7A76\u80FD\u5426\u957F\u671F\u6301\u7EED\u3002",findings:["\u628A\u6750\u6599\u63A5\u6536\u3001\u52A0\u5DE5\u4E0E\u56DE\u6536\u89C6\u4E3A\u8FDE\u7EED\u8FC7\u7A0B\u3002","\u8BBE\u5907\u6539\u88C5\u65F6\u540C\u6B65\u68C0\u67E5\u539F\u6709\u4FDD\u62A4\u6761\u4EF6\u662F\u5426\u4ECD\u7136\u9002\u7528\u3002","\u8BB0\u5F55\u5B9E\u9645\u64CD\u4F5C\u4E2D\u7684\u56F0\u96BE\uFF0C\u4F7F\u5DE5\u5E8F\u80FD\u591F\u88AB\u4E0B\u4E00\u4F4D\u4F7F\u7528\u8005\u7406\u89E3\u3002"],source:"https://prts.wiki/w/\u6885\u5C14"},{id:"X-030",title:"\u88C5\u5907\u4E2D\u7684\u80FD\u91CF\u9884\u7B97",en:"POWER WITHIN LIMITS",department:"\u5DE5\u7A0B\u79D1\uFF0F\u80FD\u91CF\u79D1",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Engineering Section",clearance:"REFERENCE AREA",abstract:"\u5DE5\u7A0B\u8BBE\u5907\u7684\u80FD\u529B\u53D7\u5230\u53EF\u7528\u80FD\u6E90\u4E0E\u6301\u7EED\u8FD0\u884C\u6761\u4EF6\u7684\u5171\u540C\u9650\u5236\u3002\u83B1\u8335\u751F\u547D\u7684\u88C5\u5907\u7814\u53D1\u56E0\u8D44\u6E90\u6295\u5165\u800C\u6269\u5C55\uFF0C\u4E5F\u5FC5\u987B\u5728\u5B9E\u9645\u73AF\u5883\u4E2D\u63A5\u53D7\u68C0\u9A8C\u3002\u672C\u5377\u628A\u80FD\u91CF\u9884\u7B97\u4F5C\u4E3A\u7814\u7A76\u4E3B\u9898\uFF0C\u8BA8\u8BBA\u5CF0\u503C\u80FD\u529B\u4E0E\u957F\u671F\u53EF\u7528\u6027\u4E4B\u95F4\u7684\u53D6\u820D\u3002",findings:["\u5206\u522B\u8BB0\u5F55\u542F\u52A8\u3001\u6301\u7EED\u8FD0\u884C\u548C\u5F85\u673A\u65F6\u7684\u9700\u6C42\u3002","\u4E3A\u6563\u70ED\u3001\u7EF4\u62A4\u548C\u6545\u969C\u5904\u7406\u4FDD\u7559\u8D44\u6E90\u4F59\u91CF\u3002","\u8BBE\u5907\u4E4B\u95F4\u5171\u4EAB\u80FD\u6E90\u65F6\uFF0C\u5E94\u8BF4\u660E\u4F18\u5148\u7EA7\u4E0E\u5931\u6548\u65F6\u7684\u5F71\u54CD\u8303\u56F4\u3002"],source:"https://prts.wiki/w/\u83B1\u8335\u751F\u547D\u9AD8\u7EA7\u5DE5\u7A0B\u79D1\u6210\u5458"},{id:"X-031",title:"\u8FDC\u8DDD\u4F20\u8F93\u94FE\u8DEF",en:"DISTANT TRANSMISSION",department:"\u80FD\u91CF\u79D1",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Trimounts Project",clearance:"REFERENCE AREA",abstract:"\u300A\u5B64\u661F\u300B\u4E2D\u7684\u805A\u7126\u53D1\u751F\u5668\u4E0E\u5730\u9762\u80FD\u91CF\u4F20\u8F93\u76F8\u8054\u7CFB\u3002\u8DDD\u79BB\u589E\u52A0\u4E4B\u540E\uFF0C\u53D1\u5C04\u7AEF\u3001\u63A5\u6536\u7AEF\u4E0E\u534F\u8C03\u5DE5\u4F5C\u5171\u540C\u51B3\u5B9A\u7CFB\u7EDF\u8868\u73B0\u3002\u672C\u5377\u5173\u6CE8\u94FE\u8DEF\u7684\u5404\u4E2A\u73AF\u8282\u5982\u4F55\u76F8\u4E92\u4F9D\u8D56\uFF0C\u5E76\u5C06\u4E2D\u65AD\u3001\u504F\u5DEE\u4E0E\u6062\u590D\u5217\u4E3A\u540C\u6837\u9700\u8981\u89C2\u5BDF\u7684\u72B6\u6001\u3002",findings:["\u628A\u53D1\u9001\u3001\u63A5\u6536\u4E0E\u63A7\u5236\u4FE1\u53F7\u653E\u5728\u540C\u4E00\u65F6\u95F4\u987A\u5E8F\u4E2D\u6838\u5BF9\u3002","\u94FE\u8DEF\u4E2D\u65AD\u65F6\uFF0C\u533A\u5206\u8BBE\u5907\u95EE\u9898\u4E0E\u5916\u90E8\u6761\u4EF6\u53D8\u5316\u3002","\u4E0D\u80FD\u53EA\u7528\u6210\u529F\u5230\u8FBE\u7684\u7ED3\u679C\u8BC4\u4EF7\u6574\u4E2A\u4F20\u8F93\u8FC7\u7A0B\u3002"],source:"https://prts.wiki/w/\u5B64\u661F2024"},{id:"X-032",title:"\u805A\u7126\u53D1\u751F\u5668",en:"FOCUS GENERATOR",department:"\u8054\u5408\u9879\u76EE\u7EC4",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright",clearance:"REFERENCE AREA",abstract:"\u805A\u7126\u53D1\u751F\u5668\u662F\u300A\u5B64\u661F\u300B\u4E2D\u8FDE\u63A5\u5927\u578B\u5DE5\u7A0B\u4E0E\u9AD8\u7A7A\u8BA1\u5212\u7684\u91CD\u8981\u8BBE\u65BD\u3002\u5B83\u5C06\u8FDC\u8DDD\u79BB\u83B7\u53D6\u7684\u80FD\u91CF\u96C6\u4E2D\u5230\u7279\u5B9A\u7528\u9014\uFF0C\u4E5F\u628A\u8BBE\u65BD\u8BBE\u8BA1\u4E0E\u9879\u76EE\u610F\u56FE\u7D27\u5BC6\u7ED3\u5408\u3002\u672C\u5377\u4ECE\u8FD9\u4E00\u88C5\u7F6E\u51FA\u53D1\uFF0C\u89C2\u5BDF\u516C\u5F00\u76EE\u6807\u4E0E\u53C2\u4E0E\u8005\u6240\u77E5\u4FE1\u606F\u4E4B\u95F4\u7684\u8DDD\u79BB\u3002",findings:["\u5C06\u88C5\u7F6E\u529F\u80FD\u4E0E\u9879\u76EE\u5BF9\u5916\u53D9\u8FF0\u5206\u522B\u7F16\u76EE\u3002","\u8FFD\u8E2A\u5173\u952E\u73AF\u8282\u7531\u54EA\u4E9B\u4EBA\u5458\u638C\u63E1\u548C\u64CD\u4F5C\u3002","\u8BA8\u8BBA\u5355\u4E2A\u8BBE\u5907\u65F6\uFF0C\u540C\u65F6\u4FDD\u7559\u5B83\u6240\u5C5E\u7684\u6574\u4F53\u5DE5\u7A0B\u80CC\u666F\u3002"],source:"https://prts.wiki/w/\u5B64\u661F2024"},{id:"X-033",title:"\u5F27\u5149\u4E00\u53F7",en:"ARCLIGHT ONE",department:"\u80FD\u91CF\u79D1\uFF0F\u8054\u5408\u9879\u76EE\u7EC4",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ferdinand / Kristen",clearance:"REFERENCE AREA",abstract:"\u5F27\u5149\u4E00\u53F7\u628A\u80FD\u6E90\u8BBE\u65BD\u3001\u7A7A\u4E2D\u5E73\u53F0\u4E0E\u54E5\u4F26\u6BD4\u4E9A\u7684\u591A\u65B9\u529B\u91CF\u8054\u7CFB\u5728\u4E00\u8D77\u3002\u5B83\u7684\u6280\u672F\u89C4\u6A21\u4F7F\u5355\u4E00\u79D1\u5C5E\u65E0\u6CD5\u72EC\u7ACB\u5B8C\u6210\u5168\u90E8\u5DE5\u4F5C\u3002\u672C\u5377\u5173\u6CE8\u91CD\u5927\u5DE5\u7A0B\u4E2D\u7684\u76EE\u6807\u5206\u6B67\uFF1A\u76F8\u540C\u7684\u8BBE\u5907\u4E0E\u8D44\u6E90\uFF0C\u53EF\u80FD\u88AB\u4E0D\u540C\u53C2\u4E0E\u8005\u8D4B\u4E88\u5B8C\u5168\u4E0D\u540C\u7684\u671F\u5F85\u3002",findings:["\u6BD4\u8F83\u7814\u7A76\u3001\u519B\u4E8B\u4E0E\u4E2A\u4EBA\u63A2\u7D22\u76EE\u6807\u4E4B\u95F4\u7684\u91CD\u5408\u4E0E\u504F\u79BB\u3002","\u5173\u952E\u51B3\u7B56\u5E94\u7ED3\u5408\u53C2\u4E0E\u8005\u5F53\u65F6\u638C\u63E1\u7684\u4FE1\u606F\u7406\u89E3\u3002","\u4FDD\u7559\u8BA1\u5212\u540D\u79F0\u4E4B\u4E0B\u5404\u9879\u8BBE\u65BD\u4E0E\u884C\u52A8\u4E4B\u95F4\u7684\u5177\u4F53\u5173\u7CFB\u3002"],source:"https://prts.wiki/w/\u5B64\u661F2024"},{id:"X-034",title:"\u5171\u632F\u88C5\u7F6E",en:"RESONANCE DEVICES",department:"\u6E90\u77F3\u6280\u827A\u5E94\u7528\u79D1",category:"\u80FD\u91CF\u7814\u7A76",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Dorothy Franks",clearance:"REFERENCE AREA",abstract:"\u591A\u841D\u897F\u64C5\u957F\u6E90\u77F3\u6280\u827A\u7684\u5E94\u7528\uFF0C\u5171\u632F\u88C5\u7F6E\u662F\u7406\u89E3\u5979\u7814\u7A76\u65B9\u5411\u7684\u4E00\u6761\u7EBF\u7D22\u3002\u5979\u5E0C\u671B\u6539\u5584\u4ED6\u4EBA\u7684\u5904\u5883\uFF0C\u4F46\u5584\u610F\u5E76\u4E0D\u80FD\u81EA\u52A8\u56DE\u7B54\u7814\u7A76\u65B9\u6CD5\u662F\u5426\u5408\u9002\u3002\u672C\u5377\u5C06\u6280\u672F\u8868\u73B0\u4E0E\u7814\u7A76\u52A8\u673A\u5E76\u5217\uFF0C\u4FDD\u7559\u4E24\u8005\u4E4B\u95F4\u9700\u8981\u7EE7\u7EED\u8FFD\u95EE\u7684\u90E8\u5206\u3002",findings:["\u5206\u522B\u8BB0\u5F55\u88C5\u7F6E\u7684\u53EF\u89C2\u5BDF\u6548\u679C\u4E0E\u7814\u7A76\u8005\u5BF9\u5B83\u7684\u671F\u5F85\u3002","\u53C2\u4E0E\u8005\u7684\u611F\u53D7\u4E0E\u9009\u62E9\uFF0C\u4E0D\u80FD\u88AB\u603B\u4F53\u76EE\u6807\u6240\u8986\u76D6\u3002","\u5BF9\u672A\u77E5\u673A\u5236\u4FDD\u6301\u660E\u786E\u6807\u6CE8\uFF0C\u907F\u514D\u628A\u613F\u671B\u5199\u6210\u5DF2\u7ECF\u5F97\u5230\u9A8C\u8BC1\u7684\u7ED3\u679C\u3002"],source:"https://prts.wiki/w/\u591A\u841D\u897F"},{id:"X-035",title:"\u4E09\u4E94\u4E5D\u53F7\u57FA\u5730",en:"SITE 359",department:"\u9879\u76EE\u6CBF\u9769\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Dorothy / Ferdinand",clearance:"REFERENCE AREA",abstract:"\u4E09\u4E94\u4E5D\u53F7\u57FA\u5730\u76F8\u5173\u4E8B\u4EF6\uFF0C\u662F\u7406\u89E3\u300A\u7EFF\u91CE\u5E7B\u68A6\u300B\u4E0E\u300A\u5B64\u661F\u300B\u8054\u7CFB\u7684\u91CD\u8981\u5165\u53E3\u3002\u5B9E\u9A8C\u8BBE\u65BD\u4E4B\u5185\u7684\u7814\u7A76\uFF0C\u4E0E\u62D3\u8352\u8005\u7684\u5904\u5883\u548C\u5916\u90E8\u5229\u76CA\u4EA4\u7EC7\u3002\u672C\u5377\u6309\u53C2\u4E0E\u8005\u4E0E\u9879\u76EE\u5173\u7CFB\u6574\u7406\u7EBF\u7D22\uFF0C\u907F\u514D\u53EA\u4ECE\u6700\u7EC8\u7ED3\u679C\u5012\u63A8\u6BCF\u4E2A\u4EBA\u7684\u52A8\u673A\u3002",findings:["\u5BF9\u7167\u7814\u7A76\u8005\u3001\u53D7\u8BD5\u8005\u4E0E\u8D44\u52A9\u65B9\u80FD\u591F\u83B7\u53D6\u7684\u4FE1\u606F\u3002","\u5C06\u57FA\u5730\u4E2D\u7684\u5B9E\u9A8C\u4E0E\u573A\u5916\u7684\u8D44\u6E90\u5173\u7CFB\u4E00\u5E76\u89C2\u5BDF\u3002","\u4E00\u4E2A\u9879\u76EE\u7ED3\u675F\u4E4B\u540E\uFF0C\u5176\u6280\u672F\u4E0E\u4EBA\u5458\u5173\u7CFB\u4ECD\u53EF\u80FD\u5EF6\u7EED\u3002"],source:"https://arknights.wiki.gg/wiki/Lone_Trail"},{id:"X-036",title:"\u708E\u9B54\u4E8B\u4EF6",en:"THE DIABOLIC INCIDENT",department:"\u5386\u53F2\u4E8B\u4EF6\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Ifrit / Silence / Saria",clearance:"REFERENCE AREA",abstract:"\u708E\u9B54\u4E8B\u4EF6\u6539\u53D8\u4E86\u4F0A\u8299\u5229\u7279\u3001\u8D6B\u9ED8\u4E0E\u585E\u96F7\u5A05\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C\u4E5F\u66B4\u9732\u51FA\u83B1\u8335\u751F\u547D\u7814\u7A76\u4E2D\u7684\u6DF1\u523B\u95EE\u9898\u3002\u672C\u5377\u4EE5\u4E8B\u4EF6\u5F71\u54CD\u4E3A\u4E2D\u5FC3\uFF0C\u4FDD\u7559\u7167\u62A4\u3001\u8BEF\u89E3\u4E0E\u8D23\u4EFB\u8FD9\u4E9B\u7EBF\u7D22\uFF1B\u53D7\u5F71\u54CD\u8005\u4E4B\u540E\u7684\u751F\u6D3B\uFF0C\u540C\u6837\u5C5E\u4E8E\u4E8B\u4EF6\u8BB0\u5F55\u7684\u4E00\u90E8\u5206\u3002",findings:["\u5C06\u5B9E\u9A8C\u9636\u6BB5\u7684\u8BB0\u5F55\u4E0E\u4E4B\u540E\u7684\u7167\u62A4\u7ECF\u5386\u76F8\u4E92\u53C2\u7167\u3002","\u660E\u786E\u8D44\u6599\u7F3A\u5931\u4E4B\u5904\uFF0C\u907F\u514D\u7528\u5355\u4E00\u89E3\u91CA\u8865\u9F50\u6240\u6709\u7A7A\u767D\u3002","\u4E8B\u4EF6\u7684\u540E\u679C\u4E0D\u4EC5\u4F53\u73B0\u4E3A\u8BBE\u65BD\u635F\u574F\uFF0C\u4E5F\u4F53\u73B0\u4E3A\u5173\u7CFB\u4E0E\u751F\u6D3B\u7684\u6539\u53D8\u3002"],source:"https://prts.wiki/w/Ifrit"},{id:"X-037",title:"\u5B64\u661F\u822A\u8FF9",en:"LONE TRAIL",department:"\u9AD8\u7A7A\u7814\u7A76\u8D44\u6599\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright",clearance:"REFERENCE AREA",abstract:"\u300A\u5B64\u661F\u300B\u5C06\u514B\u4E3D\u65AF\u817E\u7684\u63A2\u7D22\u63A8\u5411\u5929\u7A7A\u4E4B\u5916\uFF0C\u4E5F\u8BA9\u7559\u5728\u5730\u9762\u7684\u4EBA\u91CD\u65B0\u5224\u65AD\u81EA\u5DF1\u4E0E\u83B1\u8335\u751F\u547D\u7684\u5173\u7CFB\u3002\u672C\u5377\u4EE5\u822A\u8FF9\u4E3A\u7EBF\u7D22\u9605\u8BFB\u8FD9\u4E00\u4E8B\u4EF6\uFF1A\u6BCF\u4E00\u6B21\u5411\u524D\u63A8\u8FDB\uFF0C\u90FD\u4F34\u968F\u7740\u67D0\u4E9B\u8054\u7CFB\u7684\u5EF6\u7EED\uFF0C\u4E5F\u4F34\u968F\u7740\u65E0\u6CD5\u64A4\u56DE\u7684\u544A\u522B\u3002",findings:["\u628A\u7A7A\u4E2D\u7684\u884C\u52A8\u4E0E\u5730\u9762\u7684\u5E94\u5BF9\u6309\u65F6\u95F4\u76F8\u4E92\u5BF9\u7167\u3002","\u4FDD\u7559\u4E0D\u540C\u4EBA\u7269\u5BF9\u540C\u4E00\u65F6\u523B\u7684\u7406\u89E3\u3002","\u63A2\u7D22\u7684\u610F\u4E49\u65E2\u5728\u4E8E\u62B5\u8FBE\uFF0C\u4E5F\u5728\u4E8E\u5B83\u6539\u53D8\u4E86\u540E\u6765\u8005\u80FD\u591F\u63D0\u51FA\u7684\u95EE\u9898\u3002"],source:"https://arknights.wiki.gg/wiki/Lone_Trail"},{id:"X-038",title:"\u89C2\u6D4B\u6781\u9650",en:"LIMITS OF OBSERVATION",department:"\u9AD8\u7A7A\u7814\u7A76\u8D44\u6599\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Rhine Lab",clearance:"REFERENCE AREA",abstract:"\u5173\u4E8E\u5929\u7A7A\u7684\u77E5\u8BC6\uFF0C\u957F\u671F\u53D7\u5236\u4E8E\u89C2\u5BDF\u8005\u80FD\u591F\u5230\u8FBE\u7684\u4F4D\u7F6E\u4E0E\u80FD\u591F\u53D6\u5F97\u7684\u8BC1\u636E\u3002\u300A\u5B64\u661F\u300B\u7684\u63A2\u7D22\u4F7F\u8FD9\u4E9B\u9650\u5236\u6210\u4E3A\u53EF\u4EE5\u88AB\u8BA8\u8BBA\u7684\u95EE\u9898\u3002\u672C\u5377\u4E0D\u6025\u4E8E\u66FF\u672A\u77E5\u547D\u540D\uFF0C\u800C\u5173\u6CE8\u4E00\u6B21\u65B0\u7684\u89C2\u5BDF\u5982\u4F55\u8FEB\u4F7F\u65E7\u6709\u89E3\u91CA\u91CD\u65B0\u63A5\u53D7\u68C0\u9A8C\u3002",findings:["\u533A\u5206\u76F4\u63A5\u89C2\u5BDF\u3001\u63A8\u8BBA\u4E0E\u4ECD\u5F85\u9A8C\u8BC1\u7684\u5047\u8BBE\u3002","\u5F53\u65B0\u7684\u8D44\u6599\u4E0E\u65E2\u6709\u89E3\u91CA\u51B2\u7A81\u65F6\uFF0C\u540C\u65F6\u4FDD\u7559\u53CC\u65B9\u7684\u4F9D\u636E\u3002","\u8BB0\u5F55\u89C2\u5BDF\u5DE5\u5177\u4E0E\u4F4D\u7F6E\uFF0C\u8BF4\u660E\u7ED3\u8BBA\u53D7\u5230\u54EA\u4E9B\u6761\u4EF6\u9650\u5236\u3002"],source:"https://arknights.wiki.gg/wiki/Lone_Trail"},{id:"X-039",title:"\u4E07\u661F\u56ED",en:"GALLERIA STELLARIA",department:"\u89C2\u661F\u8BBE\u65BD\u8D44\u6599\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Kristen Wright",clearance:"REFERENCE AREA",abstract:"\u4E07\u661F\u56ED\u662F\u514B\u4E3D\u65AF\u817E\u8BBE\u8BA1\u7684\u89C2\u661F\u7A7A\u95F4\uFF0C\u4E2D\u592E\u7684\u661F\u8C61\u4EEA\u5448\u73B0\u51FA\u503C\u5F97\u8FFD\u95EE\u7684\u661F\u7A7A\u7EBF\u7D22\u3002\u5B83\u65E2\u662F\u4E00\u5904\u8BBE\u65BD\uFF0C\u4E5F\u663E\u9732\u51FA\u8BBE\u8BA1\u8005\u7684\u4E2A\u4EBA\u8FFD\u6C42\u3002\u672C\u5377\u5173\u6CE8\u7A7A\u95F4\u5982\u4F55\u627F\u8F7D\u7814\u7A76\u8005\u7684\u60F3\u8C61\uFF0C\u4EE5\u53CA\u60F3\u8C61\u4E0E\u53EF\u8BC1\u5B9E\u7684\u89C2\u5BDF\u5982\u4F55\u5F7C\u6B64\u63A5\u8FD1\u3002",findings:["\u5206\u522B\u8BB0\u5F55\u661F\u8C61\u4EEA\u5448\u73B0\u7684\u5185\u5BB9\u4E0E\u89C2\u6D4B\u83B7\u5F97\u7684\u8D44\u6599\u3002","\u5C06\u8BBE\u65BD\u5E03\u7F6E\u4E0E\u8BBE\u8BA1\u8005\u7684\u7814\u7A76\u76EE\u6807\u4EA4\u53C9\u9605\u8BFB\u3002","\u4E00\u4E2A\u79C1\u4EBA\u7684\u89C2\u661F\u7A7A\u95F4\uFF0C\u4E5F\u53EF\u80FD\u8FDE\u63A5\u7740\u8FDC\u8D85\u4E2A\u4EBA\u89C4\u6A21\u7684\u8BA1\u5212\u3002"],source:"https://prts.wiki/w/\u5B64\u661F2024"},{id:"X-040",title:"\u9759\u6EDE\u6240",en:"HALL OF STASIS",department:"\u9057\u5B58\u8C03\u67E5\u7EC4",category:"\u7279\u522B\u9879\u76EE",date:"\u8DE8\u671F\u8D44\u6599\u6C47\u7F16",lead:"Investigation Team",clearance:"REFERENCE AREA",abstract:"\u9759\u6EDE\u6240\u7559\u4E0B\u7684\u8BBE\u65BD\u4E0E\u5C01\u95ED\u88C5\u7F6E\uFF0C\u8BA9\u8C03\u67E5\u8005\u9762\u5BF9\u5927\u91CF\u65E0\u6CD5\u89E3\u91CA\u7684\u73B0\u8C61\u3002\u8D44\u6599\u7684\u4E0D\u5B8C\u6574\u672C\u8EAB\u6784\u6210\u4E86\u8FD9\u4E2A\u5730\u70B9\u7684\u91CD\u8981\u7279\u5F81\u3002\u672C\u5377\u4FDD\u7559\u73B0\u573A\u3001\u9057\u5B58\u4E0E\u5C1A\u672A\u89E3\u51B3\u7684\u95EE\u9898\uFF0C\u907F\u514D\u5728\u8BC1\u636E\u4E0D\u8DB3\u65F6\u628A\u672A\u77E5\u5199\u6210\u5B8C\u6574\u7684\u5386\u53F2\u3002",findings:["\u5C06\u73B0\u573A\u89C2\u5BDF\u4E0E\u5BF9\u88C5\u7F6E\u7528\u9014\u7684\u63A8\u6D4B\u5206\u522B\u8BB0\u5F55\u3002","\u65E0\u6CD5\u5F00\u542F\u6216\u89E3\u91CA\u7684\u5BF9\u8C61\u4ECD\u5E94\u4FDD\u7559\u539F\u59CB\u72B6\u6001\u63CF\u8FF0\u3002","\u540E\u7EED\u8D44\u6599\u53EF\u4EE5\u8865\u5145\u65E7\u8BB0\u5F55\uFF0C\u4F46\u4E0D\u5E94\u62B9\u53BB\u6700\u521D\u7684\u7591\u95EE\u3002"],source:"https://arknights.wiki.gg/wiki/Lone_Trail/Investigation_Reports"}]};var Mf=Rl.records,pb=["\u5168\u90E8\u6863\u6848",...Rl.categories],xi=Rl.columns;function vi(i){return Mf.map((e,t)=>({record:e,index:t})).filter(({record:e})=>e.category===xi[i]).map(({index:e})=>e)}function Ai(i){let e=xi.indexOf(Mf[i].category),t=12+vi(e).indexOf(i);return{lane:e,row:t,slot:e*32+t}}function bf(i){let e=vi(Math.floor(i/32));return e[Math.max(0,Math.min(e.length-1,i%32-12))]}var Lh=9,ua=32,an=5.2,on=.62,gA=[0,1,2,3,4,-2,-1,5,6];function da(i,e){return(i%e+e)%e}function Sf(i,e,t){return i+Math.floor((e-i+t/2)/t)*t}function Pl({lane:i,row:e}){let t=vi(da(i,xi.length));return t[da(e-12,t.length)]}function Ef(i,e,t){if(t&&"cell"in t)return{...t.cell};let n=Ai(i),s=Sf(n.row,e.row,vi(n.lane).length);return t?.axis==="row"?{lane:e.lane,row:e.row+t.direction}:{lane:t?.axis==="lane"?e.lane+t.direction:Sf(n.lane,e.lane,xi.length),row:s}}function Il(i){return{lane:gA[Math.floor(i/ua)],row:i%ua}}function jn(i){return`${i.lane}:${i.row}`}function sr(i,e){return i.lane===e.lane&&i.row===e.row}var xA=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]],Dl=class{camera=new bt;frustum=new Bn;matrix=new Ne;box=new Ot;candidates=0;previous=[];cachedCells=[];update(e,t,n,s,r){let a=[...e.projectionMatrix.elements,...e.matrixWorldInverse.elements,e.near,e.far,t,n,s,Number(r)];if(a.every((y,b)=>y===this.previous[b]))return this.cachedCells;this.previous=a,this.camera.copy(e,!1),this.camera.far=Math.min(e.far,Math.max(e.near+1,t+8)),this.camera.updateProjectionMatrix();let o=r?1.5:1.18;this.camera.projectionMatrix.elements[0]/=o,this.camera.projectionMatrix.elements[5]/=o,this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),this.matrix.multiplyMatrices(this.camera.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.matrix);let c=this.matrix.clone().invert(),l=Array.from({length:8},(y,b)=>new I(b&1?1:-1,b&2?1:-1,b&4?1:-1).applyMatrix4(c)),h=new Ot,d=-6.5,u=6.5;for(let y of l)y.y>=d&&y.y<=u&&h.expandByPoint(y);for(let[y,b]of xA)for(let M of[d,u]){let T=l[y],w=l[b],R=w.y-T.y;if(Math.abs(R)<1e-9)continue;let A=(M-T.y)/R;A>=0&&A<=1&&h.expandByPoint(T.clone().lerp(w,A))}if(h.isEmpty())return this.candidates=0,this.cachedCells=[];let f=Math.floor((h.min.x-2.8+n)/an+2)-1,g=Math.ceil((h.max.x+2.8+n)/an+2)+1,v=Math.floor((h.min.z-.6-s)/on+15.5)-2,p=Math.ceil((h.max.z+.6-s)/on+15.5)+2,m=[];for(let y=f;y<=g;y++)for(let b=v;b<=p;b++){let M=(y-2)*an-n,T=(b-15.5)*on+s;this.box.min.set(M-2.8,d,T-1.2),this.box.max.set(M+2.8,u,T+1.2),this.frustum.intersectsBox(this.box)&&m.push({lane:y,row:b})}return this.candidates=m.length,this.cachedCells=m}intersects(e,t,n){return this.box.min.set(e-2.8,t-.3,n-1.2),this.box.max.set(e+2.8,t+4.1,n+1.2),this.frustum.intersectsBox(this.box)}};var Zn=class{first=1/0;last=-1;attribute;constructor(e){this.attribute=e}set(e,t){let n=this.attribute.array;for(let s=0;s<t.length;s++){let r=e+s,a=Math.fround(t[s]);n[r]!==a&&(n[r]=a,this.first=Math.min(this.first,r),this.last=Math.max(this.last,r))}}scalar(e,t){t=Math.fround(t),this.attribute.array[e]!==t&&(this.attribute.array[e]=t,this.first=Math.min(this.first,e),this.last=Math.max(this.last,e))}commit(){return this.last<0?!1:(this.attribute.addUpdateRange(this.first,this.last-this.first+1),this.attribute.needsUpdate=!0,this.first=1/0,this.last=-1,!0)}};var Ll=class{frustum=new Bn;matrix=new Ne;box=new Ot;update(e){this.matrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.matrix)}contains(e,t,n){return this.box.min.set(e-2.8,t-.3,n-1.2),this.box.max.set(e+2.8,t+4.1,n+1.2),this.frustum.intersectsBox(this.box)}},Nl=class{mesh;updates;count=0;constructor(e){this.mesh=new jt(e.geometry,e.material,e.instanceMatrix.count),this.mesh.name="archive-shadow-coverage",this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.userData.excludeFromAO=!0,this.mesh.userData.shadowOnly=!0,this.mesh.onBeforeRender=()=>{this.mesh.count=0},this.mesh.onAfterRender=()=>{this.mesh.count=this.count},this.mesh.instanceMatrix.setUsage(gi),this.updates=new Zn(this.mesh.instanceMatrix),e.castShadow=!1}begin(){this.count=0}add(e){if(this.count===this.mesh.instanceMatrix.count){let t=this.mesh.instanceMatrix;this.mesh.dispose(),this.mesh.instanceMatrix=new tn(new Float32Array(t.array.length*2),16).setUsage(gi),this.mesh.instanceMatrix.array.set(t.array),this.updates=new Zn(this.mesh.instanceMatrix)}this.updates.set(this.count++*16,e.elements)}commit(){let e=this.mesh.count!==this.count;return this.mesh.count=this.count,this.updates.commit()||e}};var fa=class{values=[];cursor=0;changed=!0;begin(){this.cursor=0}add(...e){for(let t of e)this.values[this.cursor]!==t&&(this.changed=!0),this.values[this.cursor++]=t}floats(...e){this.add(...e.map(t=>t===void 0?void 0:Math.fround(t)))}end(){let e=this.changed||this.values.length!==this.cursor;return this.values.length=this.cursor,this.changed=!1,e}invalidate(){this.changed=!0}};var Gt=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},vA=new Xn(-1,1,1,-1,0,1),Nh=class extends zt{constructor(){super(),this.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Nt([0,2,0,0,2,0],2))}},AA=new Nh,ln=class{constructor(e){this._mesh=new ke(AA,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,vA)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Ol=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),h=(3-Math.sqrt(3))/6,d=(c+l)*h,u=c-d,f=l-d,g=e-u,v=t-f,p,m;g>v?(p=1,m=0):(p=0,m=1);let y=g-p+h,b=v-m+h,M=g-1+2*h,T=v-1+2*h,w=c&255,R=l&255,A=this.perm[w+this.perm[R]]%12,S=this.perm[w+p+this.perm[R+m]]%12,W=this.perm[w+1+this.perm[R+1]]%12,C=.5-g*g-v*v;C<0?n=0:(C*=C,n=C*C*this._dot(this.grad3[A],g,v));let U=.5-y*y-b*b;U<0?s=0:(U*=U,s=U*U*this._dot(this.grad3[S],y,b));let F=.5-M*M-T*T;return F<0?r=0:(F*=F,r=F*F*this._dot(this.grad3[W],M,T)),70*(n+s+r)}noise3d(e,t,n){let s,r,a,o,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),d=Math.floor(t+l),u=Math.floor(n+l),f=1/6,g=(h+d+u)*f,v=h-g,p=d-g,m=u-g,y=e-v,b=t-p,M=n-m,T,w,R,A,S,W;y>=b?b>=M?(T=1,w=0,R=0,A=1,S=1,W=0):y>=M?(T=1,w=0,R=0,A=1,S=0,W=1):(T=0,w=0,R=1,A=1,S=0,W=1):b<M?(T=0,w=0,R=1,A=0,S=1,W=1):y<M?(T=0,w=1,R=0,A=0,S=1,W=1):(T=0,w=1,R=0,A=1,S=1,W=0);let C=y-T+f,U=b-w+f,F=M-R+f,k=y-A+2*f,X=b-S+2*f,z=M-W+2*f,B=y-1+3*f,te=b-1+3*f,J=M-1+3*f,ce=h&255,de=d&255,he=u&255,Oe=this.perm[ce+this.perm[de+this.perm[he]]]%12,Je=this.perm[ce+T+this.perm[de+w+this.perm[he+R]]]%12,je=this.perm[ce+A+this.perm[de+S+this.perm[he+W]]]%12,j=this.perm[ce+1+this.perm[de+1+this.perm[he+1]]]%12,ie=.6-y*y-b*b-M*M;ie<0?s=0:(ie*=ie,s=ie*ie*this._dot3(this.grad3[Oe],y,b,M));let ne=.6-C*C-U*U-F*F;ne<0?r=0:(ne*=ne,r=ne*ne*this._dot3(this.grad3[Je],C,U,F));let be=.6-k*k-X*X-z*z;be<0?a=0:(be*=be,a=be*be*this._dot3(this.grad3[je],k,X,z));let _e=.6-B*B-te*te-J*J;return _e<0?o=0:(_e*=_e,o=_e*_e*this._dot3(this.grad3[j],B,te,J)),32*(s+r+a+o)}noise4d(e,t,n,s){let r=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,d,u,f,g,v=(e+t+n+s)*c,p=Math.floor(e+v),m=Math.floor(t+v),y=Math.floor(n+v),b=Math.floor(s+v),M=(p+m+y+b)*l,T=p-M,w=m-M,R=y-M,A=b-M,S=e-T,W=t-w,C=n-R,U=s-A,F=S>W?32:0,k=S>C?16:0,X=W>C?8:0,z=S>U?4:0,B=W>U?2:0,te=C>U?1:0,J=F+k+X+z+B+te,ce=a[J][0]>=3?1:0,de=a[J][1]>=3?1:0,he=a[J][2]>=3?1:0,Oe=a[J][3]>=3?1:0,Je=a[J][0]>=2?1:0,je=a[J][1]>=2?1:0,j=a[J][2]>=2?1:0,ie=a[J][3]>=2?1:0,ne=a[J][0]>=1?1:0,be=a[J][1]>=1?1:0,_e=a[J][2]>=1?1:0,Ie=a[J][3]>=1?1:0,xt=S-ce+l,Ge=W-de+l,We=C-he+l,Ze=U-Oe+l,Fe=S-Je+2*l,rt=W-je+2*l,P=C-j+2*l,ft=U-ie+2*l,Ke=S-ne+3*l,$e=W-be+3*l,Ae=C-_e+3*l,E=U-Ie+3*l,x=S-1+4*l,N=W-1+4*l,K=C-1+4*l,$=U-1+4*l,Y=p&255,fe=m&255,L=y&255,V=b&255,ae=o[Y+o[fe+o[L+o[V]]]]%32,Z=o[Y+ce+o[fe+de+o[L+he+o[V+Oe]]]]%32,ee=o[Y+Je+o[fe+je+o[L+j+o[V+ie]]]]%32,ue=o[Y+ne+o[fe+be+o[L+_e+o[V+Ie]]]]%32,pe=o[Y+1+o[fe+1+o[L+1+o[V+1]]]]%32,le=.6-S*S-W*W-C*C-U*U;le<0?h=0:(le*=le,h=le*le*this._dot4(r[ae],S,W,C,U));let Ue=.6-xt*xt-Ge*Ge-We*We-Ze*Ze;Ue<0?d=0:(Ue*=Ue,d=Ue*Ue*this._dot4(r[Z],xt,Ge,We,Ze));let D=.6-Fe*Fe-rt*rt-P*P-ft*ft;D<0?u=0:(D*=D,u=D*D*this._dot4(r[ee],Fe,rt,P,ft));let oe=.6-Ke*Ke-$e*$e-Ae*Ae-E*E;oe<0?f=0:(oe*=oe,f=oe*oe*this._dot4(r[ue],Ke,$e,Ae,E));let se=.6-x*x-N*N-K*K-$*$;return se<0?g=0:(se*=se,g=se*se*this._dot4(r[pe],x,N,K,$)),27*(h+d+u+f+g)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}};var pa={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new De},cameraProjectionMatrix:{value:new Ne},cameraInverseProjectionMatrix:{value:new Ne},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		#ifdef USE_REVERSED_DEPTH_BUFFER

			const float depthThreshold = 0.0;

		#else

			const float depthThreshold = 1.0;

		#endif

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == depthThreshold ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},ma={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ga={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new De}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};var rr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var xa=class i extends Gt{constructor(e,t,n=512,s=512,r=32){super(),this.width=n,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();let a=new kn;a.format=Yn,a.type=Oi,this.normalRenderTarget=new yt(this.width,this.height,{minFilter:nt,magFilter:nt,type:Rt,depthTexture:a}),this.ssaoRenderTarget=new yt(this.width,this.height,{type:Rt}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new dt({defines:Object.assign({},pa.defines),uniforms:Vt.clone(pa.uniforms),vertexShader:pa.vertexShader,fragmentShader:pa.fragmentShader,blending:Et}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Or,this.normalMaterial.blending=Et,this.blurMaterial=new dt({defines:Object.assign({},ga.defines),uniforms:Vt.clone(ga.uniforms),vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new dt({defines:Object.assign({},ma.defines),uniforms:Vt.clone(ma.uniforms),vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader,blending:Et}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new dt({uniforms:Vt.clone(rr.uniforms),vertexShader:rr.vertexShader,fragmentShader:rr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Do,blendDst:Qr,blendEquation:fn,blendSrcAlpha:Io,blendDstAlpha:Qr,blendEquationAlpha:fn}),this._fsQuad=new ln(null),this._originalClearColor=new ve}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,n){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case i.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Et,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Et,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Et,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Ks,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){let t=this.kernel;for(let n=0;n<e;n++){let s=new I;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=n/e;r=Pe.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){let n=new Ol,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){let o=Math.random()*2-1,c=Math.random()*2-1,l=0;r[a]=n.noise3d(o,c,l)}this.noiseTexture=new Ii(r,4,4,Js,Zt),this.noiseTexture.wrapS=Rn,this.noiseTexture.wrapT=Rn,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}};xa.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};var va={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};var Ul=class extends Gt{constructor(e,t,n){super(),this.scene=e,this.camera=t;let s=n.focus!==void 0?n.focus:1,r=n.aperture!==void 0?n.aperture:.025,a=n.maxblur!==void 0?n.maxblur:1;this._renderTargetDepth=new yt(1,1,{minFilter:nt,magFilter:nt,type:Rt}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new Ys,this._materialDepth.depthPacking=uh,this._materialDepth.blending=Et;let o=Vt.clone(va.uniforms);o.tDepth.value=this._renderTargetDepth.texture,o.focus.value=s,o.aspect.value=t.aspect,o.aperture.value=r,o.maxblur.value=a,o.nearClip.value=t.near,o.farClip.value=t.far,this.materialBokeh=new dt({defines:Object.assign({},va.defines),uniforms:o,vertexShader:va.vertexShader,fragmentShader:va.fragmentShader}),this.uniforms=o,this._fsQuad=new ln(this.materialBokeh),this._oldClearColor=new ve}render(e,t,n){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}};var Aa=class extends xa{packed;sharing=!0;savedColor=new ve;depthClear=new Float32Array([1,1,1,1]);constructor(e,t,n,s,r=32){super(e,t,n,s,r),this.ssaoRenderTarget.depthBuffer=!1,this.blurRenderTarget.depthBuffer=!1,this.packed=this.normalRenderTarget.texture.clone(),this.packed.name="Archive.packedDepth",this.normalRenderTarget.textures.push(this.packed),this.normalMaterial.onBeforeCompile=a=>{this.sharing&&(a.vertexShader=`varying vec2 vArchiveZW;
`+a.vertexShader,a.vertexShader=a.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
vArchiveZW = gl_Position.zw;`),a.fragmentShader=`varying vec2 vArchiveZW;
layout(location = 1) out vec4 archivePackedDepth;
#include <packing>
`+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("void main() {",`void main() {
archivePackedDepth = packDepthToRGBA(0.5 * vArchiveZW.x / vArchiveZW.y + 0.5);`))},this.normalMaterial.customProgramCacheKey=()=>`archive-normal-packed-depth-v1-${this.sharing}`}render(e,t,n,s,r){if(window.__filmSkipRender)return;let a=[];this.scene.traverseVisible(o=>{o.userData.excludeFromAO&&a.push(o)});for(let o of a)o.visible=!1;try{super.render(e,t,n,s,r)}finally{for(let o of a)o.visible=!0}}setSharing(e){e!==this.sharing&&(this.normalRenderTarget.dispose(),this.sharing=e,this.normalRenderTarget.textures.length=1,e&&this.normalRenderTarget.textures.push(this.packed),this.normalMaterial.needsUpdate=!0)}_renderOverride(e,t,n,s,r){if(window.__filmSkipRender)return;e.getClearColor(this.savedColor);let a=e.getClearAlpha(),o=e.autoClear,c=this.scene.overrideMaterial;e.setRenderTarget(n),e.autoClear=!1,e.setClearColor(s,r),e.clear();let l=e.getContext();this.sharing&&l.clearBufferfv(l.COLOR,1,this.depthClear),this.scene.overrideMaterial=t;try{e.render(this.scene,this.camera)}finally{this.scene.overrideMaterial=c,e.autoClear=o,e.setClearColor(this.savedColor,a)}}},Fl=class extends Ul{constructor(t,n,s,r){super(t,n,s);this.source=r;this.quad=new ln(this.materialBokeh)}width=1;height=1;quad;setSize(t,n){super.setSize(t,n),this.width=t,this.height=n}render(t,n,s,r,a){if(window.__filmSkipRender)return;let o=this.source(),c=this.uniforms;if(!o.enabled||o.width!==this.width||o.height!==this.height)return super.render(t,n,s,r,a);let l=c.tDepth.value;c.tDepth.value=o.normalRenderTarget.textures[1],c.tColor.value=s.texture,c.nearClip.value=this.camera.near,c.farClip.value=this.camera.far;let h=t.autoClear;t.autoClear=!1,t.setRenderTarget(this.renderToScreen?null:n),this.renderToScreen||t.clear();try{this.quad.render(t)}finally{c.tDepth.value=l,t.autoClear=h}}dispose(){super.dispose(),this.quad.dispose()}};function Oh(i){let e=new Set,t=new Set,n=new Set;i.traverse(s=>{if(s instanceof ke){s instanceof jt&&s.dispose(),e.add(s.geometry);for(let r of[s.material,s.userData.fullMaterial,s.userData.fastMaterial].flat())r instanceof Ut&&t.add(r)}});for(let s of t){for(let r of Object.values(s))r instanceof ut&&n.add(r);s.dispose()}i instanceof ci&&(i.environment&&n.add(i.environment),i.background instanceof ut&&n.add(i.background)),e.forEach(s=>s.dispose()),n.forEach(s=>s.dispose()),i.clear()}var wf=i=>`${i.lane}:${i.row}`,Tf=i=>(i=Math.max(0,Math.min(1,i)),i*i*(3-2*i)),Bl=class{target=0;start=-10;origin={row:12,lane:2};from=new Map;latest=new Map;backgroundFrom=0;set(e,t,n,s=!1){let r=e?1:0;r===this.target&&!s||(this.backgroundFrom=s?r:this.background(t),this.from=s?new Map:new Map(this.latest),this.target=r,this.start=s?t-10:t,this.origin={...n})}background(e){return this.backgroundFrom+(this.target-this.backgroundFrom)*Tf((e-this.start)/.85)}beginFrame(){this.latest.clear()}sample(e,t){if(t-this.start>=1.18)return this.target;let n=Math.min(.6,Math.abs(e.row-this.origin.row)*.034+Math.abs(e.lane-this.origin.lane)*.11),s=this.from.get(wf(e))??this.backgroundFrom,r=s+(this.target-s)*Tf((t-this.start-n)/.58);return this.latest.set(wf(e),r),r}};var yA={Frosted_Polymer:"#626b70",Ivory_Edges:"#687277",Optical_Diffuser:"#192226",Titanium_Fasteners:"#b1b9bb",Index_Inlay:"#c6a36b",Printed_Label:"#303a3e",Subsurface_Optics:"#939e9f",Optical_Edges:"#bbc3bc",Carbon_Ink:"#b6bdb8"};function ar(i,e,t=!1,n={value:0}){let s={value:0},r=i.onBeforeCompile,a=i.customProgramCacheKey.bind(i)(),o=new ve(yA[e]??(e.includes("Orange")?"#bb8850":"#969f9f"));return i.onBeforeCompile=(c,l)=>{r.call(i,c,l),c.uniforms.rhineTheme=s,c.uniforms.rhineDarkSurface={value:o},c.uniforms.rhineSubduedIndex=n,t&&(c.vertexShader=`attribute float archiveTheme; varying float vRhineTheme;
`+c.vertexShader,c.vertexShader=c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRhineTheme = archiveTheme;`),c.fragmentShader=`varying float vRhineTheme;
`+c.fragmentShader),c.fragmentShader=`uniform float rhineTheme; uniform vec3 rhineDarkSurface; uniform float rhineSubduedIndex;
`+c.fragmentShader;let h=t?"vRhineTheme":"rhineTheme",d=e==="Printed_Canvas",u=d?"#include <opaque_fragment>":"#include <roughnessmap_fragment>",f=d?"mix(vec3(0.023, 0.032, 0.037), vec3(0.78, 0.78, 0.71), 1.0 - smoothstep(0.12, 0.65, dot(diffuseColor.rgb, vec3(.2126,.7152,.0722))))":e==="Frosted_Polymer"&&!t?"mix(rhineDarkSurface, vec3(0.92, 0.96, 0.97), glassRevealAtHeight(archiveClarity, vArchiveHeight))":e==="Index_Inlay"?"mix(rhineDarkSurface, vec3(0.030, 0.042, 0.048), rhineSubduedIndex)":"rhineDarkSurface",g=d?"outgoingLight":"diffuseColor.rgb";c.fragmentShader=c.fragmentShader.replace(u,`${g} = mix(${g}, ${f}, ${h});
${u}`)},i.customProgramCacheKey=()=>`${a}-rhine-theme-${e}-${t}`,s}var Cf=new WeakMap,_A=new ve("#11181b"),MA=new ve("#192125"),bA=new ve("#263136");function Rf(i,e,t){let n=Cf.get(i);if(!n){let s=[];i.traverse(o=>{o instanceof fi&&s.push({light:o,intensity:o.intensity})});let a=i.getObjectByName("archive-floor")?.material;n={background:i.background.clone(),fog:i.fog?.color.clone(),intensity:i.environmentIntensity,exposure:e.toneMappingExposure,lights:s,floor:a?{material:a,color:a.color.clone()}:void 0},Cf.set(i,n)}i.background.copy(n.background).lerp(_A,t),i.fog&&n.fog&&i.fog.color.copy(n.fog).lerp(bA,t),n.floor&&n.floor.material.color.copy(n.floor.color).lerp(MA,t),i.environmentIntensity=Pe.lerp(n.intensity,.32,t),e.toneMappingExposure=Pe.lerp(n.exposure,.98,t);for(let{light:s,intensity:r}of n.lights)s.intensity=r*(1-.35*t)}var cs=(i,e=0,t=1)=>Math.min(t,Math.max(e,i)),Uh=()=>({low:0,mid:0,high:0,activity:0});function SA(i,e,t,n,s){let r=n.low*.8*(.5+.5*Math.sin(i*.29-e*.5-t*2.7)),a=n.mid*.48*(.5+.5*Math.sin(i*.72+e*.9-t*4.3)),o=n.high*.18*Math.pow(Math.max(0,Math.sin(i*1.7-e*2.2-t*6.4)),4);return cs((r+a+o)*cs(s,0,2),0,1.8)}var kl=class{weights={legacy:1,wave:0,lift:0};update(e,t,n,s){for(let r of["legacy","wave","lift"])this.weights[r]+=((s===r?1:0)-this.weights[r])*(1-Math.exp(-cs(n,0,.1)*5));return{style:{...this.weights}}}};function Pf(i,e,t,n,s,r,a=.5){a=cs(a);let o=g=>g*g*(3-2*g),c=o(cs((a-.5)*2)),l=1-o(cs(a*2)),h=1-l-c,u=(n.low*l+n.mid*h+n.high*c)*(.72+.28*Math.sin(i*.32-t*2.2))*.95,f=n.low*.62*(.55+.45*Math.sin(i*.22+e*.18-t*1.8))+n.mid*.42*(.55+.45*Math.sin(i*.38-e*.27-t*2.8))+n.high*.28*(.55+.45*Math.sin(i*.62+e*.4-t*4.1));return SA(i,e,t,n,s)*r.style.legacy+(r.style.wave*u+r.style.lift*f)*cs(s,0,2)}function Fh(i,e){if(e===hh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===$s||e===aa){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===$s)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function If(i){let e=new Map,t=new Map,n=i.clone();return Df(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Df(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Df(i.children[n],e.children[n],t)}var _a=class extends Wn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Wh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new zl(t,qe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new zl(t,qe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new iu(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=pi.extractUrlBase(e);a=pi.resolveURL(l,this.path)}else a=pi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new qs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ff){try{a[qe.KHR_BINARY_GLTF]=new su(e)}catch(d){s&&s(d);return}r=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new uu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case qe.KHR_MATERIALS_UNLIT:a[d]=new Vh;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[d]=new ru(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[d]=new au;break;case qe.KHR_MESH_QUANTIZATION:a[d]=new ou;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function EA(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function wt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Hh=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new ve(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],kt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Li(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new es(h),l.distance=d;break;case"spot":l=new Gr(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Jn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Vh=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Kt}extendParams(e,t,n){let s=[];e.color=new ve(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],kt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,vt))}return Promise.all(s)}},Gh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Wh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(r,r)}return Promise.all(s)}},Xh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Yh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},qh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new ve(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],kt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,vt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Qh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Kh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new ve().setRGB(r[0],r[1],r[2],kt),Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5),Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new ve().setRGB(r[0],r[1],r[2],kt),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,vt)),Promise.all(s)}},Jh=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},$h=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return wt(this.parser,e,this.name)!==null?nn:null}extendMaterialParams(e,t){let n=wt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},eu=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},tu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},nu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},zl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}},iu=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==_n.TRIANGLES&&l.mode!==_n.TRIANGLE_STRIP&&l.mode!==_n.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,f=[];for(let g of d){let v=new Ne,p=new I,m=new pn,y=new I(1,1,1),b=new jt(g.geometry,g.material,u);for(let M=0;M<u;M++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,M),c.SCALE&&y.fromBufferAttribute(c.SCALE,M),b.setMatrixAt(M,v.compose(p,m,y));for(let M in c)if(M==="_COLOR_0"){let T=c[M];b.instanceColor=new tn(T.array,T.itemSize,T.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,c[M]);lt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Ff="glTF",ya=12,Lf={JSON:1313821514,BIN:5130562},su=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ff)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ya,r=new DataView(e,ya),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Lf.JSON){let l=new Uint8Array(e,ya+a,o);this.content=n.decode(l)}else if(c===Lf.BIN){let l=ya+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ru=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let d=cu[h]||h.toLowerCase();o[d]=a[h]}for(let h in e.attributes){let d=cu[h]||h.toLowerCase();if(a[h]!==void 0){let u=n.accessors[e.attributes[h]],f=or[u.componentType];l[d]=f.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let v=f.attributes[g],p=c[g];p!==void 0&&(v.normalized=p)}d(f)},o,l,kt,u)})})}},au=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ou=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},Hl=class extends zn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,d=(n-t)/h,u=d*d,f=u*d,g=e*l,v=g-l,p=-2*f+3*u,m=f-u,y=1-p,b=m-u+d;for(let M=0;M!==o;M++){let T=a[v+M+o],w=a[v+M+c]*h,R=a[g+M+o],A=a[g+M]*h;r[M]=y*T+b*w+p*R+m*A}return r}},wA=new pn,lu=class extends Hl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return wA.fromArray(r).normalize().toArray(r),r}},_n={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Nf={9728:nt,9729:At,9984:Uo,9985:js,9986:is,9987:In},Of={33071:xn,33648:Ls,10497:Rn},Bh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},TA={CUBICSPLINE:void 0,LINEAR:ji,STEP:Ki},kh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function CA(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new An({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:dn})),i.DefaultMaterial}function hs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Jn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function RA(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let d=e[l];if(n){let u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(u)}if(s){let u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(u)}if(r){let u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],d=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function PA(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function IA(i){let e,t=i.extensions&&i.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=i.indices+":"+zh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+zh(i.targets[n]);return e}function zh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function hu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function DA(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var LA=new Ne,uu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new EA,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new kr(this.options.manager):this.textureLoader=new Wr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new qs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return hs(r,o,s),Jn(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(pi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Bh[s.type],o=or[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Ct(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Bh[s.type],l=or[s.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,v,p;if(f&&f!==d){let m=Math.floor(u/f),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,b=t.cache.get(y);b||(v=new l(o,m*f,s.count*f/h),b=new zs(v,f/h),t.cache.add(y,b)),p=new Hs(b,c,u%f/h,g)}else o===null?v=new l(s.count*c):v=new l(o,u,s.count*c),p=new Ct(v,c,g);if(s.sparse!==void 0){let m=Bh.SCALAR,y=or[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,T=new y(a[1],b,s.sparse.count*m),w=new l(a[2],M,s.sparse.count*c);o!==null&&(p=new Ct(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let R=0,A=T.length;R<A;R++){let S=T[R];if(p.setX(S,w[R*c]),c>=2&&p.setY(S,w[R*c+1]),c>=3&&p.setZ(S,w[R*c+2]),c>=4&&p.setW(S,w[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let u=(r.samplers||{})[a.sampler]||{};return h.magFilter=Nf[u.magFilter]||At,h.minFilter=Nf[u.minFilter]||In,h.wrapS=Of[u.wrapS]||Rn,h.wrapT=Of[u.wrapT]||Rn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==nt&&h.minFilter!==At,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let u=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(v){let p=new ut(v);p.needsUpdate=!0,u(p)}),t.load(pi.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),Jn(d,a),d.userData.mimeType=a.mimeType||DA(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ws,Ut.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Gs,Ut.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return An}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){let d=s[qe.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new ve(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],kt),o.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,vt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=yn);let h=r.alphaMode||kh.OPAQUE;if(h===kh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===kh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Kt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new De(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Kt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Kt){let d=r.emissiveFactor;o.emissive=new ve().setRGB(d[0],d[1],d[2],kt)}return r.emissiveTexture!==void 0&&a!==Kt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,vt)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),Jn(d,r),t.associations.set(d,{materials:e}),r.extensions&&hs(s,d,r),d})}createUniqueName(e){let t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Uf(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=IA(l),d=s[h];if(d)a.push(d.promise);else{let u;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Uf(new zt,l,t),s[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?CA(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let f=0,g=h.length;f<g;f++){let v=h[f],p=a[f],m,y=l[f];if(p.mode===_n.TRIANGLES||p.mode===_n.TRIANGLE_STRIP||p.mode===_n.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Cr(v,y):new ke(v,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===_n.TRIANGLE_STRIP?m.geometry=Fh(m.geometry,aa):p.mode===_n.TRIANGLE_FAN&&(m.geometry=Fh(m.geometry,$s));else if(p.mode===_n.LINES)m=new Pr(v,y);else if(p.mode===_n.LINE_STRIP)m=new Ji(v,y);else if(p.mode===_n.LINE_LOOP)m=new Ir(v,y);else if(p.mode===_n.POINTS)m=new Dr(v,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&PA(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Jn(m,r),p.extensions&&hs(s,m,p),t.assignFinalMaterial(m),d.push(m)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&hs(s,d[0],r),d[0];let u=new $t;r.extensions&&hs(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new bt(Pe.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Xn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Jn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let d=a[l];if(d){o.push(d);let u=new Ne;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rr(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){let f=s.channels[d],g=s.samplers[f.sampler],v=f.target,p=v.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,y=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",y)),l.push(g),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){let u=d[0],f=d[1],g=d[2],v=d[3],p=d[4],m=[];for(let b=0,M=u.length;b<M;b++){let T=u[b],w=f[b],R=g[b],A=v[b],S=p[b];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let W=n._createAnimationTracks(T,w,R,A,S);if(W)for(let C=0;C<W.length;C++)m.push(W[C])}let y=new Br(r,void 0,m);return Jn(y,s),y})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,LA)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);if(h.userData.pivot!==void 0&&d.length>0){let f=h.userData.pivot,g=d[0];h.pivot=new I().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Vs:l.length>1?h=new $t:l.length===1?h=l[0]:h=new lt,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=a),Jn(h,r),r.extensions&&hs(n,h,r),r.matrix!==void 0){let d=new Ne;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(h);s.associations.set(h,{...d})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new $t;n.name&&(r.name=s.createUniqueName(n.name)),Jn(r,n),n.extensions&&hs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,d=c.length;h<d;h++){let u=c[h];u.parent!==null?r.add(If(u)):r.add(u)}let l=h=>{let d=new Map;for(let[u,f]of s.associations)(u instanceof Ut||u instanceof ut)&&d.set(u,f);return h.traverse(u=>{let f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];Fi[r.path]===Fi.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(o);let l;switch(Fi[r.path]){case Fi.weights:l=Hn;break;case Fi.rotation:l=Vn;break;case Fi.translation:case Fi.scale:l=Gn;break;default:switch(n.itemSize){case 1:l=Hn;break;case 2:case 3:default:l=Gn;break}break}let h=s.interpolation!==void 0?TA[s.interpolation]:ji,d=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){let g=new l(c[u]+"."+Fi[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=hu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Vn?lu:Hl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function NA(i,e,t){let n=e.attributes,s=new Ot;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),o.normalized){let h=hu(or[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new I,c=new I;for(let l=0,h=r.length;l<h;l++){let d=r[l];if(d.POSITION!==void 0){let u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){let v=hu(or[u.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new en;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Uf(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=cu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Ye.workingColorSpace!==kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Jn(i,e),NA(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?RA(i,e.targets,t):i})}var Vl=class extends ci{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Di;e.deleteAttribute("uv");let t=new An({side:Ht}),n=new An,s=new es(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ke(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new jt(e,n,6),o=new lt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new ke(e,lr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ke(e,lr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new ke(e,lr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new ke(e,lr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new ke(e,lr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new ke(e,lr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function lr(i){return new Ur({color:0,emissive:16777215,emissiveIntensity:i})}function Bf(i,e,t="baseline"){let n=t==="refined";i.toneMappingExposure=n?1:1.05;let s=new nr(i),r=new Vl;e.environment=s.fromScene(r,.04).texture,r.dispose(),s.dispose(),e.environmentIntensity=n?.52:.48,e.add(new zr("#fffaf5",n?"#b49b80":"#b4a18c",n?.5:.65));let a=new Li(n?"#fff4e5":"#fff7ed",n?1.7:1.4);a.position.set(...n?[-8,14,4]:[-6,14,-5]);let o=new Li("#ffffff",n?.3:.6);return o.position.set(7,8,-10),e.add(a,o),a}var Gl=class extends Gt{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Vt.clone(e.uniforms),this.material=new dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ln(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ma=class extends Gt{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Wl=class extends Gt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Xl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new De);this._width=n.width,this._height=n.height,t=new yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Rt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gl(rr),this.copyPass.material.blending=Et,this.timer=new Yr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ma!==void 0&&(a instanceof Ma?n=!0:a instanceof Wl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Yl=class extends Gt{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ve}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var ba={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var ql=class extends Gt{constructor(){super(),this.isOutputPass=!0,this.uniforms=Vt.clone(ba.uniforms),this.material=new Xs({name:ba.name,uniforms:this.uniforms,vertexShader:ba.vertexShader,fragmentShader:ba.fragmentShader}),this._fsQuad=new ln(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ye.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Kr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===jr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Zr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ts?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===$r?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Jr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Sa={name:"SMAAEdgesShader",defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Ea={name:"SMAAWeightsShader",defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Ql={name:"SMAABlendShader",uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};var Kl=class extends Gt{constructor(){super(),this._edgesRT=new yt(1,1,{depthBuffer:!1,type:Rt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new yt(1,1,{depthBuffer:!1,type:Rt}),this._weightsRT.texture.name="SMAAPass.weights";let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new ut,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=At,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new ut,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=n,this._searchTexture.magFilter=nt,this._searchTexture.minFilter=nt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Vt.clone(Sa.uniforms),this._materialEdges=new dt({defines:Object.assign({},Sa.defines),uniforms:this._uniformsEdges,vertexShader:Sa.vertexShader,fragmentShader:Sa.fragmentShader}),this._uniformsWeights=Vt.clone(Ea.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new dt({defines:Object.assign({},Ea.defines),uniforms:this._uniformsWeights,vertexShader:Ea.vertexShader,fragmentShader:Ea.fragmentShader}),this._uniformsBlend=Vt.clone(Ql.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new dt({uniforms:this._uniformsBlend,vertexShader:Ql.vertexShader,fragmentShader:Ql.fragmentShader}),this._fsQuad=new ln(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}};var du={performance:{scale:80,pixelRatio:1,antialias:"off",shadows:1024,aoSamples:0,aoResolution:.5,depthOfField:0,transmission:.5,anisotropy:4},original:{scale:100,pixelRatio:1.5,antialias:"off",shadows:2048,aoSamples:32,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16},high:{scale:125,pixelRatio:2,antialias:"smaa",shadows:4096,aoSamples:32,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16},ultra:{scale:150,pixelRatio:2,antialias:"smaa",shadows:4096,aoSamples:64,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16}};var us=(i,e,t)=>e.includes(i)?i:t,kf=(i,e,t,n,s)=>typeof i=="number"&&Number.isFinite(i)?Math.min(t,Math.max(e,Math.round(i/n)*n)):s;function jl(i,e=!0){let t=du.original,n=i&&typeof i=="object"?i:{},s=e?t:{...t,pixelRatio:1,aoSamples:0,depthOfField:0};return{scale:kf(n.scale,50,200,5,s.scale),pixelRatio:us(n.pixelRatio,[1,1.5,2,3],s.pixelRatio),antialias:us(n.antialias,["off","smaa"],s.antialias),shadows:us(n.shadows,[0,1024,2048,4096],s.shadows),aoSamples:us(n.aoSamples,[0,16,32,64],s.aoSamples),aoResolution:us(n.aoResolution,[.5,.75,1],s.aoResolution),depthOfField:kf(n.depthOfField,0,150,5,s.depthOfField),transmission:us(n.transmission,[.25,.5,.75,1],s.transmission),anisotropy:us(n.anisotropy,[1,2,4,8,16],s.anisotropy)}}function zf(i,e,t,n,s,r,a=8294400){let o=Math.min(s,i.pixelRatio)*n*i.scale/100,c=Math.min(o,Math.sqrt(a/Math.max(1,e*t)),r/Math.max(1,e,t));return{ratio:c,width:Math.max(1,Math.floor(e*c)),height:Math.max(1,Math.floor(t*c)),limited:c<o-1e-4}}function Hf(i,e,t){let n=Math.min(t.anisotropy,e.capabilities.getMaxAnisotropy()),s=new Set;i.traverse(r=>{if(r instanceof ke)for(let a of Array.isArray(r.material)?r.material:[r.material])for(let o of Object.values(a))o instanceof ut&&!o.isRenderTargetTexture&&s.add(o)});for(let r of s)r.anisotropy!==n&&(r.anisotropy=n,r.needsUpdate=!0)}function Vf(i,e,t,n,s=!1){let r=Math.max(1,t.clientWidth),a=Math.max(1,t.clientHeight),o=zf(n,r,a,t.getBoundingClientRect().width/r,devicePixelRatio,i.capabilities.maxTextureSize,s?921600:8294400);return i.setPixelRatio(o.ratio),i.setSize(r,a),e.setPixelRatio(o.ratio),e.setSize(r,a),i.transmissionResolutionScale=n.transmission,t.dataset.renderQuality=JSON.stringify({...o,antialias:n.antialias,transmission:n.transmission,anisotropy:Math.min(n.anisotropy,i.capabilities.getMaxAnisotropy()),superPerformance:s}),o}var Gf=`
float archiveTransmissionLod(float roughness, float ior, vec2 samplerSize) {
  float nativeLod = log2(samplerSize.x) * roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
  float strength = clamp((roughness - ${.025}) / ${.42-.025}, 0.0, 1.0);
  float panelPixels = length(vArchiveProjectedAxis * samplerSize);
  float clearLod = log2(samplerSize.x) * ${.025} * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
  float boundedLod = log2(max(exp2(clearLod), panelPixels * ${.016} * pow(strength, 1.15)));
  return mix(nativeLod, min(nativeLod, boundedLod), archiveQuality);
}`;var Wf=`
float glassRevealAtHeight(float progress, float height) {
  float edge = 1.0 - ${1+2*.12} * clamp(progress, 0.0, 1.0);
  return smoothstep(edge, edge + ${2*.12}, clamp(height, 0.0, 1.0));
}`;var OA={Optical_Glass_Body:{color:"#929894",roughness:.38,opacity:.27,order:20},Optical_Glass_Roof:{color:"#929b94",roughness:.34,opacity:.42,order:24},Optical_Glass_Edge:{color:"#edf0e7",roughness:.19,opacity:.9,order:28},Optical_Bridge_Glass:{color:"#a0aca2",roughness:.32,opacity:.36,order:26}};function Xf(i,e){let t=OA[i];t&&(e.color.set(t.color),e.roughness=t.roughness,e.metalness=.015,e.clearcoat=.42,e.clearcoatRoughness=.24,e.opacity=t.opacity,e.transmission=0,e.transparent=!1,e.blending=Ks,e.blendEquation=fn,e.blendSrc=Ds,e.blendDst=qi,e.blendSrcAlpha=Po,e.blendDstAlpha=qi,e.depthWrite=!1,e.side=dn,e.userData.opticalOrder=t.order)}function Yf(i){return i.replace("#include <opaque_fragment>",`diffuseColor.a = min(0.86, opacity + 0.42 * pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 3.0));
     #include <opaque_fragment>`)}var Zl=class{palettes=new Map;disposeSources(){for(let e of this.palettes.values())e.high.dispose(),e.low?.dispose();this.palettes.clear()}register(e,t,n){this.palettes.set(e,{high:t,low:n})}prepare(e){for(let t of e.children){let n=t,s=n.userData.surface,r=this.palettes.get(s);if(!r){n.userData.themeAmount=ar(n.material,"Printed_Canvas");continue}let a=r.high.clone(),o={value:0},c={value:0};n.material=a,a.userData.opticalOrder&&(n.renderOrder=a.userData.opticalOrder),n.userData.appearance=o,n.userData.glassClarity=c,a.onBeforeCompile=l=>{a.userData.opticalOrder&&(l.fragmentShader=Yf(l.fragmentShader)),l.uniforms.archiveQuality=o,l.uniforms.archiveClarity=c,l.fragmentShader=`uniform float archiveQuality;
uniform float archiveClarity;
`+l.fragmentShader,s==="Frosted_Polymer"?(l.vertexShader=`varying float vArchiveHeight;
varying vec2 vArchiveProjectedAxis;
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),l.fragmentShader=`varying float vArchiveHeight;
varying vec2 vArchiveProjectedAxis;
`+Wf+l.fragmentShader,l.vertexShader=l.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
vArchiveProjectedAxis = 1.85 * vec2(projectionMatrix[0][0] * modelViewMatrix[1][0], projectionMatrix[1][1] * modelViewMatrix[1][1]) / max(0.0001, abs(mvPosition.z));`),l.fragmentShader=l.fragmentShader.replace("#include <transmission_pars_fragment>",Gf+`
`+Ve.transmission_pars_fragment.replace("float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );","float lod = archiveTransmissionLod(roughness, ior, transmissionSamplerSize);")),l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vArchiveHeight)), vec3(1.0), archiveQuality);`),l.fragmentShader=l.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(mix(0.28, ${.42}, archiveQuality), 0.025, glassRevealAtHeight(archiveClarity, vArchiveHeight));`)):r.low||(l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float coverage = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
if (archiveQuality <= coverage) discard;`))},a.customProgramCacheKey=()=>`archive-surface-clarity-${s}-${!!r.low}`,n.userData.subduedIndex={value:0},n.userData.themeAmount=ar(a,s,!1,n.userData.subduedIndex)}}setClarity(e,t){let n=Pe.clamp(t,0,1);e.traverse(s=>{if(!(s instanceof ke)||!s.userData.glassClarity||(s.userData.glassClarity.value=n,s.userData.surface!=="Frosted_Polymer"))return;let r=s.material,a=this.palettes.get("Frosted_Polymer"),o=s.userData.appearance.value,c=l=>Pe.lerp(a.low?.[l]??a.high[l],a.high[l],o);r.thickness=Pe.lerp(c("thickness"),.018,n),r.transmission=Pe.lerp(c("transmission"),.985,n),r.attenuationDistance=Pe.lerp(c("attenuationDistance"),8,n)})}setTheme(e,t,n=!1){e.traverse(s=>{s.userData.themeAmount&&(s.userData.themeAmount.value=t),s.userData.subduedIndex&&(s.userData.subduedIndex.value=Pe.clamp(Number(n),0,1))})}apply(e,t){for(let n of e.children){let s=n,r=this.palettes.get(s.userData.surface);if(!r){s.material.opacity=t;continue}s.userData.appearance.value=t;let{high:a,low:o}=r;if(!o)continue;let c=s.material;c.color.copy(o.color).lerp(a.color,t),c.attenuationColor&&o.attenuationColor&&a.attenuationColor&&(c.attenuationColor.copy(o.attenuationColor).lerp(a.attenuationColor,t),c.attenuationDistance=Number.isFinite(o.attenuationDistance)&&Number.isFinite(a.attenuationDistance)?Pe.lerp(o.attenuationDistance,a.attenuationDistance,t):a.attenuationDistance);for(let l of["roughness","metalness","transmission","thickness","clearcoat","clearcoatRoughness"])c[l]=Pe.lerp(o[l]??0,a[l]??0,t);a.transmission>0&&(c.transmission=Math.max(1e-6,c.transmission))}}dispose(e){for(let t of e.children){let n=t,s=n.material;n.userData.surface||s.map?.dispose(),s.dispose()}}};var FA=i=>Math.max(0,Math.min(1,i)),ds=i=>{let e=FA(i);return e*e*e*(10+e*(-15+e*6))};function fu(i,e){if(e<=i[0][0])return i[0][1];if(e>=i[i.length-1][0])return i[i.length-1][1];let t=l=>(i[l+1][1]-i[l][1])/(i[l+1][0]-i[l][0]),n=l=>{if(l===0||l===i.length-1)return 0;let h=t(l-1),d=t(l);if(h*d<=0)return 0;let u=i[l][0]-i[l-1][0],f=i[l+1][0]-i[l][0],g=2*f+u,v=f+2*u;return(g+v)/(g/h+v/d)},s=0;for(;e>i[s+1][0];)s++;let r=i[s+1][0]-i[s][0],a=(e-i[s][0])/r,o=a*a,c=o*a;return(2*c-3*o+1)*i[s][1]+(c-2*o+a)*r*n(s)+(-2*c+3*o)*i[s+1][1]+(c-o)*r*n(s+1)}var BA=[[34.24,0],[34.4,.19],[34.64,.57],[34.96,.79],[35.28,.92],[35.6,.973],[36.04,1]],kA=[[38.84,0],[38.92,.28],[39,.51],[39.16,.74],[39.32,.94],[39.56,1]],zA=[[37.72,1],[37.88,.72],[38,.38],[38.12,.22],[38.24,.14],[38.4,.075],[38.64,.024],[38.84,0]];function cr(i){let e=fu(BA,i),t=fu(zA,i),n=[];i>=34.24&&i<36.04&&e>0?n.push([0,e*.5],[1-e*.5,1]):i>=36.04&&i<38.84&&n.push([.5-t*.5,.5+t*.5]);let s=ds((i-34.2)/.12)*(1-ds((i-37.76)/.56));return{time:i,intervals:n,markers:s,point:ds((i-38.58)/.2)*(1-ds((i-39.08)/.22)),label:ds((i-34.32)/.36)*(1-ds((i-37.68)/.24)),labelValue:ds((i-35.64)/.56),clarity:fu(kA,i),phase:i<34.24?"waiting":i<36.04?"joining":i<37.72?"connected":i<38.84?"retracting":i<39.56?"revealing":"clear"}}var Jl=class{clarity=0;active=!1;elapsed=null;frame=cr(-1);enter(e=!1){this.active||(this.active=!0,this.elapsed=e?(39.56-34.12)/1.5:null,e&&this.finish())}leave(){this.active=!1,this.elapsed=null,this.frame=cr(-1)}select(e=0){this.leave(),this.clarity=e}finish(){this.elapsed=(39.56-34.12)/1.5,this.clarity=1,this.frame=cr(39.56)}update(e,t,n,s){if(s!==void 0){this.frame=cr(s),this.clarity=this.frame.clarity;return}if(!this.active){this.clarity=n?0:this.clarity*Math.exp(-Math.max(0,e)*9),this.clarity<1e-4&&(this.clarity=0),this.frame=cr(-1);return}if(n){this.finish();return}this.elapsed===null&&t?this.elapsed=0:this.elapsed!==null&&(this.elapsed=Math.min(this.elapsed+Math.max(0,e),(39.56-34.12)/1.5)),this.elapsed!==null&&(this.frame=cr(34.12+this.elapsed*1.5),this.clarity=this.frame.clarity>this.clarity?this.frame.clarity:this.frame.phase==="clear"?1:this.clarity*Math.exp(-Math.max(0,e)*9))}};var qf='<path d="M156 75C127 48 103 15 70 15C37 15 15 39 15 70S38 128 70 128C103 128 127 96 176 52M155 75C182 99 208 128 240 128C273 128 295 105 295 73S273 15 240 15C221 15 207 23 192 38" fill="none" stroke="currentColor" stroke-width="26"/><path d="M44 70h50M69 45v50M219 70h44" fill="none" stroke="currentColor" stroke-width="15"/>',Qf=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 145" color="#171713">${qf}</svg>`,zS=`<svg viewBox="0 0 310 185" aria-label="Rhine Lab" role="img">${qf}<text x="165" y="174" text-anchor="middle" font-family="MiSans,sans-serif" font-size="16" font-weight="700" letter-spacing="22">RHINE\xB7LAB</text></svg>`;var HA=[2,28,55,81,103,129,154,166],HS=`<h1>RHINE LAB</h1><div>SYNTHESIZE INFORMATION</div><p><span class="brand-analysis" role="img" aria-label="ANALYSIS">${[..."ANALYSIS"].map((i,e)=>`<span aria-hidden="true" style="left:${HA[e]}px">${i}</span>`).join("")}</span> <b>OS</b></p>`;function Kf(i,e){i=Math.max(1,i),e=Math.max(1,e);let t=Math.min(e/1080,i/1280);return{width:i/t,height:e/t,scale:t,kind:"opening"}}function jf(i,e,t,n=!1){if(i=Math.max(1,i),e=Math.max(1,e),n)return{width:1920,height:1080,scale:Math.min(i/1920,e/1080),kind:"cinematic"};let s=i/e<1.05,r=s||i<1100||t&&e<600,a=r?1:e/1080;return{width:i/a,height:e/a,scale:a,kind:s?"portrait":r?"compact":"desktop"}}function Zf(i,e,t,n,s){let r=i/e,a=r<1.05,o=t+(5.9-t)*n,c=Math.max(6.3/r,3.7*e/Math.max(100,.54*e-156));return{span:a?Math.max(o,8.4/r+(c-8.4/r)*n):Math.max(o,o*(16/9)/r),portrait:a,previewY:a?.36:.5,detailX:a?.5:s?.27:550/1920,detailY:a?.27+34/e:s?.49:560/1080}}var $l=class{active=!1;moved=!1;value={lane:0,row:0};x=0;y=0;inverse=null;samples=[];lastMotion=-1/0;motionDirection={x:0,y:0};pointer={x:0,y:0};start(e,t,n,s=0){this.active=!1,this.moved=!1,this.x=e,this.y=t,this.value={lane:0,row:0},this.samples=[{value:this.value,time:s}],this.lastMotion=-1/0,this.motionDirection={x:0,y:0},this.pointer={x:e,y:t};let{lane:r,row:a}=n,o=r.x*a.y-a.x*r.y,c=Math.hypot(r.x,r.y)*Math.hypot(a.x,a.y);this.inverse=Number.isFinite(c)&&c>0&&Math.abs(o)>c*.001?{lane:{x:a.y/o,y:-a.x/o},row:{x:-r.y/o,y:r.x/o}}:null}move(e,t,n){let s=e-this.x,r=t-this.y,a=Math.hypot(s,r);if(a>7&&(this.moved=!0),!this.inverse||!this.active&&a<10)return;this.active=!0;let o={lane:s*this.inverse.lane.x+r*this.inverse.lane.y,row:s*this.inverse.row.x+r*this.inverse.row.y},c=this.samples.at(-1);if(c){let l={x:e-this.pointer.x,y:t-this.pointer.y};Math.hypot(l.x,l.y)>1e-9&&(this.lastMotion=n,l.x*this.motionDirection.x+l.y*this.motionDirection.y<0&&(this.samples=[c]),this.motionDirection=l)}this.pointer={x:e,y:t},this.value=o,c?.time===n?this.samples[this.samples.length-1]={value:o,time:n}:this.samples.push({value:o,time:n}),this.samples=this.samples.filter(l=>n-l.time<=120).slice(-32)}releaseVelocity(e,t){let n=this.samples[0],s=this.samples.at(-1);if(t||!n||!s||e-this.lastMotion>80||s.time-n.time<8)return{lane:0,row:0};let r=1e3/(s.time-n.time);return{lane:(s.value.lane-n.value.lane)*r,row:(s.value.row-n.value.row)*r}}},ec=class{value;velocity;phase;target;friction=2.4;constructor(e,t){this.value=e,this.velocity=t,this.phase=Math.abs(t)>=.75?"coasting":"snapping",this.target=Math.round(e)}step(e,t=this.phase==="coasting"){if(t){let n=Math.exp(-this.friction*e);this.value+=this.velocity*(1-n)/this.friction,this.velocity*=n,Math.abs(this.velocity)<.6&&(this.target=Math.round(this.value+this.velocity/this.friction),this.phase="snapping")}else if(this.phase==="snapping"){let s=this.value-this.target,r=this.velocity+10*s,a=Math.exp(-10*e);this.value=this.target+(s+r*e)*a,this.velocity=(this.velocity-10*r*e)*a,Math.abs(this.value-this.target)<1e-4&&Math.abs(this.velocity)<.005&&(this.value=this.target,this.velocity=0,this.phase="idle")}}},tc=class{lane;row;constructor(e,t){this.lane=new ec(e.lane,t.lane),this.row=new ec(e.row,t.row)}get phase(){return this.lane.phase==="coasting"||this.row.phase==="coasting"?"coasting":this.lane.phase==="idle"&&this.row.phase==="idle"?"idle":"snapping"}get value(){return{lane:this.lane.value,row:this.row.value}}get velocity(){return{lane:this.lane.velocity,row:this.row.velocity}}step(e){let t=this.phase==="coasting";this.lane.step(e,t),this.row.step(e,t)}};var nc=i=>`./${i.replace(/^\//,"")}`;var VA={boot:!0,selectionWave:!0,idleWave:!0,pointerParallax:!0,dragMomentum:!0,selectionTransition:!0,detailTransition:!0,modelDecryption:!0,documentReveal:!0,rollingText:!0,rollingNumbers:!0,surfaceTransitions:!0,viewerNavigation:!0,viewerModelTransition:!0},GA={boot:!1,selectionWave:!1,idleWave:!1,pointerParallax:!1,dragMomentum:!1,selectionTransition:!1,detailTransition:!1,modelDecryption:!1,documentReveal:!1,rollingText:!1,rollingNumbers:!1,surfaceTransitions:!1,viewerNavigation:!1,viewerModelTransition:!1};function wa(){return{...VA}}function ic(){return{...GA}}var Jt=i=>(i=Math.max(0,Math.min(1,i)),i*i*i*(10+i*(-15+6*i))),sc=(i,e)=>Math.exp(-.5*(i/e)**2);function pu(i,e,t){let n=t-22;if(n<=0||n>=4.35)return 0;let s=i+(e-2)*.65,r=Jt(n/.32),a=3+n*19,o=32-(n-2.3)*24,c=l=>2.5*sc(l,3.8)-.58*sc(l-6,3.5);return r*(c(s-a)*(1-Jt((n-2.15)/.65))+c(s-o)*Jt((n-2.17)/.32)*(1-Jt((n-3.5)/.85)))}function Jf(i){return .4*Jt((i-25.58)/.82)+2.95*Jt((i-27.55)/1.3)}function rc(i,e){let t=e-25.05-Math.abs(i)*.065,n=Math.max(-.42,2.15-.17*(Math.sqrt(i*i+1)-1)),s=Jt(t/.62),r=t>0?Math.sin(t*5.1)*Math.exp(-t*1.3):0;return n*(s+.18*r*Jt(t/.16))}function $f(i,e){return e<0||e>3.2?0:.8*Jt(e/.2)*Math.exp(-e*1.15)*Math.cos((i-e*8)*.58)*sc(i-e*8,3.4)}function ep(i,e){return Jt(i/2.5)*Math.max(0,Math.cos((i-e*8)*.58))}function mu(i,e,t=1){return 1+(.25+.75*sc(i-e,.55)-1)*Jt(t)}function tp(i,e,t){return .075*Math.sin(t*Math.PI*2/8+i*.3-e*.45)+.027*Math.sin(t*Math.PI*2/13-i*.17+e*.3)}function np(i,e,t,n=12,s=2){let r=Jt((t-24.95)/.45),a=Jt((t-25.4)/.95),o=t+.3*r*(1-a);return pu(i,e,t)*(1-r)+rc(i-n,o)*mu(e,s,(t-25.4)/.95)}var gu=4.05,WA=.001;function xu(i,e,t=!1){let n=i*Math.exp(-e*(t?35:7));return Math.abs(n)<=WA?0:n}function fs(i,e,t,n){let s=i.value-e,r=i.velocity+t*s,a=Math.exp(-t*n);i.value=e+(s+r*n)*a,i.velocity=(i.velocity-t*r*n)*a}var _t=i=>(i=Pe.clamp(i,0,1),i*i*i*(i*(i*6-15)+10)),ac=class{constructor(e,t=$f,n=!1,s="baseline"){this.container=e;this.selectionPulse=t;this.deferSelectionPulse=n;this.lightingLook=s;this.renderer=new wl({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.info.autoReset=!1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.type=Ro,this.renderer.toneMapping=ts,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.setAttribute("aria-label","\u4E09\u7EF4\u7814\u7A76\u6863\u6848\u9635\u5217\uFF0C\u70B9\u51FB\u9009\u62E9\uFF0C\u5DE6\u53F3\u62D6\u52A8\u5207\u5217\uFF0C\u4E0A\u4E0B\u62D6\u52A8\u6216\u6EDA\u8F6E\u5207\u6362\u5217\u5185\u6863\u6848"),e.appendChild(this.renderer.domElement),this.renderer.domElement.addEventListener("webglcontextrestored",()=>{this.renderState.invalidate(),this.shadowState.invalidate()},{signal:this.inputEvents.signal}),this.scene.background=new ve("#eae5e1"),this.scene.matrixWorldAutoUpdate=!1,this.scene.fog=new Er("#eae5e1",22,47),this.light=Bf(this.renderer,this.scene,s),this.light.castShadow=!0,Object.assign(this.light.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:.1,far:45}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.normalBias=s==="refined"?.018:.035,this.light.shadow.bias=s==="refined"?-12e-5:-3e-4,this.light.shadow.radius=4;let r=new ke(new hi(200,200),new An({color:"#d8c9b9",roughness:.95}));r.rotation.x=-Math.PI/2,r.name="archive-floor",r.position.y=-4.63,r.receiveShadow=!0,this.scene.add(r),this.camera.position.set(-62.26,35.98,43.28),this.cameraAim.set(-.5,1.1,.4),this.camera.fov=6.15,this.camera.lookAt(this.cameraAim),this.composer=new Xl(this.renderer),this.composer.addPass(new Yl(this.scene,this.camera)),this.ao=new Aa(this.scene,this.camera,e.clientWidth,e.clientHeight),this.ao.kernelRadius=s==="refined"?.44:.38,this.ao.minDistance=.001,this.ao.maxDistance=.09,this.composer.addPass(this.ao),this.bokeh=new Fl(this.scene,this.camera,{focus:25,aperture:.0018,maxblur:.011},()=>this.ao),this.composer.addPass(this.bokeh),this.smaa.enabled=!1,this.composer.addPass(this.smaa),this.composer.addPass(new ql),this.bindPointer()}inputEvents=new AbortController;presence=1;presenceTarget=1;setPresentationVisible(e,t=!1){this.presenceTarget=Number(e),t&&(this.presence=this.presenceTarget),e||this.cancelPointer()}get presentationHidden(){return this.presenceTarget===0&&this.presence===0}presentationDrop(e){let t=.15*(1+Math.tanh((e.row-this.selectedCell.row)*.1+(e.lane-this.selectedCell.lane)*.25));return 35*Math.pow(Pe.clamp((1-this.presence-t)/.7,0,1),2)}revealImmediately(){this.reveal=this.targetReveal}dispose(){this.inputEvents.abort(),this.cancelPointer(),Oh(this.scene),this.appearance.disposeSources(),this.model.clear(),this.outgoing=[],this.instances=[],this.assemblyTemplate?.then(Oh).catch(()=>{}),this.assemblyTemplate=void 0,this.light.shadow.map?.dispose();for(let e of this.composer.passes)e.dispose();this.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove(),this.loaded=!1}uiOnlyParallax=!1;theme=new Bl;subduedIndex={value:0};selectedIndexOnly=!1;superPerformance=!1;setSuperPerformance(e){if(this.superPerformance!==e){this.superPerformance=e;for(let t of this.instances){let n=t.userData.fullMaterial??=t.material;if(e&&!t.userData.fastMaterial){let s=n.clone();s.onBeforeCompile=n.onBeforeCompile,s.customProgramCacheKey=n.customProgramCacheKey.bind(n),s.transmission=0,s.clearcoat=0,s.roughness=Math.max(.45,n.roughness),t.userData.fastMaterial=s}t.material=e?t.userData.fastMaterial:n,t.visible=!e||n.name.replace(/\.\d+$/,"")!=="Titanium_Fasteners"}this.resize()}}setSelectedIndexAccent(e){this.selectedIndexOnly=e}themeAttribute;get themeAmount(){return this.theme.background(performance.now()/1e3)}setTheme(e,t=!1){this.theme.set(e,performance.now()/1e3,this.selectedCell,t)}playfield={enabled:!1,bands:Uh(),strength:1,flatten:0,target:null,breathing:!0};flatMix=0;rhythm=new kl;rhythmStyle="legacy";setRhythmStyle(e){this.rhythmStyle=e}relayLifts=new Map;relayPoints=new Map;relayActive=!1;onRelayPick;setPlayfield(e,t,n,s,r,a=!0){this.playfield={enabled:e,bands:t,strength:n,flatten:s,target:r,breathing:a}}setRelayActive(e){e!==this.relayActive&&(this.cancelPointer(),this.setHover(null),this.relayActive=e,this.pointer.set(0,0))}relayPulse(e){let t=this.relayPoints.get(e)?.cell;t&&!this.reduced&&this.emitPulse(t)}projectRelay(e){let t=this.relayPoints.get(e);if(!t)return null;let n=t.point.clone().project(this.camera),s=this.renderer.domElement.getBoundingClientRect();return{x:s.left+(n.x+1)*s.width/2,y:s.top+(1-n.y)*s.height/2}}relayCandidates(){let e=this.renderer.domElement.getBoundingClientRect();return this.scene.updateMatrixWorld(!0),[...this.relayPoints.keys()].filter(t=>{let n=this.projectRelay(t),s=(n.x-e.left)/e.width,r=(n.y-e.top)/e.height;if(s<.18||s>.82||r<.32||r>.76)return!1;let a=this.pickCell(n.x,n.y);return a&&jn(a)===t})}renderer;scene=new ci;camera=new bt(34,16/9,5,300);composer;ao;bokeh;instances=[];matrixUpdates;themeUpdates;renderState=new fa;shadowState=new fa;renderedFrames=0;reusedFrames=0;visibility=new Dl;drawCoverage=new Ll;shadowCoverage;instanceCapacity=Lh*ua;drawnCells=[];extraCoverage=!1;setArchiveCoverage(e){this.extraCoverage=e}model=new $t;appearance=new Zl;decryption=new Jl;cursor=new De;raycaster=new Xr;dummy=new lt;cells=[];selectedCell={lane:2,row:12};looping=!1;coordinateOrigin={lane:0,row:0};lift={value:0,velocity:0};rail={value:0,velocity:0};shoulder={value:12,velocity:0};laneFocus={value:2,velocity:0};columnCamera={value:0,velocity:0};returnY=null;canInspect=!1;clearance=0;pulseGain=1;idleGain=0;lastInteraction=0;scanTime=29.1;scanBlend=0;cameraAim=new I;outgoing=[];pulses=[];pendingPulse=null;selectedSlot=76;detail=0;targetDetail=0;reveal=0;targetReveal=0;last=0;pointer=new De;dragging=!1;hoverCell=null;hoverLifts=new Map;archiveDrag=new $l;dragTrack=null;navigatingDrag=!1;archiveMomentum=null;holdingArchive=!1;cancelPointer=()=>{};pendingHover=null;flushHover=()=>{};rotation=0;targetRotation=0;light;clock=0;loaded=!1;labelCanvas=document.createElement("canvas");labelTexture;labelMark=new Image;motion=wa();quality=jl(void 0);appliedQuality="";smaa=new Kl;aoKernelSize=32;displayHeight=0;layoutKind="";onSelect;onHover;onNavigate;async load(e=nc("assets/archive-cassette.glb")){this.labelMark.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(Qf)}`,await this.labelMark.decode();let t=await window.parent.MotionKit.load.loader(async()=>{const result=await new _a().loadAsync(e);await Promise.all([this.smaa._areaTexture.image,this.smaa._searchTexture.image].map(image=>image.complete?Promise.resolve():new Promise((resolve,reject)=>{image.addEventListener("load",resolve,{once:true});image.addEventListener("error",()=>reject(new Error("SMAA texture failed")),{once:true})})));this.resize();return result;},window);t.scene.updateMatrixWorld(!0);let n=[];t.scene.traverse(a=>{a instanceof ke&&n.push(a)});let s=Lh*ua;for(let a=0;a<s;a++){let o=Il(a);this.cells.push(o)}for(let a of n){let o=a.geometry.clone().applyMatrix4(a.matrixWorld).scale(1,1,1),c=a.material,l=c.name.replace(/\.\d+$/,""),h=c.clone();if(h.envMapIntensity=.6,l==="Frosted_Polymer"&&(h.color.set("#fffdfa"),h.transmission=.9,h.thickness=.12,h.roughness=.21,h.ior=1.46,h.attenuationColor=new ve("#eee6df"),h.attenuationDistance=2),l==="Internal_Ceramic"&&(h.color.set(this.lightingLook==="refined"?"#c4baae":"#c7beb6"),h.roughness=.6),l==="Printed_Label"&&h.color.set("#eae5dc"),l==="Ivory_Edges"&&(h.color.set("#f0e7df"),h.roughness=.31,h.transmission=.65,h.thickness=.04),l==="Optical_Diffuser"&&(h.color.set("#e2dad4"),h.transmission=0,h.roughness=.7),l==="Subsurface_Optics"&&(h.color.set(this.lightingLook==="refined"?"#b9a796":"#b9aba1"),h.roughness=.48,h.metalness=.05),l==="Optical_Edges"&&(h.transmission=0,h.color.set(this.lightingLook==="refined"?"#d8c7b5":"#d4c7be"),h.roughness=.26,h.metalness=.08),Xf(l,h),l==="Carbon_Ink")continue;let d=new ke(o,h);if(d.userData.surface=l,d.castShadow=l==="Optical_Diffuser",d.receiveShadow=!0,this.model.add(d),!["Frosted_Polymer","Ivory_Edges","Titanium_Fasteners","Index_Inlay","Optical_Diffuser"].includes(l)){this.appearance.register(l,h);continue}let u=h.clone();l==="Frosted_Polymer"&&(u.transmission=.78,this.lightingLook==="refined"&&(u.thickness=.28,u.attenuationColor.set("#d4c7b4"),u.attenuationDistance=1.2),u.transparent=!1,u.color.set("#fff7ed"),u.onBeforeCompile=g=>{g.vertexShader=`varying float vPanelHeight;
`+g.vertexShader,g.vertexShader=g.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPanelHeight = position.y / 3.7;`),g.fragmentShader=`varying float vPanelHeight;
`+g.fragmentShader,g.fragmentShader=g.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vPanelHeight));`)},u.roughness=.28,u.clearcoat=.3,u.clearcoatRoughness=.25),l==="Optical_Diffuser"&&u.color.set("#806447"),l==="Ivory_Edges"&&(u.transmission=0,u.color.set(this.lightingLook==="refined"?"#dcc9b0":"#fff5e9"),u.roughness=.38),l==="Index_Inlay"&&(u.color.set("#e4d6c5"),u.metalness=.05),this.appearance.register(l,h,u),this.themeAttribute??=new tn(new Float32Array(s),1).setUsage(gi),o.setAttribute("archiveTheme",this.themeAttribute),ar(u,l,!0,this.subduedIndex);let f=new jt(o,u,s);f.instanceMatrix=this.instances[0]?.instanceMatrix??f.instanceMatrix.setUsage(gi),f.castShadow=l==="Optical_Diffuser",f.receiveShadow=!0,f.frustumCulled=!1,this.instances.push(f),this.scene.add(f)}this.shadowCoverage=new Nl(this.instances.find(a=>a.castShadow)),this.scene.add(this.shadowCoverage.mesh),this.labelCanvas.width=1024,this.labelCanvas.height=440,this.labelTexture=new $i(this.labelCanvas),this.labelTexture.colorSpace=vt,this.labelTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy();let r=new ke(new hi(.99,.46),new Kt({map:this.labelTexture,toneMapped:!1,transparent:!0,depthWrite:!1}));r.position.set(-1.36,3.04,.255),this.model.add(r),this.appearance.prepare(this.model),this.appearance.apply(this.model,0),this.drawLabel(0),this.scene.add(this.model),this.model.position.copy(this.cellPosition(Il(this.selectedSlot))),this.loaded=!0}assemblyTemplate;loadAssemblyTemplate(){return this.assemblyTemplate??=new _a().loadAsync(nc("assets/archive-assembly.glb")).then(e=>(e.scene.updateMatrixWorld(!0),e.scene)).catch(e=>{throw this.assemblyTemplate=void 0,e})}async prepareFilmResources(e){await this.loadAssemblyTemplate(),e()}async createAssemblyModel(){let e=await this.loadAssemblyTemplate(),t=new $t,n=[];e.traverse(o=>{if(!(o instanceof ke))return;let c=o.material.name.replace(/\.\d+$/,""),l=new ke(o.geometry.clone().applyMatrix4(o.matrixWorld),o.material);l.userData.surface=c,l.userData.assemblyPart=o.userData.assemblyPart,t.add(l),n.push(l)}),this.appearance.prepare(t),this.appearance.apply(t,1),this.appearance.setClarity(t,this.modelClarity()),this.appearance.setTheme(t,this.themeAmount);let s=document.createElement("canvas");s.width=this.labelCanvas.width,s.height=this.labelCanvas.height,s.getContext("2d").drawImage(this.labelCanvas,0,0);let r=new $i(s);r.colorSpace=vt,r.anisotropy=this.renderer.capabilities.getMaxAnisotropy();let a=new ke(new hi(.99,.46),new Kt({map:r,toneMapped:!1,transparent:!0,depthWrite:!1}));return a.position.set(-1.36,3.04,.255),a.userData.assemblyPart="cover",a.userData.themeAmount=ar(a.material,"Printed_Canvas"),a.userData.themeAmount.value=this.themeAmount,t.add(a),n.push(a),{model:t,setClarity:o=>this.appearance.setClarity(t,o),dispose:()=>{for(let o of n)o.geometry.dispose(),o.material.dispose();r.dispose()}}}setMode(e){if(this.cancelPointer(),this.setHover(null),e==="detail"?this.decryption.enter(this.scanBlend>.9&&this.decryption.clarity>.999):this.decryption.leave(),e==="hidden"&&this.decryption.select(),e!=="archive"&&(this.pendingPulse=null),this.looping=e!=="hidden",!this.looping){let t=Ai(bf(this.selectedSlot));this.selectedCell={lane:t.lane,row:t.row},this.coordinateOrigin={lane:0,row:0};for(let n of this.outgoing)this.scene.remove(n.group),this.appearance.dispose(n.group);this.outgoing=[]}this.lastInteraction=this.clock,this.targetReveal=e==="hidden"?0:1,this.targetDetail=e==="detail"?1:0,this.dragging=!1,e!=="detail"?(this.targetRotation=0,this.rotation!==0&&(this.returnY=this.model.position.y)):this.returnY=null}setReduced(e){this.setMotion(e?ic():wa())}setMotion(e){if((!e.pointerParallax||!e.dragMomentum)&&(this.motion.pointerParallax||this.motion.dragMomentum)&&this.cancelPointer(),e.dragMomentum||(this.archiveMomentum=null,this.columnCamera.velocity=0,this.rail.velocity=0),e.pointerParallax||this.pointer.set(0,0),e.selectionWave||(this.pulses=[]),e.idleWave||(this.idleGain=0),this.motion={...e},!e.modelDecryption){this.appearance.setClarity(this.model,this.modelClarity());for(let t of this.outgoing)t.clarity=0,this.appearance.setClarity(t.group,0)}}get reduced(){return Object.values(this.motion).every(e=>!e)}modelClarity(){return this.motion.modelDecryption?this.decryption.clarity:this.targetDetail}setQuality(e){let t=typeof e=="boolean"?jl(void 0,e):jl(e),n=JSON.stringify(t);if(this.appliedQuality===n)return;if(this.appliedQuality=n,this.quality=t,t.aoSamples&&t.aoSamples!==this.aoKernelSize){let r=this.ao;this.ao=new Aa(this.scene,this.camera,1,1,t.aoSamples),this.ao.kernelRadius=r.kernelRadius,this.ao.minDistance=r.minDistance,this.ao.maxDistance=r.maxDistance;let a=this.composer.passes.indexOf(r);this.composer.removePass(r),this.composer.insertPass(this.ao,a),r.dispose(),this.aoKernelSize=t.aoSamples}this.ao.enabled=t.aoSamples>0,this.bokeh.enabled=t.depthOfField>0,this.smaa.enabled=t.antialias==="smaa",this.renderer.shadowMap.enabled=t.shadows>0;let s=Math.min(t.shadows||1024,this.renderer.capabilities.maxTextureSize);this.light.shadow.mapSize.x!==s&&(this.light.shadow.map?.dispose(),this.light.shadow.map=null,this.light.shadow.mapSize.set(s,s)),this.light.shadow.needsUpdate=!0,Hf(this.scene,this.renderer,t),this.resize()}cellPosition(e){return new I((e.lane-2)*an,-4.6,(e.row-15.5)*on)}rebaseCoordinates(){let e={lane:Math.abs(this.selectedCell.lane)>2048?Math.round((this.selectedCell.lane-2)/5)*5:0,row:Math.abs(this.selectedCell.row)>2048?Math.floor((this.selectedCell.row-12)/8)*8:0};if(!(!e.lane&&!e.row)){this.setHover(null),this.hoverLifts.clear(),this.selectedCell.lane-=e.lane,this.selectedCell.row-=e.row,this.coordinateOrigin.lane+=e.lane,this.coordinateOrigin.row+=e.row,this.laneFocus.value-=e.lane,this.shoulder.value-=e.row,this.columnCamera.value-=e.lane*an,this.rail.value+=e.row*on;for(let t of this.outgoing)t.cell.lane-=e.lane,t.cell.row-=e.row;for(let t of this.pulses)t.lane-=e.lane,t.row-=e.row;this.pendingPulse&&(this.pendingPulse.lane-=e.lane,this.pendingPulse.row-=e.row)}}select(e,t){this.navigatingDrag||this.cancelPointer(),this.setHover(null),this.lastInteraction=this.clock;let n=Ai(e).slot,s=Ai(e),r=this.looping?Ef(e,this.selectedCell,t):{lane:s.lane,row:s.row},a=!sr(r,this.selectedCell);if(this.looping&&a&&this.loaded&&this.lift.value>1e-4){let c=this.model.clone(!0),l=c.children[c.children.length-1],h=document.createElement("canvas");h.width=1024,h.height=440,h.getContext("2d").drawImage(this.labelCanvas,0,0);let d=new $i(h);d.colorSpace=vt,l.material=new Kt({map:d,toneMapped:!1,transparent:!0,depthWrite:!1}),this.appearance.prepare(c),this.appearance.apply(c,_t(this.lift.value/.4)),this.appearance.setClarity(c,this.modelClarity()),this.scene.add(c),this.outgoing.push({group:c,slot:this.selectedSlot,cell:{...this.selectedCell},lift:{...this.lift},returnY:c.rotation.y!==0?c.position.y:null,clarity:this.modelClarity()}),this.lift.value=0,this.lift.velocity=0}this.selectedSlot=n,this.selectedCell=r,a&&(this.decryption.select(),this.rotation=0,this.returnY=null);let o=this.outgoing.findIndex(c=>sr(c.cell,r));if(o>=0){let c=this.outgoing[o];this.lift={...c.lift},this.rotation=c.group.rotation.y,this.returnY=c.returnY,this.decryption.select(c.clarity),this.scene.remove(c.group),this.appearance.dispose(c.group),this.outgoing.splice(o,1)}this.deferSelectionPulse?this.pendingPulse=this.looping?{...r}:null:this.emitPulse(r),this.targetRotation=0,this.drawLabel(e)}emitPulse(e){this.pulses.push({...e,time:this.clock}),this.pulses=this.pulses.slice(-6)}drawLabel(e){if(!this.labelTexture)return;let t=this.labelCanvas.getContext("2d");t.fillStyle="#e6e2d9",t.fillRect(0,0,1024,440),t.fillStyle="#171713",t.fillRect(12,12,1e3,6),t.fillRect(12,419,1e3,3),t.font="bold 81px MiSans",t.fillText("RHINE LAB, LLC.",22,116),t.font="32px MiSans",t.fillStyle="#878476",t.fillText("INTERNAL DATABASE",25,174),t.fillStyle="#171713",t.font="bold 130px MiSans",t.fillText("NO."+String(e+1).padStart(3,"0"),22,360),t.fillRect(782,32,221,39),t.fillStyle="#eee9de",t.font="24px MiSans",t.fillText("R L / I S",809,61),t.fillStyle="#171713",t.font="bold 64px MiSans",t.fillText("INFO",830,143),t.drawImage(this.labelMark,790,242,210,98),this.labelTexture.needsUpdate=!0}ensureInstanceCapacity(e){if(e<=this.instanceCapacity)return;let t=Math.max(e,this.instanceCapacity*2),n=new tn(new Float32Array(t*16),16).setUsage(gi);n.array.set(this.instances[0].instanceMatrix.array);for(let r of this.instances)r.dispose(),r.instanceMatrix=n;let s=this.themeAttribute;this.themeAttribute=new tn(new Float32Array(t),1).setUsage(gi),s&&this.themeAttribute.array.set(s.array);for(let r of this.instances)r.geometry.setAttribute("archiveTheme",this.themeAttribute);this.matrixUpdates=new Zn(n),this.themeUpdates=new Zn(this.themeAttribute),this.instanceCapacity=t}resize(){this.renderState.invalidate();let e=this.container.clientWidth,t=this.container.clientHeight,n=this.container.closest("[data-layout]")?.dataset.layout??"",s=this.container.getBoundingClientRect().height;this.layoutKind==="cinematic"&&n!=="cinematic"&&this.displayHeight>0&&(this.camera.fov=Pe.radToDeg(2*Math.atan(Math.tan(Pe.degToRad(this.camera.fov/2))*s/this.displayHeight))),this.displayHeight=s,this.layoutKind=n;let r=Vf(this.renderer,this.composer,this.container,this.quality,this.superPerformance);this.ao.setSize(Math.max(1,Math.floor(r.width*this.quality.aoResolution)),Math.max(1,Math.floor(r.height*this.quality.aoResolution))),this.ao.setSharing(this.ao.enabled&&this.bokeh.enabled&&this.quality.aoResolution===1&&!this.superPerformance),this.container.dataset.renderQuality=JSON.stringify({...JSON.parse(this.container.dataset.renderQuality),aoSamples:this.ao.enabled?this.aoKernelSize:0,aoWidth:this.ao.width,aoHeight:this.ao.height,shadows:this.renderer.shadowMap.enabled?this.light.shadow.mapSize.x:0,depthOfField:this.bokeh.enabled?this.quality.depthOfField:0}),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}canBrowse(){return this.presenceTarget===1&&this.looping&&!this.targetDetail&&this.detail<.2&&this.reveal>=.8&&this.loaded&&!this.container.closest("[inert]")}setHover(e){!e&&!this.hoverCell||e&&this.hoverCell&&sr(e,this.hoverCell)||(this.hoverCell=e?{...e}:null,this.onHover?.(e?Pl(e):null))}pickCell(e,t){let n=this.renderer.domElement.getBoundingClientRect();this.cursor.set((e-n.left)/n.width*2-1,-(t-n.top)/n.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);let s=this.raycaster.intersectObjects([this.instances[0],this.model,...this.outgoing.map(a=>a.group)],!0)[0];if(!s)return null;if(s.instanceId!==void 0)return{...this.drawnCells[s.instanceId]};let r=s.object;for(;r;){let a=this.outgoing.find(o=>o.group===r);if(a)return{...a.cell};r=r.parent}return{...this.selectedCell}}trackCoordinate(e,t){return e==="lane"?t/an+2:(-t-2.17)/on+15.5}dragProjection(){this.model.updateMatrixWorld(!0),this.camera.updateMatrixWorld(!0);let e=this.model.localToWorld(new I(0,1.85,0)),t=this.renderer.domElement.getBoundingClientRect(),n=s=>{let r=e.clone().addScaledVector(s,-.5).project(this.camera),a=e.clone().addScaledVector(s,.5).project(this.camera);return{x:(a.x-r.x)*t.width/2,y:-(a.y-r.y)*t.height/2}};return{lane:n(new I(-an,0,0)),row:n(new I(0,0,-on))}}trackPosition(e,t){return e==="lane"?(t-2)*an:-2.17-(t-15.5)*on}navigatePlane(e){let t={lane:Math.round(e.lane),row:Math.round(e.row)};if(sr(t,this.selectedCell))return;let n={...this.selectedCell},s=Math.min(64,Math.max(Math.abs(t.lane-n.lane),Math.abs(t.row-n.row)));this.navigatingDrag=!0;try{for(let r=1;r<=s;r++){let a={lane:Math.round(n.lane+(t.lane-n.lane)*r/s),row:Math.round(n.row+(t.row-n.row)*r/s)};sr(a,this.selectedCell)||this.onSelect?.(Pl(a),a)}}finally{this.navigatingDrag=!1}}stopMomentum(){this.archiveMomentum&&(this.columnCamera.velocity=0,this.rail.velocity=0),this.archiveMomentum=null}bindPointer(){let e=this.renderer.domElement,t=null,n=0,s=0,r=0,a=!1,o=!1,c=!1,l={lane:0,row:0},h=0,d=0,u=new Set,f=p=>{if(p.pointerType!=="mouse"||!this.canBrowse()||this.archiveMomentum)return;let m=e.getBoundingClientRect();this.pointer.set((p.clientX-m.left)/m.width-.5,(p.clientY-m.top)/m.height-.5);let y=this.pickCell(p.clientX,p.clientY);this.setHover(y),e.style.cursor=y?"pointer":"grab"};this.flushHover=()=>{let p=this.pendingHover;this.pendingHover=null,p&&f(p)};let g=()=>{this.pendingHover=null;let p=t;t=null,this.dragging=!1,this.dragTrack=null,this.holdingArchive=!1,o=!1,this.setHover(null),e.style.cursor=this.canBrowse()?"grab":"default",p!==null&&e.hasPointerCapture(p)&&e.releasePointerCapture(p)};this.cancelPointer=()=>{c=!0,this.stopMomentum(),u.clear(),h=0,g()};let v=p=>{let m=!this.archiveDrag.active;for(let y of p.getCoalescedEvents?.()??[])this.archiveDrag.move(y.clientX,y.clientY,y.timeStamp);this.archiveDrag.move(p.clientX,p.clientY,p.timeStamp),a||=this.archiveDrag.moved,this.archiveDrag.active&&(m&&(l={lane:this.columnCamera.value,row:this.rail.value}),this.setHover(null),this.lastInteraction=this.clock,e.style.cursor="grabbing",this.dragTrack={lane:l.lane+this.archiveDrag.value.lane*an,row:l.row-this.archiveDrag.value.row*on},this.columnCamera.value=this.dragTrack.lane,this.rail.value=this.dragTrack.row,this.columnCamera.velocity=this.rail.velocity=0,this.navigatePlane({lane:this.trackCoordinate("lane",this.columnCamera.value),row:this.trackCoordinate("row",this.rail.value)}))};e.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"&&p.button!==0)&&!(!this.canBrowse()&&!this.canInspect)){if(this.pendingHover=null,u.add(p.pointerId),u.size>1){c=!0,g();return}t=p.pointerId,c=!1,a=this.archiveMomentum!==null,s=n=p.clientX,r=p.clientY,o=this.canBrowse(),this.stopMomentum(),o&&(this.columnCamera.velocity=0,this.rail.velocity=0),this.holdingArchive=o,this.dragging=!o&&this.canInspect,l={lane:this.columnCamera.value,row:this.rail.value},this.archiveDrag.start(p.clientX,p.clientY,this.dragProjection(),p.timeStamp),this.setHover(null),e.setPointerCapture(p.pointerId),this.relayActive&&(this.holdingArchive=!1,this.dragging=!1)}},{signal:this.inputEvents.signal}),e.addEventListener("pointermove",p=>{if(this.relayActive){p.pointerId===t&&(a||=Math.hypot(p.clientX-s,p.clientY-r)>7);return}if(!(t!==null&&p.pointerId!==t)){if(t===null){this.pendingHover={clientX:p.clientX,clientY:p.clientY,pointerType:p.pointerType};return}if(!c){if(a||=Math.hypot(p.clientX-s,p.clientY-r)>7,o){if(!this.canBrowse()){this.cancelPointer();return}v(p);return}this.dragging&&this.canInspect&&(this.targetRotation=Pe.clamp(this.targetRotation+(p.clientX-n)*.004,-.8,.8),n=p.clientX)}}},{signal:this.inputEvents.signal}),e.addEventListener("pointerup",p=>{if(u.delete(p.pointerId),p.pointerId===t){if(this.relayActive){if(!c&&!a){let m=this.pickCell(p.clientX,p.clientY);this.onRelayPick?.(m?jn(m):null)}g();return}if(!c&&o&&this.canBrowse()){if(v(p),this.archiveDrag.active)this.motion.dragMomentum&&(this.archiveMomentum={time:performance.now()/1e3,motion:new tc({lane:this.trackCoordinate("lane",this.columnCamera.value),row:this.trackCoordinate("row",this.rail.value)},this.archiveDrag.releaseVelocity(p.timeStamp,!1))});else if(!a){let m=this.pickCell(p.clientX,p.clientY);m&&this.onSelect?.(Pl(m),m)}}g()}},{signal:this.inputEvents.signal}),e.addEventListener("pointercancel",p=>{u.delete(p.pointerId),p.pointerId===t&&(c=!0,g())},{signal:this.inputEvents.signal}),e.addEventListener("lostpointercapture",p=>{u.delete(p.pointerId),p.pointerId===t&&(c=!0,g())},{signal:this.inputEvents.signal}),e.addEventListener("pointerleave",()=>{this.pendingHover=null,this.pointer.set(0,0),this.setHover(null)},{signal:this.inputEvents.signal}),e.addEventListener("wheel",p=>{if(this.relayActive){p.preventDefault();return}if(!this.canBrowse()||t!==null||p.ctrlKey||Math.abs(p.deltaX)>Math.abs(p.deltaY))return;p.preventDefault(),this.archiveMomentum&&this.stopMomentum();let m=performance.now(),y=Pe.clamp(p.deltaY*(p.deltaMode===1?40:p.deltaMode===2?e.clientHeight:1),-300,300);(m-d>180||Math.sign(y)!==Math.sign(h))&&(h=0),d=m,h+=y;let b=Math.min(3,Math.floor(Math.abs(h)/100));if(!b)return;let M=Math.sign(h);h-=M*b*100,this.navigatingDrag=!0;try{for(let T=0;T<b;T++)this.onNavigate?.("row",M)}finally{this.navigatingDrag=!1}},{passive:!1,signal:this.inputEvents.signal}),window.addEventListener("blur",()=>this.cancelPointer(),{signal:this.inputEvents.signal}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.cancelPointer()},{signal:this.inputEvents.signal}),window.addEventListener("resize",()=>this.cancelPointer(),{signal:this.inputEvents.signal}),window.addEventListener("pointerup",p=>u.delete(p.pointerId),{signal:this.inputEvents.signal}),window.addEventListener("pointercancel",p=>u.delete(p.pointerId),{signal:this.inputEvents.signal})}update(e,t){let n=Math.max(0,e-this.last||.016),s=Math.min(n,.05);if(this.last=e,this.clock=e,!this.loaded)return;this.flushHover();let r=this.motion.surfaceTransitions?Math.min(n,.25)/1.1:1;this.presence+=Math.sign(this.presenceTarget-this.presence)*Math.min(r,Math.abs(this.presenceTarget-this.presence)),this.renderer.domElement.style.opacity=String(Pe.clamp(this.presence/.16,0,1)),this.theme.beginFrame(),Rf(this.scene,this.renderer,this.themeAmount);let a=1-Math.exp(-s*(this.motion.selectionTransition?2.8:35)),o=1-Math.exp(-s*(this.motion.detailTransition?2.8:35));this.reveal=t?t.reveal:Pe.lerp(this.reveal,this.targetReveal,a),this.rotation=this.targetDetail?Pe.lerp(this.rotation,this.targetRotation,o):xu(this.rotation,s,!this.motion.detailTransition);let c=t?.time??29.1;t?(this.scanTime=c,this.scanBlend=1):(this.scanTime+=s,this.scanBlend*=Math.exp(-s*3)),this.canBrowse()||(this.setHover(null),(this.holdingArchive||this.archiveMomentum)&&this.cancelPointer()),this.looping&&!t&&!this.holdingArchive&&!this.archiveMomentum&&this.rebaseCoordinates();let l=t?null:this.archiveMomentum;l&&(l.motion.step(Math.min(Math.max(e-l.time,0),.25)),l.time=e,this.navigatePlane(l.motion.value),this.lastInteraction=e);let h=!t&&this.hoverCell?jn(this.hoverCell):null;h&&!this.hoverLifts.has(h)&&this.hoverLifts.set(h,0);for(let[L,V]of this.hoverLifts){let ae=L===h?.28:0,Z=t?0:this.motion.selectionTransition?Pe.lerp(V,ae,1-Math.exp(-s*14)):ae;ae===0&&Z<1e-4?this.hoverLifts.delete(L):this.hoverLifts.set(L,Z)}let d=L=>this.hoverLifts.get(jn(L))??0,u=this.cellPosition(this.selectedCell),f=this.selectedCell.row,g=this.selectedCell.lane;fs(this.shoulder,f,this.motion.selectionTransition?5:35,s),fs(this.laneFocus,g,this.motion.selectionTransition?4:35,s),!this.holdingArchive&&!l&&(fs(this.columnCamera,u.x,this.motion.selectionTransition?3.7:35,s),fs(this.rail,t?0:-2.17-u.z,this.motion.selectionTransition?3.7:35,s)),l&&(this.columnCamera.value=this.trackPosition("lane",l.motion.lane.value),this.rail.value=this.trackPosition("row",l.motion.row.value),this.columnCamera.velocity=l.motion.lane.velocity*an,this.rail.velocity=-l.motion.row.velocity*on,l.motion.phase==="idle"&&(this.archiveMomentum=null)),this.dragTrack&&!t&&(this.columnCamera.value=this.dragTrack.lane,this.rail.value=this.dragTrack.row,this.columnCamera.velocity=this.rail.velocity=0),t&&(this.rail.value=0,this.rail.velocity=0,this.lift.value=Jf(c),this.lift.velocity=0,this.shoulder.value=f,this.laneFocus.value=g,this.laneFocus.velocity=0,this.columnCamera.value=u.x,this.columnCamera.velocity=0);let v=t?0:this.columnCamera.value;this.pulses=this.pulses.filter(L=>e-L.time<3.2);let p=this.outgoing.some(L=>L.returnY!==null),m=!t&&this.motion.idleWave&&this.targetReveal>0&&!this.targetDetail&&this.detail<.01&&this.returnY===null&&!p&&e-this.lastInteraction>2.5;this.idleGain=t?0:Pe.lerp(this.idleGain,m?this.playfield.enabled?this.playfield.breathing&&!this.relayActive?1-this.playfield.bands.activity:0:1:0,1-Math.exp(-s*(m?.8:4))),this.pulseGain=Pe.lerp(this.pulseGain,this.targetDetail||this.returnY!==null||p?0:1,1-Math.exp(-s*8));let y=this.playfield,b=!t&&!this.targetDetail&&y.enabled,M=this.rhythm.update(b&&!this.reduced?y.bands:Uh(),e,s,this.rhythmStyle);this.flatMix+=((b?y.flatten:0)-this.flatMix)*(this.reduced?1:1-Math.exp(-s*4)),this.subduedIndex.value=Math.max(Number(this.selectedIndexOnly),this.flatMix);let T=L=>this.selectedIndexOnly?1-_t(L/.4)*(1-this.flatMix):this.flatMix,w=b?y.target:null;w&&!this.relayLifts.has(w)&&this.relayLifts.set(w,0);for(let[L,V]of this.relayLifts){let ae=V+((L===w?.95:0)-V)*(this.reduced?1:1-Math.exp(-s*8));ae<.001&&L!==w?this.relayLifts.delete(L):this.relayLifts.set(L,ae)}let R=new I,A=(L,V)=>(R.set((V-2)*an-v,-4.6,(L-15.5)*on+this.rail.value).project(this.camera),(R.x+1)/2),S=new Map,W=(L,V)=>{if(t)return np(L,V,c,this.shoulder.value,this.laneFocus.value);let ae=pu(L+this.coordinateOrigin.row,V+this.coordinateOrigin.lane,this.scanTime)*this.scanBlend,Z=tp(L+this.coordinateOrigin.row,V+this.coordinateOrigin.lane,e)*this.idleGain,ee=0;if(!t&&this.motion.selectionWave){let pe=0;for(let le of this.pulses){let Ue=Math.hypot(L-le.row,(V-le.lane)*2.2),D=e-le.time;pe+=this.selectionPulse(Ue,D)*(this.deferSelectionPulse?ep(Ue,D):1)}ee=Pe.clamp(pe,-.6,.6)*this.pulseGain}let ue=L-this.shoulder.value;return(ae+rc(ue,26.56)*mu(V,this.laneFocus.value))*(1-this.flatMix)+Z+ee+(b&&!this.reduced?Pf(L,V,e,y.bands,y.strength,M,A(L,V)):0)+(this.relayLifts.get(jn({row:L,lane:V}))??0)},C=(L,V)=>{let ae=S.get(V);ae||(ae=new Map,S.set(V,ae));let Z=ae.get(L);if(Z!==void 0)return Z;let ee=W(L,V);return ae.set(L,ee),ee},U=u.y+C(f,g);t||(this.returnY!==null&&this.rotation!==0?(this.lift.value=this.returnY-U,this.lift.velocity=0):(this.returnY=null,fs(this.lift,this.targetDetail?gu:this.outgoing.some(L=>L.returnY!==null&&L.cell.lane===g&&Math.abs(L.cell.row-f)<5)?0:.4*this.targetReveal*(1-this.flatMix),this.motion.detailTransition?this.deferSelectionPulse&&!this.targetDetail&&this.lift.value<.4?7.6:4.2:35,s)));let F=this.targetDetail?_t((this.lift.value-.8)/2.4):this.returnY!==null?this.detail:_t((this.lift.value-.4)/(gu-.4));this.detail=t?t.zoom:Pe.lerp(this.detail,F,o);let k=this.detail;this.decryption.update(s,k>.78&&this.lift.value>3.3,!1,t?c+5:void 0),this.appearance.apply(this.model,_t(this.lift.value/.4)),this.appearance.setClarity(this.model,this.modelClarity());let X=t?_t((c-21.9)/.86):this.reveal,z=Pe.clamp((c-21.92)/.75,0,1),B=t?-23*(1-z)**2:-28*(1-X);for(let L=this.outgoing.length-1;L>=0;L--){let V=this.outgoing[L],ae=this.cellPosition(V.cell),Z=ae.y+C(V.cell.row,V.cell.lane);V.group.rotation.y=xu(V.group.rotation.y,s,!this.motion.detailTransition),V.returnY!==null?(V.lift.value=V.returnY-Z,V.lift.velocity=0,V.group.rotation.y===0&&(V.returnY=null)):fs(V.lift,0,this.motion.detailTransition?4.5:35,s),V.group.position.set(ae.x-v,Z+V.lift.value+d(V.cell)-this.presentationDrop(V.cell),ae.z+B+this.rail.value);let ee=_t(V.lift.value/.4);this.appearance.apply(V.group,ee),this.appearance.setTheme(V.group,this.theme.sample(V.cell,e),T(V.lift.value)),V.clarity=this.motion.modelDecryption?V.clarity*Math.exp(-s*9):0,this.appearance.setClarity(V.group,V.clarity);let{row:ue,lane:pe}=V.cell;V.group.rotation.x=(C(ue+.5,pe)-C(ue-.5,pe))*.024*(1-k)*(1-ee),V.lift.value<1e-4&&Math.abs(V.group.rotation.y)<1e-4&&(this.scene.remove(V.group),this.appearance.dispose(V.group),this.outgoing.splice(L,1))}if(this.pendingPulse&&!t&&!this.targetDetail&&this.targetReveal){let L=U+this.lift.value,V=this.outgoing.every(ae=>ae.cell.lane!==g||Math.abs(ae.cell.row-f)>4||ae.group.position.y+.015<L);this.lift.value>=.35&&this.returnY===null&&V&&(this.motion.selectionWave&&this.emitPulse(this.pendingPulse),this.pendingPulse=null)}this.appearance.setTheme(this.model,this.theme.sample(this.selectedCell,e),T(this.lift.value)),this.model.position.set(u.x-v,u.y+C(f,g)+this.lift.value+d(this.selectedCell)-this.presentationDrop(this.selectedCell),u.z+B+this.rail.value),this.model.rotation.set((C(f+.5,g)-C(f-.5,g))*.024*(1-k)*(1-_t(this.lift.value/.4)),t?0:this.rotation,0);let te=_t((c-22.6)/1.6),J=_t((c-24.25)/2.25),ce=Pe.degToRad(89-22*te-8*J),de=Pe.degToRad(3+40*_t((c-21.96)/.22)-8*te-16*J),he=Pe.lerp(Pe.lerp(10.8,10.3,te),7.33,J),Oe=!!t&&this.container.closest("[data-layout]")?.dataset.layout==="opening",Je=Oe?this.container.clientWidth/this.container.clientHeight/(16/9):1,je=L=>L/Math.min(1,Je),j=Pe.lerp(Pe.lerp(28+7*te,140,J),72,k),ne=new I(-1.091,Pe.lerp(-2.55+.4*te,-.045,J),Pe.lerp(2.48,.481,J)).clone(),be=new I(-Math.sin(ce)*Math.cos(de),Math.sin(de),Math.cos(ce)*Math.cos(de));if(t){let L=_t((c-27.3)/1.3),V=_t((c-28.6)/5.4),ae=ce-Pe.degToRad(9*L+32*V),Z=de-Pe.degToRad(1.5*L+3.7*V);be.set(-Math.sin(ae)*Math.cos(Z),Math.sin(Z),Math.cos(ae)*Math.cos(Z))}else be.lerp(new I(-.277,.238,.931),k).normalize();if(t){let L=_t((c-25.4)/.95),V=new I().crossVectors(new I(0,1,0),be).normalize();ne.addScaledVector(V,-2.05*(1-L)*_t((c-24.2)/.8))}if(t&&c>=25.05&&c<=27.3){let L=_t((c-25.4)/1.05),V=new I().crossVectors(new I(0,1,0),be).normalize(),ae=new I().crossVectors(be,V).normalize(),Z=1080/je(he),ee=this.model.position.clone().add(new I(-2.5,3.7,0));ee.addScaledVector(V,-(Pe.lerp(840,518,L)-960)*Je/Z),ee.addScaledVector(ae,-(540-Pe.lerp(340,288,L))/Z),ne.lerp(ee,_t((c-25.05)/.35))}if(t&&c>27.3){let L=_t((c-27.3)/6.7),V=_t((c-27.3)/1.25),ae=Pe.lerp(518-98*V,618,L),Z=Pe.lerp(296+34*V,287,L),ee=1080/je(Pe.lerp(he,5.9,k)),ue=new I().crossVectors(new I(0,1,0),be).normalize(),pe=new I().crossVectors(be,ue).normalize(),le=this.model.position.clone().add(new I(-2.5,3.7,0));le.addScaledVector(ue,-(ae-960)*Je/ee),le.addScaledVector(pe,-(540-Z)/ee),ne.lerp(le,_t((c-27.3)/.5))}let _e=Zf(this.container.clientWidth,this.container.clientHeight,he,k,this.container.closest("[data-layout]")?.dataset.layout==="compact");if(!t){let L=new I().crossVectors(new I(0,1,0),be).normalize(),V=new I().crossVectors(be,L).normalize(),ae=this.container.clientWidth,Z=this.container.clientHeight,ee=Z/_e.span;if(_e.portrait){let pe=new I(0,-4.6+rc(0,26.56)+.4+1.85,-2.17);pe.addScaledVector(V,(_e.previewY-.5)*Z/ee),ne.copy(pe)}let ue=this.model.position.clone().add(new I(0,1.85,0));ue.addScaledVector(L,(.5-_e.detailX)*ae/ee),ue.addScaledVector(V,(_e.detailY-.5)*Z/ee),ne.lerp(ue,k)}let Ie=ne.clone().addScaledVector(be,j);!t&&this.motion.pointerParallax&&!this.uiOnlyParallax&&(Ie.x+=this.pointer.x*.12,Ie.y-=this.pointer.y*.12);let xt=this.targetDetail||this.detail>.01?this.motion.detailTransition:this.motion.selectionTransition,Ge=t?1:xt?1-Math.exp(-s*5):1;this.camera.position.lerp(Ie,Ge),this.cameraAim.lerp(ne,Ge),this.camera.lookAt(this.cameraAim),this.camera.fov=Pe.lerp(this.camera.fov,Pe.radToDeg(2*Math.atan((t?je(Pe.lerp(he,5.9,k)):_e.span)/(2*j))),Ge);let We=this.scene.fog,Ze=this.camera.position.distanceTo(this.cameraAim),Fe=this.themeAmount;We.near=Ze+Pe.lerp(5-4*Fe,-1,k),We.far=Ze+Pe.lerp(25-9*Fe,12,k),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),b&&!this.reduced&&S.clear();let rt=(!!t||!this.looping)&&!Oe;this.cells=rt?Array.from({length:160},(L,V)=>Il(V)):this.visibility.update(this.camera,We.far,v,B+this.rail.value,this.extraCoverage);let P=new Set(this.outgoing.map(L=>jn(L.cell)));P.add(jn(this.selectedCell)),this.drawnCells=[],this.relayPoints.clear(),this.drawCoverage.update(this.camera),this.shadowCoverage?.begin(),this.matrixUpdates??=new Zn(this.instances[0].instanceMatrix),this.themeAttribute&&(this.themeUpdates??=new Zn(this.themeAttribute));for(let L of this.cells){let{row:V,lane:ae}=L;if(P.has(jn(L)))continue;let Z=(ae-2)*an-v,ee=-4.6+C(V,ae)+d(L)-this.presentationDrop(L),ue=(V-15.5)*on+B+this.rail.value;if(!rt&&!this.visibility.intersects(Z,ee,ue))continue;let pe=C(V+.5,ae)-C(V-.5,ae);if(this.dummy.position.set(Z,ee,ue),this.dummy.rotation.set(pe*.024*(1-k),0,0),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),y.enabled&&this.relayPoints.set(jn(L),{cell:{...L},point:new I(0,3.5,0).applyMatrix4(this.dummy.matrix)}),this.shadowCoverage?.add(this.dummy.matrix),!this.drawCoverage.contains(Z,ee,ue))continue;let le=this.drawnCells.length;this.ensureInstanceCapacity(le+1),this.drawnCells.push(L),this.themeUpdates?.scalar(le,this.theme.sample(L,e)),this.matrixUpdates.set(le*16,this.dummy.matrix.elements)}let ft=this.instances[0].count!==this.drawnCells.length,Ke=this.matrixUpdates.commit(),$e=this.shadowCoverage?.commit()??!1,Ae=Ke||$e;for(let L of this.instances)L.count=this.drawnCells.length;(Ae||ft||!this.instances[0].boundingSphere)&&this.instances[0].computeBoundingSphere(),this.themeUpdates?.commit();let E=-1/0,x=g,N=f;for(let L=N-5;L<=N+5;L++)L!==N&&(E=Math.max(E,-4.6+C(L,x)+3.76));for(let L of this.outgoing)L.cell.lane===x&&Math.abs(L.cell.row-N)<=5&&(E=Math.max(E,L.group.position.y+3.76));this.clearance=this.model.position.y-E,this.canInspect=!t&&!!this.targetDetail&&k>.9&&this.pulseGain<.01&&this.clearance>.3,this.container.dataset.inspection=this.returnY!==null?"aligning":this.canInspect?"ready":this.targetDetail?"lifting":"preview";let K=this.model.position.clone().add(new I(0,2,0)).applyMatrix4(this.camera.matrixWorldInverse),$=this.bokeh.uniforms;if($.focus.value=-K.z,$.aperture.value=Pe.lerp(3e-4,8e-4,k)*this.quality.depthOfField/100,window.__filmSkipRender){this.renderState.invalidate();return}this.renderer.info.reset();let Y=this.renderState;if(this.scene.updateMatrixWorld(),Ae||t)Y.invalidate();else if(Y.begin(),Y.floats(...this.camera.projectionMatrix.elements,...this.camera.matrixWorldInverse.elements,...this.camera.position.toArray(),We.near,We.far,this.themeAmount,this.subduedIndex.value,$.focus.value,$.aperture.value),this.scene.traverse(L=>{if(Y.add(L.id,Number(L.visible)),!(L instanceof ke))return;L.modelViewMatrix.multiplyMatrices(this.camera.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Y.floats(...L.modelViewMatrix.elements,...L.normalMatrix.elements,...L.matrixWorld.elements);let V=L.material;Y.add(L.geometry.id,V.uuid,V.map?.uuid,V.map?.version??0),Y.floats(V.opacity,V.roughness,V.metalness,V.transmission,V.thickness,V.attenuationDistance,V.clearcoat,V.clearcoatRoughness,V.color.r,V.color.g,V.color.b,V.attenuationColor?.r??0,V.attenuationColor?.g??0,V.attenuationColor?.b??0);for(let ae of["appearance","glassClarity","themeAmount","subduedIndex"])Y.floats(L.userData[ae]?.value??0);L instanceof jt&&Y.add(L.count,L.instanceMatrix.version,this.themeAttribute?.version??0)}),!Y.end()){this.reusedFrames++;return}this.renderedFrames++;let fe=this.shadowState;fe.begin(),fe.add(this.light.shadow.mapSize.x,Number(this.renderer.shadowMap.enabled)),fe.floats(...this.light.matrixWorld.elements,...this.light.target.matrixWorld.elements),this.scene.traverseVisible(L=>{!(L instanceof ke)||!L.castShadow||(fe.add(L.id,L.geometry.id),fe.floats(...L.matrixWorld.elements),L instanceof jt&&fe.add(L.count,L.instanceMatrix.version))}),this.renderer.shadowMap.needsUpdate=fe.end()||this.light.shadow.needsUpdate,this.superPerformance?this.renderer.render(this.scene,this.camera):this.composer.render()}projectCard(e,t){this.model.updateMatrixWorld(!0);let n=this.model.localToWorld(new I(e,t,.255)).project(this.camera);return[(n.x+1)*this.container.clientWidth/2,(1-n.y)*this.container.clientHeight/2]}get decryptionFrame(){return this.decryption.frame}finishDecryption(){this.decryption.finish()}get detailVisibility(){return _t((this.detail-.25)/.55)}getStats(){this.model.updateMatrixWorld(!0);let e=(t,n,s)=>{let r=this.model.localToWorld(new I(t,n,s)).project(this.camera);return[Math.round((r.x+1)*this.container.clientWidth/2),Math.round((1-r.y)*this.container.clientHeight/2)]};return{decryption:{...this.decryption.frame,clarity:this.decryption.clarity,modelClarity:this.modelClarity()},topLeft:e(-2.5,3.7,0),topRight:e(2.5,3.7,0),labelTopLeft:e(-1.855,3.27,.255),labelBottomLeft:e(-1.855,2.81,.255),modelPosition:this.model.position.toArray().map(t=>Math.round(t*1e4)/1e4),cameraPosition:this.camera.position.toArray().map(t=>Math.round(t*1e4)/1e4),fieldOfView:this.camera.fov,loaded:this.loaded,drawCalls:this.renderer.info.render.calls,renderedFrames:this.renderedFrames,reusedFrames:this.reusedFrames,superPerformance:this.superPerformance,presentation:this.presence,triangles:this.renderer.info.render.triangles,archiveCount:this.drawnCells.length,archiveCandidates:this.cells.length,archiveCulled:this.cells.length-this.drawnCells.length,archiveCapacity:this.instanceCapacity,archiveCoverage:this.extraCoverage?"extra":"standard",returningFiles:this.outgoing.length,selectionPhase:this.pendingPulse?"lifting":this.pulses.length?"wave":"settled",pendingPulse:this.pendingPulse?{...this.pendingPulse}:null,pulses:this.pulses.map(t=>({...t})),referenceTime:Math.round((this.scanTime+5)*100)/100,selectedSlot:this.selectedSlot,selectedLane:Math.floor(this.selectedSlot/32),selectedCell:{...this.selectedCell},hoverCell:this.hoverCell?{...this.hoverCell}:null,hoverLifts:Object.fromEntries(this.hoverLifts),dragTrack:this.dragTrack?{...this.dragTrack}:null,archiveMomentum:this.archiveMomentum?{phase:this.archiveMomentum.motion.phase,value:this.archiveMomentum.motion.value,velocity:this.archiveMomentum.motion.velocity}:null,holdingArchive:this.holdingArchive,dragProjection:this.dragProjection(),dragMapping:this.archiveDrag.active?"free":null,coordinateOrigin:{...this.coordinateOrigin},poolBounds:{minLane:Math.min(...this.cells.map(t=>t.lane)),maxLane:Math.max(...this.cells.map(t=>t.lane)),minRow:Math.min(...this.cells.map(t=>t.row)),maxRow:Math.max(...this.cells.map(t=>t.row))},laneFocus:this.laneFocus.value,columnCamera:this.columnCamera.value,rotation:this.rotation,clearance:this.clearance,canInspect:this.canInspect,returnPhase:this.returnY!==null?"aligning":"lowering",extraction:Math.round(this.lift.value*1e3)/1e3,appearance:Math.round(_t(this.lift.value/.4)*1e3)/1e3,cameraDetail:Math.round(this.detail*1e3)/1e3,idleGain:this.idleGain,flatten:this.flatMix,spectrumActivity:this.playfield.bands.activity,selectedIndexDim:this.model.children.find(t=>t.userData.surface==="Index_Inlay")?.userData.subduedIndex?.value,returningIndexDims:this.outgoing.map(t=>({cell:t.cell,dim:t.group.children.find(n=>n.userData.surface==="Index_Inlay")?.userData.subduedIndex?.value})),cameraDistance:this.camera.position.distanceTo(this.cameraAim),cameraNear:this.camera.near,cameraFar:this.camera.far,fogNear:this.scene.fog.near,fogFar:this.scene.fog.far,returningAppearance:this.outgoing.map(t=>({slot:t.slot,clarity:t.group.children.find(n=>n.userData.surface==="Frosted_Polymer")?.userData.glassClarity?.value,cell:{...t.cell},lift:t.lift.value,quality:_t(t.lift.value/.4),rotation:t.group.rotation.y,worldY:t.group.position.y,phase:t.returnY!==null?"aligning":"lowering"})),rail:Math.round(this.rail.value*1e3)/1e3}}};function gt(i,e){if(e<=i[0][0])return i[0][1];let t=i.length-1;if(e>=i[t][0])return i[t][1];let n=c=>(i[c+1][1]-i[c][1])/(i[c+1][0]-i[c][0]),s=c=>{if(c===0)return n(0);if(c===t)return n(t-1);let l=n(c-1),h=n(c);if(l*h<=0)return 0;let d=i[c][0]-i[c-1][0],u=i[c+1][0]-i[c][0],f=2*u+d,g=u+2*d;return(f+g)/(f/l+g/h)},r=0;for(;e>i[r+1][0];)r++;let a=i[r+1][0]-i[r][0],o=(e-i[r][0])/a;return(2*o**3-3*o**2+1)*i[r][1]+(o**3-2*o**2+o)*a*s(r)+(-2*o**3+3*o**2)*i[r+1][1]+(o**3-o**2)*a*s(r+1)}var XA=[234,216,181,143,115,94,78,65,54,45,38,31,26,21,17,13,10,8,6,4,3,2,1,0],YA=XA.map((i,e)=>[e,i]),ip=(i,e)=>{let t=i-278-e*2;return{x:gt(YA,t),opacity:gt([[-1,0],[0,.4],[1,.65],[2,.88],[3,1]],t)}},qA=[[588,4],[589,39],[592,225],[593,261],[594,288],[595,310],[596,328],[597,343],[598,356],[599,366],[600,375],[601,382],[602,389],[603,394],[604,398],[605,402],[606,405],[607,407],[608,408],[609,409],[610,410],[611,410]],sp=i=>gt(qA,i)/410;function rp(i){let e=n=>gt(n,i),t=Math.PI/180;return{radius:e([[487,2e3],[492,1540],[497,1095],[500,895.5],[505,650],[510,492],[515,385.5],[520,320.5],[524,287.5],[527,275],[530,270],[535,265.5],[540,262],[545,258],[550,255],[555,252.5],[560,250],[568,246]]),whiteRadius:e([[487,1500],[492,1011],[493,955],[494,893],[495,834],[496,783],[497,737],[498,693.5],[499,655],[500,619],[505,470.5],[510,374],[515,310.5],[520,272],[524,253.5],[527,248],[530,246],[535,242],[540,238],[545,235],[550,232.5],[555,230],[560,227.5],[568,224]]),outerStart:t*e([[487,470],[492,364],[497,276],[500,226],[505,159.75],[510,98.75],[515,49.25],[520,13.25],[524,-9],[527,-23],[530,-36.25],[535,-53],[540,-66.25],[545,-75.75],[550,-82.75],[560,-89],[568,-90]]),outerSweep:t*e([[487,30],[492,105],[497,170],[500,199],[505,241.5],[510,270.25],[515,295.75],[520,313.25],[527,331],[530,336.75],[535,344.5],[540,350.75],[545,355],[550,358],[560,360],[568,360]]),whiteStart:t*e([[487,-100],[492,-30],[497,72],[500,107],[505,140],[510,172],[515,196],[520,213.75],[527,234.5],[530,241],[535,249.75],[540,256.75],[545,262.25],[550,265.75],[560,269.5],[568,270]]),whiteSweep:t*e([[487,30],[492,105],[497,170],[500,200],[505,241.25],[510,272.75],[515,295.5],[520,313.75],[527,330.5],[530,335.5],[535,343.5],[540,349.5],[545,354],[550,357],[560,360],[568,360]]),innerRadius:e([[487,124.5],[492,123],[495,121],[500,117.5],[505,112],[510,107.5],[515,104],[520,101.5],[530,97],[540,94],[550,91.5],[560,90],[568,88.5]]),innerStart:t*e([[487,-20],[490,-4.25],[492,14],[495,48.75],[497,69.25],[500,93.25],[505,121.25],[510,141],[515,155.5],[520,166.5],[527,178],[530,181],[535,187.75],[540,192],[545,195.25],[550,197.75],[555,199.75],[560,200.75],[568,201.5]]),innerSweep:t*e([[487,0],[492,22.5],[497,55.75],[500,70.25],[505,87.25],[510,99],[515,108],[520,115],[527,123.5],[530,127],[535,128],[540,131],[550,134],[568,136]]),orbit:t*e([[487,70],[492,33],[493,13.2],[494,-5.8],[495,-24.2],[496,-41.4],[497,-57.2],[498,-71.4],[499,-84.2],[500,-96],[505,-140.8],[510,-172.3],[515,-195.5],[520,-213.5],[527,-234],[530,-238.8],[535,-247.7],[540,-254.7],[545,-260.1],[550,-264],[555,-266.9],[560,-268.8],[568,-270]]),orbitRadius:e([[487,270],[495,236],[500,224],[505,214],[510,206],[515,199],[520,193],[530,185],[540,179.5],[550,174.5],[560,171.5],[568,169]]),dotRadius:e([[487,0],[492,1],[500,5.6],[510,7],[520,7.8],[530,8],[568,8]]),blackCap:e([[487,45],[504,35],[510,20],[515,10],[520,5],[525,2.5],[535,2],[550,0],[568,0]]),whiteCap:e([[487,40],[492,30],[497,22],[502,16],[507,10],[512,5],[520,1.5],[540,0],[568,0]])}}var QA=[[543,827.5,561,1091,518,38.7,260,250,0,0],[544,827.5,561,1091,518,38.7,260,250,3,3],[545,827.5,560.5,1091,518.5,38.6,265,236,17,17],[546,827.5,559.5,1091,519.5,38.5,274,190,44,44],[547,827.6,558.2,1090.6,520.8,38.5,296,121,79,81],[548,828.06,556.76,1090.35,522.58,38.38,332.38,50.99,111.73,113.42],[549,827.84,555.13,1090.42,524.39,38.34,367.27,-14.03,141.56,145.66],[550,827.89,553.28,1090.2,525.89,38.44,396.14,-68.97,168.88,172.89],[551,828,551.68,1090.21,527.44,38.28,421.62,-113.84,191.68,195.3],[552,828.19,550.24,1089.94,528.85,38.25,444.24,-152.25,208.55,215.7],[553,828.42,548.83,1089.7,530.24,38.18,462.76,-184.19,225.92,230.73],[554,828.61,547.64,1089.53,531.44,38.12,479.15,-212.29,239.9,244.63],[555,828.8,546.47,1089.37,532.55,38.03,494.23,-237.06,251.56,257.75],[556,829.06,545.41,1089.16,533.53,37.91,508.57,-259.19,261.49,267.63],[557,829.25,544.49,1088.93,534.52,37.87,520.46,-279.2,271.23,278.42],[558,829.47,543.66,1088.7,535.37,37.79,530.39,-295.86,280.34,286.17],[559,829.75,542.88,1088.46,536.12,37.72,541.33,-312.5,287.17,295.12],[560,829.95,542.16,1088.26,536.88,37.65,549.47,-326.37,295.98,301.16],[561,830.16,541.63,1088.02,537.41,37.57,557.82,-338.78,302.29,307.52],[562,830.33,541.08,1087.81,537.94,37.52,565.1,-350.74,307.99,312.58],[563,830.59,540.65,1087.61,538.36,37.43,571.89,-362.08,313.78,319.28],[564,830.83,540.28,1087.38,538.74,37.37,578.93,-371.93,316.97,323.53],[565,831.04,539.97,1087.14,539.04,37.35,583.85,-380.51,322.27,327.78],[566,831.25,539.74,1086.93,539.28,37.27,589.84,-388.93,325.61,331.62],[567,831.48,539.56,1086.73,539.4,37.19,594,-396.5,330.93,335.92],[568,831.61,539.51,1086.55,539.48,37.15,599.44,-403.94,332.25,338.7]],KA=Array.from({length:9},(i,e)=>QA.map(t=>[t[0],t[e+1]])),ap=[[548,926.33,554.33],[551,944.38,572.15],[553,954.92,575.05],[555,963,575],[558,971.63,572.85],[561,977.53,569.78],[564,981.5,566.86],[568,984.71,563.5]],jA=ap.map(([i,e,t])=>[i,Math.atan2(t-539.5,e-959.5)]),ZA=ap.map(([i,e,t])=>[i,Math.hypot(e-959.5,t-539.5)]),JA=[[-1,0],[0,.8],[1,1.7],[2,2.35],[3,2.85],[4,3.15],[5,3.45],[7,3.8],[10,4.1],[15,4.25],[20,4.25]];function op(i){let e=KA.map(p=>gt(p,i)),[t,n,s,r,a,o,c,l,h]=e,d=gt(jA,i),u=gt(ZA,i),f=Math.floor(i+1e-5),v=[546,547,549,550].includes(f)?gt([[546,42.93],[550,42.43]],i):gt([[545,0],[548,7.96],[551,9.89],[553,10.63],[555,11.08],[559,11.45],[564,11.45],[568,11.27]],i);return{sides:[{x:t,y:n,radius:a,start:o*Math.PI/180,sweep:l*Math.PI/180},{x:s,y:r,radius:a,start:c*Math.PI/180,sweep:h*Math.PI/180}],sideVisible:i>=544,coreRadius:v,satellites:Array.from({length:6},(p,m)=>{let y=d+m*Math.PI/3;return{x:959.5+Math.cos(y)*u,y:539.5+Math.sin(y)*u,radius:gt(JA,i-548-m*3)}})}}var lp=[[229,-.02,-.0198],[230,-.0195,-.011],[231,-.016,.009],[232,-.0095,.047],[233,.0025,.1135],[234,.0215,.2205],[235,.048,.365],[236,.0735,.504],[237,.094,.6155],[238,.109,.7045],[239,.122,.7755],[240,.133,.835],[241,.1425,.884],[242,.1505,.927],[243,.1575,.964],[244,.164,.996],[245,.1695,1.023],[246,.1745,1.0475],[247,.1785,1.0685],[248,.183,1.087],[249,.187,1.103],[250,.19,1.1175],[251,.1935,1.13],[252,.196,1.1405],[253,.1985,1.15],[254,.201,1.1575],[255,.203,1.1645],[256,.205,1.17],[257,.2065,1.1745],[258,.208,1.1785],[259,.2095,1.181],[260,.2105,1.183],[261,.2115,1.184],[264,.211,1.1835]],$A=lp.map(([i,e])=>[i,e]),ey=lp.map(([i,,e])=>[i,e]),ty=[[420,.1835],[425,.184],[430,.1885],[435,.2],[440,.2205],[450,.2925],[455,.3485],[460,.421],[465,.5095],[470,.614],[475,.722],[480,.827],[485,.9195],[486,.9365]],ny=[[260,814],[261,813],[262,812],[263,808],[264,803],[265,794],[266,781],[267,763],[268,740],[269,716],[270,691],[271,668],[272,648],[273,630],[274,615],[275,601],[276,590],[277,580],[278,571],[279,563],[280,556],[281,550],[282,545],[283,540],[284,536],[285,533],[286,530],[287,527],[288,525],[289,523],[290,521],[291,520],[292,519],[294,518]];function cp(i){let e=gt(ty,i),t=i<420?gt($A,i):e+.0275,n=i<420?gt(ey,i):e+1;return{offsetX:gt(ny,i)-520,start:t,length:Math.max(0,Math.min(1,n-t)),strokeWidth:gt([[229,.25],[230,2.8],[231,8],[232,16],[233,23.5],[234,26]],i),symbolScale:gt([[246,0],[247,.4],[248,.63],[249,.75],[250,.83],[251,.89],[252,.94],[254,.985],[256,1]],i),plusX:gt([[246,155],[247,123.3],[248,104],[249,93.53],[250,86.52],[251,81.78],[252,78.48],[254,74.26],[256,72.96],[260,72.6]],i),minusX:gt([[246,155],[247,186.82],[248,206.14],[249,216.66],[250,223.47],[251,228.21],[252,231.77],[254,236.06],[256,237.57],[260,237.1]],i),minusWidth:gt([[246,15],[256,15],[257,23],[258,31],[259,35.5],[260,38],[262,42],[264,44],[268,46]],i),plusAngle:gt([[255,0],[256,-3],[257,-22],[258,-45],[259,-62],[260,-70],[262,-80],[265,-87],[270,-90]],i)}}var vu=(i,e,t)=>Math.max(0,Math.min(1,(i-e)/(t-e))),hp=i=>i*i*(3-2*i),hr=(i,e,t,n)=>i.slice(0,e<t?0:Math.min(i.length,1+Math.floor((e-t)*(i.length-1)/(n-t)))),Ta=(i,e)=>e.includes(i),iy=[1,1,3,4,5,6,9,11,12,14,17,18,19,20,22,23,25,26];function up(i){let e=i+5,t=Math.floor(e*25+1e-5),n=e<9.12?"access":e<11.12?"logo":e<19.48?"auth":e<22.76?"scan":"welcome",s="";t<363?(s=hr("ID CONFIRMED",t,282,295),t>=320&&(s+=" : "+hr("JOYCE MOORE",t,321,339))):t<421?s=hr("REQUEST RECEIVED",t,367,389):(s=hr("START PROCESSING",t,423,440),t>=449&&(s+=".".repeat(Math.min(3,1+Math.floor((t-449)/4)))),Ta(t,[479,485,486])&&(s="              SING..."));let r=e*25,a=rp(r),o=op(r),c=Ta(t,[525,526,528,529]),l=[1,0,.28,0,1,0,0],h=t-569,d=hp(vu(e,26.56,26.92));return{t:e,f:t,step:n,auth:s,access:"ACCESS PERMISSION REQUIRED".slice(0,t<170?0:iy[Math.min(17,t-170)]),accessOpacity:t>=170&&t<227?t===226?.25:1:0,logoOpacity:e>=9.16&&e<19.48?1:0,logo:cp(r),logoLetters:hr("RHINE\xB7LAB",t,232,255),authOpacity:t>=281&&t<487?1:0,brand:[0,1,2].map(u=>ip(r,u)),poweredLetters:hr("POWERED BY RHINE LAB",t,279,295).length,scanVisible:e>=19.48&&e<22.76,scan:a,scanOrbit:o,scanRadius:a.radius,ringScale:c?1.94:1,ringOpacity:c?.32:gt([[487,0],[488,.18],[490,.6],[493,1]],r),ringBlur:c?2.2:0,scanTracking:gt([[487,40],[492,28],[497,18],[500,14],[505,8],[510,4],[515,1.7],[520,.5],[527,0],[568,0]],r),scanFont:26.5,permissionOpacity:e<21.8?vu(e,19.48,19.88):gt([[545,1],[546,.4],[547,.3],[548,.25],[549,.1],[550,.04],[551,0]],r),ornament:e>=21.84,coreRadius:o.coreRadius,welcomeVisible:e>=22.76&&e<26.92,welcomePanel:h>=0&&h<7?l[h]:0,welcomeInk:h>=0&&h<7?[0,0,.2,1,0,0,.25][h]:1,companyVisible:t>=588&&!Ta(t,[590,591]),companyMask:Ta(t,[594,595]),highlight:sp(r),databaseOpacity:t<626||Ta(t,[628,629,631,634])?0:1,welcomeLogo:t>=588,welcomeScale:1-.46*d,welcomeOpacity:1-Math.pow(d,3),exitBlur:8*d,exit:d,backgroundOpacity:e<26.92?1:0,white:hp(vu(e,26.16,26.88))}}var L1=[[170,187],[282,295],[320,339],[367,389],[423,440],[449,457]].flatMap(([i,e])=>{let t=[],n=0;for(let s=i;s<=e;s++){let r=up(s/25-5),o=(s<200?r.access:r.auth).replace(/\s/g,"").length;o>n&&t.push(s),n=o}return t});var dp=["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+f/8/xYAGwDx/+7/GAAYAP//CwAWAAcACAAOAAIAAQACAOv/6P/+//X/8f8qAEkAEgDp//7/EAAMAAsA///x//7/DwD+/+f/7v/+//3/BwAkACcADAD+//3/9P/t/+X/4f/4/wwA/f/0//r/7//6/x4ADgDk//f/GAAAAOb/+f8MAAYAAQANAA8A5//M//3/LAD9/8//AwAyAAYA3P/y/wUA+/8AAAIA5//e/wQAHAAHAP7/EQAHAOT/6v8RAAsA2f/L//D/+P/Y/+b/GQAJANH/3f8LAA4ADQAfABgA/f/7/xQAJQAXAPv/8f/r/+D/+f8aAP3/3f8IADAAFgD9/wIAAgAKACAAJQATAPr/5//u//3/AQAHAAwA+v/t//f///8AAAcAEwAeABwAEAAWACkAIQAPABcAIAAWAA8ADAAJAAEA7v/g/+n/8P/y////+//m/+n/9f/9/wsA9v/N/+H/CAD1/+n//P/x/+n/AAD//wEAIAASAOX/6v8AAAEABgD5/93/5/8EABIAFAAIAAgAIgAfAAcAGwAxABsADwARAPn/7v8CAAsABwAEAP3/8f/f/9X/5v/f/7r/y//9//7/AwAlAA0A7/8jAEQAKgA8AE0AKQA4AGAAMgASADcAHADd//7/OwA2AA8A6//f/9X/s//I/wwA9v/I//T/+f+8/9L/5v+c/6D/AwAbAAkAHQAaAAIAAwALAB8ANgAuAB4AEQD5/+//6P/J/83/7//o/+r/FwASAPL/DwAeAPL/6f8FAP3/8P/3//L/9P8MAA0A7//m//n////o/+b/GwA/ACAAGQBKAFIAOgBEADYAAAD1//f/1v/P//L/GgBGAE8AKQAsAE0ANAAGAPH/5P/q//H/3f/t/wUA3P/Q//X/2P/B//7/EADv//X/5P/B/+X/BQD8/xQAGwD4/wYALwA6AEAAJQDu//r/HQASABkAJgABAO7/8v/S/9D/BAASAP3/7//X/9P/8P8GABIAEADv/+v/FAAdAAsABADo/87/7/8UABYAGgAOAO7/+f8aABYADwAaABUAAgD//wUACAABAPb/9f/z//D/AwAbABEA/P/5//3/CQAYAA4A9//z//v/+//7//3/+v/7/wAAAQADAAcACAABAPb/8/8AABEAGgAbABMABQAGABMAFQALAAQA/v/4//r///8BAAEAAgAAAP//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/P8CABYAIwAfABIAFAAdAAsA+f8MACAAGwARAAQAAAASABYADQAhACgABgD7/wYAAwASACcADgDr/+j/9P8CAP//8P8CABUA9f/l/wIAAgD1/wYAEAAZADgANAAKAP3/AQAAAAkA9v/O/+H/BgDv/9r/9P8IABMAJgAcAAYAAgD5/+P/yf+q/7r/8v/o/7X/xP/k/+L/8v/+/+X/3//r/+n/8f/+/wYAHQAYAPz/DAAXAO7/6v8KAA8AGgATAOj/AAAuAP3/6f8jABcA9f8dACEACgAzADsA/P/h//D/EgA9ACcABgA7AFcAIAARABUA5v/e/wkACQD3//z//f8FABYAEQACAPj/AwBBAGAAHgDs//z/8v/o/xgAIwD1/+3/9v/p//P/9f/O/9L/7//P/87/FAAMAL//w//s/9v/y//i/+7/z/+l/73/DAARAN3/9f8aAPT/+f8/AD4ACgDy/9f/xv/b/+z/AwAlAP7/xv/9/1wAegBwAEIA/f8CAFkAmwCCAB8A0P/W//D/BwBOAGAA+v/X/yoANwAKAAgA2f+R/7v/DAAlADkAJADZ/8P/3//x/w8AFAD4/wkACgDV/+X/EwDy/9n/2v/E/+7/IwD0//D/EACX/z//zv9LADYAHAD2/8P/2P8GACsAOADh/53/5f8CANL/AQAdAMT/vP8QADoAXwBQAMv/jP/S/woAMABPACcADQAlABoAJwBhAEIA+//9/wkAJQBgADAAxf/E/9L/s//o/zYALwA9AGgAOADz/wIAMQA3AP//y//4/y8ADQD0/wMA6v/t/ysAKADv/97/3//3/ycAEgDX/+P/+P/S/8H/6P8QABYA6/+3/7r/2//5/xAA9//I/+L/EAAAAPr/BADK/6L/0f/c/7j/6f82ACkADwAjACkANABWAEMAAQDj/+T/6//9/wQA//8JAA4ACwAWABgAFgAnAB4ABAAXACkAFAAlAEcAKwAMABMABwDn/+H/9/8cACoAEQACAP//8v8CABwABAD3/xEACwD5/w0ACgDt//X/BgAHABQADwDz/+3/7v/n//f/BADw/+j/9//7//T/6//m//D/8P/l//3/HwAXAAYABgD///T/9//8/wQADQAFAPf/9v/5//z/AgABAAIACQADAP//DAAIAPL/8/8BAAAABQAPAAcA//8GAAcAAAADAAsACAD///7/AwAFAAEAAAABAAAAAQACAAEAAQACAAAA/v8AAAIAAQABAAEAAAD//wAAAQAAAAAA"];var z1=160/3,fp=new WeakMap,pp=new WeakMap;function ry(i){let e=pp.get(i);return e||(e={buffers:dp.map(t=>{let n=atob(t),s=i.createBuffer(1,n.length/2,48e3),r=s.getChannelData(0);for(let a=0;a<r.length;a++){let o=n.charCodeAt(a*2)|n.charCodeAt(a*2+1)<<8;r[a]=(o>32767?o-65536:o)/32768}return s}),next:0},pp.set(i,e)),e.buffers[e.next++%e.buffers.length]}var ay=(i,e,t,n=.05)=>{if(typeof i.cancelAndHoldAtTime=="function")i.cancelAndHoldAtTime(t);else{let s=i.value;i.cancelScheduledValues(t),i.setValueAtTime(s,t)}i.linearRampToValueAtTime(e,t+n)};function mp(i,e,t,n,s=0){let r=i.createGain(),a=i.createStereoPanner();a.pan.value=Math.max(-.65,Math.min(.65,s)),r.connect(a),a.connect(e);let o=[],c=0,l=n,h=(g,v,p,m,y,b=.006,M=!1)=>{let T=i.createGain(),w=n+m;M?T.gain.setValueAtTime(p,w):(T.gain.setValueAtTime(0,w),T.gain.linearRampToValueAtTime(p,w+Math.min(b,y*.3)),T.gain.exponentialRampToValueAtTime(1e-5,w+y),T.gain.linearRampToValueAtTime(0,w+y+.012)),v.connect(T),T.connect(r),o.push(g),c++,g.onended=()=>{g.disconnect(),v.disconnect(),T.disconnect(),--c===0&&(r.disconnect(),a.disconnect())},g.start(w),g.stop(w+y+.015),l=Math.max(l,w+y+.015)},d=(g,v,p,m,y=0,b=.006)=>{let M=i.createOscillator();M.frequency.setValueAtTime(g,n+y),M.frequency.exponentialRampToValueAtTime(v,n+y+m),h(M,M,p,y,m,b)},u=(g,v,p,m,y=0,b=.008)=>{let M=fp.get(i);if(!M){M=i.createBuffer(1,i.sampleRate*2,i.sampleRate);let R=M.getChannelData(0),A=773;for(let S=0;S<R.length;S++)A=Math.imul(A,1664525)+1013904223>>>0,R[S]=A/2147483648-1;fp.set(i,M)}let T=i.createBufferSource(),w=i.createBiquadFilter();T.buffer=M,w.type="bandpass",w.Q.value=.8,w.frequency.setValueAtTime(g,n+y),w.frequency.exponentialRampToValueAtTime(v,n+y+m),T.connect(w),h(T,w,p,y,m,b)},f=(g,v,p,m=0)=>{let y=[[1,1,1],[1.47,.39,.66],[2.09,.21,.4],[2.73,.095,.25],[3.86,.035,.15]];for(let[b,M,T]of y){let w=g*b;w>Math.min(8500,i.sampleRate*.42)||d(w,w,v*M,p*T,m,.0012)}u(4800,3600,v*.24,.013,m,8e-4)};switch(t){case"page-open":u(700,1800,.065,.18,0,.025),d(360,480,.032,.16,0,.014),d(960,960,.009,.075,.06,.01);break;case"page-close":u(1300,600,.05,.13,0,.014),d(420,280,.027,.13,0,.01);break;case"ui-tick":u(1500,1200,.042,.036,0,.003),d(820,820,.022,.052,0,.003);break;case"brand":d(146.83,146.83,.039,.72,0,.08),d(293.66,293.66,.03,.62,.07,.07),d(440,440,.022,.54,.17,.055),u(420,1750,.036,.7,0,.13);break;case"text-reveal":u(2100,1300,.033,.064,0,.005),d(1050,1050,.012,.06,0,.005);break;case"key":{let g=i.createBufferSource();g.buffer=ry(i),h(g,g,.2,0,g.buffer.duration,0,!0);break}case"tick":f(1680,.064,.24);break;case"column":f(1280,.065,.32),f(2050,.016,.18,.045);break;case"open":f(1150,.071,.58),f(2180,.025,.36,.16),u(3100,4400,.014,.25,.035,.025);break;case"confirm":d(640,640,.039,.095,0,.008),d(960,960,.026,.15,.095,.009);break;case"back":f(1120,.066,.22),d(560,560,.012,.1,.025,.002);break;case"scan":u(1800,3400,.025,.8,0,.12);for(let g=0;g<4;g++)d(760,760,.025,.064,g*.19+.15,.007);break;case"welcome":[293.66,440,659.25,739.99].forEach((g,v)=>d(g,g,.034,1.6,v*.095,.05)),u(600,1800,.065,.9,0,.15);break;case"array":u(1600,3300,.025,.8,0,.12);for(let g=0;g<5;g++)f(1180+g*170,.043-g*.005,.31,.05+g*.105);break;case"inspect":d(1120,1120,.026,.055,0,.005),d(1120,1120,.018,.055,.11,.005);break;case"explode":[1220,1680,2260].forEach((g,v)=>f(g,.054-v*.01,.4-v*.055,v*.115));break;case"assemble":[2260,1680,1220].forEach((g,v)=>f(g,.035+v*.008,.2,v*.095));break}return{end:l,stop(g){ay(r.gain,0,g,.018);for(let v of o)try{v.stop(g+.02)}catch{}}}}var uc=window.parent.WAVE_CONFIG,ps=document.getElementById("array"),oy=matchMedia("(prefers-reduced-motion: reduce)").matches,ly=new URLSearchParams(location.search).get("quality")||"original",Bi=60,hc=Math.round(uc.sourceStart*Bi),Ft,ur=-1,yi=0,Au=xi.map((i,e)=>vi(e)[0]),lc=[],cc=1/0,Ca=0,vp=-1,yu=!1,oc=i=>(i=Math.max(0,Math.min(1,i)),i*i*(3-2*i));function Ap(i){let{width:e,height:t,scale:n,kind:s}=i?Kf(innerWidth,innerHeight):jf(innerWidth,innerHeight,matchMedia("(pointer: coarse)").matches);ps.style.width=`${e}px`,ps.style.height=`${t}px`,ps.style.transform=`translate(-50%, -50%) scale(${n})`,ps.dataset.layout=s,Ft?.resize()}function cy(i,e){let t=uc.wave;if(e<0||e>t.lifetime)return 0;let n=i-e*t.speed;return t.amplitude*Jt(e/t.attack)*Math.exp(-e*t.decay)*Math.cos(n*t.frequency)*Math.exp(-.5*(n/t.width)**2)}async function yp(){Ft?.dispose(),Ft=void 0,Ap(!0),Ft=new ac(ps,cy,!1),Ft.setQuality(du[ly]),Ft.setMotion(oy?ic():wa()),await Ft.load(uc.model),yi=0,Au=xi.map((i,e)=>vi(e)[0]),Ft.select(0),Ft.setMode("hidden"),ur=-1,vp=Ca,Ft.onSelect=(i,e)=>window.parent.WAVE_MANUAL({index:i,cell:e}),Ft.onNavigate=(i,e)=>window.parent.WAVE_MANUAL({axis:i,direction:e})}function gp(i){let e;if("index"in i)yi=i.index,e={cell:i.cell};else{let t=Ai(yi).lane;if(i.axis==="row"){let n=vi(t);yi=n[da(n.indexOf(yi)+i.direction,n.length)]}else yi=Au[da(t+i.direction,xi.length)];e={axis:i.axis,direction:i.direction}}Au[Ai(yi).lane]=yi,Ft.select(yi,e)}function hy(i,e){let t=i/Bi;if(i===35*Bi&&(Ap(!1),Ft.setMode("detail")),i===49*Bi&&Ft.finishDecryption(),i===Math.round(60.6*Bi)&&Ft.setMode("archive"),i>=hc){for(let s of uc.events){let r=hc+Math.round(s.t*Bi);r===i&&r<cc&&gp(s)}for(let s of lc)s.frame===i&&gp(s.event)}if(t<21.9||t>=49&&t<60.4)return;window.__filmSkipRender=!e;let n=t<35?{reveal:oc((t-22)/.4),lift:oc((t-26)/1.8),zoom:.55*oc((t-27.3)/1.65)+.45*oc((t-29)/5),time:t}:void 0;Ft.update(t,n),ps.style.setProperty("--detail-shade",String(Ft.detailVisibility))}var xp=Promise.all([document.fonts.load("400 32px MiSans","RHINE LAB, LLC. INTERNAL DATABASE NO.001 R L / I S INFO"),document.fonts.load("700 130px MiSans","RHINE LAB, LLC. NO.001 INFO")]).then(yp);window.waveDemo={ready:xp,async seek(i){await xp;let e=hc+Math.round(i*Bi);if((e<ur||vp!==Ca)&&await yp(),e!==ur){for(;ur<e;)hy(++ur,ur===e);window.__filmSkipRender=!1}},resetInput(){(lc.length||yu)&&(lc=[],cc=1/0,yu=!1,Ca++)},addInput(i,e){let t=hc+Math.round(i*Bi)+1;cc=Math.min(cc,t),lc.push({frame:t,event:e})},sound(i,e,t,n){return mp(i,e,n.axis==="lane"?"column":"tick",t,n.axis==="lane"?n.direction*.45:0).end},resize(){Ca++},stats(){return Ft.getStats()}};addEventListener("resize",()=>{Ca++,window.parent.__motion?.seek(window.parent.__motion.time)});for(let i of["pointerdown","pointermove","touchstart"])ps.addEventListener(i,e=>{e.isTrusted&&(yu=!0)},{capture:!0});var uy={ArrowLeft:["lane",-1],ArrowRight:["lane",1],ArrowUp:["row",-1],ArrowDown:["row",1]};addEventListener("keydown",i=>{let e=uy[i.key];e&&(i.preventDefault(),window.parent.WAVE_MANUAL({axis:e[0],direction:e[1]}))});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

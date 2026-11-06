#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../.."
ffmpeg -y -i "${1:?提供 butterfly.mp3 的路径}" -vn -af "adelay=67665S:all=1,atrim=end=116.821,afade=t=out:st=116.495:d=0.297:curve=tri,apad=whole_dur=122.005,atrim=end=122.005,asetpts=PTS-STARTPTS" -ar 48000 -c:a aac -b:a 256k -movflags +faststart audio/film.m4a

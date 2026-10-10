"""Turn the raw factory walkthrough video into the media the About page ships.

Source: a 2:02.92, 1920x1080, 25 fps h264 walkthrough of the production floor.
43 MB, Constrained Baseline profile, mp3 audio at 2.8 Mb/s. Nothing about that
is web-ready: the profile is the least compatible H.264 profile there is, the
bitrate belongs on a Blu-ray, and 43 MB is more than the rest of the site
weighs together.

Three outputs, all into img/:

  factory-tour.mp4           1280x720, H.264 High, AAC audio, +faststart.
                             Audio is KEPT — the module is click-to-play, not
                             autoplaying, so the soundtrack is part of the
                             experience and the file stays usable standalone.

  factory-tour-poster.webp   the frame the player shows before the first click.
                             Chosen from the rigid-box forming line: bright,
                             uncluttered, and unmistakably a box factory.

  factory-<stage>.webp       six stills, 1280x720 — sized for a three-up grid
                             at ~400 px per cell (retina-sharp at that width)
                             rather than the 1600x900 the article images use,
                             which would be four times the bytes for width the
                             layout never shows.

Frame choice was measured, not eyeballed on a hunch: every 200 ms frame was
scored on sharpness (Laplacian stddev), exposure and contrast, one candidate
taken per detected shot, then de-duplicated in TIME and in APPEARANCE. The
captions were written by looking at the chosen frames against the machinery on
the floor. If a caption ever reads wrong, fix the word here and rerun — do not
hand-edit the WebP.

Run:  python tools/prepare-factory-media.py --src <path-to-source-mp4>
"""

import argparse
import pathlib
import subprocess
import sys

from PIL import Image, ImageStat

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "img"

WIDTH, HEIGHT = 1280, 720
WEBP_QUALITY = 80

# The ffmpeg binary comes from imageio_ffmpeg, the same isolated interpreter
# this script is expected to run under, so no PATH fiddling is required.
try:
    import imageio_ffmpeg

    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:  # pragma: no cover - only hit on a broken environment
    sys.exit("imageio_ffmpeg is not installed; run this under the project venv")


# file stem -> (seconds into the source, caption used on the About page)
STILLS = {
    "factory-workshop": (
        1.80,
        "Automated box forming line",
    ),
    "factory-varnishing": (
        63.00,
        "Varnishing and lamination",
    ),
    "factory-printing": (
        84.00,
        "Printed sheets feeding into finishing",
    ),
    "factory-gluing": (
        101.40,
        "Folding and gluing line",
    ),
    "factory-handwork": (
        109.80,
        "Hand finishing and assembly",
    ),
    "factory-design": (
        119.20,
        "Sample and structural design studio",
    ),
}

POSTER = ("factory-tour-poster", 72.60)


def grab(src, seconds, dest_png):
    """One frame, full resolution, lossless on the way to the WebP."""
    r = subprocess.run(
        [
            FFMPEG, "-y", "-hide_banner", "-loglevel", "error",
            "-ss", f"{seconds:.2f}", "-i", str(src),
            "-frames:v", "1", str(dest_png),
        ],
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        sys.exit(f"ffmpeg failed at {seconds}s: {r.stderr.strip()}")


def assert_sane(png):
    """A flash frame or a whip pan would ship as a grey rectangle otherwise.

    These bounds are wide on purpose. They exist to catch the transitions the
    source video cuts with — dips to solid white, solid colour and heavy motion
    blur — not to judge composition.
    """
    im = Image.open(png).convert("L")
    stat = ImageStat.Stat(im)
    mean, std = stat.mean[0], stat.stddev[0]
    if not (40 <= mean <= 220) or std < 30:
        sys.exit(
            f"{png.name}: mean luma {mean:.0f}, stddev {std:.0f} — this frame "
            f"looks like a transition or a blur, not a scene. Pick another "
            f"timestamp rather than shipping it."
        )
    return mean, std


def to_webp(png, dest_stem):
    im = Image.open(png).convert("RGB")
    # the source is exactly 16:9, so this is a resize, not a crop — nothing is
    # cut off and no watermark band has to be avoided
    im = im.resize((WIDTH, HEIGHT), Image.LANCZOS)
    dest = OUT / f"{dest_stem}.webp"
    im.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    return dest


def encode_video(src, dest):
    # -profile high / -level 4.0: wide playback, unlike the source's
    # Constrained Baseline. -g 50: a keyframe every 2 s so seeking is snappy.
    # +faststart: the moov atom moves to the front, so playback starts before
    # the whole file has arrived.
    #
    # hqdn3d: light temporal denoise. Measured on this footage it does not buy
    # bitrate — the encode is motion-bound, not noise-bound (11.9 MB with it,
    # 11.9 MB without) — but it does remove sensor grain that a 720p encode
    # otherwise shimmers on. Keep the settings mild; anything stronger starts
    # erasing machine edges, which is exactly the detail this film exists to show.
    #
    # CRF 27 came out at 19.9 MB and CRF 30 at 14.5 MB; 32 lands at ~11.8 MB
    # with no visible loss against the source at the same frame. The budget is
    # real but not free-floating: the page ships preload="none", so not one
    # byte moves until a visitor clicks play.
    r = subprocess.run(
        [
            FFMPEG, "-y", "-hide_banner", "-loglevel", "error",
            "-i", str(src),
            "-vf", "hqdn3d=1.5:1.5:6:6,scale=%d:%d:flags=lanczos" % (WIDTH, HEIGHT),
            "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
            "-preset", "slow", "-crf", "32", "-pix_fmt", "yuv420p", "-g", "50",
            "-c:a", "aac", "-b:a", "96k", "-ac", "2",
            "-movflags", "+faststart",
            str(dest),
        ],
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        sys.exit(f"ffmpeg encode failed: {r.stderr.strip()}")


VIDEO_BUDGET_KB = 12.5 * 1024


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, help="the original factory video")
    args = ap.parse_args()

    src = pathlib.Path(args.src)
    if not src.exists():
        sys.exit(f"source video not found: {src}")

    OUT.mkdir(exist_ok=True)
    tmp = OUT / ".factory-frame.png"

    video = OUT / "factory-tour.mp4"
    encode_video(src, video)
    kb = video.stat().st_size / 1024
    if kb > VIDEO_BUDGET_KB:
        sys.exit(
            f"factory-tour.mp4 came out at {kb / 1024:.1f} MB, past the "
            f"{VIDEO_BUDGET_KB / 1024:.1f} MB budget. Raise the CRF rather "
            f"than ship it — a factory film nobody waits for proves nothing."
        )
    print(f"  {'factory-tour.mp4':<32} {kb:8.1f} KB")

    for stem, (seconds, _caption) in {**STILLS, POSTER[0]: (POSTER[1], "")}.items():
        grab(src, seconds, tmp)
        assert_sane(tmp)
        dest = to_webp(tmp, stem)
        print(f"  {stem + '.webp':<32} {dest.stat().st_size / 1024:8.1f} KB  (t={seconds:.2f}s)")

    tmp.unlink()


if __name__ == "__main__":
    main()

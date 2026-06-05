#!/usr/bin/env python3
"""Nano Banana (Gemini 2.5 Flash Image) generator for EX website assets.

Nano Banana는 Google의 이미지 생성 모델 `gemini-2.5-flash-image`의 별칭이다.
텍스트 프롬프트(+선택적 레퍼런스 이미지)로 이미지를 생성해 PNG로 저장한다.

1회 셋업:
    pip install google-genai pillow
    export GEMINI_API_KEY=...        # https://aistudio.google.com/apikey

사용:
    python3 nanobanana_generate.py \
        --prompt "..." \
        --out /abs/path/to/_workspace_img/gen/home-hero.png \
        [--ref /abs/path/public/ex-cube.png ...]   # 반복 가능
        [--aspect 16:9]                            # 프롬프트에 종횡비 지시로 합성
        [--model gemini-2.5-flash-image]

종료 코드: 0 성공 / 2 셋업 에러(키·라이브러리 없음) / 3 생성 에러
성공 시 stdout에 `OK <path> <W>x<H>` 출력.
"""
import argparse
import mimetypes
import os
import sys


def fail(code, msg):
    print(f"ERROR[{code}]: {msg}", file=sys.stderr)
    sys.exit(code)


def load_env_files():
    """프로젝트 루트의 .env.local / .env에서 KEY=VALUE를 읽어 환경에 채운다.
    이미 환경에 있는 값은 덮어쓰지 않는다(셸 export 우선). 별도 의존성 없음."""
    for name in (".env.local", ".env"):
        if not os.path.isfile(name):
            continue
        with open(name, encoding="utf-8") as fh:
            for raw in fh:
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k and k not in os.environ:
                    os.environ[k] = v


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--ref", action="append", default=[],
                    help="브랜드/스타일 일관성용 레퍼런스 이미지 경로(반복 가능)")
    ap.add_argument("--aspect", default=None,
                    help="예: 16:9, 1:1, 4:5 — 프롬프트에 구도 지시로 합성")
    ap.add_argument("--model", default="gemini-2.5-flash-image")
    args = ap.parse_args()

    load_env_files()
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        fail(2, "GEMINI_API_KEY 미설정. https://aistudio.google.com/apikey 에서 발급 후 "
                "`export GEMINI_API_KEY=...`")

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        fail(2, "google-genai 미설치. 실행: pip install google-genai pillow")

    client = genai.Client(api_key=key)

    prompt = args.prompt
    if args.aspect:
        prompt += (f"\n\nComposition: render in a {args.aspect} aspect ratio, "
                   f"full-bleed, no letterboxing, no borders.")

    parts = [prompt]
    for r in args.ref:
        if not os.path.isfile(r):
            fail(3, f"레퍼런스 이미지 없음: {r}")
        mime = mimetypes.guess_type(r)[0] or "image/png"
        with open(r, "rb") as fh:
            parts.append(types.Part.from_bytes(data=fh.read(), mime_type=mime))

    try:
        resp = client.models.generate_content(model=args.model, contents=parts)
    except Exception as e:  # noqa: BLE001 — 어떤 API 오류든 코드 3으로 표면화
        fail(3, f"생성 실패: {e}")

    img = None
    for cand in (getattr(resp, "candidates", None) or []):
        content = getattr(cand, "content", None)
        for part in (getattr(content, "parts", None) or []):
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                img = inline.data
                break
        if img:
            break

    if not img:
        # 모델이 이미지 대신 텍스트(거부/설명)를 반환하는 경우가 많다 — 그대로 노출
        txt = getattr(resp, "text", None)
        fail(3, f"이미지 미반환. 모델 텍스트: {txt!r}")

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "wb") as fh:
        fh.write(img)

    # PIL이 있으면 PNG 정규화 + 치수 보고 (QC가 실측에 사용)
    try:
        from PIL import Image
        im = Image.open(out)
        if im.format != "PNG":
            im = im.convert("RGBA") if im.mode in ("P", "LA") else im
            im.save(out, "PNG")
            im = Image.open(out)
        print(f"OK {out} {im.size[0]}x{im.size[1]}")
    except Exception:
        print(f"OK {out}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""OpenAI GPT Image (gpt-image-1) generator for EX website assets.

GPT 이미지 = OpenAI의 `gpt-image-1` 모델. 텍스트 프롬프트(+선택적 레퍼런스
이미지)로 이미지를 생성해 PNG로 저장한다. nanobanana_generate.py와 **동일한
CLI 계약**을 공유한다(에이전트가 엔진을 구분하지 않도록).

1회 셋업:
    pip install openai pillow
    export OPENAI_API_KEY=...        # https://platform.openai.com/api-keys

사용:
    python3 openai_generate.py \
        --prompt "..." \
        --out /abs/path/to/_workspace_img/gen/home-hero.png \
        [--ref /abs/path/public/ex-cube.png ...]   # 반복 가능 → images.edit 사용
        [--aspect 16:9]                            # 가장 가까운 지원 size로 매핑
        [--size 1536x1024]                         # 직접 지정(우선)
        [--quality high] [--background transparent|opaque|auto]
        [--model gpt-image-1]

종료 코드: 0 성공 / 2 셋업 에러(키·라이브러리 없음) / 3 생성 에러
성공 시 stdout에 `OK <path> <W>x<H>` 출력.
"""
import argparse
import base64
import os
import sys

# gpt-image-1이 지원하는 size만 허용된다. aspect를 가장 가까운 size로 매핑.
SUPPORTED_SIZES = {"1024x1024", "1536x1024", "1024x1536", "auto"}


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


def aspect_to_size(aspect):
    """16:9 류 종횡비를 gpt-image-1 지원 size로 매핑."""
    if not aspect:
        return "auto"
    a = aspect.strip().lower()
    landscape = {"16:9", "21:9", "3:2", "4:3", "landscape", "wide"}
    portrait = {"9:16", "4:5", "2:3", "3:4", "portrait", "tall"}
    square = {"1:1", "square"}
    if a in square:
        return "1024x1024"
    if a in portrait:
        return "1024x1536"
    if a in landscape:
        return "1536x1024"
    # "W:H" 형태면 비율로 판단
    if ":" in a:
        try:
            w, h = (float(x) for x in a.split(":", 1))
            if abs(w - h) / max(w, h) < 0.1:
                return "1024x1024"
            return "1536x1024" if w > h else "1024x1536"
        except ValueError:
            pass
    return "auto"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--ref", action="append", default=[],
                    help="레퍼런스 이미지 경로(반복) — 있으면 images.edit 사용")
    ap.add_argument("--aspect", default=None, help="예: 16:9, 1:1, 4:5 — size로 매핑")
    ap.add_argument("--size", default=None,
                    help="직접 지정(1024x1024/1536x1024/1024x1536/auto) — --aspect보다 우선")
    ap.add_argument("--quality", default="high",
                    choices=["low", "medium", "high", "auto"])
    ap.add_argument("--background", default="auto",
                    choices=["transparent", "opaque", "auto"],
                    help="UI/투명 PNG가 필요하면 transparent")
    ap.add_argument("--model", default="gpt-image-1")
    args = ap.parse_args()

    load_env_files()
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        fail(2, "OPENAI_API_KEY 미설정. https://platform.openai.com/api-keys 에서 발급 후 "
                "`export OPENAI_API_KEY=...`")

    try:
        from openai import OpenAI
    except ImportError:
        fail(2, "openai 미설치. 실행: pip install openai pillow")

    size = args.size or aspect_to_size(args.aspect)
    if size not in SUPPORTED_SIZES:
        fail(3, f"지원하지 않는 size: {size}. 허용: {sorted(SUPPORTED_SIZES)}")

    client = OpenAI(api_key=key)

    # 공통 파라미터. background는 transparent일 때만 명시(auto는 기본값과 동일).
    kwargs = dict(model=args.model, prompt=args.prompt, size=size, quality=args.quality)
    if args.background != "auto":
        kwargs["background"] = args.background

    try:
        if args.ref:
            handles = []
            for r in args.ref:
                if not os.path.isfile(r):
                    fail(3, f"레퍼런스 이미지 없음: {r}")
                handles.append(open(r, "rb"))
            try:
                resp = client.images.edit(image=handles, **kwargs)
            finally:
                for h in handles:
                    h.close()
        else:
            resp = client.images.generate(**kwargs)
    except Exception as e:  # noqa: BLE001 — API 오류를 코드 3으로 표면화
        fail(3, f"생성 실패: {e}")

    try:
        b64 = resp.data[0].b64_json
        img = base64.b64decode(b64)
    except Exception as e:  # noqa: BLE001
        fail(3, f"이미지 미반환: {e}")

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "wb") as fh:
        fh.write(img)

    try:
        from PIL import Image
        im = Image.open(out)
        if im.format != "PNG":
            im.save(out, "PNG")
            im = Image.open(out)
        print(f"OK {out} {im.size[0]}x{im.size[1]}")
    except Exception:
        print(f"OK {out}")


if __name__ == "__main__":
    main()

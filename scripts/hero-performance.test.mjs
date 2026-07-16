import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const heroSource = await readFile(new URL("../src/components/home/Hero.tsx", import.meta.url), "utf8");
const logoUrl = new URL("../public/ex-cube.png", import.meta.url);

const stageSource = heroSource.slice(heroSource.indexOf('<div className="c-stage">'), heroSource.indexOf('<span className="c-hud"'));

test("hero keeps the largest visual stable until the visitor selects a feed", () => {
  assert.doesNotMatch(heroSource, /setInterval\s*\(/, "hero must not auto-rotate its LCP candidate");
  assert.match(heroSource, /const activeMedia\s*=\s*CAMS\[current\]/);
  assert.doesNotMatch(stageSource, /\.map\s*\(/, "the program stage must not render stacked feed images");
  assert.equal((stageSource.match(/<Image/g) ?? []).length, 1, "the program stage should render one image");
  assert.match(stageSource, /src=\{activeMedia\.src\}/);
});

test("the initial PGM feed remains the only eager image", () => {
  assert.match(heroSource, /const \[current, setCurrent\] = useState\(3\)/);
  assert.match(heroSource, /priority=\{current === 3\}/);
  assert.match(heroSource, /loading=\{current === 3 \? "eager" : "lazy"\}/);
});

test("the eager header symbol is sized for its 60px retina display box", async () => {
  const png = await readFile(logoUrl);
  assert.equal(png.toString("ascii", 1, 4), "PNG");
  assert.equal(png.readUInt32BE(16), 120);
  assert.equal(png.readUInt32BE(20), 120);
  assert.ok((await stat(logoUrl)).size <= 30_000, "header symbol should stay below 30 KB");
});

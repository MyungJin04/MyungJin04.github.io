# Myungjin Song — Academic Portfolio

송명진의 학부연구생 및 국내 대학원 지원용 academic portfolio repository이다. 사이트는 Jekyll과 [al-folio](https://github.com/alshedivat/al-folio) v1.x starter를 기반으로 하며, 콘텐츠는 Markdown/YAML로 관리한다.

## Local development

Docker 사용을 권장한다.

```bash
docker compose up
```

브라우저에서 `http://localhost:8080`을 연다. 처음 실행할 때 이미지를 내려받거나 빌드하므로 시간이 걸릴 수 있다.

Ruby 3.3과 Bundler가 준비되어 있다면 다음 방식도 사용할 수 있다.

```bash
bundle install
bundle exec jekyll serve --livereload
```

## GitHub Pages deployment

1. `_config.yml`의 `url`은 `https://myungjin04.github.io`로 설정하고, user site이므로 `baseurl`은 빈 문자열로 둔다.
2. GitHub에 public repository `MyungJin04/MyungJin04.github.io`를 사용한다.
3. repository의 **Settings → Pages → Build and deployment**에서 source를 **Deploy from a branch**, branch를 `gh-pages` / `(root)`로 설정한다.
4. `main` 또는 `master` branch에 push하면 `.github/workflows/deploy.yml`이 사이트를 빌드해 `gh-pages` branch에 배포한다.

## Content updates

- About: `_pages/about.md`
- Projects index: `_pages/projects.md`
- One project per file: `_projects/*.md`
- Portfolio styling: `_sass/_portfolio.scss`

새 프로젝트는 기존 `_projects` 파일 하나를 복사한 뒤 `importance`, `year`, `categories`, 기간, 팀, 기술 태그와 본문을 수정한다. 공개 repository가 생기기 전에는 임의의 URL을 추가하지 않는다.

## Adding media later

### Profile image

이미지를 `assets/img/profile/`에 넣고 `_pages/about.md`의 `profile_image` 값을 해당 경로로 설정한다.

```yaml
profile_image: /assets/img/profile/myungjin-song.webp
```

값이 비어 있으면 이미지 영역 자체를 렌더링하지 않는다.

### Project thumbnail and header image

이미지를 `assets/img/projects/<project-slug>/`에 넣고 프로젝트 front matter를 수정한다.

```yaml
thumbnail: assets/img/projects/carla-hybrid/thumbnail.jpg
image: assets/img/projects/carla-hybrid/overview.jpg
image_alt: CARLA 주행 평가 화면
```

`thumbnail`은 카드, `image`는 상세페이지 상단에 사용한다. 현재는 프로젝트 카드의 텍스트 전용 레이아웃을 유지하기 위해 모든 `thumbnail` 값을 비워 두었다.

### Project detail video

상세페이지용 영상은 H.264 MP4를 `assets/video/projects/<project-slug>/`에, 첫 화면으로 사용할 WebP poster는 `assets/img/projects/<project-slug>/`에 저장한다. 페이지에서는 다음 include를 사용한다.

```liquid
{% include project_video.liquid
  src="/assets/video/projects/carla/carla_demo.mp4"
  poster="/assets/img/projects/carla/carla_poster.webp"
  aria_label="CARLA simulator driving clip"
%}
```

이 include는 muted loop와 poster를 사용한다. 실제 영상 source는 media가 화면 가까이 왔을 때 `assets/js/project-media.js`가 불러오며, reduced-motion 설정에서는 autoplay를 끄고 controls를 표시한다.

### Video or report links

프로젝트 front matter의 빈 `resources` 배열에 항목을 추가한다.

```yaml
resources:
  - label: Demo Video
    url: <actual-video-url>
  - label: Result Report
    url: /assets/pdf/result-report.pdf
```

목록이 비어 있으면 Resources section은 표시되지 않는다. 실제 URL이 준비된 뒤에만 추가한다.

### Optional CV PDF button

현재 CV 페이지와 메뉴는 공개하지 않는다. 나중에 웹사이트에서도 PDF를 제공하려면 파일을 `assets/pdf/cv.pdf`에 넣고 `_pages/about.md`의 `cv_pdf`를 설정한다.

```yaml
cv_pdf: assets/pdf/cv.pdf
```

값이 비어 있으면 Hero에는 Email 버튼만 표시된다.

## Compact AI breakdown — September 11, 2026

Renamed the panel “AI breakdown”, reduced heading, row, and panel spacing, and moved the scoring explanation into a disclosure that identifies local technology matching. Desktop entry stretches alongside the output so the compact breakdown aligns toward the bottom of the project narrative. Mobile retains normal flow. Production build passes; browser visual verification remains unavailable from the prior preview connection issue.

## Per-skill brief breakdown — September 11, 2026

Changed Selected Work heading to “A project built to solve a problem.” Added a responsive evidence breakdown below the input, with fixed category estimates: direct 95%, supporting 80%, related 60%, absent 0%. Scores concern the selected project, not personal proficiency. Added HTML recognition without inventing project evidence. Detected accessibility, performance, sensitive-data, document-review and component-system requirements are listed separately for review without fabricated numeric ratings. A regression case based on the supplied document-review frontend posting passes. All 98 tests and production build pass. Visual preview validation was unavailable due to local server/browser empty responses.

## Compact composer hint — September 11, 2026

Reduced the temporary job-description hint to 12px, removed its arrow, and moved it inside the composer above the placeholder with reserved spacing. This separates it from the knight above the box. Production build passes.

## Knight placement timing — September 11, 2026

During the name introduction the knight stays immediately above its text. Its move toward the composer is delayed 500ms into the box reveal; the final mark is smaller and at least 24px below the hero top, clear of the header. Production build passes.

## Persistent knight greeting — September 11, 2026

The intro knight now remains mounted, types “Hello, World” with a blinking cursor, and shrinks upward over 1.1 seconds to rest above the composer. It follows the entry left when a desktop result appears. Greeting typing finishes in 1.44 seconds, within the existing 1.8-second minimum accelerated stage. Reduced motion bypasses the greeting and displays the small knight directly. All 97 tests and production build pass. Browser verified the greeting and final knight position above the composer.

## Alignment explanation fade — September 11, 2026

Replaced simultaneous typewriter text with complete, readable lines that fade in together over 1.1 seconds. The existing slower card cascade remains. Reduced motion shows the text immediately. Production build passes.

## Empty-state guidance and privacy spacing — September 11, 2026

- Empty discovery now offers one centered group of actions, with related projects disabled in neutral gray until a match is available. A short viewport-triggered hint explains how to get tailored results and links back to the input.
- Added 18px above the privacy note to separate it from the submit button.
- All 96 tests pass, including empty-state guidance and single-action-group coverage. Production build succeeds.

## Gradual intro scroll acceleration — September 11, 2026

Scroll distance now modestly shortens the current intro stage rather than skipping to the form reveal. Knight and name stages each retain at least 1.8 seconds, with a 350ms lead time before an accelerated boundary; the form reveal remains 1.6 seconds. Touch movement uses incremental distance and wheel units are normalized. Explicit skip and accessibility bypasses remain available. All 95 tests pass, including light-scroll, momentum-burst, and touch progression; production build succeeds.

## Natural typing pace and broader example — September 11, 2026

- Slowed both simultaneous explanation lines from 10ms to 30ms per character.
- Replaced the React Native + Expo preset with React + TypeScript, which has several evidenced alternatives. Manual React Native/Expo matching remains available.
- All 94 tests pass, including an explicit check that the new preset enables related projects. Production build succeeds.

## Consistent discovery actions and toolkit glass — September 11, 2026

- Related-project action remains visible when only the primary project has evidence, with a disabled state and explanation rather than silently disappearing. Removed the duplicate full-portfolio action beneath the ticker when the discovery section is present.
- Regression tests compare all three example presets with equivalent manually entered briefs, including button availability and the single portfolio action.
- Every toolkit pill now uses the same translucent gradient and opacity as the content panels. Relevant pills retain their extra border glow and motion-aware pulse.
- All 94 tests pass; production build succeeds. Browser verified Docker + Kubernetes keeps both choices visible, explains the unavailable related action, and removes the duplicate button.

## Longer knight introduction — September 11, 2026

The knight prelude now lasts 2.8 seconds, matching the name introduction. Scroll/touch acceleration remains unchanged. All 91 tests and the production build pass.

## Knight prelude and parallel typing — September 11, 2026

- A 750ms knight-only prelude precedes the existing welcome. Scroll/touch still accelerates directly to the form reveal; reduced motion, explicit links, and keyboard escape retain their bypasses.
- The alignment explanation uses two stacked lines typed simultaneously at 10ms per character, replacing the previous sequential 22ms treatment.
- All 91 tests pass, including the knight timer boundary and scroll acceleration. Production build succeeds; browser check confirmed both lines advance together.

## Softer highlights and paced project reveals — September 11, 2026

- Toolkit highlights now use padded rounded pills, a 1.15-second pulse, and “What you’re looking for is highlighted” subtext after a submitted brief.
- Centered discovery actions use “Show me more related projects”. Related and full-gallery views begin with a typed explanation using evidenced technologies from the brief. Cards fade up over 1.2 seconds with staggered delays starting at 2.4 seconds; reduced motion presents content immediately.
- Full-gallery navigation waits for the new layout, then scrolls with a 1.2-second eased transition, cancellable by wheel, touch, or keyboard input.
- Content panels receive a slightly denser translucent gradient for a foggy finish without reinstating scroll-sensitive backdrop blur.
- All 91 tests pass and the production build succeeds. Browser checks verified progressive introduction text, stagger timings, rounded 1.15-second toolkit pulses, and no horizontal overflow at the checked mobile viewport.

## Mobile navigation and opt-in discovery — September 11, 2026

- Reviewed sampled frames of the supplied iPhone recording. Mobile navigation uses two stable rows, with résumé above the motion control. Header blur was replaced by a translucent tint to avoid smearing bright page elements into navigation.
- Removed scroll-driven background transforms/speed changes and live blur on content cards; stopped dimming already visible cards when they first intersect. Decorative background animation is now static to reduce compositing churn during scrolling.
- Successful submitted matches scroll to the demo on mobile after a 450ms layout delay. Touch/wheel cancels a pending scroll; reduced motion uses immediate scrolling. File extraction still requires the explicit Find action before matching.
- The scroll-revealed question offers related projects or the entire portfolio. Related cards and all gallery media remain unmounted until requested. Navigation and the browse link can open the entire gallery directly. Editing a brief clears the previous choice.
- Requested toolkit technologies receive a teal glow and gentle pulse; reduced/paused motion keeps a static highlight. Azure maps to the existing Azure SQL Database toolkit entry, without changing project evidence.
- 91 tests across nine suites pass, including opt-in discovery, clearing highlights, and mobile scroll cancellation. Production build succeeds. Browser checks verified the 390px header/demo offset, four opted-in recommendations, 13 full-gallery projects, and requested toolkit classes. Physical iPhone verification remains for the user; no production deployment was performed.

## Related preview framing — September 11, 2026

Replaced shallow letterboxed previews with full-width 16:10 image frames and top-aligned cover fitting. Browser review confirmed the backstop.ai and chess previews fill their frames consistently. Production build passes.

## Recommendation labels and still previews — September 11, 2026

- Highlighted Selected Work projects now have the introduction “You may also be interested in these”. It appears only when a brief has matched projects.
- Related-project cards use compact, lazy-loaded still previews from existing project assets. Images remain uncropped and decorative within clearly named project links.
- Production build passes. Desktop browser review confirmed all four example images load and the new prompt appears; the 360px layout has no horizontal overflow.

## Scroll discovery and lighter glass — September 11, 2026

- Up to four evidenced alternatives fade in below the submitted result as the section enters the viewport; each card links directly to its project. Reduced motion shows them immediately, and keyboard focus reveals the group.
- The main match and alternatives lead Selected Work in evidence rank order with a soft teal outline. Editing the brief clears the highlights and restores catalog order.
- Wide-screen entry padding is increased. Header opacity now fades from 35% to 4%; footer reverses this for a darker bottom edge. Contact has a responsive 64–120px gap before the footer.
- Production build succeeds and all 89 tests pass. Browser confirmed four recommendations revealing on scroll, matching gallery order/highlights, and contact spacing. No production deployment.

## Prompt guidance and Tech Alignment refinement — September 11, 2026

This update supersedes the historical coverage-label and native Controls notes below.

- The centered composer shows a floating “Drop a job description here” hint and soft border highlight after the welcome reveal. Both clear after four seconds, with a 500ms fade, or immediately on interaction. The accessible input label remains; examples sit inside a collapsed disclosure.
- Results now show an explicitly described Tech Alignment estimate, with evidenced technologies weighted twice as much as gaps and a 95% cap. Literal counts and missing technologies remain visible. React + Firebase + Azure selects PrizeCheck at 80%, with two of three technologies evidenced and Azure listed as a gap. Ranking still uses actual evidence.
- Video overlays link to each existing live demo instead of exposing a Controls button. Source-only projects do not receive invented demo links. Playback limits and fallback behavior remain intact.
- Résumé links have a stronger gold treatment. Header and footer gradients fade from darker tops into translucent glass. The current résumé and recordings remain until replacements are supplied.
- Verification: all 88 tests across eight suites pass; production build succeeds. Browser checks confirm the quiet composer, 80% example, actual PrizeCheck demo destination, header/footer gradients, and no horizontal overflow at 360px. Desktop composition was reviewed at 1440px. Existing tooling warnings remain non-blocking.

# Seamless portfolio: design and interaction audit

Updated September 11, 2026. Implemented locally in this workspace. Preview: http://localhost:4173/. No deployment.

## Timing adjustment: a slower welcome

The welcome now settles for 2.8 seconds, then transitions over 1.6 seconds: the welcome fades out over 800ms and the form starts a 1.2-second fade after a 400ms overlap offset. Total automatic sequence: 4.4 seconds, up from 2.05 seconds. Scrolling skips the opening hold but preserves the full, slower transition. Skip intro, keyboard escape paths and reduced-motion bypass remain immediate. Timing tests were updated to verify release at the new deadline.

## Current refinement: welcome, accelerated reveal and résumé access

Implemented September 11, 2026. Supersedes the immediate form entrance described below.

- The arrival opens with “Welcome to my portfolio,” “Hi, I’m Chris.” and “Let’s find the work that fits.” Text rises softly into focus with a small animated light line. The entry waits 1.4 seconds, then fades in over 650ms.
- A downward wheel gesture, one-finger upward swipe, Page Down, Space or Arrow Down begins the form reveal immediately. Those scrolling gestures are briefly consumed until the 650ms reveal finishes, then listeners are removed and ordinary scrolling resumes. Repeated scroll events cannot extend the delay. Pinch zoom, upward scrolling, explicit links, Tab, Escape, End and Skip intro remain available. No body overflow lock is applied.
- Reduced motion, paused motion, hidden-page transitions, restored scroll positions and direct section links bypass the intro. A regular untouched introduction finishes automatically in 2.05 seconds; no user action is required. The form is inert and hidden from assistive technology until ready, rather than allowing focus into invisible controls.
- Browser verified Page Down changed welcome to revealing with scrollY=0, then the ready state removed aria-hidden and a subsequent Page Down scrolled to y=980. Timer/listener tests cover automatic completion, accelerated completion, touch, keyboard escape paths, motion changes and unmount cleanup.
- The existing résumé download is now displayed in the header at mobile sizes too. At 360px it remains within the viewport with a 44px target. It points to `/assets/christopher-capizzuto-resume.pdf`; replace that file to update the résumé without changing links. No new résumé was fabricated.
- Verification: **84 tests passed in 8 suites**, optimized production build compiled successfully, local build refreshed. Existing matcher, parser, playback and result animations remain intact. Native touch and physical-device performance remain unverified beyond simulated touch events and browser sizing.
- GitHub publication is prepared on `codex/portfolio-welcome-refinement`, based on the repository's current main commit `eea85a49ee8a331dd0416510a375629b63d936b4`. The branch includes the accumulated local portfolio refinements. Main and production are not being changed. Generated `public/vendor` is excluded from source control; prestart/prebuild restores it from the locked parser dependencies.

## Earlier refinement: centered entry and restrained glass

Implemented locally September 11, 2026. This section supersedes the earlier featured-project, immediate-example-match and entirely unboxed presentation descriptions below. No deployment.

- Arrival now shows only the entry form, centered horizontally and positioned near the center of the available viewport. The form fades in from zero opacity with a small upward movement; the accessible h1 remains visually hidden. No hero project, score or placeholder preview mounts before submission.
- Examples populate the field without matching. TXT/PDF/DOCX attachments are still parsed locally, but successful extraction now announces that the document is ready and waits for the explicit match button. Parsing errors and the 12-second timeout remain available in the form.
- A successful button submission mounts the project beside the form on desktop. A 700ms wrapper translation moves the entry left while project media/copy fade in and the evidence score counts up. This uses the existing result state and introduces no artificial loading wait. Separate wrapper/form transforms prevent the arrival and layout animations from fighting each other. Vertical document positioning is stable as results mount; browser scroll anchoring is disabled so new result height does not pull the viewport toward content below.
- Browser observed the entry move from x=430 through x=198.3 to x=120 at 1440px, alongside project opacity .73 and score 53%, finishing at full opacity and 100%. The final entry width remains 580px. Mobile keeps the form centered and puts the result beneath it, with no horizontal translation.
- Unknown/unsupported briefs show a centered explanation without suggesting an unrelated project. Empty submissions still show an accessible error. Editing a submitted brief removes its stale result; the next match requires another button press. The engine's evidence ranking and truthful score meaning are unchanged.
- Removed the separate featured gallery entry. All 13 projects now use the same equal-column cards; PrizeCheck retains its Under the hood disclosure and original links. Recordings, portrait ratios and the shared two-video coordinator are preserved.
- Added fogged glass to the icon conveyor (16px background blur, restrained tint and fine edge). Project cards, About and Contact use lighter glass (5px background blur, very low-opacity tint, fine borders and 18px corners). Foreground content is not blurred. Existing glyph contrast shadows and continuous background remain.
- Rewrote all 13 project summaries around their concrete purpose and behavior. Gallery: “Built to solve something.” About: “Good questions. Useful software.” Contact: “Have something in mind?” with “Email Chris.” Copy retains repository-backed distinctions, including the optimizer's local recommendation engine and FunkFit's native mobile app. Contact addresses, résumé and source/live URLs are unchanged.
- Verification: **76 tests pass across 7 suites**; optimized build compiled successfully and `build` was rebuilt. Added coverage for a project-free arrival, examples waiting for submission, file-ready state, explicit submit, and editing clearing a stale result. Existing parser, evidence, motion and playback suites still pass.
- Browser checks covered the centered arrival, button-triggered split transition, completed score, About/Contact surfaces and all 13 gallery cards. At 360, 390, 430, 834, 1440 and 2456px, document width equals viewport width. Fresh 390px arrival has an empty textarea, no result and form center x=195. Desktop cards are 584px wide; the gallery portrait remains native at approximately 131.36×284.25px; matcher portrait remains approximately 221.82×479.99px desktop and 194.09×419.99px mobile.
- Reduced motion and the persistent pause preference suppress decorative transforms/fades while keeping the form and results visible. Existing automated preference/playback checks remain applicable. No new physical-phone or screen-reader session was available; backdrop-filter performance and touch/native playback should still be checked on physical devices.
- Preview remains **http://localhost:4173/**. Nothing deployed.

## Earlier refinement: evidence-based matching and aligned gallery

Implemented September 11, 2026. This section supersedes the historical descriptions below (including the former 7/5 layout and MongoDB/Tailwind FunkFit examples). No deployment. The checkout has no Git metadata; a pre-edit source/audit/parser backup was saved at `/tmp/portfolio-before-refinement`.

### Presentation and interaction

- The opening h1 remains accessible but is visually hidden. The large slogan and supporting paragraph are removed; “Drop a job description here” and the adjacent featured/result media lead the desktop view. Identity is secondary. Mobile retains logical one-column reading order.
- Foreground text inherits a tightly layered navy glyph shadow with a restrained cool highlight. It follows glyph outlines and wrapping, including caption text, without adding rectangular backplates. Existing seamless atmosphere remains.
- The gallery uses two equal desktop columns, 40px gutters, identical transparent 16:10 media rows and aligned caption starts. Removed all 7/5 spans, alternating 48px offsets and screenshot-parallax JavaScript/CSS. At 1440px and wider checked sizes, cards measure 580px and media rows 362.5px. Each pair has equal caption y coordinates.
- FunkFit remains 720:1558: gallery video measured 143.48×310.5px, contained in the shared desktop row with controls beneath. Matcher video remains portrait-native at 221.82×479.99px desktop and 194.09×419.99px mobile. No cropping or opaque gallery container was introduced.
- Result media/copy, technology labels and score animate from actual result changes. Browser verification observed the score at 64%, then 100%, with the correct final accessible status already present. Typed matches have no artificial loading delay. Loading represents actual worker parsing only.
- The explanation is visible after every submission. Up to two alternatives are available in a compact disclosure. Exact evidence ties use role relevance and then a deterministic alphabetical title order; they do not imply one project is universally better.

### Evidence model and matching

`src/data/projectEvidence.js` contains canonical skills, aliases, supporting technologies, capability/role tags, source attribution and audit provenance. Catalog records add their preserved repository URL. Evidence comes from the repository audit findings supplied in this request; repositories were not freshly cloned or independently re-audited during this refinement. No audit hashes or original audit dates were supplied: `auditCommit` and `auditDate` are null; `recordedAt` is September 11, 2026. CareCation retains existing display metadata but is explicitly unverified and contributes no scored technology evidence.

| Project | Canonical evidence / supporting notes |
| --- | --- |
| PrizeCheck | Next.js, React, TypeScript, Tailwind, Firebase, GitHub Actions, Docker, Kubernetes, Linux; kind supports the local Kubernetes lab, production remains Vercel |
| DraftKings NBA Optimizer | Next.js, React, TypeScript, Tailwind; Python supporting tooling; analyst is a local recommendation engine, not an LLM |
| Amazon Room Generator | Next.js, React, TypeScript, Tailwind, Three.js, PDF.js, OCR/Tesseract |
| FunkFit | React Native, Expo (SDK 54), TypeScript, Expo Router, React Navigation, AsyncStorage, HealthKit; native mobile APIs |
| CareCation | Existing metadata preserved, unverified; no repository URL |
| backstop.ai | Next.js, React, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Claude API; Statcast/ML tooling |
| ParkNYC | SwiftUI, React, Vite, TypeScript, Express, PostgreSQL, PostGIS, MapLibre, REST API |
| Contessa Shop | Next.js, React, TypeScript, Tailwind |
| Concrete Jungle Sports | Next.js, React, TypeScript, Tailwind |
| Hudson Chess | React, JavaScript, Vite, CSS; Vercel serverless functions noted without inferring additional dependencies |
| Dragapultist | Next.js, React, TypeScript, Tailwind, MongoDB, NextAuth; additional Electron client |
| Marketplace Chrome Extension | Vanilla JavaScript, Chrome Extension, Manifest V3; content scripts/tabs and Amazon/Facebook Marketplace integration |
| Chess Opening Driller | Next.js, React, TypeScript, Tailwind |

- Recognition uses a bounded, fixed alias dictionary, longest phrases first. “React Native” consumes the embedded generic React occurrence; a separate React mention is still recognized. Repetition never increases requested-skill counts.
- Ranking compares exact canonical matches, matched requested-skill count, coverage, role/capability relevance, then title. Explicit broader relationships permit generic React to cover React Native, Swift to cover SwiftUI, SQL to cover PostgreSQL, and AI/LLM to cover Claude API. These are distinguished from exact matches. No generic API or iOS token is fabricated as a project technology.
- React Native and Expo select FunkFit at 100%; SwiftUI and PostGIS select ParkNYC. Generic React ties deterministically start with Amazon Room Generator; a generic React/mobile brief prefers ParkNYC. Mobile/health-only text can suggest FunkFit, but remains unscored.
- Unknown briefs have `best: null`, “No recognized technologies,” and a labeled featured suggestion. Recognized but unsupported technologies have `best: null`, 0% coverage and no matching-project claim. Alternatives contain only projects with positive evidence.
- Scores are recognized keyword evidence coverage, never hiring probability or overall qualification. Supporting tooling is identified in the best-result explanation when applicable. Unrecognized requirements, seniority and experience are not scored.

### Untrusted text and document safety

- Matching remains deterministic and local: no backend, AI service, document instruction execution or external submission. Text never reaches HTML insertion, selectors, eval or generated executable code.
- A shared normalization policy applies NFKC, rejects null/disallowed C0/C1 controls, separates hidden/bidi controls without joining fragments, and checks the 30,000-character limit before and after normalization. The mirrored worker/UI helper is checked for exact equality in tests.
- Preserved 5 MB uploads, 30-page PDFs, 12-second timeout, isolated worker, PDF `isEvalSupported:false`, disabled WASM/font/offscreen processing, and worker termination/cleanup.
- DOCX now validates ZIP directory completeness and file count (200 max), rejects duplicate document parts and active/embedded/external content, inspects XML relationship files, and enforces the 8 MiB expanded limit across **all** entries. XML entities/DOCTYPE, macros, object/altChunk/instruction fields and external relationships are rejected. Text runs are extracted as strings only.
- PDF checks cover encoded action-name markers, JavaScript, embedded files, launch/open/additional actions, XFA, parsed document/page scripts, attachments, open actions and active link annotations. PDF.js resources are destroyed after success or failure. Conservative rejection may require pasting text from documents with links or active features.
- Tests cover script/HTML/event-handler markup, SQL/shell/formula-like strings, prompt-injection language, Unicode/bidi/control input, repeated keywords, long adversarial strings, malformed/truncated ZIP, entities, embedded objects/macros, external relationships, oversized individual/aggregate archives, excessive files, active PDFs and parsed PDF restrictions. This is targeted parser defense, not an antivirus or exhaustive file-format security certification.

### Verified checks and limits

- `CI=true npm test -- --watchAll=false`: **75 tests passed, 7 suites**. Includes matcher/UI/no-match/alternatives/announcements, real fflate ZIP decompression, PDF API boundary tests, genuine worker loading/completion/timeout cleanup, reduced motion, hidden-tab preferences and existing playback coordination tests.
- `npm run build`: **compiled successfully**; rebuilt `build`. Existing browser-data freshness and testing-library act deprecation notices remain non-blocking. No new lint warning.
- Browser reviewed idle, native portrait results, landscape results, unknown/zero-evidence states, alternative disclosure, status text and file error. TXT/DOCX/PDF imports were exercised; explicitly confirmed `brief.docx` → FunkFit 100% and a real PDF containing SwiftUI/PostGIS → ParkNYC 100%. Active PDF marker rejection was confirmed with no browser console errors.
- Browser checked 360, 390, 430, 834, 1440 and 2456px widths (wide reference size 2456×1646). Document width equaled viewport width at all sizes. Desktop caption alignment was measured across every pair, and portrait dimensions were checked at every width.
- A disposable page forced code to peak opacity (.34 desktop/.28 mobile); text remained visually distinct. It also doubled computed foreground text sizes and verified no page overflow or right-edge clipping of sampled headings/body/controls at 1440 and 360px. This is a visual/layout stress check, not a formal pixelwise WCAG contrast certification or OS-level zoom test. The temporary page was removed by the final build.
- Keyboard Tab from the textarea reaches the attachment input; visible focus styles and semantic controls remain. Automated tests verify status/error content, but a physical screen reader was not exercised.
- Browser confirmed manual play and pause, native Controls, explicit playback with motion paused, and a playing-video count of one in the checked view. Deterministic coordinator tests retain the two-video cap, hidden-tab/offscreen pauses, pending-play races and manual-pause persistence. OS reduced-motion and hidden-tab changes are covered by automated preference/coordinator tests rather than a new physical-device check.
- All 13 projects remain; comparison with the backup confirms every original URL string is preserved. Contact/résumé destinations, recordings, knight, ProjectMedia implementation and shared playback coordinator are unchanged.
- No physical phone was available. Real touch/keyboard/browser chrome, safe areas, battery/rendering cost and platform-specific native media controls still need device checks.
- Existing local server continues serving the rebuilt site at **http://localhost:4173/**. No deployment was performed.

## Historical refinement notes

## Latest refinement: guided matching, richer atmosphere, and knight lockup

- Replaced the opening message with “Give me a role. I’ll show you the work.” and the approved supporting, field, attachment, example, submit, loading, result, gallery-link, and gallery-heading copy. Identity and availability stay secondary to the matcher.
- Rebuilt the supplied pixel knight as a transparent, crisp SVG with the teal mane, cream contour, bright eyes, navy silhouette, base, and `0101` detail. Header and footer now use the same knight/name lockup: 28px/20px desktop and 24px/18px mobile, a 10px gap, optical centering, and a 44px link target.
- Added an eight-second eye blink and mane-glint flicker that only runs while the SVG and page are visible. The outline remains still. Pointer hover or keyboard focus makes one 2px hop with a short teal glow when decorative motion is enabled.
- Raised animated rainbow-code opacity to 20–34% on desktop with a 24% rest, and 18–28% on mobile with a 21% rest. Paused and reduced-motion rendering now removes the animation and uses the correct richer resting value. Existing aura colors are approximately 30% stronger, while broad reading fades are lighter and still feather fully to transparency.
- Added a 900ms teal perimeter/label invitation after the headline, followed by one reminder after eight untouched visible seconds. Focus, typing, attachment interaction, drag entry, example selection, or submission permanently cancels the reminder for the mounted page session. Hidden tabs and offscreen forms do not run the reminder.
- Removed the former 450ms artificial wait from typed matching. File parsing retains its real loading state and existing 12-second safety timeout. Loading media emphasis, selected media/copy, matched technologies, and score count-up now respond to actual state transitions.
- Retained the local parser, 30,000-character input limit, 5 MB TXT/PDF/DOCX limit, privacy copy, recognized-technology coverage meaning, visible gaps, all project facts/URLs, all 13 projects, and the two-video coordinator. Recordings and résumé are unchanged.

### Refinement verification

- All 21 existing tests pass and the optimized production build succeeds. Existing browser-data freshness and testing-library deprecation warnings remain non-blocking.
- Browser-reviewed 360, 390, 430, 834, and 1440px layouts. All checked widths had matching viewport/document widths with no horizontal overflow. Headline wrapping was three lines at 360/390, two at 430/834, and one at 1440; the required knight and name sizes switch at 900px.
- Verified the 900ms entrance treatment visually, the untouched eight-second reminder, and permanent cancellation after example selection. Keyboard Tab order reaches the matcher after the skip link, brand, navigation, and motion control. The result status announced “PrizeCheck: 100% skill coverage” and the selected technologies entered as React and TypeScript.
- Verified the empty-submit error and a portrait FunkFit result from “MongoDB Tailwind” at 834px. The recording remained 194×420 in the checked viewport with transparent surrounding space and no page overflow.
- Verified the persistent motion toggle across reload. Paused code returns to the requested resting opacity; explicit media controls remain present. Deterministic automated coverage continues to verify the two-slot playback budget, visibility threshold, manual-pause memory, hidden-tab pause, blocked autoplay, and pending-play races.
- The in-app browser did not expose a working page/text zoom control, so a fresh doubled-text visual pass could not be completed in this run. Existing wrapping, overflow protection, 16px mobile input/body text, and 44px interactive-target rules remain in place. A physical phone was also unavailable: real touch, on-screen keyboard, browser chrome, and safe-area behavior still require on-device checks.

## Latest refinement: backgrounds, portraits, and identity

- Removed per-caption, featured-copy, matcher-result and other individual reading backplates. Section-level closest-side gradients reach full transparency at every boundary; the long gallery repeats broad transparent-ended shading rather than attaching rectangles to cards.
- Removed media-stage fill and the outer stage shadow. FunkFit uses its explicit 720:1558 recording dimensions, capped at 480px tall on desktop and 420px below 900px, with a subtle edge/shadow on the recording itself.
- Portrait controls sit in a transparent row below the recording and wrap at enlarged text sizes. The shared playback observer still watches the video element, not its surrounding layout. Native controls, media fallback and the two-video budget remain intact.
- Added a decorative, code-native pixel knight SVG in teal, cream and navy to header and footer. It is 36px wide, has no tile, and makes one 2px hop/glow on hover or keyboard focus when motion is enabled.
- Rechecked 360, 390, 430, 834 and 1440px widths, including a FunkFit matcher result from “MongoDB Tailwind.” Confirmed portrait dimensions, transparent surrounding space, native-control access, and no page overflow. Doubled-text checks at mobile and desktop widths passed; the temporary test page was removed.
- Existing 21 tests pass and the production build succeeds. Matching, parser, facts, URLs and contact methods are unchanged. Physical-phone verification remains outside the browser checks.

## Design delivered

- Removed the hero preview’s enclosing card and header strip. Media leads; score, explanation, technologies and links sit beneath it over a localized reading fade. The textarea remains a clearly interactive surface.
- Wide, unboxed PrizeCheck feature with adjacent copy, independent live/source links and the explicit Under the hood disclosure.
- Twelve remaining projects form a vertical editorial gallery: desktop rows alternate 7/5 and 5/7 proportions, with a 48px secondary offset. Below 900px, the gallery and matcher stack in logical source order without offsets or screenshot parallax.
- Removed numbered section labels and repeated containers. Broad teal, violet and gold illumination connects sections while keeping the navy base and rainbow code visible.
- About is a flowing narrative followed by an open Currently exploring list. Stack retains stable icons and frontend/backend/tools groupings without pill containers. Desktop connecting rules are decorative; mobile omits them.
- Contact uses an open typographic finish over a warm glow. Reading fades protect text without obscuring preview edges.
- Mobile has approximately 20px gutters, fluid headings, 16px body/input text, wrapping labels and filenames, persistent playback controls and at least 44px control hit areas. Portrait media is contained rather than cropped. Navigation offsets follow the actual header height, including enlarged text.

## Playback and motion

- One shared coordinator manages hero, featured and gallery videos, with at most two desired playback slots, including pending play promises. Explicit playback takes priority, followed by visible fraction and proximity to viewport center.
- Automatic muted inline playback requires at least 50% visibility. Videos pause offscreen and on hidden tabs. Manual pauses persist for the page session, including remounting a selected project.
- Compact Play/Pause and Controls buttons remain visible. Controls exposes the browser’s native controls. Blocked autoplay keeps the poster and offers explicit play; failed media retains a still preview and project-link fallback.
- Reduced motion and the saved motion toggle disable automatic playback and decorative animation. Explicit playback remains available. Repeated matching suspends the hero demo.
- Metadata loads near the viewport; posters remain until playback. Landscape recordings retain uncropped wide frames; portrait recordings use explicit native dimensions.
- One-time heading unmask, coordinated entrance reveals, typing glow, small spring-like control feedback and contact-link movement. Desktop screenshot translation is bounded to ±24px.
- Three non-overlapping mobile code columns drift more slowly. Scroll velocity briefly raises code animation rate, never above 2×, returning to rest within approximately 600ms. Pointer effects are omitted below 900px. The ticker pauses offscreen, on hover/focus and with motion disabled.
- Playback’s scroll work uses one animation-frame batch. Background work settles after scroll; hidden tabs stop decorative animation. Shared timing tokens cover 180ms feedback, 450ms reveals and 900ms atmosphere transitions.

## Preserved behavior and facts

The matching engine, technology-coverage score, local parser, upload limits, project facts, contact methods and URLs are unchanged. All 13 projects remain. Short presentation descriptions do not replace matching data. No backend, external AI service or public API was introduced.

Scores represent recognized technology coverage in a project, not hiring probability or an overall qualification estimate. Gaps and the scoring explanation remain available. TXT/PDF/DOCX parsing stays local with the existing size, extraction and timeout limits. These checks are not an antivirus guarantee.

## Verification

- Production build succeeds. 21 automated tests cover matching/inventory, motion preferences, media fallback, the two-slot budget, visibility thresholds, explicit priority, manual pause persistence, hidden-tab behavior, blocked autoplay, pending-play races and delayed native media events.
- Visually reviewed 360px, 390px, 430px, 834px and 1440px layouts in the local browser. Checked the hero, gallery, About, Stack and Contact across those views. No horizontal page overflow or clipped key headings/controls at the checked widths.
- A temporary page doubled computed text sizes; mobile and desktop checks found no horizontal clipping of headings, body text, inputs, buttons and links. This is a text-enlargement stress test, not a claim of OS-level zoom automation. The temporary page is excluded from delivery.
- Browser checks exercised empty submission, technology examples, PDF and DOCX imports, repeated matching, invalid PDF rejection, automatic playback, manual pause, re-entry, motion pause, explicit play with motion disabled, native controls and keyboard navigation. TXT import was verified in the preceding redesign pass; the parser is unchanged.
- Browser playback stopped when navigating away from media. The coordinator’s deterministic tests cover the two-video limit, hidden tabs and blocked playback conditions that are harder to reproduce consistently by hand.
- Independent project/source links remain: 22 links including the feature, with no nested anchors. Existing destinations were preserved; availability of third-party sites was not re-audited.
- Viewport changes exercised portrait and landscape-sized layouts. A physical phone was not available: real touch, on-screen keyboard, browser chrome and notched-device safe-area behavior still need an on-device check. CSS includes safe-area padding and header-aware focus/section offsets.

Existing tooling emits browser-data freshness and test-library act deprecation warnings; neither blocks the build or tests. No deployment or fabricated project claims were added.

# v3.1.1 (Sat Feb 06 2021)

#### ⚠️ Pushed to `master`

- Add 'isFunction' check ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.1.0 (Sat Feb 06 2021)

#### 🚀 Enhancement

- Support giving async children function to 'Zombi' [#35](https://github.com/smithki/zombi/pull/35) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Support giving async children function to 'Zombi' ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.8 (Mon Feb 01 2021)

#### ⚠️ Pushed to `master`

- Merge branch 'master' of github.com:smithki/zombi ([@smithki](https://github.com/smithki))
- Skip prompts where data has been provided via props ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.7 (Sun Jan 31 2021)

#### ⚠️ Pushed to `master`

- Merge branch 'master' of github.com:smithki/zombi ([@smithki](https://github.com/smithki))
- Add catch for prompts ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.6 (Sun Jan 31 2021)

#### ⚠️ Pushed to `master`

- Better generic typing for 'scaffold' function ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.5 (Sat Jan 30 2021)

#### ⚠️ Pushed to `master`

- Merge branch 'master' of github.com:smithki/zombi ([@smithki](https://github.com/smithki))
- Assign data instead of deep-merging ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.4 (Sat Jan 30 2021)

#### ⚠️ Pushed to `master`

- Merge branch 'master' of github.com:smithki/zombi ([@smithki](https://github.com/smithki))
- Add initial 'Zombi' data to suspended answers before rendering next child ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.3 (Sat Jan 30 2021)

#### ⚠️ Pushed to `master`

- Pin an earlier version of 'istextorbinary' dependency ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.2 (Fri Jan 29 2021)

#### ⚠️ Pushed to `master`

- Move React to peer dependencies ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.1 (Mon Dec 28 2020)

#### 🐛 Bug Fix

- Cleanup README files [#34](https://github.com/smithki/zombi/pull/34) ([@smithki](https://github.com/smithki))
- Merge branch 'master' into smithki-cleanup-readme ([@smithki](https://github.com/smithki))
- Cleanup README files ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v3.0.0 (Sun Dec 27 2020)

#### 💥 Breaking Change

- Breaking changes for `v3.0` [#32](https://github.com/smithki/zombi/pull/32) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Add Experimental API using React/JSX [#33](https://github.com/smithki/zombi/pull/33) ([@smithki](https://github.com/smithki))
- Final touches on new API ([@smithki](https://github.com/smithki))
- Reduce complexity, remove 'listr2' and streamline UX ([@smithki](https://github.com/smithki))
- Port canonical generators over to JSX-based API ([@smithki](https://github.com/smithki))
- Add prompting features for consuming user input as EJS data ([@smithki](https://github.com/smithki))
- Improve TypeScript support for enquirer prompts ([@smithki](https://github.com/smithki))
- Add 'license-file' and 'package-json' scaffolds using new API ([@smithki](https://github.com/smithki))
- Polish off the new approach (now, to try it out) ([@smithki](https://github.com/smithki))
- Experimental approach using declarative JSX syntax ([@smithki](https://github.com/smithki))
- Add breaking changes for v3.0 ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v2.3.0 (Tue Dec 22 2020)

#### 🚀 Enhancement

- Make 'exec' operator options resolveable [#31](https://github.com/smithki/zombi/pull/31) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Make 'exec' operator options resolveable ([@smithki](https://github.com/smithki))

#### 🔩 Dependency Updates

- Bump ini from 1.3.5 to 1.3.6 [#28](https://github.com/smithki/zombi/pull/28) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v2.2.0 (Tue Dec 22 2020)

#### 🚀 Enhancement

- Return props from `generator.run` [#30](https://github.com/smithki/zombi/pull/30) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Add 'GeneratorProps' helper type ([@smithki](https://github.com/smithki))
- Return props from 'generator.run' and fix' generator.prompt' typings ([@smithki](https://github.com/smithki))

#### ⚠️ Pushed to `master`

- Rename 'GeneratorProps' to 'PropsFromZombi' ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v2.1.0 (Fri Dec 11 2020)

#### 🚀 Enhancement

- Skip EJS rendering for binary files [#27](https://github.com/smithki/zombi/pull/27) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Fix FS bugs introduced in the last commit ([@smithki](https://github.com/smithki))
- Skip EJS rendering for binary files + cleanups ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v2.0.0 (Fri Dec 11 2020)

#### 💥 Breaking Change

- Add 'mapEffects' operator [#26](https://github.com/smithki/zombi/pull/26) ([@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Add 'mapEffects' operator ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v1.1.1 (Tue Nov 17 2020)

#### 🐛 Bug Fix

- Add contributing guide, changelog, and PR/issue templates [#25](https://github.com/smithki/zombi/pull/25) ([@smithki](https://github.com/smithki))
- Add contributing guide, changelog, and PR/issue templates ([@smithki](https://github.com/smithki))

#### Authors: 1

- Ian K Smith ([@smithki](https://github.com/smithki))

---

# v1.1.0 (Tue Nov 17 2020)

#### 🚀 Enhancement

- Release with continuous delivery [#24](https://github.com/smithki/zombi/pull/24) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@smithki](https://github.com/smithki))

#### 🐛 Bug Fix

- Add continuous delivery [#23](https://github.com/smithki/zombi/pull/23) ([@smithki](https://github.com/smithki))
- Add continuous delivery ([@smithki](https://github.com/smithki))
- v1.0.0 [#21](https://github.com/smithki/zombi/pull/21) ([@smithki](https://github.com/smithki))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Ian K Smith ([@smithki](https://github.com/smithki))

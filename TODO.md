# TODO: Fix Next.js multiple lockfiles warning

**✅ Task completed: Next.js multiple lockfiles warning fixed.**

Removed `front_web/pnpm-lock.yaml`, added `turbopack.root: './'` to `front_web/next.config.mjs`, ran `npm install`.

To test: `cd front_web && npm run dev` (should show no lockfile warning).

Uniformized to npm as per project scripts.



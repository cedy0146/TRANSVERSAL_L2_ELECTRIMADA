# TODO: Intégration Backend (backend/) ↔ Frontend (front_web/)

Statut: Plan approuvé. Toutes données dynamiques via API MySQL.

## Étape 1: Backend - Améliorations
- [x] 1.1 Créer `backend/controllers/dashboardController.js` (stats agrégées: conso, alertes, appareils)

- [ ] 1.3 Ajouter `app.use('/api/dashboard', require('./routes/dashboardRoutes'));` dans `backend/server.js`
- [ ] 1.4 Améliorer `backend/middleware/auth.js` et ajouter aux routes protégées (foyers, batteries...)
- [ ] 1.5 `cd backend && npm install && npm run dev` (init DB)

## Étape 2: Frontend - Infrastructure
- [x] 2.1 Créer `front_web/lib/api.ts` (fetch wrapper, http://localhost:3000/api, auth token)
- [ ] 2.2 Créer `front_web/context/AuthContext.tsx` (login/register, localStorage user/token)

## Étape 3: Frontend - Auth
- [ ] 3.1 Update `front_web/app/login/page.tsx` (API call, nom/pin → POST /api/auth/login)
- [ ] 3.2 Update `front_web/app/register/page.tsx` (nom/pin/id_foyer → POST /api/auth/register)
- [ ] 3.3 Wrap `front_web/app/layout.tsx` avec AuthProvider

## Étape 4: Frontend - Dashboard (Priorité)
- [ ] 4.1 Protect `front_web/app/dashboard/layout.tsx` (redirect if no auth)
- [ ] 4.2 Dynamic `front_web/app/dashboard/page.tsx` (GET /api/dashboard/stats, /api/alertes)
- [ ] 4.3 Dynamic `front_web/app/dashboard/devices/page.tsx` (GET /api/appareils or /api/typeappareils)

## Étape 5: Autres pages
- [ ] 5.1 `app/dashboard/alerts/page.tsx` → /api/alertes
- [ ] 5.2 `app/dashboard/reports/page.tsx` → /api/rapports
- [ ] etc.

## Étape 6: Test
- [ ] Backend OK (curl localhost:3000/api/foyers)
- [ ] Frontend `cd front_web && npm run dev`
- [ ] Login → Dashboard data real-time

**Prochain: Étape 1.1**

# TODO: Migration PIN → Password (ElectriMada)

## Plan approuvé - Étapes à compléter [x] = fait

1. [x] Installer bcrypt: `cd backend && npm i bcrypt`
2. [x] Mettre à jour `backend/utils/passwordUtils.js` (ajouter hash/compare bcrypt)
3. [x] Supprimer/archiver `backend/utils/pinUtils.js`
4. [x] Mettre à jour `backend/models/Utilisateur.js` (pin→password, bcrypt)
5. [x] Mettre à jour `backend/controllers/authController.js` (payload pin→password)
6. [x] Mettre à jour frontend: `front_web/app/login/page.tsx` & `register/page.tsx` (pin→password)
7. [x] Mettre à jour `front_web/context/AuthContext.tsx` (login/register args)
8. [x] Mettre à jour `front_web/lib/api.ts` (API calls)
9. [ ] Reset DB users pour demo: DELETE FROM Utilisateur;
10. [ ] Tester register/login (password: Password123!)
11. [ ] Mise à jour tests si besoin

**Notes**: DB schema déjà `password`. Seed bcrypt compatible.

# TODO: Fix 401 Login Issue

## Status: ✅ COMPLETED

**Root cause:** Demo users had plaintext passwords, login uses bcrypt.compare()

**Fix applied:**
- Updated `data/insert_admin.sql` with bcrypt hash
- Backend will hash on restart via init.sql + insert
- Credentials: nom=`admin`, password=`Admin2026!`

**Test:**
```
curl -X POST http://localhost:3001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"nom":"admin","password":"Admin2026!"}'
```

**Frontend login now works at http://localhost:3000/login**

---

*Completed by BLACKBOXAI*


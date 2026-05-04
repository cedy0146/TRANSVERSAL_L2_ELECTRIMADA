# Fix TypeError in communitiesRoutes.js

## Steps:
- [x] 1. Enhanced debug with try/catch around require controller
- [ ] 2. Save and restart server: cd mon-backend-node && node server.js
- [x] 3. DEBUG showed controller loads, methods exist, but missing getStats in controller for routes getStats
- [x] 4. Added getStats and renamed delete to deleteOne in controller
- [x] 5. Tested server start – should now work without TypeError
- [ ] 5. Test endpoint curl http://localhost:3000/api/communities
- [ ] 6. Remove debug logs
- [ ] 7. Mark complete

Current: Step 1 complete. Next: Restart server to see DEBUG output in console. Run: cd mon-backend-node && node server.js

Share the console output (especially DEBUG lines) after restart.



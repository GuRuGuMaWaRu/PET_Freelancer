# PET-Project Freelancer

App for tracking money made per month, per year and per client

NEW TODOs

1. [x] FRONT: make the whole root layout work with grids and media queries
2. [x] FRONT: change Logout button to be less prominent
3. [x] FRONT: show proper errors
4. [ ] FRONT: animate BG change on route change. Every route/page has its BG color (main, tomato, brown, green, etc)
       4.1 [ ] green for PROJECTS page and light-red for CLIENTS page?
5. [ ] FRONT: offline Google fonts
6. [x] FRONT: add a working Add Project functionality to the Dashboard page
7. [ ] BACK: add messages to payloads that are sent from the backend on all successful operations with Users, Projects, and Clients.
       7.1 [ ] FRONT: show these messages as notifications on the frontend
8. [ ] FRONT: make Dashboard page more mobile friendly: adjust fonts, work on menu, etc
9. [ ] FRONT: is there a reason to send SUBMIT button into a modal form component? It would make sense if that form was universal, but it is not
10. [ ] FRONT: use FEATURES directory? For Auth, Clients, Projects
11. [ ] FRONT: put "edit", "add", and "delete" routes inside "projects" and "clients" main routes? In this case the main routes will have no element of their own, but will serve as an outer shell
12. [ ] FRONT: Dashboard page looks too cumbersome, need to think if there is a way to unload it somehow. One of the ways is to move some calculation functions into Utilities and a modal Add Project into a separate page (but in that case it won't be modal anymore)
13. [ ] FRONT: some items inside lib.tsx file are to specific, I should move them to the location where they are used
14. [ ] BACK: check whether I check form inputs properly
15. [ ] BACK: move some functionality from Utils into Middleware folder
16. [ ] FRONT: try font-clamping - especially need this for Dashboard page
17. [ ] FRONT: start working on Projects page - a sortable and searchable table of all projects
18. [ ] BACK: when getting projects for the last year I think I can use the generics getAll from CRUD, the only thing I need is to add filtering by date. How do I do that?
19. [ ] FRONT: on PROJECTS page show truncated notes text and display full text on hover in a tooltip (https://sebhastian.com/html-hover-text/)

# PET-Project Freelancer

App for tracking money made per month, per year and per client

TODOs

- what kind of data I need:

  - number of projects per client
  - earnings per client
  - all projects of a certain client
  - total earnings per month, quarter, half a year, year

- filtering:

  - local VS remote
  - currently I'm with local
  - need to implement both
  - local filtering will be used now
  - remote filtering will be for future use

- local vs server-side state
  - right now I'm getting all projects in one go and then work with them locally only saving changes to database
  - but is it feasible to download all those hunreds/thousands of items at once? That's a lot of data, part of which may not be even needed
  - that's why I believe I'll move to server-side state in future
  - why do I use/like local state now? Only user can change his/her data, so there is really no need to update local state from server-side state

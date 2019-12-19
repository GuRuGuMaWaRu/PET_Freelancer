# PET-Project Freelancer

App for tracking money made per month, per year and per client

TODOs

- ProjectForm does not load current project properly (always shows the previous project, although the true current project is inside state)
  --- new currentProject is fetched after EditProject loads, so EditProject does not update when it's context data is fetched
- Double rerendering when entering Edit Form
- CANCEL button (Project Form) not working

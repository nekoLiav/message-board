Makeshift to-do:

1. Implement server timestamps and/or timestamps via cloud functions for account, post, and message creation/edit times.
2. Update user object naming to include joined date using server timestamps.
3. Add character counter to post submission element.
4. Separate post template objects into their own separate files, or find a better solution to handle it.
5. Implement profile editing.
6. Allow users to upload images to cloud storage for user avatars/banners/posts.
7. Implement database strategy to handle likes and other similarly massive documents within the limitations of firebase's document field limit.
8. Implement project-wide client-side validation for image sizes, string lengths, etc. Possibly look for a client-side data validation to handle this more easily at runtime.
9. Implement database and storage rules - biggest undertaking for last, need to force all data to conform to expected input to prevent stuff from breaking, and to prevent malicious tinkering. Same as #8 essentially, but never trusting the client's input.

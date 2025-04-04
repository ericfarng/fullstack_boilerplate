# Solution

By Eric Farng
eric.farng@gmail.com

## Notes on implementation

I changed the data model from what was given.
I also included a user_answer table, but I didn't implement anything else for that

Backend is MVC, the directory names have the file
it is also uses classes and OOP

In the frontend code, I moved all of the logic for REST calls into an API directory
Further UI updates
1. randomize answer order, and maybe question order
2. add confirm button

LLM -
I couldn't get your endpoint to work. I used my own key isntead.
The code is in LlmService.ts
Additional work would include having an ideal answer that the LLM can also compare to. We can potentially use the LLM to generate it, and then a human to check it.


One of the criteria is state management. I assume it is for the requirement about picking up where the user left off.
I didn't do this, in favor of completing the LLM:

But I would finish creating the remaining CRUD endpoints in all three MVC layers.
1. ignoring login, I would just have a field for User Email
2. after each question, i would save the answer to the user_answer table
3. when the user comes back, i would call an endpoint /question/resume that would return the next question.
4. The remaining details in Immediate Feedback would also continue to be calculated in the BE controller.


## (If you didn't go with the boilerplate) Notes on design/architecture and rationale

I kept the same tech stack.
`npm run dev` should still  work
I am using my own OpenAI key.


## Feedback for Stepful
_Please feel free to share feedback with us! What you liked or didn't like, how this takehome compares to others you've taken in the past_
It's longer than others. I like having the grading criteria and knowing what to spend my time on

## Anything else you'd like us to know?
Not required, but we love learning about what you're passionate about, so if you link us a personal blog or website, or anything else that you've written, we'd love to check them out!
shihoueri.com
login demo
password demo

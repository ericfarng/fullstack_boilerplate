# Solution

By Eric Farng
eric.farng@gmail.com

## Notes on implementation

* I made some changes to the original data model. Also, I added a user_answer table, though I haven't fully implemented logic to interact with it yet.

* The backend follows an MVC structure, using class-based design and OOP principles. Directory names reflect their corresponding files for better organization.

* On the frontend, I moved all REST API logic into an `/api` directory to improve maintainability. I also made various UI updates.


#### Features & Enhancements
* Randomized answer order and (potentially) question order.

* "Confirm" button added to improve UX flow.

* LLM Integration: I couldn't get your endpoint to work, so I used my own OpenAI API key. The implementation is in `LlmService.ts`.

*  In the future, we could also use the LLM to generate an ideal answer that a human can validate—enabling both comparison and explanation-based feedback.

#### State Management (Partially Implemented)
I understand state management is one of the grading criteria, likely tied to the ability to resume a quiz where a user left off. I focused instead on completing the LLM integration, but here’s how I would implement the resume flow:

1. Skip authentication for now—use a simple `user_emai`l field.
2. After each question, save the response to the `user_answer` table.
3. When a user returns, hit a `/question/resume` endpoint to load the next unanswered question.
4. Any "immediate feedback" logic would continue to be calculated in the backend controller.


## (If you didn't go with the boilerplate) Notes on design/architecture and rationale

* I kept the original tech stack. `npm run dev` should still  work

* I am using my own OpenAI key and the original endpoint. You'll have to put your own OpenAI API key into `LlmService.ts`


## Feedback for Stepful
_Please feel free to share feedback with us! What you liked or didn't like, how this takehome compares to others you've taken in the past_

* I appreciated having clear grading criteria—it helped me prioritize where to spend my time.

* This take-home was longer than others I’ve done, but I liked that it reflected a more realistic scope of work.

## Anything else you'd like us to know?
Not required, but we love learning about what you're passionate about, so if you link us a personal blog or website, or anything else that you've written, we'd love to check them out!


http://www.shihoueri.com

```
Login: demo
Password: demo
```
# Decision Log

## 1. Time Breakdown
Total time spent: 4 hours and 30 mins
* **Planning & Architecture (30 mins):** Deciding on the project structure (Express.js, in-memory store) , understanding the assignment and its requiremnets and the AI integration approach.
* **Core Backend Setup (1 hour):** Building the Express server, routing (`route.js`), and the in-memory task operations (`taskStore.js`). 
* **AI Integration (1 hour 30 mins):** Implementing `@openrouter/sdk` in `aiService.js` to process task priorities and reasonings dynamically.
This specifically took more time because initially i was trying to integrate api keys of popular models directly by just creating a key in their console and using which which often led to errors such as not enough token or tokens expired . Then after some research i found out about openrouter sdk and found a free model there and copied the openrouter sdk and pasted it in the `aiService.js`
* **Debugging & Testing (1 hour):** Troubleshooting environment variable loading issues, OpenRouter API payload structures, and JSON parsing errors. Testing endpoints using curl and took help of ai here made better error logging.
* **Documentation & Polish (30 mins):** Writing the `README.md` and this `DECISION_LOG.md`.

## 2. Where AI Was Used — and Why
I primarily used AI for debugging, pattern generation, and API integration refinement rather than core business logic.

* **Regex / Data Extraction:**
    I used AI to generate a robust regular expression (/\{[\s\S]*\}/) to extract JSON from the OpenRouter response. Regex can be error-prone and time-consuming to perfect manually, so leveraging AI helped me arrive at a reliable solution instantly and avoid iterative trial-and-error.
* **Debugging API Issues:**
    When working with the OpenRouter SDK, I encountered an invalid_type error. AI helped quickly diagnose that the payload structure needed to be wrapped correctly (e.g., inside a chatRequest object). This significantly reduced the time I would have otherwise spent navigating documentation and debugging blindly.

**Why AI for These Parts?**

I chose AI assistance specifically for:

* Low-level, time-intensive tasks (like regex crafting)
* Ambiguous or poorly documented errors during API integration

This allowed me to focus more on application logic and system design, while using AI as a productivity tool for faster iteration and problem resolution.

## 3. Where AI Was NOT Used — and Why
* **Core Business Logic & Store (`taskStore.js`):** I wrote the in-memory data store and basic CRUD logic myself. Relying on AI for basic data structures often leads to over-engineered solutions (like unnecessary database connections or complex ORMs). Keeping it simple and manual ensured I understood the exact data flow.
* **API Route Definitions:** I manually defined the Express routes to maintain strict control over the request/response cycle, status codes, and input validation.

## 4. At Least 2 Bad AI Outputs (Required)
1. **wrong import statements** When using inline code suggestions from ai it oftens use wrongs names of the exports that you have used , for example i was exporting ` route.js` as taskRoutes but the ai changes it to taskRoutes.
I identified this problem via the terminal where it showed me error for wrong use of export names 
Therefore i corrected them manually not a very tedious task prefered writing those statements on my own and this was **wrong** on the ai side 
2. **Over Complication Part One :** After finishing my work i asked ai for a better chatrequest messages it gave me a very broad message which was returing a very long reasoing which wasnt our motive we just wanted a short reason of out task which was **misleading** from our assignment.
I indentified this problem while calling the api endpoints for the post request while acessing if the ai is working or not and what reasoing its giving 
I corrected it by writing a simple better message 

**Part 2** : it also over complicated the  `aiService.js` code when i asked for some minor tweks when the api was not working 
I identified this problem as we were shifting a lot away from the traditional boilerplate code that was given by the open router sdk 
I therefore used ai itself to simplify it , doing better prompting and telling my use case exactly.


## 5. Trade-offs Made
* **Using ai for `aiService.js`** I choose to use ai for that part becuase im not very familar with the openrouter code sdk , regex and similar other things i tweked my prompts a lot for avoiding overcomplication , this was a tradeoff since i was expecting to make it robust myself although i tried by sending my custom message to the model.
* **Less error logging** Since this was a quick assesment which testes us on our time i used less error logging , less try catch blocks still i made sure i could make my product more robust.

## 6. What You Would Improve With More Time
Given 2 more hours, I would:
1. **Add a Persistent Database:(ik this was not a requirement)** I would migrate the in-memory `taskStore.js` to a real database (MongoDB with Mongoose) so tasks persist across server restarts although this wasnt a requiremnt but it would have really made this walk towards a very successful production level backend code.
2. **Implement Input Validation:** I would use a library like `Zod` or `Joi` to enforce strict schema validation on the `POST /tasks` endpoint, preventing malformed payloads from ever hitting the AI service, this was suggestion from ai of how could i have made the project better
3. **Deleting a task** : I wouldve added a delete end point to delete a task, a delete endpoint `DELETE /tasks/:id` would be added which would delete a task from the task store.


I have completed the project well within the given time frame did dinner as well lol but writing the documentation took quite some time.

Thank you for your time for reading this hoping towards a positive feedback

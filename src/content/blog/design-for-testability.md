---
title: 'Designing for Testability'
description: 'Balancing TDD and Practical Testing Strategies'
pubDate: '2023-07-03'
heroImage: '/images/design-for-testability.webp'
---
# Introduction
Design For Testability is about Balancing TDD with Practical Testing Strategies. The principals below enable rapid yet pragmatic development while remaining focused on the actual requirement. We use tests as guard rails to stay on course, understand the requirement and identity any missing information upfront; yet avoid the tedious task of writing a tests before every line of code.

Tests also unlock the power of refactoring. With refactoring we can reduce the upfront cognitive load and brain dump without thinking
of variable and function names, then come back and name them appropriately after completing the requirement.


## Key Strategies
- <a href="#do-not-be-dogmatic-with-tdd">Do not be dogmatic with TDD</a>
- <a href="#do-not-underestimate-the-power-of-a-single-unit-integration-e2e-test">Do not underestimate the power of a single (Unit, Integration, E2E) Test</a>
- <a href="#when-writing-a-function-and-you-only-do-tdd-once-do-it-first">When writing a function and you only do TDD once, do it first</a>
- <a href="#start-with-an-exploratory-test-if-you-dont-know-how-to-write-any-of-the-code-yet">Start with an exploratory test if you don't know how to write any of the code yet</a>
- <a href="#dependency-free-domain-logic-only-requires-unit-tests">Dependency free Domain logic only requires unit tests</a>
- <a href="#for-bugs-end-to-end-tests-tell-you-if-the-application-does-not-work">For bugs, End to End tests tell you if the application does not work</a>
- <a href="#for-bugs-unit-tests-tell-you-where-it-does-not-work">For bugs, Unit tests tell you where it does not work</a>
- <a href="#test-behavior-not-implementation-so-you-can-refactor-later">Test behavior not implementation so you can refactor later</a>

### <span id="do-not-be-dogmatic-with-tdd">Do not be dogmatic with TDD</span>
While TDD is a powerful practice, being too rigid can hinder rather than help. It’s essential to use TDD as a guide, not a strict rulebook, adapting its principles to fit the project's needs.

### <span id="do-not-underestimate-the-power-of-a-single-unit-integration-e2e-test">Do not underestimate the power of a single Test</span>
Even a single test, be it Unit, Integration, or End-to-End (E2E), can provide significant insights and prevent future issues. If you encounter a bug and you already have a test in place, you can add another quickly to prevent this bug. In addition, your code is already written to be testable making your new test much easier to write.

### <span id="when-writing-a-function-and-you-only-do-tdd-once-do-it-first">When writing a function and you only do TDD once, do it first</span>
If you choose to apply TDD for a particular function, it's most beneficial to do it at the outset. This initial focus on testing can clarify your development goals and lead to cleaner, more focused code.

### <span id="start-with-an-exploratory-test-if-you-dont-know-how-to-write-any-of-the-code-yet">Start with an exploratory test if you don't know how to write any of the code yet</span>
When you're unsure how to begin coding, start with an exploratory test. This approach helps in understanding the problem better and paves the way for more structured tests and code. What is an exploratory test? Simple use the test as a scratch pad to run different code and explore the API.

### <span id="dependency-free-domain-logic-only-requires-unit-tests">Dependency free Domain logic only requires unit tests</span>
Domain logic that is free from external dependencies typically only needs unit testing. This ensures that the core logic is sound without the complexity of integrating other systems or units.

### <span id="for-bugs-end-to-end-tests-tell-you-if-the-application-does-not-work">For bugs, End to End tests tell you if the application does not work</span>
End-to-End tests are crucial for identifying whether the application as a whole is functioning correctly. They are especially useful in spotting bugs that only emerge when all components work together.

### <span id="for-bugs-unit-tests-tell-you-where-it-does-not-work">For bugs, Unit tests tell you where it does not work</span>
Unit tests are invaluable for pinpointing the exact location of a bug in your code. They break down the problem into manageable parts, making it easier to identify and fix issues.

### <span id="test-behavior-not-implementation-so-you-can-refactor-later">Test behavior not implementation so you can refactor later</span>
Focus on testing the behavior of your code, not its implementation. This approach allows for greater flexibility in refactoring since the tests are aligned with what the code is supposed to do, rather than how it does it.

## Closing Remarks
By embracing these principles, developers can create software that is not only functionally robust but also easier to test and maintain. Remember, the goal is to use testing to enhance the development process, not to constrain it.

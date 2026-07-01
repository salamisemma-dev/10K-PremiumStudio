# Learning Program

This guide explains how the studio learns after each completed website. It is explanatory; the binding contract lives in `specs/learning-program-integration.spec.md`.

## Loop

1. Finish the site and record real delivery evidence.
2. Fill `projects/<client>/learning.md` from the delivered website, not from taste alone.
   For external inspiration studies, use `design-intelligence/references/<study>/learning.md`
   and label the evidence as reference-only.
3. For each lesson, write evidence, affected owner file, proposed change, pros, cons, and a fix for each con.
4. Review the lesson. Accepted lessons become normal edits to the owning files in a PR.
5. Promote durable patterns to `learning/patterns.md` only after review.

## Rules

- The repo may check that lessons exist and are well formed.
- Reference studies are validated as reference learning, not as completed client
  delivery.
- The repo must not automatically rewrite `skills/`, `templates/`, `blueprints/`, or prompts from a lesson.
- A lesson is a proposal until the owner file changes and checks pass.
- If there is nothing durable to learn, write one short `No Durable Lessons` note.

## GitHub Actions

`npm run check` includes `check:learning`, so the quality workflow verifies the learning loop on push and pull request. The spec workflow also runs the learning test and review check so this behavior stays part of the Bob gate.
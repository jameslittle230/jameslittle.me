---
title: "Forms and Server Actions in Next.JS"
slug: "nextjs-forms"
date: 2023-11-22
draft: true
---

I've been working on a Next.JS site recently. It's a data-heavy site with a user model, some forms, and a database {% footnote %}I'm using [Supabase](https://supabase.com/); it's good{% /footnote %} and, in an effort to speed up development time, I've decided to try out an architecture that uses [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations), a new technology built in collaboration with the React team, introduced in [NextJS 13.4](https://nextjs.org/blog/next-13-4#server-actions-alpha), and stabilized in [version 14](https://nextjs.org/blog/next-14#forms-and-mutations).

The sample code in this post is the best way I've found (so far) to set up dynamic forms that are idiomatic with these new tools. As I mention below, it's not using the fanciest functionality, but it strikes a good balance between fanciness and the amount of boilerplate needed to put together a new form.

First, set up a server component to fetch all the server-side data needed to display the form's initial state. This gets hooked into Next's routing system by being a `page.tsx` file.

```tsx {% title="page.tsx" %}
import { Form } from "./form";

export default async function Page() {
  // This is a server component, so we can look up the current session here
  // and redirect to our protected section if it exists.
  // Otherwise, we display the login form.
  return (
    <div>
      <h1>Log In</h1>
      <Form />
    </div>
  );
}
```

Our client-side Form component displays the input and the form feedback:

```tsx {% title="form.tsx" %}
"use client";

import { useFormState } from "react-dom";
import { submitLogin } from "./actions";
import { FormStatusFeedback } from '@/components/FormStatusFeedback';

/**
 * This state object isn't tracking the state of the form inputs - that gets
 * handled automatically. Instead, it's tracking any auxiliary state needed
 * to display post-submission data to the user, such as error messages or
 * validation information.
 */
const initialState: FormFeedback = {
  state: 'idle'
  message: null,
};

export const Form = () => {
  const [state, formAction] = useFormState(submitLogin, initialState);

  return (
    <>
      {/* This is a shared component that displays a FormFeedback object,
          if it exists. You might decide to use this for some forms but have
          a more UI-specific feedback system for others. */}
      <FormStatusFeedback state={state} />
      <form action={formAction}>
        <input name="username" ></input>
        <input name="password" type="password"></input>
        {/* You might also use the SubmitButton component below */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
```

We can split out our form actions into a separate file. This function validates the submitted data, performs any database actions necessary, and returns a new form feedback state that will be displayed in the client-side component.

```ts {% title="actions.ts" %}
"use server";

import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

export const submitLogin = async (prevState: FormFeedback, data: FormData) => {
  // Validate the input using Zod
  const schema = zfd.formData({
    username: zfd.text(),
    password: zfd.text(),
  });

  const parseResult = schema.safeParse(data);

  if (!parseResult.success) {
    return {
      status: "error",
      message: "Please enter both a username and password.",
    };
  }

  const { username, password } = parseResult.data;

  // If the username or password are invalid, session is falsey.
  const session = application.tryCreateSession(username, password);

  if (!session) {
    return {
      status: "error",
      message: `We couldn't find you in the system. Please check your
      credentials and try again.`,
    };
  }

  // On success, you might want to stay on the same page and display a
  // successful page...
  //
  //   return {
  //     status: "success",
  //     message: "Successful login"
  //   }
  //
  // ...or in the case of login, you might want to redirect to a page that
  // requires authentication.
  redirect("/dashboard");
};
```

This shared component takes in a form feedback object and, if there's a message to display, renders it. (I'd imagine that it uses the `success` or `error` states to change the background color of the component.) As I mentioned above, you might not want to use this shared component for every form; if you have a form that requires specific user feedback, you could build a more specific feedback data structure and set up `Form.tsx` to display it.

```tsx {% title="FormStatusFeedback.tsx" %}
"use client";

type FormFeedback = {
  state: "idle" | "success" | "error";
  message: string | null;
};

export const FormStatusFeedback = ({ state }: { state?: FormFeedback }) => {
  if (!state.message) {
    return null;
  }
  return (
    <div
      className={classNames(
        formFeedbackBaseClasses,
        { [formErrorClasses]: state.status === "error" },
        { [formSuccessClasses]: state.status === "success" }
      )}
    >
      {state.message}
    </div>
  );
};
```

I also have a `SubmitButton` component that disables itself and displays a spinner while the form is loading, which is helpful to show users that their button press is working.

```tsx {% title="SubmitButton.tsx" %}
"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/Spinner";

export default function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" {...props}>
      <span>{children}</span> {pending && <Spinner variant="dark" />}
    </button>
  );
}
```

That's it! It doesn't use all the fancy features like `useOptimistic`, but it gets the job done, it feels relatively responsive for users, and it lets you (the developer) spin up a new form without too much boilerplate.

Despite [previous angst](/blog/2022/new-wave-js-frameworks), I'm having a lot of fun building with NextJS, server actions, and this form pattern, and I'm excited to share more about what I've been building in a future post!

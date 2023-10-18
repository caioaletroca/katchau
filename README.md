# Katchau Social

Katchau social is a [Instagram Clone](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/Instagram-Clone-App.md) inspired by [App Ideas](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/Instagram-Clone-App.md), using [NextJS](https://nextjs.org/), [Next-Auth](https://next-auth.js.org/), [Prisma](https://www.prisma.io/), [Material UI](https://mui.com/), [Supabase](https://supabase.com/) and [Vercel](https://vercel.com/).

This is a educational project.

<!-- <p float="left">
  <img src="/docs/Login.png" width="100" />
  <img src="/docs/Login.png" width="100" />
  <img src="/docs/Login.png" width="100" />
</p> -->

| Login                          | Home/Feed                    | Profile                            |
| ------------------------------ | ---------------------------- | ---------------------------------- |
| ![Login Page](/docs/Login.png) | ![Home Page](/docs/Home.png) | ![Profile Page](/docs/Profile.png) |

## Features

- User authentication with Google and custom credentials (not very safe);
- Post creation with image crop;
- Post likes, create comments and comment likes;
- Follow other users;
- Notification system;
- Real time chat;
- Feed (easy way);
- PWA support;
- Localization with key extraction on english and portuguese (i18n);
- Unit tests;
- E2E tests (Cypress);
- CI/CD with Github Actions;

## Development

For local development, copy contents of **.env.example** to **.env.local**. You will need Docker for Supabase.

```bash
npx supabase init
npm run start:cloud
npm run migrate:dev
npm run dev
```

Application will be available in http://localhost:3000

## Seed

The project has a script for seeding database with 10 users and a couple of posts, comments and follows

```bash
npm run seed:dev
```

## Testing

For unit tests:

```bash
npm run test
npm run test:watch
```

The project uses [Cypress](https://www.cypress.io/) combined with [Cucumber](https://github.com/badeball/cypress-cucumber-preprocessor) preprocessor for creating elegant [Gherkin](https://cucumber.io/docs/gherkin/) test cases.

```bash
npm run build:test
npm run start

npm run test:e2e # For console output
npm run cypress:open # For browser testing
```

## Localization

Husky commit events will automatically extract any translation keys and output into **./locales** folder. You can custom configure @formatjs to output to your custom localization service like Localize or Locize.

```bash
npm run i18n # For manual extraction
```

## Deploy

Keep in mind to deploy you will need a Vercel and Supabase accounts. You will need a Google account for social authentication.
Just commit into **release** branch for Preview, or **main** for Production. Setup your environment variables on Github, Supabase and Vercel

## Exaustive dependencies list

- React, Material UI, tailwind, sass
- NextJS 13, Next-Auth
- Formik, Zod, dayjs
- react-intl, formatjs
- axios, swr
- Prisma
- bcrypt (for passwords)
- jest, eslint, prettier
- cypress, @badeball/cypress-cucumber-preprocessor
- Vercel, Supabase

## Design choices

Instagram Clone compelled me as a excuse to try again on proper image handling, combined with my goal on learning NextJS using easy-to-use deploy and database system.

I choose Supabase because of generous Postgres free tier, and Vercel because it's easier to deploy NextJS applications.

## Drawbacks

In the end, I was unable to do proper image handling, since I oversaw NextJS deploy as serveless functions, which means [hard limit of 4 mb for body size request](https://vercel.com/guides/how-to-bypass-vercel-body-size-limit-serverless-functions). There are many solutions, but in order to make the client uploads directly into the storage (bucket) and make a post-processing on the image to create the loading blur effect, It would need a async worker in the cloud generating real money costs.

## Considerations (2023)

Honestly, I didn't have a great time...
By now (mid of 2023), NextJS is in phase of transition from [Page Directory to App Directory](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration), so most documentations got deprecated, libraries are fighting to update their compatibility, resulting in not a great development experience.

Unfortunately by now due to CSS-in-JS architecture, [@emotion](https://emotion.sh/docs/introduction) and Material UI [is not really compatible](https://github.com/mui/material-ui/issues/34896) with NextJS [Server Components](https://nextjs.org/docs/getting-started/react-essentials). They will be in the future, but for now every page needs to default into Client Component.

None of the three major choices for localization ([next-intl](https://next-intl-docs.vercel.app/), [next-translate](https://github.com/aralroca/next-translate), [next-i18next](https://github.com/i18next/next-i18next)) had the features I wanted, so I implemented myself using some code from next-translate and react-intl directly for Client Components only.

The middleware system is weird, in Page Dir it got the [next-connect](https://github.com/hoangvvo/next-connect) to create a router like [expressjs](https://github.com/expressjs/express), but since there is no support for App Dir, I had to implement my own middleware solution for global and per route.

Prisma has it own issues, you will be able to find easily. The project is great and do an amazing job, but sometimes fights against you.

I had a couple of issues with the combo NextJS + Cypress + Cucumber, starting with typescript compiler and lack of a compreensive documentation.

I think you got the frustation.

And in the end, I wouldn't pick NextJS as my main development framework/stack, but keep in mind that things change, and very fast!

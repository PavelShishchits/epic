### ToDo

[x] Add honeypot field to forms
[] Use multiple middlewares https://medium.com/@tanzimhossain2/implementing-multiple-middleware-in-next-js-combining-nextauth-and-internationalization-28d5435d3187#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NzQwYTcwYjA5NzJkY2NmNzVmYTg4YmM1MjliZDE2YTMwNTczYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDg1NDg0NTUxMTA2MTA2NDc2OTkiLCJlbWFpbCI6InBhdmVsZnJvbnRlbmRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczMjYyNDM0OCwibmFtZSI6ItCf0LDQstC10Lsg0KjQuNGJ0LjRhiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJaFFjWnlweC1EVFlrU2IxX21aZG4wWjJHUzhLbVlwM3VPcm5lVXFxMFBWaFpRM2JzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ItCf0LDQstC10LsiLCJmYW1pbHlfbmFtZSI6ItCo0LjRidC40YYiLCJpYXQiOjE3MzI2MjQ2NDgsImV4cCI6MTczMjYyODI0OCwianRpIjoiYmI0ZDFkOWQzZGY2YjZkYjY4NDcwYWUzNjZiY2RmYjk4MWM4YTQzYiJ9.DM3ITm4KBMC-YlOFMmVO_V_r9LviXxuZ07PEhtHb8wXneuYGd6xi9cT0moHxhCJfvhuJJEIO1xyqkXlQS673q0eo8_n9OxywX54X3cEtgvM4mO7KS1C4oG0L0UeMBLNg1h8m2_bomxYXl2Gal0SuaR_BbrHR7UZ3zf9kMKkLA9PwF50WqM7SdZ8YG3SuIOC1Pdp8kH0Y-xRM48WCriNPIk-aYDtRoXnnHdcByzrgzl9Z1qLo5CpTqhDEhiNTHPRyF8OjswW4lz91btuG4P-Hqn6Eq94jpGEcNIO4bJxevkSMkkXD4cC16jDeCkLqCY9iwPQ-peNalOAcuMf8MRlRVA
[x] Add toast after succesfull registration
[x] validate env variables on app initialization

[x] Use actual prisma db to retrieve users
[x] Use actual prisma db to retrieve user's data
[x] Delete note
[x] Update note
[x] Investigate why user's sorting doesn't work
[x] deploy app to vercel
[x] Read csrfToken without making all page dynamic. (Didn't make it, possible solution to fetch token on client, and write it to store)
[x] How to build static pages? Next.js will choose rendering strategy based on apis (https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering such as header, cookies, searchParams) that were used to build page. It's recomended to control what resources to cache instead of static/dynamic rendering. To prerender pages based on dynamic routes generateStaticParams should be used https://nextjs.org/docs/app/api-reference/functions/generate-static-params
[x] Cache data from db https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#caching-data-with-an-orm-or-database
[] Learn about revalidation cached data https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
[x] Generate static pages in build time with generateStaticParams https://nextjs.org/docs/app/api-reference/functions/generate-static-params
[x] add note service
[x] add user service
[x] implement theme switcher
[] add lint rules to have all files in kebab case
[] find a way how to pass selectedFields from client code to repository
[] try https://rombo.co/tailwind/ for animations

## auth

[x] implement input password ui component with show/hide password function
[] "guard" edit/delete note use cases with authrorization rules
[x] prolong session if user is "active" (via middleware)
[x] implement invalidate session method
[] Add user profile page
[] Optimize queries (exclude not used fields)

### clean arch

- Controllers are responsible for input validation, auhentication and other actions, also inside controller we perform all use cases.
- Use cases recieve already validated data and perform only one their individual operation

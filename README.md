This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# GCLOUD

## serviços usados

### google artifacts - onde a imagem docker fica

### google run - onde corre a versão

### ip - google config

## para colocar live.

### gerar build

gcloud builds submit --tag europe-west3-docker.pkg.dev/projectbuild-398321/feathers-docker-image/nextjs-docker-image:tag1

## deploy build

gcloud run deploy --image=europe-west3-docker.pkg.dev/projectbuild-398321/feathers-docker-image/nextjs-docker-image:tag1

# providers - facebook , google

- https://developers.facebook.com/
  ativar facebook login or business
  how to: https://supabase.com/docs/guides/auth/social-login/auth-facebook

- https://developers.google.com/identity
  how to: https://supabase.com/docs/guides/auth/social-login/auth-google

# supabase

supabase cli

- supabase start

  - cria um docker com tudo incluindo seed

- supabase migration list

  - compara instancia remota com local

- supabase migration new <filename>

  - cria um fihciero com timestamp + filename

- supabase db push

  - puxar migracoes para a db remota

- supabase gen types
  - gera os tipos typescript da base de dados.

## REMOTE.

- criar projeto
- linkar com supabase
- ativar providers facebook e google.

## metodos de pagamentos

- mbway
- multibanco

atenção em modo produção ambos.

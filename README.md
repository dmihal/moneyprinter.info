# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Steps to run the project:
1. Ensure that the [nakamoto-coefficient server](https://github.com/xenowits/nakomoto-coefficient-calculator) is running on port 8080.
2. Build and start the frontend by running the following commands:
```shell
npm run build
npm run start
```
3. Or, if you want to debug, simply run `npm run dev`.

### Docker image
1. Build docker image
```shell
 docker build . --platform=linux/amd64 -t xenowits/nakamoto-coefficient-frontend:v0.1.0
```
2. Push to github container registry
```shell
docker push xenowits/nakamoto-coefficient-frontend:v0.1.0
```
3. Run docker image
```shell
docker run -p 3000:3000 xenowits/nakamoto-coefficient-frontend:v0.1.0
```
4. Docker images are available [here](https://hub.docker.com/r/xenowits/nakamoto-coefficient-frontend/tags).
## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

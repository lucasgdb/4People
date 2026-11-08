# 4People

![License](https://img.shields.io/github/license/lucasgdb/4People)

Ferramentas online gratuitas para desenvolvimento, estudo e trabalho: geradores e validadores de documentos, conversores, funções de texto, utilitários de rede, calculadoras e muito mais. Tudo roda **no navegador**, sem cadastro: o que você digita não sai da sua máquina.

> Versão beta: o projeto ainda está em testes. Encontrou um problema? [Abra uma issue](https://github.com/lucasgdb/4People/issues).

- Mais de 100 ferramentas, com URLs em português (`/computacao/geradores/gerador-de-cpf`).
- Páginas estáticas, sem backend. As poucas consultas externas (CEP, bancos, IP, cotações) usam APIs públicas direto do navegador.
- Instalável como app (PWA) e funciona offline nas páginas já abertas.

## Stack

| Camada        | Tecnologia                                                          |
| ------------- | ------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router, SSG) + React 19       |
| UI            | `packages/ui`: [Base UI](https://base-ui.com) + Tailwind CSS 4      |
| Formulários   | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) |
| Dados remotos | [TanStack Query](https://tanstack.com/query)                        |
| Linguagem     | TypeScript 7                                                        |
| Lint/format   | [Biome](https://biomejs.dev)                                        |
| Runtime       | Node.js 26 · pnpm workspaces                                        |

## Estrutura

```
apps/web/
  src/app/                Rotas (as das ferramentas são geradas a partir do catálogo)
  src/catalog/            Catálogo de ferramentas e textos de "Como funciona" e FAQ
  src/lib/algorithms/     Lógica pura das ferramentas, com testes
  src/tools/<slug>.tsx    Uma ferramenta por arquivo
packages/ui/              Componentes e tokens compartilhados
```

## Como rodar

### Com Docker (desenvolvimento)

```bash
docker compose up -d
```

Acesse [http://localhost:3000](http://localhost:3000). O código é montado no container, com HMR. Mudou dependências? Rode `docker compose restart`.

### Com Docker (produção)

```bash
docker compose -f compose.prod.yaml up -d --build
```

### Localmente

Requisitos: Node.js ≥ 22.18 e pnpm 12.

```bash
pnpm install
pnpm dev
```

> No build de produção, defina `NEXT_PUBLIC_SITE_URL`: canonical, sitemap e imagens de compartilhamento usam esse valor.

### Scripts

| Comando           | Descrição                                          |
| ----------------- | -------------------------------------------------- |
| `pnpm dev`        | Servidor de desenvolvimento                        |
| `pnpm build`      | Build de produção                                  |
| `pnpm start`      | Sobe o build de produção                           |
| `pnpm lint`       | Biome (lint + format)                              |
| `pnpm typecheck`  | Type-check                                         |
| `pnpm test`       | Testes                                             |
| `pnpm gen:routes` | Gera as rotas das ferramentas a partir do catálogo |

## Adicionando uma ferramenta

1. A lógica em `apps/web/src/lib/algorithms/`, com teste.
2. A tela em `apps/web/src/tools/<slug>.tsx` (`export default`).
3. A entrada em `src/catalog/catalog.ts`, os textos em `src/catalog/content.ts` e o ícone em `src/components/tool-icons.tsx`.
4. Rode `pnpm gen:routes`.

## Como colaborar

1. Faça um fork e crie uma branch.
2. Rode `pnpm lint && pnpm typecheck && pnpm test`.
3. Abra um PR.

## Autor

| [<img src="https://avatars3.githubusercontent.com/u/13838273?v=3&s=115"><br><sub>@lucasgdb</sub>](https://github.com/lucasgdb) |
| :----------------------------------------------------------------------------------------------------------------------------: |

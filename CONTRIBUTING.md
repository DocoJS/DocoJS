# Contributing

First of all: thanks for your effort!

## Reporting an issue/proposing new feature

1. If you encounters an issue while working with this package, first of all ensures it's caused by the package itself, not any third-party code or your browser (you can )
2. If the issue is caused by the package, [create a new issue](/../../issues/new) for it, according to the template.
3. If you want to propose new feature instead of reporting an issue, just delete issue's template and write small explanation why you want this feature and why should we implement it.

## Contributing code

1. If you want to contribute code to this package, you should do it via [pull request](/../../pulls).
2. First of all, fork this repository and create `t/<number>` branch, where `<number>` is a number of [an issue](/../../issues) you're going to fix.
3. Prepare the [development environment](#development-environment).
4. Write your code and commit to your branch.
	* Commit messages should use the [Conventional Commits convention](https://www.conventionalcommits.org/en/v1.0.0/). The repository uses Commitizen to help in composing a commit message. You can use it by running the `git cz` command.
	* Please use the name of the package as the scope (with or without the `@docojs/` prefix), e.g. `feat(@docojs/doco): some new cool feature` or `feat(doco): some new cool feature`.
5. Ensure that everything is working by writing some tests and running them (`pnpm run test` in the package directory or in the main repo directory).
7. If everything works fine, you can create a new pull request and relax, waiting for merge!
	* The PR title should also follow the [Conventional Commits convention](https://www.conventionalcommits.org/en/v1.0.0/). It should describe the overall goal of the PR, e.g. `fix(core): fix incorrect date generation code`. All PRs are squashed before merging and their titles are used as the merge commit message by default.

### Repository structure

This repository is a monorepo, containing many npm packages.

```
| - dev/ ← Dev scripts (e.g. for updating the README.md file)
| - packages/ ← Directory containing npm packages
|   | - <package name>
|   |   | - src/ ← Package's source code
|   |   | - tests/ ← Package's tests
```

## Development environment

1. The project uses `pnpm` as the package manager. If you don't have it installed, you'll need to [install it](https://pnpm.io/installation).
2. To setup all Git hooks and linting tools, run `pnpm install --frozen-lockfile`.

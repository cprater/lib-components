# Publishing Guide

This guide will help you publish the `@your-org/lib-components` package to npm.

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **npm CLI**: Make sure you have the latest npm CLI installed
3. **Authentication**: Login to npm from your terminal

## Pre-Publishing Checklist

### 1. Update Package Information

Before publishing, update the following in `package.json`:

```json
{
  "name": "@your-org/lib-components",  // Change to your actual org/username
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/lib-components.git"
  },
  "homepage": "https://github.com/your-username/lib-components#readme",
  "bugs": {
    "url": "https://github.com/your-username/lib-components/issues"
  }
}
```

### 2. Version Management

- **Initial release**: Keep version `1.0.0`
- **Updates**: Use semantic versioning (semver)
  - `1.0.1` - Bug fixes
  - `1.1.0` - New features
  - `2.0.0` - Breaking changes

### 3. Test the Package

```bash
# Build the package
npm run build

# Test the package contents
npm pack --dry-run

# Test locally (optional)
npm pack
npm install ./your-org-lib-components-1.0.0.tgz
```

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 2. Verify Authentication

```bash
npm whoami
```

### 3. Publish the Package

```bash
# For first-time publishing
npm publish --access public

# For scoped packages (recommended)
npm publish --access public
```

### 4. Verify Publication

Check your package at: `https://www.npmjs.com/package/@your-org/lib-components`

## Post-Publishing

### 1. Create a GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Add release notes describing the components

### 2. Update Documentation

- Update README.md with installation instructions
- Add usage examples
- Document any breaking changes

### 3. Notify Users

- Update your project's documentation
- Notify team members or users
- Share on social media or relevant communities

## Installation Instructions for Users

Once published, users can install your package:

```bash
npm install @your-org/lib-components
```

### Usage

```tsx
import { Button, Card, GameCard } from '@your-org/lib-components';
import '@your-org/lib-components/styles';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card>Content</Card>
      <GameCard game={gameData} />
    </div>
  );
}
```

## Updating the Package

### 1. Make Changes

- Update components
- Add new features
- Fix bugs

### 2. Update Version

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major
```

### 3. Publish Update

```bash
npm publish
```

## Troubleshooting

### Common Issues

1. **Package name already exists**
   - Change the package name in `package.json`
   - Use a scoped package name: `@your-org/package-name`

2. **Authentication errors**
   - Run `npm login` again
   - Check your npm credentials

3. **Build errors**
   - Run `npm run build` to check for TypeScript errors
   - Fix any linting issues with `npm run lint:fix`

4. **Permission errors**
   - Make sure you own the package name
   - Check if you're part of the organization

### Getting Help

- [npm Documentation](https://docs.npmjs.com/)
- [npm CLI Commands](https://docs.npmjs.com/cli/v8/commands)
- [Semantic Versioning](https://semver.org/)

## Package Contents

The published package includes:

- **dist/**: Compiled JavaScript and TypeScript definitions
- **README.md**: Documentation
- **LICENSE**: MIT License
- **package.json**: Package metadata

### Excluded Files

The following files are excluded via `.npmignore`:
- Source TypeScript files
- Storybook configuration
- Development dependencies
- Test files
- Build configuration files

## Security Considerations

- Never commit API keys or secrets
- Use `.npmignore` to exclude sensitive files
- Review package contents with `npm pack --dry-run`
- Keep dependencies up to date
- Use `npm audit` to check for vulnerabilities

## Best Practices

1. **Version Management**: Use semantic versioning consistently
2. **Documentation**: Keep README.md updated
3. **Testing**: Test components before publishing
4. **Dependencies**: Keep peer dependencies minimal
5. **Build Process**: Ensure clean builds before publishing
6. **Changelog**: Maintain a changelog for major updates

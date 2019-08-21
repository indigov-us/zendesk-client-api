Quick Usage: 
Add to your index.html:
```typescript
  window['Indigov'] = {}
  window['Indigov']['ZAFClient'] = ZAFClient.init()
```

^^ This is a bit of overkill but sets us up for anything custom we want in the future without any global collisions.

Then instantiate new client:

```typescript
const zdClient = new ZendeskClientApi((window as any).Indigov.ZAFClient)
```
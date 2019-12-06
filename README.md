
Then instantiate new client:

```typescript
  const zdClient = new ZendeskClientApi(window.client)

  zdClient.getTriggers().then((response: Zendesk.ITriggerList) => setTriggers(response.triggers))
```

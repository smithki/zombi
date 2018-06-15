[zombi](../README.md) > ["util/get-npm-config"](../modules/_util_get_npm_config_.md)



# External module: "util/get-npm-config"

## Index

### Functions

* [getNpmConfig](_util_get_npm_config_.md#getnpmconfig)



---
## Functions
<a id="getnpmconfig"></a>

### «Const» getNpmConfig

► **getNpmConfig**(key?: *`string`*): `any`



*Defined in util/get-npm-config.ts:17*



Retrieve a specific config value from `.npmrc` or an object containing all config values. Uses `npm config get [key]` internally. Does not throw, instead returns `undefined` if a key cannot be resolved.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `string`   |  The config key you are targeting. See [NPMdocs](https://docs.npmjs.com/misc/config) for available keys. If left`undefined`, all config values will be returned in a plain object. |





**Returns:** `any`





___



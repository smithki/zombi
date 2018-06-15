[zombi](../README.md) > ["util/resolve-template-root"](../modules/_util_resolve_template_root_.md)



# External module: "util/resolve-template-root"

## Index

### Variables

* [cyan](_util_resolve_template_root_.md#cyan)
* [gray](_util_resolve_template_root_.md#gray)
* [green](_util_resolve_template_root_.md#green)
* [templRoot](_util_resolve_template_root_.md#templroot)


### Functions

* [resolveTemplateRoot](_util_resolve_template_root_.md#resolvetemplateroot)



---
## Variables
<a id="cyan"></a>

###  cyan

**●  cyan**:  *`Chalk``object`* 

*Defined in util/resolve-template-root.ts:15*





___

<a id="gray"></a>

###  gray

**●  gray**:  *`Chalk``object`* 

*Defined in util/resolve-template-root.ts:15*





___

<a id="green"></a>

###  green

**●  green**:  *`Chalk``object`* 

*Defined in util/resolve-template-root.ts:15*





___

<a id="templroot"></a>

### «Const» templRoot

**●  templRoot**:  *`string`*  =  cyan('templateRoot')

*Defined in util/resolve-template-root.ts:18*





___


## Functions
<a id="resolvetemplateroot"></a>

### «Const» resolveTemplateRoot

► **resolveTemplateRoot**(depth: *`number`*, current?: *`string`⎮`boolean`*): `string`⎮`false`



*Defined in util/resolve-template-root.ts:30*



Automatically resolves a valid `template/` path next to the executing generator.


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| depth | `number`  | - |   The depth at which to search the Error stack. |
| current | `string`⎮`boolean`  | true |   The current `templateRoot` value to resolve against. If false,templates are ignored. |





**Returns:** `string`⎮`false`





___



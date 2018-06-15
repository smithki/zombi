[zombi](../README.md) > ["operators/copy"](../modules/_operators_copy_.md)



# External module: "operators/copy"

## Index

### Functions

* [copy](_operators_copy_.md#copy)



---
## Functions
<a id="copy"></a>

### «Const» copy

► **copy**T(from: *[Data](_types_index_.md#data)`string`, `T`*, to: *[Data](_types_index_.md#data)`string`, `T`*, data?: *[Data](_types_index_.md#data)`EjsData`, `T`*, options?: *[Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/copy.ts:30*



Copies files from the template directory to the destination directory.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| from | [Data](_types_index_.md#data)`string`, `T`   |  The template path. A relative path will be automatically resolvedto the calling generator's `templateRoot` (and not the contextual`templateRoot`). |
| to | [Data](_types_index_.md#data)`string`, `T`   |  The destination path. A relative path will be automaticallyresolved to the contextual `destinationRoot`. |
| data | [Data](_types_index_.md#data)`EjsData`, `T`   |  EJS-compatible data object for injecting additional valuesinto the template file. Props are automatically injected. |
| options | [Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`   |  - |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



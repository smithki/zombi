[zombi](../README.md) > ["operators/create-file"](../modules/_operators_create_file_.md)



# External module: "operators/create-file"

## Index

### Functions

* [createFile](_operators_create_file_.md#createfile)



---
## Functions
<a id="createfile"></a>

### «Const» createFile

► **createFile**T(file: *[Data](_types_index_.md#data)`string`, `T`*, content?: *[Data](_types_index_.md#data)`any`, `T`*, options?: *[Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/create-file.ts:23*



Create a new file.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| file | [Data](_types_index_.md#data)`string`, `T`   |  The destination path. A relative path will be automaticallyresolved to the contextual `destinationRoot`. |
| content | [Data](_types_index_.md#data)`any`, `T`   |  Data with which to fill the new file. |
| options | [Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`   |  - |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



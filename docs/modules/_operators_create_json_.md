[zombi](../README.md) > ["operators/create-json"](../modules/_operators_create_json_.md)



# External module: "operators/create-json"

## Index

### Functions

* [createJson](_operators_create_json_.md#createjson)



---
## Functions
<a id="createjson"></a>

### «Const» createJson

► **createJson**T(file: *[Data](_types_index_.md#data)`string`, `T`*, data?: *[Data](_types_index_.md#data)[JsonData](../interfaces/_types_index_.jsondata.md), `T`*, options?: *[Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/create-json.ts:26*



Create a JSON-formatted file.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| file | [Data](_types_index_.md#data)`string`, `T`   |  The destination path. A relative path will be automaticallyresolved to the contextual `destinationRoot`. |
| data | [Data](_types_index_.md#data)[JsonData](../interfaces/_types_index_.jsondata.md), `T`   |  JSON data with which to fill the new file. |
| options | [Data](_types_index_.md#data)[FSOptions](../interfaces/_util_fs_.fsoptions.md), `T`   |  - |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



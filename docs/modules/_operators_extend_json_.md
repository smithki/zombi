[zombi](../README.md) > ["operators/extend-json"](../modules/_operators_extend_json_.md)



# External module: "operators/extend-json"

## Index

### Functions

* [extendJson](_operators_extend_json_.md#extendjson)



---
## Functions
<a id="extendjson"></a>

### «Const» extendJson

► **extendJson**T(file: *[Data](_types_index_.md#data)`string`, `T`*, extensions?: *[Data](_types_index_.md#data)[JsonData](../interfaces/_types_index_.jsondata.md), `T`*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/extend-json.ts:24*



Extend a JSON file.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| file | [Data](_types_index_.md#data)`string`, `T`   |  The target file path. A relative path will be automaticallyresolved to the contextual `destinationRoot`. |
| extensions | [Data](_types_index_.md#data)[JsonData](../interfaces/_types_index_.jsondata.md), `T`   |  JSON data with which to extend the existing file. |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



[zombi](../README.md) > ["util/refine"](../modules/_util_refine_.md)



# External module: "util/refine"

## Index

### Interfaces

* [RefineOptions](../interfaces/_util_refine_.refineoptions.md)


### Variables

* [isArray](_util_refine_.md#isarray)


### Functions

* [assertObjectTag](_util_refine_.md#assertobjecttag)
* [filterObj](_util_refine_.md#filterobj)
* [getObjectTag](_util_refine_.md#getobjecttag)
* [isEmpty](_util_refine_.md#isempty)
* [isFunction](_util_refine_.md#isfunction)
* [isIterable](_util_refine_.md#isiterable)
* [isNil](_util_refine_.md#isnil)
* [isNull](_util_refine_.md#isnull)
* [isObject](_util_refine_.md#isobject)
* [isPlainObject](_util_refine_.md#isplainobject)
* [isString](_util_refine_.md#isstring)
* [isUndefined](_util_refine_.md#isundefined)
* [predicate](_util_refine_.md#predicate)
* [refine](_util_refine_.md#refine)
* [refineDeep](_util_refine_.md#refinedeep)



---
## Variables
<a id="isarray"></a>

### «Const» isArray

**●  isArray**:  *`isArray`*  =  Array.isArray

*Defined in util/refine.ts:30*





___


## Functions
<a id="assertobjecttag"></a>

###  assertObjectTag

► **assertObjectTag**(check: *`string`*, value: *`any`*): `boolean`



*Defined in util/refine.ts:24*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| check | `string`   |  - |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="filterobj"></a>

### «Const» filterObj

► **filterObj**(obj: *`any`*, predicate: *`any`*): `object`



*Defined in util/refine.ts:15*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  - |
| predicate | `any`   |  - |





**Returns:** `object`





___

<a id="getobjecttag"></a>

###  getObjectTag

► **getObjectTag**(value: *`any`*): `any`



*Defined in util/refine.ts:20*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `any`





___

<a id="isempty"></a>

###  isEmpty

► **isEmpty**(value: *`any`*): `any`



*Defined in util/refine.ts:51*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `any`





___

<a id="isfunction"></a>

### «Const» isFunction

► **isFunction**(value: *`any`*): `boolean`



*Defined in util/refine.ts:33*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isiterable"></a>

### «Const» isIterable

► **isIterable**(value: *`any`*): `boolean`



*Defined in util/refine.ts:31*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isnil"></a>

### «Const» isNil

► **isNil**(value: *`any`*): `boolean`



*Defined in util/refine.ts:37*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isnull"></a>

### «Const» isNull

► **isNull**(value: *`any`*): `boolean`



*Defined in util/refine.ts:35*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isobject"></a>

### «Const» isObject

► **isObject**(value: *`any`*): `boolean`



*Defined in util/refine.ts:38*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isplainobject"></a>

### «Const» isPlainObject

► **isPlainObject**(value: *`any`*): `boolean`



*Defined in util/refine.ts:39*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isstring"></a>

### «Const» isString

► **isString**(value: *`any`*): `boolean`



*Defined in util/refine.ts:34*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="isundefined"></a>

### «Const» isUndefined

► **isUndefined**(value: *`any`*): `boolean`



*Defined in util/refine.ts:36*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `boolean`





___

<a id="predicate"></a>

###  predicate

► **predicate**(options: *[RefineOptions](../interfaces/_util_refine_.refineoptions.md)*): `(Anonymous function)`



*Defined in util/refine.ts:58*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [RefineOptions](../interfaces/_util_refine_.refineoptions.md)   |  - |





**Returns:** `(Anonymous function)`





___

<a id="refine"></a>

###  refine

► **refine**T(collection: *`T`*, options?: *[RefineOptions](../interfaces/_util_refine_.refineoptions.md)*): `Partial`.<`T`>



*Defined in util/refine.ts:93*



Create a streamlined object free of null, undefined, empty strings, empty arrays, or empty objects.


**Type parameters:**

#### T :  `any`
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| collection | `T`  | - |   The collection (object or array) to clean. |
| options | [RefineOptions](../interfaces/_util_refine_.refineoptions.md)  |  {} |   Customize which nil or empty values will be omitted. |





**Returns:** `Partial`.<`T`>





___

<a id="refinedeep"></a>

###  refineDeep

► **refineDeep**T(collection: *`T`*, options?: *[RefineOptions](../interfaces/_util_refine_.refineoptions.md)*): `Partial`.<`T`>



*Defined in util/refine.ts:124*



Recursively create a streamlined object free of null, undefined, empty strings, empty arrays, or empty objects.


**Type parameters:**

#### T :  `any`
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| collection | `T`  | - |   The collection (object or array) to refine deeply. |
| options | [RefineOptions](../interfaces/_util_refine_.refineoptions.md)  |  {} |   Customize which nil or empty values will be omitted. |





**Returns:** `Partial`.<`T`>





___



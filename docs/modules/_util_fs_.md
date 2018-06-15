[zombi](../README.md) > ["util/fs"](../modules/_util_fs_.md)



# External module: "util/fs"

## Index

### Interfaces

* [FSOptions](../interfaces/_util_fs_.fsoptions.md)


### Type aliases

* [SideEffectFunc](_util_fs_.md#sideeffectfunc)


### Variables

* [conflictCount](_util_fs_.md#conflictcount)
* [red](_util_fs_.md#red)


### Functions

* [checkForConflict](_util_fs_.md#checkforconflict)
* [copyFile](_util_fs_.md#copyfile)
* [createFile](_util_fs_.md#createfile)
* [createJson](_util_fs_.md#createjson)
* [extendJson](_util_fs_.md#extendjson)
* [getCtx](_util_fs_.md#getctx)


### Object literals

* [output](_util_fs_.md#output)
* [prettyPath](_util_fs_.md#prettypath)



---
## Type aliases
<a id="sideeffectfunc"></a>

###  SideEffectFunc

**Τ SideEffectFunc**:  *`function`* 

*Defined in util/fs.ts:19*


#### Type declaration
►(generator: *[GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`*, options?: *[FSOptions](../interfaces/_util_fs_.fsoptions.md)*): `function`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | [GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`   |  - |
| options | [FSOptions](../interfaces/_util_fs_.fsoptions.md)   |  - |





**Returns:** `function`






___


## Variables
<a id="conflictcount"></a>

### «Let» conflictCount

**●  conflictCount**:  *`number`*  = 0

*Defined in util/fs.ts:56*





___

<a id="red"></a>

###  red

**●  red**:  *`Chalk``object`* 

*Defined in util/fs.ts:30*





___


## Functions
<a id="checkforconflict"></a>

### «Const» checkForConflict

► **checkForConflict**(ctx: *`any`*): `(Anonymous function)`



*Defined in util/fs.ts:58*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="copyfile"></a>

### «Const» copyFile

► **copyFile**(generator: *[GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`*): `(Anonymous function)`



*Defined in util/fs.ts:126*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | [GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="createfile"></a>

### «Const» createFile

► **createFile**(generator: *[GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`*): `(Anonymous function)`



*Defined in util/fs.ts:147*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | [GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="createjson"></a>

### «Const» createJson

► **createJson**(generator: *[GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`*): `(Anonymous function)`



*Defined in util/fs.ts:161*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | [GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="extendjson"></a>

### «Const» extendJson

► **extendJson**(generator: *[GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`*): `(Anonymous function)`



*Defined in util/fs.ts:173*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | [GeneratorOutput](../interfaces/_types_index_.generatoroutput.md)`any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="getctx"></a>

### «Const» getCtx

► **getCtx**(generator: *`any`*, options?: *[FSOptions](../interfaces/_util_fs_.fsoptions.md)*): `(Anonymous function)`



*Defined in util/fs.ts:34*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| generator | `any`   |  - |
| options | [FSOptions](../interfaces/_util_fs_.fsoptions.md)   |  - |





**Returns:** `(Anonymous function)`





___


<a id="output"></a>

## Object literal: output


<a id="output.extendjson-1"></a>

###  extendJson

► **extendJson**(ctx: *`any`*): `(Anonymous function)`



*Defined in util/fs.ts:120*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `(Anonymous function)`





___
<a id="output.file"></a>

###  file

► **file**(ctx: *`any`*): `(Anonymous function)`



*Defined in util/fs.ts:108*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `(Anonymous function)`





___
<a id="output.json"></a>

###  json

► **json**(ctx: *`any`*): `(Anonymous function)`



*Defined in util/fs.ts:114*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `(Anonymous function)`





___

<a id="prettypath"></a>

## Object literal: prettyPath


<a id="prettypath.from"></a>

###  from

► **from**(ctx: *`any`*): `any`



*Defined in util/fs.ts:53*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `any`





___
<a id="prettypath.to"></a>

###  to

► **to**(ctx: *`any`*): `any`



*Defined in util/fs.ts:52*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ctx | `any`   |  - |





**Returns:** `any`





___



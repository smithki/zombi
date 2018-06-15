[zombi](../README.md) > ["util/log"](../modules/_util_log_.md)



# External module: "util/log"

## Index

### Variables

* [gray](_util_log_.md#gray)
* [green](_util_log_.md#green)
* [log](_util_log_.md#log)
* [magenta](_util_log_.md#magenta)
* [red](_util_log_.md#red)
* [silent](_util_log_.md#silent)
* [yellow](_util_log_.md#yellow)


### Functions

* [doLog](_util_log_.md#dolog)
* [fileAdd](_util_log_.md#fileadd)
* [fileExtend](_util_log_.md#fileextend)
* [fileForcedOverwrite](_util_log_.md#fileforcedoverwrite)
* [fileOverwrite](_util_log_.md#fileoverwrite)
* [fileSkip](_util_log_.md#fileskip)
* [setSilent](_util_log_.md#setsilent)



---
## Variables
<a id="gray"></a>

###  gray

**●  gray**:  *`Chalk``object`* 

*Defined in util/log.ts:8*





___

<a id="green"></a>

###  green

**●  green**:  *`Chalk``object`* 

*Defined in util/log.ts:8*





___

<a id="log"></a>

### «Const» log

**●  log**:  *[doLog]()`object`*  =  merge(doLog, {
  fileAdd,
  fileExtend,
  fileOverwrite,
  fileForcedOverwrite,
  fileSkip,
  ...omit(console, 'log'),
})

*Defined in util/log.ts:41*





___

<a id="magenta"></a>

###  magenta

**●  magenta**:  *`Chalk``object`* 

*Defined in util/log.ts:8*





___

<a id="red"></a>

###  red

**●  red**:  *`Chalk``object`* 

*Defined in util/log.ts:8*





___

<a id="silent"></a>

### «Let» silent

**●  silent**:  *`boolean`*  = false

*Defined in util/log.ts:12*





___

<a id="yellow"></a>

###  yellow

**●  yellow**:  *`Chalk``object`* 

*Defined in util/log.ts:8*





___


## Functions
<a id="dolog"></a>

### «Const» doLog

► **doLog**(message?: *`any`*, ...optionalParams: *`any`[]*): `void`



*Defined in util/log.ts:17*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `any`   |  - |
| optionalParams | `any`[]   |  - |





**Returns:** `void`





___

<a id="fileadd"></a>

### «Const» fileAdd

► **fileAdd**(name: *`string`*): `void`



*Defined in util/log.ts:22*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `void`





___

<a id="fileextend"></a>

### «Const» fileExtend

► **fileExtend**(name: *`string`*): `void`



*Defined in util/log.ts:25*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `void`





___

<a id="fileforcedoverwrite"></a>

### «Const» fileForcedOverwrite

► **fileForcedOverwrite**(name: *`string`*): `void`



*Defined in util/log.ts:33*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `void`





___

<a id="fileoverwrite"></a>

### «Const» fileOverwrite

► **fileOverwrite**(name: *`string`*): `void`



*Defined in util/log.ts:29*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `void`





___

<a id="fileskip"></a>

### «Const» fileSkip

► **fileSkip**(name: *`string`*): `void`



*Defined in util/log.ts:37*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `void`





___

<a id="setsilent"></a>

### «Const» setSilent

► **setSilent**(value: *`boolean`*): `boolean`



*Defined in util/log.ts:13*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `boolean`   |  - |





**Returns:** `boolean`





___



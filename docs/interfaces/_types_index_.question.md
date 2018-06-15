[zombi](../README.md) > ["types/index"](../modules/_types_index_.md) > [Question](../interfaces/_types_index_.question.md)



# Interface: Question

## Type parameters
#### Props 
## Hierarchy


 `Question`

**↳ Question**








## Properties
<a id="choices"></a>

### «Optional» choices

**●  choices**:  *`ChoiceType`[]⎮`function`* 

*Inherited from Question.choices*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:94*



Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers. Array values can be simple strings, or objects containing a name (to display) and a value properties (to save in the answers hash). Values can also be a Separator.




___

<a id="default"></a>

### «Optional» default

**●  default**:  *`any`⎮`function`* 

*Inherited from Question.default*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:87*



Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.




___

<a id="mask"></a>

### «Optional» mask

**●  mask**:  *`string`* 

*Inherited from Question.mask*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:118*



Add a mask when password will entered




___

<a id="message"></a>

### «Optional» message

**●  message**:  *`string`⎮`function`* 

*Inherited from Question.message*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:82*



The question to print. If defined as a function, the first parameter will be the current inquirer session answers.




___

<a id="name"></a>

### «Optional» name

**●  name**:  *`keyof Props`* 

*Overrides Question.name*

*Defined in types/index.ts:58*





___

<a id="pagesize"></a>

### «Optional» pageSize

**●  pageSize**:  *`number`* 

*Inherited from Question.pageSize*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:114*



Change the number of lines that will be rendered when using list, rawList, expand or checkbox.




___

<a id="paginated"></a>

### «Optional» paginated

**●  paginated**:  *`boolean`* 

*Inherited from Question.paginated*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:110*





___

<a id="prefix"></a>

### «Optional» prefix

**●  prefix**:  *`string`* 

*Inherited from Question.prefix*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:122*



Change the default prefix message.




___

<a id="suffix"></a>

### «Optional» suffix

**●  suffix**:  *`string`* 

*Inherited from Question.suffix*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:126*



Change the default suffix message.




___

<a id="type"></a>

### «Optional» type

**●  type**:  *`string`* 

*Inherited from Question.type*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:73*



Type of the prompt. Possible values:

*   input
*   confirm
*   list
*   rawlist
*   password
*__defaults:__*: 'input'





___

<a id="when"></a>

### «Optional» when

**●  when**:  *`boolean`⎮`function`* 

*Inherited from Question.when*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:109*



Receive the current user answers hash and should return true or false depending on whether or not this question should be asked. The value can also be a simple boolean.




___


## Methods
<a id="filter"></a>

### «Optional» filter

► **filter**(input: *`string`*): `string`



*Inherited from Question.filter*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:104*



Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `string`   |  - |





**Returns:** `string`





___

<a id="validate"></a>

### «Optional» validate

► **validate**(input: *`string`*, answers?: *`Answers`*): `boolean`⎮`string`



*Inherited from Question.validate*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/@types/inquirer/index.d.ts:99*



Receive the user input and should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `string`   |  - |
| answers | `Answers`   |  - |





**Returns:** `boolean`⎮`string`





___



[zombi](../README.md) > ["core/generator"](../modules/_core_generator_.md) > [Generator](../classes/_core_generator_.generator.md)



# Class: Generator


Creates a new generator.
*__export__*: 

*__class__*: Zombi

*__template__*: Props An interface describing the shape of props for this generator.


## Type parameters
#### Props 
## Index

### Constructors

* [constructor](_core_generator_.generator.md#constructor)


### Properties

* [destinationRoot](_core_generator_.generator.md#destinationroot)
* [force](_core_generator_.generator.md#force)
* [name](_core_generator_.generator.md#name)
* [templateRoot](_core_generator_.generator.md#templateroot)
* [zombi$](_core_generator_.generator.md#zombi_)


### Methods

* [clone](_core_generator_.generator.md#clone)
* [compose](_core_generator_.generator.md#compose)
* [destination](_core_generator_.generator.md#destination)
* [run](_core_generator_.generator.md#run)
* [sequence](_core_generator_.generator.md#sequence)
* [template](_core_generator_.generator.md#template)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Generator**(options?: *[Options](../interfaces/_types_index_.options.md)`Props`*): [Generator](_core_generator_.generator.md)


*Defined in core/generator.ts:36*



Creates an instance of Zombi generator.
*__memberof__*: Zombi



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| options | [Options](../interfaces/_types_index_.options.md)`Props`  |  {} |   - |





**Returns:** [Generator](_core_generator_.generator.md)

---


## Properties
<a id="destinationroot"></a>

###  destinationRoot

**●  destinationRoot**:  *`string`* 

*Defined in core/generator.ts:34*





___

<a id="force"></a>

###  force

**●  force**:  *`boolean`* 

*Defined in core/generator.ts:36*





___

<a id="name"></a>

###  name

**●  name**:  *`string`* 

*Defined in core/generator.ts:32*





___

<a id="templateroot"></a>

###  templateRoot

**●  templateRoot**:  *`string`⎮`boolean`* 

*Defined in core/generator.ts:33*





___

<a id="zombi_"></a>

###  zombi$

**●  zombi$**:  *[Stream](../interfaces/_types_index_.stream.md)`Props`* 

*Defined in core/generator.ts:35*





___


## Methods
<a id="clone"></a>

###  clone

► **clone**(): `this``Object`



*Defined in core/generator.ts:182*



Clones a generator




**Returns:** `this``Object`





___

<a id="compose"></a>

###  compose

► **compose**(): [Generator](_core_generator_.generator.md)`Props`

► **compose**Z1(z1: *[Generator](_core_generator_.generator.md)`Z1`*): [Generator](_core_generator_.generator.md)`Props``Z1`

► **compose**Z1,Z2(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2`

► **compose**Z1,Z2,Z3(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3`

► **compose**Z1,Z2,Z3,Z4(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z4`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4`

► **compose**Z1,Z2,Z3,Z4,Z5(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z5`*, z5: *[Generator](_core_generator_.generator.md)`Z5`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5`

► **compose**Z1,Z2,Z3,Z4,Z5,Z6(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z4`*, z5: *[Generator](_core_generator_.generator.md)`Z5`*, z6: *[Generator](_core_generator_.generator.md)`Z6`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6`

► **compose**Z1,Z2,Z3,Z4,Z5,Z6,Z7(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z4`*, z5: *[Generator](_core_generator_.generator.md)`Z5`*, z6: *[Generator](_core_generator_.generator.md)`Z6`*, z7: *[Generator](_core_generator_.generator.md)`Z7`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7`

► **compose**Z1,Z2,Z3,Z4,Z5,Z6,Z7,Z8(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z4`*, z5: *[Generator](_core_generator_.generator.md)`Z5`*, z6: *[Generator](_core_generator_.generator.md)`Z6`*, z7: *[Generator](_core_generator_.generator.md)`Z7`*, z8: *[Generator](_core_generator_.generator.md)`Z8`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7``Z8`

► **compose**Z1,Z2,Z3,Z4,Z5,Z6,Z7,Z8,Z9(z1: *[Generator](_core_generator_.generator.md)`Z1`*, z2: *[Generator](_core_generator_.generator.md)`Z2`*, z3: *[Generator](_core_generator_.generator.md)`Z3`*, z4: *[Generator](_core_generator_.generator.md)`Z4`*, z5: *[Generator](_core_generator_.generator.md)`Z5`*, z6: *[Generator](_core_generator_.generator.md)`Z6`*, z7: *[Generator](_core_generator_.generator.md)`Z7`*, z8: *[Generator](_core_generator_.generator.md)`Z8`*, z9: *[Generator](_core_generator_.generator.md)`Z9`*): [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7``Z8``Z9`

► **compose**(...zombis: *[Generator](_core_generator_.generator.md)`any`[]*): [Generator](_core_generator_.generator.md)`any`



*Defined in core/generator.ts:90*



Create a new Zombi generator that composes other generators.




**Returns:** [Generator](_core_generator_.generator.md)`Props`



*Defined in core/generator.ts:91*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1`



*Defined in core/generator.ts:92*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2`



*Defined in core/generator.ts:93*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3`



*Defined in core/generator.ts:94*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z4`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4`



*Defined in core/generator.ts:95*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
#### Z5 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z5`   |  - |
| z5 | [Generator](_core_generator_.generator.md)`Z5`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5`



*Defined in core/generator.ts:96*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
#### Z5 
#### Z6 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z4`   |  - |
| z5 | [Generator](_core_generator_.generator.md)`Z5`   |  - |
| z6 | [Generator](_core_generator_.generator.md)`Z6`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6`



*Defined in core/generator.ts:97*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
#### Z5 
#### Z6 
#### Z7 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z4`   |  - |
| z5 | [Generator](_core_generator_.generator.md)`Z5`   |  - |
| z6 | [Generator](_core_generator_.generator.md)`Z6`   |  - |
| z7 | [Generator](_core_generator_.generator.md)`Z7`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7`



*Defined in core/generator.ts:98*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
#### Z5 
#### Z6 
#### Z7 
#### Z8 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z4`   |  - |
| z5 | [Generator](_core_generator_.generator.md)`Z5`   |  - |
| z6 | [Generator](_core_generator_.generator.md)`Z6`   |  - |
| z7 | [Generator](_core_generator_.generator.md)`Z7`   |  - |
| z8 | [Generator](_core_generator_.generator.md)`Z8`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7``Z8`



*Defined in core/generator.ts:99*



Create a new Zombi generator that composes other generators.


**Type parameters:**

#### Z1 
#### Z2 
#### Z3 
#### Z4 
#### Z5 
#### Z6 
#### Z7 
#### Z8 
#### Z9 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| z1 | [Generator](_core_generator_.generator.md)`Z1`   |  - |
| z2 | [Generator](_core_generator_.generator.md)`Z2`   |  - |
| z3 | [Generator](_core_generator_.generator.md)`Z3`   |  - |
| z4 | [Generator](_core_generator_.generator.md)`Z4`   |  - |
| z5 | [Generator](_core_generator_.generator.md)`Z5`   |  - |
| z6 | [Generator](_core_generator_.generator.md)`Z6`   |  - |
| z7 | [Generator](_core_generator_.generator.md)`Z7`   |  - |
| z8 | [Generator](_core_generator_.generator.md)`Z8`   |  - |
| z9 | [Generator](_core_generator_.generator.md)`Z9`   |  - |





**Returns:** [Generator](_core_generator_.generator.md)`Props``Z1``Z2``Z3``Z4``Z5``Z6``Z7``Z8``Z9`



*Defined in core/generator.ts:100*



Create a new Zombi generator that composes other generators.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| zombis | [Generator](_core_generator_.generator.md)`any`[]   |  The other generators to compose. |





**Returns:** [Generator](_core_generator_.generator.md)`any`





___

<a id="destination"></a>

###  destination

► **destination**(...pathSegments: *`string`[]*): `string`



*Defined in core/generator.ts:206*



Resolves a path to this generator's `destinationRoot`.
*__memberof__*: Zombi



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pathSegments | `string`[]   |  Strings from which to resolve a path. |





**Returns:** `string`





___

<a id="run"></a>

###  run

► **run**(): `Promise`.<`void`>



*Defined in core/generator.ts:147*



Runs a generator.
*__memberof__*: Zombi





**Returns:** `Promise`.<`void`>





___

<a id="sequence"></a>

###  sequence

► **sequence**(...operators: *[Operator](../interfaces/_types_index_.operator.md)`Props`[]*): [Generator](_core_generator_.generator.md)`Props`



*Defined in core/generator.ts:84*



Create a sequence of tasks by chaining Zombi operators together.
*__memberof__*: Zombi



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| operators | [Operator](../interfaces/_types_index_.operator.md)`Props`[]   |  Zombi operators that will run insequence. |





**Returns:** [Generator](_core_generator_.generator.md)`Props`





___

<a id="template"></a>

###  template

► **template**(...pathSegments: *`string`[]*): `string`



*Defined in core/generator.ts:193*



Resolves a path to this generator's `templateRoot`.
*__memberof__*: Zombi



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pathSegments | `string`[]   |  Strings from which to resolve a path. |





**Returns:** `string`





___



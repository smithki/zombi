[zombi](../README.md) > ["types/index"](../modules/_types_index_.md) > [Stream](../interfaces/_types_index_.stream.md)



# Interface: Stream

## Type parameters
#### Props 
## Hierarchy


 `Observable`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>

**↳ Stream**







## Implements

* `Subscribable`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>


## Constructors
<a id="constructor"></a>


### ⊕ **new Stream**(subscribe?: *`function`*): [Stream](_types_index_.stream.md)


*Inherited from Observable.__constructor*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:22*


*__constructor__*: 



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| subscribe | `function`   |  the function that is called when the Observable isinitially subscribed to. This function is given a Subscriber, to which new valuescan be `next`ed, or an `error` method can be called to raise an error, or`complete` can be called to notify of a successful completion. |





**Returns:** [Stream](_types_index_.stream.md)

---


## Properties
<a id="_isscalar"></a>

###  _isScalar

**●  _isScalar**:  *`boolean`* 

*Inherited from Observable._isScalar*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:20*





___

<a id="operator"></a>

### «Protected» operator

**●  operator**:  *`Operator`.<`any`>,.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>* 

*Inherited from Observable.operator*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:22*





___

<a id="source"></a>

### «Protected» source

**●  source**:  *`Observable`.<`any`>* 

*Inherited from Observable.source*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:21*





___

<a id="create"></a>

### «Static» create

**●  create**:  *`Function`* 

*Inherited from Observable.create*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:39*



Creates a new cold Observable by calling the Observable constructor
*__static__*: true

*__owner__*: Observable

*__method__*: create

*__param__*: the subscriber function to be passed to the Observable constructor

*__returns__*: a new cold observable





___

<a id="if"></a>

### «Static» if

**●  if**:  *`create`* 

*Inherited from Observable.if*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:60*





___

<a id="throw"></a>

### «Static» throw

**●  throw**:  *`create`* 

*Inherited from Observable.throw*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:61*





___


## Methods
<a id="_subscribe"></a>

### «Protected» _subscribe

► **_subscribe**(subscriber: *`Subscriber`.<`any`>*): `TeardownLogic`



*Inherited from Observable._subscribe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:59*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| subscriber | `Subscriber`.<`any`>   |  - |





**Returns:** `TeardownLogic`





___

<a id="_trysubscribe"></a>

### «Protected» _trySubscribe

► **_trySubscribe**(sink: *`Subscriber`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>*): `TeardownLogic`



*Inherited from Observable._trySubscribe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:50*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| sink | `Subscriber`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>   |  - |





**Returns:** `TeardownLogic`





___

<a id="foreach"></a>

###  forEach

► **forEach**(next: *`function`*, PromiseCtor?: *`PromiseConstructor`*): `Promise`.<`void`>



*Inherited from Observable.forEach*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:58*


*__method__*: forEach



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| next | `function`   |  a handler for each value emitted by the observable |
| PromiseCtor | `PromiseConstructor`   |  - |





**Returns:** `Promise`.<`void`>
a promise that either resolves on observable completion or
 rejects with the handled error






___

<a id="lift"></a>

###  lift

► **lift**R(operator: *`Operator`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`R`>*): `Observable`.<`R`>



*Inherited from Observable.lift*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:47*



Creates a new Observable, with this Observable as the source, and the passed operator defined as the new observable's operator.
*__method__*: lift



**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| operator | `Operator`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`R`>   |  the operator defining the operation to take on the observable |





**Returns:** `Observable`.<`R`>
a new observable with the Operator applied






___

<a id="pipe"></a>

###  pipe

► **pipe**(): `Observable`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>

► **pipe**A(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*): `Observable`.<`A`>

► **pipe**A,B(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*): `Observable`.<`B`>

► **pipe**A,B,C(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*): `Observable`.<`C`>

► **pipe**A,B,C,D(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*): `Observable`.<`D`>

► **pipe**A,B,C,D,E(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*, op5: *`OperatorFunction`.<`D`>,.<`E`>*): `Observable`.<`E`>

► **pipe**A,B,C,D,E,F(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*, op5: *`OperatorFunction`.<`D`>,.<`E`>*, op6: *`OperatorFunction`.<`E`>,.<`F`>*): `Observable`.<`F`>

► **pipe**A,B,C,D,E,F,G(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*, op5: *`OperatorFunction`.<`D`>,.<`E`>*, op6: *`OperatorFunction`.<`E`>,.<`F`>*, op7: *`OperatorFunction`.<`F`>,.<`G`>*): `Observable`.<`G`>

► **pipe**A,B,C,D,E,F,G,H(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*, op5: *`OperatorFunction`.<`D`>,.<`E`>*, op6: *`OperatorFunction`.<`E`>,.<`F`>*, op7: *`OperatorFunction`.<`F`>,.<`G`>*, op8: *`OperatorFunction`.<`G`>,.<`H`>*): `Observable`.<`H`>

► **pipe**A,B,C,D,E,F,G,H,I(op1: *`OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>*, op2: *`OperatorFunction`.<`A`>,.<`B`>*, op3: *`OperatorFunction`.<`B`>,.<`C`>*, op4: *`OperatorFunction`.<`C`>,.<`D`>*, op5: *`OperatorFunction`.<`D`>,.<`E`>*, op6: *`OperatorFunction`.<`E`>,.<`F`>*, op7: *`OperatorFunction`.<`F`>,.<`G`>*, op8: *`OperatorFunction`.<`G`>,.<`H`>*, op9: *`OperatorFunction`.<`H`>,.<`I`>*): `Observable`.<`I`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:62*





**Returns:** `Observable`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:63*



**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |





**Returns:** `Observable`.<`A`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:64*



**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |





**Returns:** `Observable`.<`B`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:65*



**Type parameters:**

#### A 
#### B 
#### C 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |





**Returns:** `Observable`.<`C`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:66*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |





**Returns:** `Observable`.<`D`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:67*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |
| op5 | `OperatorFunction`.<`D`>,.<`E`>   |  - |





**Returns:** `Observable`.<`E`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:68*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |
| op5 | `OperatorFunction`.<`D`>,.<`E`>   |  - |
| op6 | `OperatorFunction`.<`E`>,.<`F`>   |  - |





**Returns:** `Observable`.<`F`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:69*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |
| op5 | `OperatorFunction`.<`D`>,.<`E`>   |  - |
| op6 | `OperatorFunction`.<`E`>,.<`F`>   |  - |
| op7 | `OperatorFunction`.<`F`>,.<`G`>   |  - |





**Returns:** `Observable`.<`G`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:70*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
#### H 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |
| op5 | `OperatorFunction`.<`D`>,.<`E`>   |  - |
| op6 | `OperatorFunction`.<`E`>,.<`F`>   |  - |
| op7 | `OperatorFunction`.<`F`>,.<`G`>   |  - |
| op8 | `OperatorFunction`.<`G`>,.<`H`>   |  - |





**Returns:** `Observable`.<`H`>



*Inherited from Observable.pipe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:71*



**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
#### H 
#### I 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| op1 | `OperatorFunction`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>,.<`A`>   |  - |
| op2 | `OperatorFunction`.<`A`>,.<`B`>   |  - |
| op3 | `OperatorFunction`.<`B`>,.<`C`>   |  - |
| op4 | `OperatorFunction`.<`C`>,.<`D`>   |  - |
| op5 | `OperatorFunction`.<`D`>,.<`E`>   |  - |
| op6 | `OperatorFunction`.<`E`>,.<`F`>   |  - |
| op7 | `OperatorFunction`.<`F`>,.<`G`>   |  - |
| op8 | `OperatorFunction`.<`G`>,.<`H`>   |  - |
| op9 | `OperatorFunction`.<`H`>,.<`I`>   |  - |





**Returns:** `Observable`.<`I`>





___

<a id="subscribe"></a>

###  subscribe

► **subscribe**(observer?: *`PartialObserver`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>*): `Subscription`

► **subscribe**(next?: *`function`*, error?: *`function`*, complete?: *`function`*): `Subscription`



*Inherited from Observable.subscribe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:48*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| observer | `PartialObserver`.<[GeneratorOutput](_types_index_.generatoroutput.md)`Props`>   |  - |





**Returns:** `Subscription`



*Inherited from Observable.subscribe*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:49*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| next | `function`   |  - |
| error | `function`   |  - |
| complete | `function`   |  - |





**Returns:** `Subscription`





___

<a id="topromise"></a>

###  toPromise

► **toPromise**T(this: *`Observable`.<`T`>*): `Promise`.<`T`>

► **toPromise**T(this: *`Observable`.<`T`>*, PromiseCtor: *`PromiseConstructor`*): `Promise`.<`T`>

► **toPromise**T(this: *`Observable`.<`T`>*, PromiseCtor: *`PromiseConstructorLike`*): `Promise`.<`T`>



*Inherited from Observable.toPromise*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:72*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| this | `Observable`.<`T`>   |  - |





**Returns:** `Promise`.<`T`>



*Inherited from Observable.toPromise*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:73*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| this | `Observable`.<`T`>   |  - |
| PromiseCtor | `PromiseConstructor`   |  - |





**Returns:** `Promise`.<`T`>



*Inherited from Observable.toPromise*

*Defined in /Users/ian/Projects/o3-studio/zombi/node_modules/rxjs/Observable.d.ts:74*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| this | `Observable`.<`T`>   |  - |
| PromiseCtor | `PromiseConstructorLike`   |  - |





**Returns:** `Promise`.<`T`>





___



[zombi](../README.md) > ["operators/task"](../modules/_operators_task_.md)



# External module: "operators/task"

## Index

### Functions

* [task](_operators_task_.md#task)



---
## Functions
<a id="task"></a>

### «Const» task

► **task**T(task: *[Callback](../interfaces/_types_index_.callback.md)`T`*, options?: *[TaskOptions](../interfaces/_types_index_.taskoptions.md)*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/task.ts:22*



Add generator tasks to perform side-effects during the run process. Similar to RxJS [do](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do) or [tap](http://reactivex.io/rxjs/function/index.html#static-function-tap).

A callback to be executed during the run process.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| task | [Callback](../interfaces/_types_index_.callback.md)`T`  | - |   - |
| options | [TaskOptions](../interfaces/_types_index_.taskoptions.md)  |  {} |   Customize the flow of tasks by providing an options objectwith `enforcePre` set to true. |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



[zombi](../README.md) > ["operators/prompt"](../modules/_operators_prompt_.md)



# External module: "operators/prompt"

## Index

### Functions

* [prompt](_operators_prompt_.md#prompt)



---
## Functions
<a id="prompt"></a>

### «Const» prompt

► **prompt**T,K(questions: *[Data](_types_index_.md#data)[Question](../interfaces/_types_index_.question.md)`K`⎮[Question](../interfaces/_types_index_.question.md)`K`[], `T`*): [Operator](../interfaces/_types_index_.operator.md)`T`



*Defined in operators/prompt.ts:25*



A wrapper for [Inquirer's prompt API](https://github.com/SBoudrias/Inquirer.js/#methods). Prompts for user input and saves the resulting data into props.


**Type parameters:**

#### T 
#### K :  `T`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| questions | [Data](_types_index_.md#data)[Question](../interfaces/_types_index_.question.md)`K`⎮[Question](../interfaces/_types_index_.question.md)`K`[], `T`   |  Array of Inquirer-compatible[question](https://github.com/SBoudrias/Inquirer.js/#question) objects. |





**Returns:** [Operator](../interfaces/_types_index_.operator.md)`T`





___



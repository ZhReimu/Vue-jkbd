# Vue3 驾考宝典

使用 Vue3 + ts + Ant Design of Vue + Axios 做的在线刷题工具

理论上来说, 给出形如 `src/api/api.ts` 里的 `mockData` 的数据就可以跑辣

根对象: 

|  字段   |  类型   |       内容       | 备注                |
| :-----: | :-----: | :--------------: | ------------------- |
|  code   | number  |      返回值      | 2000 成功, 其它失败 |
| message | string  |     错误消息     | 一眼顶针            |
| success | boolean | 本次操作是否成功 | 一眼顶针            |
|  data   | object  |     题目内容     |                     |

data 对象:

|   字段   | 类型   | 内容              | 备注                    |
| :------: | ------ | ----------------- | ----------------------- |
| answers  | array  | 答案选项          | 见 answer 对象          |
| comments | string | 答案说明          |                         |
| correct  | string | 正确答案          |                         |
|    id    | number | 题目 id           | 本题目在数据库中的 id   |
|   qid    | number | 本次考试的题目 id | 本题目在本次考试中的 id |
|  title   | string | 题目              | 题目名                  |
|   type   | number | 题目类型          | 题目类型                |

answer 对象: 

| 字段  | 类型   | 内容     | 备注                    |
| :---: | ------ | -------- | ----------------------- |
|  id   | string | 选项 id  | 形如 A、B、C、D 或 √、× |
| value | string | 选项内容 | 选项本体                |

type 的可选值: 

| 字段 |  类型  |  内容  | 备注 |
| :--: | :----: | :----: | :--: |
|  0   | number | 判断题 |      |
|  1   | number | 单选题 |      |
|  2   | number | 多选题 |      |


## WORKTILE API INTRODUCE

1. 包含 API 地址和方法类型;
1. 包含 输入字段，POST 请求参数默认 Body 传入， GET 请求参数默认 Query 传入；
1. 返回值不一定穷举完全，具体看 API 实际返回结果；
1. 返回值正常都会返回 `{code:xxx,data:xxx}`，如果没有写 code 一般都是指 data 中返回的数据。

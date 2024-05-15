import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  title: [{ required: true, message: "此处为必填项", trigger: "blur" }],
  name: [{ required: true, message: "此处为必填项", trigger: "blur" }],
  path: [{ required: true, message: "此处为必填项", trigger: "blur" }]
});

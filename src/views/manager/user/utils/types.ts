interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  name: string;
  password: string;
  email: string;
  status: number;
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  email: string;
  name: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  roleIds: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };

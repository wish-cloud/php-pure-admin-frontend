interface FormItemProps {
  id: number;
  /** 菜单类型（menu, iframe, link，action）*/
  menuType: string;
  parentId: number;
  title: string;
  name: string;
  path: string;
  component: string;
  rank: number;
  redirect: string;
  icon: string;
  extraIcon: string;
  enterTransition: string;
  leaveTransition: string;
  activePath: string;
  frameSrc: string;
  frameLoading: boolean;
  keepAlive: boolean;
  hiddenTag: boolean;
  fixedTag: boolean;
  isShow: boolean;
  showParent: boolean;
}

interface FormProps {
  formInline: FormItemProps;
  higherMenuOptions: Record<string, unknown>[];
}

export type { FormItemProps, FormProps };

export function useColumns() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { version, engines } = pkg;
  const columns = [
    {
      label: "当前版本",
      minWidth: 100,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {version}
          </el-tag>
        );
      }
    },
    {
      label: "最后编译时间",
      minWidth: 120,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {lastBuildTime}
          </el-tag>
        );
      }
    },
    {
      label: "推荐 node 版本",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {engines.node}
          </el-tag>
        );
      }
    },
    {
      label: "推荐 pnpm 版本",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {engines.pnpm}
          </el-tag>
        );
      }
    },
    {
      label: "前端代码地址",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/wish-cloud/php-pure-admin-frontend"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">前端代码地址</span>
          </a>
        );
      }
    },
    {
      label: "后端代码地址",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/wish-cloud/php-pure-admin-backend"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">后端代码地址</span>
          </a>
        );
      }
    },
    {
      label: "文档地址",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/wish-cloud/php-pure-admin-backend"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">文档链接</span>
          </a>
        );
      }
    },
    {
      label: "演示地址",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a href="##" target="_blank">
            <span style="color: var(--el-color-primary)">预览链接</span>
          </a>
        );
      }
    }
  ];

  return {
    columns
  };
}

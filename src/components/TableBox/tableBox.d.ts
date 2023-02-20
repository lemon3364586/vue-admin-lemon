export interface TableColumn {
  /** 显示的标题 */
  label: string;
  /** 字段名称 对应列内容的字段名 */
  prop: string;
  /** 对应列的宽度 */
  width?: string | number;
  /** 对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth?: string | number;
  /** 列是否固定在左侧或者右侧 */
  fixed?: 'left' | 'right';
  /** 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） */
  resizable?: boolean;
  /** 当内容过长被隐藏时显示 tooltip */
  tooltip?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否使用自定义插槽 */
  slot?: boolean;
  /** 格式化内容 */
  formatter?: PropType<() => void>;
  // formatter?: PropType<(row: object, column: object, cellValue: any) => void>;
}

export interface TableConfigType {
  /** table ref name */
  refName?: string;
  /** Table 的高度，默认为自动高度 */
  height?: string | number;
  /** Table 的最大高度，合法的值为数字或者单位为 px 的高度 */
  maxHeight?: string | number;
  /** 是否为斑马纹 table */
  stripe?: boolean;
  /** 是否显示多选框 */
  selection?: boolean;
  /** 是否带有纵向边框 */
  border?: boolean;
  /** 是否要高亮当前行 */
  highlightCurrentRow?: boolean;
  /** 表格样式 */
  style?: object;
  /** 单元格样式 */
  cellStyle?: object;
  /** 表头单元格样式 */
  headerCellStyle?: object;
  /** Table 的尺寸 */
  size?: 'large' | 'default' | 'small';
}

export interface TablePropsType {
  /** 表格数据 */
  tableData: Array<any>;
  /** 表格数据渲染配置(列数据) */
  tableHeader: Array<TableColumn>;
  /** 表格非必要配置项 */
  tableConfig?: TableConfigType;
}

export interface TablePagination {}

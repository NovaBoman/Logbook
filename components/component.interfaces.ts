export interface IGridElement {
  className: string;
}
export interface IHeader extends IGridElement {
  logoPath?: string;
}

export interface IMain extends IGridElement {}

export interface INav extends IGridElement {}

export interface IFooter extends IGridElement {}

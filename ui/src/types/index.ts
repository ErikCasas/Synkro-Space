import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export enum LocalStorageItems {
  TOKEN = 'token'
}
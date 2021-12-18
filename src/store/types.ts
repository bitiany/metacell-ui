
import { Component } from 'react'

export type PaneType = {
  title: string,
  content: Component,
  key: string,
  closable: boolean,
  path: string
}

export interface IMenu {
  apiKey: string;
  label?: string;
  icon?: string;
  path?: string;
  component?: string;
  children?: IMenu[];
  hidden?: boolean;
  sort:number;
}

export type UserType = {
  userName: string;
  token: string;
}
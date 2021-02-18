import {Target} from "./target";

export interface Connection {
  key: string;
  label: string;
  username: string;
  host: string;
  privateKey: string;
  targets: Target[];
}
